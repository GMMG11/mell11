import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl mb-6 text-nearBlack">About MĒL11</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              A new approach to luxury beauty. One that meets you where you already feel safe, calm, and fully yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-8 text-lg text-gray-700 leading-relaxed">
            <p className="text-center font-serif text-2xl text-nearBlack mb-8">
              MĒL11 was built on a simple belief:<br />
              <span className="italic">everyone deserves studio-level results without the stress, inconvenience, or cost of traditional salons.</span>
            </p>

            <p>
              After 19 years in the beauty industry, Melissa saw the same pattern everywhere she worked. Clients loved the results, but dreaded the experience:
            </p>

            <div className="bg-white p-8 rounded-lg border border-softLine">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl">•</span>
                  <span>Delayed appointments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl">•</span>
                  <span>Harsh overhead lighting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl">•</span>
                  <span>Crowded waiting rooms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl">•</span>
                  <span>Noise, chaos, and rushed conversations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl">•</span>
                  <span>Lost time in traffic or downtown parking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl">•</span>
                  <span>Premium pricing inflated by salon rent, overhead, and commissions</span>
                </li>
              </ul>
            </div>

            <p className="text-center font-serif text-2xl text-nearBlack pt-8">
              So she decided to change the model entirely.
            </p>

            <p className="text-center text-xl italic text-gray-600">
              Instead of bringing clients to the salon,<br />
              she would bring the salon to the client.
            </p>
          </div>
        </div>
      </section>

      {/* Why In-Home Beauty */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">Why In-Home Beauty?</h2>
            <p className="text-center text-lg text-gray-600 mb-8 italic">Her Personal Philosophy</p>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Melissa's philosophy is simple:
              </p>

              <p className="text-xl italic text-center text-nearBlack">
                Beauty should feel personal, private, and accessible. Not intimidating or overpriced.
              </p>

              <p>
                With no salon lease, no chair fees, and no inflated commercial overhead, Melissa can offer:
              </p>

              <div className="bg-cream p-8 rounded-lg border border-softLine">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-accent mr-3">✓</span>
                    <span>Lower pricing than traditional studios</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3">✓</span>
                    <span>Higher-end products and equipment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3">✓</span>
                    <span>Longer, more attentive appointments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3">✓</span>
                    <span>A level of privacy salons simply can't match</span>
                  </li>
                </ul>
              </div>

              <p className="text-center italic text-gray-600 pt-4">
                The value isn't in cutting corners.<br />
                The value is in cutting out everything that doesn't serve the client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COVID Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed">
            <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">
              COVID changed everything and confirmed her vision
            </h2>

            <p>
              When COVID shut down salons, Melissa noticed something powerful:
            </p>

            <p className="text-xl italic text-center text-nearBlack">
              Clients weren't just avoiding public spaces.<br />
              They thrived in private ones.
            </p>

            <div className="bg-white p-8 rounded-lg border border-softLine">
              <p className="text-center space-y-2">
                They felt calmer.<br />
                They felt safer.<br />
                They felt truly cared for in a way they never had inside a commercial space.
              </p>
            </div>

            <p>
              She realized what many professionals missed:<br />
              <strong>beauty was never about the salon. It was about the connection.</strong>
            </p>

            <p>
              Her house-call model didn't just survive the pandemic. It became the preferred experience for dozens of clients who refused to go back to the salon chair.
            </p>

            <p className="text-center italic text-gray-600 pt-4">
              Today, the MĒL11 mobile studio is a fully optimized extension of that philosophy:<br />
              quiet, discreet, calming, and deeply personalized.
            </p>
          </div>
        </div>
      </section>

      {/* About Melissa */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-4xl mb-12 text-nearBlack text-center">Meet Mel</h2>

            <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
              {/* Photo */}
              <div className="relative">
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden luxury-shadow">
                  <img
                    src="https://hvujayiaqhixrbwznlxy.supabase.co/storage/v1/object/public/images/mel11.jpg"
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
                  With over 19 years of experience in aesthetics and barbering, Melissa has built a reputation for precision, patience, and an intuitive understanding of what makes each client feel confident.
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
            <div className="max-w-3xl mx-auto">
              <div className="bg-cream p-8 rounded-lg border border-softLine">
                <h4 className="font-serif text-2xl mb-4 text-nearBlack">Certifications & Training</h4>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Licensed Aesthetician (WA)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Licensed Barber & Hair Designer (WA)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Advanced Microneedling & Skin Rejuvenation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Chemical Peel & Dermabrasion Certified</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Brow Lamination & Lash Lift Specialist</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>19+ years in professional beauty + wellness</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20">
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
