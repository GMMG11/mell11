# Database Setup Guide

The 500 error you're seeing is because the database hasn't been set up yet. Here's how to fix it:

## Option 1: Quick Setup with Free PostgreSQL (Recommended)

### Using Supabase (Free Tier)

1. **Create a Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for free
   - Create a new project

2. **Get Your Database URL**
   - In your Supabase project, go to Settings → Database
   - Find the "Connection string" section
   - Copy the "URI" connection string (should look like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`)

3. **Update Your .env File**
   ```bash
   # Replace the DATABASE_URL in .env with your Supabase URL
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres"
   ```

4. **Initialize the Database**
   ```bash
   # Install dependencies if you haven't
   npm install

   # Push the database schema
   npm run db:push

   # Seed the database with services
   npm run db:seed
   ```

5. **Restart Your Dev Server**
   ```bash
   npm run dev
   ```

Your services page should now work!

---

## Option 2: Using Neon (Another Free Option)

1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the connection string
4. Update DATABASE_URL in .env
5. Run `npm run db:push` and `npm run db:seed`

---

## Option 3: Local PostgreSQL (Advanced)

If you prefer to run PostgreSQL locally:

### macOS (using Homebrew)
```bash
brew install postgresql@14
brew services start postgresql@14
createdb mel11
```

### Windows
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Install and note your password
3. Use pgAdmin to create a database named "mel11"

### Update .env
```bash
DATABASE_URL="postgresql://postgres:your-password@localhost:5432/mel11"
```

### Initialize
```bash
npm run db:push
npm run db:seed
```

---

## Verify Everything Works

After setting up the database, you should be able to:

1. Visit `/services` - See all 25 services
2. Visit `/admin/login` - Login with credentials from .env
3. Create bookings through the booking flow

---

## Common Issues

**"relation does not exist" error**
- Run: `npm run db:push` to create the tables

**"No services showing"**
- Run: `npm run db:seed` to add the 25 services

**"Can't connect to database"**
- Check your DATABASE_URL is correct
- Make sure the database exists
- For Supabase/Neon, check your internet connection

---

## Development vs Production

- **Development**: Use Supabase/Neon free tier (easiest)
- **Production**: When deploying to Vercel, use their PostgreSQL or continue with Supabase

The .env file is already created with placeholder values. Just update the DATABASE_URL!
