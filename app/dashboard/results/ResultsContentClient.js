// //  ResultsContentClient.js
// "use client";

// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState, useCallback } from 'react';
// import clsx from 'clsx';
// import Link from 'next/link';
// import useStrategyStatus from '@/app/hooks/useStrategyStatus';
// // import StrategicFoundationDisplay from '../components/StrategicFoundationDisplay';
// import MarkdownContent from '@/components/MarkdownContent';

// function ResultsContent({ submissionId }) {
//     // const searchParams = useSearchParams();
//     // const id = searchParams.get('id');

//     const id = submissionId
  
//     // State for Strategy/Calendar Data ONLY
//     const [submission, setSubmission] = useState(null);
//     const [foundationStrategy, setFoundationStrategy] = useState(null);
//     const [calendarStrategy, setCalendarStrategy] = useState(null); // Raw markdown
//     const [contentCalendar, setContentCalendar] = useState(null); // Parsed object
//     const [foundationLoading, setFoundationLoading] = useState(false);
//     const [calendarLoading, setCalendarLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [isSavingStrategy, setIsSavingStrategy] = useState(false); // Loading state for save button
//     const [saveMessage, setSaveMessage] = useState(''); // Message after saving
//     const { hasStrategy, setStrategyStatus } = useStrategyStatus(false);
  
//     // --- Utility Functions ---
//     const extractCalendarData = useCallback((markdownContent) => {
//          // Using the last corrected version
//          if (!markdownContent || typeof markdownContent !== 'string') { console.log("extractCalendarData: Invalid markdownContent received."); return null; }
//          try {
//            const tableHeaderRegex = /\|\s*Week - Day\s*\|.*?\n\|.*?-{3,}.*\|/;
//            let headerMatch = markdownContent.match(tableHeaderRegex);
//            if (!headerMatch) {
//                console.log("extractCalendarData: Could not find table header row like '| Week - Day |...' followed by separator line.");
//                return null; // Simplified: if main regex fails, assume no table for now
//            }
//            const tableStartIndex = headerMatch.index;
//            const tableContent = markdownContent.substring(tableStartIndex);
//            const tableRows = tableContent.split('\n').map(line => line.trim()).filter(line => line.startsWith('|') && line.includes('|', 1)).map(line => line.substring(1, line.endsWith('|') ? line.length - 1 : line.length).split('|').map(cell => cell.trim()));
//            if (tableRows.length < 2 || !tableRows[1].some(cell => cell.includes('---'))) { console.log("extractCalendarData: Did not find valid header/separator rows."); return null; }
//            const headers = tableRows[0];
//            const rows = tableRows.slice(2).map(row => ({ weekDay: row[0] || '', pillar: row[1] || '', topic: row[2] || '', approach: row[3] || '', contentType: row[4] || '' })).filter(row => row.weekDay && !row.weekDay.includes('--'));
//            if (rows.length === 0) { console.log("extractCalendarData: No valid data rows extracted."); return null; }
//            console.log(`extractCalendarData: Successfully parsed ${rows.length} rows.`);
//            return { headers, rows };
//          } catch (error) { console.error("Error parsing calendar table in extractCalendarData:", error); return null; }
//     }, []);
  
//     // Define generateCalendar first since it's used in generateFoundation
//     const generateCalendar = useCallback(async (submissionData, foundation) => {
//         setCalendarLoading(true);
//         try {
//             const response = await fetch('/api/generate-calendar', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...submissionData, foundation})});
//             if (!response.ok) throw new Error('Failed to generate content calendar');
//             const data = await response.json();
//             setCalendarStrategy(data.calendar); // Save raw calendar markdown
//             const parsedCalendar = extractCalendarData(data.calendar); // Parse table data
//             setContentCalendar(parsedCalendar);
//         } catch (err) { setError(err.message || 'Failed to generate calendar.'); console.error('Error generating calendar:', err); }
//         finally { setCalendarLoading(false); }
//     }, [extractCalendarData]);
  
//     // Now define generateFoundation with generateCalendar as dependency
//     const generateFoundation = useCallback(async (submissionData) => {
//         setFoundationLoading(true); setError(null); setSaveMessage('');
//         try {
//             const response = await fetch('/api/generate-foundation', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(submissionData)});
//             if (!response.ok) throw new Error('Failed to generate strategy foundation');
//             const data = await response.json();
//             setFoundationStrategy(data.foundation);
//             generateCalendar(submissionData, data.foundation);
//         } catch (err) { setError(err.message || 'Failed to generate foundation.'); console.error('Error generating foundation:', err); }
//         finally { setFoundationLoading(false); }
//     }, [generateCalendar]);
  
//     // useEffect with proper dependencies
//     useEffect(() => {
//        if (!id) { setError('No submission ID found.'); return; }
//        let parsedSubmission;
//        try {
//            const savedSubmission = localStorage.getItem(`submission_${id}`);
//            if (!savedSubmission) { setError('Submission not found. It may have been deleted or expired.'); return; }
//            parsedSubmission = JSON.parse(savedSubmission);
//            setSubmission(parsedSubmission);
//        } catch (err) {
//            console.error('Error loading/parsing submission:', err);
//            setError('Failed to load your submission data. It might be corrupted.');
//            return;
//        }
//        if (parsedSubmission) {
//           generateFoundation(parsedSubmission);
//        }
//     }, [id, generateFoundation]);
  
//     // // Mark unused functions with eslint-disable
//     // // eslint-disable-next-line no-unused-vars
//     // const getProcessedCalendarContent = () => {
//     //    if (!calendarStrategy) return '';
//     //    const parts = calendarStrategy.split('## FOUR-WEEK CONTENT CALENDAR');
//     //    // If you want NO text description, just return empty string: return '';
//     //    // If you want text description, return parts[0]:
//     //    return parts[0]?.trim() || ''; // Return text before heading, or empty string
//     // };
  
//     const retryFoundation = () => { if (submission) { setCalendarStrategy(null); setContentCalendar(null); generateFoundation(submission); }};
    
//     // eslint-disable-next-line no-unused-vars
//     // const retryCalendar = () => { if (submission && foundationStrategy) { setCalendarStrategy(null); setContentCalendar(null); generateCalendar(submission, foundationStrategy);} };
  
//     // --- Save Strategy Function (Full Implementation) ---
//     const saveStrategy = async () => {
//       console.log("--- saveStrategy: Function started ---");
//       if (!submission || !foundationStrategy || !calendarStrategy || !contentCalendar) {
//         console.log("--- saveStrategy: Aborted - data incomplete ---", { submission: !!submission, foundationStrategy: !!foundationStrategy, calendarStrategy: !!calendarStrategy, contentCalendar: !!contentCalendar });
//         setSaveMessage("Error: Strategy data is incomplete.");
//         alert("Cannot save - strategy data is incomplete.");
//         return;
//       }
//       setIsSavingStrategy(true);
//       setSaveMessage('Saving strategy...'); // Indicate saving started
//       try {
//         const payload = {
//           submissionId: id,
//           answers: submission.answers,
//           foundation: foundationStrategy,
//           calendar: calendarStrategy, // Raw markdown
//           contentCalendar // Parsed object
//         };
//         console.log("--- saveStrategy: Sending Payload:", payload);
//         const response = await fetch('/api/profile/save-strategy', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload)
//         });
//         console.log("--- saveStrategy: Received Response - Status:", response.status, "OK:", response.ok);
  
//         if (!response.ok) {
//           let errorDetails = `Failed to save strategy. Status: ${response.status}`;
//           try {
//             const errData = await response.json();
//             console.log("--- saveStrategy: Error response body:", errData);
//             errorDetails = errData.details || errData.error || errorDetails;
//           } catch (e) {
//               const errorText = await response.text().catch(() => "Could not read response text.");
//               console.log("--- saveStrategy: Could not parse error response body. Raw text:", errorText);
//           }
//           throw new Error(errorDetails);
//         }
  
//         // If response IS ok:
//         const resultData = await response.json(); // Get success data if needed
//         console.log("--- saveStrategy: Response OK.", resultData);
//         setSaveMessage('Strategy saved successfully!');
//         alert('Your LinkedIn strategy has been saved to your profile!'); // Confirmation
//         setStrategyStatus(true);
//         localStorage.setItem('hasStrategy', 'true');
  
  
//       } catch (error) {
//         console.error('--- saveStrategy: Error caught:', error);
//         setSaveMessage(`Error: ${error.message}`);
//         alert(`Failed to save strategy: ${error.message}`);
//       } finally {
//         console.log("--- saveStrategy: Finally block executing. ---");
//         setIsSavingStrategy(false);
//       }
//     };
  
  
//     // Main Return JSX (with standard buttons instead of Button component)
  
//     if (!id) { 
//       return <div className="p-8 text-center text-error">Invalid request: Missing submission ID.</div>; 
//     }
    
//     if (error && (!foundationStrategy || !calendarStrategy)) {
//       return (
//         <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-base-200">
//           <div className="card bg-base-100 shadow-xl max-w-lg w-full">
//             <div className="card-body items-center text-center">
//               <h2 className="card-title text-error">Error Generating Strategy</h2>
//               <p>{error}</p>
//               <div className="card-actions justify-center mt-4 gap-4">
//                 <button 
//                   className="btn btn-primary" 
//                   onClick={retryFoundation}
//                 >
//                   Retry
//                 </button>
//                 <Link href="/linkedin-strategy" className="btn btn-outline">
//                   Start Over
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }
  
//     // Main display
//     return (
//       <div className="min-h-screen bg-base-200 p-4 md:p-8">
//         <div className="max-w-5xl mx-auto space-y-8">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-base-content">Your Generated LinkedIn Strategy</h1>
  
//           {/* Message area */}
//           {saveMessage && (
//             <div className={clsx("alert shadow-lg", {
//               "alert-success": saveMessage.includes("success"),
//               "alert-error": saveMessage.includes("Error"),
//               "alert-info": !saveMessage.includes("success") && !saveMessage.includes("Error"),
//             })}>
//               <div><span>{saveMessage}</span></div>
//             </div>
//           )}
  
//           {/* <StrategicFoundationDisplay
//             loading={foundationLoading}
//             strategy={foundationStrategy}
//             onRetry={retryFoundation}
//           /> */}
//             {/* Strategic Foundation Section */}
//            <div className="card bg-base-100 shadow-xl">
//              <div className="card-body">
//                <div className="flex justify-between items-start gap-4">
//                  <h2 className="card-title mb-4">Strategic Foundation</h2>
//                  {!foundationLoading && foundationStrategy && (
//                   <button 
//                     className="btn btn-outline btn-sm" 
//                     onClick={retryFoundation}
//                   >
//                     Regenerate
//                   </button>
//                 )}
//               </div>
//               {foundationLoading ? (
//                 <div className="text-center p-10">
//                   <span className="loading loading-dots loading-lg"></span>
//                   <p className="mt-2">Generating foundation...</p>
//                 </div>
//               ) : foundationStrategy ? (
//                 <MarkdownContent content={foundationStrategy} />
//               ) : (
//                 <div className="text-center p-10 italic text-base-content/70">Waiting for generation...</div>
//               )}
//             </div>
//           </div>
  
//           {/* Action buttons */}
//           <div className="mt-12 flex flex-wrap justify-center gap-4">
//             { hasStrategy ? (
//               <a href="/dashboard/profile" 
//               className="btn btn-secondary">
//               View Profile
//             </a>
//             ) : (
//               <button
//               className="btn btn-primary "
//               onClick={saveStrategy}
//               disabled={!foundationStrategy || !calendarStrategy || !contentCalendar || isSavingStrategy || foundationLoading || calendarLoading}
//             >
//               {isSavingStrategy ? <span className="loading loading-spinner loading-sm mr-2"></span> : null}
//               {isSavingStrategy ? 'Saving...' : 'Save Strategy'}
//             </button>
//             )}
//             <Link href="/dashboard/strategy" className="btn btn-ghost">
//               Generate New Strategy
//             </Link>
//           </div>
  
//         </div>
//       </div>
//     );
//   }

//   export default ResultsContent;

/// ----- new gemini code without local storage -------- /////

"use client";

// --- Imports ---
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import useStrategyStatus from '@/app/hooks/useStrategyStatus'; // Keep if you still use this hook
import MarkdownContent from '@/components/MarkdownContent'; // Added - Adjust path if needed

// --- Component Definition ---
function ResultsContent() {
    console.log("ResultsContent component rendering");

    // In your ResultsContentClient.js, at the beginning:
    const searchParams = useSearchParams();
    console.log("searchParams is:", searchParams);
    console.log("searchParams type:", typeof searchParams);
    console.log("searchParams methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(searchParams)));
    
    const id = searchParams.get('id');
    console.log("ID from URL:", id);
  
    // --- State ---
    const [submission, setSubmission] = useState(null); // Stores fetched submission answers
    const [foundationStrategy, setFoundationStrategy] = useState(null); // Stores generated foundation
    const [calendarStrategy, setCalendarStrategy] = useState(null); // Stores raw generated calendar
    const [contentCalendar, setContentCalendar] = useState(null); // Stores parsed calendar object
    const [foundationLoading, setFoundationLoading] = useState(false); // Loading state for foundation generation
    const [calendarLoading, setCalendarLoading] = useState(false); // Loading state for calendar generation
    const [error, setError] = useState(null); // Stores errors from fetch/generation
    const [isSavingStrategy, setIsSavingStrategy] = useState(false); // Loading state for save button
    const [saveMessage, setSaveMessage] = useState(''); // Message after saving attempt
    const { hasStrategy, setStrategyStatus } = useStrategyStatus(false); // Keep if still used

    // --- Fetch Submission Data via API ---
    useEffect(() => {
      if (!id) { 
        setError('No submission ID found.'); 
        return; 
      }
      // Reset state when ID changes
      setSubmission(null);
      setFoundationStrategy(null);
      setCalendarStrategy(null);
      setContentCalendar(null); 
      setError(null);
      setSaveMessage('');

      // const fetchSubmissionData = async () => {
      //    try {
      //      console.log(`Workspaceing submission data for ID: ${id}`);
      //      // Indicate loading - maybe tie to foundationLoading or a new state?
      //      setFoundationLoading(true); 
      //      const response = await fetch(`/api/get-submission?id=${id}`); // Fetch from API
           
      //      if (!response.ok) {
      //          if (response.status === 404) {
      //             setError('Submission not found. It may have been deleted or expired.');
      //          } else {
      //             throw new Error(`Failed to fetch submission data (${response.status})`);
      //          }
      //          setFoundationLoading(false); // Stop loading on known fetch error
      //          return; 
      //      }
           
      //      const submissionData = await response.json(); 
           
      //      if (!submissionData || !submissionData.answers) {
      //          setError('Invalid submission data received.');
      //          setFoundationLoading(false); // Stop loading on invalid data
      //          return;
      //      }
 
      //      console.log("Submission data fetched:", submissionData);
      //      setSubmission(submissionData); // Set the fetched answers
      //      // Trigger foundation generation now that we have the data
      //      generateFoundation(submissionData); 

      //    } catch (err) {
      //        console.error('Error fetching/processing submission data:', err);
      //        setError('Failed to load submission data.');
      //        setFoundationLoading(false); // Stop loading on general catch error
      //    }
      // };



      /// ////// new claude fetchSubmissionData
      const fetchSubmissionData = async () => {
        try {
          console.log(`Fetching submission data for ID: ${id}`);
          setFoundationLoading(true);
          
          const response = await fetch(`/api/get-submission?id=${id}`);
          
          if (!response.ok) {
            if (response.status === 404) {
              setError('Submission not found. It may have been deleted or expired.');
            } else {
              throw new Error(`Failed to fetch submission data (${response.status})`);
            }
            setFoundationLoading(false);
            return;
          }
          
          // Only parse the JSON response once
          const result = await response.json();
          console.log("Raw API response:", result);
          
          // Validate the result structure properly
          if (!result) {
            console.error("API returned empty response");
            setError('Invalid submission data received.');
            setFoundationLoading(false);
            return;
          }
          
          // Check for different possible data structures
          if (result.submission) {
            // If answers are directly in submission
            if (result.submission.answers) {
              console.log("Using answers from result.submission");
              setSubmission(result.submission);
              generateFoundation(result.submission);
            } 
            // If answers are nested in submissionData
            else if (result.submission.submissionData && result.submission.submissionData.answers) {
              console.log("Using nested answers from result.submission.submissionData");
              setSubmission(result.submission.submissionData);
              generateFoundation(result.submission.submissionData);
            } 
            // No answers found in either location
            else {
              console.error("No answers found in submission data:", result.submission);
              setError('Invalid submission data structure - missing answers.');
              setFoundationLoading(false);
            }
          } 
          // Alternative: Data might be directly in the result without a 'submission' field
          else if (result.answers) {
            console.log("Using answers directly from result");
            setSubmission(result);
            generateFoundation(result);
          }
          // If we can't find answers anywhere in the response
          else {
            console.error("No valid submission structure found in response:", result);
            setError('Invalid submission data structure - cannot locate answers.');
            setFoundationLoading(false);
          }
          
          // Optional cleanup code to delete the temporary submission
          setTimeout(async () => {
            try {
              await fetch(`/api/get-submission?id=${id}&delete=true`);
              console.log("Temporary submission cleaned up");
            } catch (err) {
              console.error("Failed to clean up temporary submission:", err);
            }
          }, 30000); // 30 seconds delay
          
        } catch (err) {
          console.error('Error fetching/processing submission data:', err);
          setError('Failed to load submission data: ' + (err.message || 'Unknown error'));
          setFoundationLoading(false);
        }
      };
 
      fetchSubmissionData();
 
    }, [id]); // Rerun only if the 'id' from the URL changes

    // --- Utility Functions ---
    const extractCalendarData = useCallback((markdownContent) => {
        if (!markdownContent || typeof markdownContent !== 'string') { console.log("extractCalendarData: Invalid markdownContent received."); return null; }
        try {
          const tableHeaderRegex = /\|\s*Week - Day\s*\|.*?\n\|.*?-{3,}.*\|/;
          let headerMatch = markdownContent.match(tableHeaderRegex);
          if (!headerMatch) return null; 
          const tableStartIndex = headerMatch.index;
          const tableContent = markdownContent.substring(tableStartIndex);
          const tableRows = tableContent.split('\n').map(line => line.trim()).filter(line => line.startsWith('|') && line.includes('|', 1)).map(line => line.substring(1, line.endsWith('|') ? line.length - 1 : line.length).split('|').map(cell => cell.trim()));
          if (tableRows.length < 2 || !tableRows[1].some(cell => cell.includes('---'))) return null; 
          const headers = tableRows[0];
          const rows = tableRows.slice(2).map(row => ({ weekDay: row[0] || '', pillar: row[1] || '', topic: row[2] || '', approach: row[3] || '', contentType: row[4] || '' })).filter(row => row.weekDay && !row.weekDay.includes('--'));
          if (rows.length === 0) return null; 
          return { headers, rows };
        } catch (error) { console.error("Error parsing calendar table in extractCalendarData:", error); return null; }
   }, []);


   const generateCalendar = useCallback(async (submissionData, foundation) => {
    if (!submissionData || !foundation) {
        console.error("generateCalendar called without required data", {
            hasSubmissionData: !!submissionData,
            hasFoundation: !!foundation
        });
        return;
    }
    setCalendarLoading(true);
    try {
        console.log("Generating calendar with submission data and foundation");
        
        const response = await fetch('/api/generate-calendar', { 
            method: 'POST', 
            headers: {'Content-Type':'application/json'}, 
            body: JSON.stringify({ ...submissionData, foundation })
        });
        
        if (!response.ok) throw new Error(`Failed to generate content calendar (${response.status})`);
        
        const data = await response.json();
        console.log("Calendar generation response received");
        
        if (!data.calendar) throw new Error("Calendar generation response missing 'calendar' data");
        
        setCalendarStrategy(data.calendar); 
        const parsedCalendar = extractCalendarData(data.calendar);
        setContentCalendar(parsedCalendar);
    } catch (err) { 
        setError(err.message || 'Failed to generate calendar.'); 
        console.error('Error generating calendar:', err); 
    } finally { 
        setCalendarLoading(false);
    }
}, [extractCalendarData]);
 
    // --- Generation Functions ---
    const generateFoundation = useCallback(async (submissionData) => {
      if (!submissionData) {
          console.error("generateFoundation called without submissionData");
          setError("Cannot generate foundation without submission data.");
          return;
      }
      setFoundationLoading(true); 
      setError(null); 
      setSaveMessage('');
      try {
          console.log("Generating foundation with submission data:", submissionData);
          const response = await fetch('/api/generate-foundation', { 
              method: 'POST', 
              headers: {'Content-Type':'application/json'}, 
              body: JSON.stringify(submissionData)
          });
          
          if (!response.ok) throw new Error(`Failed to generate strategy foundation (${response.status})`);
          
          const data = await response.json();
          console.log("Foundation generation response:", data);
          
          if (!data.foundation) throw new Error("Foundation generation response missing 'foundation' data.");
          
          setFoundationStrategy(data.foundation);
          
          // Explicitly call calendar generation after foundation is set
          console.log("Foundation generated successfully, now generating calendar...");
          await generateCalendar(submissionData, data.foundation);
      } catch (err) { 
          setError(err.message || 'Failed to generate foundation.'); 
          console.error('Error generating foundation:', err); 
      } finally {
          setFoundationLoading(false);
      }
  }, [generateCalendar]);

    // --- Action Functions ---
    const retryFoundation = () => { 
        // Only proceed if we have the initial submission data
        if (submission) { 
            console.log("Retrying foundation generation...");
            setFoundationStrategy(null); // Clear previous results
            setCalendarStrategy(null); 
            setContentCalendar(null); 
            setError(null); // Clear errors before retry
            setSaveMessage('');
            generateFoundation(submission); // Regenerate using original answers
        } else {
            setError("Cannot retry - initial submission data is missing.");
        }
    };
    
    // Note: retryCalendar function was marked unused previously, keep commented/removed if not needed
    // const retryCalendar = () => { if (submission && foundationStrategy) { setCalendarStrategy(null); setContentCalendar(null); generateCalendar(submission, foundationStrategy);} };
  
    // --- Save Strategy Function ---
    const saveStrategy = async () => {
      console.log("--- saveStrategy started ---");
      if (!submission || !foundationStrategy || !calendarStrategy || !contentCalendar) {
        console.log("--- saveStrategy: Aborted - data incomplete ---", { 
          submission: !!submission, 
          foundationStrategy: !!foundationStrategy, 
          calendarStrategy: !!calendarStrategy, 
          contentCalendar: !!contentCalendar 
        });
        setSaveMessage("Error: Strategy data is incomplete for saving.");
        alert("Cannot save - generated strategy data is incomplete.");
        return;
      }
      setIsSavingStrategy(true);
      setSaveMessage('Saving strategy...'); 
      try {
        const payload = {
          submissionId: id,
          answers: submission.answers,
          foundation: foundationStrategy,
          calendar: calendarStrategy, 
          contentCalendar,
          overwrite: true // Add this flag to indicate overwriting existing strategy
        };
        console.log("--- saveStrategy: Sending Payload to /api/profile/save-strategy");
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
            errorDetails = errData.details || errData.error || errorDetails;
          } catch (e) { /* ignore parsing error */ }
          throw new Error(errorDetails);
        }
    
        const resultData = await response.json(); 
        console.log("--- saveStrategy: Response OK.", resultData);
        setSaveMessage('Strategy saved successfully!');
        alert('Your LinkedIn strategy has been saved to your profile!'); 
        setStrategyStatus(true);
      } catch (error) {
        console.error('--- saveStrategy: Error caught:', error);
        setSaveMessage(`Error: ${error.message}`);
        alert(`Failed to save strategy: ${error.message}`);
      } finally {
        console.log("--- saveStrategy: Finally block executing ---");
        setIsSavingStrategy(false);
      }
    };
    
    // --- Main Return JSX ---
    if (!id) { 
      return <div className="p-8 text-center text-error">Invalid request: Missing submission ID.</div>; 
    }
    
    // Display primary error first if it exists and foundation hasn't loaded
    if (error && !foundationStrategy) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-base-200">
          <div className="card bg-base-100 shadow-xl max-w-lg w-full">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-error">Error Loading Strategy</h2>
              <p>{error}</p>
              <div className="card-actions justify-center mt-4 gap-4">
                {/* Show Retry only if we have submission data to retry with */}
                {submission && ( 
                  <button 
                    className="btn btn-primary" 
                    onClick={retryFoundation} 
                    disabled={foundationLoading || calendarLoading} // Disable if already loading
                  >
                    Retry
                  </button>
                )}
                <Link href="/linkedin-strategy" className="btn btn-outline"> 
                  Start Over {/* Always allow starting over */}
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    // Main successful display area
    return (
      <div className="min-h-screen bg-base-200 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-base-content">Your Generated LinkedIn Strategy</h1>
  
          {/* Message area for save status */}
          {saveMessage && (
            <div className={clsx("alert shadow-lg", {
              "alert-success": saveMessage.includes("success"),
              "alert-error": saveMessage.includes("Error"),
              "alert-info": !saveMessage.includes("success") && !saveMessage.includes("Error"),
            })}>
              <div><span>{saveMessage}</span></div>
            </div>
          )}
          
          {/* Optional: Display calendar generation error separately if needed */}
          {/* {calendarError && <div className="alert alert-warning">...</div>} */}

          {/* --- Strategic Foundation Section (Inline JSX) --- */}
           <div className="card bg-base-100 shadow-xl">
             <div className="card-body">
               <div className="flex justify-between items-start gap-4">
                 <h2 className="card-title mb-4">Strategic Foundation</h2>
                 {/* Show Regenerate button only if not loading and strategy exists */}
                 {!foundationLoading && foundationStrategy && submission && (
                  <button 
                    className="btn btn-outline btn-sm" 
                    onClick={retryFoundation}
                    disabled={foundationLoading || calendarLoading} // Disable if generating anything
                  >
                    Regenerate
                  </button>
                )}
              </div>
              {foundationLoading ? (
                <div className="text-center p-10">
                  <span className="loading loading-dots loading-lg"></span>
                  <p className="mt-2">Generating foundation...</p>
                </div>
              ) : foundationStrategy ? (
                // Use MarkdownContent to render the strategy
                <MarkdownContent content={foundationStrategy} /> 
              ) : (
                // Show only if not loading and no strategy (should be covered by error state usually)
                <div className="text-center p-10 italic text-base-content/70">
                  Waiting for foundation generation...
                </div>
              )}
            </div>
          </div>
          {/* --- End of Inline Strategic Foundation Section --- */}

          {/* --- Optional: Calendar Display Section (Placeholder) --- */}
          {/* You would add logic here to display the 'calendarStrategy' (raw markdown) 
              or the 'contentCalendar' (parsed object) using maybe another MarkdownContent 
              or a table component, potentially checking 'calendarLoading' state */}
           {/* <div className="card bg-base-100 shadow-xl">
             <div className="card-body">
               <h2 className="card-title mb-4">Content Calendar</h2>
                {calendarLoading ? (
                    <div className="text-center p-10"><span className="loading loading-spinner loading-lg"></span><p>Generating calendar...</p></div>
                ) : calendarStrategy ? (
                    <MarkdownContent content={calendarStrategy} /> // Display raw calendar markdown for now
                    // Or render the parsed 'contentCalendar' object into a table here
                ) : foundationStrategy ? ( // Only show waiting if foundation is done but calendar isn't loading/ready
                    <div className="text-center p-10 italic text-base-content/70">Waiting for calendar generation...</div>
                ) : null}
             </div>
            </div> */}
          {/* --- End Calendar Display Section --- */}

          {/* --- Action buttons --- */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {/* Show the Save button regardless of hasStrategy state */}
            <button
              className="btn btn-primary"
              onClick={saveStrategy}
              disabled={!submission || !foundationStrategy || !calendarStrategy || !contentCalendar || isSavingStrategy || foundationLoading || calendarLoading}
            >
              {isSavingStrategy ? <span className="loading loading-spinner loading-sm mr-2"></span> : null}
              {isSavingStrategy ? 'Saving...' : hasStrategy ? 'Update Strategy' : 'Save Strategy to Profile'}
            </button>

            {/* Show the View Calendar button if hasStrategy is true */}
            {hasStrategy && (
              <a href="/dashboard/calendar" className="btn btn-secondary"> 
                View Calendar
              </a>
            )}

            <Link href="/dashboard/strategy" className="btn btn-ghost">
              Generate New Strategy
            </Link>
          </div>
  
        </div>
      </div>
    );
}

// Export the main component function
export default ResultsContent;