'use client';

import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/admin-auth';
import LoadingSpinner from '@/components/LoadingSpinner';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { format } from 'date-fns';

interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

interface BlackoutDate {
  id: string;
  date: string;
  reason: string | null;
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AdminAvailabilityPage() {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [blackouts, setBlackouts] = useState<BlackoutDate[]>([]);
  const [loading, setLoading] = useState(true);

  const [newBlackoutDate, setNewBlackoutDate] = useState('');
  const [newBlackoutReason, setNewBlackoutReason] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    Promise.all([
      fetchWithAuth('/api/admin/availability').then((res) => res.json()),
      fetchWithAuth('/api/admin/blackout').then((res) => res.json()),
    ])
      .then(([availData, blackoutData]) => {
        // Fill in all days of the week
        const allDays = Array.from({ length: 7 }, (_, i) => {
          const existing = availData.find((a: Availability) => a.dayOfWeek === i);
          return (
            existing || {
              id: '',
              dayOfWeek: i,
              startTime: '09:00',
              endTime: '18:00',
              isActive: false,
            }
          );
        });

        setAvailability(allDays);
        setBlackouts(blackoutData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  };

  const updateAvailability = async (day: Availability) => {
    try {
      await fetchWithAuth('/api/admin/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(day),
      });

      loadData();
    } catch (error) {
      console.error('Error updating availability:', error);
      alert('Failed to update availability');
    }
  };

  const addBlackout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetchWithAuth('/api/admin/blackout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: newBlackoutDate,
          reason: newBlackoutReason || null,
        }),
      });

      setNewBlackoutDate('');
      setNewBlackoutReason('');
      loadData();
    } catch (error) {
      console.error('Error adding blackout:', error);
      alert('Failed to add blackout date');
    }
  };

  const removeBlackout = async (id: string) => {
    if (!confirm('Remove this blackout date?')) return;

    try {
      await fetchWithAuth(`/api/admin/blackout/${id}`, {
        method: 'DELETE',
      });

      loadData();
    } catch (error) {
      console.error('Error removing blackout:', error);
      alert('Failed to remove blackout date');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl mb-8 text-nearBlack">Availability Management</h1>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-serif text-nearBlack mb-6">Weekly Schedule</h2>

        <div className="space-y-4">
          {availability.map((day) => (
            <div key={day.dayOfWeek} className="flex items-center gap-4 p-4 bg-cream rounded-lg">
              <label className="flex items-center min-w-[40px]">
                <input
                  type="checkbox"
                  checked={day.isActive}
                  onChange={(e) => updateAvailability({ ...day, isActive: e.target.checked })}
                  className="mr-2"
                />
              </label>

              <div className="flex-1 grid grid-cols-3 gap-4 items-center">
                <span className="font-medium text-nearBlack">{dayNames[day.dayOfWeek]}</span>

                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={day.startTime}
                    onChange={(e) => updateAvailability({ ...day, startTime: e.target.value })}
                    disabled={!day.isActive}
                    className="px-3 py-2 border border-softLine rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={day.endTime}
                    onChange={(e) => updateAvailability({ ...day, endTime: e.target.value })}
                    disabled={!day.isActive}
                    className="px-3 py-2 border border-softLine rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100"
                  />
                </div>

                <span className={`text-sm ${day.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                  {day.isActive ? 'Available' : 'Closed'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blackout Dates */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-serif text-nearBlack mb-6">Blackout Dates</h2>

        <form onSubmit={addBlackout} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Date"
              name="date"
              type="date"
              value={newBlackoutDate}
              onChange={(e) => setNewBlackoutDate(e.target.value)}
              required
            />

            <Input
              label="Reason (optional)"
              name="reason"
              value={newBlackoutReason}
              onChange={(e) => setNewBlackoutReason(e.target.value)}
              placeholder="Vacation, personal day, etc."
            />

            <div className="flex items-end">
              <Button type="submit" className="w-full">
                Add Blackout
              </Button>
            </div>
          </div>
        </form>

        {blackouts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No blackout dates scheduled</p>
        ) : (
          <div className="space-y-2">
            {blackouts.map((blackout) => (
              <div
                key={blackout.id}
                className="flex items-center justify-between p-4 bg-cream rounded-lg"
              >
                <div>
                  <div className="font-medium text-nearBlack">
                    {format(new Date(blackout.date), 'EEEE, MMMM dd, yyyy')}
                  </div>
                  {blackout.reason && (
                    <div className="text-sm text-gray-600">{blackout.reason}</div>
                  )}
                </div>
                <button
                  onClick={() => removeBlackout(blackout.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
