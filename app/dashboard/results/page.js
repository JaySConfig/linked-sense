

// // "use client";

// // import { useSearchParams } from 'next/navigation';
// // import { useEffect, useState, Suspense } from 'react';
// // import ReactMarkdown from 'react-markdown';
// // import remarkGfm from 'remark-gfm';

// // // Create a client component that uses useSearchParams
// // function ResultsContent() {
// //   const searchParams = useSearchParams();
// //   const id = searchParams.get('id');
// //   const [submission, setSubmission] = useState(null);
// //   const [strategy, setStrategy] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);
  
// //   useEffect(() => {
// //     if (!id) return;
// //     try {
// //       // Get submission from localStorage
// //       const savedSubmission = localStorage.getItem(`submission_${id}`);
// //       if (!savedSubmission) {
// //         setError('Submission not found. It may have been deleted or expired.');
// //         return;
// //       }
// //       const parsedSubmission = JSON.parse(savedSubmission);
// //       setSubmission(parsedSubmission);
// //       // Generate strategy
// //       generateStrategy(parsedSubmission);
// //     } catch (err) {
// //       console.error('Error loading submission:', err);
// //       setError('Failed to load your submission. Please try again.');
// //     }
// //   }, [id]);
  
// //   const generateStrategy = async (submissionData) => {
// //     setIsLoading(true);
// //     try {
// //       const response = await fetch('/api/generate-strategy', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(submissionData),
// //       });
// //       if (!response.ok) {
// //         throw new Error('Failed to generate strategy');
// //       }
// //       const data = await response.json();
// //       setStrategy(data.strategy);
// //     } catch (err) {
// //       console.error('Error generating strategy:', err);
// //       setError('Failed to generate your LinkedIn strategy. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };
  
// //   if (!id) {
// //     return <div>Loading...</div>;
// //   }
  
// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-white p-8">
// //         <div className="max-w-3xl mx-auto">
// //           <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
// //           <p>{error}</p>
// //           <a href="/" className="px-4 py-2 bg-emerald-600 text-white rounded-md mt-4 inline-block">
// //             Start Over
// //           </a>
// //         </div>
// //       </div>
// //     );
// //   }
  
// //   return (
// //     <div className="min-h-screen bg-white p-8">
// //       <div className="max-w-4xl mx-auto">
// //         <h1 className="text-3xl font-bold mb-8 text-gray-900">Your LinkedIn Strategy</h1>
// //         {isLoading ? (
// //           <div className="flex flex-col items-center justify-center p-12">
// //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4 text-gray-700"></div>
// //             <p>Generating your personalized LinkedIn strategy...</p>
// //             <p className="text-sm text-gray-500 mt-2">This may take up to a minute</p>
// //           </div>
// //         ) : strategy ? (
// //           <div className="prose prose-lg space-y-6 prose-emerald max-w-none text-gray-800">
// //             <ReactMarkdown 
// //               remarkPlugins={[remarkGfm]}
// //               components={{
// //                 // Add custom styling for headings and paragraphs
// //                 h2: ({node, ...props}) => (
// //                   <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900" {...props} />
// //                 ),
// //                 h3: ({node, ...props}) => (
// //                   <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800" {...props} />
// //                 ),
// //                 p: ({node, ...props}) => (
// //                   <p className="my-6 leading-7" {...props} />
// //                 ),
// //                 // Add more spacing to content blocks
// //                 strong: ({node, ...props}) => (
// //                   <strong className="font-bold text-gray-900 block mt-6" {...props} />
// //                 ),
// //                 // Add table-specific styling
// //                 table: ({node, ...props}) => (
// //                   <div className="my-10 overflow-x-auto">
// //                     <table className="min-w-full border-collapse border border-gray-300" {...props} />
// //                   </div>
// //                 ),
// //                 thead: ({node, ...props}) => (
// //                   <thead className="bg-gray-50" {...props} />
// //                 ),
// //                 tbody: ({node, ...props}) => (
// //                   <tbody className="divide-y divide-gray-200" {...props} />
// //                 ),
// //                 tr: ({node, ...props}) => (
// //                   <tr className="hover:bg-gray-50" {...props} />
// //                 ),
// //                 td: ({node, ...props}) => (
// //                   <td className="px-6 py-4 border border-gray-200 text-sm" {...props} />
// //                 ),
// //                 th: ({node, ...props}) => (
// //                   <th className="px-6 py-4 border border-gray-200 text-left text-sm font-medium bg-gray-100" {...props} />
// //                 )
// //               }}
// //             >
// //               {strategy}
// //             </ReactMarkdown>
// //           </div>
// //         ) : submission ? (
// //           <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
// //             <h2 className="text-xl font-bold text-green-800 mb-4">
// //               Loading Your Strategy...
// //             </h2>
// //             <p>
// //               We&apos;re preparing your personalized LinkedIn strategy based on your answers.
// //             </p>
// //           </div>
// //         ) : (
// //           <p>Loading your submission data...</p>
// //         )}
// //         <div className="mt-8">
// //           <a href="/linkedin-strategy" className="px-4 py-2 bg-emerald-600 text-white rounded-md inline-block justify-center">
// //             Create New Strategy
// //           </a>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Main component with Suspense boundary
// // export default function Results() {
// //   return (
// //     <Suspense fallback={<div>Loading results...</div>}>
// //       <ResultsContent />
// //     </Suspense>
// //   );
// // }

// "use client";

// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState, Suspense } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// function ResultsContent() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get('id');
//   const [submission, setSubmission] = useState(null);
//   // Split strategy into two parts
//   const [foundationStrategy, setFoundationStrategy] = useState(null);
//   const [calendarStrategy, setCalendarStrategy] = useState(null);
//   // Separate loading states for each part
//   const [foundationLoading, setFoundationLoading] = useState(false);
//   const [calendarLoading, setCalendarLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     if (!id) return;
//     try {
//       // Get submission from localStorage
//       const savedSubmission = localStorage.getItem(`submission_${id}`);
//       if (!savedSubmission) {
//         setError('Submission not found. It may have been deleted or expired.');
//         return;
//       }
//       const parsedSubmission = JSON.parse(savedSubmission);
//       setSubmission(parsedSubmission);
//       // Generate strategy foundation first
//       generateFoundation(parsedSubmission);
//     } catch (err) {
//       console.error('Error loading submission:', err);
//       setError('Failed to load your submission. Please try again.');
//     }
//   }, [id]);
  
//   const generateFoundation = async (submissionData) => {
//     setFoundationLoading(true);
//     try {
//       const response = await fetch('/api/generate-foundation', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(submissionData),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to generate strategy foundation');
//       }
//       const data = await response.json();
//       setFoundationStrategy(data.foundation);
      
//       // Once foundation is complete, generate calendar
//       generateCalendar(submissionData, data.foundation);
//     } catch (err) {
//       console.error('Error generating foundation:', err);
//       setError('Failed to generate your LinkedIn strategy foundation. Please try again.');
//     } finally {
//       setFoundationLoading(false);
//     }
//   };
  
//   const generateCalendar = async (submissionData, foundation) => {
//     setCalendarLoading(true);
//     try {
//       const response = await fetch('/api/generate-calendar', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...submissionData,
//           foundation
//         }),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to generate content calendar');
//       }
//       const data = await response.json();
//       setCalendarStrategy(data.calendar);
//     } catch (err) {
//       console.error('Error generating calendar:', err);
//       setError('Failed to generate your content calendar. Please try again.');
//     } finally {
//       setCalendarLoading(false);
//     }
//   };
  
//   // Add retry functionality for both parts
//   const retryFoundation = () => {
//     if (!submission) return;
//     setError(null);
//     generateFoundation(submission);
//   };
  
//   const retryCalendar = () => {
//     if (!submission || !foundationStrategy) return;
//     setError(null);
//     generateCalendar(submission, foundationStrategy);
//   };
  
//   // Function to download complete strategy as Markdown
//   const downloadStrategy = () => {
//     if (!foundationStrategy && !calendarStrategy) return;
    
//     const content = `# Your LinkedIn Strategy\n\n${foundationStrategy || ''}\n\n${calendarStrategy || ''}`;
    
//     const blob = new Blob([content], { type: 'text/markdown' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'linkedin-strategy.md';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };
  
//   if (!id) {
//     return <div>Loading...</div>;
//   }
  
//   if (error) {
//     return (
//       <div className="min-h-screen bg-white p-8">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
//           <p>{error}</p>
          
//           {/* Add retry buttons to recover from errors */}
//           <div className="mt-4 flex gap-4">
//             <button 
//               onClick={retryFoundation}
//               className="px-4 py-2 bg-emerald-600 text-white rounded-md"
//             >
//               Retry Strategy
//             </button>
//             <a href="/linkedin-strategy" className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md">
//               Start Over
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   // Custom component wrapper for markdown content
//   const MarkdownContent = ({ content }) => (
//     <div className="prose prose-lg space-y-6 prose-emerald max-w-none text-gray-800">
//       <ReactMarkdown 
//         remarkPlugins={[remarkGfm]}
//         components={{
//           h2: ({node, ...props}) => (
//             <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900" {...props} />
//           ),
//           h3: ({node, ...props}) => (
//             <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800" {...props} />
//           ),
//           p: ({node, ...props}) => (
//             <p className="my-6 leading-7" {...props} />
//           ),
//           strong: ({node, ...props}) => (
//             <strong className="font-bold text-gray-900 block mt-6" {...props} />
//           ),
//           table: ({node, ...props}) => (
//             <div className="my-10 overflow-x-auto">
//               <table className="min-w-full border-collapse border border-gray-300" {...props} />
//             </div>
//           ),
//           thead: ({node, ...props}) => (
//             <thead className="bg-gray-50" {...props} />
//           ),
//           tbody: ({node, ...props}) => (
//             <tbody className="divide-y divide-gray-200" {...props} />
//           ),
//           tr: ({node, ...props}) => (
//             <tr className="hover:bg-gray-50" {...props} />
//           ),
//           td: ({node, ...props}) => (
//             <td className="px-6 py-4 border border-gray-200 text-sm" {...props} />
//           ),
//           th: ({node, ...props}) => (
//             <th className="px-6 py-4 border border-gray-200 text-left text-sm font-medium bg-gray-100" {...props} />
//           )
//         }}
//       >
//         {content}
//       </ReactMarkdown>
//     </div>
//   );
  
//   return (
//     <div className="min-h-screen bg-white p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-gray-900">Your LinkedIn Strategy</h1>
        
//         {/* Strategic Foundation Section */}
//         <div className="mb-12">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">Strategic Foundation</h2>
          
//           {foundationLoading ? (
//             <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
//               <p>Developing your strategic foundation...</p>
//               <p className="text-sm text-gray-500 mt-2">This may take 15-30 seconds</p>
//             </div>
//           ) : foundationStrategy ? (
//             <MarkdownContent content={foundationStrategy} />
//           ) : submission ? (
//             <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
//               <p>Preparing your strategy foundation...</p>
//             </div>
//           ) : (
//             <p>Loading your submission data...</p>
//           )}
          
//           {/* Retry button for foundation */}
//           {!foundationLoading && foundationStrategy && (
//             <button 
//               onClick={retryFoundation}
//               className="mt-4 px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50"
//             >
//               Regenerate Foundation
//             </button>
//           )}
//         </div>
        
//         {/* Content Calendar Section */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">Content Calendar</h2>
          
//           {calendarLoading ? (
//             <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
//               <p>Creating your content calendar...</p>
//               <p className="text-sm text-gray-500 mt-2">This may take 20-40 seconds</p>
//             </div>
//           ) : calendarStrategy ? (
//             <MarkdownContent content={calendarStrategy} />
//           ) : foundationStrategy ? (
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
//               <p>Foundation complete! Now preparing your content calendar...</p>
//             </div>
//           ) : (
//             <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
//               <p className="text-gray-500 italic">
//                 Waiting for strategic foundation to complete...
//               </p>
//             </div>
//           )}
          
//           {/* Retry button for calendar */}
//           {!calendarLoading && foundationStrategy && calendarStrategy && (
//             <button 
//               onClick={retryCalendar}
//               className="mt-4 px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50"
//             >
//               Regenerate Calendar
//             </button>
//           )}
//         </div>
        
//         {/* Action buttons */}
//         <div className="mt-12 flex flex-wrap gap-4">
//           {/* {foundationStrategy && calendarStrategy && (
//             <button
//               onClick={downloadStrategy}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Download Strategy
//             </button>
//           )} */}
          
//           <a href="/linkedin-strategy" className="px-4 py-2 bg-emerald-600 text-white rounded-md inline-block hover:bg-emerald-700">
//             Create New Strategy
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Main component with Suspense boundary
// export default function Results() {
//   return (
//     <Suspense fallback={<div>Loading results...</div>}>
//       <ResultsContent />
//     </Suspense>
//   );
// }

//////////////////////////

// "use client";

// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// export default function Results() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get('id');
//   const [submission, setSubmission] = useState(null);
//   const [foundationStrategy, setFoundationStrategy] = useState(null);
//   const [calendarStrategy, setCalendarStrategy] = useState(null);
//   const [foundationLoading, setFoundationLoading] = useState(false);
//   const [calendarLoading, setCalendarLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     if (!id) return;
//     try {
//       // Get submission from localStorage
//       const savedSubmission = localStorage.getItem(`submission_${id}`);
//       if (!savedSubmission) {
//         setError('Submission not found. It may have been deleted or expired.');
//         return;
//       }
//       const parsedSubmission = JSON.parse(savedSubmission);
//       setSubmission(parsedSubmission);
//       // Generate strategy foundation first
//       generateFoundation(parsedSubmission);
//     } catch (err) {
//       console.error('Error loading submission:', err);
//       setError('Failed to load your submission. Please try again.');
//     }
//   }, [id]);
  
//   const generateFoundation = async (submissionData) => {
//     setFoundationLoading(true);
//     try {
//       const response = await fetch('/api/generate-foundation', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(submissionData),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to generate strategy foundation');
//       }
//       const data = await response.json();
//       setFoundationStrategy(data.foundation);
      
//       // Once foundation is complete, generate calendar
//       generateCalendar(submissionData, data.foundation);
//     } catch (err) {
//       console.error('Error generating foundation:', err);
//       setError('Failed to generate your LinkedIn strategy foundation. Please try again.');
//     } finally {
//       setFoundationLoading(false);
//     }
//   };
  
//   const generateCalendar = async (submissionData, foundation) => {
//     setCalendarLoading(true);
//     try {
//       const response = await fetch('/api/generate-calendar', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...submissionData,
//           foundation
//         }),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to generate content calendar');
//       }
//       const data = await response.json();
//       setCalendarStrategy(data.calendar);
//     } catch (err) {
//       console.error('Error generating calendar:', err);
//       setError('Failed to generate your content calendar. Please try again.');
//     } finally {
//       setCalendarLoading(false);
//     }
//   };
  
//   // The retry functions
//   const retryFoundation = () => {
//     if (!submission) return;
//     setError(null);
//     generateFoundation(submission);
//   };
  
//   const retryCalendar = () => {
//     if (!submission || !foundationStrategy) return;
//     setError(null);
//     generateCalendar(submission, foundationStrategy);
//   };
  
//   // Custom component for markdown content
//   const MarkdownContent = ({ content }) => (
//     <div className="prose prose-lg space-y-6 prose-emerald max-w-none text-gray-800">
//       <ReactMarkdown 
//         remarkPlugins={[remarkGfm]}
//         components={{
//           h2: ({node, ...props}) => (
//             <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900" {...props} />
//           ),
//           h3: ({node, ...props}) => (
//             <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800" {...props} />
//           ),
//           p: ({node, ...props}) => (
//             <p className="my-6 leading-7" {...props} />
//           ),
//           strong: ({node, ...props}) => (
//             <strong className="font-bold text-gray-900 block mt-6" {...props} />
//           ),
//           table: ({node, ...props}) => (
//             <div className="my-10 overflow-x-auto">
//               <table className="min-w-full border-collapse border border-gray-300" {...props} />
//             </div>
//           ),
//           thead: ({node, ...props}) => (
//             <thead className="bg-gray-50" {...props} />
//           ),
//           tbody: ({node, ...props}) => (
//             <tbody className="divide-y divide-gray-200" {...props} />
//           ),
//           tr: ({node, ...props}) => (
//             <tr className="hover:bg-gray-50" {...props} />
//           ),
//           td: ({node, ...props}) => (
//             <td className="px-6 py-4 border border-gray-200 text-sm" {...props} />
//           ),
//           th: ({node, ...props}) => (
//             <th className="px-6 py-4 border border-gray-200 text-left text-sm font-medium bg-gray-100" {...props} />
//           )
//         }}
//       >
//         {content}
//       </ReactMarkdown>
//     </div>
//   );
  
//   // Loading state
//   if (!id) {
//     return <div>Loading...</div>;
//   }
  
//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-white p-8">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
//           <p>{error}</p>
          
//           <div className="mt-4 flex gap-4">
//             <button 
//               onClick={retryFoundation}
//               className="px-4 py-2 bg-emerald-600 text-white rounded-md"
//             >
//               Retry Strategy
//             </button>
//             <a href="/linkedin-strategy" className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md">
//               Start Over
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   // Main render
//   return (
//     <div className="min-h-screen bg-white p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-gray-900">Your LinkedIn Strategy</h1>
        
//         {/* Strategic Foundation Section */}
//         <div className="mb-12">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">Strategic Foundation</h2>
          
//           {foundationLoading ? (
//             <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
//               <p>Developing your strategic foundation...</p>
//               <p className="text-sm text-gray-500 mt-2">This may take 15-30 seconds</p>
//             </div>
//           ) : foundationStrategy ? (
//             <MarkdownContent content={foundationStrategy} />
//           ) : submission ? (
//             <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
//               <p>Preparing your strategy foundation...</p>
//             </div>
//           ) : (
//             <p>Loading your submission data...</p>
//           )}
          
//           {/* Retry button for foundation */}
//           {!foundationLoading && foundationStrategy && (
//             <button 
//               onClick={retryFoundation}
//               className="mt-4 px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50"
//             >
//               Regenerate Foundation
//             </button>
//           )}
//         </div>
        
//         {/* Content Calendar Section */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">Content Calendar</h2>
          
//           {calendarLoading ? (
//             <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
//               <p>Creating your content calendar...</p>
//               <p className="text-sm text-gray-500 mt-2">This may take 20-40 seconds</p>
//             </div>
//           ) : calendarStrategy ? (
//             <MarkdownContent content={calendarStrategy} />
//           ) : foundationStrategy ? (
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
//               <p>Foundation complete! Now preparing your content calendar...</p>
//             </div>
//           ) : (
//             <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
//               <p className="text-gray-500 italic">
//                 Waiting for strategic foundation to complete...
//               </p>
//             </div>
//           )}
          
//           {/* Retry button for calendar */}
//           {!calendarLoading && foundationStrategy && calendarStrategy && (
//             <button 
//               onClick={retryCalendar}
//               className="mt-4 px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50"
//             >
//               Regenerate Calendar
//             </button>
//           )}
//         </div>
        
//         {/* Action buttons */}
//         <div className="mt-12 flex flex-wrap gap-4">
//           <a href="/linkedin-strategy" className="px-4 py-2 bg-emerald-600 text-white rounded-md inline-block hover:bg-emerald-700">
//             Create New Strategy
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }


/////
// "use client";

// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import PostGenerator from '@/components/PostGenerator'; // Import the new component

// export default function Results() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get('id');
//   const [submission, setSubmission] = useState(null);
//   const [foundationStrategy, setFoundationStrategy] = useState(null);
//   const [calendarStrategy, setCalendarStrategy] = useState(null);
//   const [foundationLoading, setFoundationLoading] = useState(false);
//   const [calendarLoading, setCalendarLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showPostGenerator, setShowPostGenerator] = useState(false); // Add state for toggling the PostGenerator
  
//   // ... (keep all the existing code)
  
//   // Add this near the end of your component, just before the closing </div>:
  
//   return (
//     <div className="min-h-screen bg-white p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-gray-900">Your LinkedIn Strategy</h1>
        
//         {/* Strategic Foundation Section */}
//         <div className="mb-12">
//           {/* ... existing foundation section ... */}
//         </div>
        
//         {/* Content Calendar Section */}
//         <div className="mb-8">
//           {/* ... existing calendar section ... */}
//         </div>
        
//         {/* Post Generator Section */}
//         {foundationStrategy && calendarStrategy && (
//           <div className="mb-12">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-semibold text-gray-800">Create LinkedIn Post</h2>
//               <button 
//                 onClick={() => setShowPostGenerator(!showPostGenerator)}
//                 className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-md hover:bg-emerald-200"
//               >
//                 {showPostGenerator ? "Hide Post Generator" : "Show Post Generator"}
//               </button>
//             </div>
            
//             {showPostGenerator && (
//               <PostGenerator 
//                 submission={submission} 
//                 uniquePerspective={submission?.answers?.uniquePerspective}
//                 userVoice={submission?.answers?.userVoice}
//               />
//             )}
//           </div>
//         )}
        
//         {/* Action buttons */}
//         <div className="mt-12 flex flex-wrap gap-4">
//           <a href="/linkedin-strategy" className="px-4 py-2 bg-emerald-600 text-white rounded-md inline-block hover:bg-emerald-700">
//             Create New Strategy
//           </a>
//         </div>
//       </div>
//     </div>
//   );


///// with generate post

"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ResultsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [submission, setSubmission] = useState(null);
  // Split strategy into two parts
  const [foundationStrategy, setFoundationStrategy] = useState(null);
  const [calendarStrategy, setCalendarStrategy] = useState(null);
  // Separate loading states for each part
  const [foundationLoading, setFoundationLoading] = useState(false);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Post generation states
  const [generatingPostId, setGeneratingPostId] = useState(null);
  const [generatedPost, setGeneratedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  
  useEffect(() => {
    if (!id) return;
    try {
      // Get submission from localStorage
      const savedSubmission = localStorage.getItem(`submission_${id}`);
      if (!savedSubmission) {
        setError('Submission not found. It may have been deleted or expired.');
        return;
      }
      const parsedSubmission = JSON.parse(savedSubmission);
      setSubmission(parsedSubmission);
      // Generate strategy foundation first
      generateFoundation(parsedSubmission);
    } catch (err) {
      console.error('Error loading submission:', err);
      setError('Failed to load your submission. Please try again.');
    }
  }, [id]);
  
  const generateFoundation = async (submissionData) => {
    setFoundationLoading(true);
    try {
      const response = await fetch('/api/generate-foundation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      if (!response.ok) {
        throw new Error('Failed to generate strategy foundation');
      }
      const data = await response.json();
      setFoundationStrategy(data.foundation);
      
      // Once foundation is complete, generate calendar
      generateCalendar(submissionData, data.foundation);
    } catch (err) {
      console.error('Error generating foundation:', err);
      setError('Failed to generate your LinkedIn strategy foundation. Please try again.');
    } finally {
      setFoundationLoading(false);
    }
  };
  
  const generateCalendar = async (submissionData, foundation) => {
    setCalendarLoading(true);
    try {
      const response = await fetch('/api/generate-calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submissionData,
          foundation
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate content calendar');
      }
      const data = await response.json();
      setCalendarStrategy(data.calendar);
    } catch (err) {
      console.error('Error generating calendar:', err);
      setError('Failed to generate your content calendar. Please try again.');
    } finally {
      setCalendarLoading(false);
    }
  };
  
  const generatePost = async (pillar, topic, approach, contentType, index) => {
    try {
      setGeneratingPostId(index);
      
      const response = await fetch('/api/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pillar, topic, approach, contentType }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate post');
      }
      
      const data = await response.json();
      setGeneratedPost(data.post);
      setShowPostModal(true);
    } catch (error) {
      console.error('Error generating post:', error);
      alert('Failed to generate post. Please try again.');
    } finally {
      setGeneratingPostId(null);
    }
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("Post copied to clipboard!");
      })
      .catch((err) => {
        console.error('Error copying text: ', err);
        alert("Failed to copy post");
      });
  };

  // Add this function to your component
  const extractTableData = (markdownContent) => {
    try {
      // Look for content calendar section (assuming it starts with a heading)
      const calendarSection = markdownContent.split('## FOUR-WEEK CONTENT CALENDAR')[1];
      if (!calendarSection) return null;
      
      // Extract table rows (each row starts with '|')
      const tableRows = calendarSection.split('\n')
        .filter(line => line.trim().startsWith('|'))
        .map(line => line.split('|')
          .filter(cell => cell.trim()) // Remove empty cells
          .map(cell => cell.trim()) // Trim whitespace
        );
      
      // First row is the header
      const headers = tableRows[0];
      
      // Rest are data rows
      const rows = tableRows.slice(1).map(row => ({
        weekDay: row[0] || '',
        pillar: row[1] || '',
        topic: row[2] || '',
        approach: row[3] || '',
        contentType: row[4] || ''
      }));
      
      return { headers, rows };
    } catch (error) {
      console.error("Error parsing calendar table:", error);
      return null;
    }
  };
  
  // Add retry functionality for both parts
  const retryFoundation = () => {
    if (!submission) return;
    setError(null);
    generateFoundation(submission);
  };
  
  const retryCalendar = () => {
    if (!submission || !foundationStrategy) return;
    setError(null);
    generateCalendar(submission, foundationStrategy);
  };

  
  if (!id) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p>{error}</p>
          
          {/* Add retry buttons to recover from errors */}
          <div className="mt-4 flex gap-4">
            <button 
              onClick={retryFoundation}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md"
            >
              Retry Strategy
            </button>
            <a href="/linkedin-strategy" className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md">
              Start Over
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  // Custom component wrapper for markdown content
  const MarkdownContent = ({ content }) => (
    <div className="prose prose-lg space-y-6 prose-emerald max-w-none text-gray-800">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({node, ...props}) => (
            <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900" {...props} />
          ),
          h3: ({node, ...props}) => (
            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800" {...props} />
          ),
          p: ({node, ...props}) => (
            <p className="my-6 leading-7" {...props} />
          ),
          strong: ({node, ...props}) => (
            <strong className="font-bold text-gray-900 block mt-6" {...props} />
          ),
          table: ({node, ...props}) => (
            <div className="my-10 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300" {...props} />
            </div>
          ),
          thead: ({node, ...props}) => (
            <thead className="bg-gray-50" {...props} />
          ),
          tbody: ({node, ...props}) => (
            <tbody className="divide-y divide-gray-200" {...props} />
          ),
          tr: ({node, ...props}) => (
            <tr className="hover:bg-gray-50" {...props} />
          ),
          td: ({node, ...props}) => (
            <td className="px-6 py-4 border border-gray-200 text-sm" {...props} />
          ),
          th: ({node, ...props}) => (
            <th className="px-6 py-4 border border-gray-200 text-left text-sm font-medium bg-gray-100" {...props} />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Your LinkedIn Strategy</h1>
        
        {/* Strategic Foundation Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Strategic Foundation</h2>
          
          {foundationLoading ? (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
              <p>Developing your strategic foundation...</p>
              <p className="text-sm text-gray-500 mt-2">This may take 15-30 seconds</p>
            </div>
          ) : foundationStrategy ? (
            <MarkdownContent content={foundationStrategy} />
          ) : submission ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <p>Preparing your strategy foundation...</p>
            </div>
          ) : (
            <p>Loading your submission data...</p>
          )}
          
          {/* Retry button for foundation */}
          {!foundationLoading && foundationStrategy && (
            <button 
              onClick={retryFoundation}
              className="mt-4 px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50"
            >
              Regenerate Foundation
            </button>
          )}
        </div>
        
        {/* Content Calendar Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Content Calendar</h2>
          {calendarLoading ? (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
              <p>Creating your content calendar...</p>
              <p className="text-sm text-gray-500 mt-2">This may take 20-40 seconds</p>
            </div>
          ) : calendarStrategy ? (
            <>
              {/* Keep the original markdown content */}
              <MarkdownContent content={calendarStrategy} />
              
              {/* Add the interactive table below - this is what you need to add */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Generate Individual Posts</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 border border-gray-200 text-left text-sm font-medium">Week - Day</th>
                        <th className="px-6 py-4 border border-gray-200 text-left text-sm font-medium">Pillar</th>
                        <th className="px-6 py-4 border border-gray-200 text-left text-sm font-medium">Topic</th>
                        <th className="px-6 py-4 border border-gray-200 text-left text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {extractTableData(calendarStrategy)?.rows.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 border border-gray-200 text-sm">{row.weekDay}</td>
                          <td className="px-6 py-4 border border-gray-200 text-sm">{row.pillar}</td>
                          <td className="px-6 py-4 border border-gray-200 text-sm">{row.topic}</td>
                          <td className="px-6 py-4 border border-gray-200 text-sm">
                            <button 
                              onClick={() => generatePost(row.pillar, row.topic, row.approach, row.contentType, index)}
                              className="px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700 transition-colors"
                              disabled={generatingPostId === index}
                            >
                              {generatingPostId === index ? 'Generating...' : 'Generate Post'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : foundationStrategy ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p>Foundation complete! Now preparing your content calendar...</p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <p className="text-gray-500 italic">
                Waiting for strategic foundation to complete...
              </p>
            </div>
          )}
          
          {/* Retry button for calendar */}
          {!calendarLoading && foundationStrategy && calendarStrategy && (
            <button
              onClick={retryCalendar}
              className="mt-4 px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50"
            >
              Regenerate Calendar
            </button>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="mt-12 flex flex-wrap gap-4">
          <a href="/linkedin-strategy" className="px-4 py-2 bg-emerald-600 text-white rounded-md inline-block hover:bg-emerald-700">
            Create New Strategy
          </a>
        </div>
        
        {/* Post Modal */}
        {showPostModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Generated Post</h2>
              <div className="prose prose-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {generatedPost}
                </ReactMarkdown>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button 
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  Close
                </button>
                <button 
                  onClick={() => copyToClipboard(generatedPost)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function Results() {
  return (
    <Suspense fallback={<div>Loading results...</div>}>
      <ResultsContent />
    </Suspense>
  );
}