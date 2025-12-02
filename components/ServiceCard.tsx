import React from 'react';
import Link from 'next/link';
import Button from './Button';

interface ServiceCardProps {
  name: string;
  description: string;
  duration: number;
  price: number;
  slug: string;
  featured?: boolean;
}

export default function ServiceCard({
  name,
  description,
  duration,
  price,
  slug,
  featured = false,
}: ServiceCardProps) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 luxury-shadow luxury-hover relative overflow-hidden ${
        featured ? 'ring-2 ring-accent ring-offset-4 ring-offset-cream' : ''
      }`}
    >
      {/* Subtle gradient overlay for featured */}
      {featured && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full" />
      )}

      <div className="relative z-10">
        {featured && (
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-accent/10 rounded-full">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span className="text-accent text-xs uppercase tracking-wider font-semibold">Signature</span>
          </div>
        )}

        <h3 className="font-serif text-2xl md:text-3xl text-nearBlack mb-4 leading-tight">
          {name}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed text-sm">
          {description}
        </p>

        <div className="luxury-divider mb-6" />

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">{duration} min</span>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">From</div>
            <div className="font-serif text-3xl gradient-text font-semibold">
              ${price}
            </div>
          </div>
        </div>

        <Link href={`/book?service=${slug}`}>
          <Button variant="primary" className="w-full group">
            <span className="flex items-center justify-center gap-2">
              Reserve Now
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
