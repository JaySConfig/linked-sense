// "use client";

// import { useState  } from "react";

// export default function GeneratePage() {
//     // state for the form inputs

//     const [generatedPost, setGeneratedPost] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     const [formData, setFormData] = useState({
//       contentCategory: "reflectionChallenges",
//       contentQuestion: "",
//       // postType: "thoughtLeadership",
//       postTone: "professional",
//       // keyTakeaway: "",
//       callToAction: "noCta",
//       answerText: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({...formData, [name]: value});

//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setIsLoading(true);
      
//       try {
//         const response = await fetch('/api/generate-post', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });
        
//         const data = await response.json();
        
//         if (!response.ok) {
//           throw new Error(data.details || data.error || 'Failed to generate post');
//         }
        
//         setGeneratedPost(data.post);
//       } catch (error) {
//         console.error('Error:', error);
//         // Optional: add error state handling here
//       } finally {
//         setIsLoading(false);
//       }
//     };

   
//   return (
//     <section>
//     <form onSubmit={handleSubmit}>
//     <div className="space-y-6">
//       <h1 className="text-3xl md:text-4xl font-extrabold">Generate LinkedIn Posts</h1>
//       <p className="text-base-content/80">Get AI-powered post ideas based on your profile.</p>
//       <div className="bg-base-200 p-4 rounded-lg mb-6">
//       <h2 className="font-bold text-lg mb-2">How This Works</h2>
//       <ol className="list-decimal list-inside space-y-2 text-base-content/80">
//         <li>Select a <strong>content category</strong> that matches your mood or goal today</li>
//         <li>Choose a <strong>specific question</strong> from that category to answer</li>
//         <li>Write your <strong>authentic response</strong> to the question</li>
//         <li>Select your preferred <strong>tone</strong> and whether you want a <strong>call to action</strong></li>
//         <li>Click <strong>Generate Post Ideas</strong> to create LinkedIn-ready content!</li>
//       </ol>
//     </div>

//     <div className="form-control">
//       <label className="label">Content Inspiration Category</label>
//       <p className="text-sm text-base-content/70 mb-2">Choose the type of content you want to create today</p>

//       <select
//         name="contentCategory"
//         value={formData.contentCategory}
//         onChange={handleChange}
//         className="select select-bordered"
//       >
//         <option value="reflectionChallenges">🔥 Reflection & Challenges</option>
//         <option value="insightsLessons">💡 Insights & Lessons</option>
//         <option value="winsAccomplishments">🏆 Wins & Accomplishments</option>
//         <option value="adviceTakeaways">🚀 Advice & Takeaways</option>
//       </select>
//     </div>

//     {/* // Add the second dropdown that changes based on the selected category */}
//     <div className="form-control">
//       <label className="label">Choose a question</label>
//       <select
//         name="contentQuestion"
//         value={formData.contentQuestion}
//         onChange={handleChange}
//         className="select select-bordered"
//       >
//         {formData.contentCategory === "reflectionChallenges" && (
//           <>
//             <option value="">Select a reflection question</option>
//             <option value="challenge">1️⃣ What was the biggest challenge you faced this week, and how did you handle it?</option>
//             <option value="failure">2️⃣ What&apos;s something that didn&apos;t go as planned, and what did you learn from it?</option>
//             <option value="redo">3️⃣ If you could redo one decision from this week, what would it be and why?</option>
//           </>
//         )}
        
//         {formData.contentCategory === "insightsLessons" && (
//           <>
//             <option value="">Select an insight question</option>
//             <option value="ahamoment">4️⃣ Did you have an &quot;aha&quot; moment that changed how you work or think?</option>
//             <option value="learned">5️⃣ What&apos;s the most interesting thing you read, watched, or learned this week?</option>
//             <option value="habit">6️⃣ What&apos;s one habit or small change that made a big impact on your productivity this week?</option>
//           </>
//         )}
        
//         {formData.contentCategory === "winsAccomplishments" && (
//           <>
//             <option value="">Select an accomplishment question</option>
//             <option value="proud">7️⃣ What&apos;s one thing you accomplished this week that you&apos;re proud of?</option>
//             <option value="perspective">8️⃣ Did a conversation or meeting this week completely shift your perspective on something?</option>
//           </>
//         )}
        
//         {formData.contentCategory === "adviceTakeaways" && (
//           <>
//             <option value="">Select an advice question</option>
//             <option value="advice">9️⃣ If you had to give one piece of advice to someone starting in your field based on this week, what would it be?</option>
//             <option value="nextweek">🔟 What&apos;s one thing you&apos;ll do differently next week based on what you learned this week?</option>
//             <option value="smallthing">🔥 What&apos;s something small that had a surprisingly big impact this week?</option>
//           </>
//         )}
//       </select>
//     </div>

//     {/* // Conditionally show this text area only if a question is selected */}
//     {formData.contentQuestion && (
//       <div className="form-control mt-2">
//         <label className="label">Your answer</label>
//         <textarea
//           name="answerText"
//           value={formData.answerText}
//           onChange={handleChange}
//           className="textarea textarea-bordered"
//           placeholder="Share your thoughts on this question..."
//         />
//       </div>
//     )}

      

//         <div className="form-control">
//           <label className="label">How do you want this post to feel?</label>
//           <select
//             name="postTone"
//             value={formData.postTone}
//             onChange={handleChange}
//             className="select select-bordered"
//           >
//             <option value="professional">Professional</option>
//             <option value="conversational">Conversational</option>
//             <option value="inspirational">Inspirational</option>
//             <option value="funny">Witty/Funny</option>
//             <option value="dataDriven">Data-Driven</option>
//           </select>
//         </div>


//         <div className="form-control">
//           <label className="label">What do you want people to do?</label>
//           <select
//             name="callToAction"
//             value={formData.callToAction}
//             onChange={handleChange}
//             className="select select-bordered"
//           >
//             <option value="askAQuestion">Ask a question</option>
//             <option value="encourageDiscussion">Encourage Discussion</option>
//             <option value="promoteProductService">Promote a product/service</option>
//             <option value="inviteToConnect">Invite people to connect</option>
//           </select>
//         </div>
//         <details className="mt-4 collapse collapse-arrow bg-base-200">
//           <summary className="collapse-title font-medium">Tips for Better Results</summary>
//           <div className="collapse-content">
//             <ul className="list-disc list-inside space-y-1 text-sm">
//               <li>Be specific with your examples - concrete details perform better than generalisations</li>
//               <li>Keep your answer focused on one key story or insight</li>
//               <li>Include real examples from your experience when possible</li>
//               <li>Consider what would be most valuable to your LinkedIn audience</li>
//             </ul>
//           </div>
//         </details>

//         <button className=" justify-center btn btn-primary mt-4">Generate Post Ideas</button>
        
//       </div>
      
//       </form>
//       <div>
//       {isLoading && (
//           <div className="mt-8 text-center">
//             <div className="loading loading-spinner loading-lg"></div>
//             <p className="mt-2">Generating your LinkedIn post...</p>
//           </div>
//         )}

//         {generatedPost && !isLoading && (
//           <div className="mt-8 p-6 bg-base-100 shadow-lg rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Your Generated LinkedIn Post</h2>
//             <div className="whitespace-pre-wrap bg-base-200 p-4 rounded-lg">
//               {generatedPost}
//             </div>
//             <div className="flex justify-between mt-4">
//               <button 
//                 className="btn btn-outline btn-sm"
//                 onClick={() => {navigator.clipboard.writeText(generatedPost)}}
//               >
//                 Copy to Clipboard
//               </button>
//               <button className="btn btn-primary btn-sm">Share to LinkedIn</button>
//             </div>
//           </div>
//         )}

//       </div>
//       </section>
      
      

      
    
//   );
// }
