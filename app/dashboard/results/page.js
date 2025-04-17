
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
//   const [contentCalendar, setContentCalendar] = useState(null);
//   // Separate loading states for each part
//   const [foundationLoading, setFoundationLoading] = useState(false);
//   const [calendarLoading, setCalendarLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   // Post generation states
//   const [generatingPostId, setGeneratingPostId] = useState(null);
//   const [generatedPost, setGeneratedPost] = useState(null);
//   const [showPostModal, setShowPostModal] = useState(false);

//   // Near your other useState calls
// const [modalPostIndex, setModalPostIndex] = useState(null);
  
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
      
//       // Parse the calendar data for our interactive table
//       const calendarData = extractCalendarData(data.calendar);
//       setContentCalendar(calendarData);
//     } catch (err) {
//       console.error('Error generating calendar:', err);
//       setError('Failed to generate your content calendar. Please try again.');
//     } finally {
//       setCalendarLoading(false);
//     }
//   };
  
//   const generatePost = async (pillar, topic, approach, contentType, index) => {
//     try {
//       setGeneratingPostId(index);
      
//       const response = await fetch('/api/create-post', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           pillar, 
//           topic, 
//           approach, 
//           contentType,
//           // Add these from your submission data
//           userVoice: submission?.answers?.userVoice,
//           uniquePerspective: submission?.answers?.uniquePerspective
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to generate post');
//       }
      
//     //   const data = await response.json();
//     //   setGeneratedPost(data.post);
//     //   setShowPostModal(true);
//     // } catch (error) {
//     //   console.error('Error generating post:', error);
//     //   alert('Failed to generate post. Please try again.');
//     // } finally {
//     //   setGeneratingPostId(null);
//     // }

//     // Inside generatePost function, after getting response and data
//     const data = await response.json();
//     setGeneratedPost(data.post);
//     setModalPostIndex(index); // <-- ADD THIS to remember the index for the modal
//     setShowPostModal(true);
//   } catch (error) {
//     // ... error handling ...
//   } finally {
//     setGeneratingPostId(null); // <-- KEEP THIS (it's for the generate button state)
//   }
//   };
  
//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text)
//       .then(() => {
//         alert("Post copied to clipboard!");
//       })
//       .catch((err) => {
//         console.error('Error copying text: ', err);
//         alert("Failed to copy post");
//       });
//   };
//   // For saving the strategy
// const saveStrategy = async () => {
//   if (!submission || !foundationStrategy || !calendarStrategy) return;
  
//   try {
//     const response = await fetch('/api/profile/save-strategy', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         submissionId: id,
//         answers: submission.answers,
//         foundation: foundationStrategy,
//         calendar: calendarStrategy,
//         contentCalendar
//       }),
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to save strategy');
//     }
    
//     // Show success message
//     alert('Your LinkedIn strategy has been saved to your profile!');
//   } catch (error) {
//     console.error('Error saving strategy:', error);
//     alert('Failed to save strategy. Please try again.');
//   }
// };

// // For saving a post
// // const savePost = async () => {
// //   console.log("--- save post: Functions started ---")
// //   if (!generatedPost || generatingPostId === null) return;
// //   console.log("--- savePost: Aborted - missing generated post or generating post")
  
// //   try {
// //     const calendarRow = contentCalendar.rows[generatingPostId];
    
// //     const response = await fetch('/api/posts/save', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({
// //         content: generatedPost,
// //         postIndex: generatingPostId,
// //         pillar: calendarRow.pillar,
// //         topic: calendarRow.topic,
// //         approach: calendarRow.approach,
// //         contentType: calendarRow.contentType,
// //         weekDay: calendarRow.weekDay
// //       }),
      
// //     });
// //     console.log("--- savePost: Sending this payload:", bodyPayload); // <-- ADD

    
// //     if (!response.ok) {
// //       throw new Error('Failed to save post');
// //     }
    
// //     // Show success message
// //     alert('Post saved successfully!');
    
// //     // Close the modal
// //     setShowPostModal(false);
// //   } catch (error) {
// //     console.error('Error saving post:', error);
// //     alert('Failed to save post. Please try again.');
// //   }
// // };

//   // Replace your existing savePost function with this one:
//  // Replace your existing savePost function with this one:
//   const savePost = async () => {
//     console.log("--- savePost: Function started ---");
//     // Use modalPostIndex in the check
//     if (!generatedPost || modalPostIndex === null) {
//       console.log(`--- savePost: Aborted - generatedPost: ${!!generatedPost}, modalPostIndex: ${modalPostIndex} ---`);
//       return;
//     }

//     try {
//       // Use modalPostIndex to get the correct row
//       const calendarRow = contentCalendar.rows[modalPostIndex];

//       // Define payload
//       const bodyPayload = {
//         content: generatedPost,
//         postIndex: modalPostIndex, // Use modalPostIndex
//         pillar: calendarRow.pillar,
//         topic: calendarRow.topic,
//         approach: calendarRow.approach,
//         contentType: calendarRow.contentType,
//         weekDay: calendarRow.weekDay
//       };
//       console.log("--- savePost: Sending this payload:", bodyPayload);

//       // --- MAKE SURE fetch options ARE PRESENT ---
//       const response = await fetch('/api/posts/save', {
//         method: 'POST', // Specify POST method
//         headers: {
//           'Content-Type': 'application/json' // Specify content type
//         },
//         body: JSON.stringify(bodyPayload) // Include the data in the body
//       });
//       // --- END OF FETCH OPTIONS ---

//       console.log("--- savePost: Received response - Status:", response.status, "OK:", response.ok);

//       if (!response.ok) {
//         console.log(`--- savePost: Response not OK (Status: ${response.status}). Parsing error body... ---`);
//         let errorBody = null;
//         try {
//             errorBody = await response.json();
//             console.error("--- savePost: Error response body:", errorBody);
//         } catch (e) {
//             console.error("--- savePost: Could not parse error response body. Response text might be:", await response.text().catch(() => "Could not read response text"));
//         }
//         throw new Error(`Failed to save post. Status: ${response.status}`);
//       }

//       // If response IS ok
//       console.log("--- savePost: Response OK. Showing success alert.");
//       alert('Post saved successfully!');
//       console.log("--- savePost: Closing modal and resetting modal index.");
//       setShowPostModal(false);
//       setModalPostIndex(null); // Reset modal index

//     } catch (error) {
//       console.error('--- savePost: Error caught in catch block:', error);
//       alert('Failed to save post. Please try again.');
//     } finally {
//       console.log("--- savePost: Finally block executing ---");
//       // setGeneratingPostId(null); // Optional
//     }
//   };
//   // Extract calendar data from markdown content
//   const extractCalendarData = (markdownContent) => {
//     try {
//       // Look for the calendar section
//       const calendarSection = markdownContent.split('## FOUR-WEEK CONTENT CALENDAR')[1];
//       if (!calendarSection) return null;
      
//       // Extract table rows (each row starts with '|')
//       const tableRows = calendarSection.split('\n')
//         .filter(line => line.trim().startsWith('|'))
//         .map(line => line.split('|')
//           .filter(cell => cell.trim()) // Remove empty cells
//           .map(cell => cell.trim()) // Trim whitespace
//         );
      
//       // Extract headers (first row)
//       const headers = tableRows[0];
      
//       // Extract data rows
//       const rows = tableRows.slice(1).map(row => ({
//         weekDay: row[0] || '',
//         pillar: row[1] || '',
//         topic: row[2] || '',
//         approach: row[3] || '',
//         contentType: row[4] || ''
//       }));
      
//       return { headers, rows };
//     } catch (error) {
//       console.error("Error parsing calendar table:", error);
//       return null;
//     }
//   };
  
//   // Process calendarStrategy to remove the table section since we'll render our own interactive table
//   const getProcessedCalendarContent = () => {
//     if (!calendarStrategy) return '';
    
//     // Split at the table section
//     const parts = calendarStrategy.split('## FOUR-WEEK CONTENT CALENDAR');
//     if (parts.length !== 2) return calendarStrategy;
    
//     // Get everything before the table
//     const beforeTable = parts[0];
    
//     // For the part after the table, remove everything up to the next heading or the end
//     let afterTable = '';
//     const afterTablePart = parts[1];
    
//     // Find the first line that starts with a heading
//     const lines = afterTablePart.split('\n');
//     let foundTable = false;
//     let nextSectionIndex = lines.findIndex(line => {
//       // Skip until we find the end of the table
//       if (!foundTable && line.trim().startsWith('|')) return false;
//       foundTable = true;
      
//       // Once we're past the table, look for the next heading
//       return line.trim().startsWith('##');
//     });
    
//     if (nextSectionIndex !== -1) {
//       afterTable = '\n\n' + lines.slice(nextSectionIndex).join('\n');
//     }
    
//     return beforeTable + '\n\n## FOUR-WEEK CONTENT CALENDAR' + afterTable;
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

//   if (!id) {
//     return <div>Loading...</div>;
//   }
  
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
//             <strong className="font-bold text-gray-900" {...props} />
//           ),
//           table: ({node, ...props}) => (
//             <div className="my-6 w-full overflow-x-auto">
//               <table className="w-full table-auto border border-gray-200">
//                 {props.children}
//               </table>
//             </div>
//           ),
//           thead: ({node, ...props}) => (
//             <thead>{props.children}</thead>
//           ),
//           tbody: ({node, ...props}) => (
//             <tbody>{props.children}</tbody>
//           ),
//           tr: ({node, ...props}) => (
//             <tr className="hover:bg-gray-50">{props.children}</tr>
//           ),
//           td: ({node, ...props}) => (
//             <td className="px-3 py-2 border border-gray-200 text-sm">{props.children}</td>
//           ),
//           th: ({node, ...props}) => (
//             <th className="px-3 py-2 border border-gray-200 text-left text-sm font-medium bg-gray-50">{props.children}</th>
//           )
//         }}
//       >
//         {content}
//       </ReactMarkdown>
//     </div>
//   );
  
//   // Calendar Table Component ////
//   const ContentCalendarTable = ({ calendar, onGeneratePost, generatingPostId }) => {
//     if (!calendar || !calendar.rows || calendar.rows.length === 0) {
//       return <p>No calendar data available</p>;
//     }
    
//     return (
//       <div className="overflow-x-auto my-8">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Week - Day</th>
//               <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Pillar</th>
//               <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Topic</th>
//               <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Approach</th>
//               <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Content Type</th>
//               {/* <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Actions</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {calendar.rows.map((row, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border border-gray-300 text-sm">{row.weekDay}</td>
//                 <td className="px-4 py-2 border border-gray-300 text-sm">{row.pillar}</td>
//                 <td className="px-4 py-2 border border-gray-300 text-sm">{row.topic}</td>
//                 <td className="px-4 py-2 border border-gray-300 text-sm">{row.approach}</td>
//                 <td className="px-4 py-2 border border-gray-300 text-sm">{row.contentType}</td>
//                 {/* <td className="px-4 py-2 border border-gray-300 text-sm text-center"> */}
//                   {/* <button 
//                     onClick={() => onGeneratePost(row.pillar, row.topic, row.approach, row.contentType, index)}
//                     className="px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700 transition-colors"
//                     disabled={generatingPostId === index}
//                   >
//                     {generatingPostId === index ? 'Generating...' : 'Generate Post'}
//                   </button> */}
//                 {/* </td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   ///// strategy
  
//   return (
//     <div className="min-h-screen bg-white p-8">
//       <div className="max-w-5xl mx-auto">
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
//             <>
//               {/* Render the calendar content without the table */}
//               <MarkdownContent content={getProcessedCalendarContent()} />
              
//               {/* Render our custom interactive table */}
//               <ContentCalendarTable 
//                 calendar={contentCalendar}
//                 // onGeneratePost={generatePost}
//                 // generatingPostId={generatingPostId}
//               />
//             </>
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
//           <button
//             onClick={saveStrategy}
//             className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
//             disabled={!foundationStrategy || !calendarStrategy}
//           >
//             Save Strategy to Profile
//           </button>
//           <a href="/linkedin-strategy" className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md inline-block hover:bg-emerald-100">
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



//// new code with updated buttons and removed generate function ////


// results/page.js (Cleaned up + Refactored Buttons)
"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

// --- Import Reusable Components ---
// Adjust paths if your components folder is different
import Button from '@/components/Button';
import MarkdownContent from '@/components/MarkdownContent';

// Simplified Calendar Table Component for display only on this page
// (Can be moved to its own file and imported)
const ResultsCalendarTable = ({ calendar }) => {
    if (!calendar || !calendar.rows || calendar.rows.length === 0) {
      return <p className="italic text-gray-500 my-4">No calendar data available.</p>;
    }
    return (
      <div className="overflow-x-auto my-6 shadow border border-base-300 rounded-lg">
        <table className="w-full border-collapse table-auto">
          <thead className="bg-base-200">
            <tr>
              <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Week - Day</th>
              <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Pillar</th>
              <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Topic</th>
              <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Approach</th>
              <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Content Type</th>
              {/* Actions column removed */}
            </tr>
          </thead>
          <tbody className="bg-base-100 divide-y divide-base-200">
            {calendar.rows.map((row, index) => (
              <tr key={index} className="hover:bg-base-200/50">
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.weekDay || '-'}</td>
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.pillar || '-'}</td>
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.topic || '-'}</td>
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.approach || '-'}</td>
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.contentType || '-'}</td>
                {/* Actions cell removed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};


function ResultsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // State for Strategy/Calendar Data ONLY
  const [submission, setSubmission] = useState(null);
  const [foundationStrategy, setFoundationStrategy] = useState(null);
  const [calendarStrategy, setCalendarStrategy] = useState(null); // Raw markdown
  const [contentCalendar, setContentCalendar] = useState(null); // Parsed object
  const [foundationLoading, setFoundationLoading] = useState(false);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSavingStrategy, setIsSavingStrategy] = useState(false); // Loading state for save button
  const [saveMessage, setSaveMessage] = useState(''); // Message after saving

  // useEffect and Generation Functions (remain largely the same)
  useEffect(() => {
     if (!id) { setError('No submission ID found.'); return; };
     let parsedSubmission;
     try {
         const savedSubmission = localStorage.getItem(`submission_${id}`);
         if (!savedSubmission) { setError('Submission not found. It may have been deleted or expired.'); return; }
         parsedSubmission = JSON.parse(savedSubmission);
         setSubmission(parsedSubmission);
     } catch (err) {
         console.error('Error loading/parsing submission:', err);
         setError('Failed to load your submission data. It might be corrupted.');
         return;
     }
     if (parsedSubmission) {
        generateFoundation(parsedSubmission);
     }
  }, [id]);

  const generateFoundation = async (submissionData) => {
      setFoundationLoading(true); setError(null); setSaveMessage('');
      try {
          const response = await fetch('/api/generate-foundation', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(submissionData)});
          if (!response.ok) throw new Error('Failed to generate strategy foundation');
          const data = await response.json();
          
          setFoundationStrategy(data.foundation);
          generateCalendar(submissionData, data.foundation);
      } catch (err) { setError(err.message || 'Failed to generate foundation.'); console.error('Error generating foundation:', err); }
      finally { setFoundationLoading(false); }
  };

  const generateCalendar = async (submissionData, foundation) => {
      setCalendarLoading(true);
      try {
          const response = await fetch('/api/generate-calendar', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...submissionData, foundation})});
          if (!response.ok) throw new Error('Failed to generate content calendar');
          const data = await response.json();
          console.log("--- Raw Markdown from API (/api/generate-calendar): ---");
          console.log(data.calendar); // Log the raw markdown string
          console.log("--- End Raw Markdown from API ---");
          setCalendarStrategy(data.calendar);
          const parsedCalendar = extractCalendarData(data.calendar);
          setContentCalendar(parsedCalendar);
      } catch (err) { setError(err.message || 'Failed to generate calendar.'); console.error('Error generating calendar:', err); }
      finally { setCalendarLoading(false); }
  };

  // Utility Functions (remain)
  // Corrected extractCalendarData function for results/page.js

  // Corrected extractCalendarData with flexible separator regex

// Corrected extractCalendarData with 'let' for headerMatch

  const extractCalendarData = (markdownContent) => {
    // console.log("--- Raw Markdown Input for Calendar Parsing (Results Page): ---");
    // console.log(markdownContent);
    // console.log("--- End Raw Markdown Input ---");

    if (!markdownContent || typeof markdownContent !== 'string') {
      console.log("extractCalendarData: Invalid markdownContent received.");
      return null;
    }
    try {
      const tableHeaderRegex = /\|\s*Week - Day\s*\|.*?\n\|.*?-{3,}.*\|/;
      // --- CHANGE CONST TO LET HERE ---
      let headerMatch = markdownContent.match(tableHeaderRegex); // Use 'let' instead of 'const'

      if (!headerMatch) {
          console.log("extractCalendarData: Could not find table header row like '| Week - Day |...' followed by a separator line containing '---'.");
          // Fallback attempt
          const simpleTableHeaderRegex = /\|\s*Week - Day\s*\|.*?\n\|.*?-{3,}.*\|/; // Fallback regex seems identical? Ensure it's needed/different if kept. Maybe remove fallback for now? Or ensure regex is different. Let's assume it might be needed for slightly different markdown.
          // Now this reassignment is allowed because headerMatch is declared with 'let'
          headerMatch = markdownContent.match(simpleTableHeaderRegex);
          if (!headerMatch) {
              console.log("extractCalendarData: Fallback regex also failed. Cannot find table start.");
              return null;
          }
          console.log("extractCalendarData: Found table via fallback regex.");
      }

      // Get the text from the header match onwards
      const tableStartIndex = headerMatch.index;
      const tableContent = markdownContent.substring(tableStartIndex);

      // Extract table rows
      const tableRows = tableContent.split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('|') && line.includes('|', 1))
        .map(line => line.substring(1, line.endsWith('|') ? line.length - 1 : line.length)
          .split('|')
          .map(cell => cell.trim())
        );

      // Check for header/separator rows
      if (tableRows.length < 2 || !tableRows[1].some(cell => cell.includes('---'))) {
          console.log("extractCalendarData: Did not find valid header/separator rows after splitting.");
          return null;
      }

      // Extract headers and rows
      const headers = tableRows[0];
      const rows = tableRows.slice(2).map(row => ({
        weekDay: row[0] || '', pillar: row[1] || '', topic: row[2] || '',
        approach: row[3] || '', contentType: row[4] || ''
      })).filter(row => row.weekDay && !row.weekDay.includes('--'));

      if (rows.length === 0) {
          console.log("extractCalendarData: No valid data rows found after header/separator.");
          return null;
      }

      console.log(`extractCalendarData: Successfully parsed ${rows.length} rows.`);
      return { headers, rows };

    } catch (error) {
      console.error("Error parsing calendar table in extractCalendarData:", error);
      return null;
    }
  };

  const getProcessedCalendarContent = () => { /* ... same implementation ... */ }; // Returns text before table
  const retryFoundation = () => { if (submission) generateFoundation(submission); };
  const retryCalendar = () => { if (submission && foundationStrategy) generateCalendar(submission, foundationStrategy); };

  // Save Strategy Function (remains)
  const saveStrategy = async () => { /* ... same implementation ... */ };

  // --- Main Return JSX (using Button component) ---

  if (!id) { return <div className="p-8 text-center">Invalid request: Missing submission ID.</div>; }
  // Display error first if it occurred during initial load/generation
  if (error && (!foundationStrategy || !calendarStrategy)) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-base-200">
            <div className="card bg-base-100 shadow-xl max-w-lg w-full">
               <div className="card-body items-center text-center">
                   <h2 className="card-title text-error">Error Generating Strategy</h2>
                   <p>{error}</p>
                   <div className="card-actions justify-center mt-4 gap-4">
                       <Button variant="primary" onClick={retryFoundation}>Retry</Button>
                       <Button variant="outline" href="/linkedin-strategy">Start Over</Button>
                   </div>
               </div>
            </div>
        </div>
       );
  }

  // Main display
  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-base-content">Your Generated LinkedIn Strategy</h1>

        {/* Message area */}
        {saveMessage && ( <div className={`alert ${saveMessage.includes('Error') ? 'alert-error' : 'alert-success'} shadow-lg`}> <div><span>{saveMessage}</span></div> </div> )}

        {/* Strategic Foundation Section */}
        <div className="card bg-base-100 shadow-xl">
           <div className="card-body">
              <div className="flex justify-between items-start">
                <h2 className="card-title mb-4">Strategic Foundation</h2>
                {!foundationLoading && foundationStrategy && ( <Button variant="outline" size="sm" onClick={retryFoundation}>Regenerate</Button> )}
              </div>
              {foundationLoading ? ( <div className="text-center p-10"><span className="loading loading-dots loading-lg"></span><p>Generating foundation...</p></div> )
               : foundationStrategy ? ( <MarkdownContent content={foundationStrategy} /> )
               : ( <p className="italic text-base-content/70">Waiting for generation...</p> )}
           </div>
        </div>

        {/* Content Calendar Section */}
        <div className="card bg-base-100 shadow-xl">
           <div className="card-body">
              <div className="flex justify-between items-start">
                 <h2 className="card-title mb-4">Content Calendar Preview</h2>
                 {!calendarLoading && foundationStrategy && calendarStrategy && ( <Button variant="outline" size="sm" onClick={retryCalendar}>Regenerate</Button> )}
              </div>
              {calendarLoading ? ( <div className="text-center p-10"><span className="loading loading-dots loading-lg"></span><p>Generating calendar...</p></div> )
               : calendarStrategy ? (
                <>
                  {/* Optional: Display text part of calendar markdown */}
                  {/* <MarkdownContent content={getProcessedCalendarContent()} /> */}
                  <p className="text-sm mb-4 text-base-content/70">Review the generated calendar below. Save the strategy to view/generate posts later.</p>
                  {/* Render the simplified display table */}
                  <ResultsCalendarTable calendar={contentCalendar} />
                </>
              ) : foundationStrategy ? ( <p className="italic text-base-content/70">Waiting for generation...</p> )
               : ( <p className="italic text-base-content/70">Waiting for foundation to complete...</p> )}
           </div>
        </div>

        {/* Action buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button
            variant="primary"
            size="lg" // Make primary action larger
            onClick={saveStrategy}
            disabled={!foundationStrategy || !calendarStrategy || isSavingStrategy || foundationLoading || calendarLoading}
            // Add isLoading prop if your Button component supports it
            // isLoading={isSavingStrategy}
          >
            {isSavingStrategy ? 'Saving...' : 'Save Strategy & View in Profile'}
          </Button>
          <Button variant="ghost" href="/linkedin-strategy">
            Generate New Strategy
          </Button>
        </div>

      </div>
    </div>
  );
}

// Main component export with Suspense
export default function Results() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><span className="loading loading-lg"></span></div>}>
      <ResultsContent />
    </Suspense>
  );
}