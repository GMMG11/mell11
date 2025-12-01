import { NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/google-calendar';

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

    const availableSlots = await getAvailableSlots(startDate, endDate);

    // Count total available slots
    const totalSlots = Object.values(availableSlots).reduce(
      (sum, slots) => sum + slots.length,
      0
    );

    return NextResponse.json({
      slots: availableSlots,
      totalAvailable: totalSlots,
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
