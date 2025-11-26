'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Static services list
const SERVICES = [
  { name: "Women's Haircut", price: 40, duration: 60 },
  { name: "Men's Haircut", price: 32, duration: 45 },
  { name: "Kids' Haircut", price: 27, duration: 30 },
  { name: "Wash", price: 7, duration: 15 },
  { name: "Style", price: 25, duration: 30 },
  { name: "Partial Foil Highlights", price: 115, duration: 120 },
  { name: "Full Foil Highlights", price: 150, duration: 150 },
  { name: "Solid Color", price: 90, duration: 90 },
  { name: "Fashion Colors", price: 175, duration: 180 },
  { name: "Perms", price: 75, duration: 150 },
  { name: "Chemical Straightening", price: 115, duration: 180 },
  { name: "Hair Extensions", price: 150, duration: 180 },
  { name: "Hair Tinsel", price: 15, duration: 30 },
  { name: "Updo / Special Occasion Style", price: 75, duration: 90 },
  { name: "Signature House Call Facial", price: 120, duration: 75 },
  { name: "Hydrafacial Treatment", price: 175, duration: 60 },
  { name: "Dermabrasion", price: 95, duration: 60 },
  { name: "Chemical Peel", price: 110, duration: 60 },
  { name: "Microneedling", price: 200, duration: 90 },
  { name: "Lip Blush Tattoo", price: 350, duration: 120 },
  { name: "Laser Hair Removal Session", price: 100, duration: 45 },
  { name: "Brow Shaping & Tint", price: 35, duration: 30 },
  { name: "Lash Lift & Tint", price: 85, duration: 60 },
  { name: "Sugaring Hair Removal", price: 45, duration: 45 },
  { name: "Professional Teeth Whitening", price: 125, duration: 60 },
];

function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams?.get('service') || '';

  const [selectedService, setSelectedService] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Pre-select service from URL
  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const service = SERVICES.find(s => s.name === selectedService);

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream py-20">
        <div className="container-custom max-w-2xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 luxury-shadow text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-nearBlack mb-4">Booking Request Received!</h2>
            <p className="text-gray-600 mb-8">
              Thank you, {clientName}! We'll review your request and contact you within 24 hours to confirm your appointment.
            </p>
            <a
              href="/"
              className="inline-block px-8 py-4 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12 md:py-20">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-4 text-nearBlack">Book Your Appointment</h1>
          <p className="text-gray-600 text-lg">Let's bring luxury beauty to your door</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-10 luxury-shadow">
          {/* Service Selection */}
          <div className="mb-6">
            <label className="block text-nearBlack font-semibold mb-3 text-lg">
              Select Service *
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              required
              className="w-full px-4 py-3 md:py-4 border-2 border-softLine rounded-lg focus:border-accent focus:outline-none transition-colors text-base md:text-lg"
            >
              <option value="">Choose a service...</option>
              {SERVICES.map((svc) => (
                <option key={svc.name} value={svc.name}>
                  {svc.name} - ${svc.price}+ ({svc.duration} min)
                </option>
              ))}
            </select>
          </div>

          {/* Service Details */}
          {service && (
            <div className="mb-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <p className="font-semibold text-nearBlack">{service.name}</p>
                  <p className="text-sm text-gray-600">{service.duration} minutes</p>
                </div>
                <p className="text-2xl font-serif text-accent">${service.price}+</p>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="space-y-5 mb-6">
            <div>
              <label className="block text-nearBlack font-semibold mb-2">Your Name *</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                placeholder="Full name"
                className="w-full px-4 py-3 border-2 border-softLine rounded-lg focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-nearBlack font-semibold mb-2">Email *</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 border-2 border-softLine rounded-lg focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-nearBlack font-semibold mb-2">Phone *</label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                required
                placeholder="(253) 555-0123"
                className="w-full px-4 py-3 border-2 border-softLine rounded-lg focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-nearBlack font-semibold mb-2">Preferred Date</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-softLine rounded-lg focus:border-accent focus:outline-none transition-colors"
              />
              <p className="text-sm text-gray-500 mt-1">We'll confirm availability and contact you to schedule</p>
            </div>

            <div>
              <label className="block text-nearBlack font-semibold mb-2">Additional Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Any special requests or information we should know..."
                className="w-full px-4 py-3 border-2 border-softLine rounded-lg focus:border-accent focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-accent text-white py-4 rounded-lg hover:bg-hover transition-colors font-semibold text-lg shadow-lg"
          >
            Request Booking
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            We'll contact you within 24 hours to confirm your appointment
          </p>
        </form>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <BookingForm />
    </Suspense>
  );
}
