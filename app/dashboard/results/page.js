
// "use client";

// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState, Suspense } from 'react';
// import clsx from 'clsx';
// import Link from 'next/link';
// import useStrategyStatus from '@/app/hooks/useStrategyStatus';
// import StrategicFoundationDisplay from '../components/StrategicFoundationDisplay';

// // --- Import Reusable Components ---
// // import MarkdownContent from '@/components/MarkdownContent';

// // Simplified Calendar Table Component for display only on this page
// // const ResultsCalendarTable = ({ calendar }) => {
// //     if (!calendar || !calendar.rows || calendar.rows.length === 0) {
// //       return <p className="italic text-base-content/60 my-4">No calendar data available.</p>;
// //     }
// //     return (
// //       <div className="overflow-x-auto my-6 shadow border border-base-300 rounded-lg">
// //         <table className="w-full border-collapse table-auto">
// //           <thead className="bg-base-200">
// //             <tr>
// //               <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Week - Day</th>
// //               <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Pillar</th>
// //               <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Topic</th>
// //               <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Approach</th>
// //               <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Content Type</th>
// //             </tr>
// //           </thead>
// //           <tbody className="bg-base-100 divide-y divide-base-200">
// //             {calendar.rows.map((row, index) => (
// //               <tr key={index} className="hover:bg-base-200/50">
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.weekDay || '-'}</td>
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.pillar || '-'}</td>
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.topic || '-'}</td>
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.approach || '-'}</td>
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.contentType || '-'}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     );
// // };


// function ResultsContent() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get('id');

//   // State for Strategy/Calendar Data ONLY
//   const [submission, setSubmission] = useState(null);
//   const [foundationStrategy, setFoundationStrategy] = useState(null);
//   const [calendarStrategy, setCalendarStrategy] = useState(null); // Raw markdown
//   const [contentCalendar, setContentCalendar] = useState(null); // Parsed object
//   const [foundationLoading, setFoundationLoading] = useState(false);
//   const [calendarLoading, setCalendarLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isSavingStrategy, setIsSavingStrategy] = useState(false); // Loading state for save button
//   const [saveMessage, setSaveMessage] = useState(''); // Message after saving
//   const { hasStrategy, setStrategyStatus } = useStrategyStatus(false);


//   // useEffect and Generation Functions
//   useEffect(() => {
//      if (!id) { setError('No submission ID found.'); return; }
//      let parsedSubmission;
//      try {
//          const savedSubmission = localStorage.getItem(`submission_${id}`);
//          if (!savedSubmission) { setError('Submission not found. It may have been deleted or expired.'); return; }
//          parsedSubmission = JSON.parse(savedSubmission);
//          setSubmission(parsedSubmission);
//      } catch (err) {
//          console.error('Error loading/parsing submission:', err);
//          setError('Failed to load your submission data. It might be corrupted.');
//          return;
//      }
//      if (parsedSubmission) {
//         generateFoundation(parsedSubmission);
//      }
//   }, [id]);

//   const generateFoundation = async (submissionData) => {
//       setFoundationLoading(true); setError(null); setSaveMessage('');
//       try {
//           const response = await fetch('/api/generate-foundation', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(submissionData)});
//           if (!response.ok) throw new Error('Failed to generate strategy foundation');
//           const data = await response.json();
//           setFoundationStrategy(data.foundation);
//           generateCalendar(submissionData, data.foundation);
//       } catch (err) { setError(err.message || 'Failed to generate foundation.'); console.error('Error generating foundation:', err); }
//       finally { setFoundationLoading(false); }
//   };

//   const generateCalendar = async (submissionData, foundation) => {
//       setCalendarLoading(true);
//       try {
//           const response = await fetch('/api/generate-calendar', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...submissionData, foundation})});
//           if (!response.ok) throw new Error('Failed to generate content calendar');
//           const data = await response.json();
//           setCalendarStrategy(data.calendar); // Save raw calendar markdown
//           const parsedCalendar = extractCalendarData(data.calendar); // Parse table data
//           setContentCalendar(parsedCalendar);
//       } catch (err) { setError(err.message || 'Failed to generate calendar.'); console.error('Error generating calendar:', err); }
//       finally { setCalendarLoading(false); }
//   };

//   // --- Utility Functions ---
//   const extractCalendarData = (markdownContent) => {
//        // Using the last corrected version
//        if (!markdownContent || typeof markdownContent !== 'string') { console.log("extractCalendarData: Invalid markdownContent received."); return null; }
//        try {
//          const tableHeaderRegex = /\|\s*Week - Day\s*\|.*?\n\|.*?-{3,}.*\|/;
//          let headerMatch = markdownContent.match(tableHeaderRegex);
//          if (!headerMatch) {
//              console.log("extractCalendarData: Could not find table header row like '| Week - Day |...' followed by separator line.");
//              return null; // Simplified: if main regex fails, assume no table for now
//          }
//          const tableStartIndex = headerMatch.index;
//          const tableContent = markdownContent.substring(tableStartIndex);
//          const tableRows = tableContent.split('\n').map(line => line.trim()).filter(line => line.startsWith('|') && line.includes('|', 1)).map(line => line.substring(1, line.endsWith('|') ? line.length - 1 : line.length).split('|').map(cell => cell.trim()));
//          if (tableRows.length < 2 || !tableRows[1].some(cell => cell.includes('---'))) { console.log("extractCalendarData: Did not find valid header/separator rows."); return null; }
//          const headers = tableRows[0];
//          const rows = tableRows.slice(2).map(row => ({ weekDay: row[0] || '', pillar: row[1] || '', topic: row[2] || '', approach: row[3] || '', contentType: row[4] || '' })).filter(row => row.weekDay && !row.weekDay.includes('--'));
//          if (rows.length === 0) { console.log("extractCalendarData: No valid data rows extracted."); return null; }
//          console.log(`extractCalendarData: Successfully parsed ${rows.length} rows.`);
//          return { headers, rows };
//        } catch (error) { console.error("Error parsing calendar table in extractCalendarData:", error); return null; }
//   };

//   // This is optional - only needed if you want to display the text *before* the calendar table
//   const getProcessedCalendarContent = () => {
//      if (!calendarStrategy) return '';
//      const parts = calendarStrategy.split('## FOUR-WEEK CONTENT CALENDAR');
//      // If you want NO text description, just return empty string: return '';
//      // If you want text description, return parts[0]:
//      return parts[0]?.trim() || ''; // Return text before heading, or empty string
//   };

//   const retryFoundation = () => { if (submission) { setCalendarStrategy(null); setContentCalendar(null); generateFoundation(submission); }};
//   const retryCalendar = () => { if (submission && foundationStrategy) { setCalendarStrategy(null); setContentCalendar(null); generateCalendar(submission, foundationStrategy);} };

//   // --- Save Strategy Function (Full Implementation) ---
//   const saveStrategy = async () => {
//     console.log("--- saveStrategy: Function started ---");
//     if (!submission || !foundationStrategy || !calendarStrategy || !contentCalendar) {
//       console.log("--- saveStrategy: Aborted - data incomplete ---", { submission: !!submission, foundationStrategy: !!foundationStrategy, calendarStrategy: !!calendarStrategy, contentCalendar: !!contentCalendar });
//       setSaveMessage("Error: Strategy data is incomplete.");
//       alert("Cannot save - strategy data is incomplete.");
//       return;
//     }
//     setIsSavingStrategy(true);
//     setSaveMessage('Saving strategy...'); // Indicate saving started
//     try {
//       const payload = {
//         submissionId: id,
//         answers: submission.answers,
//         foundation: foundationStrategy,
//         calendar: calendarStrategy, // Raw markdown
//         contentCalendar // Parsed object
//       };
//       console.log("--- saveStrategy: Sending Payload:", payload);
//       const response = await fetch('/api/profile/save-strategy', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });
//       console.log("--- saveStrategy: Received Response - Status:", response.status, "OK:", response.ok);

//       if (!response.ok) {
//         let errorDetails = `Failed to save strategy. Status: ${response.status}`;
//         try {
//           const errData = await response.json();
//           console.log("--- saveStrategy: Error response body:", errData);
//           errorDetails = errData.details || errData.error || errorDetails;
//         } catch (e) {
//             const errorText = await response.text().catch(() => "Could not read response text.");
//             console.log("--- saveStrategy: Could not parse error response body. Raw text:", errorText);
//         }
//         throw new Error(errorDetails);
//       }

//       // If response IS ok:
//       const resultData = await response.json(); // Get success data if needed
//       console.log("--- saveStrategy: Response OK.", resultData);
//       setSaveMessage('Strategy saved successfully!');
//       alert('Your LinkedIn strategy has been saved to your profile!'); // Confirmation
//       setStrategyStatus(true);
//       localStorage.setItem('hasStrategy', 'true');


//     } catch (error) {
//       console.error('--- saveStrategy: Error caught:', error);
//       setSaveMessage(`Error: ${error.message}`);
//       alert(`Failed to save strategy: ${error.message}`);
//     } finally {
//       console.log("--- saveStrategy: Finally block executing. ---");
//       setIsSavingStrategy(false);
//     }
//   };


//   // Main Return JSX (with standard buttons instead of Button component)

//   if (!id) { 
//     return <div className="p-8 text-center text-error">Invalid request: Missing submission ID.</div>; 
//   }
  
//   if (error && (!foundationStrategy || !calendarStrategy)) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-base-200">
//         <div className="card bg-base-100 shadow-xl max-w-lg w-full">
//           <div className="card-body items-center text-center">
//             <h2 className="card-title text-error">Error Generating Strategy</h2>
//             <p>{error}</p>
//             <div className="card-actions justify-center mt-4 gap-4">
//               <button 
//                 className="btn btn-primary" 
//                 onClick={retryFoundation}
//               >
//                 Retry
//               </button>
//               <Link href="/linkedin-strategy" className="btn btn-outline">
//                 Start Over
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Main display
//   return (
//     <div className="min-h-screen bg-base-200 p-4 md:p-8">
//       <div className="max-w-5xl mx-auto space-y-8">
//         <h1 className="text-3xl md:text-4xl font-extrabold text-base-content">Your Generated LinkedIn Strategy</h1>

//         {/* Message area */}
//         {saveMessage && (
//           <div className={clsx("alert shadow-lg", {
//             "alert-success": saveMessage.includes("success"),
//             "alert-error": saveMessage.includes("Error"),
//             "alert-info": !saveMessage.includes("success") && !saveMessage.includes("Error"),
//           })}>
//             <div><span>{saveMessage}</span></div>
//           </div>
//         )}


//         {/* Strategic Foundation Section */}
//         {/* <div className="card bg-base-100 shadow-xl">
//           <div className="card-body">
//             <div className="flex justify-between items-start gap-4">
//               <h2 className="card-title mb-4">Strategic Foundation</h2>
//               {!foundationLoading && foundationStrategy && (
//                 <button 
//                   className="btn btn-outline btn-sm" 
//                   onClick={retryFoundation}
//                 >
//                   Regenerate
//                 </button>
//               )}
//             </div>
//             {foundationLoading ? (
//               <div className="text-center p-10">
//                 <span className="loading loading-dots loading-lg"></span>
//                 <p className="mt-2">Generating foundation...</p>
//               </div>
//             ) : foundationStrategy ? (
//               <MarkdownContent content={foundationStrategy} />
//             ) : (
//               <div className="text-center p-10 italic text-base-content/70">Waiting for generation...</div>
//             )}
//           </div>
//         </div> */}

//         <StrategicFoundationDisplay
//         loading={foundationLoading}
//         strategy={foundationStrategy}
//         onRetry={retryFoundation}
//         />

//         {/* Action buttons */}
//         <div className="mt-12 flex flex-wrap justify-center gap-4">
//           { hasStrategy ? (
//             <a href="/dashboard/profile" 
//             className="btn btn-secondary">
//             View Profile
//           </a>
//           ) : (
//             <button
//             className="btn btn-primary "
//             onClick={saveStrategy}
//             disabled={!foundationStrategy || !calendarStrategy || !contentCalendar || isSavingStrategy || foundationLoading || calendarLoading}
//           >
//             {isSavingStrategy ? <span className="loading loading-spinner loading-sm mr-2"></span> : null}
//             {isSavingStrategy ? 'Saving...' : 'Save Strategy'}
//           </button>
//           )}
//           <Link href="/dashboard/strategy" className="btn btn-ghost">
//             Generate New Strategy
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }

// // Main component export with Suspense
// export default function Results() {
//   return (
//     <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><span className="loading loading-lg"></span></div>}>
//       <ResultsContent />
//     </Suspense>
//   );
// }

"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback, Suspense } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import useStrategyStatus from '@/app/hooks/useStrategyStatus';
import StrategicFoundationDisplay from '../components/StrategicFoundationDisplay';

// Commented out unused import
// import MarkdownContent from '@/components/MarkdownContent';

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
  const { hasStrategy, setStrategyStatus } = useStrategyStatus(false);

  // --- Utility Functions ---
  const extractCalendarData = useCallback((markdownContent) => {
       // Using the last corrected version
       if (!markdownContent || typeof markdownContent !== 'string') { console.log("extractCalendarData: Invalid markdownContent received."); return null; }
       try {
         const tableHeaderRegex = /\|\s*Week - Day\s*\|.*?\n\|.*?-{3,}.*\|/;
         let headerMatch = markdownContent.match(tableHeaderRegex);
         if (!headerMatch) {
             console.log("extractCalendarData: Could not find table header row like '| Week - Day |...' followed by separator line.");
             return null; // Simplified: if main regex fails, assume no table for now
         }
         const tableStartIndex = headerMatch.index;
         const tableContent = markdownContent.substring(tableStartIndex);
         const tableRows = tableContent.split('\n').map(line => line.trim()).filter(line => line.startsWith('|') && line.includes('|', 1)).map(line => line.substring(1, line.endsWith('|') ? line.length - 1 : line.length).split('|').map(cell => cell.trim()));
         if (tableRows.length < 2 || !tableRows[1].some(cell => cell.includes('---'))) { console.log("extractCalendarData: Did not find valid header/separator rows."); return null; }
         const headers = tableRows[0];
         const rows = tableRows.slice(2).map(row => ({ weekDay: row[0] || '', pillar: row[1] || '', topic: row[2] || '', approach: row[3] || '', contentType: row[4] || '' })).filter(row => row.weekDay && !row.weekDay.includes('--'));
         if (rows.length === 0) { console.log("extractCalendarData: No valid data rows extracted."); return null; }
         console.log(`extractCalendarData: Successfully parsed ${rows.length} rows.`);
         return { headers, rows };
       } catch (error) { console.error("Error parsing calendar table in extractCalendarData:", error); return null; }
  }, []);

  // Define generateCalendar first since it's used in generateFoundation
  const generateCalendar = useCallback(async (submissionData, foundation) => {
      setCalendarLoading(true);
      try {
          const response = await fetch('/api/generate-calendar', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...submissionData, foundation})});
          if (!response.ok) throw new Error('Failed to generate content calendar');
          const data = await response.json();
          setCalendarStrategy(data.calendar); // Save raw calendar markdown
          const parsedCalendar = extractCalendarData(data.calendar); // Parse table data
          setContentCalendar(parsedCalendar);
      } catch (err) { setError(err.message || 'Failed to generate calendar.'); console.error('Error generating calendar:', err); }
      finally { setCalendarLoading(false); }
  }, [extractCalendarData]);

  // Now define generateFoundation with generateCalendar as dependency
  const generateFoundation = useCallback(async (submissionData) => {
      setFoundationLoading(true); setError(null); setSaveMessage('');
      try {
          const response = await fetch('/api/generate-foundation', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(submissionData)});
          if (!response.ok) throw new Error('Failed to generate strategy foundation');
          const data = await response.json();
          setFoundationStrategy(data.foundation);
          generateCalendar(submissionData, data.foundation);
      } catch (err) { setError(err.message || 'Failed to generate foundation.'); console.error('Error generating foundation:', err); }
      finally { setFoundationLoading(false); }
  }, [generateCalendar]);

  // useEffect with proper dependencies
  useEffect(() => {
     if (!id) { setError('No submission ID found.'); return; }
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
  }, [id, generateFoundation]);

  // Mark unused functions with eslint-disable
  // eslint-disable-next-line no-unused-vars
  const getProcessedCalendarContent = () => {
     if (!calendarStrategy) return '';
     const parts = calendarStrategy.split('## FOUR-WEEK CONTENT CALENDAR');
     // If you want NO text description, just return empty string: return '';
     // If you want text description, return parts[0]:
     return parts[0]?.trim() || ''; // Return text before heading, or empty string
  };

  const retryFoundation = () => { if (submission) { setCalendarStrategy(null); setContentCalendar(null); generateFoundation(submission); }};
  
  // eslint-disable-next-line no-unused-vars
  const retryCalendar = () => { if (submission && foundationStrategy) { setCalendarStrategy(null); setContentCalendar(null); generateCalendar(submission, foundationStrategy);} };

  // --- Save Strategy Function (Full Implementation) ---
  const saveStrategy = async () => {
    console.log("--- saveStrategy: Function started ---");
    if (!submission || !foundationStrategy || !calendarStrategy || !contentCalendar) {
      console.log("--- saveStrategy: Aborted - data incomplete ---", { submission: !!submission, foundationStrategy: !!foundationStrategy, calendarStrategy: !!calendarStrategy, contentCalendar: !!contentCalendar });
      setSaveMessage("Error: Strategy data is incomplete.");
      alert("Cannot save - strategy data is incomplete.");
      return;
    }
    setIsSavingStrategy(true);
    setSaveMessage('Saving strategy...'); // Indicate saving started
    try {
      const payload = {
        submissionId: id,
        answers: submission.answers,
        foundation: foundationStrategy,
        calendar: calendarStrategy, // Raw markdown
        contentCalendar // Parsed object
      };
      console.log("--- saveStrategy: Sending Payload:", payload);
      const response = await fetch('/api/profile/save-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      console.log("--- saveStrategy: Received Response - Status:", response.status, "OK:", response.ok);

      if (!response.ok) {
        let errorDetails = `Failed to save strategy. Status: ${response.status}`;
        try {
          const errData = await response.json();
          console.log("--- saveStrategy: Error response body:", errData);
          errorDetails = errData.details || errData.error || errorDetails;
        } catch (e) {
            const errorText = await response.text().catch(() => "Could not read response text.");
            console.log("--- saveStrategy: Could not parse error response body. Raw text:", errorText);
        }
        throw new Error(errorDetails);
      }

      // If response IS ok:
      const resultData = await response.json(); // Get success data if needed
      console.log("--- saveStrategy: Response OK.", resultData);
      setSaveMessage('Strategy saved successfully!');
      alert('Your LinkedIn strategy has been saved to your profile!'); // Confirmation
      setStrategyStatus(true);
      localStorage.setItem('hasStrategy', 'true');


    } catch (error) {
      console.error('--- saveStrategy: Error caught:', error);
      setSaveMessage(`Error: ${error.message}`);
      alert(`Failed to save strategy: ${error.message}`);
    } finally {
      console.log("--- saveStrategy: Finally block executing. ---");
      setIsSavingStrategy(false);
    }
  };


  // Main Return JSX (with standard buttons instead of Button component)

  if (!id) { 
    return <div className="p-8 text-center text-error">Invalid request: Missing submission ID.</div>; 
  }
  
  if (error && (!foundationStrategy || !calendarStrategy)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-base-200">
        <div className="card bg-base-100 shadow-xl max-w-lg w-full">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-error">Error Generating Strategy</h2>
            <p>{error}</p>
            <div className="card-actions justify-center mt-4 gap-4">
              <button 
                className="btn btn-primary" 
                onClick={retryFoundation}
              >
                Retry
              </button>
              <Link href="/linkedin-strategy" className="btn btn-outline">
                Start Over
              </Link>
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
        {saveMessage && (
          <div className={clsx("alert shadow-lg", {
            "alert-success": saveMessage.includes("success"),
            "alert-error": saveMessage.includes("Error"),
            "alert-info": !saveMessage.includes("success") && !saveMessage.includes("Error"),
          })}>
            <div><span>{saveMessage}</span></div>
          </div>
        )}

        <StrategicFoundationDisplay
          loading={foundationLoading}
          strategy={foundationStrategy}
          onRetry={retryFoundation}
        />

        {/* Action buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          { hasStrategy ? (
            <a href="/dashboard/profile" 
            className="btn btn-secondary">
            View Profile
          </a>
          ) : (
            <button
            className="btn btn-primary "
            onClick={saveStrategy}
            disabled={!foundationStrategy || !calendarStrategy || !contentCalendar || isSavingStrategy || foundationLoading || calendarLoading}
          >
            {isSavingStrategy ? <span className="loading loading-spinner loading-sm mr-2"></span> : null}
            {isSavingStrategy ? 'Saving...' : 'Save Strategy'}
          </button>
          )}
          <Link href="/dashboard/strategy" className="btn btn-ghost">
            Generate New Strategy
          </Link>
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