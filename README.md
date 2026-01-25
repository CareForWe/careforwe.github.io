# CareForWe Frontend (Vite + React)

CareForWe is a React single-page app built with Vite and React Router. It includes a responsive navigation bar and a Sign In / Sign Up experience powered by Supabase Auth (email/password and Google OAuth).

## What’s in the app right now

- **Routes**
  - **`/`**: Home
  - **`/learn`**: Learn
  - **`/contact`**: Contact
  - **`/signin`**: Sign In / Sign Up
  - **`/testconnection`**: Test Connection
- **Authentication**
  - **Email/password sign up + sign in** via Supabase
  - **Google OAuth sign in** via Supabase
  - Basic auth state logging via `supabase.auth.onAuthStateChange(...)`
- **UI**
  - **Radix UI** (Themes + Form/Separator primitives)
  - **Responsive navbar** with burger menu for mobile

## Tech stack

- **React 18** + **Vite**
- **react-router-dom** (client-side routing)
- **@supabase/supabase-js** (auth)
- **@radix-ui/themes** + Radix primitives
- **Tailwind** (configured) + project CSS

## Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file in the repo root:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# Optional (only needed if you use the backend-based auth utilities/provider):
VITE_USER_SERVICE_URL=http://localhost:8080
```

Notes:
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are used by `src/supabaseClient.ts`.
- `VITE_USER_SERVICE_URL` is used by `src/components/util/checkAuth.ts` and `src/components/context/authContext.tsx` (the provider is currently not wired in `src/main.jsx`).

### 3) Run the dev server

```bash
npm run dev
```

### 4) Build + preview locally

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

This repo is set up to publish the Vite build output (`dist/`) to GitHub Pages using `gh-pages`.

```bash
npm run deploy
```

If the deployed site loads but routes 404 when you refresh deep links (e.g. `/learn`), you may need to configure SPA routing for GitHub Pages (common approaches: hash routing, or a redirect/404.html fallback).

## Project structure

- **`src/App.jsx`**: Route definitions + navbar + Supabase auth state logging
- **`src/main.jsx`**: React entrypoint + BrowserRouter + Radix Theme wrapper
- **`src/components/`**: Feature pages/components (`home`, `learn`, `contact`, `signin`, `navbar`)
- **`src/supabaseClient.ts`**: Supabase client initialization
- **`dist/`**: Production build output (generated)
