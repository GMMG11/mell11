'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

export default function AboutPage() {
  const [scrollSections, setScrollSections] = useState<{ [key: string]: boolean }>({});

  // Scroll effect for text color transition
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const videoHeight = window.innerHeight;
      const newScrollSections: { [key: string]: boolean } = {};

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // Check if section is overlapping with the top portion (video area)
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
    <div className="bg-cream min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
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
            <source src="/assets/bottombannerh264_faststart.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-nearBlack/60 via-nearBlack/50 to-cream" />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10 text-center py-32 animate-fade-in-up">
          <div className="max-w-5xl mx-auto">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl mb-8 text-cream tracking-tight leading-[0.9]">
              About MĒL11
            </h1>

            <div className="mb-12">
              <p className="text-2xl md:text-3xl text-cream/90 mb-8 font-light leading-relaxed max-w-3xl mx-auto">
                Clinical anti-aging expertise, delivered privately
              </p>

              <div className="luxury-divider max-w-md mx-auto mb-8" />

              <p className="text-xl md:text-2xl text-cream/90 mb-6 font-serif italic max-w-3xl mx-auto">
                MĒL11 was founded on a powerful insight: exceptional aesthetic results shouldn't require compromising your time, privacy, or comfort.
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-lg text-cream/80 mb-8 leading-relaxed">
                After 23 years specializing in clinical anti-aging aesthetics, our founder identified a fundamental gap in the industry.
              </p>

              <p className="text-2xl md:text-3xl gradient-text font-serif italic leading-relaxed">
                Traditional aesthetic clinics weren't designed for how people actually live.
              </p>
            </div>

            <Link href="/services">
              <Button size="lg" variant="primary" className="min-w-[240px] luxury-hover">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 text-cream/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* The Model Was Broken */}
      <section className="py-10 md:py-20 bg-white relative z-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl mb-8 text-nearBlack text-center">
              The model was broken
            </h2>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Clients wanted clinical results but dreaded:
            </p>

            <ul className="space-y-4 mb-12 text-gray-700">
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✗</span>
                <span>Crowded waiting rooms</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✗</span>
                <span>Inflexible appointment times</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✗</span>
                <span>Downtown parking</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✗</span>
                <span>Public treatment spaces</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✗</span>
                <span>Rushed consultations</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✗</span>
                <span>Time lost to commutes</span>
              </li>
            </ul>

            <p className="text-2xl font-serif text-center text-nearBlack leading-relaxed">
              So she built a better model: bring paramedical-grade anti-aging treatments to where clients already feel safe, comfortable, and in control.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Owner */}
      <section className="py-10 md:py-20 bg-gradient-to-br from-cream to-white relative z-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl mb-12 text-nearBlack text-center">Meet the Owner</h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="font-serif text-2xl text-nearBlack text-center">
                Founder & Lead Clinical Aesthetician
              </p>

              <p className="text-lg text-accent font-medium text-center">
                Paramedical-Certified Anti-Aging Specialist
              </p>

              <p>
                With 23 years of clinical aesthetic experience, she brings advanced technique, medical-grade protocols, and genuine care to every private session.
              </p>

              <div className="bg-white p-6 rounded-lg border border-softLine">
                <p className="font-semibold text-nearBlack mb-3">Her clients describe her as:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Meticulous but warm</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Clinically skilled yet approachable</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Never rushed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Genuinely invested in their results and confidence</span>
                  </li>
                </ul>
              </div>

              <p>
                What distinguishes her isn't just her clinical training. It's her ability to deliver transformative anti-aging results while honoring her clients' need for privacy, flexibility, and genuine connection.
              </p>

              <p>
                As a mother balancing professional excellence with family life, she understands that aesthetic care should enhance your life, not complicate it.
              </p>

              <p className="italic text-center text-nearBlack font-serif text-xl">
                MĒL11 embodies that philosophy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Training & Specializations */}
      <section className="py-10 md:py-20 bg-white relative z-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">
              Clinical Training & Specializations
            </h2>

            <p className="text-xl text-center text-gray-600 mb-12">
              She is a paramedical-certified clinical aesthetician specializing in advanced anti-aging protocols.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Core Credentials */}
              <div className="bg-cream p-8 rounded-lg border border-softLine">
                <h4 className="font-serif text-xl mb-6 text-nearBlack">Core Credentials</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Licensed Master Esthetician (WA State)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Paramedical Aesthetics Certification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span className="font-semibold">23+ Years Clinical Experience</span>
                  </li>
                </ul>
              </div>

              {/* Anti-Aging Specializations */}
              <div className="bg-cream p-8 rounded-lg border border-softLine">
                <h4 className="font-serif text-xl mb-6 text-nearBlack">Anti-Aging Specializations</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Advanced Clinical Microneedling (collagen induction, scar revision, age reversal)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Chemical Peel Protocols (Level I & II)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Hydrafacial Advanced Certification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Dermaplaning & Medical-Grade Exfoliation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Laser Hair Reduction (Certified Technician)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>LED Light Therapy & Ultrasound Skin Therapy</span>
                  </li>
                </ul>
              </div>

              {/* Specialized Aesthetic Services */}
              <div className="bg-cream p-8 rounded-lg border border-softLine">
                <h4 className="font-serif text-xl mb-6 text-nearBlack">Specialized Aesthetic Services</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>PMU Lip Blush & Color Theory</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Acne Treatment Specialist (Acne Boot Camp)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Brow Lamination & Lash Lift Certification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Professional Teeth Whitening Technician</span>
                  </li>
                </ul>
              </div>

              {/* Professional Development */}
              <div className="bg-cream p-8 rounded-lg border border-softLine">
                <h4 className="font-serif text-xl mb-6 text-nearBlack">Professional Development</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Trauma-Informed Care in Aesthetics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Mobile Clinical Safety Protocols</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Continuous advanced education in aesthetic medicine</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Private, On-Location Aesthetics */}
      <section className="py-10 md:py-20 bg-gradient-to-br from-nearBlack to-accent/90 relative overflow-hidden z-20">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl mb-4 text-white">
              Why Private, On-Location Aesthetics?
            </h2>
            <p className="text-xl text-cream/90 mb-12 italic">The Philosophy Behind MĒL11</p>

            <p className="text-xl mb-8 leading-relaxed text-cream/90">
              Traditional aesthetic clinics weren't designed for modern life.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
              <div>
                <h4 className="font-semibold text-lg mb-4 text-white">They require you to:</h4>
                <ul className="space-y-3 text-cream/90">
                  <li className="flex items-start">
                    <span className="text-cream mr-3 mt-1">✗</span>
                    <span>Drive downtown and find parking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cream mr-3 mt-1">✗</span>
                    <span>Sit in public waiting rooms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cream mr-3 mt-1">✗</span>
                    <span>Work around their schedule, not yours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cream mr-3 mt-1">✗</span>
                    <span>Pay premium prices inflated by commercial rent and overhead</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4 text-white">She saw an opportunity:</h4>
                <ul className="space-y-3 text-cream/90">
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span>Clinical-grade treatments in private settings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span>Flexible scheduling that fits professional and family life</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span>Premium pharmaceutical products without commercial markup</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span>Longer, more attentive appointments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span>Absolute privacy and discretion</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-2xl font-serif italic text-cream">
              The value isn't in cutting corners.<br />
              The value is in cutting out everything that doesn't serve the client.
            </p>
          </div>
        </div>
      </section>

      {/* Meeting Clients Where They Are */}
      <section className="py-10 md:py-20 bg-white relative z-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl mb-8 text-nearBlack text-center">
              Meeting Clients Where They Are
            </h2>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed text-center">
              MĒL11 serves busy professionals, parents, and discerning individuals who value:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="flex items-start">
                <span className="text-accent mr-3 mt-1 text-xl font-bold">Privacy</span>
                <span className="text-gray-700">→ No public treatment spaces or waiting rooms</span>
              </div>
              <div className="flex items-start">
                <span className="text-accent mr-3 mt-1 text-xl font-bold">Convenience</span>
                <span className="text-gray-700">→ We fit into your schedule and location</span>
              </div>
              <div className="flex items-start">
                <span className="text-accent mr-3 mt-1 text-xl font-bold">Results</span>
                <span className="text-gray-700">→ Paramedical protocols and pharmaceutical-grade products</span>
              </div>
              <div className="flex items-start">
                <span className="text-accent mr-3 mt-1 text-xl font-bold">Time</span>
                <span className="text-gray-700">→ No commute, no parking, no wasted hours</span>
              </div>
            </div>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Whether you're working from a home office, traveling for business, or simply prefer the comfort of your own space, MĒL11 delivers transformative anti-aging care on your terms.
            </p>

            <div className="bg-cream p-8 rounded-lg border border-softLine">
              <h4 className="font-semibold text-lg mb-4 text-nearBlack">Our clients include:</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Executives and professionals with demanding schedules</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Parents balancing family and self-care</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Individuals who value privacy and discretion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Anyone seeking clinical results without clinic hassles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area with Map */}
      <section className="py-16 md:py-24 relative z-20 overflow-hidden">
        {/* Stylized Map Background - Full Width - Rich Champagne Gradient */}
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 1600 600"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Define fonts and gradients */}
            <defs>
              <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');`}
              </style>
              {/* Rich champagne gradient - deeper brown tones with more variation */}
              <linearGradient id="champagneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C89B7B" />
                <stop offset="25%" stopColor="#A67C52" />
                <stop offset="50%" stopColor="#8C5A3C" />
                <stop offset="75%" stopColor="#7A4E35" />
                <stop offset="100%" stopColor="#5D3A28" />
              </linearGradient>
              {/* Radial glow effect for depth */}
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#C89B7B" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#A67C52" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#8C5A3C" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background - Rich Champagne Gradient */}
            <rect width="1600" height="600" fill="url(#champagneGradient)" />
            {/* Subtle center glow */}
            <rect width="1600" height="600" fill="url(#centerGlow)" />

            {/* Water - Puget Sound - White */}
            <path
              d="M300 0 L300 80 Q260 140 280 200 L250 300 Q220 380 260 460 L240 520 Q200 560 260 600 L0 600 L0 0 Z"
              fill="#FFFFFF"
              fillOpacity="0.6"
            />
            {/* Commencement Bay */}
            <ellipse cx="340" cy="420" rx="80" ry="50" fill="#FFFFFF" fillOpacity="0.5" />
            {/* Elliott Bay */}
            <ellipse cx="380" cy="160" rx="70" ry="45" fill="#FFFFFF" fillOpacity="0.5" />

            {/* Roads/Highways - white grid across full width */}
            <line x1="500" y1="0" x2="500" y2="600" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="800" y1="0" x2="800" y2="600" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="1100" y1="0" x2="1100" y2="600" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="0" y1="200" x2="1600" y2="200" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="0" y1="400" x2="1600" y2="400" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* I-5 Highway */}
            <path
              d="M520 0 Q560 150 540 300 Q520 450 560 600"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeOpacity="0.5"
              fill="none"
            />

            {/* City markers with labels - using Playfair Display */}
            {/* Seattle */}
            <circle cx="500" cy="140" r="14" fill="#FFFFFF" fillOpacity="0.7" />
            <circle cx="500" cy="140" r="7" fill="#FFFFFF" />
            <text x="525" y="148" fill="#FFFFFF" fontSize="18" fontFamily="'Playfair Display', serif" fontWeight="500" opacity="0.9">Seattle</text>

            {/* Tacoma */}
            <circle cx="480" cy="400" r="18" fill="#FFFFFF" fillOpacity="0.8" />
            <circle cx="480" cy="400" r="9" fill="#FFFFFF" />
            <text x="510" y="408" fill="#FFFFFF" fontSize="20" fontFamily="'Playfair Display', serif" fontWeight="600" opacity="1">Tacoma</text>

            {/* Puyallup */}
            <circle cx="620" cy="420" r="12" fill="#FFFFFF" fillOpacity="0.7" />
            <circle cx="620" cy="420" r="6" fill="#FFFFFF" />
            <text x="645" y="428" fill="#FFFFFF" fontSize="16" fontFamily="'Playfair Display', serif" fontWeight="500" opacity="0.9">Puyallup</text>

            {/* Other cities - smaller markers */}
            <circle cx="620" cy="150" r="8" fill="#FFFFFF" fillOpacity="0.4" />
            <circle cx="540" cy="300" r="8" fill="#FFFFFF" fillOpacity="0.4" />
            <circle cx="440" cy="450" r="8" fill="#FFFFFF" fillOpacity="0.4" />

            {/* Service area circle - dashed */}
            <circle
              cx="540"
              cy="350"
              r="220"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="10 5"
              strokeOpacity="0.5"
            />

            {/* Decorative elements on right side */}
            <circle cx="1200" cy="150" r="6" fill="#FFFFFF" fillOpacity="0.3" />
            <circle cx="1350" cy="280" r="6" fill="#FFFFFF" fillOpacity="0.3" />
            <circle cx="1150" cy="450" r="6" fill="#FFFFFF" fillOpacity="0.3" />
            <circle cx="1400" cy="500" r="6" fill="#FFFFFF" fillOpacity="0.3" />
          </svg>
        </div>

        {/* Content overlay - no card background */}
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl mb-8 text-white drop-shadow-lg">Service Area</h2>

            {/* Location Markers */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full border border-accent/20 shadow-sm">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-nearBlack">Tacoma</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full border border-accent/20 shadow-sm">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-nearBlack">Puyallup</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full border border-accent/20 shadow-sm">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-nearBlack">Greater Seattle</span>
              </div>
            </div>

            <p className="text-gray-600 text-lg mb-10">
              Travel fees may apply based on distance.
            </p>

            <Link href="/contact">
              <Button size="lg" variant="primary">
                Get in touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
