import { google } from 'googleapis';

// Initialize Google Calendar API client
export function getGoogleCalendarClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  // Set credentials if refresh token is available
  if (process.env.GOOGLE_REFRESH_TOKEN) {
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
  }

  return google.calendar({ version: 'v3', auth: oauth2Client });
}

// Get Gmail client for sending emails
export function getGmailClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  if (process.env.GOOGLE_REFRESH_TOKEN) {
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
  }

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

// Business hours: Monday-Saturday, 9am-5pm PST
export const BUSINESS_HOURS = {
  daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday = 1, Saturday = 6
  startHour: 9,
  endHour: 17,
  timezone: 'America/Los_Angeles',
  slotDuration: 60, // minutes
  minimumNoticeHours: 2, // Can't book within 2 hours of current time
};

// Generate all time slots for a given date (includes past slots for display)
export function generateTimeSlots(date: Date): Date[] {
  const slots: Date[] = [];
  const dayOfWeek = date.getDay();

  // Check if day is within business days (Mon-Sat)
  if (!BUSINESS_HOURS.daysOfWeek.includes(dayOfWeek)) {
    return slots;
  }

  // Create slots from 9am to 5pm
  for (let hour = BUSINESS_HOURS.startHour; hour < BUSINESS_HOURS.endHour; hour++) {
    const slotTime = new Date(date);
    slotTime.setHours(hour, 0, 0, 0);
    slots.push(slotTime);
  }

  return slots;
}

// Check if a slot is too soon to book (within minimum notice period)
export function isSlotTooSoon(slot: Date): boolean {
  const now = new Date();
  const minimumBookingTime = new Date(now.getTime() + BUSINESS_HOURS.minimumNoticeHours * 60 * 60 * 1000);
  return slot < minimumBookingTime;
}

// Fetch busy times from Google Calendar
export async function getBusyTimes(startDate: Date, endDate: Date) {
  const calendar = getGoogleCalendarClient();

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        timeZone: BUSINESS_HOURS.timezone,
        items: [{ id: process.env.GOOGLE_CALENDAR_ID || 'primary' }],
      },
    });

    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    const busyTimes = response.data.calendars?.[calendarId]?.busy || [];

    return busyTimes.map(busy => ({
      start: new Date(busy.start!),
      end: new Date(busy.end!),
    }));
  } catch (error) {
    console.error('Error fetching busy times:', error);
    return [];
  }
}

// Check if a time slot is available
export function isSlotAvailable(slot: Date, busyTimes: { start: Date; end: Date }[], duration: number = 60): boolean {
  const slotEnd = new Date(slot.getTime() + duration * 60000);

  for (const busy of busyTimes) {
    // Check if slot overlaps with any busy time
    if (
      (slot >= busy.start && slot < busy.end) ||
      (slotEnd > busy.start && slotEnd <= busy.end) ||
      (slot <= busy.start && slotEnd >= busy.end)
    ) {
      return false;
    }
  }

  return true;
}

// Slot with availability status
export interface SlotInfo {
  time: Date;
  available: boolean;
  reason?: 'booked' | 'too_soon';
}

// Get all slots for a date range with availability status
export async function getAvailableSlots(startDate: Date, endDate: Date) {
  const busyTimes = await getBusyTimes(startDate, endDate);
  const allSlots: { [key: string]: SlotInfo[] } = {};

  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateKey = currentDate.toISOString().split('T')[0];
    const daySlots = generateTimeSlots(currentDate);

    allSlots[dateKey] = daySlots.map(slot => {
      const isBusy = !isSlotAvailable(slot, busyTimes);
      const tooSoon = isSlotTooSoon(slot);

      return {
        time: slot,
        available: !isBusy && !tooSoon,
        reason: isBusy ? 'booked' : (tooSoon ? 'too_soon' : undefined),
      };
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return allSlots;
}

// Create a booking event in Google Calendar
export async function createBookingEvent(
  clientName: string,
  clientEmail: string,
  clientPhone: string,
  serviceName: string,
  startTime: Date,
  duration: number,
  notes?: string
) {
  const calendar = getGoogleCalendarClient();

  const endTime = new Date(startTime.getTime() + duration * 60000);

  const event = {
    summary: `${serviceName} - ${clientName}`,
    description: `
Client: ${clientName}
Email: ${clientEmail}
Phone: ${clientPhone}
Service: ${serviceName}
${notes ? `\nNotes: ${notes}` : ''}

Booked via MĒL11 website
    `.trim(),
    start: {
      dateTime: startTime.toISOString(),
      timeZone: BUSINESS_HOURS.timezone,
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: BUSINESS_HOURS.timezone,
    },
    attendees: [
      { email: clientEmail },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 1 day before
        { method: 'popup', minutes: 60 }, // 1 hour before
      ],
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      requestBody: event,
      sendUpdates: 'all', // Send email notifications
    });

    return response.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
}

// Send confirmation email via Gmail
export async function sendBookingConfirmation(
  clientEmail: string,
  clientName: string,
  serviceName: string,
  startTime: Date,
  duration: number
) {
  const gmail = getGmailClient();

  const formattedDate = startTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: BUSINESS_HOURS.timezone,
  });

  const formattedTime = startTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: BUSINESS_HOURS.timezone,
  });

  const emailContent = `
From: MĒL11 <${process.env.GOOGLE_CALENDAR_ID}>
To: ${clientEmail}
Subject: Booking Confirmed - ${serviceName}
Content-Type: text/html; charset=utf-8

<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica', 'Arial', sans-serif; line-height: 1.6; color: #171517; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #C89B7B 0%, #8C5A3C 100%); color: white; padding: 30px; text-align: center; }
    .content { background: #FAF7F4; padding: 30px; }
    .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-family: 'Georgia', serif;">MĒL11</h1>
      <p style="margin: 10px 0 0 0;">In-home luxury skin + aesthetics</p>
    </div>

    <div class="content">
      <h2>Your Appointment is Confirmed!</h2>
      <p>Hi ${clientName},</p>
      <p>We're excited to bring luxury beauty care to your home. Here are your appointment details:</p>

      <div class="details">
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formattedTime}</p>
        <p><strong>Duration:</strong> ${duration} minutes</p>
      </div>

      <p><strong>What to expect:</strong></p>
      <ul>
        <li>Melissa will arrive at your location with all necessary equipment</li>
        <li>Please have a clean, well-lit space prepared</li>
        <li>We'll send you a reminder 24 hours before your appointment</li>
      </ul>

      <p>If you need to reschedule or have any questions, please reply to this email or call (253) 778-2735.</p>

      <p>Looking forward to seeing you!</p>
      <p><em>- Melissa & the MĒL11 team</em></p>
    </div>

    <div class="footer">
      <p>MĒL11 | Tacoma & Greater Seattle Area<br>
      (253) 778-2735 | hello@mel11.com</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const encodedEmail = Buffer.from(emailContent)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedEmail,
      },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw - booking is still created even if email fails
  }
}
