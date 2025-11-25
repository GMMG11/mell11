import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { startOfDay, endOfDay } from 'date-fns';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    const { status, date, serviceId } = req.query;

    try {
      const where: any = {};

      if (status) {
        where.status = status;
      }

      if (date) {
        const selectedDate = new Date(date as string);
        where.scheduledDate = {
          gte: startOfDay(selectedDate),
          lte: endOfDay(selectedDate),
        };
      }

      if (serviceId) {
        where.serviceId = serviceId;
      }

      const bookings = await prisma.booking.findMany({
        where,
        include: {
          service: {
            select: {
              name: true,
              category: true,
            },
          },
          client: {
            select: {
              name: true,
              email: true,
              phone: true,
            },
          },
        },
        orderBy: [{ scheduledDate: 'desc' }, { scheduledTime: 'desc' }],
      });

      return res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
