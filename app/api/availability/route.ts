import { NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/google-calendar';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');

    if (!startDateParam) {
      return NextResponse.json(
        { error: 'startDate parameter is required' },
        { status: 400 }
      );
    }

    const startDate = new Date(startDateParam);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7); // Get 1 week of availability

    const allSlots = await getAvailableSlots(startDate, endDate);

    // Count only available slots (not booked or too soon)
    const totalAvailable = Object.values(allSlots).reduce(
      (sum, slots) => sum + slots.filter(s => s.available).length,
      0
    );

    return NextResponse.json({
      slots: allSlots,
      totalAvailable,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
