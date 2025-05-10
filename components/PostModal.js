// // components/PostModal.js
// import { useState, useEffect } from 'react';
// import MarkdownContent from '@/components/MarkdownContent';

// export default function PostModal({
//   isOpen,
//   onClose,
//   postContent,
//   isGenerating = false,
//   isSaved = false,
//   modalPostIndex = null,
//   onSave,
//   onCopy,
//   title = null
// }) {
//   const [isEditingPost, setIsEditingPost] = useState(false);
//   const [editedPostContent, setEditedPostContent] = useState("");

//   // Update edited content when post content changes
//   useEffect(() => {
//     if (postContent && postContent !== "Generating...") {
//       setEditedPostContent(postContent);
//     }
//   }, [postContent]);

//   // Reset edit mode when modal closes
//   useEffect(() => {
//     if (!isOpen) {
//       setIsEditingPost(false);
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleClose = () => {
//     setIsEditingPost(false);
//     onClose();
//   };

//   const handleSave = () => {
//     const contentToSave = isEditingPost ? editedPostContent : postContent;
//     onSave(contentToSave);
//     setIsEditingPost(false);
//   };

//   const handleDoneEditing = () => {
//     // Apply the edit to the current view but don't save yet
//     postContent = editedPostContent;
//     setIsEditingPost(false);
//   };

//   // Determine the modal title
//   const modalTitle = title || (
//     isSaved 
//       ? `Viewing Saved Post${modalPostIndex !== null ? ` (Row ${modalPostIndex + 1})` : ''}`
//       : `Generated Post${modalPostIndex !== null ? ` (Row ${modalPostIndex + 1})` : ''}`
//   );

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 md:p-4 backdrop-blur-sm">
//       <div className="bg-base-100 rounded-lg shadow-xl p-4 md:p-6 w-full max-w-3xl max-h-[95vh] flex flex-col">
//         <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-base-content flex-shrink-0">
//           {modalTitle}
//         </h2>

//         <div className="flex-grow overflow-y-auto mb-4 md:mb-6 pr-2 border rounded-md bg-white p-3 md:p-4">
//           {isGenerating ? (
//             <div className="text-center p-8 md:p-10">
//               <span className="loading loading-dots loading-md"></span>
//             </div>
//           ) : isEditingPost ? (
//             <textarea
//               className="w-full h-full min-h-[400px] p-2 font-mono text-sm border border-base-300 rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
//               value={editedPostContent}
//               onChange={(e) => setEditedPostContent(e.target.value)}
//               placeholder="Edit your LinkedIn post here..."
//             />
//           ) : (
//             <MarkdownContent 
//               content={postContent || ''} 
//               className="prose prose-sm max-w-none" 
//             />
//           )}
//         </div>
        
//         <div className="flex-shrink-0 mt-auto flex flex-wrap justify-end gap-2">
//           <button
//             className="btn btn-ghost btn-sm"
//             onClick={handleClose}
//           >
//             Close
//           </button>
          
//           {!isEditingPost && !isGenerating && (
//             <button
//               className="btn btn-outline btn-sm"
//               onClick={() => onCopy(postContent)}
//               disabled={!postContent}
//             >
//               Copy
//             </button>
//           )}
          
//           {/* Edit/Done Editing toggle */}
//           {!isGenerating && postContent && (
//             <>
//               {isEditingPost ? (
//                 <button
//                   className="btn btn-secondary btn-sm"
//                   onClick={handleDoneEditing}
//                 >
//                   Done Editing
//                 </button>
//               ) : (
//                 <button
//                   className="btn btn-secondary btn-sm"
//                   onClick={() => setIsEditingPost(true)}
//                 >
//                   Edit
//                 </button>
//               )}
//             </>
//           )}
          
//           {/* Save/Save Changes button */}
//           {!isGenerating && postContent && (
//             <button
//               className="btn btn-primary btn-sm"
//               onClick={handleSave}
//             >
//               {isSaved && !isEditingPost ? 'Update Post' : 'Save Post'}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// components/PostModal.js
import { useState, useEffect } from 'react';
import MarkdownContent from '@/components/MarkdownContent';

export default function PostModal({
  isOpen,
  onClose,
  postContent,
  isGenerating = false,
  isSaved = false,
  modalPostIndex = null,
  onSave,
  onCopy,
  title = null,
  onUpdateContent // New prop to update parent's state
}) {
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedPostContent, setEditedPostContent] = useState("");
  const [displayContent, setDisplayContent] = useState(postContent);

  // Update content when modal opens or post changes
  useEffect(() => {
    if (postContent && postContent !== "Generating...") {
      setEditedPostContent(postContent);
      setDisplayContent(postContent);
    }
  }, [postContent]);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsEditingPost(false);
      setDisplayContent(postContent);
    }
  }, [isOpen, postContent]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsEditingPost(false);
    setEditedPostContent(postContent); // Reset to original
    setDisplayContent(postContent); // Reset display
    onClose();
  };

  const handleSave = () => {
    const contentToSave = isEditingPost ? editedPostContent : displayContent;
    onSave(contentToSave);
    setIsEditingPost(false);
    // Don't close the modal - let parent handle that after successful save
  };

  const handleDoneEditing = () => {
    // Update the display content with edited content
    setDisplayContent(editedPostContent);
    setIsEditingPost(false);
    // Update parent component's state
    if (onUpdateContent) {
      onUpdateContent(editedPostContent);
    }
  };

  const handleCancelEdit = () => {
    // Reset to the currently displayed content
    setEditedPostContent(displayContent);
    setIsEditingPost(false);
  };

  // Determine the modal title
  const modalTitle = title || (
    isSaved 
      ? `Viewing Saved Post${modalPostIndex !== null ? ` (Row ${modalPostIndex + 1})` : ''}`
      : `Generated Post${modalPostIndex !== null ? ` (Row ${modalPostIndex + 1})` : ''}`
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 md:p-4 backdrop-blur-sm">
      <div className="bg-base-100 rounded-lg shadow-xl p-4 md:p-6 w-full max-w-3xl max-h-[95vh] flex flex-col">
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-base-content flex-shrink-0">
          {modalTitle}
        </h2>

        <div className="flex-grow overflow-y-auto mb-4 md:mb-6 pr-2 border rounded-md bg-white p-3 md:p-4">
          {isGenerating ? (
            <div className="text-center p-8 md:p-10">
              <span className="loading loading-dots loading-md"></span>
            </div>
          ) : isEditingPost ? (
            <textarea
              className="w-full h-full min-h-[400px] p-2 font-mono text-sm border border-base-300 rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              value={editedPostContent}
              onChange={(e) => setEditedPostContent(e.target.value)}
              placeholder="Edit your LinkedIn post here..."
            />
          ) : (
            <MarkdownContent 
              content={displayContent || ''} 
              className="prose prose-sm max-w-none" 
            />
          )}
        </div>
        
        <div className="flex-shrink-0 mt-auto flex flex-wrap justify-end gap-2">
          {/* Edit mode buttons */}
          {isEditingPost ? (
            <>
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleDoneEditing}
              >
                Preview Changes
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              {/* View mode buttons */}
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleClose}
              >
                Close
              </button>
              
              {!isGenerating && (
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => onCopy(displayContent)}
                  disabled={!displayContent}
                >
                  Copy
                </button>
              )}
              
              {!isGenerating && displayContent && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsEditingPost(true)}
                >
                  Edit
                </button>
              )}
              
              {/* Show Save only if there are unsaved changes */}
              {!isGenerating && displayContent && (displayContent !== postContent || !isSaved) && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleSave}
                >
                  Save Post
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}