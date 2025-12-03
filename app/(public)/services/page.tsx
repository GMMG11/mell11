import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

export default function ServicesPage() {
  return (
    <div className="bg-cream min-h-screen py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-nearBlack">Our Services</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            MĒL11 delivers advanced, clinical-grade anti-aging treatments directly to your chosen sanctuary. Whether that's your home, private office, or hotel.
            Every treatment is private, unhurried, and designed around your individual goals.
          </p>
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-gray-600">
              We prioritize <strong>transformative results</strong>, <strong>paramedical-grade techniques</strong>, <strong>total discretion</strong>, and <strong>comfort in your own space</strong>.
            </p>
            <p className="text-sm text-gray-500 mt-4 italic">
              All pricing reflects concierge-level, on-location service.
            </p>
            <p className="text-base text-nearBlack mt-4 font-bold">
              Continue below to view individual à la carte service pricing.
            </p>
          </div>
        </div>

        {/* TRANSFORMATION PROGRAMS */}
        <div className="mb-20" id="transformation">
          <div className="bg-gradient-to-br from-nearBlack to-accent/90 text-cream rounded-2xl p-10 md:p-12 luxury-shadow mb-12">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-1 bg-cream/20 rounded-full mb-4">
                <span className="text-xs tracking-widest uppercase">Premium Offering</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-white">The MĒL11 Signature Transformation</h2>
              <p className="text-xl text-cream/90">8–12 Week Private Anti-Aging Program</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-cream/90 mb-8 leading-relaxed text-center">
                A curated, multi-week rejuvenation experience for clients who want visible reset in their skin, glow, confidence, and overall aesthetic.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-cream/20 to-accent/15 backdrop-blur-sm p-6 rounded-lg border border-accent/40">
                  <h3 className="font-serif text-2xl mb-2 text-cream">8-Week Program</h3>
                  <p className="text-3xl font-serif mb-2 text-cream">$899+</p>
                  <p className="text-sm text-cream/90">Bi-weekly sessions</p>
                </div>
                <div className="bg-gradient-to-br from-cream/20 to-accent/15 backdrop-blur-sm p-6 rounded-lg border border-accent/40">
                  <h3 className="font-serif text-2xl mb-2 text-cream">12-Week Program</h3>
                  <p className="text-3xl font-serif mb-2 text-cream">$1,350+</p>
                  <p className="text-sm text-cream/90">Bi-weekly sessions + extended care</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg mb-6">
                <h4 className="font-semibold text-lg mb-4 text-white">What's Included:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span>Initial consultation + skin & wellness assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span>Customized treatment plan with bi-weekly sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span>Mix of advanced treatments: microneedling, facials, dermabrasion, peels, brows/lashes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span>Personalized product guidance based on skin goals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span>Peptide wellness consultation & referral guidance (optional)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span>Before/after photography for progress tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span>Priority booking and scheduling flexibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span>Discounts on add-on services during the program</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <p className="text-sm text-cream/80 mb-6">
                  <strong>Ideal for:</strong> clients preparing for events, life transitions, headshots, dating profiles, or a full confidence reset.
                </p>
                <Link
                  href="/book"
                  className="inline-block px-8 py-4 bg-cream text-nearBlack rounded-lg hover:bg-white transition-colors font-semibold text-lg"
                >
                  Inquire About Transformation Program
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ADVANCED AESTHETIC TREATMENTS */}
        <div className="mb-16">
          <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">Advanced Aesthetic Treatments</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Clinical anti-aging protocols. Private, personalized care.
          </p>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Each treatment targets visible signs of aging using pharmaceutical-grade products, medical-grade equipment, and paramedical protocols. Delivered in the privacy of your chosen space.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Microneedling</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">90 min</span>
                <span className="text-accent font-semibold text-xl">$200+</span>
              </div>
              <p className="text-gray-700">
                Advanced collagen induction therapy. Stimulates collagen, smooths texture, reduces scarring, tightens and brightens the skin. Clinical-grade results for aging, texture, and tone.
              </p>
              <Link
                href="/book?service=Microneedling"
                className="inline-block mt-4 px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Hydrafacial Treatment</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">60 min</span>
                <span className="text-accent font-semibold text-xl">$175+</span>
              </div>
              <p className="text-gray-700">
                Deep cleanse, extraction, infusion, and hydration using medical-grade serums.
              </p>
              <Link
                href="/book?service=Hydrafacial%20Treatment"
                className="inline-block mt-4 px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Chemical Peel</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">60 min</span>
                <span className="text-accent font-semibold text-xl">$110+</span>
              </div>
              <p className="text-gray-700">
                Targeted resurfacing for brightening, pigmentation, acne, and anti-aging.
              </p>
              <Link
                href="/book?service=Chemical%20Peel"
                className="inline-block mt-4 px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Dermabrasion Resurfacing</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">60 min</span>
                <span className="text-accent font-semibold text-xl">$95+</span>
              </div>
              <p className="text-gray-700">
                Polishes skin, removes dullness, boosts glow with precision exfoliation.
              </p>
              <Link
                href="/book?service=Dermabrasion"
                className="inline-block mt-4 px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Laser Hair Removal</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">45 min</span>
                <span className="text-accent font-semibold text-xl">$100+ per area</span>
              </div>
              <p className="text-gray-700">
                Fast, long-term hair reduction using advanced mobile laser technology.
              </p>
              <Link
                href="/book?service=Laser%20Hair%20Removal%20Session"
                className="inline-block mt-4 px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Lip Blush Tattoo</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">120 min</span>
                <span className="text-accent font-semibold text-xl">$350+</span>
              </div>
              <p className="text-gray-700">
                Semi-permanent soft-finish lip tint for natural color enhancement.
              </p>
              <Link
                href="/book?service=Lip%20Blush%20Tattoo"
                className="inline-block mt-4 px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* SKIN & FACIAL TREATMENTS */}
        <div className="mb-16">
          <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">Signature Skin & Facials</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Tailored treatments for every skin type, goal, and concern. Each facial includes a personalized consultation and clinical-grade products.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">The MĒL11 Signature House Call Facial</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">75 min</span>
                <span className="text-accent font-semibold text-xl">$120+</span>
              </div>
              <p className="text-gray-700 mb-4">
                A deeply restorative facial with steam, exfoliation, extraction, massage, and targeted serums. Customized for your skin's unique needs.
              </p>
              <Link
                href="/book?service=Signature%20House%20Call%20Facial"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Custom Facial Experience</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">60–90 min</span>
                <span className="text-accent font-semibold text-xl">$95–$150</span>
              </div>
              <p className="text-gray-700 mb-4">
                Build your own treatment. Choose from modalities like dermaplaning, peels, LED, ultrasound, extractions, and clinical serums based on your goals.
              </p>
              <Link
                href="/book?service=Custom%20Facial%20Experience"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Dermaplaning Facial</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">60 min</span>
                <span className="text-accent font-semibold text-xl">$95+</span>
              </div>
              <p className="text-gray-700 mb-4">
                Gentle exfoliation removes dead skin and peach fuzz, revealing smooth, glowing skin. Perfect before events or as a monthly refresh.
              </p>
              <Link
                href="/book?service=Dermaplaning%20Facial"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Classic European Facial</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">60 min</span>
                <span className="text-accent font-semibold text-xl">$95+</span>
              </div>
              <p className="text-gray-700 mb-4">
                A timeless, relaxing treatment with cleansing, exfoliation, steam, extractions, massage, and masking. Great for maintenance and balance.
              </p>
              <Link
                href="/book?service=Classic%20European%20Facial"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Deep Cleansing Facial</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">75 min</span>
                <span className="text-accent font-semibold text-xl">$120+</span>
              </div>
              <p className="text-gray-700 mb-4">
                Focused on congestion, blackheads, and clogged pores. Includes steam, extractions, purifying masks, and calming serums.
              </p>
              <Link
                href="/book?service=Deep%20Cleansing%20Facial"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Acne Facial</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">75 min</span>
                <span className="text-accent font-semibold text-xl">$110+</span>
              </div>
              <p className="text-gray-700 mb-4">
                Targeted acne treatment with deep cleansing, extractions, antibacterial serums, and LED light therapy. Reduces inflammation and breakouts.
              </p>
              <Link
                href="/book?service=Acne%20Facial"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Detox Facial</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">75 min</span>
                <span className="text-accent font-semibold text-xl">$110+</span>
              </div>
              <p className="text-gray-700 mb-4">
                Designed to detoxify and decongest dull, stressed skin. Includes lymphatic massage, charcoal or clay masks, and hydrating serums.
              </p>
              <Link
                href="/book?service=Detox%20Facial"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Glycolic or Enzyme Facial</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">60 min</span>
                <span className="text-accent font-semibold text-xl">$110+</span>
              </div>
              <p className="text-gray-700 mb-4">
                Exfoliating treatment using glycolic acid or fruit enzymes to brighten, smooth texture, and refine pores.
              </p>
              <Link
                href="/book?service=Glycolic%20or%20Enzyme%20Facial"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Men's Executive Facial</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">60 min</span>
                <span className="text-accent font-semibold text-xl">$110+</span>
              </div>
              <p className="text-gray-700 mb-4">
                Tailored for men's skin. Deep cleanse, exfoliation, extractions, and hydration. Addresses razor burn, oiliness, and sensitivity.
              </p>
              <Link
                href="/book?service=Men's%20Executive%20Facial"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Back Facial</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">60 min</span>
                <span className="text-accent font-semibold text-xl">$110+</span>
              </div>
              <p className="text-gray-700 mb-4">
                Cleansing, exfoliation, and extractions for the back. Perfect for congested skin, pre-wedding prep, or summer confidence.
              </p>
              <Link
                href="/book?service=Back%20Facial"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Intimate Glow Treatment</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">60 min</span>
                <span className="text-accent font-semibold text-xl">$95+</span>
              </div>
              <p className="text-gray-700 mb-4">
                A private, professional treatment for intimate areas. Exfoliation, brightening, and smoothing in a comfortable, discreet setting.
              </p>
              <Link
                href="/book?service=Intimate%20Glow%20Treatment"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow border-2 border-accent/30">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Acne Boot Camp</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Custom Program</span>
                <span className="text-accent font-semibold text-xl">Custom Pricing</span>
              </div>
              <p className="text-gray-700 mb-4">
                A comprehensive multi-week acne treatment plan with customized protocols, product guidance, and ongoing support. For serious skin transformation.
              </p>
              <Link
                href="/contact"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Inquire
              </Link>
            </div>
          </div>
        </div>

        {/* TREATMENT ENHANCEMENTS */}
        <div className="mb-16">
          <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">Treatment Enhancements</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Elevate any facial or treatment with these professional upgrades.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg luxury-shadow border border-softLine">
              <h3 className="font-serif text-xl text-nearBlack mb-2">Ultrasound Skin Therapy</h3>
              <p className="text-accent font-semibold text-2xl mb-3">+$35</p>
              <p className="text-gray-700 text-sm">
                Deep product penetration and skin tightening using ultrasonic waves.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg luxury-shadow border border-softLine">
              <h3 className="font-serif text-xl text-nearBlack mb-2">LED Light Therapy</h3>
              <p className="text-accent font-semibold text-2xl mb-3">+$25</p>
              <p className="text-gray-700 text-sm">
                Red or blue light therapy to reduce inflammation, boost collagen, or clear acne.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg luxury-shadow border border-softLine">
              <h3 className="font-serif text-xl text-nearBlack mb-2">High-Frequency Treatment</h3>
              <p className="text-accent font-semibold text-2xl mb-3">+$20</p>
              <p className="text-gray-700 text-sm">
                Antibacterial treatment to calm breakouts and improve circulation.
              </p>
            </div>
          </div>
        </div>

        {/* EYES & EXPRESSION */}
        <div className="mb-16">
          <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">Eyes & Expression</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Brow Shaping & Tint</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">30 min</span>
                <span className="text-accent font-semibold text-xl">$35+</span>
              </div>
              <Link
                href="/book?service=Brow%20Shaping%20%26%20Tint"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Lash Lift & Tint</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">60 min</span>
                <span className="text-accent font-semibold text-xl">$85+</span>
              </div>
              <Link
                href="/book?service=Lash%20Lift%20%26%20Tint"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* PROFESSIONAL TEETH WHITENING */}
        <div className="mb-16">
          <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">Professional Teeth Whitening</h2>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">In-Home Whitening</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">60 min</span>
                <span className="text-accent font-semibold text-xl">$125+</span>
              </div>
              <p className="text-gray-700 mb-4">
                Clinical-strength whitening gel with sensitivity-safe method. Fast, visible brightening.
              </p>
              <Link
                href="/book?service=Professional%20Teeth%20Whitening"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* EVENT BEAUTY */}
        <div className="mb-16">
          <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">Event Beauty</h2>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Makeup Application</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">60–90 min</span>
                <span className="text-accent font-semibold text-xl">$120–$175</span>
              </div>
              <p className="text-gray-700 mb-4">
                Professional makeup for events, photoshoots, weddings, or special occasions. Includes lashes, setting spray, and touch-up kit.
              </p>
              <Link
                href="/book?service=Makeup%20Application"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* WELLNESS & LONGEVITY - PEPTIDE WELLNESS */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-nearBlack/95 to-accent/80 text-cream rounded-2xl p-10 md:p-12 luxury-shadow">
            <div className="max-w-6xl mx-auto">
              {/* Centered Header Section */}
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-1 bg-cream/20 rounded-full mb-4">
                  <span className="text-xs tracking-widest uppercase">Wellness & Longevity</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl mb-4 text-white">Peptide Wellness Consultation</h2>
                <p className="text-xl text-cream/90 mb-4">Personalized Peptide Guidance & Referrals</p>
                <p className="text-2xl font-serif text-cream mb-6">Starting at $120</p>

                <p className="text-lg text-cream/90 leading-relaxed mb-8 max-w-3xl mx-auto">
                  Melissa offers private consultations for clients interested in peptide therapy for skin rejuvenation, wellness, recovery, and longevity. This service includes education on safe sourcing, dosing guidance, and referrals to trusted medical providers when needed.
                </p>

                <Link
                  href="/book?service=Peptide%20Wellness%20Consultation"
                  className="inline-block px-8 py-4 bg-cream text-nearBlack rounded-lg hover:bg-white transition-colors font-semibold text-lg"
                >
                  Schedule a Peptide Consultation
                </Link>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                    <h4 className="font-semibold text-lg mb-4 text-white">What's Covered:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-accent mr-3 mt-1">✓</span>
                        <span>Overview of peptide therapy and benefits for skin, wellness, and aging</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-3 mt-1">✓</span>
                        <span>Personalized recommendations based on your goals</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-3 mt-1">✓</span>
                        <span>Safe sourcing and quality guidance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-3 mt-1">✓</span>
                        <span>Dosing protocols and administration education</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-3 mt-1">✓</span>
                        <span>Medical provider referrals for prescription peptides</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-3 mt-1">✓</span>
                        <span>Integration with aesthetic treatments for enhanced results</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                    <h4 className="font-semibold text-lg mb-4 text-white">Guidance on:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-accent mr-3 mt-1">•</span>
                        <div>
                          <span className="font-medium">GLP-1 programs</span>
                          <p className="text-sm text-cream/80 mt-1">Weight management and metabolic support</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-3 mt-1">•</span>
                        <div>
                          <span className="font-medium">Tirzepatide / Retatrutide</span>
                          <p className="text-sm text-cream/80 mt-1">Advanced weight loss peptides</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-3 mt-1">•</span>
                        <div>
                          <span className="font-medium">Glow peptides</span>
                          <p className="text-sm text-cream/80 mt-1">Skin brightening and anti-aging support</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-3 mt-1">•</span>
                        <div>
                          <span className="font-medium">NAD+ options</span>
                          <p className="text-sm text-cream/80 mt-1">Energy, recovery, and cellular health</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-3 mt-1">•</span>
                        <div>
                          <span className="font-medium">Partner-provider referral assistance</span>
                          <p className="text-sm text-cream/80 mt-1">Trusted medical connections for prescriptions</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Why Mobile Section */}
        <div className="mb-16 bg-white p-10 md:p-12 rounded-2xl luxury-shadow">
          <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">Why Mobile?</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Most clients choose MĒL11 for clinical treatments in their own space. Whether that's at home, in a private office, or while traveling.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent text-xl">✓</span>
              </div>
              <p className="text-gray-700 leading-relaxed">No commute, no traffic<br />No public waiting rooms</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent text-xl">✓</span>
              </div>
              <p className="text-gray-700 leading-relaxed">Private, quiet, unhurried appointments<br />Complete privacy & discretion</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent text-xl">✓</span>
              </div>
              <p className="text-gray-700 leading-relaxed">Clinical results on your schedule<br />Fits around work, childcare, family, and travel</p>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-10 italic">
            Professional aesthetics designed for real life. Where you are, when you need it.
          </p>
        </div>

        {/* Pricing Note */}
        <div className="mt-20 p-8 bg-white rounded-lg border border-softLine max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl mb-4 text-nearBlack">A note about pricing</h3>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              All rates listed are base pricing. Exact pricing depends on service time, travel distance, and specific treatment requirements.
              Clients receive a final quote before an appointment is confirmed.
            </p>

            <p>
              <strong>Travel:</strong> Generally, clients in the Tacoma/Puyallup area have travel costs included. Anything outside of that will add a $29 travel fee.
            </p>

            <p>
              <strong>Booking holds:</strong> Confirmed bookings will automatically put a $45 hold on your card, which will be credited to the total cost of your session. Unfortunately, locking up a timeslot prevents me from servicing other clients. I can move an appointment within 72 hours but not refund it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
