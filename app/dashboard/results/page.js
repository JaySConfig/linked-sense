
// // File: app/results/page.js (Should be correct already)
// import dynamic from 'next/dynamic';
// import { Suspense } from 'react';

// // Dynamically import the client logic with SSR disabled
// const DynamicResultsContent = dynamic(
//   () => import('./ResultsContentClient'), // Imports the client component file
//   { 
//     ssr: false, // Ensures it doesn't run during build/SSR
//     loading: () => <div className="flex justify-center items-center min-h-screen"><span className="loading loading-lg"></span></div> 
//   }
// );

// // Main export for the page route /results
// export default function Results() {
//   return (
//     // Suspense handles loading state for useSearchParams and dynamic import
//     <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><span className="loading loading-lg"></span></div>}>
//       <DynamicResultsContent />
//     </Suspense>
//   );
// }
// app/results/page.js
// import dynamic from 'next/dynamic';
// import { Suspense } from 'react';

// // Add all these flags to prevent static generation
// export const dynamic = 'force-dynamic';
// export const fetchCache = 'force-no-store';
// export const revalidate = 0;

// // Make sure you're using the ClientComponent that's properly structured
// const DynamicResultsContent = dynamic(
//   () => import('./ResultsContentClient'), 
//   { 
//     ssr: false,
//     loading: () => <div className="flex justify-center items-center min-h-screen">
//                      <span className="loading loading-lg"></span>
//                    </div> 
//   }
// );

// // Make this function as simple as possible
// export default function Results() {
//   return (
//     <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
//                           <span className="loading loading-lg"></span>
//                         </div>}>
//       <DynamicResultsContent />
//     </Suspense>
//   );
// }





// app/results/page.js
import { redirect } from 'next/navigation';

// This completely disables static generation
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

// Create a simple server component that immediately redirects to a client route
export default function Results() {
  // This will happen on the server side
  return (
    <ResultsWrapper />
  );
}

// This is just a simple wrapper to load the client component
function ResultsWrapper() {
  return (
    <div id="results-container">
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // We'll force client-side navigation to the results page
            window.location.href = "/results-client" + window.location.search;
          `,
        }}
      />
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-lg"></span>
      </div>
    </div>
  );
}