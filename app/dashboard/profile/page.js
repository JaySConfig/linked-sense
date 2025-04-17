// // // app/dashboard/profile/page.js
// // "use client";

// // import { useEffect } from 'react';
// // import { useSession } from 'next-auth/react';

// // import { useState } from 'react';

// // export default function ProfilePage() {
// //   // State for the form data
// //   const [formData, setFormData] = useState({
// //     typeOfProfile: '',
// //     industry: '',
// //     role: '',
// //     experience: '',
// //     expertise: '',
// //     linkedinGoals: [],
// //     targetAudience: '',
// //     professionalBrand: '',
// //     influencers: '',
// //     examplePosts: '',
// //     uniquePerspective: ''
// //   });
  
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [message, setMessage] = useState('');

// //   const { data: session } = useSession();

// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       if (!session) return;

// //       try{
// //         console.log('fetching profile data...')
// //         const response = await fetch('/api/profile');
// //         console.log('api response status', response.status);


// //         if (response.ok) {
// //           const data = await response.json();
// //           console.log('profile data recieved', data);

// //           if (data.profile && Object.keys(data.profile).length > 0) {
// //           console.log('Setting form data with profile');
// //           setFormData(prev => ({
// //             ...prev,
// //             ...data.profile,
// //             linkedinGoals: Array.isArray(data.profile.linkedinGoals) ? 
// //               data.profile.linkedinGoals : []
// //           }));
// //         } else {
// //           console.log('No profile data found');
// //         }
// //         }
// //       } catch (error) {
// //         console.error('Error fetching profile:', error);
// //       }
// //     };

// //     fetchProfile();
// //   }, [session]);

// //   // Handle form input changes
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value
// //     });
// //   };

// //   // Handle checkbox changes for multiple selections
// //   const handleCheckboxChange = (e) => {
// //     const { name, value, checked } = e.target;
// //     if (checked) {
// //       setFormData({
// //         ...formData,
// //         [name]: [...formData[name], value]
// //       });
// //     } else {
// //       setFormData({
// //         ...formData,
// //         [name]: formData[name].filter(item => item !== value)
// //       });
// //     }
// //   };

// //       // Handle form submission
// //     const handleSubmit = async (e) => {
// //       e.preventDefault();
// //       setIsSubmitting(true);
// //       setMessage('');
      
// //       try {
// //         // Call the API to save profile data
// //         const response = await fetch('/api/profile', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(formData),
// //         });
        
// //         if (!response.ok) {
// //           throw new Error('Failed to save profile');
// //         }
        
// //         setMessage('Profile updated successfully!');
// //       } catch (error) {
// //         setMessage('Error saving profile. Please try again.');
// //         console.error('Save error:', error);
// //       } finally {
// //         setIsSubmitting(false);
// //       }
// //     };

// //   return (
// //     <div className="space-y-6">
// //       <h1 className="text-3xl md:text-4xl font-extrabold">My Profile</h1>
// //       <p className="text-base-content/80">Complete your profile to get personalised LinkedIn content suggestions</p>
      
// //       <form onSubmit={handleSubmit} className="space-y-8">
// //         {/* Show success/error message if any */}
// //         {message && (
// //           <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
// //             {message}
// //           </div>
// //         )}
        
// //         {/* Professional Background Section */}
// //         <div className="card bg-base-100 shadow-lg">
// //           <div className="card-body">
// //             <h2 className="card-title">Professional Background</h2>
// //             <p className="text-sm text-base-content/70">Tell us about your professional experience</p>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

// //             <div className="form-control">
// //                 <label className="label">
// //                   <span className="label-text">Type of Profile</span>
// //                 </label>
// //                 <select 
// //                   name="typeOfProfile" 
// //                   value={formData.typeOfProfile}
// //                   onChange={handleChange}
// //                   className="select select-bordered w-full"
// //                 >
// //                   <option value="" disabled>Select your profile</option>
// //                   <option value="personal">Personal</option>
// //                   <option value="company">Company</option>
                  
// //                 </select>
// //               </div>



// //               <div className="form-control">
// //                 <label className="label">
// //                   <span className="label-text">Industry</span>
// //                 </label>
// //                 <select 
// //                   name="industry" 
// //                   value={formData.industry}
// //                   onChange={handleChange}
// //                   className="select select-bordered w-full"
// //                 >
// //                   <option value="" disabled>Select your industry</option>
// //                   <option value="technology">Technology</option>
// //                   <option value="marketing">Marketing</option>
// //                   <option value="finance">Finance</option>
// //                   <option value="healthcare">Healthcare</option>
// //                   <option value="education">Education</option>
// //                   <option value="other">Other</option>
// //                 </select>
// //               </div>
              
// //               <div className="form-control">
// //                 <label className="label">
// //                   <span className="label-text">Current Role</span>
// //                 </label>
// //                 <input 
// //                   type="text" 
// //                   name="role"
// //                   value={formData.role}
// //                   onChange={handleChange}
// //                   className="input input-bordered w-full"
// //                   placeholder="e.g. Marketing Manager, Software Engineer"
// //                 />
// //               </div>
// //             </div>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
// //               <div className="form-control">
// //                 <label className="label">
// //                   <span className="label-text">Years of Experience</span>
// //                 </label>
// //                 <select 
// //                   name="experience" 
// //                   value={formData.experience}
// //                   onChange={handleChange}
// //                   className="select select-bordered w-full"
// //                 >
// //                   <option value="" disabled>Select experience range</option>
// //                   <option value="0-2">0-2 years</option>
// //                   <option value="3-5">3-5 years</option>
// //                   <option value="6-10">6-10 years</option>
// //                   <option value="11-15">11-15 years</option>
// //                   <option value="15+">15+ years</option>
// //                 </select>
// //               </div>
              
// //               <div className="form-control">
// //                 <label className="label">
// //                   <span className="label-text">Areas of Expertise (3-5 recommended)</span>
// //                 </label>
// //                 <input 
// //                   type="text" 
// //                   name="expertise"
// //                   value={formData.expertise}
// //                   onChange={handleChange}
// //                   className="input input-bordered w-full"
// //                   placeholder="E.g. Digital Marketing, SEO, Content Strategy"
// //                 />
// //                 <label className="label">
// //                   <span className="label-text-alt">Enter areas separated by commas</span>
// //                 </label>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
        
// //         {/* Content Strategy Section */}
// //         <div className="card bg-base-100 shadow-lg">
// //           <div className="card-body">
// //             <h2 className="card-title">Content Strategy</h2>
// //             <p className="text-sm text-base-content/70">Define how you want to position yourself on LinkedIn</p>
            
// //             <div className="form-control mt-4">
// //               <label className="label">
// //                 <span className="label-text">Primary LinkedIn Goals</span>
// //               </label>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// //                 <label className="flex items-center gap-2 cursor-pointer">
// //                   <input 
// //                     type="checkbox" 
// //                     name="linkedinGoals"
// //                     value="networking"
// //                     onChange={handleCheckboxChange}
// //                     className="checkbox" 
// //                   />
// //                   <span>Networking & Connections</span>
// //                 </label>
// //                 <label className="flex items-center gap-2 cursor-pointer">
// //                   <input 
// //                     type="checkbox" 
// //                     name="linkedinGoals"
// //                     value="thoughtLeadership"
// //                     onChange={handleCheckboxChange}
// //                     className="checkbox" 
// //                   />
// //                   <span>Thought Leadership</span>
// //                 </label>
// //                 <label className="flex items-center gap-2 cursor-pointer">
// //                   <input 
// //                     type="checkbox" 
// //                     name="linkedinGoals"
// //                     value="jobHunting"
// //                     onChange={handleCheckboxChange}
// //                     className="checkbox" 
// //                   />
// //                   <span>Job Hunting</span>
// //                 </label>
// //                 <label className="flex items-center gap-2 cursor-pointer">
// //                   <input 
// //                     type="checkbox" 
// //                     name="linkedinGoals"
// //                     value="businessDevelopment"
// //                     onChange={handleCheckboxChange}
// //                     className="checkbox" 
// //                   />
// //                   <span>Business Development/Sales</span>
// //                 </label>
// //               </div>
// //             </div>
            
// //             <div className="form-control mt-4">
// //               <label className="label">
// //                 <span className="label-text">Target Audience</span>
// //               </label>
// //               <textarea 
// //                 name="targetAudience"
// //                 value={formData.targetAudience}
// //                 onChange={handleChange}
// //                 className="textarea textarea-bordered h-20"
// //                 placeholder="Describe who you want to reach with your content (e.g. Marketing professionals, Tech startup founders)"
// //               />
// //             </div>
            
// //             <div className="form-control mt-2">
// //               <label className="label">
// //                 <span className="label-text">Professional Brand</span>
// //               </label>
// //               <textarea 
// //                 name="professionalBrand"
// //                 value={formData.professionalBrand}
// //                 onChange={handleChange}
// //                 className="textarea textarea-bordered h-20"
// //                 placeholder="What do you want to be known for? What&apos;s your professional value proposition?"
// //               />
// //             </div>
// //           </div>
// //         </div>
        
// //         {/* Influences Section */}
// //         <div className="card bg-base-100 shadow-lg">
// //           <div className="card-body">
// //             <h2 className="card-title">Influences & Examples</h2>
// //             <p className="text-sm text-base-content/70">Share content styles that inspire you</p>
            
// //             <div className="form-control mt-4">
// //               <label className="label">
// //                 <span className="label-text">LinkedIn Creators You Admire</span>
// //               </label>
// //               <textarea 
// //                 name="influencers"
// //                 value={formData.influencers}
// //                 onChange={handleChange}
// //                 className="textarea textarea-bordered h-20"
// //                 placeholder="Which LinkedIn creators do you follow and admire? What do you like about their content?"
// //               />
// //             </div>
            
// //             <div className="form-control mt-2">
// //               <label className="label">
// //                 <span className="label-text">Example Posts You Like</span>
// //               </label>
// //               <textarea 
// //                 name="examplePosts"
// //                 value={formData.examplePosts}
// //                 onChange={handleChange}
// //                 className="textarea textarea-bordered h-20"
// //                 placeholder="Paste URLs or describe LinkedIn posts that resonated with you"
// //               />
// //             </div>
// //           </div>
// //         </div>
        
// //         {/* Unique Perspective Section */}
// //         <div className="card bg-base-100 shadow-lg">
// //           <div className="card-body">
// //             <h2 className="card-title">Your Unique Perspective</h2>
// //             <p className="text-sm text-base-content/70">What makes your professional voice unique?</p>
            
// //             <div className="form-control mt-4">
// //               <label className="label">
// //                 <span className="label-text">What&apos;s Your Story?</span>
// //               </label>
// //               <textarea 
// //                 name="uniquePerspective"
// //                 value={formData.uniquePerspective}
// //                 onChange={handleChange}
// //                 className="textarea textarea-bordered h-32"
// //                 placeholder="Share key experiences, challenges you&apos;ve overcome, or unique perspectives you bring to your field"
// //               />
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="flex justify-end mt-8">
// //           <button 
// //             type="submit" 
// //             className="btn btn-primary"
// //             disabled={isSubmitting}
// //           >
// //             {isSubmitting ? 
// //               <span className="loading loading-spinner loading-sm"></span> : 
// //               'Save Profile'
// //             }
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }


// // app/dashboard/profile/page.js


// "use client";

// import Link from 'next/link';
// import { useEffect, useState, Suspense } from 'react'; // Added Suspense just in case, can remove if not needed for page itself
// import { useSession } from 'next-auth/react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// // Main component renamed to reflect its new purpose
// export default function SavedStrategyPage() { // Renamed component
//   const { data: session, status: sessionStatus } = useSession();

//   // State for fetched data
//   const [strategyData, setStrategyData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for Tabs
//   const [activeTab, setActiveTab] = useState('foundation'); // 'foundation', 'calendar', 'posts'

//   // State for Post Generation / Modal (similar to ResultsContent)
//   const [generatingPostId, setGeneratingPostId] = useState(null); // For loading state on generate button
//   const [postToShowInModal, setPostToShowInModal] = useState(null); // Content for the modal
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [modalPostIndex, setModalPostIndex] = useState(null); // Index for the post in the modal

//   // Fetch profile data containing the saved strategy
//   useEffect(() => {
//     const fetchProfile = async () => {
//       // Only fetch if session is loaded and authenticated
//       if (sessionStatus === 'authenticated') {
//         try {
//           console.log('Fetching profile data for strategy display...');
//           setIsLoading(true);
//           const response = await fetch('/api/profile'); // Use your GET profile route
//           console.log('API response status:', response.status);

//           if (!response.ok) {
//             throw new Error(`Failed to fetch profile (${response.status})`);
//           }

//           const data = await response.json();
//           console.log('Profile data received:', data);

//           if (data.profile?.linkedinStrategy) {
//             console.log('Setting strategy data...');
//             setStrategyData(data.profile.linkedinStrategy);
//             setError(null); // Clear previous errors on success
//           } else {
//             console.log('No saved LinkedIn strategy found in profile.');
//             // Set strategyData to an empty object or similar if needed, or handle this state in the UI
//             setStrategyData({}); // Indicate profile loaded but no strategy saved
//             setError('No saved strategy found. Please generate and save one first.'); // Set an informative error/message
//           }
//         } catch (err) {
//           console.error('Error fetching profile:', err);
//           setError(err.message || 'An error occurred while fetching data.');
//           setStrategyData(null); // Clear data on error
//         } finally {
//           setIsLoading(false);
//         }
//       } else if (sessionStatus === 'loading') {
//         setIsLoading(true); // Keep loading if session is loading
//       } else {
//         // Handle unauthenticated state if necessary (e.g., redirect or message)
//         setIsLoading(false);
//         setError('Please log in to view your saved strategy.');
//       }
//     };

//     fetchProfile();
//   }, [sessionStatus]); // Re-run when session status changes

//   // Extracted data (handle potential null state)
//   const foundation = strategyData?.foundation;
//   const contentCalendar = strategyData?.contentCalendar; // Parsed calendar object
//   const savedPosts = strategyData?.savedPosts || []; // Default to empty array

//   // Re-fetch data function (to update UI after saving a post)
//   const refetchProfileData = async () => {
//     try {
//       console.log('Re-fetching profile data after post save...');
//       // Re-fetch logic similar to useEffect
//       const response = await fetch('/api/profile');
//       if (!response.ok) throw new Error('Failed to re-fetch profile');
//       const data = await response.json();
//       if (data.profile?.linkedinStrategy) {
//         setStrategyData(data.profile.linkedinStrategy);
//       }
//     } catch (err) {
//       console.error("Error re-fetching profile data:", err);
//       // Optionally show an error message
//     }
//   };


//   // --- Handlers for Post Generation/Saving/Viewing ---
//   // Adapted from ResultsContent, using fetched data

//   const handleGeneratePost = async (pillar, topic, approach, contentType, index) => {
//     // Prevent generation if strategyData isn't loaded
//     if (!strategyData) return;
//     console.log("handleGeneratePost called for index:", index);
//     try {
//       setGeneratingPostId(index);
//       setPostToShowInModal("Generating..."); // Show loading state in modal potentially
//       setShowPostModal(true); // Open modal early? Or after success? Preference. Let's open after success.
//       setModalPostIndex(index); // Set index early

//       const response = await fetch('/api/create-post', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           pillar, topic, approach, contentType,
//           // Get userVoice/perspective from saved strategy answers if needed by API
//           userVoice: strategyData?.answers?.userVoice,
//           uniquePerspective: strategyData?.answers?.uniquePerspective
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate post');
//       }

//       const data = await response.json();
//       setPostToShowInModal(data.post); // Set generated content for modal
//       setShowPostModal(true); // Now show modal with content

//     } catch (error) {
//       console.error('Error generating post:', error);
//       alert('Failed to generate post. Please try again.');
//       setShowPostModal(false); // Close modal on error
//       setModalPostIndex(null);
//     } finally {
//       setGeneratingPostId(null); // Reset loading state for the specific button
//     }
//   };

//   const handleViewPost = (index) => {
//     console.log("handleViewPost called for index:", index);
//     const postToView = savedPosts.find(post => post.postIndex === index);
//     if (postToView) {
//       setPostToShowInModal(postToView.content); // Show saved content
//       setModalPostIndex(index); // Set index
//       setShowPostModal(true); // Show modal
//     } else {
//       console.error("Could not find saved post for index:", index);
//       alert("Could not find the saved post.");
//     }
//   };

//  const savePost = async () => {
//     console.log("--- savePost: Function started ---");
//     if (postToShowInModal === "Generating..." || !postToShowInModal || modalPostIndex === null) {
//        console.log(`--- savePost: Aborted - postToShowInModal: ${postToShowInModal}, modalPostIndex: ${modalPostIndex} ---`);
//        alert("Cannot save post while generating or if content is missing.");
//        return;
//     }
//     // Find the corresponding calendar row using modalPostIndex
//      if (!contentCalendar || !contentCalendar.rows || modalPostIndex >= contentCalendar.rows.length) {
//         console.error("--- savePost: Aborted - Invalid calendar data or modalPostIndex ---");
//         alert("Error: Could not find calendar data for this post index.");
//         return;
//     }
//     const calendarRow = contentCalendar.rows[modalPostIndex];

//     try {
//       const bodyPayload = {
//         content: postToShowInModal, // Use the content shown in the modal
//         postIndex: modalPostIndex,
//         pillar: calendarRow.pillar,
//         topic: calendarRow.topic,
//         approach: calendarRow.approach,
//         contentType: calendarRow.contentType,
//         weekDay: calendarRow.weekDay
//       };
//       console.log("--- savePost: Sending this payload:", bodyPayload);

//       const response = await fetch('/api/posts/save', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(bodyPayload)
//       });
//       console.log("--- savePost: Received response - Status:", response.status, "OK:", response.ok);

//       if (!response.ok) {
//         let errorBody = null;
//         try {
//             errorBody = await response.json();
//             console.error("--- savePost: Error response body:", errorBody);
//         } catch (e) {
//             console.error("--- savePost: Could not parse error response body. Response text might be:", await response.text().catch(() => "Could not read response text"));
//         }
//         throw new Error(`Failed to save post. Status: ${response.status}`);
//       }

//       console.log("--- savePost: Response OK. Showing success alert.");
//       alert('Post saved successfully!');
//       setShowPostModal(false);
//       setModalPostIndex(null);
//       refetchProfileData(); // Re-fetch profile to update UI (show "View" button)

//     } catch (error) {
//       console.error('--- savePost: Error caught in catch block:', error);
//       alert('Failed to save post. Please try again.');
//     } finally {
//       console.log("--- savePost: Finally block executing ---");
//     }
//   };

//   const copyToClipboard = (text) => {
//     if (!text || text === "Generating...") {
//         alert("No post content to copy.");
//         return;
//     }
//     navigator.clipboard.writeText(text)
//       .then(() => {
//         alert("Post copied to clipboard!");
//       })
//       .catch((err) => {
//         console.error('Error copying text: ', err);
//         alert("Failed to copy post");
//       });
//   };

//   // --- UI Components (can be moved to separate files) ---

//   // Custom component wrapper for markdown content (same as before)
//   const MarkdownContent = ({ content }) => (
//       content ? (
//         <div className="prose prose-lg space-y-6 prose-emerald max-w-none text-gray-800">
//           <ReactMarkdown
//             remarkPlugins={[remarkGfm]}
//             components={{ /* ... your custom components h2, h3 etc ... */ }}
//           >
//             {content}
//           </ReactMarkdown>
//         </div>
//       ) : <p>No content available.</p>
//   );

//   // Calendar Table Component - Modified for Generate/View logic
//   const ContentCalendarTable = ({ calendar, generatingPostId }) => {
//     if (!calendar || !calendar.rows || calendar.rows.length === 0) {
//       return <p>No calendar data available.</p>;
//     }

//     return (
//       <div className="overflow-x-auto my-8">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Week - Day</th>
//               <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Pillar</th>
//               <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Topic</th>
//               {/* Add other headers */}
//               <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Approach</th>
//               <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Content Type</th>
//               <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-left text-sm font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {calendar.rows.map((row, index) => {
//               // Check if post for this index is saved
//               const isPostSaved = savedPosts.some(post => post.postIndex === index);
//               return (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border border-gray-300 text-sm">{row.weekDay}</td>
//                   <td className="px-4 py-2 border border-gray-300 text-sm">{row.pillar}</td>
//                   <td className="px-4 py-2 border border-gray-300 text-sm">{row.topic}</td>
//                   {/* Add other cells */}
//                   <td className="px-4 py-2 border border-gray-300 text-sm">{row.approach}</td>
//                   <td className="px-4 py-2 border border-gray-300 text-sm">{row.contentType}</td>
//                   <td className="px-4 py-2 border border-gray-300 text-sm text-center">
//                     {isPostSaved ? (
//                       <button
//                         onClick={() => handleViewPost(index)}
//                         className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
//                       >
//                         View Post
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => handleGeneratePost(row.pillar, row.topic, row.approach, row.contentType, index)}
//                         className="px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700 transition-colors"
//                         disabled={generatingPostId === index}
//                       >
//                         {generatingPostId === index ? 'Generating...' : 'Generate Post'}
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   };


//   // --- Main Return JSX ---

//   if (isLoading) {
//     return <div className="text-center p-10">Loading profile data...</div>;
//   }

// //   if (error) { // Display error prominently if data fetch failed
// //     return <div className="alert alert-error p-10">{error}</div>;
// //   }

//   if (!strategyData) {
//      // Handle case where profile loaded but no strategy data exists yet
//      // Might want a different message than the error state
//      return <div className="alert alert-info p-10">No LinkedIn strategy has been saved yet. Please generate one first.</div>;
//   }


//   return (
//     <div className="space-y-6 p-4 md:p-8">
//       <h1 className="text-3xl md:text-4xl font-extrabold">My Saved Strategy & Calendar</h1>

//        {/* Optional: Display error inline if needed after initial load */}
//        {error && <div className="alert alert-warning mt-4">{error}</div>}


//       {/* Tab Buttons */}
//       <div role="tablist" className="tabs tabs-lifted">
//         <button
//           role="tab"
//           className={`tab ${activeTab === 'foundation' ? 'tab-active [--tab-bg:hsl(var(--p))] [--tab-border-color:hsl(var(--p))] text-primary-content' : ''}`}
//           onClick={() => setActiveTab('foundation')}
//         >
//           Strategy Foundation
//         </button>
//         <button
//           role="tab"
//           className={`tab ${activeTab === 'calendar' ? 'tab-active [--tab-bg:hsl(var(--p))] [--tab-border-color:hsl(var(--p))] text-primary-content' : ''}`}
//           onClick={() => setActiveTab('calendar')}
//         >
//           Content Calendar
//         </button>
//         <button
//           role="tab"
//           className={`tab ${activeTab === 'posts' ? 'tab-active [--tab-bg:hsl(var(--p))] [--tab-border-color:hsl(var(--p))] text-primary-content' : ''}`}
//           onClick={() => setActiveTab('posts')}
//         >
//           Saved Posts ({savedPosts.length})
//         </button>
//          {/* Add Billing Tab/Button later */}
//          {/* <button role="tab" className={`tab ${activeTab === 'billing' ? 'tab-active' : ''}`} onClick={() => setActiveTab('billing')}>Billing</button> */}
//       </div>

//       {/* Tab Content */}
//       <div className="mt-6">
//         {activeTab === 'foundation' && (
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h2 className="card-title">Strategy Foundation</h2>
//               {foundation ? (
//                 <MarkdownContent content={foundation} />
//               ) : (
//                 <p>No foundation content saved.</p>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === 'calendar' && (
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h2 className="card-title">Content Calendar</h2>
//               <p className="text-sm mb-4">Generate posts for your plan or view saved ones.</p>
//               {contentCalendar ? (
//                  <ContentCalendarTable
//                    calendar={contentCalendar}
//                    generatingPostId={generatingPostId}
//                  />
//               ) : (
//                 <p>No content calendar data saved.</p>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === 'posts' && (
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h2 className="card-title">Saved Posts</h2>
//               {savedPosts.length > 0 ? (
//                 <div className="space-y-4">
//                   {savedPosts.map((post, index) => (
//                     <div key={post._id || post.postIndex || index} className="border border-base-300 rounded-md p-4">
//                        <p className="text-xs text-gray-500 mb-2">Index: {post.postIndex} | WeekDay: {post.weekDay || 'N/A'}</p>
//                        <p className="text-sm font-semibold mb-1">Pillar: {post.pillar || 'N/A'}</p>
//                        <p className="text-sm mb-2">Topic: {post.topic || 'N/A'}</p>
//                        <div className="prose prose-sm max-w-none">
//                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content || ''}</ReactMarkdown>
//                        </div>
//                        <button
//                            onClick={() => copyToClipboard(post.content)}
//                            className="btn btn-xs btn-outline mt-2"
//                        >
//                            Copy Post
//                        </button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No posts have been saved yet.</p>
//               )}
//             </div>
//           </div>
//         )}

//          {/* {activeTab === 'billing' && (
//             <div className="card bg-base-100 shadow-xl">
//                 <div className="card-body">
//                 <h2 className="card-title">Billing</h2>
//                 <p>Manage your subscription here.</p>
//                 {/* Add Stripe Portal Button Here */}
//             {/* </div>
//             </div>
//         )} */}

//       </div>

//        {/* Post Modal (Reused from ResultsContent logic) */}
//         {showPostModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <h2 className="text-xl font-bold mb-4">
//                 {/* Check if viewing a saved post or a newly generated one */}
//                 {savedPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal)
//                   ? `Viewing Saved Post (Index ${modalPostIndex})`
//                   : `Generated Post (Index ${modalPostIndex})`
//                 }
//               </h2>
//               {/* Render the post content */}
//               {postToShowInModal === "Generating..." ? (
//                  <div className="text-center p-4">Generating post...</div>
//               ) : (
//                  <div className="prose prose-sm max-w-none">
//                     <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                       {postToShowInModal || ''}
//                     </ReactMarkdown>
//                  </div>
//               )}
//               {/* Modal Actions */}
//               <div className="mt-6 flex flex-wrap justify-end gap-2">
//                 <button
//                   onClick={() => {
//                     setShowPostModal(false);
//                     setModalPostIndex(null);
//                     setPostToShowInModal(null); // Clear modal content
//                   }}
//                   className="btn btn-sm btn-ghost"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={() => copyToClipboard(postToShowInModal)}
//                   className="btn btn-sm btn-outline"
//                   disabled={!postToShowInModal || postToShowInModal === "Generating..."}
//                 >
//                   Copy to Clipboard
//                 </button>
//                 {/* Only show Save button if it's not already saved OR if we allow re-saving */}
//                 {!savedPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) && postToShowInModal !== "Generating..." && (
//                   <button
//                     onClick={savePost}
//                     className="btn btn-sm btn-primary"
//                   >
//                     Save Post
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//     </div>
//   );
// }


///// final code from gemini?

// // app/dashboard/profile/page.js
// "use client";

// import { addDays, format, getDay, nextMonday, startOfDay } from 'date-fns'
// import { useEffect, useState, Suspense } from 'react';
// import { useSession } from 'next-auth/react';
// import Link from 'next/link'; // Import Link
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import clsx from 'clsx'; // Optional but helpful for conditional classes

// // --- Reusable Button Component (or import from components/Button.jsx) ---
// const Button = ({
//   children, onClick, type = 'button', variant = 'primary', size = 'md', disabled = false, className = '', ...props
// }) => {
//   const baseStyles = 'inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';
//   const variants = {
//     primary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500', // Changed 'cta' to 'primary' for general use
//     secondary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
//     info: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400',
//     success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
//     ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-indigo-500 border-none shadow-none',
//     outline: 'bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-indigo-500',
//   };
//   const sizes = {
//     xs: 'px-2.5 py-1.5 text-xs',
//     sm: 'px-3 py-1.5 text-sm',
//     md: 'px-4 py-2 text-sm',
//     lg: 'px-5 py-2.5 text-base',
//   };
//   const combinedClassName = clsx( baseStyles, variants[variant] || variants.primary, sizes[size] || sizes.md, className );
//   return ( <button type={type} onClick={onClick} disabled={disabled} className={combinedClassName} {...props}> {children} </button> );
// };
// // --- End Button Component ---

// // --- Markdown Component (or import) ---
// const MarkdownContent = ({ content, className = "prose prose-lg max-w-none" }) => (
//     content ? <div className={className}><ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown></div> : <p className="italic text-gray-500">No content available.</p>
// );
// // --- End Markdown Component ---

// // --- Calendar Table Component (or import) ---

// //// new version with dates /////// ///// // -----

// // --- Updated ContentCalendarTable definition using date-fns ---
// const ContentCalendarTable = ({ calendar, savedPosts, generatingPostId, handleGeneratePost, handleViewPost, startDate }) => {
//   if (!calendar || !calendar.rows || calendar.rows.length === 0) {
//       return <p className="text-center text-gray-500 italic my-4">No calendar data available to display.</p>;
//   }
//   const postsLookup = savedPosts || [];

//   // Helper function moved inside or defined above component
//   const addWeekdays = (date, daysToAdd) => {
//     if (!date) return null;
//     let currentDate = date;
//     let addedDays = 0;
//     // Loop until we have added the required number of weekdays
//     while (addedDays < daysToAdd) {
//       currentDate = addDays(currentDate, 1); // Add one calendar day
//       const dayOfWeek = getDay(currentDate); // 0=Sun, 1=Mon... 6=Sat
//       // Only count it if it's not Sunday (0) or Saturday (6)
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
//             {/* Updated Header */}
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

//             // Calculate the date for this row using the helper
//             const currentDate = addWeekdays(startDate, index);

//             // Format the date using date-fns format function
//             const formattedDate = currentDate
//               ? format(currentDate, 'EEE, MMM d') // Example: "Mon, Apr 21"
//               : 'Calculating...'; // Fallback while loading/calculating startDate

//             return (
//               <tr key={index} className="hover:bg-base-200/50">
//                 {/* Use formattedDate */}
//                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content whitespace-nowrap">{formattedDate}</td>
//                 {/* Other cells */}
//                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.pillar || '-'}</td>
//                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.topic || '-'}</td>
//                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.approach || '-'}</td>
//                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.contentType || '-'}</td>
//                 <td className="px-4 py-3 border-b border-base-300 text-sm text-center whitespace-nowrap">
//                   {/* Conditional Button Logic */}
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

// //// ------- end -------- //////








// // const ContentCalendarTable = ({ calendar, savedPosts, generatingPostId, handleGeneratePost, handleViewPost }) => {
// //   if (!calendar || !calendar.rows || calendar.rows.length === 0) {
// //     return <p className="text-center text-gray-500 italic my-4">No calendar data available to display.</p>;
// //   }
// //   const postsLookup = savedPosts || [];

// //   return (
// //     <div className="overflow-x-auto my-6 shadow border border-base-300 rounded-lg">
// //       <table className="w-full border-collapse table-auto">
// //         <thead className="bg-base-200">
// //           <tr>
// //             <th className="px-4 py-3 border-b border-base-300 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Week - Day</th>
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
// //             return (
// //               <tr key={index} className="hover:bg-base-200/50">
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content whitespace-nowrap">{row.weekDay || '-'}</td>
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.pillar || '-'}</td>
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.topic || '-'}</td>
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.approach || '-'}</td>
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-base-content">{row.contentType || '-'}</td>
// //                 <td className="px-4 py-3 border-b border-base-300 text-sm text-center whitespace-nowrap">
// //                   {isPostSaved ? (
// //                     <Button size="xs" variant="info" onClick={() => handleViewPost(index)}>View Post</Button>
// //                   ) : (
// //                     <Button
// //                       size="xs"
// //                       variant="success"
// //                       onClick={() => handleGeneratePost(row.pillar, row.topic, row.approach, row.contentType, index)}
// //                       disabled={generatingPostId === index}
// //                     >
// //                       {generatingPostId === index ? 'Generating...' : 'Generate Post'}
// //                     </Button>
// //                   )}
// //                 </td>
// //               </tr>
// //             );
// //           })}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };
// // --- End Calendar Table Component ---


// // --- Main Page Component ---
// export default function SavedStrategyPage() {
//   const { data: session, status: sessionStatus } = useSession();

//   // State
//   const [calendarStartDate, setCalendarStartDate] = useState(null); // State for start date
//   const [strategyData, setStrategyData] = useState(null); // Holds the fetched linkedinStrategy object
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('foundation'); // Default tab
//   const [generatingPostId, setGeneratingPostId] = useState(null); // Loading state for generate button (index)
//   const [postToShowInModal, setPostToShowInModal] = useState(null); // Content for the modal
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [modalPostIndex, setModalPostIndex] = useState(null); // Index of post in modal

//   // Data Fetching Function
//   const fetchProfileData = async () => {
//      // Only fetch if session is loaded and authenticated
//      if (sessionStatus === 'authenticated') {
//        let fetchedStrategyData = null;
//        let fetchError = null;
//        try {
//          console.log('Fetching profile data...');
//          setIsLoading(true); // Ensure loading is true at start
//          const response = await fetch('/api/profile');
//          console.log('Profile fetch response status:', response.status);
//          if (!response.ok) throw new Error(`Failed to fetch profile (${response.status})`);
//          const data = await response.json();
//          console.log('Profile data received:', data);

//          if (data.profile?.linkedinStrategy) {
//            console.log('Saved strategy found.');
//            fetchedStrategyData = data.profile.linkedinStrategy;
//          } else {
//            console.log('No saved LinkedIn strategy found in profile.');
//            fetchedStrategyData = null; // Explicitly set to null if not found
//          }
//        } catch (err) {
//          console.error('Error fetching profile:', err);
//          fetchError = err.message || 'An error occurred while fetching data.';
//          fetchedStrategyData = null;
//        } finally {
//          setStrategyData(fetchedStrategyData);
//          setError(fetchError);
//          setIsLoading(false);
//        }
//      } else if (sessionStatus === 'loading') {
//        setIsLoading(true); // Still loading session
//      } else { // Unauthenticated
//        setIsLoading(false);
//        setError('Please log in to view your saved strategy.');
//      }
//   };


//   // Initial Data Load
//   // useEffect(() => {
//   //   fetchProfileData();
//   // }, [sessionStatus]); // Re-run only when session status changes

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       // Only fetch if session is loaded and authenticated
//       if (sessionStatus === 'authenticated') {
//         let fetchedStrategyData = null;
//         let fetchError = null;
//         try {
//           console.log('Fetching profile data...');
//           setIsLoading(true);
//           const response = await fetch('/api/profile');
//           console.log('Profile fetch response status:', response.status);
//           if (!response.ok) throw new Error(`Failed to fetch profile (${response.status})`);
//           const data = await response.json();
//           console.log('Profile data received:', data);

//           if (data.profile?.linkedinStrategy) {
//             console.log('Saved strategy found.');
//             // Set the main strategy data state
//             setStrategyData(data.profile.linkedinStrategy);

//             // --- Calculate and Set Start Date RIGHT HERE ---
//             const today = startOfDay(new Date()); // Use startOfDay from date-fns
//             const nextMon = getDay(today) === 1 ? today : nextMonday(today); // Use getDay and nextMonday from date-fns
//             setCalendarStartDate(nextMon); // Set the dedicated state for the start date
//             console.log('Calculated Calendar Start Date:', nextMon);
//             // --- End Calculate Start Date ---

//             setError(null); // Clear previous errors
//           } else {
//             console.log('No saved LinkedIn strategy found in profile.');
//             fetchedStrategyData = null; // Set strategy data to null
//             // No redirect needed here based on our last discussion
//           }
//         } catch (err) {
//            console.error('Error fetching profile:', err);
//            fetchError = err.message || 'An error occurred while fetching data.';
//            fetchedStrategyData = null; // Ensure data is null on error
//         } finally {
//             // Set state based on fetch results
//             // Note: setStrategyData is already handled inside the if/else/catch
//             setError(fetchError);
//             setIsLoading(false);
//         }
//       } else if (sessionStatus === 'loading') {
//         setIsLoading(true);
//       } else { // Unauthenticated
//         setIsLoading(false);
//         setError('Please log in to view your saved strategy.');
//       }
//     }; // End of fetchProfileData function definition

//     fetchProfileData(); // Call the function

//   }, [sessionStatus]); // Dependency array

//   // Extracted data (handle potential null state during render)
//   const foundation = strategyData?.foundation;
//   const contentCalendar = strategyData?.contentCalendar;
//   const savedPosts = strategyData?.savedPosts || [];

//   // --- Handlers ---// Replace your handleGeneratePost with this version:
//   const handleGeneratePost = async (pillar, topic, approach, contentType, index) => {
//     // Check if strategy data (needed for payload) is loaded
//     if (!strategyData?.answers) {
//         console.error("Cannot generate post, strategyData or strategyData.answers not loaded.");
//         alert("Could not load required strategy data to generate post.");
//         return;
//     }
//     console.log("handleGeneratePost called for index:", index);
//     let generatedContent = null;
//     try {
//       setGeneratingPostId(index);
//       setPostToShowInModal("Generating...");
//       setModalPostIndex(index);
//       setShowPostModal(true);

//       // Define the payload using data from arguments and state
//       const payload = {
//         pillar, topic, approach, contentType,
//         userVoice: strategyData.answers.userVoice, // Use checked strategyData
//         uniquePerspective: strategyData.answers.uniquePerspective // Use checked strategyData
//       };
//       console.log("--- handleGeneratePost: Sending this payload to /api/create-post:", payload);

//       // --- Make sure the fetch options are present and correct ---
//       const response = await fetch('/api/create-post', {
//         method: 'POST', // Specify POST
//         headers: {
//           'Content-Type': 'application/json' // Specify JSON content
//         },
//         body: JSON.stringify(payload) // Send the payload as JSON string
//       });
//       // --- End of fetch options ---

//       console.log("--- handleGeneratePost: Received response - Status:", response.status, "OK:", response.ok);

//       if (!response.ok) {
//         let errorBody = null;
//         try {
//             errorBody = await response.json();
//             console.error("--- handleGeneratePost: Error response body:", errorBody);
//         } catch (e) {
//             console.error("--- handleGeneratePost: Could not parse error response body. Response text might be:", await response.text().catch(() => "Could not read response text"));
//         }
//         throw new Error(`Failed to generate post. Status: ${response.status}`);
//       }

//       // If response is OK
//       const data = await response.json();
//       generatedContent = data.post;
//       setPostToShowInModal(generatedContent); // Update modal with actual content

//     } catch (error) {
//       console.error('Error generating post:', error);
//       alert(`Failed to generate post: ${error.message}`); // Show error message in alert
//       // Optionally close modal on error or show error state in modal
//       setShowPostModal(false);
//       setModalPostIndex(null);
//       setPostToShowInModal(null);
//     } finally {
//       setGeneratingPostId(null); // Reset loading state for the button
//     }
//   };

//   const handleViewPost = (index) => {
//     console.log("handleViewPost called for index:", index);
//     const postToView = savedPosts.find(post => post.postIndex === index);
//     if (postToView) {
//       setPostToShowInModal(postToView.content);
//       setModalPostIndex(index);
//       setShowPostModal(true);
//     } else {
//       console.error("Could not find saved post for index:", index);
//       alert("Could not find the saved post.");
//     }
//   };

//  const savePost = async () => {
//     console.log("--- savePost: Function started ---");
//     // Check prerequisites carefully
//     if (postToShowInModal === "Generating..." || !postToShowInModal || modalPostIndex === null) {
//        console.log(`--- savePost: Aborted - Invalid state: postToShowInModal: ${postToShowInModal}, modalPostIndex: ${modalPostIndex} ---`);
//        return;
//     }
//     if (!contentCalendar?.rows?.[modalPostIndex]) {
//         console.error("--- savePost: Aborted - Could not find calendar row for index:", modalPostIndex);
//         alert("Internal error: Cannot find calendar data for this post.");
//         return;
//     }
//     const calendarRow = contentCalendar.rows[modalPostIndex];

//     try {
//       const bodyPayload = { /* ... construct payload using calendarRow and postToShowInModal ... */ };
//        // Assign values explicitly
//        bodyPayload.content = postToShowInModal;
//        bodyPayload.postIndex = modalPostIndex;
//        bodyPayload.pillar = calendarRow.pillar;
//        bodyPayload.topic = calendarRow.topic;
//        bodyPayload.approach = calendarRow.approach;
//        bodyPayload.contentType = calendarRow.contentType;
//        bodyPayload.weekDay = calendarRow.weekDay;

//       console.log("--- savePost: Sending this payload:", bodyPayload);
//       const response = await fetch('/api/posts/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bodyPayload) });
//       console.log("--- savePost: Received response - Status:", response.status, "OK:", response.ok);

//       if (!response.ok) { /* ... error handling ... */ throw new Error(`Save failed: ${response.status}`); }

//       console.log("--- savePost: Response OK. Showing success alert.");
//       alert('Post saved successfully!');
//       setShowPostModal(false);
//       setModalPostIndex(null);
//       setPostToShowInModal(null);
//       fetchProfileData(); // Re-fetch profile to update UI

//     } catch (error) { /* ... error handling ... */ }
//      finally { /* ... finally block ... */ }
//   };

//   const copyToClipboard = (text) => { /* ... implementation ... */ };

//   // --- Main Return JSX ---

//   if (isLoading) {
//     return <div className="flex justify-center items-center min-h-[300px]"><span className="loading loading-lg"></span></div>;
//   }

//   // Show error if fetch failed
//   if (error && !strategyData) {
//      return (
//         <div className="p-4 md:p-8">
//              <div className="alert alert-error shadow-lg">
//                 <div>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                     <span>Error: {error}</span>
//                 </div>
//              </div>
//         </div>
//      );
//   }

//   // Show message and link if loading is done, no error, but no strategy found
//   if (!strategyData) {
//     return (
//       <div className="space-y-6 p-4 md:p-8 text-center max-w-md mx-auto">
//          <h1 className="text-2xl md:text-3xl font-bold">No Strategy Found</h1>
//          <p className="text-base-content/80">
//            You haven't generated and saved your LinkedIn strategy yet. Get started now!
//          </p>
//          <Link href="/linkedin-strategy" className="btn btn-primary">
//              Generate Your Strategy
//          </Link>
//       </div>
//     );
//   }

//   // If loading done, no error, and strategyData EXISTS, render the tabs
//   return (
//     <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
//       <h1 className="text-3xl md:text-4xl font-extrabold">My Saved Strategy & Calendar</h1>

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
//         {activeTab === 'calendar' && (
//              <div className="card bg-base-100 shadow-xl"><div className="card-body">
//                 <h2 className="card-title mb-2">Content Calendar</h2>
//                 <p className="text-sm mb-4 text-base-content/70">Generate posts for your plan or view saved ones.</p>
//                 <ContentCalendarTable
//                    calendar={contentCalendar}
//                    savedPosts={savedPosts}
//                    generatingPostId={generatingPostId}
//                    handleGeneratePost={handleGeneratePost}
//                    handleViewPost={handleViewPost}
//                    startDate={calendarStartDate} // <-- PASS THE START DATE PROP

//                  />
//              </div></div>
//         )}
//          {activeTab === 'posts' && (
//              <div className="card bg-base-100 shadow-xl"><div className="card-body">
//                 <h2 className="card-title mb-4">Saved Posts</h2>
//                 {savedPosts.length > 0 ? (
//                    <div className="space-y-4">
//                       {savedPosts.slice().sort((a, b) => (a.postIndex || 0) - (b.postIndex || 0)) // Sort by index just in case
//                           .map((post, loopIndex) => (
//                           <div key={post._id || post.postIndex || loopIndex} className="border border-base-300 rounded-lg p-4 bg-base-200/30">
//                              <div className="flex justify-between items-center mb-2 text-xs text-base-content/70">
//                                 <span>Index: {post.postIndex ?? 'N/A'} | Day: {post.weekDay || 'N/A'}</span>
//                                 {post.savedAt && <span>Saved: {new Date(post.savedAt).toLocaleDateString()}</span>}
//                              </div>
//                              <p className="text-sm font-semibold mb-1">Pillar: {post.pillar || 'N/A'}</p>
//                              <p className="text-sm mb-3">Topic: {post.topic || 'N/A'}</p>
//                              <MarkdownContent content={post.content || ''} className="prose prose-sm max-w-none bg-white p-3 rounded border border-base-300" />
//                              <div className="mt-3 text-right">
//                                 <Button variant="outline" size="xs" onClick={() => copyToClipboard(post.content)}>Copy Post</Button>
//                              </div>
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
//                 <h2 className="text-xl font-bold mb-4 text-base-content flex-shrink-0">
//                     {savedPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal)
//                       ? `Viewing Saved Post (Row ${modalPostIndex !== null ? modalPostIndex + 1 : 'N/A'})`
//                       : `Generated Post (Row ${modalPostIndex !== null ? modalPostIndex + 1 : 'N/A'})`
//                     }
//                 </h2>
//                 <div className="flex-grow overflow-y-auto mb-6 pr-2 border rounded-md bg-white p-4"> {/* Scrollable content area */}
//                    {postToShowInModal === "Generating..." ? (
//                      <div className="text-center p-10"><span className="loading loading-dots loading-md"></span></div>
//                    ) : (
//                      <MarkdownContent content={postToShowInModal || ''} className="prose prose-sm max-w-none" />
//                    )}
//                 </div>
//                 <div className="flex-shrink-0 mt-auto flex flex-wrap justify-end gap-2">
//                     <Button variant="ghost" size="sm" onClick={() => { setShowPostModal(false); setModalPostIndex(null); setPostToShowInModal(null); }}>Close</Button>
//                     <Button variant="outline" size="sm" onClick={() => copyToClipboard(postToShowInModal)} disabled={!postToShowInModal || postToShowInModal === "Generating..."}>Copy</Button>
//                     {/* Only show Save button if it's newly generated content */}
//                     {postToShowInModal && postToShowInModal !== "Generating..." && !savedPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) && (
//                        <Button variant="primary" size="sm" onClick={savePost}>Save Post</Button>
//                     )}
//               </div>
//             </div>
//         </div>
//       )}
//     </div>
//   );
// }


//// ///// ///// lastest code with new dates added /////////

// app/dashboard/profile/page.js
"use client";

// React & Next.js Hooks
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link'; // For the "Generate Strategy Here" link

// UI & Utility Libraries
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx'; // For conditional classes (npm install clsx)
import { addDays, format, getDay, nextMonday, startOfDay } from 'date-fns'; // For date calculations (npm install date-fns)

// components
import MarkdownContent from '@/components/MarkDownContent';
import Button from '@/components/Button';


// --- Reusable Button Component (Consider moving to components/Button.jsx) ---
// const Button = ({
//   children, onClick, type = 'button', variant = 'primary', size = 'md', disabled = false, className = '', ...props
// }) => {
//   const baseStyles = 'inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';
//   const variants = {
//     primary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
//     secondary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
//     info: 'bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500', // Using sky for 'info'
//     success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
//     ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-indigo-500 border-none shadow-none',
//     outline: 'bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-indigo-500',
//   };
//   const sizes = {
//     xs: 'px-2.5 py-1.5 text-xs',
//     sm: 'px-3 py-1.5 text-sm',
//     md: 'px-4 py-2 text-sm',
//     lg: 'px-5 py-2.5 text-base',
//   };
//   const combinedClassName = clsx( baseStyles, variants[variant] || variants.primary, sizes[size] || sizes.md, className );
//   return ( <button type={type} onClick={onClick} disabled={disabled} className={combinedClassName} {...props}> {children} </button> );
// };

// --- Markdown Component (Consider moving to components/MarkdownContent.jsx) ---
// const MarkdownContent = ({ content, className = "prose prose-lg max-w-none" }) => (
//     content ? <div className={className}><ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown></div> : <p className="italic text-gray-500">No content available.</p>
// );

// --- Calendar Table Component (Consider moving to components/ContentCalendarTable.jsx) ---
const ContentCalendarTable = ({ calendar, savedPosts, generatingPostId, handleGeneratePost, handleViewPost, startDate }) => {
  if (!calendar || !calendar.rows || calendar.rows.length === 0) {
    return <p className="text-center text-gray-500 italic my-4">No calendar data available to display.</p>;
  }
  // Ensure savedPosts is treated as an array for the .some() check
  const postsLookup = Array.isArray(savedPosts) ? savedPosts : [];

  // Helper to add weekdays using date-fns
  const addWeekdays = (date, daysToAdd) => {
    if (!date || !(date instanceof Date) || isNaN(date)) return null; // Added validation for startDate
    let currentDate = date;
    let addedDays = 0;
    while (addedDays < daysToAdd) {
      currentDate = addDays(currentDate, 1);
      const dayOfWeek = getDay(currentDate); // 0=Sun, 6=Sat
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        addedDays++;
      }
    }
    return currentDate;
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
        <tbody className="bg-base-100 divide-y divide-base-200">
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
        </tbody>
      </table>
    </div>
  );
};


// --- Main Page Component ---
export default function SavedStrategyPage() {
  const { data: session, status: sessionStatus } = useSession();

  // State
  const [strategyData, setStrategyData] = useState(null); // Holds the fetched linkedinStrategy object
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('foundation'); // Default tab
  const [generatingPostId, setGeneratingPostId] = useState(null);
  const [postToShowInModal, setPostToShowInModal] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [modalPostIndex, setModalPostIndex] = useState(null);

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
           // Log the structure before setting state
           console.log('Strategy object received:', JSON.stringify(data.profile.linkedinStrategy, null, 2));
           fetchedStrategyData = data.profile.linkedinStrategy;
         } else {
           console.log('No saved LinkedIn strategy found in profile.');
           fetchedStrategyData = null; // Set to null if no strategy exists
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

  // Extracted data & Saved Start Date
  const foundation = strategyData?.foundation;
  const contentCalendar = strategyData?.contentCalendar;
  const savedPosts = strategyData?.savedPosts || [];
  // Get startDate from fetched data, convert string back to Date object
  const savedStartDate = strategyData?.calendarStartDate ? new Date(strategyData.calendarStartDate) : null;

  // --- Handlers ---
  const handleGeneratePost = async (pillar, topic, approach, contentType, index) => {
    if (!strategyData?.answers) { /* ... check and alert ... */ return; }
    console.log("handleGeneratePost called for index:", index);
    try {
      setGeneratingPostId(index);
      setPostToShowInModal("Generating...");
      setModalPostIndex(index);
      setShowPostModal(true);
      const payload = { pillar, topic, approach, contentType, userVoice: strategyData.answers.userVoice, uniquePerspective: strategyData.answers.uniquePerspective };
      console.log("--- handleGeneratePost: Sending this payload:", payload);
      const response = await fetch('/api/create-post', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      console.log("--- handleGeneratePost: Received response - Status:", response.status, "OK:", response.ok);
      if (!response.ok) { throw new Error(`Failed to generate post. Status: ${response.status}`); }
      const data = await response.json();
      setPostToShowInModal(data.post);
    } catch (error) { /* ... error handling ... */ }
    finally { setGeneratingPostId(null); }
  };

  const handleViewPost = (index) => { /* ... same implementation ... */
      console.log("handleViewPost called for index:", index);
      const postToView = savedPosts.find(post => post.postIndex === index);
      if (postToView) {
        setPostToShowInModal(postToView.content);
        setModalPostIndex(index);
        setShowPostModal(true);
      } else { alert("Could not find the saved post."); }
  };

 const savePost = async () => { /* ... same implementation, ensure fetchProfileData() is called on success ... */
    console.log("--- savePost: Function started ---");
    if (postToShowInModal === "Generating..." || !postToShowInModal || modalPostIndex === null) return;
    if (!contentCalendar?.rows?.[modalPostIndex]) { /* error handling */ return; }
    const calendarRow = contentCalendar.rows[modalPostIndex];
    try {
        const bodyPayload = { content: postToShowInModal, postIndex: modalPostIndex, pillar: calendarRow.pillar, topic: calendarRow.topic, approach: calendarRow.approach, contentType: calendarRow.contentType, weekDay: calendarRow.weekDay };
        console.log("--- savePost: Sending payload:", bodyPayload);
        const response = await fetch('/api/posts/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bodyPayload) });
        console.log("--- savePost: Received response - Status:", response.status, "OK:", response.ok);
        if (!response.ok) { /* error handling */ throw new Error(`Save failed: ${response.status}`); }
        alert('Post saved successfully!');
        setShowPostModal(false);
        setModalPostIndex(null);
        setPostToShowInModal(null);
        fetchProfileData(); // <-- Re-fetch data here
    } catch (error) { console.error('--- savePost: Error:', error); alert('Failed to save post.'); }
    finally { console.log("--- savePost: Finally block ---"); }
 };

  const copyToClipboard = (text) => { /* ... implementation ... */
      if (!text || text === "Generating...") return;
      navigator.clipboard.writeText(text).then(() => alert("Post copied!")).catch(err => alert("Copy failed!"));
  };

  // --- Main Return JSX ---
  if (isLoading) { return <div className="flex justify-center items-center min-h-[300px]"><span className="loading loading-lg"></span></div>; }
  if (error && !strategyData) { return ( <div className="p-4 md:p-8"><div className="alert alert-error shadow-lg">... Error display ...</div></div> ); }

  // --- Show message if no strategy data found AFTER loading ---
  if (!strategyData) {
    return (
      <div className="space-y-6 p-4 md:p-8 text-center max-w-md mx-auto">
         <h1 className="text-2xl md:text-3xl font-bold">No Strategy Found</h1>
         <p className="text-base-content/80">You haven't generated and saved your LinkedIn strategy yet. Get started now!</p>
         <Link href="/linkedin-strategy" className="btn btn-primary mt-4">Generate Your Strategy</Link>
      </div>
    );
  }

  // --- Render Tabs if strategyData EXISTS ---
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-base-content">My Saved Strategy & Calendar</h1>
      {/* Optional: Display non-blocking error if fetch failed but some data might exist */}
       {error && <div className="alert alert-warning mt-4 shadow-lg">Error loading/re-fetching data: {error}</div>}

      {/* Tab Buttons */}
      <div role="tablist" className="tabs tabs-bordered">
        <button role="tab" className={clsx("tab", activeTab === 'foundation' && "tab-active")} onClick={() => setActiveTab('foundation')}>Strategy Foundation</button>
        <button role="tab" className={clsx("tab", activeTab === 'calendar' && "tab-active")} onClick={() => setActiveTab('calendar')}>Content Calendar</button>
        <button role="tab" className={clsx("tab", activeTab === 'posts' && "tab-active")} onClick={() => setActiveTab('posts')}>Saved Posts ({savedPosts.length})</button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'foundation' && (
            <div className="card bg-base-100 shadow-xl"><div className="card-body">
                <h2 className="card-title mb-4">Strategy Foundation</h2>
                <MarkdownContent content={foundation} />
            </div></div>
        )}
        {activeTab === 'calendar' && (
             <div className="card bg-base-100 shadow-xl"><div className="card-body">
                <h2 className="card-title mb-2">Content Calendar</h2>
                <p className="text-sm mb-4 text-base-content/70">Generate posts for your plan or view saved ones.</p>
                {contentCalendar && savedStartDate ? (
                   <ContentCalendarTable
                     calendar={contentCalendar}
                     savedPosts={savedPosts}
                     generatingPostId={generatingPostId}
                     handleGeneratePost={handleGeneratePost}
                     handleViewPost={handleViewPost}
                     startDate={savedStartDate} // <-- Pass the SAVED start date
                   />
                ) : !contentCalendar ? (
                     <p className="text-error">Error: Content calendar data is missing from saved strategy.</p>
                 ) : (
                     <p className="text-warning">Loading calendar dates or start date missing...</p> // More specific message
                 )}
             </div></div>
        )}
         {activeTab === 'posts' && (
             <div className="card bg-base-100 shadow-xl"><div className="card-body">
                <h2 className="card-title mb-4">Saved Posts</h2>
                {savedPosts.length > 0 ? (
                   <div className="space-y-4">
                      {savedPosts.slice().sort((a, b) => (a.postIndex || 0) - (b.postIndex || 0))
                          .map((post, loopIndex) => (
                          <div key={post._id || post.postIndex || loopIndex} className="border border-base-300 rounded-lg p-4 bg-base-200/30">
                             {/* ... Post details display ... */}
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
            </div></div>
        )}
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-base-100 rounded-lg shadow-xl p-6 max-w-3xl w-full max-h-[90vh] flex flex-col">
                {/* ... Modal content, check if postToShowInModal exists before accessing content ... */}
                <h2 className="text-xl font-bold mb-4 text-base-content flex-shrink-0">
                     {postToShowInModal && savedPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) ? `Viewing Saved Post (Row ${modalPostIndex !== null ? modalPostIndex + 1 : 'N/A'})` : `Generated Post (Row ${modalPostIndex !== null ? modalPostIndex + 1 : 'N/A'})`}
                </h2>
                <div className="flex-grow overflow-y-auto mb-6 pr-2 border rounded-md bg-white p-4">
                    {postToShowInModal === "Generating..." ? <div className="text-center p-10"><span className="loading loading-dots loading-md"></span></div> : <MarkdownContent content={postToShowInModal || ''} className="prose prose-sm max-w-none" />}
                </div>
                <div className="flex-shrink-0 mt-auto flex flex-wrap justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { setShowPostModal(false); setModalPostIndex(null); setPostToShowInModal(null); }}>Close</Button>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(postToShowInModal)} disabled={!postToShowInModal || postToShowInModal === "Generating..."}>Copy</Button>
                    {postToShowInModal && postToShowInModal !== "Generating..." && !savedPosts.some(p => p.postIndex === modalPostIndex && p.content === postToShowInModal) && ( <Button variant="primary" size="sm" onClick={savePost}>Save Post</Button> )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
}