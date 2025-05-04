

/// ----- new gemini code without local storage -------- /////

// dashboard/results/ResultsContentClient.js
"use client";

// --- Imports ---
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import useStrategyStatus from '@/app/hooks/useStrategyStatus'; // Keep if you still use this hook
import MarkdownContent from '@/components/MarkdownContent';



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
                <Link href="/dashboard/strategy" className="btn btn-outline"> 
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

                //  commented out for error testing
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
        {/* --- Action buttons with updated logic --- */}
        <div className="mt-12 flex flex-col items-center gap-4">
          {/* Primary action - Save Strategy (made more prominent) */}
          <button
            className="btn btn-primary  md:w-auto"
            onClick={saveStrategy}
            disabled={!submission || !foundationStrategy || !calendarStrategy || !contentCalendar || isSavingStrategy || foundationLoading || calendarLoading}
          >
            {isSavingStrategy ? <span className="loading loading-spinner loading-sm mr-2"></span> : null}
            {isSavingStrategy ? 'Saving...' : 'Save Strategy to Profile'}
          </button>

          {/* Information alert to emphasize the importance of saving */}
          {!isSavingStrategy && !saveMessage.includes("success") && (
            <div className="alert alert-warning shadow-lg">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>You must save your strategy before you can view or access your content calendar.</span>
              </div>
            </div>
          )}

          {/* Secondary actions - Only show View Calendar if strategy was successfully saved */}
          <div className="flex flex-wrap justify-center gap-4">
            {saveMessage.includes("success") && (
              <Link href="/dashboard/calendar" className="btn btn-secondary">
                View Calendar
              </Link>
            )}

            {/* Generate New Strategy - always available */}
            <Link href="/dashboard/strategy" className="btn btn-ghost">
              Generate New Strategy
            </Link>
          </div>
        </div>
  
        </div>
      </div>
    );
}

// Export the main component function
export default ResultsContent;