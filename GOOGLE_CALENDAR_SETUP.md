# Google Calendar Integration Setup Guide

This guide will help you set up Google Calendar integration for the MĒL11 booking system.

## What You Get

✅ Bookings automatically added to your Google Calendar
✅ Confirmation emails sent from your Gmail
✅ Real-time availability displayed to clients
✅ Everything managed from your existing Google Calendar

---

## Setup Steps

### 1. Create Google Cloud Project

**Note:** You can use ANY Google account for this step - it doesn't have to be Melissa's. This is just creating the "developer project" that hosts the API credentials.

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a project" → "New Project"
3. Name it "MEL11 Booking"
4. Click "Create"

### 2. Enable Required APIs

1. In your project, go to "APIs & Services" → "Enable APIs and Services"
2. Search for and enable:
   - **Google Calendar API**
   - **Gmail API**

### 3. Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure OAuth consent screen:
   - User Type: External
   - App name: MĒL11
   - User support email: your email
   - Developer contact: your email
   - Add scope: `https://www.googleapis.com/auth/calendar`
   - Add scope: `https://www.googleapis.com/auth/gmail.send`
   - Add test users: your email
4. Create OAuth Client ID:
   - Application type: Web application
   - Name: MĒL11 Booking Client
   - Authorized redirect URIs:
     ```
     http://localhost:3000/api/google/callback
     https://yourdomain.com/api/google/callback
     ```
5. Click "Create"
6. **Download the JSON** file - you'll need the Client ID and Client Secret

### 4. Get Refresh Token

**⚠️ IMPORTANT:** When you run this script, you MUST log in as **greenmelissaf@gmail.com** (Melissa's account), NOT the account you used to create the Google Cloud Project. This connects HER calendar and Gmail to the booking system.

Run this command in your terminal (from the project directory):

```bash
node scripts/google-auth.js
```

This will:
1. Open a browser window
2. Ask you to **log in as greenmelissaf@gmail.com**
3. Grant permissions to the app
4. Give you a refresh token - save this!

### 5. Add Environment Variables

Add these to your `.env` file:

```bash
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_REFRESH_TOKEN=your-refresh-token-here
GOOGLE_CALENDAR_ID=greenmelissaf@gmail.com
GOOGLE_REDIRECT_URI=https://yourdomain.com/api/google/callback
NEXT_PUBLIC_TIMEZONE=America/Los_Angeles
```

---

## How It Works

### For You (Melissa):

1. **All bookings appear in your Google Calendar automatically**
2. **Manage everything in one place** - just use Google Calendar like normal
3. **Block time off** - just create an event in your calendar and it becomes unavailable
4. **See client details** - all booking info is in the calendar event description
5. **Confirmation emails sent automatically** from your Gmail

### For Clients:

1. They see **real-time availability** from your actual calendar
2. They pick a time slot and enter their info
3. They get **instant confirmation** email
4. Event is **immediately added** to your calendar

### Business Hours

Currently set to:
- **Monday - Saturday**
- **9:00 AM - 5:00 PM PST**
- **1-hour time slots**

To change these, edit `/lib/google-calendar.ts`:

```typescript
export const BUSINESS_HOURS = {
  daysOfWeek: [1, 2, 3, 4, 5, 6], // 1=Mon, 6=Sat
  startHour: 9,
  endHour: 17,
  timezone: 'America/Los_Angeles',
  slotDuration: 60, // minutes
};
```

---

## Testing

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/book`
3. Select a service
4. You should see your real availability
5. Make a test booking
6. Check your Google Calendar - event should appear!
7. Check your email - you should receive a test booking

---

## Troubleshooting

### "Error fetching availability"
- Check that Google Calendar API is enabled
- Verify your refresh token is valid
- Make sure GOOGLE_CALENDAR_ID is set correctly

### "Error creating booking"
- Check that Gmail API is enabled
- Verify OAuth credentials are correct
- Make sure all environment variables are set

### "No availability showing"
- Check your timezone setting
- Verify business hours are correct
- Make sure there are no all-day events blocking slots

---

## Need Help?

Contact your developer or check the Google Calendar API documentation:
https://developers.google.com/calendar/api/guides/overview
