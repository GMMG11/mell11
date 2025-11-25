'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Textarea from '@/components/Textarea';
import LoadingSpinner from '@/components/LoadingSpinner';
import { formatTimeForDisplay } from '@/lib/availability';
import { format } from 'date-fns';

interface Service {
  id: string;
  name: string;
  slug: string;
  duration: number;
  price: number;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // TypeScript-safe way to get search params (component is wrapped in Suspense)
  const preselectedService = searchParams !== null ? searchParams.get('service') : null;

  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  // Form data
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Tacoma');
  const [zipCode, setZipCode] = useState('');
  const [notes, setNotes] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Load services
  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data);

        // Pre-select service if slug is in URL
        if (preselectedService) {
          const service = data.find((s: Service) => s.slug === preselectedService);
          if (service) {
            setSelectedServiceId(service.id);
          }
        }
      })
      .catch((error) => console.error('Error loading services:', error));
  }, [preselectedService]);

  // Load available dates when service is selected
  useEffect(() => {
    if (selectedServiceId) {
      fetch('/api/availability/dates')
        .then((res) => res.json())
        .then((data) => setAvailableDates(data.dates))
        .catch((error) => console.error('Error loading dates:', error));
    }
  }, [selectedServiceId]);

  // Load available time slots when date is selected
  useEffect(() => {
    if (selectedDate && selectedServiceId) {
      const service = services.find((s) => s.id === selectedServiceId);
      if (service) {
        fetch(`/api/availability/slots?date=${selectedDate}&duration=${service.duration}`)
          .then((res) => res.json())
          .then((data) => setAvailableSlots(data.slots))
          .catch((error) => console.error('Error loading slots:', error));
      }
    }
  }, [selectedDate, selectedServiceId, services]);

  const selectedService = services.find((s) => s.id === selectedServiceId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedServiceId,
          date: selectedDate,
          time: selectedTime,
          clientName,
          clientEmail,
          clientPhone,
          address,
          city,
          zipCode,
          notes,
          requirePayment: false, // TODO: Implement payment flow
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create booking');
      }

      const data = await response.json();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white max-w-2xl mx-auto p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-accent"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="font-serif text-3xl mb-4 text-nearBlack">Booking confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Your appointment request has been received. You'll receive a confirmation email shortly with all
          the details.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          We'll reach out within 24 hours to confirm your appointment and answer any questions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => router.push('/')} variant="primary">
            Back to home
          </Button>
          <Button onClick={() => window.location.reload()} variant="outline">
            Book another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
      {/* Progress Steps */}
      <div className="flex justify-between mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= s ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s}
            </div>
            {s < 3 && <div className={`flex-1 h-1 ${step > s ? 'bg-accent' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Select Service & Date/Time */}
        {step === 1 && (
          <div>
            <h2 className="font-serif text-3xl mb-6 text-nearBlack">Choose your service</h2>

            <Select
              label="Service"
              name="service"
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              options={services.map((s) => ({ value: s.id, label: `${s.name} - $${s.price}` }))}
              required
              placeholder="Select a service"
            />

            {selectedService && (
              <div className="bg-cream p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">{selectedService.name}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Duration: {selectedService.duration} minutes
                </p>
                <p className="text-lg font-serif text-accent">Price: ${selectedService.price}</p>
              </div>
            )}

            {selectedServiceId && availableDates.length > 0 && (
              <>
                <Select
                  label="Date"
                  name="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  options={availableDates.map((date) => ({
                    value: date,
                    label: format(new Date(date), 'EEEE, MMMM dd, yyyy'),
                  }))}
                  required
                  placeholder="Select a date"
                />

                {selectedDate && availableSlots.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-nearBlack mb-3">
                      Time <span className="text-accent">*</span>
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          disabled={!slot.available}
                          className={`py-3 px-4 border rounded-lg transition-all ${
                            selectedTime === slot.time
                              ? 'bg-accent text-white border-accent'
                              : slot.available
                              ? 'border-softLine hover:border-accent hover:bg-cream'
                              : 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                          }`}
                        >
                          {formatTimeForDisplay(slot.time)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => setStep(2)}
                disabled={!selectedServiceId || !selectedDate || !selectedTime}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Client Details */}
        {step === 2 && (
          <div>
            <h2 className="font-serif text-3xl mb-6 text-nearBlack">Your details</h2>

            <Input
              label="Full name"
              name="name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
              placeholder="Jane Doe"
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
              placeholder="jane@example.com"
            />

            <Input
              label="Phone number"
              name="phone"
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              required
              placeholder="(253) 555-1234"
            />

            <Input
              label="Street address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="123 Main St, Apt 4B"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />

              <Input
                label="ZIP code"
                name="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                placeholder="98401"
              />
            </div>

            <div className="flex gap-4">
              <Button type="button" onClick={() => setStep(1)} variant="outline">
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setStep(3)}
                disabled={!clientName || !clientEmail || !clientPhone || !address || !city || !zipCode}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Confirm */}
        {step === 3 && (
          <div>
            <h2 className="font-serif text-3xl mb-6 text-nearBlack">Review & confirm</h2>

            <div className="bg-cream p-6 rounded-lg mb-6 space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-gray-500 mb-1">Service</h4>
                <p className="text-nearBlack">{selectedService?.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 mb-1">Date</h4>
                  <p className="text-nearBlack">
                    {selectedDate && format(new Date(selectedDate), 'MMM dd, yyyy')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 mb-1">Time</h4>
                  <p className="text-nearBlack">{formatTimeForDisplay(selectedTime)}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-gray-500 mb-1">Location</h4>
                <p className="text-nearBlack">
                  {address}, {city}, WA {zipCode}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-gray-500 mb-1">Contact</h4>
                <p className="text-nearBlack">{clientName}</p>
                <p className="text-sm text-gray-600">{clientEmail}</p>
                <p className="text-sm text-gray-600">{clientPhone}</p>
              </div>

              <div className="pt-4 border-t border-softLine">
                <h4 className="font-semibold text-sm text-gray-500 mb-1">Total</h4>
                <p className="font-serif text-2xl text-accent">${selectedService?.price}</p>
              </div>
            </div>

            <Textarea
              label="Additional notes (optional)"
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests, parking instructions, allergies, etc."
              rows={3}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <Button type="button" onClick={() => setStep(2)} variant="outline" disabled={loading}>
                Back
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Booking...' : 'Confirm booking'}
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              By confirming, you agree to receive email and SMS confirmations about your appointment.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="bg-cream min-h-screen py-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl mb-4 text-nearBlack">Book a house call</h1>
          <p className="text-gray-600">Complete the form below to request an appointment</p>
        </div>

        <Suspense
          fallback={
            <div className="py-20">
              <LoadingSpinner size="lg" />
            </div>
          }
        >
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}
