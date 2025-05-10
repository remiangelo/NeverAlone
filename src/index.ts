// This file is not used in the Next.js app
// The entry point is pages/_app.tsx
console.log('Next.js app is running at http://localhost:3000')

// Redirect to Next.js app if this file is executed directly
if (typeof window !== 'undefined') {
  window.location.href = 'http://localhost:3000';
}
