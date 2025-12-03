'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Auto-close mobile menu after 5 seconds
  useEffect(() => {
    if (mobileMenuOpen) {
      timerRef.current = setTimeout(() => {
        setMobileMenuOpen(false);
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [mobileMenuOpen]);

  // Close resources dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Book', href: '/book' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const resourceLinks = [
    { name: 'FAQ', href: '/faq', disabled: false },
    { name: 'Blog', href: '#', disabled: true },
    { name: 'Skin Education', href: '#', disabled: true },
    { name: 'Client Stories', href: '#', disabled: true },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const isResourcesActive = resourceLinks.some(link => isActive(link.href));

  return (
    <nav className="bg-cream border-b border-softLine sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-3xl text-nearBlack tracking-wider">
            MĒL11
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  isActive(link.href)
                    ? 'text-accent font-medium'
                    : 'text-nearBlack hover:text-accent'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Resources Dropdown */}
            <div className="relative" ref={resourcesRef}>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`text-sm tracking-wide transition-colors flex items-center gap-1 ${
                  isResourcesActive
                    ? 'text-accent font-medium'
                    : 'text-nearBlack hover:text-accent'
                }`}
              >
                Resources
                <svg
                  className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-softLine overflow-hidden transition-all duration-200 ${
                  resourcesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                {resourceLinks.map((link) => (
                  link.disabled ? (
                    <span
                      key={link.name}
                      className="block px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
                    >
                      {link.name}
                      <span className="ml-2 text-xs text-gray-300">Coming Soon</span>
                    </span>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 text-sm transition-colors ${
                        isActive(link.href)
                          ? 'text-accent bg-accent/5 font-medium'
                          : 'text-nearBlack hover:bg-cream hover:text-accent'
                      }`}
                      onClick={() => setResourcesOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-nearBlack"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-softLine">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 text-base ${
                  isActive(link.href)
                    ? 'text-accent font-medium'
                    : 'text-nearBlack'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Resources Section */}
            <div className="pt-3 mt-3 border-t border-softLine">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Resources</p>
              {resourceLinks.map((link) => (
                link.disabled ? (
                  <span
                    key={link.name}
                    className="block py-3 text-base pl-4 text-gray-400 cursor-not-allowed"
                  >
                    {link.name}
                    <span className="ml-2 text-xs text-gray-300">Coming Soon</span>
                  </span>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-3 text-base pl-4 ${
                      isActive(link.href)
                        ? 'text-accent font-medium'
                        : 'text-nearBlack'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
