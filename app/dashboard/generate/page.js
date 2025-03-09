"use client";

import { useState  } from "react";

export default function GeneratePage() {
    // state for the form inputs

    const [formData, setFormData] = useState({
      contentCategory: "reflectionChallenges",
      contentQuestion: "",
      postType: "thoughtLeadership",
      postTone: "professional",
      keyTakeaway: "",
      callToAction: "noCta",
      answerText: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});

    };

   
  return (
    <div className="space-y-6">
      <h1 className="text-3xl md:text-4xl font-extrabold">Generate LinkedIn Posts</h1>
      <p className="text-base-content/80">Get AI-powered post ideas based on your profile.</p>

      {/* Post Generation Form */}
      {/* <div className="p-6 bg-base-100 shadow-lg rounded-lg space-y-4">
        <div className="form-control">
          <label className="label">What have you been up to lately?</label>
          <textarea
            name="recentActivity"
            value={formData.recentActivity}
            onChange={handleChange}
            className="textarea textarea-bordered"
            placeholder="Describe something interesting you've done recently..."
          />
        </div> */}

    <div className="form-control">
      <label className="label">Content Inspiration Category</label>
      <select
        name="contentCategory"
        value={formData.contentCategory}
        onChange={handleChange}
        className="select select-bordered"
      >
        <option value="reflectionChallenges">🔥 Reflection & Challenges</option>
        <option value="insightsLessons">💡 Insights & Lessons</option>
        <option value="winsAccomplishments">🏆 Wins & Accomplishments</option>
        <option value="adviceTakeaways">🚀 Advice & Takeaways</option>
      </select>
    </div>

    {/* // Add the second dropdown that changes based on the selected category */}
    <div className="form-control">
      <label className="label">Choose a question</label>
      <select
        name="contentQuestion"
        value={formData.contentQuestion}
        onChange={handleChange}
        className="select select-bordered"
      >
        {formData.contentCategory === "reflectionChallenges" && (
          <>
            <option value="">Select a reflection question</option>
            <option value="challenge">1️⃣ What was the biggest challenge you faced this week, and how did you handle it?</option>
            <option value="failure">2️⃣ What's something that didn't go as planned, and what did you learn from it?</option>
            <option value="redo">3️⃣ If you could redo one decision from this week, what would it be and why?</option>
          </>
        )}
        
        {formData.contentCategory === "insightsLessons" && (
          <>
            <option value="">Select an insight question</option>
            <option value="ahamoment">4️⃣ Did you have an "aha" moment that changed how you work or think?</option>
            <option value="learned">5️⃣ What's the most interesting thing you read, watched, or learned this week?</option>
            <option value="habit">6️⃣ What's one habit or small change that made a big impact on your productivity this week?</option>
          </>
        )}
        
        {formData.contentCategory === "winsAccomplishments" && (
          <>
            <option value="">Select an accomplishment question</option>
            <option value="proud">7️⃣ What's one thing you accomplished this week that you're proud of?</option>
            <option value="perspective">8️⃣ Did a conversation or meeting this week completely shift your perspective on something?</option>
          </>
        )}
        
        {formData.contentCategory === "adviceTakeaways" && (
          <>
            <option value="">Select an advice question</option>
            <option value="advice">9️⃣ If you had to give one piece of advice to someone starting in your field based on this week, what would it be?</option>
            <option value="nextweek">🔟 What's one thing you'll do differently next week based on what you learned this week?</option>
            <option value="smallthing">🔥 What's something small that had a surprisingly big impact this week?</option>
          </>
        )}
      </select>
    </div>

    {/* // Conditionally show this text area only if a question is selected */}
    {formData.contentQuestion && (
      <div className="form-control mt-2">
        <label className="label">Your answer</label>
        <textarea
          name="answerText"
          value={formData.answerText}
          onChange={handleChange}
          className="textarea textarea-bordered"
          placeholder="Share your thoughts on this question..."
        />
      </div>
    )}

        

        {/* <div className="form-control">
          <label className="label">What type of post do you want to create?</label>
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
        </div> */}

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

        <button className=" justify-center btn btn-primary mt-4">Generate Post Ideas</button>
      </div>
    
  );
}
