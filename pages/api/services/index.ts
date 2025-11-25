import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const services = await prisma.service.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          order: 'asc',
        },
      });

      return res.status(200).json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      return res.status(500).json({ error: 'Failed to fetch services' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
