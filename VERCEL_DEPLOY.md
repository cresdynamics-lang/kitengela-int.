# Deploying Kitengela on Vercel

This repo is a **single app** (Next.js + API routes + Prisma). The project root is the app. No monorepo.

## Deploy

1. **Import** the repo in [Vercel](https://vercel.com): New Project → Import your Git repository.

2. **Root Directory:** Leave as **.** (repo root). Do not set a subfolder.

3. **Build:** Vercel will run `npm run build`, which runs `prisma generate && next build`. No custom build command needed.

4. **Environment variables** (Vercel → Project → Settings → Environment Variables):
   - **`DATABASE_URL`** (required) – Your Postgres URL (e.g. Supabase). Same value as in your local `.env`.
   - **`RESEND_API_KEY`** (optional) – For the contact form email.
   - Do **not** set `NEXT_PUBLIC_API_URL` – the site uses the built-in `/api` on the same domain.

5. **Redeploy** after adding or changing env vars.

## Local development

```bash
npm install
cp .env.example .env
# Edit .env and set DATABASE_URL (and optionally RESEND_API_KEY)
npm run dev
```

Open http://localhost:3000. The app talks to the database via `DATABASE_URL`; the API is inside the same app at `/api/*`.
