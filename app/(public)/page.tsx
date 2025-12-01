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

function HeroBackground() {
  return (
    <div className="fixed inset-0 z-0 md:absolute">
      {/* Video Background - Loops Continuously */}
      <video
        className="w-full h-full object-cover object-center"
        style={{
          filter: 'brightness(0.4)',
          minHeight: '100vh',
          minWidth: '100vw'
        }}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      >
        <source src="https://hvujayiaqhixrbwznlxy.supabase.co/storage/v1/object/public/images/Video%20MEL11COM.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-nearBlack/60 via-nearBlack/50 to-cream" />
    </div>
  );
}

export default function HomePage() {
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollSections, setScrollSections] = useState<{ [key: string]: boolean }>({});

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

  // Scroll effect for text color transition
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const videoHeight = window.innerHeight; // Video takes full viewport height
      const newScrollSections: { [key: string]: boolean } = {};

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // Check if section is overlapping with the top portion (video area)
        // Consider it overlapping if the section's top is in the upper 30% of viewport
        const isInVideoZone = rect.top < videoHeight * 0.3 && rect.top > -rect.height;
        newScrollSections[`section-${index}`] = isInVideoZone;
      });

      setScrollSections(newScrollSections);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-cream">
      {/* Hero Section - Ultra Premium */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Media with Video Transition */}
        <HeroBackground />

        {/* Content */}
        <div className="container-custom relative z-10 text-center py-32 animate-fade-in-up">
          <div className="max-w-5xl mx-auto">
            {/* Luxury Badge */}
            <div className="inline-block mb-8 px-6 py-2 bg-accent border-2 border-white rounded-full">
              <span className="text-sm tracking-[0.3em] uppercase text-white font-medium">
                Est. Since 2005 • Licensed & Certified
              </span>
            </div>

            <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl mb-8 text-cream tracking-tight leading-[0.9]">
              MĒL<span className="inline-block">11</span>
            </h1>

            <div className="mb-6">
              <p className="text-2xl md:text-3xl lg:text-4xl text-cream/90 mb-3 font-light tracking-wide">
                In-home luxury skin + aesthetics
              </p>
              <div className="luxury-divider max-w-md mx-auto mb-6" />
              <p className="text-xl md:text-2xl gradient-text font-serif italic">
                Beauty. Brought to you.
              </p>
            </div>

            <p className="text-lg text-cream/80 max-w-2xl mx-auto mb-12 leading-relaxed">
              Experience studio-level aesthetics in the sanctuary of your home.
              Serving discerning clients across Tacoma and Greater Seattle.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/book">
                <Button size="lg" variant="primary" className="min-w-[240px] luxury-hover">
                  Reserve Your Experience
                </Button>
              </Link>
              <Link href="/services">
                <button className="elegant-underline text-cream text-lg px-8 py-4">
                  Explore Services
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-cream/70 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Fully Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>19+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Private Sessions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 text-cream/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Philosophy Section */}
      <section
        data-section="1"
        className={`py-10 md:py-20 relative overflow-hidden z-20 transition-colors duration-500 ${
          scrollSections['section-1'] ? 'bg-transparent' : 'bg-white'
        }`}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-block mb-6 px-6 py-2 border rounded-full transition-colors duration-500 ${
              scrollSections['section-1'] ? 'border-white/30' : 'border-softLine'
            }`}>
              <span className={`text-sm tracking-[0.2em] uppercase transition-colors duration-500 ${
                scrollSections['section-1'] ? 'text-white' : 'text-accent'
              }`}>Our Philosophy</span>
            </div>

            <h2 className={`font-serif text-5xl md:text-6xl mb-8 leading-tight transition-colors duration-500 ${
              scrollSections['section-1'] ? 'text-white' : 'text-nearBlack'
            }`}>
              Studio-level care,<br />in your sanctuary
            </h2>

            <div className="luxury-divider max-w-xs mx-auto mb-12" />

            <div className="grid md:grid-cols-3 gap-12 text-left">
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors duration-500 ${
                  scrollSections['section-1'] ? 'bg-white/20' : 'bg-accent/10'
                }`}>
                  <svg className={`w-6 h-6 transition-colors duration-500 ${
                    scrollSections['section-1'] ? 'text-white' : 'text-accent'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className={`font-serif text-2xl transition-colors duration-500 ${
                  scrollSections['section-1'] ? 'text-white' : 'text-nearBlack'
                }`}>Uncompromising Quality</h3>
                <p className={`leading-relaxed transition-colors duration-500 ${
                  scrollSections['section-1'] ? 'text-white/80' : 'text-gray-600'
                }`}>
                  Medical-grade equipment, pharmaceutical skincare, and advanced techniques—delivered with the intimacy of your own space.
                </p>
              </div>

              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors duration-500 ${
                  scrollSections['section-1'] ? 'bg-white/20' : 'bg-accent/10'
                }`}>
                  <svg className={`w-6 h-6 transition-colors duration-500 ${
                    scrollSections['section-1'] ? 'text-white' : 'text-accent'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className={`font-serif text-2xl transition-colors duration-500 ${
                  scrollSections['section-1'] ? 'text-white' : 'text-nearBlack'
                }`}>Your Time, Honored</h3>
                <p className={`leading-relaxed transition-colors duration-500 ${
                  scrollSections['section-1'] ? 'text-white/80' : 'text-gray-600'
                }`}>
                  No waiting rooms. No rushing. Every appointment is unhurried, one-on-one, and designed entirely around you.
                </p>
              </div>

              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors duration-500 ${
                  scrollSections['section-1'] ? 'bg-white/20' : 'bg-accent/10'
                }`}>
                  <svg className={`w-6 h-6 transition-colors duration-500 ${
                    scrollSections['section-1'] ? 'text-white' : 'text-accent'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className={`font-serif text-2xl transition-colors duration-500 ${
                  scrollSections['section-1'] ? 'text-white' : 'text-nearBlack'
                }`}>Discretion Guaranteed</h3>
                <p className={`leading-relaxed transition-colors duration-500 ${
                  scrollSections['section-1'] ? 'text-white/80' : 'text-gray-600'
                }`}>
                  Complete privacy, professional confidentiality, and the comfort of receiving treatments in a familiar environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-10 md:py-20 bg-gradient-to-b from-white to-cream relative z-20">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-20">
            <div className="inline-block mb-6 px-6 py-2 border border-softLine rounded-full">
              <span className="text-sm tracking-[0.2em] uppercase text-accent">Signature Services</span>
            </div>

            <h3 className="font-serif text-5xl md:text-6xl mb-6 text-nearBlack">
              Curated for excellence
            </h3>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Each treatment is meticulously designed to deliver transformative results
              in the tranquility of your home
            </p>
          </div>

          {loading ? (
            <div className="py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {featuredServices.map((service, index) => (
                <div
                  key={service.id}
                  className={`animate-fade-in-up delay-${index * 100}`}
                >
                  <ServiceCard
                    name={service.name}
                    description={service.description}
                    duration={service.duration}
                    price={service.price}
                    slug={service.slug}
                    featured={service.isFeatured}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link href="/services">
              <Button variant="outline" size="lg" className="luxury-hover">
                View Complete Service Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Transformation Program */}
      <section className="py-10 md:py-20 bg-gradient-to-br from-nearBlack to-accent/90 text-cream relative z-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-cream/20 rounded-full">
              <span className="text-xs tracking-widest uppercase text-cream/90">Premium Program</span>
            </div>

            <h2 className="font-serif text-5xl md:text-6xl mb-4 text-white">
              The MĒL11 Signature Transformation
            </h2>

            <p className="text-xl text-cream/90 mb-8">
              8–12 week private rejuvenation program<br />
              Starting at $899
            </p>

            <p className="text-lg text-cream/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              A customized, in-home skin renewal experience featuring biweekly advanced treatments, curated product plans, and measurable results.
            </p>

            <Link href="/services#transformation">
              <Button size="lg" variant="outline" className="min-w-[240px] luxury-hover border-cream text-cream hover:bg-accent hover:text-white">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - Premium Process */}
      <section className="py-10 md:py-20 bg-white relative z-20">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-20">
            <div className="inline-block mb-6 px-6 py-2 border border-softLine rounded-full">
              <span className="text-sm tracking-[0.2em] uppercase text-accent">The Experience</span>
            </div>

            <h3 className="font-serif text-5xl md:text-6xl mb-6 text-nearBlack">
              Effortless luxury
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="relative mb-8 inline-block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-hover flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-serif text-4xl">1</span>
                </div>
                {/* Connector Line */}
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-accent/30 to-transparent" />
              </div>
              <h4 className="font-serif text-3xl mb-4 text-nearBlack">Select</h4>
              <p className="text-gray-600 leading-relaxed">
                Browse our curated menu and choose the treatment that speaks to your needs
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8 inline-block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-hover flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-serif text-4xl">2</span>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-accent/30 to-transparent" />
              </div>
              <h4 className="font-serif text-3xl mb-4 text-nearBlack">Schedule</h4>
              <p className="text-gray-600 leading-relaxed">
                Choose your preferred date and time from our real-time availability
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8 inline-block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-hover flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-serif text-4xl">3</span>
                </div>
              </div>
              <h4 className="font-serif text-3xl mb-4 text-nearBlack">Experience</h4>
              <p className="text-gray-600 leading-relaxed">
                We arrive at your door, fully equipped, ready to deliver an exceptional experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-10 md:py-20 pb-0 bg-gradient-to-b from-white to-cream relative z-20">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-20">
            <div className="inline-block mb-6 px-6 py-2 border border-softLine rounded-full">
              <span className="text-sm tracking-[0.2em] uppercase text-accent">Client Experiences</span>
            </div>

            <h3 className="font-serif text-5xl md:text-6xl mb-6 text-nearBlack">
              Trusted by those who<br />demand the best
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="glass-card p-8 rounded-2xl luxury-hover">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "Melissa is absolutely amazing. She takes real pride in her work and is incredibly knowledgeable. I felt completely at ease in my own home."
              </p>
              <div className="font-medium text-nearBlack">Kala W.</div>
              <div className="text-sm text-gray-500">Facial & Brow Services</div>
            </div>

            <div className="glass-card p-8 rounded-2xl luxury-hover">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "The convenience of having professional beauty services come to my home is unmatched. Always on time, professional, and the results are stunning."
              </p>
              <div className="font-medium text-nearBlack">Tera R.</div>
              <div className="text-sm text-gray-500">Regular Client</div>
            </div>

            <div className="glass-card p-8 rounded-2xl luxury-hover">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "She's patient, skilled, and creates such a calming atmosphere. Whether it's my color or my grandfather's haircut, the care is exceptional."
              </p>
              <div className="font-medium text-nearBlack">Amanda E.</div>
              <div className="text-sm text-gray-500">Hair Color & Family Services</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-10 md:py-20 text-cream relative overflow-hidden z-20" style={{ marginTop: '-2px' }}>
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.4)' }}
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
          >
            <source src="https://hvujayiaqhixrbwznlxy.supabase.co/storage/v1/object/public/images/Video%20MEL11about-NMSPD.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-nearBlack/60 via-nearBlack/50 to-nearBlack/60" />
        </div>

        <div className="container-custom text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block mb-6 px-6 py-2 bg-accent border-2 border-white rounded-full">
              <span className="text-sm tracking-[0.2em] uppercase text-white font-medium">Limited Availability</span>
            </div>

            <h3 className="font-serif text-5xl md:text-6xl mb-8 leading-tight text-cream">
              Elevate your self-care<br />to an art form
            </h3>

            <p className="text-xl text-cream/80 mb-12 leading-relaxed max-w-2xl mx-auto">
              Join our exclusive roster of clients who understand that true luxury
              is found in quality, privacy, and personalized attention
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/book">
                <Button size="lg" variant="primary" className="min-w-[260px] luxury-hover">
                  Book Your First Session
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="min-w-[260px] border-cream text-cream hover:bg-cream hover:text-nearBlack">
                  Inquire About Packages
                </Button>
              </Link>
            </div>

            <p className="mt-12 text-sm text-cream/60">
              Serving Tacoma, Puyallup, and Greater Seattle • By Appointment Only
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
