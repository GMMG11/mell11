'use client';

import React, { useEffect, useState } from 'react';
import ServiceCard from '@/components/ServiceCard';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  duration: number;
  price: number;
  isFeatured: boolean;
}

const categoryNames: Record<string, string> = {
  SKIN_AND_FACIALS: 'Skin & Facials',
  ADVANCED_TREATMENTS: 'Advanced Treatments',
  BROWS_LASHES_MAKEUP: 'Brows, Lashes & Makeup',
  HAIR_AND_COLOR: 'Hair & Color',
  TEETH_WHITENING: 'Teeth Whitening',
  VIP_MEMBERSHIPS: 'VIP Memberships',
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading services:', error);
        setLoading(false);
      });
  }, []);

  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="bg-cream min-h-screen py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-nearBlack">Our services</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From advanced facials and microneedling to brow shaping, haircuts, and teeth whitening—MĒL11
            brings a full range of professional beauty services directly to your door.
          </p>
        </div>

        {loading ? (
          <div className="py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="space-y-20">
            {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
              <div key={category}>
                <div className="mb-8">
                  <h2 className="font-serif text-4xl text-nearBlack mb-2">
                    {categoryNames[category] || category}
                  </h2>
                  <div className="w-24 h-1 bg-accent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      name={service.name}
                      description={service.description}
                      duration={service.duration}
                      price={service.price}
                      slug={service.slug}
                      featured={service.isFeatured}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Note */}
        <div className="mt-20 p-8 bg-white rounded-lg border border-softLine max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl mb-4 text-nearBlack">A note about pricing</h3>
          <p className="text-gray-600 leading-relaxed">
            All listed prices are base rates. Final pricing may vary based on service duration, add-ons,
            travel distance, and specific client needs. We'll provide a detailed quote before confirming
            your appointment.
          </p>
        </div>
      </div>
    </div>
  );
}
