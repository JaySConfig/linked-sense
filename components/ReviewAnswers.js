// 'use client'

// function ReviewAnswers({ sections, answers, onSubmit, onEdit, isSubmitting }) {
//   // Helper function to render different answer types
//   const renderAnswer = (question, answer) => {
//     if (!answer) return <p className="text-base-content/50 italic">No answer provided</p>;
    
//     switch (question.type) {
//       case 'singleSelect': {
//         const selectedOption = question.options.find(opt => opt.value === answer);
//         return <p className="text-base-content">{selectedOption?.label || answer}</p>;
//       }
//       case 'multiSelect': {
//         return (
//           <ul className="list-disc pl-5">
//             {answer.map(value => {
//               const option = question.options.find(opt => opt.value === value);
//               return <li key={value} className="text-base-content">{option?.label || value}</li>;
//             })}
//           </ul>
//         );
//       }
//       case 'tagInput': {
//         return (
//           <div className="flex flex-wrap gap-2">
//             {answer.map(tag => (
//               <span key={tag} className="bg-primary/10 rounded-full px-3 py-1 text-sm text-base-content">
//                 {tag}
//               </span>
//             ))}
//           </div>
//         );
//       }
//       default:
//         return <p className="text-base-content">{JSON.stringify(answer)}</p>;
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="mb-8">
//         <h2 className="text-xl font-medium mb-1 text-base-content">
//           Review Your Answers
//         </h2>
//         <p className="text-sm text-base-content/60">Please check your answers before submitting.</p>
//       </div>
      
//       <div className="space-y-6">
//         {sections.map(section => (
//           <div key={section.id} className="border border-base-300 rounded-lg p-4">
//             <h3 className="font-medium text-lg mb-3 text-base-content">{section.title}</h3>
//             {section.questions.map(question => (
//               <div key={question.id} className="mb-4">
//                 <p className="text-sm font-medium mb-2 text-base-content">{question.question}</p>
//                 {renderAnswer(question, answers[question.id])}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
      
//       <div className="mt-8 flex justify-end">
//         <button
//           onClick={onEdit}
//           className="btn btn-outline mr-2"
//           disabled={isSubmitting} // Disable button when submitting

//         >
//           Edit Answers
//         </button>
//         <button
//           onClick={onSubmit}
//           className="btn btn-primary"
//           disabled={isSubmitting} // Disable button when submitting

//         >
//           Confirm & Submit
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ReviewAnswers;


//  mobile optimsied

function ReviewAnswers({ sections, answers, onSubmit, onEdit, isSubmitting }) {
  // Helper function to render different answer types
  const renderAnswer = (question, answer) => {
    if (!answer) return <p className="text-gray-500 italic text-sm">No answer provided</p>;
    
    switch (question.type) {
      case 'singleSelect':
        const selectedOption = question.options.find(opt => opt.value === answer);
        return <p className="text-base-content text-sm sm:text-base">{selectedOption?.label || answer}</p>;
        
      case 'multiSelect':
        return (
          <ul className="list-disc pl-4 text-sm sm:text-base">
            {answer.map(value => {
              const option = question.options.find(opt => opt.value === value);
              return <li key={value} className="text-base-content">{option?.label || value}</li>;
            })}
          </ul>
        );
        
      case 'tagInput':
        return (
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {answer.map(tag => (
              <span key={tag} className="bg-primary/10 rounded-full px-2 py-0.5 text-xs sm:text-sm">
                {tag}
              </span>
            ))}
          </div>
        );
        
      default:
        return <p className="text-base-content text-sm sm:text-base">{JSON.stringify(answer)}</p>;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-5 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-medium mb-1 text-base-content">
          Review Your Answers
        </h2>
        <p className="text-xs sm:text-sm text-base-content/60">Please check your answers before submitting.</p>
      </div>
      
      <div className="space-y-4 sm:space-y-6">
        {sections.map(section => (
          <div key={section.id} className="border rounded-lg p-3 sm:p-4">
            <h3 className="font-medium text-base sm:text-lg mb-2 sm:mb-3 text-base-content">{section.title}</h3>
            {section.questions.map(question => (
              <div key={question.id} className="mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-base-content">{question.question}</p>
                {renderAnswer(question, answers[question.id])}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-4">
        <button
          onClick={onEdit}
          disabled={isSubmitting}
          className="btn btn-sm sm:btn-md btn-outline w-full sm:w-auto"
        >
          Edit Answers
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="btn btn-sm sm:btn-md btn-primary w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-xs sm:loading-sm"></span>
              Submitting...
            </>
          ) : (
            "Confirm & Submit"
          )}
        </button>
      </div>
    </div>
  );
}