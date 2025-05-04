// // // // SectionProgress.js
// // import React from 'react';

// // function SectionProgress({ sections, currentSectionIndex, currentQuestionIndex, isReviewMode }) {
// //     // Calculate total questions
// //     const totalQuestions = sections.reduce(
// //       (total, section) => total + section.questions.length, 0
// //     );
    
// //     // Calculate completed questions
// //     const completedQuestionsCount = sections
// //       .slice(0, currentSectionIndex)
// //       .reduce((count, section) => count + section.questions.length, 0) +
// //       (currentQuestionIndex + 1);
    
// //     // Check if we've completed all questions in the current section
// //     const isLastQuestionInSection = 
// //       currentQuestionIndex === sections[currentSectionIndex]?.questions.length - 1;
    
// //     // Progress percentage
// //     const progressPercentage = (completedQuestionsCount / totalQuestions) * 100;
    
// //     return (
// //       <div className="w-full mb-6">
// //         {/* Section circles with titles */}
// //         <div className="flex justify-between mb-2">
// //           {sections.map((section, index) => {
// //             const isActive = index === currentSectionIndex;
// //             const isCompleted = index < currentSectionIndex;
            
// //             // Special case for the last section - consider it completed if:
// //             // 1. We're in review mode, or
// //             // 2. We're on the last question of the last section
// //             const isLastSection = index === sections.length - 1;
// //             const isLastSectionCompleted = 
// //               isLastSection && 
// //               isActive && 
// //               (isReviewMode || isLastQuestionInSection);
            
// //             return (
// //               <div key={section.id} className="flex flex-col items-center">
// //                 <div
// //                   className={`w-10 h-10 rounded-full flex items-center justify-center text-base ${
// //                     isCompleted || isLastSectionCompleted
// //                       ? 'bg-emerald-600 text-white'
// //                       : isActive
// //                         ? 'bg-emerald-100 text-emerald-700 border border-emerald-600'
// //                         : 'bg-gray-200 text-gray-500'
// //                   }`}
// //                 >
// //                   {index + 1}
// //                 </div>
// //                 <span className={`text-xs mt-1 max-w-[80px] text-center ${
// //                   isActive || isCompleted || isLastSectionCompleted 
// //                     ? 'text-emerald-800' 
// //                     : 'text-gray-500'
// //                 }`}>
// //                   {section.title}
// //                 </span>
// //               </div>
// //             );
// //           })}
// //         </div>
        
// //         {/* Progress bar */}
// //         <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
// //           <div
// //             className="h-full bg-emerald-500 rounded-full transition-all duration-300"
// //             style={{ width: `${progressPercentage}%` }}
// //           ></div>
// //         </div>
        
// //         {/* Question counter */}
// //         <div className="text-xs text-gray-500 mt-1 text-right">
// //           {completedQuestionsCount} of {totalQuestions} questions
// //         </div>
// //       </div>
// //     );
// //   }

// //     export default SectionProgress;


// ///// from testing app 



// // // SectionProgress.js
// import React from 'react';

// function SectionProgress({ sections, currentSectionIndex, currentQuestionIndex, isReviewMode }) {
//     // Calculate total questions
//     const totalQuestions = sections.reduce(
//       (total, section) => total + section.questions.length, 0
//     );
    
//     // Calculate completed questions
//     const completedQuestionsCount = sections
//       .slice(0, currentSectionIndex)
//       .reduce((count, section) => count + section.questions.length, 0) +
//       (currentQuestionIndex + 1);
    
//     // Check if we've completed all questions in the current section
//     const isLastQuestionInSection = 
//       currentQuestionIndex === sections[currentSectionIndex]?.questions.length - 1;
    
//     // Progress percentage
//     const progressPercentage = (completedQuestionsCount / totalQuestions) * 100;
    
//     return (
//       <div className="w-full mb-6">
//         {/* Section circles with titles */}
//         <div className="flex justify-between mb-2">
//           {sections.map((section, index) => {
//             const isActive = index === currentSectionIndex;
//             const isCompleted = index < currentSectionIndex;
            
//             // Special case for the last section - consider it completed if:
//             // 1. We're in review mode, or
//             // 2. We're on the last question of the last section
//             const isLastSection = index === sections.length - 1;
//             const isLastSectionCompleted = 
//               isLastSection && 
//               isActive && 
//               (isReviewMode || isLastQuestionInSection);
            
//             return (
//               <div key={section.id} className="flex flex-col items-center">
//                 <div
//                   className={`w-10 h-10 rounded-full flex items-center justify-center text-base ${
//                     isCompleted || isLastSectionCompleted
//                       ? 'bg-emerald-600 text-white'
//                       : isActive
//                         ? 'bg-emerald-100 text-emerald-700 border border-emerald-600'
//                         : 'bg-gray-200 text-gray-500'
//                   }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <span className={`text-xs mt-1 max-w-[80px] text-center ${
//                   isActive || isCompleted || isLastSectionCompleted 
//                     ? 'text-emerald-800' 
//                     : 'text-gray-500'
//                 }`}>
//                   {section.title}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
        
//         {/* Progress bar */}
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

////// mobile optimised //////// 

//     export default SectionProgress;import React from 'react';

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
  
  // Progress percentage
  const progressPercentage = (completedQuestionsCount / totalQuestions) * 100;
  
  return (
    <div className="w-full mb-4 sm:mb-6">
      {/* Desktop view - Full section circles */}
      <div className="hidden sm:flex justify-between mb-2">
        {sections.map((section, index) => {
          const isActive = index === currentSectionIndex;
          const isCompleted = index < currentSectionIndex;
          const isLastSection = index === sections.length - 1;
          const isLastSectionCompleted = isLastSection && isActive && isReviewMode;
          
          return (
            <div key={section.id} className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-base ${
                  isCompleted || isLastSectionCompleted
                    ? 'bg-primary text-primary-content'
                    : isActive
                      ? 'bg-primary/10 text-primary border-2 border-primary'
                      : 'bg-base-200 text-base-content/70'
                }`}
              >
                {index + 1}
              </div>
              <span className={`text-xs mt-1 max-w-[80px] text-center truncate ${
                isActive || isCompleted || isLastSectionCompleted 
                  ? 'text-primary font-medium' 
                  : 'text-base-content/70'
              }`}>
                {section.title}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Mobile view - Simple progress indicator */}
      <div className="sm:hidden">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-primary">
            {sections[currentSectionIndex]?.title}
          </p>
          <p className="text-xs text-base-content/60">
            {completedQuestionsCount} of {totalQuestions}
          </p>
        </div>
      </div>
      
      {/* Progress bar - shown on both mobile and desktop */}
      <div className="w-full h-2 bg-base-200 rounded-full">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default SectionProgress;