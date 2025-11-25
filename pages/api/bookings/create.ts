import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { generateBookingNumber, getBookingSettings } from '@/lib/availability';
import { sendBookingConfirmationToClient, sendBookingNotificationToAdmin } from '@/lib/email';
import { createPaymentIntent } from '@/lib/stripe';
import { format, parse } from 'date-fns';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { serviceId, date, time, clientName, clientEmail, clientPhone, address, city, zipCode, notes, requirePayment } =
      req.body;

    // Validation
    if (!serviceId || !date || !time || !clientName || !clientEmail || !clientPhone || !address || !city || !zipCode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Get service details
      const service = await prisma.service.findUnique({
        where: { id: serviceId },
      });

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      // Get booking settings
      const settings = await getBookingSettings();

      // Calculate total duration including buffer
      const totalDuration = service.duration + settings.bufferTime;

      // Find or create client
      let client = await prisma.client.findFirst({
        where: { email: clientEmail },
      });

      if (!client) {
        client = await prisma.client.create({
          data: {
            name: clientName,
            email: clientEmail,
            phone: clientPhone,
            address,
            city,
            zipCode,
            notes,
          },
        });
      } else {
        // Update client info
        client = await prisma.client.update({
          where: { id: client.id },
          data: {
            name: clientName,
            phone: clientPhone,
            address,
            city,
            zipCode,
          },
        });
      }

      // Parse the date
      const scheduledDate = parse(date, 'yyyy-MM-dd', new Date());

      // Generate booking number
      const bookingNumber = generateBookingNumber();

      // Create booking
      const booking = await prisma.booking.create({
        data: {
          bookingNumber,
          serviceId: service.id,
          clientId: client.id,
          scheduledDate,
          scheduledTime: time,
          duration: totalDuration,
          address,
          city,
          zipCode,
          notes: notes || null,
          status: 'PENDING',
          paymentStatus: requirePayment ? 'PENDING' : 'PENDING',
          paymentAmount: requirePayment ? service.price * (settings.depositPercentage / 100) : service.price,
        },
        include: {
          service: true,
          client: true,
        },
      });

      // Handle payment if required
      let paymentClientSecret = null;
      if (requirePayment && settings.requireDeposit) {
        try {
          const paymentIntent = await createPaymentIntent({
            amount: booking.paymentAmount || service.price,
            bookingId: booking.id,
            clientEmail: client.email,
            description: `${service.name} - ${format(scheduledDate, 'MMM dd, yyyy')} at ${time}`,
          });

          paymentClientSecret = paymentIntent.clientSecret;

          // Update booking with payment intent ID
          await prisma.booking.update({
            where: { id: booking.id },
            data: {
              stripePaymentId: paymentIntent.paymentIntentId,
            },
          });
        } catch (paymentError) {
          console.error('Payment intent creation failed:', paymentError);
          // Continue without payment - can be handled manually
        }
      }

      // Send confirmation emails
      const emailData = {
        clientName: client.name,
        clientEmail: client.email,
        clientPhone: client.phone,
        serviceName: service.name,
        date: format(scheduledDate, 'MMMM dd, yyyy'),
        time,
        address: `${address}, ${city}, WA ${zipCode}`,
        bookingNumber,
        price: service.price,
        notes: notes || undefined,
      };

      // Send emails (non-blocking)
      sendBookingConfirmationToClient(emailData).catch((err) =>
        console.error('Failed to send client confirmation:', err)
      );
      sendBookingNotificationToAdmin(emailData).catch((err) =>
        console.error('Failed to send admin notification:', err)
      );

      return res.status(201).json({
        success: true,
        booking: {
          id: booking.id,
          bookingNumber: booking.bookingNumber,
          clientSecret: paymentClientSecret,
        },
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      return res.status(500).json({ error: 'Failed to create booking' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
