
// // // moibile optimised 


// "use client"

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import SectionProgress from './SectionProgress';
// import ReviewAnswers from './ReviewAnswers';
// import { sections } from './QuestionsData';

// function OnboardingFlow() {
//   const router = useRouter();

//   // State variables
//   const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [inputValue, setInputValue] = useState('');
//   const [isReviewMode, setIsReviewMode] = useState(false);
//   const [hasExistingProgress, setHasExistingProgress] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Save progress to localStorage
//   const saveProgress = () => {
//     const progressData = {
//       answers,
//       currentSectionIndex,
//       currentQuestionIndex,
//       isReviewMode
//     };
    
//     localStorage.setItem('onboardingProgress', JSON.stringify(progressData));
//   };

//   // Load progress from localStorage
//   const loadProgress = () => {
//     try {
//       const savedProgress = localStorage.getItem('onboardingProgress');
      
//       if (savedProgress) {
//         const progressData = JSON.parse(savedProgress);
        
//         // Restore the state
//         setAnswers(progressData.answers || {});
//         setCurrentSectionIndex(progressData.currentSectionIndex || 0);
//         setCurrentQuestionIndex(progressData.currentQuestionIndex || 0);
//         setIsReviewMode(progressData.isReviewMode || false);
        
//         return true; // Indicate that progress was successfully loaded
//       }
//     } catch (error) {
//       console.error('Error loading progress:', error);
//     }
    
//     return false; // Indicate that no progress was loaded
//   };

//   // Clear progress from localStorage
//   const clearProgress = () => {
//     localStorage.removeItem('onboardingProgress');
//   };

//   // Check for existing progress on component mount
//   useEffect(() => {
//     // Check if progress exists but don't load it yet
//     const savedProgress = localStorage.getItem('onboardingProgress');
//     if (savedProgress) {
//       setHasExistingProgress(true);
//     }
//   }, []);

//   // Function to handle resuming saved progress
//   const handleResumeProgress = () => {
//     loadProgress();
//     setHasExistingProgress(false);
//   };

//   // Function to handle starting fresh
//   const handleStartFresh = () => {
//     clearProgress();
//     setHasExistingProgress(false);
//   };

//   // Navigation functions
//   const goToNextQuestion = () => {
//     // If there are more questions in this section
//     if (currentQuestionIndex < currentSection.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } 
//     // If we're at the last question but there are more sections
//     else if (currentSectionIndex < sections.length - 1) {
//       setCurrentSectionIndex(currentSectionIndex + 1);
//       setCurrentQuestionIndex(0);
//     }
    
//     // Save progress after navigation
//     setTimeout(saveProgress, 0);
//   };
  
//   const goToPreviousQuestion = () => {
//     // If we're not at the first question of the section
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     } 
//     // If we're at the first question but not the first section
//     else if (currentSectionIndex > 0) {
//       setCurrentSectionIndex(currentSectionIndex - 1);
//       // Go to the last question of the previous section
//       setCurrentQuestionIndex(sections[currentSectionIndex - 1].questions.length - 1);
//     }
    
//     // Save progress after navigation
//     setTimeout(saveProgress, 0);
//   };

//   // Handle submission
//   const handleSubmit = async () => {
//     // If not in review mode, switch to review mode first
//     if (!isReviewMode) {
//       setIsReviewMode(true);
//       return;
//     }
    
//     // If already in review mode, proceed with final submission to backend
//     setIsSubmitting(true); // Start loading indicator
//     console.log("Submitting final answers...");

//     try {
//       // 1. Generate a unique ID for this submission attempt
//       const submissionId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      
//       // 2. Prepare payload for the backend API
//       const payload = {
//         id: submissionId,
//         answers,
//       };
      
//       // 3. Call the backend API route to save temporarily
//       const response = await fetch('/api/save-temporary-submission', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         // Handle API errors
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.error || `Failed to save submission (${response.status})`);
//       }

      
//         // 4. If API call was successful:
//         console.log("Submission saved temporarily on server successfully.");
//         clearProgress(); // Clear the intermediate progress from localStorage
        
//         // 5. Redirect to the results page using Next.js router
//         router.push(`/dashboard/results?id=${submissionId}`);
      
//         } catch (error) {
//           console.error('Error during final submission:', error);
//           alert(`There was an error submitting your answers: ${error.message}. Please try again.`);
//           setIsSubmitting(false); // Stop loading indicator on error
//         }
//       };

//   // Handle different answer types with auto-save
//   const handleSingleSelect = (questionId, value) => {
//     setAnswers({
//       ...answers,
//       [questionId]: value
//     });
    
//     // Save progress after answer is updated
//     setTimeout(saveProgress, 0);
//   };
  
//   const handleMultiSelect = (questionId, value) => {
//     // Get current selections for this question (or empty array if none)
//     const currentSelections = answers[questionId] || [];
    
//     // If already selected, remove it
//     if (currentSelections.includes(value)) {
//       setAnswers({
//         ...answers,
//         [questionId]: currentSelections.filter(item => item !== value)
//       });
//     } 
//     // Otherwise add it, if not exceeding max selections
//     else if (!currentQuestion.maxSelections || currentSelections.length < currentQuestion.maxSelections) {
//       setAnswers({
//         ...answers,
//         [questionId]: [...currentSelections, value]
//       });
//     }
    
//     // Save progress after answer is updated
//     setTimeout(saveProgress, 0);
//   };

//   const handleTagAdd = () => {
//     const tags = answers[currentQuestion.id] || [];
//     if (inputValue.trim() && !tags.includes(inputValue.trim()) && 
//         tags.length < (currentQuestion.maxSelections || Infinity)) {
//       setAnswers({
//         ...answers,
//         [currentQuestion.id]: [...tags, inputValue.trim()]
//       });
//       setInputValue('');
      
//       // Save progress after answer is updated
//       setTimeout(saveProgress, 0);
//     }
//   };

//   const handleTagRemove = (tag) => {
//     const tags = answers[currentQuestion.id] || [];
//     setAnswers({
//       ...answers,
//       [currentQuestion.id]: tags.filter(t => t !== tag)
//     });
    
//     // Save progress after answer is updated
//     setTimeout(saveProgress, 0);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     const tags = answers[currentQuestion.id] || [];
//     if (tags.length < (currentQuestion.maxSelections || Infinity) && !tags.includes(suggestion)) {
//       setAnswers({
//         ...answers,
//         [currentQuestion.id]: [...tags, suggestion]
//       });
      
//       // Save progress after answer is updated
//       setTimeout(saveProgress, 0);
//     }
//   };

//   // Get current section and question
//   const currentSection = sections[currentSectionIndex];
//   const currentQuestion = currentSection?.questions[currentQuestionIndex];
//   const isLastQuestion = currentSectionIndex === sections.length - 1 && 
//                          currentQuestionIndex === currentSection?.questions.length - 1;
//   const canGoBack = currentQuestionIndex > 0 || currentSectionIndex > 0;

//   // Render question types with accessibility improvements
//   const renderSingleSelect = () => {
//     return (
//       <div className="flex flex-col space-y-2 sm:space-y-3" role="radiogroup" aria-labelledby={`question-${currentQuestion.id}`}>
//         <span id={`question-${currentQuestion.id}`} className="sr-only">{currentQuestion.question}</span>
//         {currentQuestion.options.map((option, index) => {
//           const isSelected = answers[currentQuestion.id] === option.value;
          
//           return (
//             <button 
//               key={option.value}
//               role="radio"
//               aria-checked={isSelected}
//               className={`flex items-center p-3 sm:p-4 border rounded-lg text-left transition-colors
//                 ${isSelected 
//                   ? 'border-primary bg-primary/10' 
//                   : 'border-base-300 hover:bg-base-200'}`}
//               onClick={() => handleSingleSelect(currentQuestion.id, option.value)}
//             >
//               <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-base-200 rounded mr-2 sm:mr-3 text-xs sm:text-sm font-medium text-base-content">
//                 {String.fromCharCode(65 + index)}
//               </span> 
//               <span className="text-sm sm:text-base text-base-content break-words">
//                 {option.label}
//               </span>
//             </button>
//           );
//         })}
//       </div>
//     );
//   };

//   const renderMultiSelect = () => {
//     const selectedValues = answers[currentQuestion.id] || [];
//     const canSelectMore = !currentQuestion.maxSelections || selectedValues.length < currentQuestion.maxSelections;
    
//     return (
//       <div className="space-y-3 sm:space-y-4">
//         <p id={`multiselect-help-${currentQuestion.id}`} className="text-xs sm:text-sm text-base-content/60">
//           {selectedValues.length} of {currentQuestion.maxSelections || 'unlimited'} selected
//           {currentQuestion.minSelections && ` (minimum ${currentQuestion.minSelections})`}
//         </p>
        
//         <div 
//           className="flex flex-col space-y-2 sm:space-y-3" 
//           role="group" 
//           aria-labelledby={`question-${currentQuestion.id}`}
//           aria-describedby={`multiselect-help-${currentQuestion.id}`}
//         >
//           <span id={`question-${currentQuestion.id}`} className="sr-only">{currentQuestion.question}</span>
//           {currentQuestion.options.map((option, index) => {
//             const isSelected = selectedValues.includes(option.value);
            
//             return (
//               <button 
//                 key={option.value}
//                 role="checkbox"
//                 aria-checked={isSelected}
//                 className={`flex items-center p-3 sm:p-4 border rounded-lg text-left transition-colors
//                   ${isSelected 
//                     ? 'border-primary bg-primary/10' 
//                     : !canSelectMore && !isSelected
//                       ? 'border-base-300 opacity-50 cursor-not-allowed'
//                       : 'border-base-300 hover:bg-base-200'}`}
//                 onClick={() => handleMultiSelect(currentQuestion.id, option.value)}
//                 disabled={!canSelectMore && !isSelected}
//               >
//                 <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-base-200 rounded mr-2 sm:mr-3 text-xs sm:text-sm font-medium text-base-content">
//                   {String.fromCharCode(65 + index)}
//                 </span> 
//                 <span className="text-sm sm:text-base text-base-content break-words">
//                   {option.label}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };
// // Tag input section improvement for mobile
// const renderTagInput = () => {
//   const tags = answers[currentQuestion.id] || [];
//   const inputId = `tag-input-${currentQuestion.id}`;
//   const helpId = `tag-help-${currentQuestion.id}`;
  
//   return (
//     <div className="space-y-3">
//       <p id={helpId} className="text-xs sm:text-sm text-base-content/60">
//         {tags.length} of {currentQuestion.maxSelections || 'unlimited'} selected
//         {currentQuestion.minSelections && ` (minimum ${currentQuestion.minSelections})`}
//       </p>
      
//       {/* Selected tags */}
//       <div className="mb-3">
//         <div className="flex flex-wrap gap-2" role="list" aria-label="Selected tags">
//           {tags.map(tag => (
//             <div key={tag} 
//               className="flex items-center bg-primary/10 border border-primary/20 rounded-full px-2 py-1 text-sm text-base-content" 
//               role="listitem"
//             >
//               <span className="mr-1 truncate max-w-[200px]">{tag}</span>
//               <button 
//                 type="button"
//                 onClick={() => handleTagRemove(tag)}
//                 className="text-base-content/60 hover:text-base-content p-1"
//                 aria-label={`Remove ${tag}`}
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Input field with suggestions */}
//       {tags.length < (currentQuestion.maxSelections || Infinity) && (
//         <div className="space-y-2">
//           {/* Stacked input and button on mobile */}
//           <div className="flex flex-col gap-2">
//             <label htmlFor={inputId} className="sr-only">Add a tag</label>
//             <input
//               id={inputId}
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               placeholder="Type here..."
//               className="input input-bordered w-full"
//               aria-describedby={helpId}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' && inputValue.trim()) {
//                   e.preventDefault();
//                   handleTagAdd();
//                 }
//               }}
//             />
//             <button
//               type="button"
//               onClick={handleTagAdd}
//               className="btn btn-outline w-full"
//               aria-label="Add tag"
//             >
//               Add
//             </button>
//           </div>
          
//           {/* Suggestions with better mobile handling */}
//           <div className="mt-2">
//             <p className="text-xs text-base-content/60 mb-2">Suggestions:</p>
//             <div className="flex flex-wrap gap-2" role="list" aria-label="Tag suggestions">
//               {// In the suggestions area
//                 currentQuestion.suggestions.map(suggestion => (
//                   <button
//                     key={suggestion}
//                     type="button"
//                     onClick={() => handleSuggestionClick(suggestion)}
//                     className="badge badge-lg bg-base-200 hover:bg-base-300 text-base-content text-xs p-3 whitespace-normal text-left h-auto max-w-full"
//                     disabled={tags.length >= (currentQuestion.maxSelections || Infinity)}
//                     aria-label={`Add suggestion: ${suggestion}`}
//                     role="listitem"
//                   >
//                     {suggestion}
//                   </button>
//                 ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
  
//   // Main render function that calls the appropriate render method
//   const renderQuestion = () => {
//     if (!currentQuestion) return null;
    
//     switch (currentQuestion.type) {
//       case 'singleSelect':
//         return renderSingleSelect();
//       case 'multiSelect':
//         return renderMultiSelect();
//       case 'tagInput':
//         return renderTagInput();
//       default:
//         return <p className="text-base-content">Unknown question type: {currentQuestion.type}</p>;
//     }
//   };

//   // Show resume progress dialog if applicable
//   if (hasExistingProgress) {
//     return (
//       <div className="bg-base-100 w-full max-w-xl mx-auto p-3 sm:p-6 rounded-lg">
//         <div className="text-center p-4 sm:p-6 bg-base-100 rounded-lg shadow-lg">
//           <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-base-content">Resume Your Progress?</h2>
//           <p className="mb-4 sm:mb-6 text-base-content/80 text-sm sm:text-base">We found your previously saved answers. Would you like to continue where you left off?</p>
//           <div className="flex justify-center gap-3 sm:gap-4">
//             <button
//               onClick={handleStartFresh}
//               className="btn btn-sm sm:btn-md btn-outline"
//             >
//               Start Fresh
//             </button>
//             <button
//               onClick={handleResumeProgress}
//               className="btn btn-sm sm:btn-md btn-primary"
//             >
//               Resume Progress
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Main component render
//   return (
//     <div className="bg-base-100 w-full max-w-xl mx-auto rounded-lg">
//       {/* Fixed top section */}
//       <div className="w-full px-3 sm:px-4 py-4 sm:py-6">
//         {/* Progress indicator always at the top */}
//         <SectionProgress 
//           sections={sections}
//           currentSectionIndex={currentSectionIndex}
//           currentQuestionIndex={currentQuestionIndex}
//           isReviewMode={isReviewMode}
//         />
        
//         {isReviewMode ? (
//           <ReviewAnswers
//             sections={sections}
//             answers={answers}
//             onSubmit={handleSubmit}
//             onEdit={() => setIsReviewMode(false)}
//             isSubmitting={isSubmitting}
//           />
//         ) : (
//           <>
//             {/* Question header - fixed at top */}
//             <div className="mb-5 sm:mb-8">
//               <p className="text-xs sm:text-sm text-base-content/60 mb-1">{currentSection.title}</p>
//               <h2 className="text-lg sm:text-xl font-medium mb-1 text-base-content">
//                 {currentQuestionIndex + 1}→ {currentQuestion.question}
//               </h2>
//               <p className="text-xs sm:text-sm text-base-content/60">{currentQuestion.description || currentSection.description}</p>
//             </div>
            
//             {/* Question content - can expand downward */}
//             <div>
//               {renderQuestion()}
//             </div>
            
//             {/* Navigation - fixed distance from the question header */}
//             <div className="mt-6 sm:mt-8 flex justify-between sm:justify-end">
//               {canGoBack && (
//                 <button
//                   onClick={goToPreviousQuestion}
//                   className="btn btn-sm sm:btn-md btn-outline"
//                 >
//                   Back
//                 </button>
//               )}
            
//               <button
//                 onClick={isLastQuestion ? () => setIsReviewMode(true) : goToNextQuestion}
//                 className={`btn btn-sm sm:btn-md ${
//                   isLastQuestion ? "btn-primary" : "btn-outline btn-primary"
//                 } ${!canGoBack ? 'ml-auto' : ''}`}
//               >
//                 {isLastQuestion ? "Review Answers" : "Next"}
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default OnboardingFlow;

"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SectionProgress from './SectionProgress';
import ReviewAnswers from './ReviewAnswers';
import { sections } from './QuestionsData';

function OnboardingFlow() {
  const router = useRouter();

  // State variables
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [hasExistingProgress, setHasExistingProgress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);

  // Save progress to localStorage
  const saveProgress = () => {
    const progressData = {
      answers,
      currentSectionIndex,
      currentQuestionIndex,
      isReviewMode
    };
    
    localStorage.setItem('onboardingProgress', JSON.stringify(progressData));
  };

  // Load progress from localStorage
  const loadProgress = () => {
    try {
      const savedProgress = localStorage.getItem('onboardingProgress');
      
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        
        // Restore the state
        setAnswers(progressData.answers || {});
        setCurrentSectionIndex(progressData.currentSectionIndex || 0);
        setCurrentQuestionIndex(progressData.currentQuestionIndex || 0);
        setIsReviewMode(progressData.isReviewMode || false);
        
        return true; // Indicate that progress was successfully loaded
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    
    return false; // Indicate that no progress was loaded
  };

  // Clear progress from localStorage
  const clearProgress = () => {
    localStorage.removeItem('onboardingProgress');
  };

  // Check for existing progress on component mount
  useEffect(() => {
    // Check if progress exists but don't load it yet
    const savedProgress = localStorage.getItem('onboardingProgress');
    if (savedProgress) {
      setHasExistingProgress(true);
    }
  }, []);

  // Function to handle resuming saved progress
  const handleResumeProgress = () => {
    loadProgress();
    setHasExistingProgress(false);
  };

  // Function to handle starting fresh
  const handleStartFresh = () => {
    clearProgress();
    setHasExistingProgress(false);
  };

  // Validation function to check if current question has valid answers
  const isCurrentQuestionValid = () => {
    if (!currentQuestion) return true;
    
    // Get the current answer
    const answer = answers[currentQuestion.id];
    
    // If no answer yet, question is invalid
    if (answer === undefined || answer === null) return false;
    
    // Check based on question type
    switch (currentQuestion.type) {
      case 'singleSelect':
        return !!answer; // Must have a selected value
        
      case 'multiSelect':
        // Check if array exists and meets minimum selections
        return Array.isArray(answer) && 
              answer.length >= (currentQuestion.minSelections || 1);
        
      case 'tagInput':
        // Check if array exists and meets minimum selections
        return Array.isArray(answer) && 
              answer.length >= (currentQuestion.minSelections || 1);
        
      default:
        return true;
    }
  };

  // Function to check if all questions are valid
  const areAllQuestionsValid = () => {
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
      const section = sections[sectionIndex];
      
      for (let questionIndex = 0; questionIndex < section.questions.length; questionIndex++) {
        const question = section.questions[questionIndex];
        const answer = answers[question.id];
        
        // Check if question is answered
        if (answer === undefined || answer === null) return false;
        
        // Check based on question type
        switch (question.type) {
          case 'singleSelect':
            if (!answer) return false;
            break;
            
          case 'multiSelect':
          case 'tagInput':
            if (!Array.isArray(answer) || (question.minSelections && answer.length < question.minSelections)) {
              return false;
            }
            break;
        }
      }
    }
    
    return true;
  };

  // Navigation functions
  const goToNextQuestion = () => {
    // Check if current question is valid before proceeding
    if (!isCurrentQuestionValid()) {
      setShowValidationError(true);
      return;
    }
    
    // Clear validation error state when moving to next question
    setShowValidationError(false);
    
    // If there are more questions in this section
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } 
    // If we're at the last question but there are more sections
    else if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    }
    
    // Save progress after navigation
    setTimeout(saveProgress, 0);
  };
  
  const goToPreviousQuestion = () => {
    // Clear validation errors when going back
    setShowValidationError(false);
    
    // If we're not at the first question of the section
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } 
    // If we're at the first question but not the first section
    else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      // Go to the last question of the previous section
      setCurrentQuestionIndex(sections[currentSectionIndex - 1].questions.length - 1);
    }
    
    // Save progress after navigation
    setTimeout(saveProgress, 0);
  };

  // Handle submission
  const handleSubmit = async () => {
    // If not in review mode, check all questions before switching to review mode
    if (!isReviewMode) {
      if (!areAllQuestionsValid()) {
        alert("Please answer all required questions before reviewing your answers.");
        return;
      }
      
      setIsReviewMode(true);
      setTimeout(saveProgress, 0);
      return;
    }
    
    // If already in review mode, proceed with final submission to backend
    setIsSubmitting(true); // Start loading indicator
    console.log("Submitting final answers...");

    try {
      // 1. Generate a unique ID for this submission attempt
      const submissionId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      
      // 2. Prepare payload for the backend API
      const payload = {
        id: submissionId,
        answers,
      };
      
      // 3. Call the backend API route to save temporarily
      const response = await fetch('/api/save-temporary-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // Handle API errors
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to save submission (${response.status})`);
      }

      // 4. If API call was successful:
      console.log("Submission saved temporarily on server successfully.");
      clearProgress(); // Clear the intermediate progress from localStorage
      
      // 5. Redirect to the results page using Next.js router
      router.push(`/dashboard/results?id=${submissionId}`);
    
    } catch (error) {
      console.error('Error during final submission:', error);
      alert(`There was an error submitting your answers: ${error.message}. Please try again.`);
      setIsSubmitting(false); // Stop loading indicator on error
    }
  };

  // Handle different answer types with auto-save
  const handleSingleSelect = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
    
    // Clear validation error once an answer is provided
    setShowValidationError(false);
    
    // Save progress after answer is updated
    setTimeout(saveProgress, 0);
  };
  
  const handleMultiSelect = (questionId, value) => {
    // Get current selections for this question (or empty array if none)
    const currentSelections = answers[questionId] || [];
    
    // If already selected, remove it
    if (currentSelections.includes(value)) {
      setAnswers({
        ...answers,
        [questionId]: currentSelections.filter(item => item !== value)
      });
    } 
    // Otherwise add it, if not exceeding max selections
    else if (!currentQuestion.maxSelections || currentSelections.length < currentQuestion.maxSelections) {
      setAnswers({
        ...answers,
        [questionId]: [...currentSelections, value]
      });
    }
    
    // Clear validation error if min selections are met
    const updatedSelections = currentSelections.includes(value) 
      ? currentSelections.filter(item => item !== value)
      : [...currentSelections, value];
      
    if (updatedSelections.length >= (currentQuestion.minSelections || 1)) {
      setShowValidationError(false);
    }
    
    // Save progress after answer is updated
    setTimeout(saveProgress, 0);
  };

  const handleTagAdd = () => {
    const tags = answers[currentQuestion.id] || [];
    if (inputValue.trim() && !tags.includes(inputValue.trim()) && 
        tags.length < (currentQuestion.maxSelections || Infinity)) {
      const newTags = [...tags, inputValue.trim()];
      setAnswers({
        ...answers,
        [currentQuestion.id]: newTags
      });
      setInputValue('');
      
      // Clear validation error if min selections are met
      if (newTags.length >= (currentQuestion.minSelections || 1)) {
        setShowValidationError(false);
      }
      
      // Save progress after answer is updated
      setTimeout(saveProgress, 0);
    }
  };

  const handleTagRemove = (tag) => {
    const tags = answers[currentQuestion.id] || [];
    const newTags = tags.filter(t => t !== tag);
    setAnswers({
      ...answers,
      [currentQuestion.id]: newTags
    });
    
    // Show validation error if min selections are no longer met
    if (currentQuestion.minSelections && newTags.length < currentQuestion.minSelections) {
      setShowValidationError(true);
    }
    
    // Save progress after answer is updated
    setTimeout(saveProgress, 0);
  };

  const handleSuggestionClick = (suggestion) => {
    const tags = answers[currentQuestion.id] || [];
    if (tags.length < (currentQuestion.maxSelections || Infinity) && !tags.includes(suggestion)) {
      const newTags = [...tags, suggestion];
      setAnswers({
        ...answers,
        [currentQuestion.id]: newTags
      });
      
      // Clear validation error if min selections are met
      if (newTags.length >= (currentQuestion.minSelections || 1)) {
        setShowValidationError(false);
      }
      
      // Save progress after answer is updated
      setTimeout(saveProgress, 0);
    }
  };

  // Get current section and question
  const currentSection = sections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const isLastQuestion = currentSectionIndex === sections.length - 1 && 
                         currentQuestionIndex === currentSection?.questions.length - 1;
  const canGoBack = currentQuestionIndex > 0 || currentSectionIndex > 0;

  // Helper function to get validation error message
  const getValidationMessage = () => {
    if (!currentQuestion) return "";
    
    switch (currentQuestion.type) {
      case 'singleSelect':
        return 'Please select an option to continue.';
        
      case 'multiSelect':
      case 'tagInput':
        return `Please select at least ${currentQuestion.minSelections || 1} option${
          (currentQuestion.minSelections || 1) !== 1 ? 's' : ''
        }.`;
        
      default:
        return 'Please answer this question before continuing.';
    }
  };

  // Render question types with accessibility improvements
  // const renderSingleSelect = () => {
  //   return (
  //     <div className="space-y-3">
  //       <div className="flex flex-col space-y-2 sm:space-y-3" role="radiogroup" aria-labelledby={`question-${currentQuestion.id}`}>
  //         <span id={`question-${currentQuestion.id}`} className="sr-only">{currentQuestion.question}</span>
  //         {currentQuestion.options.map((option, index) => {
  //           const isSelected = answers[currentQuestion.id] === option.value;
            
  //           return (
  //             <button 
  //               key={option.value}
  //               role="radio"
  //               aria-checked={isSelected}
  //               className={`flex items-center p-3 sm:p-4 border rounded-lg text-left transition-colors
  //                 ${isSelected 
  //                   ? 'border-primary bg-primary/10' 
  //                   : 'border-base-300 hover:bg-base-200'}`}
  //               onClick={() => handleSingleSelect(currentQuestion.id, option.value)}
  //             >
  //               <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-base-200 rounded mr-2 sm:mr-3 text-xs sm:text-sm font-medium text-base-content">
  //                 {String.fromCharCode(65 + index)}
  //               </span> 
  //               <span className="text-sm sm:text-base text-base-content break-words">
  //                 {option.label}
  //               </span>
  //             </button>
  //           );
  //         })}
  //       </div>
        
  //       {showValidationError && (
  //         <p className="text-error text-sm mt-2">
  //           {getValidationMessage()}
  //         </p>
  //       )}
  //     </div>
  //   );
  // };
  const renderSingleSelect = () => {
    return (
      <div className="flex flex-col space-y-3" role="radiogroup" aria-labelledby={`question-${currentQuestion.id}`}>
        <span id={`question-${currentQuestion.id}`} className="sr-only">{currentQuestion.question}</span>
        {currentQuestion.options.map((option, index) => {
          const isSelected = answers[currentQuestion.id] === option.value;
          
          return (
            <button 
              key={option.value}
              role="radio"
              aria-checked={isSelected}
              className={`flex items-center p-4 border rounded-lg text-left transition-colors
                ${isSelected 
                  ? 'border-primary bg-primary/10' 
                  : 'border-base-300 hover:bg-base-200'}`}
              onClick={() => handleSingleSelect(currentQuestion.id, option.value)}
            >
              <span className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded mr-3 text-sm font-medium">
                {String.fromCharCode(65 + index)}
              </span> 
              <div>
                <div className="font-medium">{option.label}</div>
                {option.description && (
                  <div className="text-sm text-gray-500 mt-1">{option.description}</div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  // const renderMultiSelect = () => {
  //   const selectedValues = answers[currentQuestion.id] || [];
  //   const canSelectMore = !currentQuestion.maxSelections || selectedValues.length < currentQuestion.maxSelections;
    
  //   return (
  //     <div className="space-y-3 sm:space-y-4">
  //       <p id={`multiselect-help-${currentQuestion.id}`} className="text-xs sm:text-sm text-base-content/60">
  //         {selectedValues.length} of {currentQuestion.maxSelections || 'unlimited'} selected
  //         {currentQuestion.minSelections && ` (minimum ${currentQuestion.minSelections})`}
  //       </p>
        
  //       <div 
  //         className="flex flex-col space-y-2 sm:space-y-3" 
  //         role="group" 
  //         aria-labelledby={`question-${currentQuestion.id}`}
  //         aria-describedby={`multiselect-help-${currentQuestion.id}`}
  //       >
  //         <span id={`question-${currentQuestion.id}`} className="sr-only">{currentQuestion.question}</span>
  //         {currentQuestion.options.map((option, index) => {
  //           const isSelected = selectedValues.includes(option.value);
            
  //           return (
  //             <button 
  //               key={option.value}
  //               role="checkbox"
  //               aria-checked={isSelected}
  //               className={`flex items-center p-3 sm:p-4 border rounded-lg text-left transition-colors
  //                 ${isSelected 
  //                   ? 'border-primary bg-primary/10' 
  //                   : !canSelectMore && !isSelected
  //                     ? 'border-base-300 opacity-50 cursor-not-allowed'
  //                     : 'border-base-300 hover:bg-base-200'}`}
  //               onClick={() => handleMultiSelect(currentQuestion.id, option.value)}
  //               disabled={!canSelectMore && !isSelected}
  //             >
  //               <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-base-200 rounded mr-2 sm:mr-3 text-xs sm:text-sm font-medium text-base-content">
  //                 {String.fromCharCode(65 + index)}
  //               </span> 
  //               <span className="text-sm sm:text-base text-base-content break-words">
  //                 {option.label}
  //               </span>
  //             </button>
  //           );
  //         })}
  //       </div>
        
  //       {showValidationError && (
  //         <p className="text-error text-sm mt-2">
  //           {getValidationMessage()}
  //         </p>
  //       )}
  //     </div>
  //   );
  // };

  const renderMultiSelect = () => {
    const selectedValues = answers[currentQuestion.id] || [];
    const canSelectMore = !currentQuestion.maxSelections || selectedValues.length < currentQuestion.maxSelections;
    
    return (
      <div className="space-y-4">
        <p id={`multiselect-help-${currentQuestion.id}`} className="text-sm text-gray-500">
          {selectedValues.length} of {currentQuestion.maxSelections || 'unlimited'} selected
          {currentQuestion.minSelections && ` (minimum ${currentQuestion.minSelections})`}
        </p>
        
        <div 
          className="flex flex-col space-y-3" 
          role="group" 
          aria-labelledby={`question-${currentQuestion.id}`}
          aria-describedby={`multiselect-help-${currentQuestion.id}`}
        >
          <span id={`question-${currentQuestion.id}`} className="sr-only">{currentQuestion.question}</span>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedValues.includes(option.value);
            
            return (
              <button 
                key={option.value}
                role="checkbox"
                aria-checked={isSelected}
                className={`flex items-center p-4 border rounded-lg text-left transition-colors
                  ${isSelected 
                    ? 'border-primary bg-primary/10' 
                    : !canSelectMore && !isSelected
                      ? 'border-base-300 opacity-50 cursor-not-allowed'
                      : 'border-base-300 hover:bg-base-200'}`}
                onClick={() => handleMultiSelect(currentQuestion.id, option.value)}
                disabled={!canSelectMore && !isSelected}
              >
                <span className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded mr-3 text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span> 
                <div>
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-gray-500 mt-1">{option.description}</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Tag input section improvement for mobile
  const renderTagInput = () => {
    const tags = answers[currentQuestion.id] || [];
    const inputId = `tag-input-${currentQuestion.id}`;
    const helpId = `tag-help-${currentQuestion.id}`;
    
    return (
      <div className="space-y-3">
        <p id={helpId} className="text-xs sm:text-sm text-base-content/60">
          {tags.length} of {currentQuestion.maxSelections || 'unlimited'} selected
          {currentQuestion.minSelections && ` (minimum ${currentQuestion.minSelections})`}
        </p>
        
        {/* Selected tags */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-2" role="list" aria-label="Selected tags">
            {tags.map(tag => (
              <div key={tag} 
                className="flex items-center bg-primary/10 border border-primary/20 rounded-full px-2 py-1 text-sm text-base-content" 
                role="listitem"
              >
                <span className="mr-1 truncate max-w-[200px]">{tag}</span>
                <button 
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="text-base-content/60 hover:text-base-content p-1"
                  aria-label={`Remove ${tag}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Input field with suggestions */}
        {tags.length < (currentQuestion.maxSelections || Infinity) && (
          <div className="space-y-2">
            {/* Stacked input and button on mobile */}
            <div className="flex flex-col gap-2">
              <label htmlFor={inputId} className="sr-only">Add a tag</label>
              <input
                id={inputId}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type here..."
                className="input input-bordered w-full"
                aria-describedby={helpId}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    e.preventDefault();
                    handleTagAdd();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="btn btn-outline w-full"
                aria-label="Add tag"
                disabled={!inputValue.trim()}
              >
                Add
              </button>
            </div>
            
            {/* Suggestions with better mobile handling */}
            <div className="mt-2">
              <p className="text-xs text-base-content/60 mb-2">Suggestions:</p>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Tag suggestions">
                {currentQuestion.suggestions
                  .filter(suggestion => !tags.includes(suggestion))
                  .map(suggestion => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="badge badge-lg bg-base-200 hover:bg-base-300 text-base-content text-xs p-3 whitespace-normal text-left h-auto max-w-full"
                      disabled={tags.length >= (currentQuestion.maxSelections || Infinity)}
                      aria-label={`Add suggestion: ${suggestion}`}
                      role="listitem"
                    >
                      {suggestion}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
        
        {showValidationError && (
          <p className="text-error text-sm mt-2">
            {getValidationMessage()}
          </p>
        )}
      </div>
    );
  };
  
  // Main render function that calls the appropriate render method
  const renderQuestion = () => {
    if (!currentQuestion) return null;
    
    switch (currentQuestion.type) {
      case 'singleSelect':
        return renderSingleSelect();
      case 'multiSelect':
        return renderMultiSelect();
      case 'tagInput':
        return renderTagInput();
      default:
        return <p className="text-base-content">Unknown question type: {currentQuestion.type}</p>;
    }
  };

  // Show resume progress dialog if applicable
  if (hasExistingProgress) {
    return (
      <div className="bg-base-100 w-full max-w-xl mx-auto p-3 sm:p-6 rounded-lg">
        <div className="text-center p-4 sm:p-6 bg-base-100 rounded-lg shadow-lg">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-base-content">Resume Your Progress?</h2>
          <p className="mb-4 sm:mb-6 text-base-content/80 text-sm sm:text-base">We found your previously saved answers. Would you like to continue where you left off?</p>
          <div className="flex justify-center gap-3 sm:gap-4">
            <button
              onClick={handleStartFresh}
              className="btn btn-sm sm:btn-md btn-outline"
            >
              Start Fresh
            </button>
            <button
              onClick={handleResumeProgress}
              className="btn btn-sm sm:btn-md btn-primary"
            >
              Resume Progress
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main component render
  return (
    <div className="bg-base-100 w-full max-w-xl mx-auto rounded-lg">
      {/* Fixed top section */}
      <div className="w-full px-3 sm:px-4 py-4 sm:py-6">
        {/* Progress indicator always at the top */}
        <SectionProgress 
          sections={sections}
          currentSectionIndex={currentSectionIndex}
          currentQuestionIndex={currentQuestionIndex}
          isReviewMode={isReviewMode}
        />
        
        {isReviewMode ? (
          <ReviewAnswers
            sections={sections}
            answers={answers}
            onSubmit={handleSubmit}
            onEdit={() => setIsReviewMode(false)}
            isSubmitting={isSubmitting}
          />
        ) : (
          <>
            {/* Question header - fixed at top */}
            <div className="mb-5 sm:mb-8">
              <p className="text-xs sm:text-sm text-base-content/60 mb-1">{currentSection.title}</p>
              <h2 className="text-lg sm:text-xl font-medium mb-1 text-base-content">
                {currentQuestionIndex + 1}→ {currentQuestion.question}
              </h2>
              <p className="text-s sm:text-s text-base">{currentQuestion.description || currentSection.description}</p>
            </div>
            
            {/* Question content - can expand downward */}
            <div>
              {renderQuestion()}
            </div>
            
            {/* Navigation - fixed distance from the question header */}
            <div className="mt-6 sm:mt-8 flex justify-between sm:justify-end">
              {canGoBack && (
                <button
                  onClick={goToPreviousQuestion}
                  className="btn btn-sm sm:btn-md btn-outline"
                >
                  Back
                </button>
              )}
            
              <button
                onClick={isLastQuestion ? handleSubmit : goToNextQuestion}
                className={`btn btn-sm sm:btn-md ${
                  isLastQuestion ? "btn-primary" : "btn-outline btn-primary"
                } ${!canGoBack ? 'ml-auto' : ''}`}
              >
                {isLastQuestion ? "Review Answers" : "Next"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OnboardingFlow;