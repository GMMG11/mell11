import Link from 'next/link';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="font-serif text-9xl md:text-[12rem] gradient-text leading-none">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-nearBlack mb-6">
            Page Not Found
          </h2>
          <div className="luxury-divider max-w-xs mx-auto mb-6" />
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
            We couldn't find the page you're looking for. It may have been moved,
            deleted, or perhaps never existed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button size="lg" variant="primary" className="min-w-[200px] luxury-hover">
              Return Home
            </Button>
          </Link>
          <Link href="/services">
            <Button size="lg" variant="outline" className="min-w-[200px]">
              View Services
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-16 p-6 glass-card rounded-2xl max-w-md mx-auto">
          <p className="text-sm text-gray-600">
            Need assistance? Feel free to{' '}
            <Link href="/contact" className="text-accent hover:underline font-medium">
              contact us
            </Link>{' '}
            or browse our{' '}
            <Link href="/services" className="text-accent hover:underline font-medium">
              complete service menu
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
