# Never Alone - Development Guide

This document provides instructions for setting up and running the Never Alone application for development.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A Firebase project (for authentication and database)
- A Mapbox account (for the meeting finder map)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/never-alone.git
   cd never-alone
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file in the root directory with your Firebase and Mapbox configuration:
   ```
   # Firebase configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

   # Mapbox configuration (for meeting finder map)
   NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `pages/` - Next.js pages
  - `_app.tsx` - Main application wrapper
  - `_document.tsx` - Custom document component
  - `index.tsx` - Home page
  - `meetings/` - Meeting finder feature
  - `journal/` - Journal and mood tracker feature
  - `clean-time/` - Clean time tracker feature
  - `account/` - User authentication and settings
- `components/` - Reusable React components
  - `Layout.tsx` - Main layout component
  - `Header.tsx` - Navigation header
  - `Footer.tsx` - Page footer
- `lib/` - Utility functions and Firebase setup
  - `firebase.ts` - Firebase configuration
  - `auth.ts` - Authentication functions
  - `types.ts` - TypeScript type definitions
- `styles/` - CSS styles
  - `globals.css` - Global styles
- `public/` - Static assets

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check for code quality issues

## Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password provider
3. Create a Firestore database
4. Add your Firebase configuration to `.env.local`

## Mapbox Setup

1. Create a Mapbox account at [https://www.mapbox.com/](https://www.mapbox.com/)
2. Create an access token
3. Add your Mapbox token to `.env.local`

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).