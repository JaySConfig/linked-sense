
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

// --- Calculate Post Date Function (moved outside components) ---
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

// --- Calendar Table Component ---
const ContentCalendarTable = ({ calendar, calendarPosts, generatingPostId, handleGeneratePost, handleViewPost, startDate }) => {
  if (!calendar || !calendar.rows || calendar.rows.length === 0) {
    return <p className="text-center text-gray-500 italic my-4">No calendar data available to display.</p>;
  }

  console.log("ContentCalendarTable received calendarPosts:", calendarPosts);
  
  // Ensure posts is treated as an array
  const postsLookup = Array.isArray(calendarPosts) ? calendarPosts : [];
  const postsPerWeek = Math.ceil(calendar.rows.length / 4);

  console.log("Post indexes in this calendar:", postsLookup.map(p => p.postIndex));

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
            // console.log(`Row ${index} - isPostSaved:`, isPostSaved, 'matching post:', postsLookup.find(post => Number(post.postIndex) === Number(index)));

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
                    // <Button size="xs" variant="info" onClick={() => handleViewPost(index)}>View Post</Button>
                    // ) : (
                    //   <Button size="xs" variant="success" onClick={() => handleGeneratePost(row.pillar, row.topic, row.approach, row.contentType, index)} disabled={generatingPostId === index}>
                    //     {generatingPostId === index ? 'Generating...' : 'Generate Post'}
                    //   </Button>
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
  
  // For accessing posts in the current calendar
  const getCurrentCalendarPosts = () => {
    return strategyData?.savedCalendars?.[selectedCalendarIndex]?.posts || [];
  };
    
  // Computed values 
  const selectedCalendar = strategyData?.savedCalendars?.[selectedCalendarIndex];
  const foundation = strategyData?.foundation;

  // Make sure to directly access posts from the selected calendar
  const currentCalendarPosts = selectedCalendar?.posts || [];

  // console.log('Current selected calendar:', selectedCalendarIndex);
  // console.log('Current calendar posts:', currentCalendarPosts);

  // Calendar structure check
  const checkCalendarStructure = () => {
    if (strategyData?.savedCalendars) {
      // console.log("Checking calendar structure:");
      strategyData.savedCalendars.forEach((calendar, index) => {
        // console.log(`Calendar ${index} has posts property:`, calendar.hasOwnProperty('posts'));
        // console.log(`Calendar ${index} posts is array:`, Array.isArray(calendar.posts));
      });
    }
  };
    
  const fetchProfileData = async () => {
    if (sessionStatus === 'authenticated') {
      let fetchedStrategyData = null;
      let fetchError = null;
      try {
        // console.log('Fetching profile data...');
        setIsLoading(true);
        const response = await fetch('/api/profile');
        // console.log('Profile fetch response status:', response.status);
        if (!response.ok) throw new Error(`Failed to fetch profile (${response.status})`);
        const data = await response.json();
        // console.log('Raw profile data received:', data);

        if (data.profile?.linkedinStrategy) {
          // console.log('Saved strategy found.');
          fetchedStrategyData = data.profile.linkedinStrategy;
          
          // Detailed logging of the exact structure
          // console.log('Full linkedinStrategy data:', JSON.stringify(fetchedStrategyData, null, 2));
          
          // Check the structure of savedCalendars
          if (fetchedStrategyData.savedCalendars) {
            // console.log(`Found ${fetchedStrategyData.savedCalendars.length} calendars`);
            
            fetchedStrategyData.savedCalendars.forEach((calendar, index) => {
              // console.log(`Calendar ${index} structure:`, JSON.stringify(calendar, null, 2));
              // console.log(`Calendar ${index} posts property exists:`, calendar.hasOwnProperty('posts'));
              // console.log(`Calendar ${index} posts is array:`, Array.isArray(calendar.posts));
              // console.log(`Calendar ${index} has ${calendar.posts?.length || 0} posts`);
            });
          } else {
            // console.log('No savedCalendars found in data');
          }
        } else {
          // console.log('No saved LinkedIn strategy found in profile.');
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

  // Check calendar structure on data load
  useEffect(() => {
    if (strategyData) {
      checkCalendarStructure();
    }
  }, [strategyData]);
  
  // Calendar data extraction utility
  const extractCalendarData = (markdownContent) => {
    if (!markdownContent || typeof markdownContent !== 'string') {
      // console.log("extractCalendarData: Invalid markdownContent received.");
      return null;
    }
    try {
      const tableHeaderRegex = /\|\s*Week - Day\s*\|.*?\n\|.*?-{3,}.*\|/;
      let headerMatch = markdownContent.match(tableHeaderRegex);

      if (!headerMatch) {
          // console.log("extractCalendarData: Could not find table header row.");
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
          // console.log("extractCalendarData: Did not find valid header/separator rows.");
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
          // console.log("extractCalendarData: No valid data rows found.");
          return null;
      }

      // console.log(`extractCalendarData: Successfully parsed ${rows.length} rows.`);
      return { headers, rows };

    } catch (error) {
      console.error("Error parsing calendar table:", error);
      return null;
    }
  };

  // --- Post Generation/View Handlers ---
  const handleGeneratePost = async (pillar, topic, approach, contentType, index) => {
    if (!strategyData?.answers) return;
    // console.log("handleGeneratePost called for index:", index, "in calendar:", selectedCalendarIndex);
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
    // console.log("handleViewPost called for index:", index, "in calendar:", selectedCalendarIndex);
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
    // console.log("--- savePost: Function started ---");
    // console.log("modalPostIndex:", modalPostIndex);
    // console.log("selectedCalendarIndex:", selectedCalendarIndex);

    if (postToShowInModal === "Generating..." || !postToShowInModal || modalPostIndex === null) {
      // console.log("Early return due to invalid post data");
      return;
    }

    const contentCalendar = selectedCalendar?.contentCalendar;
    if (!contentCalendar?.rows?.[modalPostIndex]) {
      // console.log("Early return due to missing contentCalendar data for index:", modalPostIndex);
      return;
    }

    const calendarRow = contentCalendar.rows[modalPostIndex];
    // console.log("calendarRow data:", calendarRow);

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

      // console.log("Saving post to calendar index:", selectedCalendarIndex, "with payload:", bodyPayload); // Log payload

      const response = await fetch('/api/posts/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      // --- Enhanced Error Handling ---
      if (!response.ok) {
        let errorDetails = `Save failed with status: ${response.status}`;
        try {
          // Attempt to parse error response from API
          const errorData = await response.json();
          errorDetails += ` - API Error: ${errorData.error || errorData.message || JSON.stringify(errorData)}`;
        } catch (jsonError) {
          // If response isn't JSON or parsing fails
          errorDetails += ` - Response body could not be parsed as JSON.`;
        }
        console.error("Save Post API Error Response:", errorDetails); // Log detailed error
        throw new Error(errorDetails); // Throw error to be caught below
      }
      // --- End Enhanced Error Handling ---

      const responseData = await response.json();
      // console.log("Save API response:", responseData);

      alert('Post saved successfully!');
      setShowPostModal(false);
      setModalPostIndex(null);
      setPostToShowInModal(null);

      await fetchProfileData(); // Refresh data
    } catch (error) {
      // Catch block now potentially has more details from the throw above
      console.error('Error saving post (frontend catch):', error);
      // Display the potentially more detailed error message
      alert(`Failed to save post. Error: ${error.message}`);
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

  const handleDeleteCalendar = async (indexToDelete) => {
    // console.log("About to delete calendar at index:", indexToDelete, "with type:", typeof indexToDelete);

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
         <Link href="/dashboard/strategy" className="btn btn-primary mt-4">Generate Your Strategy</Link>
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
                onClick={() => setActiveTab('posts')}>Saved Posts ({currentCalendarPosts.length})</button>
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
            // <Button 
            //   variant="primary" 
            //   size="sm" 
            //   onClick={handleGenerateNewCalendar}
            //   disabled={isGeneratingNewCalendar}
            // >
            //   {isGeneratingNewCalendar ? 
            //     <span className="loading loading-spinner loading-xs mr-2"></span> : null}
            //   {isGeneratingNewCalendar ? 'Generating...' : 'Generate Next Calendar'}
            // </Button>
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
                  const postsPerWeek = Math.ceil(rows.length / 4); // Assuming 4 weeks of content
                  
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
                {/* <Button
                  variant="outline"
                  size="xs"
                  className="absolute -top-5 right-0 text-error"

                  onClick={() => handleDeleteCalendar(selectedCalendarIndex)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Calendar
                </Button> */}
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
            {/* <Button 
              variant="primary" 
              className="mt-4"
              onClick={handleGenerateNewCalendar}
              disabled={isGeneratingNewCalendar}
            >
              {isGeneratingNewCalendar ? 
                <span className="loading loading-spinner loading-xs mr-2"></span> : null}
              Generate Your First Calendar
            </Button> */}
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
    )}
        
          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Saved Posts</h2>
                
                {/* Tabs to select calendar for posts */}
                {strategyData?.savedCalendars?.length > 0 && (
                  <div className="tabs tabs-boxed mb-4">
                    {strategyData.savedCalendars.map((calendar, index) => {
                      // Format date range for tab label
                      const startDate = new Date(calendar.startDate);
                      
                      // Calculate the correct end date based on the calendar content
                      let endDate;
                      if (calendar.contentCalendar && calendar.contentCalendar.rows) {
                        const rows = calendar.contentCalendar.rows;
                        const postsPerWeek = Math.ceil(rows.length / 4); // Assuming 4 weeks of content
                        
                        // Get the last post index
                        const lastPostIndex = rows.length - 1;
                        
                        // Use the calculatePostDate function to find the date of the last post
                        endDate = calculatePostDate(startDate, lastPostIndex, postsPerWeek);
                      } else {
                        // Fallback to stored endDate if we can't calculate
                        endDate = new Date(calendar.endDate);
                      }
                      
                      const dateLabel = `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`;
                      const postCount = calendar.posts?.length || 0;
                      
                      return (
                        <button
                          key={index}
                          className={`tab ${selectedCalendarIndex === index ? 'tab-active' : ''}`}
                          onClick={() => setSelectedCalendarIndex(index)}
                        >
                          {dateLabel} ({postCount})
                        </button>
                      );
                    })}
                  </div>
                )}
                
                {currentCalendarPosts.length > 0 ? (
                  <div className="space-y-4">
                    {currentCalendarPosts
                      .slice()
                      .sort((a, b) => (a.postIndex || 0) - (b.postIndex || 0))
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
                            {/* <Button variant="outline" size="xs" onClick={() => copyToClipboard(post.content)}>Copy Post</Button> */}
                            <button
                              className="btn btn-outline btn-xs"
                              onClick={() => copyToClipboard(post.content)}
                            >
                              Copy Post
                            </button>

                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 italic my-4">No posts have been saved for this calendar period.</p>
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
                {/* <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => { 
                    setShowPostModal(false); 
                    setModalPostIndex(null); 
                    setPostToShowInModal(null); 
                  }}
                >
                  Close
                </Button> */}
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

                {/* <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(postToShowInModal)} 
                  disabled={!postToShowInModal || postToShowInModal === "Generating..."}
                >
                  Copy
                </Button> */}
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
                  // <Button variant="primary" size="sm" onClick={savePost}>Save Post</Button>
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
