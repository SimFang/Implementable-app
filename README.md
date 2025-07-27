This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and integrated with Firebase for authentication, database, and storage functionality.

## Getting Started

### Environment Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your Firebase configuration values from your Firebase project settings.

### Installation

Install the dependencies:

```bash
npm install
```

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Firebase Features

This project includes the following Firebase integrations:

### Authentication
- Email/Password authentication
- Google Sign-in
- User session management

### Firestore Database
- Document creation and management
- Real-time updates
- Query capabilities

### Storage
- File upload and management
- Secure file access
- File listing and deletion

### Custom Hooks

The project includes several custom hooks for Firebase functionality:

- `useFirebaseAuth`: Handles authentication operations
- `useFirestore`: Manages Firestore database operations
- `useStorage`: Handles Firebase Storage operations

### Example Component

Check out the `FirebaseExample` component in `src/components/FirebaseExample.tsx` for a demonstration of Firebase features.

## Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### Firebase Resources
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com)

## Deployment

1. Deploy the Next.js app on [Vercel Platform](https://vercel.com/new).
2. Configure environment variables in your deployment platform.
3. Update Firebase project settings with your deployment URL.
4. Configure Firebase Security Rules for your production environment.
# web-app
