// // SectionProgress.js
import React from 'react';

// // function SectionProgress({ sections, currentSectionIndex, isReviewMode }) {
// //   return (
// //     <div className="w-full mb-8">
// //       <div className="flex justify-between">
// //         {sections.map((section, index) => {
// //           // Determine the status of this section
// //           const isActive = index === currentSectionIndex;
// //           const isCompleted = index < currentSectionIndex || isReviewMode;
          
// //           return (
// //             <div key={section.id} className="flex flex-col items-center w-1/4">
// //               <div 
// //                 className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
// //                   isActive 
// //                     ? 'bg-emerald-600 text-white' 
// //                     : isCompleted 
// //                       ? 'bg-emerald-100 text-emerald-700 border border-emerald-600' 
// //                       : 'bg-gray-200 text-gray-500'
// //                 }`}
// //               >
// //                 {isCompleted ? (
// //                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                   </svg>
// //                 ) : (
// //                   index + 1
// //                 )}
// //               </div>
// //               <span className={`text-xs text-center ${
// //                 isActive 
// //                   ? 'text-emerald-700 font-medium' 
// //                   : isCompleted 
// //                     ? 'text-emerald-600' 
// //                     : 'text-gray-500'
// //               }`}>
// //                 {section.title}
// //               </span>
// //             </div>
// //           );
// //         })}
// //       </div>
      
// //       {/* Connecting lines between circles */}
// //       <div className="flex justify-between items-center mt-4 px-4">
// //         {sections.slice(0, -1).map((_, index) => (
// //           <div 
// //             key={index} 
// //             className={`h-1 flex-grow mx-1 ${
// //               index < currentSectionIndex || isReviewMode
// //                 ? 'bg-emerald-500' 
// //                 : 'bg-gray-200'
// //             }`}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// // export default SectionProgress;

// function SectionProgress({ sections, currentSectionIndex, isReviewMode }) {
//     return (
//       <div className="w-full mb-8">
//         {/* Section circles */}
//         <div className="flex justify-between relative">
//           {sections.map((section, index) => {
//             // Determine the status of this section
//             const isActive = index === currentSectionIndex;
//             const isCompleted = index < currentSectionIndex || isReviewMode;
            
//             return (
//               <div key={section.id} className="flex flex-col items-center z-10">
//                 <div 
//                   className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
//                     isActive 
//                       ? 'bg-emerald-600 text-white' 
//                       : isCompleted 
//                         ? 'bg-emerald-100 text-emerald-700 border border-emerald-600' 
//                         : 'bg-gray-200 text-gray-500'
//                   }`}
//                 >
//                   {isCompleted ? (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   ) : (
//                     index + 1
//                   )}
//                 </div>
//                 <span className={`text-xs text-center ${
//                   isActive 
//                     ? 'text-emerald-700 font-medium' 
//                     : isCompleted 
//                       ? 'text-emerald-600' 
//                       : 'text-gray-500'
//                 }`}>
//                   {section.title}
//                 </span>
//               </div>
//             );
//           })}
          
//           {/* Connecting lines as a background layer */}
//           <div className="absolute top-4 left-0 right-0 flex items-center h-0">
//             {sections.map((_, index) => {
//               // We don't need a line after the last circle
//               if (index === sections.length - 1) return null;
              
//               const isCompleted = index < currentSectionIndex || isReviewMode;
              
//               return (
//                 <div 
//                   key={index} 
//                   className={`h-1 flex-grow ${
//                     isCompleted
//                       ? 'bg-emerald-500' 
//                       : 'bg-gray-200'
//                   }`}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   export default SectionProgress;


//   function SectionProgress({ sections, currentSectionIndex, currentQuestionIndex }) {
//     // Calculate total questions
//     const totalQuestions = sections.reduce(
//       (total, section) => total + section.questions.length, 0
//     );
    
//     // Calculate completed questions (all from previous sections plus current)
//     // We need to count the *current* question as well since it's being displayed
//     const completedQuestionsCount = sections
//       .slice(0, currentSectionIndex)
//       .reduce((count, section) => count + section.questions.length, 0) + 
//       (currentQuestionIndex + 1); // Add 1 because currentQuestionIndex is 0-based
    
//     // Calculate progress percentage
//     const progressPercentage = (completedQuestionsCount / totalQuestions) * 100;
    
//     return (
//       <div className="w-full mb-6">
//         {/* Section circles with titles */}
//         <div className="flex justify-between mb-2">
//           {sections.map((section, index) => {
//             const isActive = index === currentSectionIndex;
//             const isCompleted = index < currentSectionIndex;
            
//             return (
//               <div key={section.id} className="flex flex-col items-center">
//                 <div 
//                   className={`w-10 h-10 rounded-full flex items-center justify-center text-base ${
//                     isCompleted
//                       ? 'bg-emerald-600 text-white' 
//                       : isActive
//                         ? 'bg-emerald-100 text-emerald-700 border border-emerald-600' 
//                         : 'bg-gray-200 text-gray-500'
//                   }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <span className={`text-xs mt-1 max-w-[80px] text-center ${
//                   isActive || isCompleted ? 'text-emerald-800' : 'text-gray-500'
//                 }`}>
//                   {section.title}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
        
//         {/* Simple progress bar */}
//         <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
//           <div 
//             className="h-full bg-emerald-500 rounded-full transition-all duration-300"
//             style={{ width: `${progressPercentage}%` }}
//           ></div>
//         </div>
        
//         {/* Question counter */}
//         <div className="text-xs text-gray-500 mt-1 text-right">
//           {completedQuestionsCount} of {totalQuestions} questions
//         </div>
//       </div>
//     );
//   }

function SectionProgress({ sections, currentSectionIndex, currentQuestionIndex, isReviewMode }) {
    // Calculate total questions
    const totalQuestions = sections.reduce(
      (total, section) => total + section.questions.length, 0
    );
    
    // Calculate completed questions
    const completedQuestionsCount = sections
      .slice(0, currentSectionIndex)
      .reduce((count, section) => count + section.questions.length, 0) +
      (currentQuestionIndex + 1);
    
    // Check if we've completed all questions in the current section
    const isLastQuestionInSection = 
      currentQuestionIndex === sections[currentSectionIndex]?.questions.length - 1;
    
    // Progress percentage
    const progressPercentage = (completedQuestionsCount / totalQuestions) * 100;
    
    return (
      <div className="w-full mb-6">
        {/* Section circles with titles */}
        <div className="flex justify-between mb-2">
          {sections.map((section, index) => {
            const isActive = index === currentSectionIndex;
            const isCompleted = index < currentSectionIndex;
            
            // Special case for the last section - consider it completed if:
            // 1. We're in review mode, or
            // 2. We're on the last question of the last section
            const isLastSection = index === sections.length - 1;
            const isLastSectionCompleted = 
              isLastSection && 
              isActive && 
              (isReviewMode || isLastQuestionInSection);
            
            return (
              <div key={section.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-base ${
                    isCompleted || isLastSectionCompleted
                      ? 'bg-emerald-600 text-white'
                      : isActive
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-600'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`text-xs mt-1 max-w-[80px] text-center ${
                  isActive || isCompleted || isLastSectionCompleted 
                    ? 'text-emerald-800' 
                    : 'text-gray-500'
                }`}>
                  {section.title}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        {/* Question counter */}
        <div className="text-xs text-gray-500 mt-1 text-right">
          {completedQuestionsCount} of {totalQuestions} questions
        </div>
      </div>
    );
  }

    export default SectionProgress;