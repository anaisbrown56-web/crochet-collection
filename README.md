# Anaïs' Crochet Collection

A responsive portfolio site for showcasing crochet projects, with a private admin upload flow for the site owner.

**Stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS · Firebase (Auth, Firestore) · Cloudinary (images) · Vercel

## Features

- **Home** — Auto-playing project carousel, welcome blurb, CTA to Projects
- **About** — Bio page with placeholder photo/text (ready to customize)
- **Projects** — Filterable gallery (length, difficulty, type) with detail modal
- **Bags to Beds** — Styled "Coming Soon" placeholder
- **Upload** (admin only) — Multi-image upload with drag-and-drop; visible only when signed in as `anaisbrown56@gmail.com`

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Firebase setup (Auth + Firestore only)

1. Create a [Firebase project](https://console.firebase.google.com/)
2. Enable **Authentication** → Google Sign-In
3. Create a **Firestore** database
4. Copy your web app config into `.env.local` (see `.env.local.example`)

You do **not** need Firebase Storage — images go to Cloudinary.

### 3. Cloudinary setup (image storage)

1. Create a free [Cloudinary account](https://cloudinary.com/)
2. Go to **Settings → Upload → Upload presets**
3. Create an **unsigned** upload preset (e.g. `crochet-uploads`)
4. Set the folder to `crochet-projects` (optional, matches the app)
5. Add your cloud name and preset to `.env.local`

### 4. Deploy Firestore security rules

```bash
firebase login
firebase init  # select Firestore only, use existing firebase/firestore.rules
firebase deploy --only firestore:rules
```

**Firestore rules** — public read, admin-only write (`anaisbrown56@gmail.com`)

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Project ID |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | App ID |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Unsigned Cloudinary upload preset |

Add all of these in Vercel under **Project Settings → Environment Variables** before deploying.

## Deploy to Vercel

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add all environment variables listed above
4. Deploy — `next build` runs automatically

## How data is stored

| What | Where |
|---|---|
| Project metadata (title, description, filters, notes) | Firestore `projects` collection |
| Image files | Cloudinary (`crochet-projects/` folder) |
| Image URLs | Stored in Firestore as `imageUrls: string[]` |

## Project structure

```
src/
  app/              # Pages (App Router)
  components/       # Navbar, carousel, cards, filters, upload form, etc.
  context/          # Auth provider
  lib/              # Firebase, Cloudinary, Firestore helpers, types
firebase/
  firestore.rules   # Firestore security rules
```

## Length of project options

Upload and filter use these buckets (editable in `src/lib/constants.ts`):

- Quick (1–2 days)
- Few Days (3–7 days)
- Weeks+ (1+ weeks)
- Ongoing

## Admin access

Only `anaisbrown56@gmail.com` sees the Upload nav link and can write to Firestore. This is enforced in both the UI and Firestore security rules.
