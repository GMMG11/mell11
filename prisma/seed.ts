import { PrismaClient, ServiceCategory } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!', 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@mel11.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@mel11.com',
      password: hashedPassword,
      name: 'Melissa Green',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create services with actual Melissa Faye offerings
  const services = [
    // HAIR SERVICES - Basic
    {
      name: 'Women\'s Haircut',
      slug: 'womens-haircut',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Professional haircut tailored to your style. Includes consultation, precision cutting, and styling. Perfect for maintaining your look or trying something new.',
      duration: 60,
      price: 40,
      isFeatured: false,
      order: 1,
    },
    {
      name: 'Men\'s Haircut',
      slug: 'mens-haircut',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Classic or modern men\'s cut with attention to detail. Includes consultation, cut, and styling. All hair types and styles welcome.',
      duration: 45,
      price: 32,
      isFeatured: false,
      order: 2,
    },
    {
      name: 'Kids\' Haircut',
      slug: 'kids-haircut',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Patient, friendly haircut service for children of all ages. Creating a comfortable experience for your little one.',
      duration: 30,
      price: 27,
      isFeatured: false,
      order: 3,
    },
    {
      name: 'Wash & Style',
      slug: 'wash-style',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Professional wash and styling service. Perfect for special occasions or when you want salon-quality results at home.',
      duration: 45,
      price: 32,
      isFeatured: false,
      order: 4,
    },

    // HAIR COLOR & TEXTURE
    {
      name: 'Partial Foil Highlights',
      slug: 'partial-foil',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Strategic highlights to brighten and add dimension. Focuses on face-framing areas for a natural, sun-kissed look.',
      duration: 120,
      price: 115,
      isFeatured: false,
      order: 5,
    },
    {
      name: 'Full Foil Highlights',
      slug: 'full-foil',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Complete highlight service for all-over brightness and dimension. Creates a blended, multi-tonal effect throughout your hair.',
      duration: 150,
      price: 150,
      isFeatured: true,
      order: 6,
    },
    {
      name: 'Solid Color',
      slug: 'solid-color',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Single-process color for all-over coverage. Perfect for covering gray, refreshing your shade, or trying a new color.',
      duration: 90,
      price: 90,
      isFeatured: false,
      order: 7,
    },
    {
      name: 'Fashion Colors',
      slug: 'fashion-colors',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Bold, vibrant fashion colors including pastels, vivids, and creative color techniques. Express yourself with custom color artistry.',
      duration: 180,
      price: 175,
      isFeatured: true,
      order: 8,
    },
    {
      name: 'Perm',
      slug: 'perm',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Long-lasting curls or waves customized to your desired look. Includes consultation, perm application, cut, and style.',
      duration: 150,
      price: 75,
      isFeatured: false,
      order: 9,
    },
    {
      name: 'Chemical Straightening',
      slug: 'chemical-straightening',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Professional smoothing treatment for long-lasting straight, manageable hair. Reduces styling time and eliminates frizz.',
      duration: 180,
      price: 115,
      isFeatured: false,
      order: 10,
    },

    // HAIR EXTRAS
    {
      name: 'Hair Extensions',
      slug: 'extensions',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Professional extension installation for length and volume. Price varies by hair type and amount needed. Consultation required.',
      duration: 180,
      price: 150,
      isFeatured: false,
      order: 11,
    },
    {
      name: 'Hair Tinsel',
      slug: 'tinsel',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Add sparkle and shine to your hair with heat-resistant tinsel strands. Fun accent for special occasions or everyday glamour.',
      duration: 30,
      price: 15,
      isFeatured: false,
      order: 12,
    },
    {
      name: 'Updo / Special Occasion Style',
      slug: 'updo-special-occasion',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Elegant updo or special occasion styling for weddings, proms, events, or photoshoots. Includes consultation and trial upon request.',
      duration: 90,
      price: 75,
      isFeatured: false,
      order: 13,
    },

    // SKIN & FACIALS
    {
      name: 'Signature House Call Facial',
      slug: 'signature-house-call-facial',
      category: ServiceCategory.SKIN_AND_FACIALS,
      description: 'Customized facial treatment brought to your home. Deep cleansing, exfoliation, extractions, massage, mask, and hydration tailored to your skin type.',
      duration: 75,
      price: 120,
      isFeatured: true,
      order: 14,
    },
    {
      name: 'Hydrafacial Treatment',
      slug: 'hydrafacial',
      category: ServiceCategory.ADVANCED_TREATMENTS,
      description: 'Medical-grade hydradermabrasion that cleanses, extracts, and hydrates. Instant glowing results with zero downtime.',
      duration: 60,
      price: 175,
      isFeatured: true,
      order: 15,
    },
    {
      name: 'Dermabrasion',
      slug: 'dermabrasion',
      category: ServiceCategory.ADVANCED_TREATMENTS,
      description: 'Professional microdermabrasion to refine skin texture, reduce fine lines, and reveal smoother, more radiant skin.',
      duration: 60,
      price: 95,
      isFeatured: false,
      order: 16,
    },
    {
      name: 'Chemical Peel',
      slug: 'chemical-peel',
      category: ServiceCategory.ADVANCED_TREATMENTS,
      description: 'Customized chemical peel to address concerns like aging, acne, pigmentation, and texture. Professional-strength results.',
      duration: 60,
      price: 110,
      isFeatured: false,
      order: 17,
    },
    {
      name: 'Microneedling',
      slug: 'microneedling',
      category: ServiceCategory.ADVANCED_TREATMENTS,
      description: 'Collagen-induction therapy to improve skin texture, reduce scars, fine lines, and promote overall skin rejuvenation.',
      duration: 90,
      price: 200,
      isFeatured: true,
      order: 18,
    },

    // BROWS & LASHES
    {
      name: 'Brow Shaping & Tint',
      slug: 'brow-shaping-tint',
      category: ServiceCategory.BROWS_LASHES_MAKEUP,
      description: 'Expert brow shaping with professional tinting to enhance and define your natural brow shape.',
      duration: 30,
      price: 35,
      isFeatured: false,
      order: 19,
    },
    {
      name: 'Lash Lift & Tint',
      slug: 'lash-lift-tint',
      category: ServiceCategory.BROWS_LASHES_MAKEUP,
      description: 'Semi-permanent lash curl and tint for naturally lifted, darker lashes. Results last 6-8 weeks.',
      duration: 60,
      price: 85,
      isFeatured: false,
      order: 20,
    },
    {
      name: 'Sugaring Hair Removal',
      slug: 'sugaring',
      category: ServiceCategory.BROWS_LASHES_MAKEUP,
      description: 'Natural, gentle hair removal using sugar paste. Less irritation than waxing, suitable for sensitive skin. Various areas available.',
      duration: 45,
      price: 45,
      isFeatured: false,
      order: 21,
    },

    // ADVANCED AESTHETICS
    {
      name: 'Lip Blush Tattoo',
      slug: 'lip-blush',
      category: ServiceCategory.ADVANCED_TREATMENTS,
      description: 'Semi-permanent cosmetic tattoo for naturally enhanced lip color. Consultation required. Results last 2-3 years.',
      duration: 120,
      price: 350,
      isFeatured: false,
      order: 22,
    },
    {
      name: 'Laser Hair Removal Session',
      slug: 'laser-hair-removal',
      category: ServiceCategory.ADVANCED_TREATMENTS,
      description: 'Professional laser hair removal for long-lasting hair reduction. Multiple sessions recommended. Price varies by area.',
      duration: 45,
      price: 100,
      isFeatured: false,
      order: 23,
    },
    {
      name: 'Professional Teeth Whitening',
      slug: 'teeth-whitening',
      category: ServiceCategory.TEETH_WHITENING,
      description: 'In-home cosmetic teeth whitening for a brighter, more confident smile. Safe, effective, professional-grade results.',
      duration: 60,
      price: 125,
      isFeatured: false,
      order: 24,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  console.log(`✅ ${services.length} services created`);

  // Create default availability (Tuesday - Saturday, 9 AM - 6 PM)
  const defaultSchedule = [
    { dayOfWeek: 2, startTime: '09:00', endTime: '18:00' }, // Tuesday
    { dayOfWeek: 3, startTime: '09:00', endTime: '18:00' }, // Wednesday
    { dayOfWeek: 4, startTime: '09:00', endTime: '18:00' }, // Thursday
    { dayOfWeek: 5, startTime: '09:00', endTime: '18:00' }, // Friday
    { dayOfWeek: 6, startTime: '09:00', endTime: '18:00' }, // Saturday
  ];

  for (const schedule of defaultSchedule) {
    await prisma.availability.upsert({
      where: { dayOfWeek: schedule.dayOfWeek },
      update: schedule,
      create: schedule,
    });
  }

  console.log('✅ Default availability created');

  // Create default settings
  await prisma.settings.upsert({
    where: { key: 'booking_settings' },
    update: {},
    create: {
      key: 'booking_settings',
      value: JSON.stringify({
        bufferTime: 30, // minutes between appointments
        advanceBookingDays: 60, // how far in advance clients can book
        minAdvanceHours: 24, // minimum hours before appointment
        depositPercentage: 50, // percentage of total for deposit
        requireDeposit: true,
      }),
    },
  });

  console.log('✅ Default settings created');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
