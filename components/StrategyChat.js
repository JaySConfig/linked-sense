// "use client";

// import { useState, useRef, useEffect } from "react";

// export default function StrategyChat({ onComplete }) {
//   const [messages, setMessages] = useState([
//     { 
//       text: "Hi! I'm here to help you create a LinkedIn strategy that actually works for you. Let's start simple - what's your current job title and industry?", 
//       isUser: false  
//     }
//   ]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);
  
//   // Auto-scroll to bottom of messages
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);
  
//   // Send message to API and get response
//   const handleSend = async () => {
//     if (!input.trim() || isLoading) return;
    
//     // Add user message to chat
//     const updatedMessages = [...messages, { text: input, isUser: true }];
//     setMessages(updatedMessages);
//     setInput("");
//     setIsLoading(true);
    
//     try {
//       // Get response from Gemini
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: updatedMessages }),
//       });
      
//       if (!response.ok) throw new Error("Failed to get response");
//       const data = await response.json();
      
//       // Add bot response to chat
//       setMessages([...updatedMessages, { text: data.response, isUser: false }]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages([
//         ...updatedMessages,
//         { text: "Sorry, I encountered an error. Please try again.", isUser: false }
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Extract final data and complete the process
//   const handleFinish = async () => {
//     setIsLoading(true);
    
//     try {
//       const response = await fetch("/api/extract-strategy-data", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages }),
//       });
      
//       if (!response.ok) throw new Error("Failed to extract data");
//       const data = await response.json();
      
//       // Call the completion handler with the extracted data
//       onComplete(data.strategyData);
//     } catch (error) {
//       console.error("Error extracting data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <div className="bg-white border rounded-lg shadow-sm">
//       {/* Message display area */}
//       <div className="h-[500px] overflow-y-auto p-4">
//         {messages.map((msg, i) => (
//           <div 
//             key={i} 
//             className={`mb-4 flex ${msg.isUser ? "justify-end" : "justify-start"}`}
//           >
//             <div 
//             className={`max-w-[80%] p-3 rounded-lg ${
//                 msg.isUser 
//                 ? "bg-primary text-white" 
//                 : "bg-gray-100 text-gray-800"
//             }`}
//             >
//             {msg.isUser ? (
//                 msg.text
//             ) : (
//                 <div className="whitespace-pre-wrap">
//                 {msg.text}
//                 </div>
//             )}
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="flex items-center space-x-2 text-gray-500">
//             <div className="animate-bounce">●</div>
//             <div className="animate-bounce delay-100">●</div>
//             <div className="animate-bounce delay-200">●</div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
      
//       {/* Input area */}
//       <div className="border-t p-4 flex">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           placeholder="Type your message..."
//           className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
//           disabled={isLoading}
//         />
//         <button
//           onClick={handleSend}
//           disabled={isLoading}
//           className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
//         >
//           Send
//         </button>
//       </div>
      
//       {/* Finish button - show after sufficient conversation */}
//       {messages.length > 10 && (
//         <div className="p-4 border-t">
//           <button
//             onClick={handleFinish}
//             disabled={isLoading}
//             className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-focus"
//           >
//             Finish and Generate Strategy
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// Inside your StrategyChat component
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StrategyChat() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { 
      text: "Hi! I'm Alex, your LinkedIn strategy coach. I'm here to help you create a LinkedIn strategy that works. Let's start simple - what's your current job title and industry?", 
      isUser: false 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Send message to API and get response
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message to chat
    const updatedMessages = [...messages, { text: input, isUser: true }];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    
    try {
      // Get response from Gemini
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      
      if (!response.ok) throw new Error("Failed to get response");
      const data = await response.json();
      
      // Add bot response to chat
      setMessages([...updatedMessages, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...updatedMessages,
        { text: "Sorry, I encountered an error. Please try again.", isUser: false }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Extract final data and save submission
  const handleFinish = async () => {
    setIsLoading(true);
    
    try {
      // Extract structured data from the chat
      const extractResponse = await fetch("/api/extract-strategy-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      
      if (!extractResponse.ok) throw new Error("Failed to extract data");
      const extractedData = await extractResponse.json();
      
      // Format the data to match your expected structure (submissionData.answers)
      const formattedAnswers = {
        // Map the chat extracted data to your form structure
        industry: extractedData.strategyData.industry,
        role: extractedData.strategyData.role,
        primaryGoal: extractedData.strategyData.linkedinGoals?.[0] || null,
        targetAudience: extractedData.strategyData.targetAudience?.[0] || null,
        commercialObjectives: extractedData.strategyData.desiredResults?.[0] || null,
        uniquePerspective: extractedData.strategyData.communicationStyle,
        contentPillars: extractedData.strategyData.contentPillars || [],
        contentTypes: extractedData.strategyData.contentTypes || [],
        postingFrequency: extractedData.strategyData.postingFrequency,
        userVoice: extractedData.strategyData.communicationStyle,
        audienceChallenges: extractedData.strategyData.audienceChallenges || [],
        audienceGoals: extractedData.strategyData.audienceGoals || []
      };
      
      // Generate a unique submission ID
      const submissionId = `chat_${Date.now()}`;
      
      // Use your existing API to save the temporary submission
      const tempSubmissionResponse = await fetch("/api/save-temporary-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: submissionId,
          answers: formattedAnswers
        }),
      });
      
      if (!tempSubmissionResponse.ok) {
        const errorData = await tempSubmissionResponse.json();
        throw new Error(errorData.error || "Failed to create temporary submission");
      }
      
      const { submissionId: returnedId } = await tempSubmissionResponse.json();
      
      // Navigate to results page with the submission ID
      router.push(`/dashboard/results?id=${returnedId || submissionId}`);
      
    } catch (error) {
      console.error("Error processing data:", error);
      setMessages([
        ...messages,
        { 
          text: "Sorry, I encountered an error generating your strategy. Please try again.", 
          isUser: false 
        }
      ]);
      setIsLoading(false);
    }
  };
  
  // Check if the conversation is ready for finishing
  const isReadyToFinish = messages.some(msg => 
    !msg.isUser && msg.text.includes("I'm ready to generate your personalized LinkedIn strategy!")
  );
  
  return (
    <div className="bg-white border rounded-lg shadow-sm">
      {/* Message display area */}
      <div className="h-[500px] overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`mb-4 flex ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.isUser 
                  ? "bg-emerald-500 text-white" 
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.isUser ? (
                msg.text
              ) : (
                <div className="whitespace-pre-wrap">
                  {msg.text}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-bounce">●</div>
            <div className="animate-bounce delay-100">●</div>
            <div className="animate-bounce delay-200">●</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t p-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-emerald-500 text-white px-4 py-2 rounded-r-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Send
        </button>
      </div>
      
      {/* Show finish button when summary is displayed */}
      {isReadyToFinish && (
        <div className="p-4 border-t">
          <button
            onClick={handleFinish}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Your Strategy...
              </span>
            ) : (
              "Finish and Generate Strategy"
            )}
          </button>
        </div>
      )}
    </div>
  );
}