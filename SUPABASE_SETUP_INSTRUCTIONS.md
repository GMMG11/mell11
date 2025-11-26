# Supabase Setup Instructions

Follow these steps to set up your database and fix the 500 error.

## Step 1: Run the Schema SQL

1. **Open Supabase SQL Editor:**
   - Go to: https://supabase.com/dashboard/project/hvujayiaqhixrbwznlxy/sql/new

2. **Copy the contents of `supabase-setup.sql`**
   - Open the file `supabase-setup.sql` in this project
   - Copy ALL the SQL code

3. **Paste and Run:**
   - Paste it into the Supabase SQL Editor
   - Click the **"Run"** button (or press Ctrl+Enter)
   - You should see: "Database schema created successfully!"

## Step 2: Run the Seed Data SQL

1. **In the same SQL Editor** (or open a new query):
   - Copy ALL the contents of `supabase-seed.sql`
   - Paste it into the SQL Editor
   - Click **"Run"**
   - You should see: "Database seeded successfully with 25 services!"
   - It will show the count: `service_count: 25`

## Step 3: Create Admin User

The seed script creates a placeholder admin user, but you need to set the password properly. Run this SQL:

```sql
-- Update admin password (password: Admin123!)
UPDATE "AdminUser"
SET password = '$2a$10$YX5PzE.rE6YXPx7K8H0sxeBH6RhY3VpGn3qhBqYvQD0KQJKqHXxEm'
WHERE email = 'admin@mel11.com';
```

Click **"Run"**.

## Step 4: Verify Everything Worked

Run this SQL to verify:

```sql
-- Check services
SELECT COUNT(*) as total_services FROM "Service" WHERE "isActive" = true;

-- Check featured services
SELECT name, price FROM "Service" WHERE "isFeatured" = true;

-- Check admin user
SELECT email, name FROM "AdminUser";

-- Check availability
SELECT * FROM "Availability";
```

You should see:
- ✅ 25 total services
- ✅ 5 featured services (Full Foil, Fashion Colors, Signature Facial, Hydrafacial, Microneedling)
- ✅ 1 admin user (admin@mel11.com)
- ✅ 5 availability slots (Tuesday-Saturday)

## Step 5: Restart Your Dev Server

```bash
npm run dev
```

## Step 6: Test

1. **Visit http://localhost:3000/services**
   - You should now see all 25 services organized by category!

2. **Test Admin Login at http://localhost:3000/admin/login**
   - Email: `admin@mel11.com`
   - Password: `Admin123!`

## Troubleshooting

**If you see "relation already exists" errors:**
- This means the tables are already created
- Skip to Step 2 (seed data)

**If services still don't show:**
- Check the browser console for errors
- Make sure your .env file has the correct DATABASE_URL
- Restart your dev server

**If admin login doesn't work:**
- Re-run the password update SQL from Step 3
- Make sure you're using: `Admin123!` (capital A, exclamation mark)

---

## What Gets Created

### 25 Services:
- **Hair Services (14):** Haircuts, Wash, Style, Colors, Perms, Extensions, Tinsel, Updos
- **Skin & Facials (5):** House Call Facial, Hydrafacial, Dermabrasion, Chemical Peel, Microneedling
- **Brows & Lashes (3):** Brow Shaping, Lash Lift, Sugaring
- **Advanced (3):** Lip Blush, Laser Hair Removal, Teeth Whitening

### Pricing Range: $7 - $350
- Wash: $7
- Tinsel: $15
- Style: $25+
- Kids' Haircut: $27
- ... up to ...
- Lip Blush Tattoo: $350

All set! 🎉
