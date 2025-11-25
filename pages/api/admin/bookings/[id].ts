import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Verify admin authentication
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.substring(7);
  const user = await verifyAuthToken(token);

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: id as string },
        include: {
          service: true,
          client: true,
        },
      });

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      return res.status(200).json(booking);
    } catch (error) {
      console.error('Error fetching booking:', error);
      return res.status(500).json({ error: 'Failed to fetch booking' });
    }
  }

  if (req.method === 'PATCH') {
    const { status, paymentStatus, notes } = req.body;

    try {
      const updateData: any = {};

      if (status) updateData.status = status;
      if (paymentStatus) updateData.paymentStatus = paymentStatus;
      if (notes !== undefined) updateData.notes = notes;

      const booking = await prisma.booking.update({
        where: { id: id as string },
        data: updateData,
        include: {
          service: true,
          client: true,
        },
      });

      return res.status(200).json(booking);
    } catch (error) {
      console.error('Error updating booking:', error);
      return res.status(500).json({ error: 'Failed to update booking' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.booking.delete({
        where: { id: id as string },
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting booking:', error);
      return res.status(500).json({ error: 'Failed to delete booking' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
