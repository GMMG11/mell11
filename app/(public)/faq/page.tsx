'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const faqs = [
  // NEW STRATEGIC FAQs
  {
    question: "What's the difference between MĒL11 and other mobile aestheticians in Seattle?",
    answer: `Three key differences:

1. Clinical Expertise: I'm paramedical-certified with 23 years of clinical experience, not a general esthetician who added mobile services as a side offering. I specialize exclusively in clinical anti-aging treatments.

2. True Mobile Model: I built MĒL11 as a mobile-first practice. I don't have studio overhead to subsidize, which means genuine cost savings passed to you, not a studio that offers mobile as an expensive add-on service.

3. Transparent Pricing & Availability: All pricing is published upfront. Appointments are typically available within 1-2 weeks, not 1-2 months. No hidden fees, no surprise costs.

You're getting 23 years of clinical expertise, pharmaceutical-grade products, and medical equipment without paying for someone else's lease, reception desk, or retail markup.`
  },
  {
    question: "Do you use natural or organic products?",
    answer: `I use pharmaceutical-grade, clinical-strength products, the same products used in medical spas and dermatology offices. These are formulated for results, not marketing claims.

Here's what matters: safety + efficacy.

"Natural" and "organic" aren't regulated terms in skincare, and many natural ingredients can cause irritation or provide minimal results. Pharmaceutical-grade products undergo rigorous testing, are FDA-regulated where applicable, and deliver proven, measurable results.

My priority is your skin's transformation, not trendy marketing language.

If you have specific ingredient sensitivities or concerns, we discuss this during consultation and customize your treatment accordingly. But I won't compromise clinical results for wellness buzzwords.`
  },
  {
    question: "Why don't you have a physical studio?",
    answer: `By design.

After 23 years working in high-end clinics and spas, I realized clients were paying double, not for better results, but for overhead that didn't serve them:

• $5,000-15,000/month commercial lease
• Reception staff salaries
• Multiple treatment rooms (most sitting empty)
• Retail space and décor
• Utilities and maintenance

Those costs get passed directly to you, often doubling treatment prices.

I eliminated all of that. You get the same clinical-grade treatments, the same pharmaceutical products, the same medical equipment, just without subsidizing overhead you don't need.

This isn't about "cutting corners." It's about cutting out everything that doesn't directly serve your results.

The only "downside"? You don't get a marble waiting room. But most of my clients consider that an upgrade: they get privacy, convenience, and clinical expertise without the markup.`
  },
  {
    question: "How quickly can I get an appointment?",
    answer: `Typically within 1-2 weeks, often sooner depending on your schedule flexibility.

Because I don't manage a physical studio with set room schedules, I have more flexibility to accommodate your timing, whether that's evenings, weekends, or lunch breaks.

For recurring clients and transformation programs, we schedule your entire series upfront to lock in your preferred times.

Last-minute availability? Text or call (253) 778-2735 and I'll let you know what's open. I work around your schedule, not the other way around.`
  },
  {
    question: "Can mobile treatments really match clinic quality?",
    answer: `Yes, because the treatment IS the same. Let me break this down:

What determines treatment quality:
• Practitioner expertise and training
• Equipment and technology used
• Product quality and pharmaceutical-grade formulations
• Sterile protocols and safety standards

What DOESN'T determine treatment quality:
• Marble countertops
• A commercial address
• A waiting room
• Retail displays

I'm paramedical-certified with 23 years of clinical experience. I use the same medical-grade equipment, the same pharmaceutical products, and follow the same sterile protocols as any medical spa in Seattle.

The only difference? Location. I come to you instead of you driving to me.

Your skin doesn't know if it's being treated in a downtown clinic or your private office. It only knows if it's getting clinical-grade care, which is exactly what I deliver.`
  },
  // ORIGINAL FAQs
  {
    question: "How much do mobile aesthetic treatments cost compared to clinics?",
    answer: "MĒL11 treatments are typically 30-50% less than traditional medical spas because we eliminate commercial overhead: no storefront rent, no receptionist costs, no inflated markup. You get the same clinical-grade treatments and pharmaceutical products at a significantly better value."
  },
  {
    question: "Are mobile treatments as safe as clinic treatments?",
    answer: "Absolutely. Melissa is paramedical-certified with 23 years of clinical experience and uses the same medical-grade equipment and pharmaceutical products as medical spas. The only difference is location: your comfort, not our overhead."
  },
  {
    question: "What areas do you serve?",
    answer: "Tacoma, Puyallup, and Greater Seattle. Travel fees apply outside the Tacoma/Puyallup area."
  },
  {
    question: "How long are appointments?",
    answer: "Treatments range from 30 minutes (brows) to 120 minutes (comprehensive facials or advanced treatments). We never rush. Your appointment time is yours alone."
  },
  {
    question: "Do you come to offices or only homes?",
    answer: "We serve clients wherever they're most comfortable: home, private office, or hotel."
  },
  {
    question: "What's the difference between your services and a day spa?",
    answer: "MĒL11 specializes in clinical anti-aging aesthetics with paramedical-grade protocols. We focus on transformative results using pharmaceutical products and advanced techniques, not relaxation treatments."
  },
  {
    question: "Why are your prices lower than medical spas?",
    answer: "No commercial lease, no receptionist, no commission structure. I'm a solo practitioner with low overhead, so I pass those savings directly to clients. You're paying for expertise and clinical-grade products, not marble floors."
  },
  {
    question: "How do I prepare for my first appointment?",
    answer: "Arrive with clean skin (no makeup if possible). We'll discuss your concerns, skin history, and goals before beginning any treatment."
  },
  {
    question: "Do you offer package discounts?",
    answer: "Yes! Our 8-12 Week Signature Transformation Program offers the best value for comprehensive skin rejuvenation."
  },
  {
    question: "What products do you use?",
    answer: "Pharmaceutical-grade, clinical-strength products. The same quality used in medical spas and dermatology offices."
  }
];

function FAQItem({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-softLine">
      <button
        className="w-full py-6 flex justify-between items-center text-left hover:text-accent transition-colors"
        onClick={onClick}
      >
        <span className="font-serif text-xl text-nearBlack pr-8">{question}</span>
        <span className={`text-accent text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[800px] pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600 leading-relaxed pr-12 whitespace-pre-line">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-cream min-h-screen py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-nearBlack">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Everything you need to know about clinical mobile aesthetics with MĒL11.
          </p>
          <p className="text-base text-gray-600">
            Have a question not answered here? Contact us directly at{' '}
            <a href="mailto:hello@mel11.com" className="text-accent hover:underline">hello@mel11.com</a>
            {' '}or{' '}
            <a href="tel:2537782735" className="text-accent hover:underline">(253) 778-2735</a>
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 luxury-shadow">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Ready to experience clinical anti-aging aesthetics in your own space?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-block px-8 py-4 bg-accent text-white rounded-lg hover:bg-hover transition-colors font-medium"
            >
              Book Your Appointment
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 border border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
