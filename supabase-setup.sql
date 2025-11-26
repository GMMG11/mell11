-- MĒL11 Database Setup Script
-- Run this in your Supabase SQL Editor

-- Create enum types
CREATE TYPE "ServiceCategory" AS ENUM (
  'SKIN_AND_FACIALS',
  'ADVANCED_TREATMENTS',
  'BROWS_LASHES_MAKEUP',
  'HAIR_AND_COLOR',
  'TEETH_WHITENING',
  'VIP_MEMBERSHIPS'
);

CREATE TYPE "BookingStatus" AS ENUM (
  'PENDING',
  'CONFIRMED',
  'COMPLETED',
  'CANCELLED'
);

CREATE TYPE "PaymentStatus" AS ENUM (
  'PENDING',
  'DEPOSIT_PAID',
  'PAID',
  'REFUNDED'
);

-- Create tables
CREATE TABLE "AdminUser" (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "Service" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category "ServiceCategory" NOT NULL,
    description TEXT NOT NULL,
    duration INTEGER NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "addOns" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "Client" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    city TEXT,
    "zipCode" TEXT,
    notes TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX "Client_email_idx" ON "Client"(email);

CREATE TABLE "Booking" (
    id TEXT PRIMARY KEY,
    "bookingNumber" TEXT UNIQUE NOT NULL,
    "serviceId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "scheduledTime" TEXT NOT NULL,
    duration INTEGER NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    notes TEXT,
    status "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentAmount" DOUBLE PRECISION,
    "stripePaymentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "Booking_scheduledDate_idx" ON "Booking"("scheduledDate");
CREATE INDEX "Booking_status_idx" ON "Booking"(status);
CREATE INDEX "Booking_clientId_idx" ON "Booking"("clientId");

CREATE TABLE "Settings" (
    id TEXT PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "Availability" (
    id TEXT PRIMARY KEY,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    UNIQUE ("dayOfWeek")
);

CREATE TABLE "BlackoutDate" (
    id TEXT PRIMARY KEY,
    date TIMESTAMP(3) NOT NULL,
    reason TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "BlackoutDate_date_idx" ON "BlackoutDate"(date);

-- Success message
SELECT 'Database schema created successfully!' as message;
