

// ///// final code from gemini?

// // // app/dashboard/profile/page.js
// // "use client";

// // import { addDays, format, getDay, nextMonday, startOfDay } from 'date-fns'
// // import { useEffect, useState, Suspense } from 'react';
// // import { useSession } from 'next-auth/react';
// // import Link from 'next/link'; // Import Link
// // import ReactMarkdown from 'react-markdown';
// // import remarkGfm from 'remark-gfm';
// // import clsx from 'clsx'; // Optional but helpful for conditional classes

// // // --- Reusable Button Component (or import from components/Button.jsx) ---
// // const Button = ({
// //   children, onClick, type = 'button', variant = 'primary', size = 'md', disabled = false, className = '', ...props
// // }) => {
// //   const baseStyles = 'inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';
// //   const variants = {
// //     primary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500', // Changed 'cta' to 'primary' for general use
// //     secondary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
// //     info: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400',
// //     success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
// //     ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-indigo-500 border-none shadow-none',
// //     outline: 'bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-indigo-500',
// //   };
// //   const sizes = {
// //     xs: 'px-2.5 py-1.5 text-xs',
// //     sm: 'px-3 py-1.5 text-sm',
// //     md: 'px-4 py-2 text-sm',
// //     lg: 'px-5 py-2.5 text-base',
// //   };
// //   const combinedClassName = clsx( baseStyles, variants[variant] || variants.primary, sizes[size] || sizes.md, className );
// //   return ( <button type={type} onClick={onClick} disabled={disabled} className={combinedClassName} {...props}> {children} </button> );
// // };
// // // --- End Button Component ---

// // // --- Markdown Component (or import) ---
// // const MarkdownContent = ({ content, className = "prose prose-lg max-w-none" }) => (
// //     content ? <div className={className}><ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown></div> : <p className="italic text-gray-500">No content available.</p>
// // );
// // // --- End Markdown Component ---

// // // --- Calendar Table Component (or import) ---

// // //// new version with dates /////// ///// // -----

// // // --- Updated ContentCalendarTable definition using date-fns ---
// // const ContentCalendarTable = ({ calendar, savedPosts, generatingPostId, handleGeneratePost, handleViewPost, startDate }) => {
// //   if (!calendar || !calendar.rows || calendar.rows.length === 0) {
// //       return <p className="text-center text-gray-500 italic my-4">No calendar data available to display.</p>;
// //   }
// //   const postsLookup = savedPosts || [];

// //   // Helper function moved inside or defined above component
// //   const addWeekdays = (date, daysToAdd) => {
// //     if (!date) return null;
// //     let currentDate = date;
// //     let addedDays = 0;
// //     // Loop until we have added the required number of weekdays
// //     while (addedDays < daysToAdd) {
// //       currentDate = addDays(currentDate, 1); // Add one calendar day
// //       const dayOfWeek = getDay(currentDate); // 0=Sun, 1=Mon... 6=Sat
// //       // Only count it if it's not Sunday (0) or Saturday (6)
// //       if (dayOfWeek !== 0 && dayOfWeek !== 6) {
// //         addedDays++;
// //       }
// //     }
// //     return currentDate;
// //   };

// //   return (
// //     <div className="overflow-x-auto my-6 shadow border border-base-300 rounded-lg">
// //       <table className="w-full border-collapse table-auto">
// //         <thead className="bg-base-200">
// //           <tr>
// //             {/* Updated Header */}
// //             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Date</th>
// //             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Pillar</th>
// //             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Topic</th>
// //             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Approach</th>
// //             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Content Type</th>
// //             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody className="bg-base-100 divide-y divide-base-200">
// //           {calendar.rows.map((row, index) => {
// //             const isPostSaved = postsLookup.some(post => post.postIndex === index);

// //             // Calculate the date for this row using the helper
// //             const currentDate = addWeekdays(startDate, index);

// //             // Format the date using date-fns format function
// //             const formattedDate = currentDate
// //               ? format(currentDate, 'EEE, MMM d') // Example: "Mon, Apr 21"
// //               : 'Calculating...'; // Fallback while loading/calculating startDate

// //             return (
// //               <tr key={index} className="hover:bg-base-200/50">
// //                 {/* Use formattedDate */}
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content whitespace-nowrap">{formattedDate}</td>
// //                 {/* Other cells */}
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.pillar || '-'}</td>
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.topic || '-'}</td>
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.approach || '-'}</td>
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.contentType || '-'}</td>
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-center whitespace-nowrap">
// //                   {/* Conditional Button Logic */}
// //                   {isPostSaved ? (
// //                      <Button size="xs" variant="info" onClick={() => handleViewPost(index)}>View Post</Button>
// //                   ) : (
// //                      <Button size="xs" variant="success" onClick={() => handleGeneratePost(row.pillar, row.topic, row.approach, row.contentType, index)} disabled={generatingPostId === index}>
// //                        {generatingPostId === index ? 'Generating...' : 'Generate Post'}
// //                      </Button>
// //                    )}
// //                 </td>
// //               </tr>
// //             );
// //           })}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // //// ------- end -------- //////








// // // const ContentCalendarTable = ({ calendar, savedPosts, generatingPostId, handleGeneratePost, handleViewPost }) => {
// // //   if (!calendar || !calendar.rows || calendar.rows.length === 0) {
// // //     return <p className="text-center text-gray-500 italic my-4">No calendar data available to display.</p>;
// // //   }
// // //   const postsLookup = savedPosts || [];

// // //   return (
// // //     <div className="overflow-x-auto my-6 shadow border border-base-300 rounded-lg">
// // //       <table className="w-full border-collapse table-auto">
// // //         <thead className="bg-base-200">
// // //           <tr>
// // //             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Week - Day</th>
// // //             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Pillar</th>
// // //             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Topic</th>
// // //             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Approach</th>
// // //             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Content Type</th>
// // //             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Actions</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody className="bg-base-100 divide-y divide-base-200">
// // //           {calendar.rows.map((row, index) => {
// // //             const isPostSaved = postsLookup.some(post => post.postIndex === index);
// // //             return (
// // //               <tr key={index} className="hover:bg-base-200/50">
// // //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content whitespace-nowrap">{row.weekDay || '-'}</td>
// // //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.pillar || '-'}</td>
// // //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.topic || '-'}</td>
// // //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.approach || '-'}</td>
// // //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.contentType || '-'}</td>
// // //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-center whitespace-nowrap">
// // //                   {isPostSaved ? (
// // //                     <Button size="xs" variant="info" onClick={() => handleViewPost(index)}>View Post</Button>
// // //                   ) : (
// // //                     <Button
// // //                       size="xs"
// // //                       variant="success"
// // //                       onClick={() => handleGeneratePost(row.pillar, row.topic, row.approach, row.contentType, index)}
// // //                       disabled={generatingPostId === index}
// // //                     >
// // //                       {generatingPostId === index ? 'Generating...' : 'Generate Post'}
// // //                     </Button>
// // //                   )}
// // //                 </td>
// // //               </tr>
// // //             );
// // //           })}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // };
// // // --- End Calendar Table Component ---


// // // --- Main Page Component ---
// // export default function SavedStrategyPage() {
// //   const { data: session, status: sessionStatus } = useSession();

// //   // State
// //   const [calendarStartDate, setCalendarStartDate] = useState(null); // State for start date
// //   const [strategyData, setStrategyData] = useState(null); // Holds the fetched linkedinStrategy object
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [activeTab, setActiveTab] = useState('foundation'); // Default tab
// //   const [generatingPostId, setGeneratingPostId] = useState(null); // Loading state for generate button (index)
// //   const [postToShowInModal, setPostToShowInModal] = useState(null); // Content for the modal
// //   const [showPostModal, setShowPostModal] = useState(false);
// //   const [modalPostIndex, setModalPostIndex] = useState(null); // Index of post in modal

// //   // Data Fetching Function
// //   const fetchProfileData = async () => {
// //      // Only fetch if session is loaded and authenticated
// //      if (sessionStatus === 'authenticated') {
// //        let fetchedStrategyData = null;
// //        let fetchError = null;
// //        try {
// //          console.log('Fetching profile data...');
// //          setIsLoading(true); // Ensure loading is true at start
// //          const response = await fetch('/api/profile');
// //          console.log('Profile fetch response status:', response.status);
// //          if (!response.ok) throw new Error(`Failed to fetch profile (${response.status})`);
// //          const data = await response.json();
// //          console.log('Profile data received:', data);

// //          if (data.profile?.linkedinStrategy) {
// //            console.log('Saved strategy found.');
// //            fetchedStrategyData = data.profile.linkedinStrategy;
// //          } else {
// //            console.log('No saved LinkedIn strategy found in profile.');
// //            fetchedStrategyData = null; // Explicitly set to null if not found
// //          }
// //        } catch (err) {
// //          console.error('Error fetching profile:', err);
// //          fetchError = err.message || 'An error occurred while fetching data.';
// //          fetchedStrategyData = null;
// //        } finally {
// //          setStrategyData(fetchedStrategyData);
// //          setError(fetchError);
// //          setIsLoading(false);
// //        }
// //      } else if (sessionStatus === 'loading') {
// //        setIsLoading(true); // Still loading session
// //      } else { // Unauthenticated
// //        setIsLoading(false);
// //        setError('Please log in to view your saved strategy.');
// //      }
// //   };


// //   // Initial Data Load
// //   // useEffect(() => {
// //   //   fetchProfileData();
// //   // }, [sessionStatus]); // Re-run only when session status changes

// //   useEffect(() => {
// //     const fetchProfileData = async () => {
// //       // Only fetch if session is loaded and authenticated
// //       if (sessionStatus === 'authenticated') {
// //         let fetchedStrategyData = null;
// //         let fetchError = null;
// //         try {
// //           console.log('Fetching profile data...');
// //           setIsLoading(true);
// //           const response = await fetch('/api/profile');
// //           console.log('Profile fetch response status:', response.status);
// //           if (!response.ok) throw new Error(`Failed to fetch profile (${response.status})`);
// //           const data = await response.json();
// //           console.log('Profile data received:', data);

// //           if (data.profile?.linkedinStrategy) {
// //             console.log('Saved strategy found.');
// //             // Set the main strategy data state
// //             setStrategyData(data.profile.linkedinStrategy);

// //             // --- Calculate and Set Start Date RIGHT HERE ---
// //             const today = startOfDay(new Date()); // Use startOfDay from date-fns
// //             const nextMon = getDay(today) === 1 ? today : nextMonday(today); // Use getDay and nextMonday from date-fns
// //             setCalendarStartDate(nextMon); // Set the dedicated state for the start date
// //             console.log('Calculated Calendar Start Date:', nextMon);
// //             // --- End Calculate Start Date ---

// //             setError(null); // Clear previous errors
// //           } else {
// //             console.log('No saved LinkedIn strategy found in profile.');
// //             fetchedStrategyData = null; // Set strategy data to null
// //             // No redirect needed here based on our last discussion
// //           }
// //         } catch (err) {
// //            console.error('Error fetching profile:', err);
// //            fetchError = err.message || 'An error occurred while fetching data.';
// //            fetchedStrategyData = null; // Ensure data is null on error
// //         } finally {
// //             // Set state based on fetch results
// //             // Note: setStrategyData is already handled inside the if/else/catch
// //             setError(fetchError);
// //             setIsLoading(false);
// //         }
// //       } else if (sessionStatus === 'loading') {
// //         setIsLoading(true);
// //       } else { // Unauthenticated
// //         setIsLoading(false);
// //         setError('Please log in to view your saved strategy.');
// //       }
// //     }; // End of fetchProfileData function definition

// //     fetchProfileData(); // Call the function

// //   }, [sessionStatus]); // Dependency array

// //   // Extracted data (handle potential null state during render)
// //   const foundation = strategyData?.foundation;
// //   const contentCalendar = strategyData?.contentCalendar;
// //   const savedPosts = strategyData?.savedPosts || [];

// //   // --- Handlers ---// Replace your handleGeneratePost with this version:
// //   const handleGeneratePost = async (pillar, topic, approach, contentType, index) => {
// //     // Check if strategy data (needed for payload) is loaded
// //     if (!strategyData?.answers) {
// //         console.error("Cannot generate post, strategyData or strategyData.answers not loaded.");
// //         alert("Could not load required strategy data to generate post.");
// //         return;
// //     }
// //     console.log("handleGeneratePost called for index:", index);
// //     let generatedContent = null;
// //     try {
// //       setGeneratingPostId(index);
// //       setPostToShowInModal("Generating...");
// //       setModalPostIndex(index);
// //       setShowPostModal(true);

// //       // Define the payload using data from arguments and state
// //       const payload = {
// //         pillar, topic, approach, contentType,
// //         userVoice: strategyData.answers.userVoice, // Use checked strategyData
// //         uniquePerspective: strategyData.answers.uniquePerspective // Use checked strategyData
// //       };
// //       console.log("--- handleGeneratePost: Sending this payload to /api/create-post:", payload);

// //       // --- Make sure the fetch options are present and correct ---
// //       const response = await fetch('/api/create-post', {
// //         method: 'POST', // Specify POST
// //         headers: {
// //           'Content-Type': 'application/json' // Specify JSON content
// //         },
// //         body: JSON.stringify(payload) // Send the payload as JSON string
// //       });
// //       // --- End of fetch options ---

// //       console.log("--- handleGeneratePost: Received response - Status:", response.status, "OK:", response.ok);

// //       if (!response.ok) {
// //         let errorBody = null;
// //         try {
// //             errorBody = await response.json();
// //             console.error("--- handleGeneratePost: Error response body:", errorBody);
// //         } catch (e) {
// //             console.error("--- handleGeneratePost: Could not parse error response body. Response text might be:", await response.text().catch(() => "Could not read response text"));
// //         }
// //         throw new Error(`Failed to generate post. Status: ${response.status}`);
// //       }

// //       // If response is OK
// //       const data = await response.json();
// //       generatedContent = data.post;
// //       setPostToShowInModal(generatedContent); // Update modal with actual content

// //     } catch (error) {
// //       console.error('Error generating post:', error);
// //       alert(`Failed to generate post: ${error.message}`); // Show error message in alert
// //       // Optionally close modal on error or show error state in modal
// //       setShowPostModal(false);
// //       setModalPostIndex(null);
// //       setPostToShowInModal(null);
// //     } finally {
// //       setGeneratingPostId(null); // Reset loading state for the button
// //     }
// //   };

// //   const handleViewPost = (index) => {
// //     console.log("handleViewPost called for index:", index);
// //     const postToView = savedPosts.find(post => post.postIndex === index);
// //     if (postToView) {
// //       setPostToShowInModal(postToView.content);
// //       setModalPostIndex(index);
// //       setShowPostModal(true);
// //     } else {
// //       console.error("Could not find saved post for index:", index);
// //       alert("Could not find the saved post.");
// //     }
// //   };

// //  const savePost = async () => {
// //     console.log("--- savePost: Function started ---");
// //     // Check prerequisites carefully
// //     if (postToShowInModal === "Generating..." || !postToShowInModal || modalPostIndex === null) {
// //        console.log(`--- savePost: Aborted - Invalid state: postToShowInModal: ${postToShowInModal}, modalPostIndex: ${modalPostIndex} ---`);
// //        return;
// //     }
// //     if (!contentCalendar?.rows?.[modalPostIndex]) {
// //         console.error("--- savePost: Aborted - Could not find calendar row for index:", modalPostIndex);
// //         alert("Internal error: Cannot find calendar data for this post.");
// //         return;
// //     }
// //     const calendarRow = contentCalendar.rows[modalPostIndex];

// //     try {
// //       const bodyPayload = { /* ... construct payload using calendarRow and postToShowInModal ... */ };
// //        // Assign values explicitly
// //        bodyPayload.content = postToShowInModal;
// //        bodyPayload.postIndex = modalPostIndex;
// //        bodyPayload.pillar = calendarRow.pillar;
// //        bodyPayload.topic = calendarRow.topic;
// //        bodyPayload.approach = calendarRow.approach;
// //        bodyPayload.contentType = calendarRow.contentType;
// //        bodyPayload.weekDay = calendarRow.weekDay;

// //       console.log("--- savePost: Sending this payload:", bodyPayload);
// //       const response = await fetch('/api/posts/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bodyPayload) });
// //       console.log("--- savePost: Received response - Status:", response.status, "OK:", response.ok);

// //       if (!response.ok) { /* ... error handling ... */ throw new Error(`Save failed: ${response.status}`); }

// //       console.log("--- savePost: Response OK. Showing success alert.");
// //       alert('Post saved successfully!');
// //       setShowPostModal(false);
// //       setModalPostIndex(null);
// //       setPostToShowInModal(null);
// //       fetchProfileData(); // Re-fetch profile to update UI

// //     } catch (error) { /* ... error handling ... */ }
// //      finally { /* ... finally block ... */ }
// //   };

// //   const copyToClipboard = (text) => { /* ... implementation ... */ };

// //   // --- Main Return JSX ---

// //   if (isLoading) {
// //     return <div className="flex justify-center items-center min-h-[300px]"><span className="loading loading-lg"></span></div>;
// //   }

// //   // Show error if fetch failed
// //   if (error && !strategyData) {
// //      return (
// //         <div className="p-4 md:p-8">
// //              <div className="alert alert-error shadow-lg">
// //                 <div>
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
// //                     <span>Error: {error}</span>
// //                 </div>
// //              </div>
// //         </div>
// //      );
// //   }

// //   // Show message and link if loading is done, no error, but no strategy found
// //   if (!strategyData) {
// //     return (
// //       <div className="space-y-6 p-4 md:p-8 text-center max-w-md mx-auto">
// //          <h1 className="text-2xl md:text-3xl font-bold">No Strategy Found</h1>
// //          <p className="text-base-content/80">
// //            You haven't generated and saved your LinkedIn strategy yet. Get started now!
// //          </p>
// //          <Link href="/linkedin-strategy" className="btn btn-primary">
// //              Generate Your Strategy
// //          </Link>
// //       </div>
// //     );
// //   }

// //   // If loading done, no error, and strategyData EXISTS, render the tabs
// //   return (
// //     <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
// //       <h1 className="text-3xl md:text-4xl font-extrabold">My Saved Strategy & Calendar</h1>

// //       {/* Tab Buttons */}
// //       <div role="tablist" className="tabs tabs-bordered">
// //         <button role="tab" className={clsx("tab", activeTab === 'foundation' && "tab-active")} onClick={() => setActiveTab('foundation')}>Strategy Foundation</button>
// //         <button role="tab" className={clsx("tab", activeTab === 'calendar' && "tab-active")} onClick={() => setActiveTab('calendar')}>Content Calendar</button>
// //         <button role="tab" className={clsx("tab", activeTab === 'posts' && "tab-active")} onClick={() => setActiveTab('posts')}>Saved Posts ({savedPosts.length})</button>
// //       </div>

// //       {/* Tab Content */}
// //       <div className="mt-6">
// //         {activeTab === 'foundation' && (
// //             <div className="card bg-base-100 shadow-xl"><div className="card-body">
// //                 <h2 className="card-title mb-4">Strategy Foundation</h2>
// //                 <MarkdownContent content={foundation} />
// //             </div></div>
// //         )}
// //         {activeTab === 'calendar' && (
// //              <div className="card bg-base-100 shadow-xl"><div className="card-body">
// //                 <h2 className="card-title mb-2">Content Calendar</h2>
// //                 <p className="text-sm mb-4 text-base-content/70">Generate posts for your plan or view saved ones.</p>
// //                 <ContentCalendarTable
// //                    calendar={contentCalendar}
// //                    savedPosts={savedPosts}
// //                    generatingPostId={generatingPostId}
// //                    handleGeneratePost={handleGeneratePost}
// //                    handleViewPost={handleViewPost}
// //                    startDate={calendarStartDate} // <-- PASS THE START DATE PROP

// //                  />
// //              </div></div>
// //         )}
// //          {activeTab === 'posts' && (
// //              <div className="card bg-base-100 shadow-xl"><div className="card-body">
// //                 <h2 className="card-title mb-4">Saved Posts</h2>
// //                 {savedPosts.length > 0 ? (
// //                    <div className="space-y-4">
// //                       {savedPosts.slice().sort((a, b) => (a.postIndex || 0) - (b.postIndex || 0)) // Sort by index just in case
// //                           .map((post, loopIndex) => (
// //                           <div key={post._id || post.postIndex || loopIndex} className="border border-base-300 rounded-lg p-4 bg-base-200/30">
// //                              <div className="flex justify-between items-center mb-2 text-xs text-base-content/70">
// //                                 <span>Index: {post.postIndex ?? 'N/A'} | Day: {post.weekDay || 'N/A'}</span>
// //                                 {post.savedAt && <span>Saved: {new Date(post.savedAt).toLocaleDateString()}</span>}
// //                              </div>
// //                              <p className="text-sm font-semibold mb-1">Pillar: {post.pillar || 'N/A'}</p>
// //                              <p className="text-sm mb-3">Topic: {post.topic || 'N/A'}</p>
// //                              <MarkdownContent content={post.content || ''} className="prose prose-sm max-w-none bg-white p-3 rounded border border-base-300" />
// //                              <div className="mt-3 text-right">
// //                                 <Button variant="outline" size="xs" onClick={() => copyToClipboard(post.content)}>Copy Post</Button>
// //                              </div>
// //                           </div>
// //                       ))}
// //                    </div>
// //                  ) : (
// //                    <p className="text-center text-gray-500 italic my-4">No posts have been saved yet.</p>
// //                  )}
// //             </div></div>
// //         )}
// //       </div>

// //       {/* Post Modal */}
// //       {showPostModal && (
// //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// //             <div className="bg-base-100 rounded-lg shadow-xl p-6 max-w-3xl w-full max-h-[90vh] flex flex-col">
// //                 <h2 className="text-xl font-bold mb-4 text-base-content flex-shrink-0">
// //                     {savedPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal)
// //                       ? `Viewing Saved Post (Row ${modalPostIndex !== null ? modalPostIndex + 1 : 'N/A'})`
// //                       : `Generated Post (Row ${modalPostIndex !== null ? modalPostIndex + 1 : 'N/A'})`
// //                     }
// //                 </h2>
// //                 <div className="flex-grow overflow-y-auto mb-6 pr-2 border rounded-md bg-white p-4"> {/* Scrollable content area */}
// //                    {postToShowInModal === "Generating..." ? (
// //                      <div className="text-center p-10"><span className="loading loading-dots loading-md"></span></div>
// //                    ) : (
// //                      <MarkdownContent content={postToShowInModal || ''} className="prose prose-sm max-w-none" />
// //                    )}
// //                 </div>
// //                 <div className="flex-shrink-0 mt-auto flex flex-wrap justify-end gap-2">
// //                     <Button variant="ghost" size="sm" onClick={() => { setShowPostModal(false); setModalPostIndex(null); setPostToShowInModal(null); }}>Close</Button>
// //                     <Button variant="outline" size="sm" onClick={() => copyToClipboard(postToShowInModal)} disabled={!postToShowInModal || postToShowInModal === "Generating..."}>Copy</Button>
// //                     {/* Only show Save button if it's newly generated content */}
// //                     {postToShowInModal && postToShowInModal !== "Generating..." && !savedPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) && (
// //                        <Button variant="primary" size="sm" onClick={savePost}>Save Post</Button>
// //                     )}
// //               </div>
// //             </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// //// ///// ///// lastest code with new dates added /////////

// // app/dashboard/profile/page.js
// "use client";

// // React & Next.js Hooks
// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import Link from 'next/link'; // For the "Generate Strategy Here" link

// // UI & Utility Libraries
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import clsx from 'clsx'; // For conditional classes (npm install clsx)
// import { addDays, format, getDay, nextMonday, startOfDay } from 'date-fns'; // For date calculations (npm install date-fns)

// // components
// import MarkdownContent from '@/components/MarkDownContent';
// import Button from '@/components/Button';


// // --- Reusable Button Component (Consider moving to components/Button.jsx) ---
// // const Button = ({
// //   children, onClick, type = 'button', variant = 'primary', size = 'md', disabled = false, className = '', ...props
// // }) => {
// //   const baseStyles = 'inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';
// //   const variants = {
// //     primary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
// //     secondary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
// //     info: 'bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500', // Using sky for 'info'
// //     success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
// //     ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-indigo-500 border-none shadow-none',
// //     outline: 'bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-indigo-500',
// //   };
// //   const sizes = {
// //     xs: 'px-2.5 py-1.5 text-xs',
// //     sm: 'px-3 py-1.5 text-sm',
// //     md: 'px-4 py-2 text-sm',
// //     lg: 'px-5 py-2.5 text-base',
// //   };
// //   const combinedClassName = clsx( baseStyles, variants[variant] || variants.primary, sizes[size] || sizes.md, className );
// //   return ( <button type={type} onClick={onClick} disabled={disabled} className={combinedClassName} {...props}> {children} </button> );
// // };

// // --- Markdown Component (Consider moving to components/MarkdownContent.jsx) ---
// // const MarkdownContent = ({ content, className = "prose prose-lg max-w-none" }) => (
// //     content ? <div className={className}><ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown></div> : <p className="italic text-gray-500">No content available.</p>
// // );

// // --- Calendar Table Component (Consider moving to components/ContentCalendarTable.jsx) ---
// const ContentCalendarTable = ({ calendar, savedPosts, generatingPostId, handleGeneratePost, handleViewPost, startDate }) => {
//   if (!calendar || !calendar.rows || calendar.rows.length === 0) {
//     return <p className="text-center text-gray-500 italic my-4">No calendar data available to display.</p>;
//   }
//   // Ensure savedPosts is treated as an array for the .some() check
//   const postsLookup = Array.isArray(savedPosts) ? savedPosts : [];

//   // Helper to add weekdays using date-fns
//   const addWeekdays = (date, daysToAdd) => {
//     if (!date || !(date instanceof Date) || isNaN(date)) return null; // Added validation for startDate
//     let currentDate = date;
//     let addedDays = 0;
//     while (addedDays < daysToAdd) {
//       currentDate = addDays(currentDate, 1);
//       const dayOfWeek = getDay(currentDate); // 0=Sun, 6=Sat
//       if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//         addedDays++;
//       }
//     }
//     return currentDate;
//   };

//   return (
//     <div className="overflow-x-auto my-6 shadow border border-base-300 rounded-lg">
//       <table className="w-full border-collapse table-auto">
//         <thead className="bg-base-200">
//           <tr>
//             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Date</th>
//             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Pillar</th>
//             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Topic</th>
//             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Approach</th>
//             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Content Type</th>
//             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="bg-base-100 divide-y divide-base-200">
//           {calendar.rows.map((row, index) => {
//             const isPostSaved = postsLookup.some(post => post.postIndex === index);
//             const currentDate = addWeekdays(startDate, index);
//             const formattedDate = currentDate
//               ? format(currentDate, 'EEE, MMM d') // e.g., "Mon, Apr 21"
//               : 'Invalid Start Date'; // Indicate if startDate wasn't valid

//             return (
//               <tr key={index} className="hover:bg-base-200/50">
//                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content whitespace-nowrap">{formattedDate}</td>
//                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.pillar || '-'}</td>
//                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.topic || '-'}</td>
//                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.approach || '-'}</td>
//                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.contentType || '-'}</td>
//                 <td className="px-4 py-3 border-b border-base-300 text-sm text-center whitespace-nowrap">
//                   {isPostSaved ? (
//                      <Button size="xs" variant="info" onClick={() => handleViewPost(index)}>View Post</Button>
//                   ) : (
//                      <Button size="xs" variant="success" onClick={() => handleGeneratePost(row.pillar, row.topic, row.approach, row.contentType, index)} disabled={generatingPostId === index}>
//                        {generatingPostId === index ? 'Generating...' : 'Generate Post'}
//                      </Button>
//                    )}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };


// // --- Main Page Component ---
// export default function SavedStrategyPage() {
//   const { data: session, status: sessionStatus } = useSession();

//   // State
//   const [strategyData, setStrategyData] = useState(null); // Holds the fetched linkedinStrategy object
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('foundation'); // Default tab
//   const [generatingPostId, setGeneratingPostId] = useState(null);
//   const [postToShowInModal, setPostToShowInModal] = useState(null);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [modalPostIndex, setModalPostIndex] = useState(null);

//   // --- Data Fetching Function ---
//   const fetchProfileData = async () => {
//      if (sessionStatus === 'authenticated') {
//        let fetchedStrategyData = null;
//        let fetchError = null;
//        try {
//          console.log('Fetching profile data...');
//          setIsLoading(true);
//          const response = await fetch('/api/profile');
//          console.log('Profile fetch response status:', response.status);
//          if (!response.ok) throw new Error(`Failed to fetch profile (${response.status})`);
//          const data = await response.json();
//          console.log('Profile data received:', data);

//          if (data.profile?.linkedinStrategy) {
//            console.log('Saved strategy found.');
//            // Log the structure before setting state
//            console.log('Strategy object received:', JSON.stringify(data.profile.linkedinStrategy, null, 2));
//            fetchedStrategyData = data.profile.linkedinStrategy;
//          } else {
//            console.log('No saved LinkedIn strategy found in profile.');
//            fetchedStrategyData = null; // Set to null if no strategy exists
//          }
//        } catch (err) {
//          console.error('Error fetching profile:', err);
//          fetchError = err.message || 'An error occurred while fetching data.';
//          fetchedStrategyData = null;
//        } finally {
//            setStrategyData(fetchedStrategyData);
//            setError(fetchError);
//            setIsLoading(false);
//        }
//      } else if (sessionStatus === 'loading') {
//        setIsLoading(true);
//      } else { // Unauthenticated
//        setIsLoading(false);
//        setError('Please log in to view your saved strategy.');
//      }
//   };

//   // Initial Data Load
//   useEffect(() => {
//     fetchProfileData();
//   }, [sessionStatus]);

//   console.log('--- Render Check ---');
//   console.log('isLoading:', isLoading);
//   console.log('error:', error);
//   console.log('strategyData exists?:', !!strategyData);

//   // Extracted data & Saved Start Date
//   const foundation = strategyData?.foundation;
//   const contentCalendar = strategyData?.contentCalendar;

//   const savedPosts = strategyData?.savedPosts || [];
//   // Get startDate from fetched data, convert string back to Date object
//   const savedStartDate = strategyData?.calendarStartDate ? new Date(strategyData.calendarStartDate) : null;




//   console.log('contentCalendar object:', contentCalendar); // What does this show?
//   console.log('contentCalendar has rows?:', !!contentCalendar?.rows); // Does it have rows?
//   console.log('contentCalendar rows length:', contentCalendar?.rows?.length ?? 'N/A'); // How many rows?
//   console.log('savedStartDate (raw from DB):', strategyData?.calendarStartDate); // What's the raw date string?
//   console.log('savedStartDate (parsed Date object):', savedStartDate); // Did it parse correctly?
//   console.log('savedStartDate is valid Date?:', savedStartDate instanceof Date && !isNaN(savedStartDate)); // Is it a valid JS Date?
//   console.log('Condition to render table (calendar && date):', !!(contentCalendar?.rows && savedStartDate instanceof Date && !isNaN(savedStartDate))); // Did the condition pass?
//   // --- END NEEDED LOGS ---





//   // --- Handlers ---
//   const handleGeneratePost = async (pillar, topic, approach, contentType, index) => {
//     if (!strategyData?.answers) { /* ... check and alert ... */ return; }
//     console.log("handleGeneratePost called for index:", index);
//     try {
//       setGeneratingPostId(index);
//       setPostToShowInModal("Generating...");
//       setModalPostIndex(index);
//       setShowPostModal(true);
//       const payload = { pillar, topic, approach, contentType, userVoice: strategyData.answers.userVoice, uniquePerspective: strategyData.answers.uniquePerspective };
//       console.log("--- handleGeneratePost: Sending this payload:", payload);
//       const response = await fetch('/api/create-post', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
//       console.log("--- handleGeneratePost: Received response - Status:", response.status, "OK:", response.ok);
//       if (!response.ok) { throw new Error(`Failed to generate post. Status: ${response.status}`); }
//       const data = await response.json();
//       setPostToShowInModal(data.post);
//     } catch (error) { /* ... error handling ... */ }
//     finally { setGeneratingPostId(null); }
//   };

//   const handleViewPost = (index) => { /* ... same implementation ... */
//       console.log("handleViewPost called for index:", index);
//       const postToView = savedPosts.find(post => post.postIndex === index);
//       if (postToView) {
//         setPostToShowInModal(postToView.content);
//         setModalPostIndex(index);
//         setShowPostModal(true);
//       } else { alert("Could not find the saved post."); }
//   };

//  const savePost = async () => { /* ... same implementation, ensure fetchProfileData() is called on success ... */
//     console.log("--- savePost: Function started ---");
//     if (postToShowInModal === "Generating..." || !postToShowInModal || modalPostIndex === null) return;
//     if (!contentCalendar?.rows?.[modalPostIndex]) { /* error handling */ return; }
//     const calendarRow = contentCalendar.rows[modalPostIndex];
//     try {
//         const bodyPayload = { content: postToShowInModal, postIndex: modalPostIndex, pillar: calendarRow.pillar, topic: calendarRow.topic, approach: calendarRow.approach, contentType: calendarRow.contentType, weekDay: calendarRow.weekDay };
//         console.log("--- savePost: Sending payload:", bodyPayload);
//         const response = await fetch('/api/posts/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bodyPayload) });
//         console.log("--- savePost: Received response - Status:", response.status, "OK:", response.ok);
//         if (!response.ok) { /* error handling */ throw new Error(`Save failed: ${response.status}`); }
//         alert('Post saved successfully!');
//         setShowPostModal(false);
//         setModalPostIndex(null);
//         setPostToShowInModal(null);
//         fetchProfileData(); // <-- Re-fetch data here
//     } catch (error) { console.error('--- savePost: Error:', error); alert('Failed to save post.'); }
//     finally { console.log("--- savePost: Finally block ---"); }
//  };

//   const copyToClipboard = (text) => { /* ... implementation ... */
//       if (!text || text === "Generating...") return;
//       navigator.clipboard.writeText(text).then(() => alert("Post copied!")).catch(err => alert("Copy failed!"));
//   };

//   // --- Main Return JSX ---
//   if (isLoading) { return <div className="flex justify-center items-center min-h-[300px]"><span className="loading loading-lg"></span></div>; }
//   if (error && !strategyData) { return ( <div className="p-4 md:p-8"><div className="alert alert-error shadow-lg">... Error display ...</div></div> ); }

//   // --- Show message if no strategy data found AFTER loading ---
//   if (!strategyData) {
//     return (
//       <div className="space-y-6 p-4 md:p-8 text-center max-w-md mx-auto">
//          <h1 className="text-2xl md:text-3xl font-bold">No Strategy Found</h1>
//          <p className="text-base-content/80">You haven't generated and saved your LinkedIn strategy yet. Get started now!</p>
//          <Link href="/linkedin-strategy" className="btn btn-primary mt-4">Generate Your Strategy</Link>
//       </div>
//     );
//   }

//   // --- Render Tabs if strategyData EXISTS ---
//   return (
//     <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
//       <h1 className="text-3xl md:text-4xl font-extrabold text-base-content">My Saved Strategy & Calendar</h1>
//       {/* Optional: Display non-blocking error if fetch failed but some data might exist */}
//        {error && <div className="alert alert-warning mt-4 shadow-lg">Error loading/re-fetching data: {error}</div>}

//       {/* Tab Buttons */}
//       <div role="tablist" className="tabs tabs-bordered">
//         <button role="tab" className={clsx("tab", activeTab === 'foundation' && "tab-active")} onClick={() => setActiveTab('foundation')}>Strategy Foundation</button>
//         <button role="tab" className={clsx("tab", activeTab === 'calendar' && "tab-active")} onClick={() => setActiveTab('calendar')}>Content Calendar</button>
//         <button role="tab" className={clsx("tab", activeTab === 'posts' && "tab-active")} onClick={() => setActiveTab('posts')}>Saved Posts ({savedPosts.length})</button>
//       </div>

//       {/* Tab Content */}
//       <div className="mt-6">
//         {activeTab === 'foundation' && (
//             <div className="card bg-base-100 shadow-xl"><div className="card-body">
//                 <h2 className="card-title mb-4">Strategy Foundation</h2>
//                 <MarkdownContent content={foundation} />
//             </div></div>
//         )}

// {/* old calendar tab */}

//         {/* {activeTab === 'calendar' && (
//              <div className="card bg-base-100 shadow-xl"><div className="card-body">
//                 <h2 className="card-title mb-2">Content Calendar</h2>
//                 <p className="text-sm mb-4 text-base-content/70">Generate posts for your plan or view saved ones.</p>
//                 {contentCalendar && savedStartDate ? (
//                    <ContentCalendarTable
//                      calendar={contentCalendar}
//                      savedPosts={savedPosts}
//                      generatingPostId={generatingPostId}
//                      handleGeneratePost={handleGeneratePost}
//                      handleViewPost={handleViewPost}
//                      startDate={savedStartDate} // <-- Pass the SAVED start date
//                    />
//                 ) : !contentCalendar ? (
//                      <p className="text-error">Error: Content calendar data is missing from saved strategy.</p>
//                  ) : (
//                      <p className="text-warning">Loading calendar dates or start date missing...</p> // More specific message
//                  )}
//              </div></div>
//         )} */}

//         {/* -------- New calendar tab ------ */}
//         {activeTab === 'calendar' && (
//         <div className="card bg-base-100 shadow-xl">
//           <div className="card-body">
//             <h2 className="card-title mb-2">Content Calendars</h2>
            
//             {/* Show calendar management options */}
//             <div className="flex justify-between items-center mb-6">
//               <p className="text-sm text-base-content/70">
//                 Manage your content calendars (max 3 months ahead)
//               </p>
              
//               {/* Generate new calendar button - only show if < 3 calendars */}
//               {strategyData?.savedCalendars?.length < 3 && (
//                 <Button 
//                   variant="primary" 
//                   size="sm" 
//                   onClick={handleGenerateNewCalendar}
//                   disabled={isGeneratingNewCalendar}
//                 >
//                   {isGeneratingNewCalendar ? 'Generating...' : 'Generate Next Calendar'}
//                 </Button>
//               )}
//             </div>
            
//             {/* Calendar selection tabs */}
//             {strategyData?.savedCalendars?.length > 0 ? (
//               <>
//                 {/* Calendar selector tabs */}
//                 <div className="tabs tabs-boxed mb-4">
//                   {strategyData.savedCalendars.map((calendar, index) => {
//                     // Format date range for tab label
//                     const startDate = new Date(calendar.startDate);
//                     const endDate = new Date(calendar.endDate);
//                     const dateLabel = `${startDate.toLocaleDateString('en-US', {month: 'short'})} ${startDate.getDate()} - ${endDate.toLocaleDateString('en-US', {month: 'short'})} ${endDate.getDate()}`;
                    
//                     return (
//                       <button
//                         key={index}
//                         className={`tab ${selectedCalendarIndex === index ? 'tab-active' : ''}`}
//                         onClick={() => setSelectedCalendarIndex(index)}
//                       >
//                         {dateLabel}
//                       </button>
//                     );
//                   })}
//                 </div>
                
//                 {/* Selected calendar display */}
//                 {selectedCalendar && (
//                   <div className="relative">
//                     {/* Delete button for the calendar */}
//                     <Button
//                       variant="outline"
//                       size="xs"
//                       className="absolute top-0 right-0 text-error"
//                       onClick={() => handleDeleteCalendar(selectedCalendarIndex)}
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                       Delete Calendar
//                     </Button>
                    
//                     <ContentCalendarTable
//                       calendar={selectedCalendar.contentCalendar}
//                       savedPosts={savedPosts}
//                       generatingPostId={generatingPostId}
//                       handleGeneratePost={handleGeneratePost}
//                       handleViewPost={handleViewPost}
//                       startDate={new Date(selectedCalendar.startDate)}
//                     />
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="text-center p-10 bg-base-200 rounded-lg">
//                 <p className="text-base-content/70">No content calendars found.</p>
//                 <Button 
//                   variant="primary" 
//                   className="mt-4"
//                   onClick={handleGenerateNewCalendar}
//                   disabled={isGeneratingNewCalendar}
//                 >
//                   Generate Your First Calendar
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}




//          {activeTab === 'posts' && (
//              <div className="card bg-base-100 shadow-xl"><div className="card-body">
//                 <h2 className="card-title mb-4">Saved Posts</h2>
//                 {savedPosts.length > 0 ? (
//                    <div className="space-y-4">
//                       {savedPosts.slice().sort((a, b) => (a.postIndex || 0) - (b.postIndex || 0))
//                           .map((post, loopIndex) => (
//                           <div key={post._id || post.postIndex || loopIndex} className="border border-base-300 rounded-lg p-4 bg-base-200/30">
//                              {/* ... Post details display ... */}
//                               <div className="flex justify-between items-center mb-2 text-xs text-base-content/70">
//                                  <span>Index: {post.postIndex ?? 'N/A'} | Day: {post.weekDay || 'N/A'}</span>
//                                  {post.savedAt && <span>Saved: {new Date(post.savedAt).toLocaleDateString()}</span>}
//                               </div>
//                               <p className="text-sm font-semibold mb-1">Pillar: {post.pillar || 'N/A'}</p>
//                               <p className="text-sm mb-3">Topic: {post.topic || 'N/A'}</p>
//                               <MarkdownContent content={post.content || ''} className="prose prose-sm max-w-none bg-white p-3 rounded border border-base-300" />
//                               <div className="mt-3 text-right">
//                                  <Button variant="outline" size="xs" onClick={() => copyToClipboard(post.content)}>Copy Post</Button>
//                               </div>
//                           </div>
//                       ))}
//                    </div>
//                  ) : (
//                    <p className="text-center text-gray-500 italic my-4">No posts have been saved yet.</p>
//                  )}
//             </div></div>
//         )}
//       </div>

//       {/* Post Modal */}
//       {showPostModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//             <div className="bg-base-100 rounded-lg shadow-xl p-6 max-w-3xl w-full max-h-[90vh] flex flex-col">
//                 {/* ... Modal content, check if postToShowInModal exists before accessing content ... */}
//                 <h2 className="text-xl font-bold mb-4 text-base-content flex-shrink-0">
//                      {postToShowInModal && savedPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) ? `Viewing Saved Post (Row ${modalPostIndex !== null ? modalPostIndex + 1 : 'N/A'})` : `Generated Post (Row ${modalPostIndex !== null ? modalPostIndex + 1 : 'N/A'})`}
//                 </h2>
//                 <div className="flex-grow overflow-y-auto mb-6 pr-2 border rounded-md bg-white p-4">
//                     {postToShowInModal === "Generating..." ? <div className="text-center p-10"><span className="loading loading-dots loading-md"></span></div> : <MarkdownContent content={postToShowInModal || ''} className="prose prose-sm max-w-none" />}
//                 </div>
//                 <div className="flex-shrink-0 mt-auto flex flex-wrap justify-end gap-2">
//                     <Button variant="ghost" size="sm" onClick={() => { setShowPostModal(false); setModalPostIndex(null); setPostToShowInModal(null); }}>Close</Button>
//                     <Button variant="outline" size="sm" onClick={() => copyToClipboard(postToShowInModal)} disabled={!postToShowInModal || postToShowInModal === "Generating..."}>Copy</Button>
//                     {postToShowInModal && postToShowInModal !== "Generating..." && !savedPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) && ( <Button variant="primary" size="sm" onClick={savePost}>Save Post</Button> )}
//                 </div>
//             </div>
//         </div>
//       )}
//     </div>
//   );
// }


//// ---- multiple calendar output ---- /////

// app/dashboard/profile/page.js
"use client";

// React & Next.js Hooks
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

// UI & Utility Libraries
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';
import { addDays, format, getDay, nextMonday, startOfDay } from 'date-fns';

// components
import MarkdownContent from '@/components/MarkDownContent';
import Button from '@/components/Button';

// --- Calendar Table Component ---
const ContentCalendarTable = ({ calendar, savedPosts, generatingPostId, handleGeneratePost, handleViewPost, startDate }) => {
  if (!calendar || !calendar.rows || calendar.rows.length === 0) {
    return <p className="text-center text-gray-500 italic my-4">No calendar data available to display.</p>;
  }
  // Ensure savedPosts is treated as an array for the .some() check
  const postsLookup = Array.isArray(savedPosts) ? savedPosts : [];
  const postsPerWeek = Math.ceil(calendar.rows.length / 4);


  // Helper to add weekdays using date-fns
  // const addWeekdays = (date, daysToAdd) => {
  //   if (!date || !(date instanceof Date) || isNaN(date)) return null; // Added validation for startDate
  //   let currentDate = date;
  //   let addedDays = 0;
  //   while (addedDays < daysToAdd) {
  //     currentDate = addDays(currentDate, 1);
  //     const dayOfWeek = getDay(currentDate); // 0=Sun, 6=Sat
  //     if (dayOfWeek !== 0 && dayOfWeek !== 6) {
  //       addedDays++;
  //     }
  //   }
  //   return currentDate;
  // };

  // Replace your current addWeekdays function with this one
  // New function to calculate post dates properly
  const calculatePostDate = (startDate, index, postsPerWeek) => {

    let startDateObj = startDate;
    if (typeof startDate === 'string') {
      startDateObj = new Date(startDate);
    }
    if (!startDate || !(startDate instanceof Date) || isNaN(startDate)) return null;
    
    // Calculate which week this post belongs to (0-indexed)
    const weekIndex = Math.floor(index / postsPerWeek);
    
    // Calculate which post it is within that week (0-indexed)
    const postWithinWeek = index % postsPerWeek;
    
    // Get the first day of the week (should be Monday)
    let weekStart = addDays(startDate, weekIndex * 7);
    
    // Map each post in a week to different weekdays
    // This creates a simple distribution pattern based on postsPerWeek
    let dayOffset = 0;
    
    // Create a distribution pattern that spaces out the posts
    // For example, if postsPerWeek = 3, posts will be on Mon, Wed, Fri
    // If postsPerWeek = 4, posts will be on Mon, Tue, Thu, Fri
    switch(postsPerWeek) {
      case 2: // Mon, Thu
        dayOffset = postWithinWeek === 0 ? 0 : 3;
        break;
      case 3: // Mon, Wed, Fri
        dayOffset = postWithinWeek * 2; // 0, 2, 4
        break;
      case 4: // Mon, Tue, Thu, Fri
        dayOffset = postWithinWeek < 2 ? postWithinWeek : postWithinWeek + 1;
        break;
      case 5: // Mon through Fri
        dayOffset = postWithinWeek;
        break;
      default: // Fallback - evenly space within the week
        dayOffset = Math.floor(postWithinWeek * (5 / postsPerWeek));
    }
    
    // Add the appropriate number of days based on the pattern
    return addDays(weekStart, dayOffset);
  };

  return (
    <div className="overflow-x-auto my-6 shadow border border-base-300 rounded-lg">
      <table className="w-full border-collapse table-auto">
        <thead className="bg-base-200">
          <tr>
            <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Pillar</th>
            <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Topic</th>
            <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Approach</th>
            <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Content Type</th>
            <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        {/* <tbody className="bg-base-100 divide-y divide-base-200">
          {calendar.rows.map((row, index) => {
            const isPostSaved = postsLookup.some(post => post.postIndex === index);
            const currentDate = addWeekdays(startDate, index);
            const formattedDate = currentDate
              ? format(currentDate, 'EEE, MMM d') // e.g., "Mon, Apr 21"
              : 'Invalid Start Date'; // Indicate if startDate wasn't valid

            return (
              <tr key={index} className="hover:bg-base-200/50">
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content whitespace-nowrap">{formattedDate}</td>
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.pillar || '-'}</td>
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.topic || '-'}</td>
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.approach || '-'}</td>
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.contentType || '-'}</td>
                <td className="px-4 py-3 border-b border-base-300 text-sm text-center whitespace-nowrap">
                  {isPostSaved ? (
                     <Button size="xs" variant="info" onClick={() => handleViewPost(index)}>View Post</Button>
                  ) : (
                     <Button size="xs" variant="success" onClick={() => handleGeneratePost(row.pillar, row.topic, row.approach, row.contentType, index)} disabled={generatingPostId === index}>
                       {generatingPostId === index ? 'Generating...' : 'Generate Post'}
                     </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody> */}
        <tbody className="bg-base-100 divide-y divide-base-200">
          {calendar.rows.map((row, index) => {
            const isPostSaved = postsLookup.some(post => post.postIndex === index);
            const postDate = calculatePostDate(startDate, index, postsPerWeek);
            const formattedDate = postDate
              ? format(postDate, 'EEE, MMM d') // e.g., "Mon, Apr 21"
              : 'Invalid Start Date'; // Indicate if startDate wasn't valid

            return (
              <tr key={index} className="hover:bg-base-200/50">
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content whitespace-nowrap">{formattedDate}</td>
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.pillar || '-'}</td>
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.topic || '-'}</td>
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.approach || '-'}</td>
                <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.contentType || '-'}</td>
                <td className="px-4 py-3 border-b border-base-300 text-sm text-center whitespace-nowrap">
                  {isPostSaved ? (
                    <Button size="xs" variant="info" onClick={() => handleViewPost(index)}>View Post</Button>
                  ) : (
                    <Button size="xs" variant="success" onClick={() => handleGeneratePost(row.pillar, row.topic, row.approach, row.contentType, index)} disabled={generatingPostId === index}>
                      {generatingPostId === index ? 'Generating...' : 'Generate Post'}
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// --- Main Page Component ---
export default function SavedStrategyPage() {
  const { data: session, status: sessionStatus } = useSession();

  // Basic state
  const [strategyData, setStrategyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('foundation');
  
  // Post generation states
  const [generatingPostId, setGeneratingPostId] = useState(null);
  const [postToShowInModal, setPostToShowInModal] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [modalPostIndex, setModalPostIndex] = useState(null);
  
  // Calendar management states
  const [selectedCalendarIndex, setSelectedCalendarIndex] = useState(0);
  const [isGeneratingNewCalendar, setIsGeneratingNewCalendar] = useState(false);
  
  // Computed values
  const selectedCalendar = strategyData?.savedCalendars?.[selectedCalendarIndex];
  const foundation = strategyData?.foundation;
  const savedPosts = strategyData?.savedPosts || [];

  // --- Data Fetching Function ---
  const fetchProfileData = async () => {
     if (sessionStatus === 'authenticated') {
       let fetchedStrategyData = null;
       let fetchError = null;
       try {
         console.log('Fetching profile data...');
         setIsLoading(true);
         const response = await fetch('/api/profile');
         console.log('Profile fetch response status:', response.status);
         if (!response.ok) throw new Error(`Failed to fetch profile (${response.status})`);
         const data = await response.json();
         console.log('Profile data received:', data);

         if (data.profile?.linkedinStrategy) {
           console.log('Saved strategy found.');
           fetchedStrategyData = data.profile.linkedinStrategy;
         } else {
           console.log('No saved LinkedIn strategy found in profile.');
           fetchedStrategyData = null;
         }
       } catch (err) {
         console.error('Error fetching profile:', err);
         fetchError = err.message || 'An error occurred while fetching data.';
         fetchedStrategyData = null;
       } finally {
           setStrategyData(fetchedStrategyData);
           setError(fetchError);
           setIsLoading(false);
       }
     } else if (sessionStatus === 'loading') {
       setIsLoading(true);
     } else { // Unauthenticated
       setIsLoading(false);
       setError('Please log in to view your saved strategy.');
     }
  };

  // Initial Data Load
  useEffect(() => {
    fetchProfileData();
  }, [sessionStatus]);
  
  // Calendar data extraction utility
  const extractCalendarData = (markdownContent) => {
    if (!markdownContent || typeof markdownContent !== 'string') {
      console.log("extractCalendarData: Invalid markdownContent received.");
      return null;
    }
    try {
      const tableHeaderRegex = /\|\s*Week - Day\s*\|.*?\n\|.*?-{3,}.*\|/;
      let headerMatch = markdownContent.match(tableHeaderRegex);

      if (!headerMatch) {
          console.log("extractCalendarData: Could not find table header row.");
          return null;
      }

      const tableStartIndex = headerMatch.index;
      const tableContent = markdownContent.substring(tableStartIndex);

      const tableRows = tableContent.split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('|') && line.includes('|', 1))
        .map(line => line.substring(1, line.endsWith('|') ? line.length - 1 : line.length)
          .split('|')
          .map(cell => cell.trim())
        );

      if (tableRows.length < 2 || !tableRows[1].some(cell => cell.includes('---'))) {
          console.log("extractCalendarData: Did not find valid header/separator rows.");
          return null;
      }

      const headers = tableRows[0];
      const rows = tableRows.slice(2).map(row => ({
        weekDay: row[0] || '', 
        pillar: row[1] || '', 
        topic: row[2] || '',
        approach: row[3] || '', 
        contentType: row[4] || ''
      })).filter(row => row.weekDay && !row.weekDay.includes('--'));

      if (rows.length === 0) {
          console.log("extractCalendarData: No valid data rows found.");
          return null;
      }

      console.log(`extractCalendarData: Successfully parsed ${rows.length} rows.`);
      return { headers, rows };

    } catch (error) {
      console.error("Error parsing calendar table:", error);
      return null;
    }
  };

  // --- Post Generation/View Handlers ---
  const handleGeneratePost = async (pillar, topic, approach, contentType, index) => {
    if (!strategyData?.answers) return;
    console.log("handleGeneratePost called for index:", index);
    try {
      setGeneratingPostId(index);
      setPostToShowInModal("Generating...");
      setModalPostIndex(index);
      setShowPostModal(true);
      const payload = { 
        pillar, 
        topic, 
        approach, 
        contentType, 
        userVoice: strategyData.answers.userVoice, 
        uniquePerspective: strategyData.answers.uniquePerspective 
      };
      const response = await fetch('/api/create-post', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      });
      if (!response.ok) throw new Error(`Failed to generate post. Status: ${response.status}`);
      const data = await response.json();
      setPostToShowInModal(data.post);
    } catch (error) {
      console.error('Error generating post:', error);
      alert(`Failed to generate post: ${error.message}`);
      setShowPostModal(false);
      setModalPostIndex(null);
      setPostToShowInModal(null);
    } finally {
      setGeneratingPostId(null);
    }
  };

  const handleViewPost = (index) => {
    console.log("handleViewPost called for index:", index);
    const postToView = savedPosts.find(post => post.postIndex === index);
    if (postToView) {
      setPostToShowInModal(postToView.content);
      setModalPostIndex(index);
      setShowPostModal(true);
    } else { 
      alert("Could not find the saved post."); 
    }
  };

  const savePost = async () => {
    console.log("--- savePost: Function started ---");
    if (postToShowInModal === "Generating..." || !postToShowInModal || modalPostIndex === null) return;
    
    // Make sure we get the content calendar from the selected calendar
    const contentCalendar = selectedCalendar?.contentCalendar;
    if (!contentCalendar?.rows?.[modalPostIndex]) return;
    
    const calendarRow = contentCalendar.rows[modalPostIndex];
    try {
      const bodyPayload = { 
        content: postToShowInModal, 
        postIndex: modalPostIndex, 
        pillar: calendarRow.pillar, 
        topic: calendarRow.topic, 
        approach: calendarRow.approach, 
        contentType: calendarRow.contentType, 
        weekDay: calendarRow.weekDay 
      };
      const response = await fetch('/api/posts/save', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(bodyPayload) 
      });
      if (!response.ok) throw new Error(`Save failed: ${response.status}`);
      alert('Post saved successfully!');
      setShowPostModal(false);
      setModalPostIndex(null);
      setPostToShowInModal(null);
      fetchProfileData();
    } catch (error) { 
      console.error('Error saving post:', error); 
      alert('Failed to save post.');
    }
  };

  const copyToClipboard = (text) => {
    if (!text || text === "Generating...") return;
    navigator.clipboard.writeText(text)
      .then(() => alert("Post copied!"))
      .catch(err => alert("Copy failed!"));
  };
  
  // --- Calendar Management Functions ---
  const handleGenerateNewCalendar = async () => {
    if (!strategyData || !strategyData.foundation || !strategyData.answers) {
      alert("Strategy data is incomplete. Cannot generate a new calendar.");
      return;
    }
    
    try {
      setIsGeneratingNewCalendar(true);
      
      // Call your generate-calendar API with the existing strategy data
      const response = await fetch('/api/generate-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: strategyData.answers,
          foundation: strategyData.foundation
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to generate calendar (${response.status})`);
      }
      
      const data = await response.json();
      
      // Extract content calendar from the markdown
      const contentCalendarData = extractCalendarData(data.calendar);
      
      // Save the new calendar to the user's profile
      const saveResponse = await fetch('/api/profile/save-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: strategyData.submissionId,
          answers: strategyData.answers,
          foundation: strategyData.foundation,
          calendar: data.calendar,
          contentCalendar: contentCalendarData
        })
      });
      
      if (!saveResponse.ok) {
        throw new Error(`Failed to save new calendar (${saveResponse.status})`);
      }
      
      // Refresh the profile data to show the new calendar
      await fetchProfileData();
      
      // Select the newly added calendar
      const newCalendarCount = strategyData?.savedCalendars?.length || 0;
      setSelectedCalendarIndex(newCalendarCount > 0 ? newCalendarCount - 1 : 0);
      
      alert("New calendar generated and saved successfully!");
      
    } catch (error) {
      console.error("Error generating new calendar:", error);
      alert(`Failed to generate new calendar: ${error.message}`);
    } finally {
      setIsGeneratingNewCalendar(false);
    }
  };

  ////
  

  const handleDeleteCalendar = async (indexToDelete) => {
    console.log("About to delete calendar at index:", indexToDelete, "with type:", typeof indexToDelete);

    if (!strategyData?.savedCalendars || indexToDelete === undefined) {
      return;
    }
    
    // Confirm deletion
    if (!confirm("Are you sure you want to delete this calendar? This action cannot be undone.")) {
      return;
    }
    const numericIndex = Number(indexToDelete);


    console.log("Calling delete-calendar API with index:", indexToDelete);
    try {
      const response = await fetch('/api/profile/delete-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calendarIndex: numericIndex
        })
      });
      console.log("Delete API response status:", response.status);

      
      if (!response.ok) {
        throw new Error(`Failed to delete calendar (${response.status})`);
      }
      
      // Refresh the profile data
      await fetchProfileData();
      
      // Update selected calendar index if needed
      if (selectedCalendarIndex >= indexToDelete && selectedCalendarIndex > 0) {
        setSelectedCalendarIndex(selectedCalendarIndex - 1);
      } else if (strategyData?.savedCalendars?.length === 0) {
        setSelectedCalendarIndex(0);
      }
      
      alert("Calendar deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting calendar:", error);
      alert(`Failed to delete calendar: ${error.message}`);
    }
  };

  // --- Main Render Logic ---
  if (isLoading) { 
    return <div className="flex justify-center items-center min-h-[300px]">
      <span className="loading loading-lg"></span>
    </div>; 
  }
  
  if (error && !strategyData) { 
    return ( 
      <div className="p-4 md:p-8">
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error: {error}</span>
          </div>
        </div>
      </div>
    ); 
  }

  if (!strategyData) {
    return (
      <div className="space-y-6 p-4 md:p-8 text-center max-w-md mx-auto">
         <h1 className="text-2xl md:text-3xl font-bold">No Strategy Found</h1>
         <p className="text-base-content/80">You haven't generated and saved your LinkedIn strategy yet. Get started now!</p>
         <Link href="/linkedin-strategy" className="btn btn-primary mt-4">Generate Your Strategy</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-base-content">My Saved Strategy & Calendar</h1>
      {/* Optional: Display non-blocking error */}
      {error && <div className="alert alert-warning mt-4 shadow-lg">Error loading data: {error}</div>}

      {/* Tab Buttons */}
      <div role="tablist" className="tabs tabs-bordered">
        <button role="tab" className={clsx("tab", activeTab === 'foundation' && "tab-active")} 
                onClick={() => setActiveTab('foundation')}>Strategy Foundation</button>
        <button role="tab" className={clsx("tab", activeTab === 'calendar' && "tab-active")} 
                onClick={() => setActiveTab('calendar')}>Content Calendar</button>
        <button role="tab" className={clsx("tab", activeTab === 'posts' && "tab-active")} 
                onClick={() => setActiveTab('posts')}>Saved Posts ({savedPosts.length})</button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {/* Foundation Tab */}
        {activeTab === 'foundation' && (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Strategy Foundation</h2>
                <MarkdownContent content={foundation} />
              </div>
            </div>
        )}
        
        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-2">Content Calendars</h2>
              
              {/* Calendar management options */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-base-content/70">
                  Manage your content calendars (max 3 months ahead)
                </p>
                
                {/* Generate new calendar button - only show if < 3 calendars */}
                {(strategyData?.savedCalendars?.length || 0) < 3 && (
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={handleGenerateNewCalendar}
                    disabled={isGeneratingNewCalendar}
                  >
                    {isGeneratingNewCalendar ? 
                      <span className="loading loading-spinner loading-xs mr-2"></span> : null}
                    {isGeneratingNewCalendar ? 'Generating...' : 'Generate Next Calendar'}
                  </Button>
                )}
              </div>
              
              {/* Calendar content display */}
              {strategyData?.savedCalendars?.length > 0 ? (
                <>
                  {/* Calendar selector tabs */}
                  <div className="tabs tabs-boxed mb-4">
                    {strategyData.savedCalendars.map((calendar, index) => {
                      // Format date range for tab label
                      const startDate = new Date(calendar.startDate);
                      const endDate = new Date(calendar.endDate);
                      const dateLabel = `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`;
                      
                      return (
                        <button
                          key={index}
                          className={`tab ${selectedCalendarIndex === index ? 'tab-active' : ''}`}
                          onClick={() => setSelectedCalendarIndex(index)}
                        >
                          {dateLabel}
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Selected calendar display */}
                  {selectedCalendar && (
                    <div className="relative">
                      {/* Delete button for the calendar */}
                      <Button
                        variant="outline"
                        size="xs"
                        className="absolute top-0 right-0 text-error"
                        onClick={() => handleDeleteCalendar(selectedCalendarIndex)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Calendar
                      </Button>
                      
                      <ContentCalendarTable
                        calendar={selectedCalendar.contentCalendar}
                        savedPosts={savedPosts}
                        generatingPostId={generatingPostId}
                        handleGeneratePost={handleGeneratePost}
                        handleViewPost={handleViewPost}
                        startDate={new Date(selectedCalendar.startDate)}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center p-10 bg-base-200 rounded-lg">
                  <p className="text-base-content/70">No content calendars found.</p>
                  <Button 
                    variant="primary" 
                    className="mt-4"
                    onClick={handleGenerateNewCalendar}
                    disabled={isGeneratingNewCalendar}
                  >
                    {isGeneratingNewCalendar ? 
                      <span className="loading loading-spinner loading-xs mr-2"></span> : null}
                    Generate Your First Calendar
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Saved Posts</h2>
              {savedPosts.length > 0 ? (
                <div className="space-y-4">
                  {savedPosts.slice().sort((a, b) => (a.postIndex || 0) - (b.postIndex || 0))
                    .map((post, loopIndex) => (
                      <div key={post._id || post.postIndex || loopIndex} className="border border-base-300 rounded-lg p-4 bg-base-200/30">
                        <div className="flex justify-between items-center mb-2 text-xs text-base-content/70">
                          <span>Index: {post.postIndex ?? 'N/A'} | Day: {post.weekDay || 'N/A'}</span>
                          {post.savedAt && <span>Saved: {new Date(post.savedAt).toLocaleDateString()}</span>}
                        </div>
                        <p className="text-sm font-semibold mb-1">Pillar: {post.pillar || 'N/A'}</p>
                        <p className="text-sm mb-3">Topic: {post.topic || 'N/A'}</p>
                        <MarkdownContent content={post.content || ''} className="prose prose-sm max-w-none bg-white p-3 rounded border border-base-300" />
                        <div className="mt-3 text-right">
                          <Button variant="outline" size="xs" onClick={() => copyToClipboard(post.content)}>Copy Post</Button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 italic my-4">No posts have been saved yet.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-base-100 rounded-lg shadow-xl p-6 max-w-3xl w-full max-h-[90vh] flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-base-content flex-shrink-0">
              {postToShowInModal && savedPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) 
                ? `Viewing Saved Post (Row ${modalPostIndex !== null ? modalPostIndex + 1 : 'N/A'})` 
                : `Generated Post (Row ${modalPostIndex !== null ? modalPostIndex + 1 : 'N/A'})`}
            </h2>
            <div className="flex-grow overflow-y-auto mb-6 pr-2 border rounded-md bg-white p-4">
              {postToShowInModal === "Generating..." 
                ? <div className="text-center p-10"><span className="loading loading-dots loading-md"></span></div> 
                : <MarkdownContent content={postToShowInModal || ''} className="prose prose-sm max-w-none" />}
            </div>
            <div className="flex-shrink-0 mt-auto flex flex-wrap justify-end gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => { 
                  setShowPostModal(false); 
                  setModalPostIndex(null); 
                  setPostToShowInModal(null); 
                }}
              >
                Close
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => copyToClipboard(postToShowInModal)} 
                disabled={!postToShowInModal || postToShowInModal === "Generating..."}
              >
                Copy
              </Button>
              {postToShowInModal && 
               postToShowInModal !== "Generating..." && 
               !savedPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) && (
                <Button variant="primary" size="sm" onClick={savePost}>Save Post</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}