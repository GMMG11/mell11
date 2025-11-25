import type { NextApiRequest, NextApiResponse } from 'next';
import { getAvailableDates, getBookingSettings } from '@/lib/availability';
import { addDays, startOfDay } from 'date-fns';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const settings = await getBookingSettings();
      const startDate = startOfDay(addDays(new Date(), 1)); // Start from tomorrow
      const endDate = addDays(startDate, settings.advanceBookingDays);

      const availableDates = await getAvailableDates(startDate, endDate);

      return res.status(200).json({
        dates: availableDates.map((date) => date.toISOString().split('T')[0]),
      });
    } catch (error) {
      console.error('Error fetching available dates:', error);
      return res.status(500).json({ error: 'Failed to fetch available dates' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
