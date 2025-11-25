import nodemailer from 'nodemailer';

// TODO: Configure these environment variables in your .env file
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface BookingEmailData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  date: string;
  time: string;
  address: string;
  bookingNumber: string;
  price: number;
  notes?: string;
}

export async function sendBookingConfirmationToClient(data: BookingEmailData) {
  const { clientName, clientEmail, serviceName, date, time, address, bookingNumber, price } = data;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #171517; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 30px 0; border-bottom: 1px solid #E0D4C8; }
        .logo { font-family: 'Playfair Display', serif; font-size: 32px; color: #171517; letter-spacing: 2px; }
        .content { padding: 30px 0; }
        .booking-details { background: #FAF7F4; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #E0D4C8; }
        .detail-label { font-weight: 600; color: #171517; }
        .detail-value { color: #171517; }
        .footer { text-align: center; padding: 30px 0; border-top: 1px solid #E0D4C8; color: #666; font-size: 14px; }
        .button { display: inline-block; padding: 12px 30px; background: #C89B7B; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">MĒL11</div>
          <p style="color: #666; margin-top: 10px;">In-home luxury skin + aesthetics</p>
        </div>

        <div class="content">
          <h2 style="color: #171517;">Your appointment is confirmed</h2>
          <p>Hello ${clientName},</p>
          <p>Thank you for booking with MĒL11. We're looking forward to bringing luxury beauty services to your space.</p>

          <div class="booking-details">
            <div class="detail-row">
              <span class="detail-label">Booking Number</span>
              <span class="detail-value">${bookingNumber}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Service</span>
              <span class="detail-value">${serviceName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date</span>
              <span class="detail-value">${date}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time</span>
              <span class="detail-value">${time}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Location</span>
              <span class="detail-value">${address}</span>
            </div>
            <div class="detail-row" style="border-bottom: none;">
              <span class="detail-label">Total</span>
              <span class="detail-value">$${price.toFixed(2)}</span>
            </div>
          </div>

          <p><strong>What to expect:</strong></p>
          <ul>
            <li>We'll arrive at your location fully equipped</li>
            <li>Please ensure a clean, comfortable space for your treatment</li>
            <li>If you need to reschedule, please contact us at least 24 hours in advance</li>
          </ul>

          <p>If you have any questions, please don't hesitate to reach out.</p>
        </div>

        <div class="footer">
          <p>MĒL11 • Tacoma & Greater Seattle Area</p>
          <p>📧 ${process.env.BUSINESS_EMAIL || 'hello@mel11.com'} • 📱 ${process.env.BUSINESS_PHONE || '(253) 778-2735'}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"MĒL11" <hello@mel11.com>',
      to: clientEmail,
      subject: `Your MĒL11 Appointment is Confirmed - ${bookingNumber}`,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending client email:', error);
    // In production, you might want to queue this for retry
    return { success: false, error };
  }
}

export async function sendBookingNotificationToAdmin(data: BookingEmailData) {
  const { clientName, clientEmail, clientPhone, serviceName, date, time, address, bookingNumber, price, notes } = data;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #C89B7B; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .detail-row { padding: 10px 0; border-bottom: 1px solid #ddd; }
        .button { display: inline-block; padding: 12px 30px; background: #C89B7B; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🎉 New Booking Received</h2>
        </div>

        <div class="content">
          <p><strong>A new appointment has been booked!</strong></p>

          <div class="detail-row">
            <strong>Booking Number:</strong> ${bookingNumber}
          </div>
          <div class="detail-row">
            <strong>Client:</strong> ${clientName}
          </div>
          <div class="detail-row">
            <strong>Email:</strong> ${clientEmail}
          </div>
          <div class="detail-row">
            <strong>Phone:</strong> ${clientPhone}
          </div>
          <div class="detail-row">
            <strong>Service:</strong> ${serviceName}
          </div>
          <div class="detail-row">
            <strong>Date:</strong> ${date}
          </div>
          <div class="detail-row">
            <strong>Time:</strong> ${time}
          </div>
          <div class="detail-row">
            <strong>Location:</strong> ${address}
          </div>
          <div class="detail-row">
            <strong>Total:</strong> $${price.toFixed(2)}
          </div>
          ${notes ? `<div class="detail-row"><strong>Notes:</strong> ${notes}</div>` : ''}

          <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/bookings" class="button">View in Admin Dashboard</a>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"MĒL11 Bookings" <hello@mel11.com>',
      to: process.env.BOOKING_NOTIFICATION_EMAIL || process.env.BUSINESS_EMAIL || 'bookings@mel11.com',
      subject: `New Booking: ${serviceName} - ${date}`,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return { success: false, error };
  }
}

export async function sendContactFormEmail(name: string, email: string, message: string) {
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"MĒL11 Website" <hello@mel11.com>',
      to: process.env.BUSINESS_EMAIL || 'hello@mel11.com',
      subject: `New Contact Form Message from ${name}`,
      html,
      replyTo: email,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return { success: false, error };
  }
}
