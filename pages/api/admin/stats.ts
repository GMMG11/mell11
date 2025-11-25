import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

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
    try {
      const now = new Date();

      // Today's bookings
      const todayBookings = await prisma.booking.count({
        where: {
          scheduledDate: {
            gte: startOfDay(now),
            lte: endOfDay(now),
          },
          status: {
            in: ['PENDING', 'CONFIRMED'],
          },
        },
      });

      // This week's bookings
      const weekBookings = await prisma.booking.count({
        where: {
          scheduledDate: {
            gte: startOfWeek(now),
            lte: endOfWeek(now),
          },
          status: {
            in: ['PENDING', 'CONFIRMED'],
          },
        },
      });

      // This month's bookings
      const monthBookings = await prisma.booking.count({
        where: {
          scheduledDate: {
            gte: startOfMonth(now),
            lte: endOfMonth(now),
          },
        },
      });

      // Total revenue (completed bookings)
      const completedBookings = await prisma.booking.findMany({
        where: {
          status: 'COMPLETED',
          paymentStatus: 'PAID',
        },
        select: {
          paymentAmount: true,
        },
      });

      const totalRevenue = completedBookings.reduce((sum, booking) => sum + (booking.paymentAmount || 0), 0);

      // Upcoming bookings (next 7 days)
      const upcomingBookings = await prisma.booking.findMany({
        where: {
          scheduledDate: {
            gte: startOfDay(now),
            lte: endOfDay(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)),
          },
          status: {
            in: ['PENDING', 'CONFIRMED'],
          },
        },
        include: {
          service: {
            select: {
              name: true,
            },
          },
          client: {
            select: {
              name: true,
              phone: true,
            },
          },
        },
        orderBy: [{ scheduledDate: 'asc' }, { scheduledTime: 'asc' }],
        take: 10,
      });

      return res.status(200).json({
        todayBookings,
        weekBookings,
        monthBookings,
        totalRevenue,
        upcomingBookings,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      return res.status(500).json({ error: 'Failed to fetch stats' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
