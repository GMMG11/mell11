'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { format, addDays, startOfWeek, isSameDay, parseISO } from 'date-fns';

// Static services list
const SERVICES = [
  // Transformation Program
  { name: "Signature Transformation Program (8-Week)", price: 899, duration: 480, trending: true },
  { name: "Signature Transformation Program (12-Week)", price: 1350, duration: 720, trending: true },

  // Advanced Aesthetic Treatments
  { name: "Microneedling", price: 200, duration: 90, popular: true },
  { name: "Hydrafacial Treatment", price: 175, duration: 60, popular: true },
  { name: "Chemical Peel", price: 110, duration: 60 },
  { name: "Dermabrasion", price: 95, duration: 60 },
  { name: "Laser Hair Removal Session", price: 100, duration: 45 },
  { name: "Lip Blush Tattoo", price: 350, duration: 120 },

  // Signature Skin & Facials
  { name: "Signature House Call Facial", price: 120, duration: 75, popular: true },
  { name: "Custom Facial Experience", price: 125, duration: 75 },
  { name: "Dermaplaning Facial", price: 95, duration: 60 },
  { name: "Classic European Facial", price: 95, duration: 60 },
  { name: "Deep Cleansing Facial", price: 120, duration: 75 },
  { name: "Acne Facial", price: 110, duration: 75 },
  { name: "Detox Facial", price: 110, duration: 75 },
  { name: "Glycolic or Enzyme Facial", price: 110, duration: 60 },
  { name: "Men's Executive Facial", price: 110, duration: 60 },
  { name: "Back Facial", price: 110, duration: 60 },
  { name: "Intimate Glow Treatment", price: 95, duration: 60 },

  // Brows & Lashes
  { name: "Brow Shaping & Tint", price: 35, duration: 30 },
  { name: "Lash Lift & Tint", price: 85, duration: 60 },
  { name: "Sugaring Hair Removal", price: 45, duration: 45 },

  // Waxing Services
  { name: "Brow Wax", price: 30, duration: 20 },
  { name: "Lip or Chin Wax", price: 30, duration: 20 },
  { name: "Underarm Wax", price: 40, duration: 25 },
  { name: "Brazilian Wax", price: 75, duration: 45 },
  { name: "Bikini Line Wax", price: 50, duration: 30 },
  { name: "Full Leg Wax", price: 75, duration: 60 },

  // Teeth Whitening
  { name: "Professional Teeth Whitening", price: 125, duration: 60 },

  // Makeup & Special Services
  { name: "Makeup Application", price: 150, duration: 75 },

  // Hair Services
  { name: "Women's Precision Cut", price: 95, duration: 75 },
  { name: "Men's Precision Cut & Finish", price: 65, duration: 45 },
  { name: "Special Occasion Style", price: 150, duration: 90 },

  // Luxury Color Services
  { name: "Partial Foil Highlights", price: 155, duration: 120 },
  { name: "Full Foil Highlights", price: 195, duration: 150 },
  { name: "Solid Color Refresh", price: 140, duration: 90 },
  { name: "Fashion / Vivid Colors", price: 225, duration: 180 },
  { name: "Hair Extensions", price: 250, duration: 180 },
];

// Simulated recent bookings for social proof
const RECENT_BOOKINGS = [
  { name: "Sarah", location: "Tacoma", service: "Hydrafacial", time: 12 },
  { name: "Jennifer", location: "Puyallup", service: "Signature Facial", time: 23 },
  { name: "Amanda", location: "Seattle", service: "Microneedling", time: 45 },
];

function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams?.get('service') || '';

  const [step, setStep] = useState(1); // 1: Service, 2: Time, 3: Details
  const [selectedService, setSelectedService] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Slot info type
  interface SlotInfo {
    time: string;
    available: boolean;
    reason?: 'booked' | 'too_soon';
  }

  // Calendar state
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [availability, setAvailability] = useState<{ [key: string]: SlotInfo[] }>({});
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [totalSlotsThisWeek, setTotalSlotsThisWeek] = useState(0);

  // FOMO state
  const [recentBookingIndex, setRecentBookingIndex] = useState(0);

  // Pre-select service from URL
  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
      setStep(2);
    }
  }, [preselectedService]);

  // Fetch availability when week changes
  useEffect(() => {
    fetchAvailability();
  }, [weekStart]);

  // Rotate recent booking notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setRecentBookingIndex((prev) => (prev + 1) % RECENT_BOOKINGS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const fetchAvailability = async () => {
    setLoadingAvailability(true);
    try {
      const response = await fetch(`/api/availability?startDate=${weekStart.toISOString()}`);
      const data = await response.json();

      if (response.ok) {
        setAvailability(data.slots);
        setTotalSlotsThisWeek(data.totalAvailable);
      }
    } catch (err) {
      console.error('Error fetching availability:', err);
    } finally {
      setLoadingAvailability(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !selectedService) return;

    setLoading(true);
    setError('');

    const service = SERVICES.find(s => s.name === selectedService);

    try {
      const response = await fetch('/api/bookings/create-google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          clientPhone,
          serviceName: selectedService,
          startTime: selectedSlot.toISOString(),
          duration: service?.duration || 60,
          notes,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create booking');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const service = SERVICES.find(s => s.name === selectedService);
  const recentBooking = RECENT_BOOKINGS[recentBookingIndex];

  const nextWeek = () => {
    setWeekStart(addDays(weekStart, 7));
  };

  const prevWeek = () => {
    const newWeek = addDays(weekStart, -7);
    if (newWeek >= startOfWeek(new Date(), { weekStartsOn: 1 })) {
      setWeekStart(newWeek);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream py-20">
        <div className="container-custom max-w-2xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 luxury-shadow text-center">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-nearBlack mb-4">Your Appointment is Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Thank you, {clientName}! We've added your appointment to the calendar and sent a confirmation to {clientEmail}.
            </p>
            <div className="bg-accent/5 rounded-lg p-6 mb-8">
              <p className="text-lg font-semibold text-nearBlack mb-2">{service?.name}</p>
              <p className="text-gray-600">
                {selectedSlot && format(selectedSlot, 'EEEE, MMMM d, yyyy')}
                <br />
                {selectedSlot && format(selectedSlot, 'h:mm a')} PST
              </p>
            </div>
            <a
              href="/"
              className="inline-block px-8 py-4 bg-accent text-white rounded-lg hover:bg-hover transition-colors font-medium"
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
      <div className="container-custom max-w-5xl">
        {/* Header with FOMO */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl md:text-5xl mb-4 text-nearBlack">Book Your Appointment</h1>
          <p className="text-gray-600 text-lg mb-6">Let's bring luxury beauty to your door</p>

          {/* FOMO: Scarcity Indicator */}
          {totalSlotsThisWeek > 0 && totalSlotsThisWeek <= 10 && (
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/10 to-hover/10 border border-accent/30 rounded-full px-6 py-2 mb-4">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium text-accent">
                Only {totalSlotsThisWeek} appointments available this week
              </span>
            </div>
          )}

          {/* FOMO: Recent Booking Notification */}
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm animate-fade-in-up">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-nearBlack">{recentBooking.name}</span> from {recentBooking.location} booked {recentBooking.service} <span className="text-accent">{recentBooking.time} min ago</span>
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-accent' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-accent text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="hidden sm:inline font-medium">Service</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-accent' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-accent text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="hidden sm:inline font-medium">Time</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300" />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-accent' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-accent text-white' : 'bg-gray-200'}`}>
              3
            </div>
            <span className="hidden sm:inline font-medium">Details</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-10 luxury-shadow">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h2 className="font-serif text-2xl md:text-3xl mb-6 text-nearBlack">Select Your Service</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {SERVICES.map((svc) => (
                  <button
                    key={svc.name}
                    onClick={() => {
                      setSelectedService(svc.name);
                      setStep(2);
                    }}
                    className={`text-left p-4 border-2 rounded-lg transition-all hover:border-accent hover:shadow-md ${
                      selectedService === svc.name ? 'border-accent bg-accent/5' : 'border-softLine'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-nearBlack pr-2">{svc.name}</p>
                      {(svc as any).trending && (
                        <span className="text-xs bg-accent text-white px-2 py-1 rounded-full">Trending</span>
                      )}
                      {(svc as any).popular && (
                        <span className="text-xs bg-hover text-white px-2 py-1 rounded-full">Popular</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{svc.duration} min</span>
                      <span className="text-lg font-serif text-accent">${svc.price}+</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Time Selection */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <div className="mb-6">
                <button
                  onClick={() => setStep(1)}
                  className="text-accent hover:text-hover transition-colors flex items-center gap-2 mb-4"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Change Service
                </button>

                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-serif text-2xl md:text-3xl text-nearBlack">Select Your Time</h2>
                  {service && (
                    <div className="text-right">
                      <p className="font-semibold text-nearBlack">{service.name}</p>
                      <p className="text-sm text-gray-600">{service.duration} min · ${service.price}+</p>
                    </div>
                  )}
                </div>

                {/* Booking Notice */}
                <p className="text-sm text-gray-500 text-center mb-4 font-serif italic">
                  Appointments require at least 2 hours advance notice
                </p>

                {/* Week Navigation */}
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={prevWeek}
                    disabled={weekStart <= startOfWeek(new Date(), { weekStartsOn: 1 })}
                    className="p-2 rounded-lg hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h3 className="font-semibold text-lg">
                    {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
                  </h3>
                  <button
                    onClick={nextWeek}
                    className="p-2 rounded-lg hover:bg-accent/10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Week View Calendar */}
                {loadingAvailability ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading availability...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {[0, 1, 2, 3, 4, 5].map((dayOffset) => {
                      const day = addDays(weekStart, dayOffset);
                      const dateKey = format(day, 'yyyy-MM-dd');
                      const slots = availability[dateKey] || [];
                      const dayName = format(day, 'EEE');
                      const dayNum = format(day, 'd');

                      return (
                        <div key={dayOffset} className="border border-softLine rounded-lg overflow-hidden">
                          <div className="bg-accent/5 p-2 text-center border-b border-softLine">
                            <p className="text-xs font-semibold text-accent uppercase">{dayName}</p>
                            <p className="text-lg font-serif text-nearBlack">{dayNum}</p>
                          </div>
                          <div className="p-2 space-y-1 max-h-64 overflow-y-auto">
                            {slots.length === 0 ? (
                              <p className="text-xs text-gray-400 text-center py-2 italic">
                                Closed
                              </p>
                            ) : (
                              slots.map((slot) => {
                                const slotTime = parseISO(slot.time as any);
                                const isSelected = selectedSlot && isSameDay(selectedSlot, slotTime) && selectedSlot.getTime() === slotTime.getTime();
                                const isAvailable = slot.available;
                                const isBooked = slot.reason === 'booked';
                                const isTooSoon = slot.reason === 'too_soon';

                                return (
                                  <button
                                    key={slotTime.toISOString()}
                                    onClick={() => isAvailable && setSelectedSlot(slotTime)}
                                    disabled={!isAvailable}
                                    className={`w-full text-xs py-2 px-1 rounded transition-all ${
                                      isSelected
                                        ? 'bg-accent text-white shadow-md'
                                        : isAvailable
                                          ? 'bg-cream hover:bg-accent/10 text-nearBlack cursor-pointer'
                                          : 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                                    }`}
                                    title={isBooked ? 'Booked' : isTooSoon ? 'Too soon to book' : ''}
                                  >
                                    {format(slotTime, 'h:mm a')}
                                  </button>
                                );
                              })
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {selectedSlot && (
                <button
                  onClick={() => setStep(3)}
                  className="w-full bg-accent text-white py-4 rounded-lg hover:bg-hover transition-colors font-semibold text-lg shadow-lg"
                >
                  Continue to Details
                </button>
              )}
            </div>
          )}

          {/* Step 3: Client Details */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="animate-fade-in-up">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-accent hover:text-hover transition-colors flex items-center gap-2 mb-6"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Change Time
              </button>

              <h2 className="font-serif text-2xl md:text-3xl mb-6 text-nearBlack">Your Information</h2>

              {/* Booking Summary */}
              <div className="bg-accent/5 rounded-lg p-6 mb-6 border border-accent/20">
                <h3 className="font-semibold text-nearBlack mb-3">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium text-nearBlack">{service?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-nearBlack">
                      {selectedSlot && format(selectedSlot, 'EEEE, MMMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium text-nearBlack">
                      {selectedSlot && format(selectedSlot, 'h:mm a')} PST
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-nearBlack">{service?.duration} minutes</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-accent/20">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-accent text-lg">${service?.price}+</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white py-4 rounded-lg hover:bg-hover transition-colors font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Confirming Booking...' : 'Confirm Appointment'}
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                You'll receive a confirmation email with all the details
              </p>
            </form>
          )}
        </div>
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
