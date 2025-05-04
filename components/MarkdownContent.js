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

// Enhanced MarkdownContent.js with better mobile styling


import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownContent = ({ content }) => {
  return (
    <div className="markdown-wrapper">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Root element
          root: ({node, ...props}) => <div className="prose prose-sm md:prose-base max-w-none" {...props} />,
          
          // Improved styling for headings
          h1: ({node, ...props}) => <h1 className="text-2xl md:text-3xl font-bold mt-6 mb-4" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl md:text-2xl font-bold mt-5 mb-3" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2" {...props} />,
          
          // Better paragraph spacing
          p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
          
          // List styling - better spacing for mobile
          ul: ({node, ...props}) => <ul className="pl-5 md:pl-6 mb-4 space-y-2" {...props} />,
          ol: ({node, ...props}) => <ol className="pl-5 md:pl-6 mb-4 space-y-2" {...props} />,
          
          // List items with better spacing
          li: ({node, children, ...props}) => {
            // Check if this list item contains a nested list
            const hasNestedList = node.children.some(child => 
              child.type === 'element' && (child.tagName === 'ul' || child.tagName === 'ol')
            );
            
            return (
              <li className={`${hasNestedList ? 'mb-2' : ''}`} {...props}>
                {children}
              </li>
            );
          },
          
          // Better styling for blockquotes on mobile
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-neutral pl-4 italic my-4" {...props} />,
          
          // Better code block styling
          code: ({node, inline, ...props}) => 
            inline ? 
              <code className="bg-base-200 px-1 py-0.5 rounded text-sm" {...props} /> : 
              <code className="block bg-base-200 p-3 rounded-lg overflow-x-auto text-sm my-4" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;