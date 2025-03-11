"use client";

import { useState  } from "react";

export default function writePage( onSubmit ) {
    // state for the form inputs

    const [writtenPost, setWrittenPost] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
      postTopic: "",
      postType: "thoughtLeadership",
      postTone: "professional",
      postLength: "short",
      keyTakeaway: "",
      callToAction: "noCta",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});

    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      
      try {
        const response = await fetch('/api/write-post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.details || data.error || 'Failed to write post');
        }
        
        setWrittenPost(data.post);
      } catch (error) {
        console.error('Error:', error);
        // Optional: add error state handling here
      } finally {
        setIsLoading(false);
      }
    };

   
  return (
    <section>
    <form onSubmit={handleSubmit}>
    <div className="space-y-6">
      <h1 className="text-3xl md:text-4xl font-extrabold">Write LinkedIn Posts</h1>
      <p className="text-base-content/80">Get AI written posts</p>
      </div>
     

      {/* Post Generation Form */}
      
      <div className="p-6 bg-base-100 shadow-lg rounded-lg space-y-4">
        <div className="form-control">
          <label className="label">What do you want to post about today?</label>
          <textarea
            name="postTopic"
            value={formData.postTopic}
            onChange={handleChange}
            className="textarea textarea-bordered"
            placeholder="Describe something interesting you've done recently..."
          />
        </div> 
        
        <div className="form-control">
          <label className="label">What type of post is it?</label>
          <select
            name="postType"
            value={formData.postType}
            onChange={handleChange}
            className="select select-bordered"
          >
            <option value="thoughtLeadership">Thought Leadership</option>
            <option value="personalStory">Personal Story</option>
            <option value="educational">Educational/Practical Tips</option>
            <option value="engagement">Audience Engagement (Poll, Question, Discussion)</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">How do you want this post to feel?</label>
          <select
            name="postTone"
            value={formData.postTone}
            onChange={handleChange}
            className="select select-bordered"
          >
            <option value="professional">Professional</option>
            <option value="conversational">Conversational</option>
            <option value="inspirational">Inspirational</option>
            <option value="funny">Witty/Funny</option>
            <option value="dataDriven">Data-Driven</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">How long do you want this post to be?</label>
          <select
            name="postLength"
            value={formData.postLength}
            onChange={handleChange}
            className="select select-bordered"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="detailed">Detailed</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">Whats the key takeaway for your audience?</label>
          <textarea
            name="keyTakeaway"
            value={formData.keyTakeaway}
            onChange={handleChange}
            className="textarea textarea-bordered"
            placeholder="What do you want your audience to learn or take away?"
          />
        </div>

        <div className="form-control">
          <label className="label">Do you want to include a call to action?</label>
          <select
            name="callToAction"
            value={formData.callToAction}
            onChange={handleChange}
            className="select select-bordered"
          >
            <option value="noCTA">No CTA</option>
            <option value="askAQuestion">Ask a question</option>
            <option value="encourageDiscussion">Encourage Discussion</option>
            <option value="promoteProductService">Promote a product/service</option>
            <option value="inviteToConnect">Invite people to connect</option>
          </select>
        </div>

        {/* <details className="mt-4 collapse collapse-arrow bg-base-200">
          <summary className="collapse-title font-medium">Tips for Better Results</summary>
          <div className="collapse-content">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Be specific with your examples - concrete details perform better than generalisations</li>
              <li>Keep your answer focused on one key story or insight</li>
              <li>Include real examples from your experience when possible</li>
              <li>Consider what would be most valuable to your LinkedIn audience</li>
            </ul>
          </div>
        </details> */}

        <button className=" justify-center btn btn-primary mt-4">Write Post </button>
        
      </div>
      
      </form>
      <div>
      {isLoading && (
          <div className="mt-8 text-center">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="mt-2">Writing your LinkedIn post...</p>
          </div>
        )}

        {writtenPost && !isLoading && (
          <div className="mt-8 p-6 bg-base-100 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Your LinkedIn Post</h2>
            <div className="whitespace-pre-wrap bg-base-200 p-4 rounded-lg">
              {writtenPost}
            </div>
            <div className="flex justify-between mt-4">
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => {navigator.clipboard.writeText(writtenPost)}}
              >
                Copy to Clipboard
              </button>
              <button className="btn btn-primary btn-sm">Share to LinkedIn</button>
            </div>
          </div>
        )}
        
      </div>
      </section>
      
      
      

      
    
  );
}
