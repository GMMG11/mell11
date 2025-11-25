import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (req.method === 'GET') {
    try {
      const service = await prisma.service.findUnique({
        where: {
          slug: slug as string,
        },
      });

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      return res.status(200).json(service);
    } catch (error) {
      console.error('Error fetching service:', error);
      return res.status(500).json({ error: 'Failed to fetch service' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
