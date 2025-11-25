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

  // Create services
  const services = [
    // SKIN AND FACIALS
    {
      name: 'Signature House Call Facial',
      slug: 'signature-house-call-facial',
      category: ServiceCategory.SKIN_AND_FACIALS,
      description: '60-minute customized facial brought to your home. A blend of deep cleansing, exfoliation, massage, mask, and nourishment tailored to your skin\'s needs.',
      duration: 60,
      price: 245,
      isFeatured: true,
      order: 1,
    },
    {
      name: 'Hydrating Glow Facial',
      slug: 'hydrating-glow-facial',
      category: ServiceCategory.SKIN_AND_FACIALS,
      description: 'Deeply hydrating treatment with hyaluronic acid and vitamin-rich serums. Perfect for dry, dehydrated, or dull skin seeking luminosity.',
      duration: 75,
      price: 265,
      isFeatured: false,
      order: 2,
    },
    {
      name: 'Acne Clarifying Facial',
      slug: 'acne-clarifying-facial',
      category: ServiceCategory.SKIN_AND_FACIALS,
      description: 'Targeted treatment for acne-prone skin with gentle extractions, salicylic acid, and calming ingredients to reduce inflammation and prevent future breakouts.',
      duration: 75,
      price: 275,
      isFeatured: false,
      order: 3,
    },
    {
      name: 'Anti-Aging Collagen Facial',
      slug: 'anti-aging-collagen-facial',
      category: ServiceCategory.SKIN_AND_FACIALS,
      description: 'Advanced facial focusing on fine lines, firmness, and skin texture with peptides, retinol alternatives, and collagen-boosting techniques.',
      duration: 90,
      price: 295,
      isFeatured: false,
      order: 4,
    },

    // ADVANCED TREATMENTS
    {
      name: 'Microneedling & Skin Renewal',
      slug: 'microneedling-skin-renewal',
      category: ServiceCategory.ADVANCED_TREATMENTS,
      description: 'Collagen-boosting microneedling to soften fine lines, improve texture, and support long-term skin health — performed in the comfort of your own space.',
      duration: 90,
      price: 395,
      isFeatured: true,
      order: 5,
    },
    {
      name: 'RF Microneedling',
      slug: 'rf-microneedling',
      category: ServiceCategory.ADVANCED_TREATMENTS,
      description: 'Advanced radiofrequency microneedling for dramatic skin tightening and collagen remodeling. (Coming soon - inquire for availability)',
      duration: 120,
      price: 595,
      isFeatured: false,
      order: 6,
    },
    {
      name: 'Chemical Peel',
      slug: 'chemical-peel',
      category: ServiceCategory.ADVANCED_TREATMENTS,
      description: 'Professional-grade chemical peel tailored to your skin concerns. Addresses hyperpigmentation, texture, and tone with minimal downtime.',
      duration: 60,
      price: 225,
      isFeatured: false,
      order: 7,
    },
    {
      name: 'LED Light Therapy Add-On',
      slug: 'led-light-therapy',
      category: ServiceCategory.ADVANCED_TREATMENTS,
      description: 'Therapeutic LED light session to reduce inflammation, boost collagen, or target acne. Can be added to any facial treatment.',
      duration: 20,
      price: 50,
      isFeatured: false,
      order: 8,
    },
    {
      name: 'Hydrafacial Treatment',
      slug: 'hydrafacial-treatment',
      category: ServiceCategory.ADVANCED_TREATMENTS,
      description: 'Medical-grade hydradermabrasion treatment that cleanses, extracts, and hydrates skin with powerful serums for instant, glowing results.',
      duration: 75,
      price: 325,
      isFeatured: false,
      order: 9,
    },

    // BROWS, LASHES & MAKEUP
    {
      name: 'Brow, Lash & Event-Ready Skin',
      slug: 'brow-lash-event-ready',
      category: ServiceCategory.BROWS_LASHES_MAKEUP,
      description: 'Laminated brows, lifted lashes, and glowing skin ahead of events, shoots, or big nights out. Red-carpet polish without leaving home.',
      duration: 90,
      price: 195,
      isFeatured: true,
      order: 10,
    },
    {
      name: 'Brow Lamination',
      slug: 'brow-lamination',
      category: ServiceCategory.BROWS_LASHES_MAKEUP,
      description: 'Semi-permanent brow styling that creates fuller, more defined brows with a sleek, brushed-up look. Lasts 6-8 weeks.',
      duration: 45,
      price: 85,
      isFeatured: false,
      order: 11,
    },
    {
      name: 'Brow Shaping & Tint',
      slug: 'brow-shaping-tint',
      category: ServiceCategory.BROWS_LASHES_MAKEUP,
      description: 'Precision brow shaping with professional tinting to define and enhance your natural arch.',
      duration: 30,
      price: 55,
      isFeatured: false,
      order: 12,
    },
    {
      name: 'Lash Lift & Tint',
      slug: 'lash-lift-tint',
      category: ServiceCategory.BROWS_LASHES_MAKEUP,
      description: 'Natural lash enhancement that lifts and curls your lashes from the root. Includes tint for added definition. Lasts 6-8 weeks.',
      duration: 60,
      price: 95,
      isFeatured: false,
      order: 13,
    },
    {
      name: 'Bridal or Event Makeup',
      slug: 'bridal-event-makeup',
      category: ServiceCategory.BROWS_LASHES_MAKEUP,
      description: 'Professional makeup application for weddings, photoshoots, or special events. Includes consultation and trial run option.',
      duration: 90,
      price: 185,
      isFeatured: false,
      order: 14,
    },

    // HAIR & COLOR
    {
      name: 'In-Home Haircut',
      slug: 'in-home-haircut',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Professional haircut in the comfort of your home. Includes wash, cut, and style. For all ages and hair types.',
      duration: 60,
      price: 85,
      isFeatured: false,
      order: 15,
    },
    {
      name: 'Root Touch-Up',
      slug: 'root-touch-up',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Quick root color refresh to maintain your shade between full color appointments. Perfect for covering grays or maintaining dimension.',
      duration: 75,
      price: 125,
      isFeatured: false,
      order: 16,
    },
    {
      name: 'Gloss & Tone',
      slug: 'gloss-tone',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Semi-permanent gloss treatment to add shine, neutralize brassiness, and refresh your color without commitment.',
      duration: 60,
      price: 95,
      isFeatured: false,
      order: 17,
    },
    {
      name: 'Blowout & Style',
      slug: 'blowout-style',
      category: ServiceCategory.HAIR_AND_COLOR,
      description: 'Luxurious wash and blowout with professional styling. Sleek, bouncy, or textured — your choice.',
      duration: 45,
      price: 65,
      isFeatured: false,
      order: 18,
    },

    // TEETH WHITENING
    {
      name: 'In-Home Teeth Whitening',
      slug: 'in-home-teeth-whitening',
      category: ServiceCategory.TEETH_WHITENING,
      description: 'Professional cosmetic teeth whitening session in your home. Safe, effective, and convenient. See results in one visit.',
      duration: 60,
      price: 195,
      isFeatured: false,
      order: 19,
    },

    // VIP & MEMBERSHIPS
    {
      name: 'MĒL11 Signature Membership',
      slug: 'mel11-signature-membership',
      category: ServiceCategory.VIP_MEMBERSHIPS,
      description: 'Two house call facials per month plus priority scheduling, exclusive member pricing, and complimentary add-ons. Monthly commitment.',
      duration: 60,
      price: 450,
      isFeatured: false,
      order: 20,
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
