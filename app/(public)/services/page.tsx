import React from 'react';
import Link from 'next/link';

const services = [
  // Hair & Color
  { name: "Women's Haircut", price: 40, duration: 60, category: "Hair & Color" },
  { name: "Men's Haircut", price: 32, duration: 45, category: "Hair & Color" },
  { name: "Kids' Haircut", price: 27, duration: 30, category: "Hair & Color" },
  { name: "Wash", price: 7, duration: 15, category: "Hair & Color" },
  { name: "Style", price: 25, duration: 30, category: "Hair & Color" },
  { name: "Partial Foil Highlights", price: 115, duration: 120, category: "Hair & Color" },
  { name: "Full Foil Highlights", price: 150, duration: 150, category: "Hair & Color" },
  { name: "Solid Color", price: 90, duration: 90, category: "Hair & Color" },
  { name: "Fashion Colors", price: 175, duration: 180, category: "Hair & Color" },
  { name: "Perms", price: 75, duration: 150, category: "Hair & Color" },
  { name: "Chemical Straightening", price: 115, duration: 180, category: "Hair & Color" },
  { name: "Hair Extensions", price: 150, duration: 180, category: "Hair & Color" },
  { name: "Hair Tinsel", price: 15, duration: 30, category: "Hair & Color" },
  { name: "Updo / Special Occasion Style", price: 75, duration: 90, category: "Hair & Color" },

  // Skin & Facials
  { name: "Signature House Call Facial", price: 120, duration: 75, category: "Skin & Facials" },

  // Advanced Treatments
  { name: "Hydrafacial Treatment", price: 175, duration: 60, category: "Advanced Treatments" },
  { name: "Dermabrasion", price: 95, duration: 60, category: "Advanced Treatments" },
  { name: "Chemical Peel", price: 110, duration: 60, category: "Advanced Treatments" },
  { name: "Microneedling", price: 200, duration: 90, category: "Advanced Treatments" },
  { name: "Lip Blush Tattoo", price: 350, duration: 120, category: "Advanced Treatments" },
  { name: "Laser Hair Removal Session", price: 100, duration: 45, category: "Advanced Treatments" },

  // Brows & Lashes
  { name: "Brow Shaping & Tint", price: 35, duration: 30, category: "Brows & Lashes" },
  { name: "Lash Lift & Tint", price: 85, duration: 60, category: "Brows & Lashes" },
  { name: "Sugaring Hair Removal", price: 45, duration: 45, category: "Brows & Lashes" },

  // Teeth Whitening
  { name: "Professional Teeth Whitening", price: 125, duration: 60, category: "Teeth Whitening" },
];

const servicesByCategory = services.reduce((acc, service) => {
  if (!acc[service.category]) {
    acc[service.category] = [];
  }
  acc[service.category].push(service);
  return acc;
}, {} as Record<string, typeof services>);

export default function ServicesPage() {
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

        {/* Services by Category */}
        <div className="space-y-16">
          {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
            <div key={category} className="bg-white rounded-2xl p-8 luxury-shadow">
              <h2 className="font-serif text-3xl text-nearBlack mb-6 pb-3 border-b-2 border-accent">
                {category}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-softLine">
                      <th className="text-left py-3 px-4 text-nearBlack font-semibold">Service</th>
                      <th className="text-center py-3 px-4 text-nearBlack font-semibold">Duration</th>
                      <th className="text-right py-3 px-4 text-nearBlack font-semibold">Price</th>
                      <th className="text-center py-3 px-4 text-nearBlack font-semibold">Book</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryServices.map((service, index) => (
                      <tr key={index} className="border-b border-softLine hover:bg-cream transition-colors">
                        <td className="py-4 px-4 text-nearBlack font-medium">{service.name}</td>
                        <td className="py-4 px-4 text-center text-gray-600">{service.duration} min</td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-accent font-semibold text-lg">${service.price}+</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Link
                            href={`/book?service=${encodeURIComponent(service.name)}`}
                            className="inline-block px-4 py-2 bg-accent text-white rounded hover:bg-hover transition-colors text-sm font-medium whitespace-nowrap"
                          >
                            Book Now
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

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
