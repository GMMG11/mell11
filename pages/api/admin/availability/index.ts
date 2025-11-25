import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';

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
      const availability = await prisma.availability.findMany({
        orderBy: { dayOfWeek: 'asc' },
      });

      return res.status(200).json(availability);
    } catch (error) {
      console.error('Error fetching availability:', error);
      return res.status(500).json({ error: 'Failed to fetch availability' });
    }
  }

  if (req.method === 'POST') {
    const { dayOfWeek, startTime, endTime, isActive } = req.body;

    if (dayOfWeek === undefined || !startTime || !endTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const availability = await prisma.availability.upsert({
        where: { dayOfWeek: parseInt(dayOfWeek) },
        update: {
          startTime,
          endTime,
          isActive: isActive !== undefined ? isActive : true,
        },
        create: {
          dayOfWeek: parseInt(dayOfWeek),
          startTime,
          endTime,
          isActive: isActive !== undefined ? isActive : true,
        },
      });

      return res.status(200).json(availability);
    } catch (error) {
      console.error('Error updating availability:', error);
      return res.status(500).json({ error: 'Failed to update availability' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
