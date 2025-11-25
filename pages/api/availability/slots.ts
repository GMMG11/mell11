import type { NextApiRequest, NextApiResponse } from 'next';
import { getAvailableTimeSlots } from '@/lib/availability';
import { parse } from 'date-fns';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { date, duration } = req.query;

    if (!date || !duration) {
      return res.status(400).json({ error: 'Date and duration are required' });
    }

    try {
      const selectedDate = parse(date as string, 'yyyy-MM-dd', new Date());
      const serviceDuration = parseInt(duration as string);

      const slots = await getAvailableTimeSlots(selectedDate, serviceDuration);

      return res.status(200).json({ slots });
    } catch (error) {
      console.error('Error fetching available slots:', error);
      return res.status(500).json({ error: 'Failed to fetch available slots' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
