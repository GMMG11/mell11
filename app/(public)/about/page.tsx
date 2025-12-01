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
        <div className="fixed inset-0 z-0 md:absolute">
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
            <source src="https://hvujayiaqhixrbwznlxy.supabase.co/storage/v1/object/public/images/Video%20MEL11about-NMSPD.mp4" type="video/mp4" />
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
                A new approach to luxury beauty. One that meets you where you already feel safe, calm, and fully yourself.
              </p>

              <div className="luxury-divider max-w-md mx-auto mb-8" />

              <p className="text-xl md:text-2xl text-cream/90 mb-6 font-serif italic max-w-3xl mx-auto">
                MĒL11 was built on a simple belief: everyone deserves studio-level results without the stress, inconvenience, or cost of traditional salons.
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-lg text-cream/80 mb-8 leading-relaxed">
                After 23 years in the beauty industry, Melissa saw a pattern: clients loved the results, but dreaded the experience.
              </p>

              <p className="text-2xl md:text-3xl gradient-text font-serif italic leading-relaxed">
                So instead of bringing clients to the salon,<br className="hidden md:block" />
                she brought the salon to the client.
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

      {/* About Melissa - Moved Up */}
      <section className="py-10 md:py-20 bg-white relative z-20">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-4xl mb-12 text-nearBlack text-center">Meet Mel</h2>

            <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
              {/* Photo */}
              <div className="relative">
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden luxury-shadow">
                  <img
                    src="https://hvujayiaqhixrbwznlxy.supabase.co/storage/v1/object/public/images/MG11.png"
                    alt="Melissa Green - Founder of MĒL11"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl -z-10" />
              </div>

              {/* Bio */}
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="font-serif text-2xl text-nearBlack">
                  Melissa Green<br />
                  Founder & Lead Aesthetician, MĒL11
                </p>

                <p>
                  With 23 years of industry experience, Melissa brings a rare blend of advanced technique, clinical knowledge, and intuitive artistry to every session.
                </p>

                <div className="bg-cream p-6 rounded-lg border border-softLine">
                  <p className="font-semibold text-nearBlack mb-3">Her clients describe her as:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>gentle but meticulous</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>warm, calm, and grounding</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>deeply knowledgeable</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>never rushed</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>someone who genuinely cares about their confidence and wellbeing</span>
                    </li>
                  </ul>
                </div>

                <p>
                  What sets Melissa apart isn't just her training. It's her ability to make people feel beautiful in their own skin, without ever stepping into a crowded salon.
                </p>

                <p>
                  As a mother of two with a lifelong passion for aesthetics, she believes beauty should enhance your life. Not complicate it, interrupt it, or drain your wallet.
                </p>

                <p className="italic text-center text-nearBlack font-serif text-xl">
                  MĒL11 is the embodiment of that belief.
                </p>
              </div>
            </div>

            {/* Certifications - Full Width */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-cream p-8 rounded-lg border border-softLine">
                <h4 className="font-serif text-2xl mb-6 text-nearBlack">Professional Training & Certifications</h4>
                <p className="text-gray-700 mb-6 italic">She is professionally trained and certified in:</p>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Licensed Esthetician (WA)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Licensed Barber & Hair Designer (WA)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Paramedical Aesthetics Certification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Advanced Microneedling & Collagen Induction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Chemical Peel (Level I & II) + Dermabrasion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Dermaplaning + Enzyme Resurfacing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Hydrafacial & Advanced Facial Protocols</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Ultrasound Skin Therapy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>LED Light Therapy for Skin Rejuvenation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Laser Hair Reduction (Professional Technician)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>PMU Lip Blush + Color Theory</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Brow Lamination, Tinting & Lash Lift</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Sugar Hair Removal Expert ("Queen of Sugaring")</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Cosmetic Teeth Whitening Technician</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Acne Treatment Specialist (Acne Boot Camp)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Trauma-Informed Aesthetics Training</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Mobile Aesthetic Safety & Field Protocols</span>
                  </li>
                  <li className="flex items-start md:col-span-2">
                    <span className="text-accent mr-2">•</span>
                    <span className="font-semibold">23+ years in professional beauty + wellness</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Pattern She Saw */}
      <section className="py-10 md:py-20 bg-gradient-to-br from-nearBlack to-accent/90 relative overflow-hidden z-20">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl mb-8 leading-relaxed text-white">
              After 23 years in the beauty industry, Melissa saw the same pattern everywhere she worked. Clients loved the results, but dreaded the experience:
            </p>

            <ul className="space-y-4 mb-12 text-white">
              <li className="flex items-start">
                <span className="text-cream mr-3 mt-1">•</span>
                <span>Delayed appointments</span>
              </li>
              <li className="flex items-start">
                <span className="text-cream mr-3 mt-1">•</span>
                <span>Harsh overhead lighting</span>
              </li>
              <li className="flex items-start">
                <span className="text-cream mr-3 mt-1">•</span>
                <span>Crowded waiting rooms</span>
              </li>
              <li className="flex items-start">
                <span className="text-cream mr-3 mt-1">•</span>
                <span>Noise, chaos, and rushed conversations</span>
              </li>
              <li className="flex items-start">
                <span className="text-cream mr-3 mt-1">•</span>
                <span>Lost time in traffic or downtown parking</span>
              </li>
              <li className="flex items-start">
                <span className="text-cream mr-3 mt-1">•</span>
                <span>Premium pricing inflated by salon rent, overhead, and commissions</span>
              </li>
            </ul>

            <p className="text-xl leading-relaxed mb-4 text-white">
              So she decided to change the model entirely.
            </p>

            <p className="text-3xl md:text-4xl font-serif italic text-center leading-relaxed text-cream">
              Instead of bringing clients to the salon,<br />
              she would bring the salon to the client.
            </p>
          </div>
        </div>
      </section>

      {/* Why In-Home Beauty */}
      <section className="py-10 md:py-20 bg-white relative z-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-nearBlack text-center">
              Why In-Home Beauty?
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12 italic">Her Personal Philosophy</p>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Melissa's philosophy is simple:
            </p>

            <p className="text-2xl md:text-3xl font-serif text-center text-nearBlack mb-12 leading-relaxed">
              Beauty should feel personal, private, and accessible. Not intimidating or overpriced.
            </p>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              With no salon lease, no chair fees, and no inflated commercial overhead, Melissa can offer:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="flex items-start">
                <span className="text-accent mr-3 mt-1 text-xl">✓</span>
                <span className="text-gray-700 text-lg">Lower pricing than traditional studios</span>
              </div>
              <div className="flex items-start">
                <span className="text-accent mr-3 mt-1 text-xl">✓</span>
                <span className="text-gray-700 text-lg">Higher-end products and equipment</span>
              </div>
              <div className="flex items-start">
                <span className="text-accent mr-3 mt-1 text-xl">✓</span>
                <span className="text-gray-700 text-lg">Longer, more attentive appointments</span>
              </div>
              <div className="flex items-start">
                <span className="text-accent mr-3 mt-1 text-xl">✓</span>
                <span className="text-gray-700 text-lg">A level of privacy salons simply can't match</span>
              </div>
            </div>

            <p className="text-2xl font-serif italic text-center text-nearBlack">
              The value isn't in cutting corners.<br />
              The value is in cutting out everything that doesn't serve the client.
            </p>
          </div>
        </div>
      </section>

      {/* COVID Section */}
      <section className="py-10 md:py-20 bg-gradient-to-br from-cream to-white relative z-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl mb-8 text-nearBlack text-center">
              COVID changed everything and confirmed her vision
            </h2>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              When COVID shut down salons, Melissa noticed something powerful:
            </p>

            <p className="text-2xl font-serif text-nearBlack mb-8 leading-relaxed">
              Clients weren't just avoiding public spaces.<br />
              They thrived in private ones.
            </p>

            <div className="space-y-4 mb-12">
              <p className="text-xl text-gray-700 leading-relaxed">They felt calmer.</p>
              <p className="text-xl text-gray-700 leading-relaxed">They felt safer.</p>
              <p className="text-xl text-gray-700 leading-relaxed">
                They felt truly cared for in a way they never had inside a commercial space.
              </p>
            </div>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              She realized what many professionals missed:<br />
              <span className="font-serif text-2xl italic text-nearBlack">beauty was never about the salon. It was about the connection.</span>
            </p>

            <div className="bg-white p-8 rounded-lg luxury-shadow mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Her house-call model didn't just survive the pandemic. It became the preferred experience for dozens of clients who refused to go back to the salon chair.
              </p>
            </div>

            <p className="text-xl text-gray-700 leading-relaxed text-center">
              Today, the MĒL11 mobile studio is a fully optimized extension of that philosophy:<br />
              <span className="font-serif text-2xl italic text-nearBlack">quiet, discreet, calming, and deeply personalized.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-10 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl mb-6 text-nearBlack">Service Area</h2>
            <p className="text-lg text-gray-600 mb-8">
              Tacoma • Puyallup • Greater Seattle<br />
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
