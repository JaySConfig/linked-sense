"use client";

import { useState  } from "react";

export default function GeneratePage() {
    // state for the form inputs

    const [formData, setFormData]= useState ({
        recentActivty: "",
        postType: "thoughtLeadership",
        keyTakeaway: "",
        postTone: "professional",
        callToAction: "noCta"
    }) ;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});

    };

   
  return (
    <div className="space-y-6">
      <h1 className="text-3xl md:text-4xl font-extrabold">Generate LinkedIn Posts</h1>
      <p className="text-base-content/80">Get AI-powered post ideas based on your profile.</p>

      {/* Post Generation Form */}
      <div className="p-6 bg-base-100 shadow-lg rounded-lg space-y-4">
        <div className="form-control">
          <label className="label">What have you been up to lately?</label>
          <textarea
            name="recentActivity"
            value={formData.recentActivity}
            onChange={handleChange}
            className="textarea textarea-bordered"
            placeholder="Describe something interesting you've done recently..."
          />
        </div>

        <div className="form-control">
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
    </div>
  );
}
