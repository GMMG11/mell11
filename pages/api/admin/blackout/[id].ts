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

  if (req.method === 'DELETE') {
    try {
      await prisma.blackoutDate.delete({
        where: { id: id as string },
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting blackout date:', error);
      return res.status(500).json({ error: 'Failed to delete blackout date' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
