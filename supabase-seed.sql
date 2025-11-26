-- MĒL11 Database Seed Script
-- Run this AFTER running supabase-setup.sql

-- Insert Admin User (password: Admin123!)
INSERT INTO "AdminUser" (id, email, password, name, "createdAt", "updatedAt")
VALUES (
  'admin_' || gen_random_uuid()::text,
  'admin@mel11.com',
  '$2a$10$YourHashedPasswordHere',  -- You'll update this via the app
  'Melissa Green',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Insert all 25 services
INSERT INTO "Service" (id, name, slug, category, description, duration, price, "isActive", "isFeatured", "order", "createdAt", "updatedAt") VALUES
-- Hair Services - Basic
('svc_' || gen_random_uuid()::text, 'Women''s Haircut', 'womens-haircut', 'HAIR_AND_COLOR', 'Professional haircut tailored to your style. Includes consultation, precision cutting, and styling. Perfect for maintaining your look or trying something new.', 60, 40, true, false, 1, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Men''s Haircut', 'mens-haircut', 'HAIR_AND_COLOR', 'Classic or modern men''s cut with attention to detail. Includes consultation, cut, and styling. All hair types and styles welcome.', 45, 32, true, false, 2, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Kids'' Haircut', 'kids-haircut', 'HAIR_AND_COLOR', 'Patient, friendly haircut service for children of all ages. Creating a comfortable experience for your little one.', 30, 27, true, false, 3, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Wash', 'wash', 'HAIR_AND_COLOR', 'Professional hair wash service with quality products. Refreshing and relaxing treatment.', 15, 7, true, false, 4, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Style', 'style', 'HAIR_AND_COLOR', 'Professional styling service for any occasion. From sleek blowouts to textured waves.', 30, 25, true, false, 5, NOW(), NOW()),

-- Hair Color & Texture
('svc_' || gen_random_uuid()::text, 'Partial Foil Highlights', 'partial-foil', 'HAIR_AND_COLOR', 'Strategic highlights to brighten and add dimension. Focuses on face-framing areas for a natural, sun-kissed look.', 120, 115, true, false, 6, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Full Foil Highlights', 'full-foil', 'HAIR_AND_COLOR', 'Complete highlight service for all-over brightness and dimension. Creates a blended, multi-tonal effect throughout your hair.', 150, 150, true, true, 7, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Solid Color', 'solid-color', 'HAIR_AND_COLOR', 'Single-process color for all-over coverage. Perfect for covering gray, refreshing your shade, or trying a new color.', 90, 90, true, false, 8, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Fashion Colors', 'fashion-colors', 'HAIR_AND_COLOR', 'Bold, vibrant fashion colors including pastels, vivids, and creative color techniques. Express yourself with custom color artistry.', 180, 175, true, true, 9, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Perms', 'perm', 'HAIR_AND_COLOR', 'Long-lasting curls or waves customized to your desired look. Includes consultation, perm application, cut, and style.', 150, 75, true, false, 10, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Chemical Straightening', 'chemical-straightening', 'HAIR_AND_COLOR', 'Professional smoothing treatment for long-lasting straight, manageable hair. Reduces styling time and eliminates frizz.', 180, 115, true, false, 11, NOW(), NOW()),

-- Hair Extras
('svc_' || gen_random_uuid()::text, 'Hair Extensions', 'extensions', 'HAIR_AND_COLOR', 'Professional extension installation for length and volume. Price varies by hair type and amount needed. Consultation required.', 180, 150, true, false, 12, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Hair Tinsel', 'tinsel', 'HAIR_AND_COLOR', 'Add sparkle and shine to your hair with heat-resistant tinsel strands. Fun accent for special occasions or everyday glamour.', 30, 15, true, false, 13, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Updo / Special Occasion Style', 'updo-special-occasion', 'HAIR_AND_COLOR', 'Elegant updo or special occasion styling for weddings, proms, events, or photoshoots. Includes consultation and trial upon request.', 90, 75, true, false, 14, NOW(), NOW()),

-- Skin & Facials
('svc_' || gen_random_uuid()::text, 'Signature House Call Facial', 'signature-house-call-facial', 'SKIN_AND_FACIALS', 'Customized facial treatment brought to your home. Deep cleansing, exfoliation, extractions, massage, mask, and hydration tailored to your skin type.', 75, 120, true, true, 15, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Hydrafacial Treatment', 'hydrafacial', 'ADVANCED_TREATMENTS', 'Medical-grade hydradermabrasion that cleanses, extracts, and hydrates. Instant glowing results with zero downtime.', 60, 175, true, true, 16, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Dermabrasion', 'dermabrasion', 'ADVANCED_TREATMENTS', 'Professional microdermabrasion to refine skin texture, reduce fine lines, and reveal smoother, more radiant skin.', 60, 95, true, false, 17, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Chemical Peel', 'chemical-peel', 'ADVANCED_TREATMENTS', 'Customized chemical peel to address concerns like aging, acne, pigmentation, and texture. Professional-strength results.', 60, 110, true, false, 18, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Microneedling', 'microneedling', 'ADVANCED_TREATMENTS', 'Collagen-induction therapy to improve skin texture, reduce scars, fine lines, and promote overall skin rejuvenation.', 90, 200, true, true, 19, NOW(), NOW()),

-- Brows & Lashes
('svc_' || gen_random_uuid()::text, 'Brow Shaping & Tint', 'brow-shaping-tint', 'BROWS_LASHES_MAKEUP', 'Expert brow shaping with professional tinting to enhance and define your natural brow shape.', 30, 35, true, false, 20, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Lash Lift & Tint', 'lash-lift-tint', 'BROWS_LASHES_MAKEUP', 'Semi-permanent lash curl and tint for naturally lifted, darker lashes. Results last 6-8 weeks.', 60, 85, true, false, 21, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Sugaring Hair Removal', 'sugaring', 'BROWS_LASHES_MAKEUP', 'Natural, gentle hair removal using sugar paste. Less irritation than waxing, suitable for sensitive skin. Various areas available.', 45, 45, true, false, 22, NOW(), NOW()),

-- Advanced Aesthetics
('svc_' || gen_random_uuid()::text, 'Lip Blush Tattoo', 'lip-blush', 'ADVANCED_TREATMENTS', 'Semi-permanent cosmetic tattoo for naturally enhanced lip color. Consultation required. Results last 2-3 years.', 120, 350, true, false, 23, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Laser Hair Removal Session', 'laser-hair-removal', 'ADVANCED_TREATMENTS', 'Professional laser hair removal for long-lasting hair reduction. Multiple sessions recommended. Price varies by area.', 45, 100, true, false, 24, NOW(), NOW()),
('svc_' || gen_random_uuid()::text, 'Professional Teeth Whitening', 'teeth-whitening', 'TEETH_WHITENING', 'In-home cosmetic teeth whitening for a brighter, more confident smile. Safe, effective, professional-grade results.', 60, 125, true, false, 25, NOW(), NOW());

-- Insert default availability (Tuesday - Saturday, 9 AM - 6 PM)
INSERT INTO "Availability" (id, "dayOfWeek", "startTime", "endTime", "isActive", "createdAt", "updatedAt") VALUES
('avail_' || gen_random_uuid()::text, 2, '09:00', '18:00', true, NOW(), NOW()),
('avail_' || gen_random_uuid()::text, 3, '09:00', '18:00', true, NOW(), NOW()),
('avail_' || gen_random_uuid()::text, 4, '09:00', '18:00', true, NOW(), NOW()),
('avail_' || gen_random_uuid()::text, 5, '09:00', '18:00', true, NOW(), NOW()),
('avail_' || gen_random_uuid()::text, 6, '09:00', '18:00', true, NOW(), NOW());

-- Insert default settings
INSERT INTO "Settings" (id, key, value, "updatedAt") VALUES
('settings_' || gen_random_uuid()::text, 'booking_settings', '{"bufferTime":30,"advanceBookingDays":60,"minAdvanceHours":24,"depositPercentage":50,"requireDeposit":true}', NOW());

-- Success message
SELECT 'Database seeded successfully with 25 services!' as message;
SELECT COUNT(*) as service_count FROM "Service";
