// This component has been moved to app/dashboard/components/MarkdownContent.js
// It's now co-located with the dashboard features that use it.
// If you need to use this component, please import it from there.

const MarkdownContent = () => {
    console.warn('This is a placeholder. The actual MarkdownContent component has been moved to app/dashboard/components/');
    return null;
  };
  
  export default MarkdownContent;


// // components/MarkdownContent.jsx
// import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// const MarkdownContent = ({ content, className = "prose prose-lg max-w-none" }) => (
//     content ? (
//         <div className={className}>
//             <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                 {content}
//             </ReactMarkdown>
//         </div>
//     ) : (
//         <p className="italic text-gray-500">No content available.</p>
//     )
// );

// export default MarkdownContent; // Make sure to export it