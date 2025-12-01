import { NextResponse } from 'next/server';
import { createBookingEvent, sendBookingConfirmation } from '@/lib/google-calendar';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      clientName,
      clientEmail,
      clientPhone,
      serviceName,
      startTime,
      duration = 60,
      notes,
    } = body;

    // Validate required fields
    if (!clientName || !clientEmail || !clientPhone || !serviceName || !startTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const startDateTime = new Date(startTime);

    // Check if time is in the past
    if (startDateTime < new Date()) {
      return NextResponse.json(
        { error: 'Cannot book appointments in the past' },
        { status: 400 }
      );
    }

    // Create calendar event
    const event = await createBookingEvent(
      clientName,
      clientEmail,
      clientPhone,
      serviceName,
      startDateTime,
      duration,
      notes
    );

    // Send confirmation email
    await sendBookingConfirmation(
      clientEmail,
      clientName,
      serviceName,
      startDateTime,
      duration
    );

    return NextResponse.json({
      success: true,
      event: {
        id: event.id,
        htmlLink: event.htmlLink,
      },
      message: 'Booking created successfully',
    });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create booking' },
      { status: 500 }
    );
  }
}
