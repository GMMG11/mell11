import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-nearBlack text-cream py-12 mt-20 relative overflow-hidden z-20">
      {/* Background Image - Same as Hero */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=90&w=2400&auto=format&fit=crop"
          alt="Luxury spa background"
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'brightness(0.3)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nearBlack via-nearBlack/80 to-nearBlack/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-3xl tracking-wider mb-4 text-cream">MĒL11</h3>
            <p className="text-sm text-cream/90 mb-2">In-home luxury skin + aesthetics</p>
            <p className="text-sm text-cream/90">Tacoma & Greater Seattle area</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-sm text-cream/90 hover:text-cream transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-sm text-cream/90 hover:text-cream transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-cream/90 hover:text-cream transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-cream/90 hover:text-cream transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4 text-accent">Connect</h4>
            <ul className="space-y-2 text-sm text-cream/90">
              <li>
                <a href="mailto:hello@mel11.com" className="hover:text-cream transition-colors">
                  hello@mel11.com
                </a>
              </li>
              <li>
                <a href="tel:2537782735" className="hover:text-cream transition-colors">
                  (253) 778-2735
                </a>
              </li>
              <li className="pt-4">
                <a
                  href="https://instagram.com/mel11skin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream transition-colors"
                >
                  @mel11skin
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-cream/80">
          <p>&copy; {new Date().getFullYear()} MĒL11. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/admin" className="hover:text-cream transition-colors">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
