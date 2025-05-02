
// File: app/results/page.js (Should be correct already)
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the client logic with SSR disabled
const DynamicResultsContent = dynamic(
  () => import('./ResultsContentClient'), // Imports the client component file
  { 
    ssr: false, // Ensures it doesn't run during build/SSR
    loading: () => <div className="flex justify-center items-center min-h-screen"><span className="loading loading-lg"></span></div> 
  }
);

// Main export for the page route /results
export default function Results() {
  return (
    // Suspense handles loading state for useSearchParams and dynamic import
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><span className="loading loading-lg"></span></div>}>
      <DynamicResultsContent />
    </Suspense>
  );
}