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

  if (req.method === 'PATCH') {
    const { name, slug, category, description, duration, price, isActive, isFeatured, order } = req.body;

    try {
      const updateData: any = {};

      if (name) updateData.name = name;
      if (slug) updateData.slug = slug;
      if (category) updateData.category = category;
      if (description) updateData.description = description;
      if (duration) updateData.duration = parseInt(duration);
      if (price) updateData.price = parseFloat(price);
      if (isActive !== undefined) updateData.isActive = isActive;
      if (isFeatured !== undefined) updateData.isFeatured = isFeatured;
      if (order !== undefined) updateData.order = parseInt(order);

      const service = await prisma.service.update({
        where: { id: id as string },
        data: updateData,
      });

      return res.status(200).json(service);
    } catch (error) {
      console.error('Error updating service:', error);
      return res.status(500).json({ error: 'Failed to update service' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.service.delete({
        where: { id: id as string },
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting service:', error);
      return res.status(500).json({ error: 'Failed to delete service' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
