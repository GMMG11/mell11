'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl mb-4 text-nearBlack">Get in touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our services, availability, or pricing? Want to discuss a custom package
              or event? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="font-serif text-2xl mb-6 text-nearBlack">Send us a message</h2>

              {success && (
                <div className="bg-accent/10 border border-accent text-nearBlack px-4 py-3 rounded mb-6">
                  Thank you! We'll get back to you within 24 hours.
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <Input
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                />

                <Textarea
                  label="Message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Tell us what you're looking for..."
                  rows={6}
                />

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Sending...' : 'Send message'}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
                <h2 className="font-serif text-2xl mb-6 text-nearBlack">Contact information</h2>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-accent mb-2">Email</h4>
                    <a
                      href="mailto:hello@mel11.com"
                      className="text-nearBlack hover:text-accent transition-colors"
                    >
                      hello@mel11.com
                    </a>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-accent mb-2">Phone</h4>
                    <a href="tel:2537782735" className="text-nearBlack hover:text-accent transition-colors">
                      (253) 778-2735
                    </a>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-accent mb-2">
                      Service Area
                    </h4>
                    <p className="text-nearBlack">
                      Tacoma, Puyallup, and Greater Seattle Area
                      <br />
                      <span className="text-sm text-gray-600">
                        Travel fees may apply based on location
                      </span>
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-accent mb-2">
                      Social Media
                    </h4>
                    <a
                      href="https://instagram.com/mel11skin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-nearBlack hover:text-accent transition-colors"
                    >
                      @mel11skin
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-6 rounded-lg border border-accent/30">
                <h4 className="font-semibold mb-3 text-nearBlack">Response Times</h4>
                <p className="text-sm text-gray-700">
                  We typically respond to inquiries within 24 hours during business days. For urgent booking
                  requests or questions, please call or text us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
