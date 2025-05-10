// // components/CalendarPreview.js
// "use client";

// import { useState, useEffect } from 'react';
// import { format, addDays } from 'date-fns';
// import Link from 'next/link';
// import MarkdownContent from '@/components/MarkdownContent';
// // import CalculatePostDate from './CalculatePostDate';

// // Helper function from your calendar page
// const calculatePostDate = (startDate, index, postsPerWeek) => {
//   let startDateObj = startDate;
//   if (typeof startDate === 'string') {
//     startDateObj = new Date(startDate);
//   }
//   if (!startDate || !(startDate instanceof Date) || isNaN(startDate)) return null;
  
//   const weekIndex = Math.floor(index / postsPerWeek);
//   const postWithinWeek = index % postsPerWeek;
//   let weekStart = addDays(startDate, weekIndex * 7);
  
//   let dayOffset = 0;
  
//   switch(postsPerWeek) {
//     case 2: // Mon, Thu
//       dayOffset = postWithinWeek === 0 ? 0 : 3;
//       break;
//     case 3: // Mon, Wed, Fri
//       dayOffset = postWithinWeek * 2; // 0, 2, 4
//       break;
//     case 4: // Mon, Tue, Thu, Fri
//       dayOffset = postWithinWeek < 2 ? postWithinWeek : postWithinWeek + 1;
//       break;
//     case 5: // Mon through Fri
//       dayOffset = postWithinWeek;
//       break;
//     default: // Fallback - evenly space within the week
//       dayOffset = Math.floor(postWithinWeek * (5 / postsPerWeek));
//   }
  
//   return addDays(weekStart, dayOffset);
// };


// const CalendarPreview = () => {
//   const [strategyData, setStrategyData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [postToShowInModal, setPostToShowInModal] = useState(null);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [modalPostIndex, setModalPostIndex] = useState(null);
//   const [generatingPostId, setGeneratingPostId] = useState(null);
  
//   // For simplicity, we'll use the first calendar
//   const [selectedCalendarIndex, setSelectedCalendarIndex] = useState(0);

// //   <CalculatePostDate/> 

//   // Fetch strategy data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('/api/profile');
        
//         if (!response.ok) throw new Error(`Failed to fetch profile (${response.status})`);
        
//         const data = await response.json();
        
//         if (data.profile?.linkedinStrategy) {
//           setStrategyData(data.profile.linkedinStrategy);
//         } else {
//           setStrategyData(null);
//         }
//       } catch (err) {
//         console.error('Error fetching profile:', err);
//         setError(err.message || 'An error occurred while fetching data.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Get selected calendar
//   const selectedCalendar = strategyData?.savedCalendars?.[selectedCalendarIndex];
//   const currentCalendarPosts = selectedCalendar?.posts || [];
//   const contentCalendar = selectedCalendar?.contentCalendar;

//   // Get upcoming posts for the next 10 business days
//   const getUpcomingPosts = () => {
//     if (!contentCalendar?.rows || !selectedCalendar?.startDate) return [];
    
//     const startDate = new Date(selectedCalendar.startDate);
//     const today = new Date();
//     // Set time to beginning of day for accurate comparison
//     today.setHours(0, 0, 0, 0);
    
//     const postsPerWeek = Math.ceil(contentCalendar.rows.length / 4);
    
//     // Get all upcoming posts and sort them by date
//     const upcomingPosts = contentCalendar.rows.map((row, index) => {
//       const postDate = calculatePostDate(startDate, index, postsPerWeek);
//       if (!postDate) return null;
      
//       // Only include future posts (today and later)
//       if (postDate >= today) {
//         const isPostSaved = currentCalendarPosts.some(post => post.postIndex === index);
        
//         return {
//           index,
//           date: postDate,
//           formattedDate: format(postDate, 'EEE, MMM d'),
//           pillar: row.pillar || '-',
//           topic: row.topic || '-',
//           approach: row.approach || '-',
//           contentType: row.contentType || '-',
//           isPostSaved
//         };
//       }
      
//       return null;
//     })
//     .filter(Boolean)
//     .sort((a, b) => a.date - b.date); // Sort by date ascending
    
//     // Return the first 7 posts (or fewer if there aren't 7)
//     return upcomingPosts.slice(0, 7);
//   };

//   // Handle post generation and viewing
//   const handleGeneratePost = async (pillar, topic, approach, contentType, index) => {
//     if (!strategyData?.answers) return;
    
//     try {
//       setGeneratingPostId(index);
//       setPostToShowInModal("Generating...");
//       setModalPostIndex(index);
//       setShowPostModal(true);
      
//       const payload = { 
//         pillar, 
//         topic, 
//         approach, 
//         contentType, 
//         userVoice: strategyData.answers.userVoice, 
//         uniquePerspective: strategyData.answers.uniquePerspective 
//       };
      
//       const response = await fetch('/api/create-post', { 
//         method: 'POST', 
//         headers: { 'Content-Type': 'application/json' }, 
//         body: JSON.stringify(payload) 
//       });
      
//       if (!response.ok) throw new Error(`Failed to generate post. Status: ${response.status}`);
      
//       const data = await response.json();
//       setPostToShowInModal(data.post);
//     } catch (error) {
//       console.error('Error generating post:', error);
//       alert(`Failed to generate post: ${error.message}`);
//       setShowPostModal(false);
//       setModalPostIndex(null);
//       setPostToShowInModal(null);
//     } finally {
//       setGeneratingPostId(null);
//     }
//   };

//   const handleViewPost = (index) => {
//     const postToView = currentCalendarPosts.find(post => post.postIndex === index);
//     if (postToView) {
//       setPostToShowInModal(postToView.content);
//       setModalPostIndex(index);
//       setShowPostModal(true);
//     } else { 
//       alert("Could not find the saved post."); 
//     }
//   };

//   const savePost = async () => {
//     if (postToShowInModal === "Generating..." || !postToShowInModal || modalPostIndex === null) {
//       return;
//     }

//     const contentCalendar = selectedCalendar?.contentCalendar;
//     if (!contentCalendar?.rows?.[modalPostIndex]) {
//       return;
//     }

//     const calendarRow = contentCalendar.rows[modalPostIndex];

//     try {
//       const bodyPayload = {
//         content: postToShowInModal,
//         postIndex: modalPostIndex,
//         pillar: calendarRow.pillar,
//         topic: calendarRow.topic,
//         approach: calendarRow.approach,
//         contentType: calendarRow.contentType,
//         weekDay: calendarRow.weekDay,
//         calendarIndex: selectedCalendarIndex
//       };

//       const response = await fetch('/api/posts/save', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(bodyPayload)
//       });

//       if (!response.ok) {
//         throw new Error(`Save failed with status: ${response.status}`);
//       }

//       alert('Post saved successfully!');
//       setShowPostModal(false);
//       setModalPostIndex(null);
//       setPostToShowInModal(null);

//       // Refetch data to update the UI
//       const fetchData = async () => {
//         try {
//           const response = await fetch('/api/profile');
//           if (response.ok) {
//             const data = await response.json();
//             if (data.profile?.linkedinStrategy) {
//               setStrategyData(data.profile.linkedinStrategy);
//             }
//           }
//         } catch (err) {
//           console.error('Error refetching profile:', err);
//         }
//       };
      
//       fetchData();
//     } catch (error) {
//       console.error('Error saving post:', error);
//       alert(`Failed to save post. Error: ${error.message}`);
//     }
//   };

//   const copyToClipboard = (text) => {
//     if (!text || text === "Generating...") return;
//     navigator.clipboard.writeText(text)
//       .then(() => alert("Post copied!"))
//       .catch(err => alert("Copy failed!"));
//   };

//   // Render loading state
//   if (isLoading) {
//     return (
//       <div className="card bg-base-100 shadow-sm">
//         <div className="card-body">
//           <h2 className="card-title">Upcoming Content</h2>
//           <div className="flex justify-center py-8">
//             <span className="loading loading-spinner loading-md"></span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Render error or no strategy state
//   if (error || !strategyData || !strategyData.savedCalendars || strategyData.savedCalendars.length === 0) {
//     return (
//       <div className="card bg-base-100 shadow-sm">
//         <div className="card-body">
//           <h2 className="card-title">Upcoming Content</h2>
//           <p className="text-base-content/70">No content calendars found.</p>
//           <div className="card-actions justify-end mt-4">
//             <Link href="/dashboard/calendar" className="btn btn-primary btn-sm">
//               Go to Calendar
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const upcomingPosts = getUpcomingPosts();

//   return (
//     <div className="card bg-base-100 shadow-sm overflow-hidden">
//       <div className="card-body p-4">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="card-title">Upcoming Content</h2>
//           <Link href="/dashboard/calendar" className="btn btn-sm btn-ghost">
//             View Full Calendar
//           </Link>
//         </div>
        
//         {upcomingPosts.length > 0 ? (
//           <div className="overflow-x-auto -mx-4">
//             <table className="table table-zebra table-sm w-full">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Topic</th>
//                   <th>Type</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {upcomingPosts.map((post) => (
//                   <tr key={post.index}>
//                     <td>{post.formattedDate}</td>
//                     <td className="max-w-[200px] truncate">{post.topic}</td>
//                     <td>{post.contentType}</td>
//                     <td>
//                       {post.isPostSaved ? (
//                         <button
//                           className="btn btn-xs btn-outline"
//                           onClick={() => handleViewPost(post.index)}
//                         >
//                           View
//                         </button>
//                       ) : (
//                         <button
//                           className="btn btn-xs btn-primary"
//                           onClick={() => handleGeneratePost(
//                             post.pillar, post.topic, post.approach, post.contentType, post.index
//                           )}
//                           disabled={generatingPostId === post.index}
//                         >
//                           {generatingPostId === post.index ? 'Generating...' : 'Generate'}
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center py-6 text-center">
//             <div className="text-base-content/60 mb-4">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-3">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
//               </svg>
//               <p className="text-base-content/70 font-medium">No upcoming posts for the next 7 days</p>
//             </div>
//             <p className="text-sm text-base-content/60 max-w-sm">
//               You have calendars set up, but no posts are scheduled for the upcoming days.
//             </p>
//             <div className="mt-4 flex gap-2">
//               <Link href="/dashboard/calendar" className="btn btn-sm btn-primary">
//                 View Calendar
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Post Modal */}
//       {showPostModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//           <div className="bg-base-100 rounded-lg shadow-xl p-6 max-w-3xl w-full max-h-[90vh] flex flex-col">
//             <h2 className="text-xl font-bold mb-4 text-base-content flex-shrink-0">
//               {postToShowInModal && currentCalendarPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) 
//                 ? `Viewing Saved Post (Row ${modalPostIndex !== null ? modalPostIndex + 1 : 'N/A'})` 
//                 : `Generated Post (Row ${modalPostIndex !== null ? modalPostIndex + 1 : 'N/A'})`}
//             </h2>

//                 {/* commented out markdown for error testing */}

//             <div className="flex-grow overflow-y-auto mb-6 pr-2 border rounded-md bg-white p-4">
//               {postToShowInModal === "Generating..." 
//                 ? <div className="text-center p-10"><span className="loading loading-dots loading-md"></span></div> 
//                 : <MarkdownContent content={postToShowInModal || ''} className="prose prose-sm max-w-none" />}
//             </div>
//             <div className="flex-shrink-0 mt-auto flex flex-wrap justify-end gap-2">
//               <button
//                 className="btn btn-ghost btn-sm"
//                 onClick={() => { 
//                   setShowPostModal(false); 
//                   setModalPostIndex(null); 
//                   setPostToShowInModal(null); 
//                 }}
//               >
//                 Close
//               </button>
//               <button
//                 className="btn btn-outline btn-sm"
//                 onClick={() => copyToClipboard(postToShowInModal)}
//                 disabled={!postToShowInModal || postToShowInModal === "Generating..."}
//               >
//                 Copy
//               </button>
//               {postToShowInModal && 
//               postToShowInModal !== "Generating..." && 
//               !currentCalendarPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) && (
//                 <button
//                   className="btn btn-primary btn-sm"
//                   onClick={savePost}
//                 >
//                   Save Post
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CalendarPreview;



// components/CalendarPreview.js
"use client";

import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import Link from 'next/link';
import PostModal from '@/components/PostModal';
import MarkdownContent from '@/components/MarkdownContent';

// Helper function from your calendar page
const calculatePostDate = (startDate, index, postsPerWeek) => {
  // Keep existing implementation...
  let startDateObj = startDate;
  if (typeof startDate === 'string') {
    startDateObj = new Date(startDate);
  }
  if (!startDate || !(startDate instanceof Date) || isNaN(startDate)) return null;
  
  const weekIndex = Math.floor(index / postsPerWeek);
  const postWithinWeek = index % postsPerWeek;
  let weekStart = addDays(startDate, weekIndex * 7);
  
  let dayOffset = 0;
  
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
  
  return addDays(weekStart, dayOffset);
};

const CalendarPreview = () => {
  // Keep all your state variables and functions as they are...
  const [strategyData, setStrategyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postToShowInModal, setPostToShowInModal] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [modalPostIndex, setModalPostIndex] = useState(null);
  const [generatingPostId, setGeneratingPostId] = useState(null);
  
  // For simplicity, we'll use the first calendar
  const [selectedCalendarIndex, setSelectedCalendarIndex] = useState(0);

  // Keep all your existing functions (fetchData, handleGeneratePost, etc.)...
  // For brevity, I'm not repeating all of them here


//   <CalculatePostDate/> 

  // Fetch strategy data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/profile');
        
        if (!response.ok) throw new Error(`Failed to fetch profile (${response.status})`);
        
        const data = await response.json();
        
        if (data.profile?.linkedinStrategy) {
          setStrategyData(data.profile.linkedinStrategy);
        } else {
          setStrategyData(null);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get selected calendar
  const selectedCalendar = strategyData?.savedCalendars?.[selectedCalendarIndex];
  const currentCalendarPosts = selectedCalendar?.posts || [];
  const contentCalendar = selectedCalendar?.contentCalendar;

  // Get upcoming posts for the next 10 business days
  const getUpcomingPosts = () => {
    if (!contentCalendar?.rows || !selectedCalendar?.startDate) return [];
    
    const startDate = new Date(selectedCalendar.startDate);
    const today = new Date();
    // Set time to beginning of day for accurate comparison
    today.setHours(0, 0, 0, 0);
    
    const postsPerWeek = Math.ceil(contentCalendar.rows.length / 4);
    
    // Get all upcoming posts and sort them by date
    const upcomingPosts = contentCalendar.rows.map((row, index) => {
      const postDate = calculatePostDate(startDate, index, postsPerWeek);
      if (!postDate) return null;
      
      // Only include future posts (today and later)
      if (postDate >= today) {
        const isPostSaved = currentCalendarPosts.some(post => post.postIndex === index);
        
        return {
          index,
          date: postDate,
          formattedDate: format(postDate, 'EEE, MMM d'),
          pillar: row.pillar || '-',
          topic: row.topic || '-',
          approach: row.approach || '-',
          contentType: row.contentType || '-',
          isPostSaved
        };
      }
      
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => a.date - b.date); // Sort by date ascending
    
    // Return the first 7 posts (or fewer if there aren't 7)
    return upcomingPosts.slice(0, 7);
  };

  // Handle post generation and viewing
  const handleGeneratePost = async (pillar, topic, approach, contentType, index) => {
    if (!strategyData?.answers) return;
    
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
    const postToView = currentCalendarPosts.find(post => post.postIndex === index);
    if (postToView) {
      setPostToShowInModal(postToView.content);
      setModalPostIndex(index);
      setShowPostModal(true);
    } else { 
      alert("Could not find the saved post."); 
    }
  };

  // const savePost = async () => {
    // if (postToShowInModal === "Generating..." || !postToShowInModal || modalPostIndex === null) {
    //   return;
    // }

    // const contentCalendar = selectedCalendar?.contentCalendar;
    // if (!contentCalendar?.rows?.[modalPostIndex]) {
    //   return;
    // }

    // const calendarRow = contentCalendar.rows[modalPostIndex];

    // try {
    //   const bodyPayload = {
    //     content: postToShowInModal,
    //     postIndex: modalPostIndex,
    //     pillar: calendarRow.pillar,
    //     topic: calendarRow.topic,
    //     approach: calendarRow.approach,
    //     contentType: calendarRow.contentType,
    //     weekDay: calendarRow.weekDay,
    //     calendarIndex: selectedCalendarIndex
    //   };

    //   const response = await fetch('/api/posts/save', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(bodyPayload)
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Save failed with status: ${response.status}`);
    //   }

    //   alert('Post saved successfully!');
    //   setShowPostModal(false);
    //   setModalPostIndex(null);
    //   setPostToShowInModal(null);

    //   // Refetch data to update the UI
    //   const fetchData = async () => {
    //     try {
    //       const response = await fetch('/api/profile');
    //       if (response.ok) {
    //         const data = await response.json();
    //         if (data.profile?.linkedinStrategy) {
    //           setStrategyData(data.profile.linkedinStrategy);
    //         }
    //       }
    //     } catch (err) {
    //       console.error('Error refetching profile:', err);
    //     }
    //   };
      
    //   fetchData();
    // } catch (error) {
    //   console.error('Error saving post:', error);
    //   alert(`Failed to save post. Error: ${error.message}`);
    // }
  // };


  ////// ---- new savePost function for editable modal ----- ///////

  const savePost = async (contentOverride = null) => {
    // Use the override content if provided, otherwise use the original
    const contentToSave = contentOverride || postToShowInModal;
    
    if (!contentToSave || contentToSave === "Generating..." || modalPostIndex === null) {
      return;
    }
  
    const contentCalendar = selectedCalendar?.contentCalendar;
    if (!contentCalendar?.rows?.[modalPostIndex]) {
      return;
    }
  
    const calendarRow = contentCalendar.rows[modalPostIndex];
  
    try {
      const bodyPayload = {
        content: contentToSave, // Use contentToSave instead of postToShowInModal
        postIndex: modalPostIndex,
        pillar: calendarRow.pillar,
        topic: calendarRow.topic,
        approach: calendarRow.approach,
        contentType: calendarRow.contentType,
        weekDay: calendarRow.weekDay,
        calendarIndex: selectedCalendarIndex
      };
  
      const response = await fetch('/api/posts/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });
  
      if (!response.ok) {
        throw new Error(`Save failed with status: ${response.status}`);
      }
  
      alert('Post saved successfully!');
      setShowPostModal(false);
      setModalPostIndex(null);
      setPostToShowInModal(null);
  
      // Refetch data to update the UI
      const fetchData = async () => {
        try {
          const response = await fetch('/api/profile');
          if (response.ok) {
            const data = await response.json();
            if (data.profile?.linkedinStrategy) {
              setStrategyData(data.profile.linkedinStrategy);
            }
          }
        } catch (err) {
          console.error('Error refetching profile:', err);
        }
      };
      
      fetchData();
    } catch (error) {
      console.error('Error saving post:', error);
      alert(`Failed to save post. Error: ${error.message}`);
    }
  };



  const copyToClipboard = (text) => {
    if (!text || text === "Generating...") return;
    navigator.clipboard.writeText(text)
      .then(() => alert("Post copied!"))
      .catch(err => alert("Copy failed!"));
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Upcoming Content</h2>
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        </div>
      </div>
    );
  }

  // Render error or no strategy state
  if (error || !strategyData || !strategyData.savedCalendars || strategyData.savedCalendars.length === 0) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Upcoming Content</h2>
          <p className="text-base-content/70">No content calendars found.</p>
          <div className="card-actions justify-end mt-4">
            <Link href="/dashboard/calendar" className="btn btn-primary btn-sm">
              Go to Calendar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Here's the key part: render a responsive version of the component
  const upcomingPosts = getUpcomingPosts(); // Assuming this function is unchanged

  // All the loading and error states remain the same...
  if (isLoading) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Upcoming Content</h2>
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        </div>
      </div>
    );
  }

  // Error and empty states remain the same...
  if (error || !strategyData || !strategyData.savedCalendars || strategyData.savedCalendars.length === 0) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Upcoming Content</h2>
          <p className="text-base-content/70">No content calendars found.</p>
          <div className="card-actions justify-end mt-4">
            <Link href="/dashboard/calendar" className="btn btn-primary btn-sm">
              Go to Calendar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-sm overflow-hidden">
      <div className="card-body p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="card-title">Upcoming Content</h2>
          <Link href="/dashboard/calendar" className="btn btn-sm btn-ghost">
            View Full Calendar
          </Link>
        </div>
        
        {upcomingPosts.length > 0 ? (
          <>
            {/* Desktop/tablet view */}
            <div className="hidden md:block overflow-x-auto -mx-4">
              <table className="table table-zebra table-sm w-full">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Topic</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingPosts.map((post) => (
                    <tr key={post.index}>
                      <td>{post.formattedDate}</td>
                      <td className="max-w-[200px] truncate">{post.topic}</td>
                      <td>{post.contentType}</td>
                      <td>
                        {post.isPostSaved ? (
                          <button
                            className="btn btn-xs btn-outline"
                            onClick={() => handleViewPost(post.index)}
                          >
                            View
                          </button>
                        ) : (
                          <button
                            className="btn btn-xs btn-primary"
                            onClick={() => handleGeneratePost(
                              post.pillar, post.topic, post.approach, post.contentType, post.index
                            )}
                            disabled={generatingPostId === post.index}
                          >
                            {generatingPostId === post.index ? 'Generating...' : 'Generate'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile view - card-based layout */}
            {/* Mobile view - simplified card-based layout */}
            {/* Mobile view with standard list pattern */}
            <div className="md:hidden space-y-2">
              {upcomingPosts.map((post) => (
                <div key={post.index} className="px-4 py-3 border-b border-base-300 bg-base-100">
                  {/* Date */}
                  <div className="font-bold mb-2">{post.formattedDate}</div>
                  
                  {/* Post title only - nothing else */}
                  <div className="mb-3">{post.topic}</div>
                  
                  {/* Action button only */}
                  <div className="flex justify-end">
                    {post.isPostSaved ? (
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => handleViewPost(post.index)}
                      >
                        View
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleGeneratePost(
                          post.pillar, post.topic, post.approach, post.contentType, post.index
                        )}
                        disabled={generatingPostId === post.index}
                      >
                        Generate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="text-base-content/60 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <p className="text-base-content/70 font-medium">No upcoming posts for the next 7 days</p>
            </div>
            <p className="text-sm text-base-content/60 max-w-sm">
              You have calendars set up, but no posts are scheduled for the upcoming days.
            </p>
            <div className="mt-4 flex gap-2">
              <Link href="/dashboard/calendar" className="btn btn-sm btn-primary">
                View Calendar
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Post Modal - make it more mobile friendly */}

      {/* import PostModal from '@/components/PostModal'; */}

{/* // ... in your component */}
      <PostModal
        isOpen={showPostModal}
        onClose={() => {
          setShowPostModal(false);
          setModalPostIndex(null);
          setPostToShowInModal(null);
        }}
        postContent={postToShowInModal}
        isGenerating={postToShowInModal === "Generating..."}
        isSaved={currentCalendarPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal)}
        modalPostIndex={null} // CalendarPreview doesn't show row numbers
        onSave={savePost}
        onCopy={copyToClipboard}
        title={postToShowInModal && currentCalendarPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) 
          ? "Viewing Saved Post" 
          : "Generated Post"}
        />


      {/* {showPostModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 md:p-4 backdrop-blur-sm">
          <div className="bg-base-100 rounded-lg shadow-xl p-4 md:p-6 w-full max-w-3xl max-h-[95vh] flex flex-col">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-base-content flex-shrink-0">
              {postToShowInModal && currentCalendarPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) 
                ? `Viewing Saved Post` 
                : `Generated Post`}
            </h2>

            <div className="flex-grow overflow-y-auto mb-4 md:mb-6 pr-2 border rounded-md bg-white p-3 md:p-4 text-sm">
              {postToShowInModal === "Generating..." 
                ? <div className="text-center p-8 md:p-10"><span className="loading loading-dots loading-md"></span></div> 
                : <MarkdownContent content={postToShowInModal || ''} />}
            </div>
            
            <div className="flex-shrink-0 mt-auto flex flex-wrap justify-end gap-2">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => { 
                  setShowPostModal(false); 
                  setModalPostIndex(null); 
                  setPostToShowInModal(null); 
                }}
              >
                Close
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => copyToClipboard(postToShowInModal)}
                disabled={!postToShowInModal || postToShowInModal === "Generating..."}
              >
                Copy
              </button>
              {postToShowInModal && 
              postToShowInModal !== "Generating..." && 
              !currentCalendarPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={savePost}
                >
                  Save Post
                </button>
              )}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CalendarPreview;