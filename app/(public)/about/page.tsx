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
              A new approach to luxury beauty—one that meets you where you are
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-8 text-lg text-gray-700 leading-relaxed">
            <p>
              MĒL11 was created for clients who love results but hate the salon experience. Instead of
              fighting for parking, sitting under harsh lights, or feeling rushed in a busy space, MĒL11
              brings a private, elevated beauty experience directly into your home.
            </p>

            <p>
              Every appointment is one-on-one, customized, and intentionally unhurried. The focus is simple:
              real, visible improvement in your skin, hair, and overall confidence—delivered in a calm,
              comfortable environment you already trust.
            </p>

            <div className="bg-white p-8 rounded-lg border border-softLine my-12">
              <h3 className="font-serif text-2xl mb-4 text-nearBlack">Our Philosophy</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl">•</span>
                  <span>
                    <strong>Real results over trends.</strong> We focus on treatments that work, not what's
                    viral.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl">•</span>
                  <span>
                    <strong>Your space, your comfort.</strong> No commute, no waiting, no overhead lighting.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl">•</span>
                  <span>
                    <strong>Personalized care.</strong> Every service is tailored to your unique needs and
                    goals.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl">•</span>
                  <span>
                    <strong>Professional without pretension.</strong> High-end service that feels warm, not
                    exclusive.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Melissa */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl mb-8 text-nearBlack text-center">Meet Mel</h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Melissa Green, the founder and lead aesthetician behind MĒL11, brings nearly two decades of
                experience in the beauty industry. Licensed in both aesthetics and barbering, she has spent
                years mastering everything from advanced skincare treatments to precision haircuts and color.
              </p>

              <p>
                What sets Melissa apart is her genuine belief that beauty services should enhance your
                life—not complicate it. After years working in traditional salons and spas, she saw the same
                pattern: clients loved the results but dreaded the logistics. The parking. The small talk.
                The rush. The noise.
              </p>

              <p>
                MĒL11 was born from a simple idea: bring the best parts of the salon experience—professional
                skill, quality products, personalized attention—directly to the client, without the parts
                that don't serve them.
              </p>

              <div className="bg-cream p-6 rounded-lg my-8">
                <h4 className="font-semibold mb-3 text-nearBlack">Certifications & Training</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Licensed Aesthetician (Washington State)</li>
                  <li>• Licensed Barber & Hair Designer (Washington State)</li>
                  <li>• Advanced Skincare & Microneedling Certification</li>
                  <li>• Chemical Peel & Advanced Treatment Training</li>
                  <li>• Brow Lamination & Lash Lift Specialist</li>
                  <li>• 19+ years in the beauty and wellness industry</li>
                </ul>
              </div>

              <p>
                When she's not transforming skin or perfecting a cut, Melissa is a proud mother of two and an
                advocate for accessible, high-quality beauty care. She believes everyone deserves to feel
                confident in their skin—and that the best environment for that is one where you already feel
                at home.
              </p>
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
              MĒL11 currently serves clients throughout Tacoma, Puyallup, and the greater Seattle area.
              Travel fees may apply depending on location. Have questions about whether we can reach you?
              Just ask.
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
