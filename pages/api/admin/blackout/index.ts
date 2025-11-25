import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { startOfDay } from 'date-fns';

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
      const blackouts = await prisma.blackoutDate.findMany({
        orderBy: { date: 'asc' },
      });

      return res.status(200).json(blackouts);
    } catch (error) {
      console.error('Error fetching blackout dates:', error);
      return res.status(500).json({ error: 'Failed to fetch blackout dates' });
    }
  }

  if (req.method === 'POST') {
    const { date, reason } = req.body;

    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }

    try {
      const blackoutDate = startOfDay(new Date(date));

      const blackout = await prisma.blackoutDate.create({
        data: {
          date: blackoutDate,
          reason: reason || null,
        },
      });

      return res.status(201).json(blackout);
    } catch (error) {
      console.error('Error creating blackout date:', error);
      return res.status(500).json({ error: 'Failed to create blackout date' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
