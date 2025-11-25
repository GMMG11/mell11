import { prisma } from './prisma';
import { addDays, format, parse, startOfDay, isAfter, isBefore, addMinutes } from 'date-fns';

export interface TimeSlot {
  time: string; // Format: "14:00"
  available: boolean;
}

export interface BookingSettings {
  bufferTime: number;
  advanceBookingDays: number;
  minAdvanceHours: number;
  depositPercentage: number;
  requireDeposit: boolean;
}

export async function getBookingSettings(): Promise<BookingSettings> {
  const settings = await prisma.settings.findUnique({
    where: { key: 'booking_settings' },
  });

  if (!settings) {
    // Return default settings
    return {
      bufferTime: 30,
      advanceBookingDays: 60,
      minAdvanceHours: 24,
      depositPercentage: 50,
      requireDeposit: true,
    };
  }

  return JSON.parse(settings.value);
}

export async function getAvailableTimeSlots(date: Date, serviceDuration: number): Promise<TimeSlot[]> {
  // Get day of week (0 = Sunday, 6 = Saturday)
  const dayOfWeek = date.getDay();

  // Check if this day has availability configured
  const availability = await prisma.availability.findUnique({
    where: { dayOfWeek },
  });

  if (!availability || !availability.isActive) {
    return []; // No availability on this day
  }

  // Check for blackout dates
  const startOfDate = startOfDay(date);
  const blackout = await prisma.blackoutDate.findFirst({
    where: {
      date: startOfDate,
    },
  });

  if (blackout) {
    return []; // This date is blacked out
  }

  // Get booking settings
  const settings = await getBookingSettings();

  // Get all existing bookings for this date
  const existingBookings = await prisma.booking.findMany({
    where: {
      scheduledDate: startOfDate,
      status: {
        in: ['PENDING', 'CONFIRMED'],
      },
    },
    select: {
      scheduledTime: true,
      duration: true,
    },
  });

  // Generate time slots
  const slots: TimeSlot[] = [];
  const [startHour, startMinute] = availability.startTime.split(':').map(Number);
  const [endHour, endMinute] = availability.endTime.split(':').map(Number);

  // Start time in minutes from midnight
  let currentMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  // Total duration including service and buffer
  const totalDuration = serviceDuration + settings.bufferTime;

  while (currentMinutes + totalDuration <= endMinutes) {
    const hours = Math.floor(currentMinutes / 60);
    const minutes = currentMinutes % 60;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    // Check if this time slot conflicts with any existing booking
    const hasConflict = existingBookings.some((booking) => {
      const [bookingHour, bookingMinute] = booking.scheduledTime.split(':').map(Number);
      const bookingStartMinutes = bookingHour * 60 + bookingMinute;
      const bookingEndMinutes = bookingStartMinutes + booking.duration;

      // Check for overlap
      return (
        (currentMinutes >= bookingStartMinutes && currentMinutes < bookingEndMinutes) ||
        (currentMinutes + totalDuration > bookingStartMinutes && currentMinutes + totalDuration <= bookingEndMinutes) ||
        (currentMinutes <= bookingStartMinutes && currentMinutes + totalDuration >= bookingEndMinutes)
      );
    });

    // Check if this time is in the past (for today's date)
    const now = new Date();
    const slotDateTime = new Date(date);
    slotDateTime.setHours(hours, minutes, 0, 0);

    const minAdvanceTime = addMinutes(now, settings.minAdvanceHours * 60);
    const isInFuture = isAfter(slotDateTime, minAdvanceTime);

    slots.push({
      time: timeString,
      available: !hasConflict && isInFuture,
    });

    // Move to next 30-minute slot
    currentMinutes += 30;
  }

  return slots;
}

export async function getAvailableDates(startDate: Date, endDate: Date): Promise<Date[]> {
  const availableDates: Date[] = [];
  let currentDate = startOfDay(startDate);
  const end = startOfDay(endDate);

  while (!isAfter(currentDate, end)) {
    const dayOfWeek = currentDate.getDay();

    // Check if this day has availability
    const availability = await prisma.availability.findUnique({
      where: { dayOfWeek },
    });

    if (availability && availability.isActive) {
      // Check for blackout
      const blackout = await prisma.blackoutDate.findFirst({
        where: {
          date: currentDate,
        },
      });

      if (!blackout) {
        availableDates.push(new Date(currentDate));
      }
    }

    currentDate = addDays(currentDate, 1);
  }

  return availableDates;
}

export function generateBookingNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ML${timestamp}${random}`;
}

export function formatTimeForDisplay(time: string): string {
  // Convert "14:00" to "2:00 PM"
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}
