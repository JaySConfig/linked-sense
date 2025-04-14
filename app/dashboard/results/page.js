
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
  const [contentCalendar, setContentCalendar] = useState(null);
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
      
      // Parse the calendar data for our interactive table
      const calendarData = extractCalendarData(data.calendar);
      setContentCalendar(calendarData);
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
        body: JSON.stringify({ 
          pillar, 
          topic, 
          approach, 
          contentType,
          // Add these from your submission data
          userVoice: submission?.answers?.userVoice,
          uniquePerspective: submission?.answers?.uniquePerspective
        }),
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
  // For saving the strategy
const saveStrategy = async () => {
  if (!submission || !foundationStrategy || !calendarStrategy) return;
  
  try {
    const response = await fetch('/api/profile/save-strategy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        submissionId: id,
        answers: submission.answers,
        foundation: foundationStrategy,
        calendar: calendarStrategy,
        contentCalendar
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save strategy');
    }
    
    // Show success message
    alert('Your LinkedIn strategy has been saved to your profile!');
  } catch (error) {
    console.error('Error saving strategy:', error);
    alert('Failed to save strategy. Please try again.');
  }
};

// For saving a post
const savePost = async () => {
  if (!generatedPost || generatingPostId === null) return;
  
  try {
    const calendarRow = contentCalendar.rows[generatingPostId];
    
    const response = await fetch('/api/posts/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: generatedPost,
        postIndex: generatingPostId,
        pillar: calendarRow.pillar,
        topic: calendarRow.topic,
        approach: calendarRow.approach,
        contentType: calendarRow.contentType,
        weekDay: calendarRow.weekDay
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save post');
    }
    
    // Show success message
    alert('Post saved successfully!');
    
    // Close the modal
    setShowPostModal(false);
  } catch (error) {
    console.error('Error saving post:', error);
    alert('Failed to save post. Please try again.');
  }
};

  // Extract calendar data from markdown content
  const extractCalendarData = (markdownContent) => {
    try {
      // Look for the calendar section
      const calendarSection = markdownContent.split('## FOUR-WEEK CONTENT CALENDAR')[1];
      if (!calendarSection) return null;
      
      // Extract table rows (each row starts with '|')
      const tableRows = calendarSection.split('\n')
        .filter(line => line.trim().startsWith('|'))
        .map(line => line.split('|')
          .filter(cell => cell.trim()) // Remove empty cells
          .map(cell => cell.trim()) // Trim whitespace
        );
      
      // Extract headers (first row)
      const headers = tableRows[0];
      
      // Extract data rows
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
  
  // Process calendarStrategy to remove the table section since we'll render our own interactive table
  const getProcessedCalendarContent = () => {
    if (!calendarStrategy) return '';
    
    // Split at the table section
    const parts = calendarStrategy.split('## FOUR-WEEK CONTENT CALENDAR');
    if (parts.length !== 2) return calendarStrategy;
    
    // Get everything before the table
    const beforeTable = parts[0];
    
    // For the part after the table, remove everything up to the next heading or the end
    let afterTable = '';
    const afterTablePart = parts[1];
    
    // Find the first line that starts with a heading
    const lines = afterTablePart.split('\n');
    let foundTable = false;
    let nextSectionIndex = lines.findIndex(line => {
      // Skip until we find the end of the table
      if (!foundTable && line.trim().startsWith('|')) return false;
      foundTable = true;
      
      // Once we're past the table, look for the next heading
      return line.trim().startsWith('##');
    });
    
    if (nextSectionIndex !== -1) {
      afterTable = '\n\n' + lines.slice(nextSectionIndex).join('\n');
    }
    
    return beforeTable + '\n\n## FOUR-WEEK CONTENT CALENDAR' + afterTable;
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
            <strong className="font-bold text-gray-900" {...props} />
          ),
          table: ({node, ...props}) => (
            <div className="my-6 w-full overflow-x-auto">
              <table className="w-full table-auto border border-gray-200">
                {props.children}
              </table>
            </div>
          ),
          thead: ({node, ...props}) => (
            <thead>{props.children}</thead>
          ),
          tbody: ({node, ...props}) => (
            <tbody>{props.children}</tbody>
          ),
          tr: ({node, ...props}) => (
            <tr className="hover:bg-gray-50">{props.children}</tr>
          ),
          td: ({node, ...props}) => (
            <td className="px-3 py-2 border border-gray-200 text-sm">{props.children}</td>
          ),
          th: ({node, ...props}) => (
            <th className="px-3 py-2 border border-gray-200 text-left text-sm font-medium bg-gray-50">{props.children}</th>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
  
  // Calendar Table Component
  const ContentCalendarTable = ({ calendar, onGeneratePost, generatingPostId }) => {
    if (!calendar || !calendar.rows || calendar.rows.length === 0) {
      return <p>No calendar data available</p>;
    }
    
    return (
      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Week - Day</th>
              <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Pillar</th>
              <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Topic</th>
              <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Approach</th>
              <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Content Type</th>
              <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {calendar.rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300 text-sm">{row.weekDay}</td>
                <td className="px-4 py-2 border border-gray-300 text-sm">{row.pillar}</td>
                <td className="px-4 py-2 border border-gray-300 text-sm">{row.topic}</td>
                <td className="px-4 py-2 border border-gray-300 text-sm">{row.approach}</td>
                <td className="px-4 py-2 border border-gray-300 text-sm">{row.contentType}</td>
                <td className="px-4 py-2 border border-gray-300 text-sm text-center">
                  <button 
                    onClick={() => onGeneratePost(row.pillar, row.topic, row.approach, row.contentType, index)}
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
    );
  };
  
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-5xl mx-auto">
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
              {/* Render the calendar content without the table */}
              <MarkdownContent content={getProcessedCalendarContent()} />
              
              {/* Render our custom interactive table */}
              <ContentCalendarTable 
                calendar={contentCalendar}
                onGeneratePost={generatePost}
                generatingPostId={generatingPostId}
              />
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
          <button
            onClick={saveStrategy}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            disabled={!foundationStrategy || !calendarStrategy}
          >
            Save Strategy to Profile
          </button>
          <a href="/linkedin-strategy" className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md inline-block hover:bg-emerald-100">
            Create New Strategy
          </a>
        </div>
        
        {/* Post Modal */}
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
                  className="px-4 py-2 border border-gray-600 text-gray-700 rounded-md"
                >
                  Copy to Clipboard
                </button>
                <button 
                  onClick={savePost}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md"
                >
                  Save Post
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