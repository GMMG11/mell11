# MĒL11 - In-Home Luxury Skin & Aesthetics

A complete, production-ready web application for MĒL11, a luxury mobile beauty and aesthetics brand serving Tacoma and Greater Seattle.

<!-- Build: 2025-11-26 -->

## Overview

This application includes:

- **Marketing Website**: Beautiful, responsive public site with services, about, and contact pages
- **Booking System**: Complete reservation flow with date/time selection and availability management
- **Admin Dashboard**: Secure back-office for managing services, bookings, availability, and blackout dates
- **Email Notifications**: Automated confirmations and notifications for bookings
- **Stripe Integration**: Payment processing (configured with clear TODOs for production setup)

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript and React
- **Styling**: Tailwind CSS (custom luxury design system)
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based admin authentication
- **Payments**: Stripe (stubbed with clear integration points)
- **Email**: Nodemailer (configurable SMTP)

## Brand Colors

- Background: `#FAF7F4` (soft cream)
- Text: `#171517` (near black)
- Accent: `#C89B7B` (warm beige/rose-gold)
- Soft Line: `#E0D4C8`
- Hover: `#8C5A3C`

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Stripe account (for payments)
- SMTP email service (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mell11
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure the following:

   ```env
   # Database - Replace with your PostgreSQL connection string
   DATABASE_URL="postgresql://user:password@localhost:5432/mel11?schema=public"

   # JWT Secret - Generate with: openssl rand -base64 32
   JWT_SECRET="your-generated-secret-key"

   # Admin Credentials
   ADMIN_EMAIL="admin@mel11.com"
   ADMIN_PASSWORD="YourSecurePassword123!"

   # Stripe Keys - Get from https://dashboard.stripe.com/apikeys
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."

   # Email SMTP Configuration
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASSWORD="your-app-password"
   SMTP_FROM="MĒL11 <hello@mel11.com>"

   # Business Contact
   BUSINESS_EMAIL="hello@mel11.com"
   BUSINESS_PHONE="(253) 778-2735"
   BOOKING_NOTIFICATION_EMAIL="bookings@mel11.com"

   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**

   Push the Prisma schema to your database:
   ```bash
   npm run db:push
   ```

   Seed the database with initial data:
   ```bash
   npm run db:seed
   ```

   This will create:
   - Admin user with your configured credentials
   - 20 pre-configured services across all categories
   - Default availability schedule (Tuesday-Saturday, 9 AM - 6 PM)
   - Default booking settings

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Features

### Public Website

- **Homepage**: Hero section, featured services, "How it works" section
- **Services Page**: All services grouped by category with detailed descriptions
- **Booking Flow**: 3-step booking process with real-time availability
- **About Page**: Brand story and bio for Melissa
- **Contact Page**: Contact form with business information

### Admin Dashboard

Access at `/admin/login` with your configured admin credentials.

- **Dashboard**: Today's bookings, weekly stats, revenue tracking, upcoming appointments
- **Bookings Management**: View all bookings, filter by status, update booking status
- **Services Management**: CRUD operations for services, toggle active/featured status
- **Availability Management**: Set weekly schedule and blackout dates

### Booking System

The booking system includes:

- Real-time availability checking
- Automatic time slot generation based on service duration
- Buffer time between appointments (configurable)
- Blackout date handling
- Email confirmations to both client and admin
- Unique booking numbers

### Email Notifications

Emails are sent for:

- Booking confirmation to client (with appointment details)
- Booking notification to admin (with client contact info)
- Contact form submissions

### Payment Integration

Stripe integration is prepared with:

- Payment intent creation
- Deposit or full payment options
- Configurable deposit percentage
- Clear TODO markers for production setup

**To enable payments:**

1. Add your Stripe keys to `.env`
2. Update `requirePayment` flag in booking flow
3. Test with Stripe test cards
4. Configure webhook endpoint for payment status updates

## Database Schema

### Key Models

- **Service**: Name, category, description, duration, price, active status
- **Booking**: Service, client, date/time, status, payment info
- **Client**: Contact information, booking history
- **AdminUser**: Admin authentication
- **Availability**: Weekly schedule configuration
- **BlackoutDate**: Specific dates when no bookings are allowed
- **Settings**: Configurable booking settings (buffer time, advance booking days, etc.)

## Development

### Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npm run db:push

# Seed database
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio

# Lint code
npm run lint
```

### Database Management

To reset and reseed the database:

```bash
npm run db:push -- --force-reset
npm run db:seed
```

To view/edit data visually:

```bash
npm run db:studio
```

This opens Prisma Studio at http://localhost:5555

## Deployment

### Recommended Platforms

- **Vercel**: Easiest deployment for Next.js (automatic builds, preview deployments)
- **Railway**: Good for database + app hosting
- **Render**: Full-stack deployment with database included

### Pre-Deployment Checklist

1. ✅ Set all production environment variables
2. ✅ Update `NEXT_PUBLIC_APP_URL` to your production domain
3. ✅ Configure production Stripe keys
4. ✅ Set up SMTP email service
5. ✅ Change default admin password
6. ✅ Test booking flow end-to-end
7. ✅ Test email notifications
8. ✅ Configure database backups

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Vercel will automatically:
- Build the Next.js application
- Set up serverless functions for API routes
- Configure custom domain

### Database Hosting

**Recommended providers:**
- [Supabase](https://supabase.com) (PostgreSQL with free tier)
- [Neon](https://neon.tech) (Serverless PostgreSQL)
- [Railway](https://railway.app) (PostgreSQL with app hosting)

## Customization

### Adding New Services

1. **Via Admin Dashboard**: Go to `/admin/services` and edit existing services
2. **Via Database**: Add records directly in Prisma Studio or modify `prisma/seed.ts`

### Changing Availability Settings

Update via Admin Dashboard at `/admin/availability` or modify the `booking_settings` in the Settings table.

Configurable settings:
- `bufferTime`: Minutes between appointments (default: 30)
- `advanceBookingDays`: How far ahead clients can book (default: 60)
- `minAdvanceHours`: Minimum notice required (default: 24)
- `depositPercentage`: Percentage required as deposit (default: 50)
- `requireDeposit`: Whether deposits are required (default: true)

### Customizing Brand Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  cream: '#FAF7F4',      // Background
  nearBlack: '#171517',  // Primary text
  accent: '#C89B7B',     // Buttons, highlights
  softLine: '#E0D4C8',   // Borders, dividers
  hover: '#8C5A3C',      // Hover states
},
```

### Customizing Email Templates

Edit email HTML in `lib/email.ts`. Each notification function includes inline styles for compatibility.

## Security Notes

- Admin routes are protected with JWT authentication
- Passwords are hashed with bcrypt
- API routes verify authentication tokens
- Input validation on all forms
- CORS configured for API routes

**Production recommendations:**
- Use strong JWT secret (32+ random characters)
- Enable HTTPS only
- Set secure cookie flags
- Implement rate limiting on API routes
- Add CAPTCHA to contact/booking forms
- Regular security audits

## Support & Maintenance

### Monitoring

Consider adding:
- Error tracking (Sentry, LogRocket)
- Analytics (Google Analytics, Plausible)
- Uptime monitoring (Uptime Robot, Pingdom)

### Backup Strategy

- Database: Daily automated backups
- Environment variables: Securely stored
- Code: Version controlled in Git

### Common Issues

**"Cannot connect to database"**
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Verify network access to database

**"Emails not sending"**
- Check SMTP credentials
- Verify SMTP_PORT (usually 587 or 465)
- Check spam folder for test emails
- For Gmail, use App Password, not regular password

**"Stripe payment fails"**
- Verify Stripe keys are correct (test vs production)
- Check Stripe dashboard for error details
- Ensure webhook endpoint is configured

## License

Proprietary - All rights reserved by MĒL11

## Contact

For technical support or questions about this application:
- Email: hello@mel11.com
- Phone: (253) 778-2735

---

Built with ❤️ for MĒL11
