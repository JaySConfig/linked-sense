"use client";

// React & Next.js Hooks
import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

// UI & Utility Libraries
import { format, addDays } from 'date-fns';

// components
import MarkdownContent from '../components/MarkdownContent';

// First, let's extract the calculatePostDate function since it's used by the calendar
const calculatePostDate = (startDate, index, postsPerWeek) => {
  // [Keep the existing implementation...]
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

/// ----------------

// ContentCalendarTable Component
const ContentCalendarTable = ({ calendar, calendarPosts, generatingPostId, handleGeneratePost, handleViewPost, startDate }) => {
    if (!calendar || !calendar.rows || calendar.rows.length === 0) {
      return <p className="text-center text-gray-500 italic my-4">No calendar data available to display.</p>;
    }
    
    const postsLookup = Array.isArray(calendarPosts) ? calendarPosts : [];
    const postsPerWeek = Math.ceil(calendar.rows.length / 4);
  
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
         
          <tbody className="bg-base-100 divide-y divide-base-200">
            {calendar.rows.map((row, index) => {
              const isPostSaved = postsLookup.some(post => post.postIndex === index);
              
              const postDate = calculatePostDate(startDate, index, postsPerWeek);
              const formattedDate = postDate
                ? format(postDate, 'EEE, MMM d') 
                : 'Invalid Start Date';
  
              return (
                <tr key={index} className="hover:bg-base-200/50">
                  <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content whitespace-nowrap">{formattedDate}</td>
                  <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.pillar || '-'}</td>
                  <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.topic || '-'}</td>
                  <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.approach || '-'}</td>
                  <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.contentType || '-'}</td>
                  <td className="px-4 py-3 border-b border-base-300 text-sm text-center whitespace-nowrap">
                    {isPostSaved ? (
                      <button
                        className="btn btn-secondary btn-xs"
                        onClick={() => handleViewPost(index)}
                      >
                        View Post
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() => handleGeneratePost(row.pillar, row.topic, row.approach, row.contentType, index)}
                        disabled={generatingPostId === index}
                      >
                        {generatingPostId === index ? 'Generating...' : 'Generate Post'}
                      </button>
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


  //// calendar page component

  export default function CalendarPage() {
    const { data: session, status: sessionStatus } = useSession();
  
    // Basic state
    const [strategyData, setStrategyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Post generation states
    const [generatingPostId, setGeneratingPostId] = useState(null);
    const [postToShowInModal, setPostToShowInModal] = useState(null);
    const [showPostModal, setShowPostModal] = useState(false);
    const [modalPostIndex, setModalPostIndex] = useState(null);
    
    // Calendar management states
    const [selectedCalendarIndex, setSelectedCalendarIndex] = useState(0);
    const [isGeneratingNewCalendar, setIsGeneratingNewCalendar] = useState(false);
    
    // For accessing posts in the current calendar
    const selectedCalendar = strategyData?.savedCalendars?.[selectedCalendarIndex];
    const currentCalendarPosts = selectedCalendar?.posts || [];
  
    // Calendar structure utility
    const extractCalendarData = (markdownContent) => {
      // [Keep the existing implementation...]
      if (!markdownContent || typeof markdownContent !== 'string') {
        return null;
      }
      try {
        const tableHeaderRegex = /\|\s*Week - Day\s*\|.*?\n\|.*?-{3,}.*\|/;
        let headerMatch = markdownContent.match(tableHeaderRegex);
  
        if (!headerMatch) {
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
            return null;
        }
  
        return { headers, rows };
      } catch (error) {
        console.error("Error parsing calendar table:", error);
        return null;
      }
    };
  
    // Data fetching function
    const fetchStrategyData = useCallback(async () => {
      if (sessionStatus === 'authenticated') {
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
      } else if (sessionStatus === 'loading') {
        setIsLoading(true);
      } else { // Unauthenticated
        setIsLoading(false);
        setError('Please log in to view your saved strategy.');
      }
    }, [sessionStatus]);
  
    // Initial Data Load
    useEffect(() => {
      fetchStrategyData();
    }, [sessionStatus, fetchStrategyData]);
  
    // Post generation/view handlers
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
  
    const savePost = async () => {
      if (postToShowInModal === "Generating..." || !postToShowInModal || modalPostIndex === null) {
        return;
      }
  
      const contentCalendar = selectedCalendar?.contentCalendar;
      if (!contentCalendar?.rows?.[modalPostIndex]) {
        return;
      }
  
      const calendarRow = contentCalendar.rows[modalPostIndex];
  
      try {
        const bodyPayload = {
          content: postToShowInModal,
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
          let errorDetails = `Save failed with status: ${response.status}`;
          try {
            const errorData = await response.json();
            errorDetails += ` - API Error: ${errorData.error || errorData.message || JSON.stringify(errorData)}`;
          } catch (jsonError) {
            errorDetails += ` - Response body could not be parsed as JSON.`;
          }
          throw new Error(errorDetails);
        }
  
        alert('Post saved successfully!');
        setShowPostModal(false);
        setModalPostIndex(null);
        setPostToShowInModal(null);
  
        await fetchStrategyData();
      } catch (error) {
        console.error('Error saving post (frontend catch):', error);
        alert(`Failed to save post. Error: ${error.message}`);
      }
    };
  
    const copyToClipboard = (text) => {
      if (!text || text === "Generating...") return;
      navigator.clipboard.writeText(text)
        .then(() => alert("Post copied!"))
        .catch(err => alert("Copy failed!"));
    };
  
    // Calendar management functions
    const handleGenerateNewCalendar = async () => {
      if (!strategyData || !strategyData.foundation || !strategyData.answers) {
        alert("Strategy data is incomplete. Cannot generate a new calendar.");
        return;
      }
      
      try {
        setIsGeneratingNewCalendar(true);
        
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
        
        const contentCalendarData = extractCalendarData(data.calendar);
        
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
        
        await fetchStrategyData();
        
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
  
    const handleDeleteCalendar = async (indexToDelete) => {
      if (!strategyData?.savedCalendars || indexToDelete === undefined) {
        return;
      }
      
      if (!confirm("Are you sure you want to delete this calendar? This action cannot be undone.")) {
        return;
      }
      
      const numericIndex = Number(indexToDelete);
  
      try {
        const response = await fetch('/api/profile/delete-calendar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            calendarIndex: numericIndex
          })
        });
        
        if (!response.ok) {
          throw new Error(`Failed to delete calendar (${response.status})`);
        }
        
        await fetchStrategyData();
        
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
  
    // Main Render Logic
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
           <p className="text-base-content/80">You haven&apos;t generated and saved your LinkedIn strategy yet. Get started now!</p>
           <Link href="/dashboard/strategy" className="btn btn-primary mt-4">Generate Your Strategy</Link>
        </div>
      );
    }
  
    return (
      <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-base-content">Content Calendar</h1>
        
        {/* Optional: Display non-blocking error */}
        {error && <div className="alert alert-warning mt-4 shadow-lg">Error loading data: {error}</div>}
  
        {/* Main calendar section */}
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
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleGenerateNewCalendar}
                  disabled={isGeneratingNewCalendar}
                >
                  {isGeneratingNewCalendar && (
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                  )}
                  {isGeneratingNewCalendar ? 'Generating...' : 'Generate Next Calendar'}
                </button>
              )}
            </div>
            
            {/* Calendar content display */}
            {strategyData?.savedCalendars?.length > 0 ? (
              <>
                {/* Calendar selector tabs */}
                <div className="tabs tabs-boxed mb-4">
                  {strategyData.savedCalendars.map((calendar, index) => {
                    // Get the start date
                    const startDate = new Date(calendar.startDate);
                    
                    // Calculate the correct end date based on the calendar content
                    let endDate;
                    if (calendar.contentCalendar && calendar.contentCalendar.rows) {
                      const rows = calendar.contentCalendar.rows;
                      const postsPerWeek = Math.ceil(rows.length / 4);
                      
                      // Get the last post index
                      const lastPostIndex = rows.length - 1;
                      
                      // Use the calculatePostDate function to find the date of the last post
                      endDate = calculatePostDate(startDate, lastPostIndex, postsPerWeek);
                    } else {
                      // Fallback to stored endDate if we can't calculate
                      endDate = new Date(calendar.endDate);
                    }
                    
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
                    <button
                      className="btn btn-outline btn-xs absolute -top-5 right-0 text-error"
                      onClick={() => handleDeleteCalendar(selectedCalendarIndex)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Calendar
                    </button>
                    
                    {/* Calendar table component */}
                    <ContentCalendarTable
                      calendar={selectedCalendar.contentCalendar}
                      calendarPosts={currentCalendarPosts}
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
                <button
                  className="btn btn-primary mt-4"
                  onClick={handleGenerateNewCalendar}
                  disabled={isGeneratingNewCalendar}
                >
                  {isGeneratingNewCalendar && (
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                  )}
                  Generate Your First Calendar
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Post Modal */}
        {showPostModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-base-100 rounded-lg shadow-xl p-6 max-w-3xl w-full max-h-[90vh] flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-base-content flex-shrink-0">
                {postToShowInModal && currentCalendarPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) 
                  ? `Viewing Saved Post (Row ${modalPostIndex !== null ? modalPostIndex + 1 : 'N/A'})` 
                  : `Generated Post (Row ${modalPostIndex !== null ? modalPostIndex + 1 : 'N/A'})`}
              </h2>
              <div className="flex-grow overflow-y-auto mb-6 pr-2 border rounded-md bg-white p-4">
                {postToShowInModal === "Generating..." 
                  ? <div className="text-center p-10"><span className="loading loading-dots loading-md"></span></div> 
                  : <MarkdownContent content={postToShowInModal || ''} className="prose prose-sm max-w-none" />}
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
        )}
      </div>
    );
  }