'use client';

import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/admin-auth';
import LoadingSpinner from '@/components/LoadingSpinner';
import { format } from 'date-fns';

interface Stats {
  todayBookings: number;
  weekBookings: number;
  monthBookings: number;
  totalRevenue: number;
  upcomingBookings: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading stats:', error);
        setLoading(false);
      });
  }, []);

  if (loading || !stats) {
    return (
      <div className="container mx-auto px-4 py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl mb-8 text-nearBlack">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-500 mb-2">Today's Bookings</div>
          <div className="text-3xl font-serif text-accent">{stats.todayBookings}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-500 mb-2">This Week</div>
          <div className="text-3xl font-serif text-accent">{stats.weekBookings}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-500 mb-2">This Month</div>
          <div className="text-3xl font-serif text-accent">{stats.monthBookings}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-500 mb-2">Total Revenue</div>
          <div className="text-3xl font-serif text-accent">${stats.totalRevenue.toFixed(0)}</div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-softLine">
          <h2 className="text-2xl font-serif text-nearBlack">Upcoming Appointments</h2>
        </div>

        {stats.upcomingBookings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No upcoming bookings</div>
        ) : (
          <div className="divide-y divide-softLine">
            {stats.upcomingBookings.map((booking) => (
              <div key={booking.id} className="p-6 hover:bg-cream transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-nearBlack mb-1">{booking.service.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{booking.client.name}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(booking.scheduledDate), 'EEE, MMM dd, yyyy')} at {booking.scheduledTime}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{booking.client.phone}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'CONFIRMED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
