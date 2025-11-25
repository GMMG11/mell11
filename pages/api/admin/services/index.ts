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
      const services = await prisma.service.findMany({
        orderBy: { order: 'asc' },
      });

      return res.status(200).json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      return res.status(500).json({ error: 'Failed to fetch services' });
    }
  }

  if (req.method === 'POST') {
    const { name, slug, category, description, duration, price, isActive, isFeatured, order } = req.body;

    if (!name || !slug || !category || !description || !duration || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const service = await prisma.service.create({
        data: {
          name,
          slug,
          category,
          description,
          duration: parseInt(duration),
          price: parseFloat(price),
          isActive: isActive !== undefined ? isActive : true,
          isFeatured: isFeatured !== undefined ? isFeatured : false,
          order: order !== undefined ? parseInt(order) : 0,
        },
      });

      return res.status(201).json(service);
    } catch (error) {
      console.error('Error creating service:', error);
      return res.status(500).json({ error: 'Failed to create service' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
