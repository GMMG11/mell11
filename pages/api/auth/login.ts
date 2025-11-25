import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticateAdmin } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const result = await authenticateAdmin(email, password);

      if (!result) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Login failed' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
