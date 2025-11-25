'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import ServiceCard from '@/components/ServiceCard';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: number;
  price: number;
  isFeatured: boolean;
}

export default function HomePage() {
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        const featured = data.filter((s: Service) => s.isFeatured).slice(0, 3);
        setFeaturedServices(featured);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading services:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-cream to-white">
        <div className="container-custom text-center py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl mb-6 text-nearBlack tracking-wide">
              MĒL11
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-700 mb-4 font-light">
              In-home luxury skin + aesthetics
            </h2>
            <p className="text-xl text-accent font-serif mb-12">Beauty. Brought to you.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" variant="primary">
                  Book a house call
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline">
                  View services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-serif text-4xl mb-6 text-nearBlack">
              Studio-level care, in your space
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              MĒL11 brings professional skin and beauty services directly into your home—no driving, no
              waiting room, no overhead lights. Just you, your treatment, and a calm, elevated experience
              designed around your comfort.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every appointment is one-on-one, unhurried, and tailored to your needs. From advanced facials
              to brow shaping, microneedling to in-home color—MĒL11 makes luxury feel accessible, personal,
              and real.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h3 className="font-serif text-4xl mb-4 text-nearBlack">Signature services</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A curated selection of treatments designed to bring you results without leaving home
            </p>
          </div>

          {loading ? (
            <div className="py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.map((service) => (
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
          )}

          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" size="lg">
                View all services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h3 className="font-serif text-4xl mb-4 text-nearBlack">How it works</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-serif text-2xl">1</span>
              </div>
              <h4 className="font-serif text-2xl mb-4">Choose your service</h4>
              <p className="text-gray-600">
                Browse our curated menu of facials, treatments, brows, lashes, hair, and more
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-serif text-2xl">2</span>
              </div>
              <h4 className="font-serif text-2xl mb-4">Pick your time & location</h4>
              <p className="text-gray-600">
                Select a date and time that works for you, and provide your address
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-serif text-2xl">3</span>
              </div>
              <h4 className="font-serif text-2xl mb-4">We come to you</h4>
              <p className="text-gray-600">
                Show up fully equipped, ready to deliver an elevated, private experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-nearBlack text-cream">
        <div className="container-custom text-center">
          <h3 className="font-serif text-4xl mb-6">Ready to elevate your routine?</h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Book your first house call today and experience the difference of personalized, professional
            beauty services in the comfort of your own space.
          </p>
          <Link href="/book">
            <Button size="lg" variant="primary">
              Book now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
