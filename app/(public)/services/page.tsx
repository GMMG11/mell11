import React from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="bg-cream min-h-screen py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-nearBlack">Our Services</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            MĒL11 delivers high-end, studio-level results directly into the sanctuary of your home.
            Every treatment is private, unhurried, and designed around your individual goals.
          </p>
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-gray-600">
              We prioritize <strong>premium results</strong>, <strong>advanced clinical-grade techniques</strong>, <strong>total discretion</strong>, and <strong>comfort in your own environment</strong>.
            </p>
            <p className="text-sm text-gray-500 mt-4 italic">
              All pricing reflects in-home, concierge-level service.
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
                <span className="text-xs tracking-widest uppercase">New Premium Offering</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-white">The MĒL11 Signature Transformation</h2>
              <p className="text-xl text-cream/90">8–12 Week Private Program</p>
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
                <h4 className="font-semibold text-lg mb-4">What's Included:</h4>
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
                  href="/book?service=Signature%20Transformation%20Program"
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
            Studio-level clinical results. Private in-home comfort.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Microneedling</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">90 min</span>
                <span className="text-accent font-semibold text-xl">$200+</span>
              </div>
              <p className="text-gray-700">
                Stimulates collagen, smooths texture, reduces scarring, tightens and brightens the skin.
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

          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg luxury-shadow mb-6">
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
          </div>
        </div>

        {/* BROWS & LASHES */}
        <div className="mb-16">
          <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">Brows & Lashes</h2>

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

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Sugaring Hair Removal</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">45 min</span>
                <span className="text-accent font-semibold text-xl">$45+</span>
              </div>
              <p className="text-gray-700 mb-4">A gentle alternative to waxing.</p>
              <Link
                href="/book?service=Sugaring%20Hair%20Removal"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* TEETH WHITENING */}
        <div className="mb-16">
          <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">Teeth Whitening</h2>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Professional In-Home Whitening</h3>
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

        {/* HAIR SERVICES */}
        <div className="mb-16">
          <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">Hair Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto italic">
            Curated high-end services only. Premium cuts, color, and styling.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Women's Precision Cut</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">75 min</span>
                <span className="text-accent font-semibold text-xl">$95+</span>
              </div>
              <p className="text-gray-700 mb-4">
                Transformative shaping tailored for face structure and personal style.
              </p>
              <Link
                href="/book?service=Women's%20Haircut"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Men's Precision Cut & Finish</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">45 min</span>
                <span className="text-accent font-semibold text-xl">$65+</span>
              </div>
              <Link
                href="/book?service=Men's%20Haircut"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg luxury-shadow">
              <h3 className="font-serif text-2xl text-nearBlack mb-2">Special Occasion Style</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">90 min</span>
                <span className="text-accent font-semibold text-xl">$150+</span>
              </div>
              <p className="text-gray-700 mb-4">
                In-home styling for events, photoshoots, or red-carpet moments.
              </p>
              <Link
                href="/book?service=Updo%20/%20Special%20Occasion%20Style"
                className="inline-block px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Color Services */}
          <div className="mt-12">
            <h3 className="font-serif text-3xl mb-6 text-nearBlack text-center">Luxury Color Services</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg luxury-shadow">
                <h4 className="font-serif text-xl text-nearBlack mb-2">Partial Foil Highlights</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">120 min</span>
                  <span className="text-accent font-semibold text-xl">$155+</span>
                </div>
                <Link
                  href="/book?service=Partial%20Foil%20Highlights"
                  className="inline-block mt-4 px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
                >
                  Book Now
                </Link>
              </div>

              <div className="bg-white p-8 rounded-lg luxury-shadow">
                <h4 className="font-serif text-xl text-nearBlack mb-2">Full Foil Highlights</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">150 min</span>
                  <span className="text-accent font-semibold text-xl">$195+</span>
                </div>
                <Link
                  href="/book?service=Full%20Foil%20Highlights"
                  className="inline-block mt-4 px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
                >
                  Book Now
                </Link>
              </div>

              <div className="bg-white p-8 rounded-lg luxury-shadow">
                <h4 className="font-serif text-xl text-nearBlack mb-2">Solid Color Refresh</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">90 min</span>
                  <span className="text-accent font-semibold text-xl">$140+</span>
                </div>
                <Link
                  href="/book?service=Solid%20Color"
                  className="inline-block mt-4 px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
                >
                  Book Now
                </Link>
              </div>

              <div className="bg-white p-8 rounded-lg luxury-shadow">
                <h4 className="font-serif text-xl text-nearBlack mb-2">Fashion / Vivid Colors</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">180 min</span>
                  <span className="text-accent font-semibold text-xl">$225+</span>
                </div>
                <Link
                  href="/book?service=Fashion%20Colors"
                  className="inline-block mt-4 px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
                >
                  Book Now
                </Link>
              </div>

              <div className="bg-white p-8 rounded-lg luxury-shadow">
                <h4 className="font-serif text-xl text-nearBlack mb-2">Hair Extensions</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">180 min</span>
                  <span className="text-accent font-semibold text-xl">$250+</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Installation or move-up. Consultation required.</p>
                <Link
                  href="/book?service=Hair%20Extensions"
                  className="inline-block mt-4 px-6 py-2 bg-accent text-white rounded hover:bg-hover transition-colors font-medium"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Why Mobile Section */}
        <div className="mb-16 bg-white p-10 md:p-12 rounded-2xl luxury-shadow">
          <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">Why Mobile?</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Most clients choose MĒL11 because they want luxury without the salon chaos.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent text-xl">✓</span>
              </div>
              <p className="text-gray-700">No parking, no traffic</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent text-xl">✓</span>
              </div>
              <p className="text-gray-700">Private, quiet, unhurried appointments</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent text-xl">✓</span>
              </div>
              <p className="text-gray-700">No public waiting rooms</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent text-xl">✓</span>
              </div>
              <p className="text-gray-700">Salon results without salon chaos</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent text-xl">✓</span>
              </div>
              <p className="text-gray-700">Fits around work, childcare, home duties</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent text-xl">✓</span>
              </div>
              <p className="text-gray-700">Complete privacy & discretion</p>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-10 italic">
            Beauty designed for real life. Not salon schedules.
          </p>
        </div>

        {/* Pricing Note */}
        <div className="mt-20 p-8 bg-white rounded-lg border border-softLine max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl mb-4 text-nearBlack">A note about pricing</h3>
          <p className="text-gray-600 leading-relaxed">
            All rates listed are base pricing. Exact pricing depends on service time, travel distance, and specific treatment requirements.
            Clients receive a final quote before an appointment is confirmed.
          </p>
        </div>
      </div>
    </div>
  );
}
