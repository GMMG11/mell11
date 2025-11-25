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
      className={`bg-white rounded-lg p-8 transition-all hover:shadow-xl ${
        featured ? 'border-2 border-accent' : 'border border-softLine'
      }`}
    >
      {featured && (
        <div className="text-accent text-xs uppercase tracking-widest mb-2 font-semibold">Featured</div>
      )}
      <h3 className="font-serif text-2xl text-nearBlack mb-3">{name}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-softLine">
        <div>
          <span className="text-sm text-gray-500">Duration</span>
          <p className="text-nearBlack font-medium">{duration} minutes</p>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-500">From</span>
          <p className="text-2xl font-serif text-accent">${price}</p>
        </div>
      </div>
      <Link href={`/book?service=${slug}`}>
        <Button variant="primary" className="w-full">
          Book this service
        </Button>
      </Link>
    </div>
  );
}
