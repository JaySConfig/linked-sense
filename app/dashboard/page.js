'use client'

import ButtonAccount from "@/components/ButtonAccount";
import Footer from "@/components/Footer";
import Link from 'next/link';

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
// app/dashboard/page.js
export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-extrabold">Dashboard</h1>
      
      {/* Welcome section with quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Content Created</h2>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-base-content/70">Start creating your LinkedIn content</p>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Profile Complete</h2>
            <p className="text-3xl font-bold">20%</p>
            <p className="text-sm text-base-content/70">Complete your profile for better suggestions</p>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Content Ideas</h2>
            <p className="text-3xl font-bold">∞</p>
            <p className="text-sm text-base-content/70">Never run out of content ideas</p>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Your Plan</h2>
            <p className="text-xl font-bold">Free Trial</p>
            <p className="text-sm text-base-content/70">7 days remaining</p>
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Link 
              href="/dashboard/generate"
              className="btn btn-primary"
            >
              Create New Content
            </Link>
            <Link 
              href="/dashboard/profile"
              className="btn btn-outline"
            >
              Complete Your Profile
            </Link>
            <button className="btn btn-outline">
              Browse Content Ideas
            </button>
          </div>
        </div>
      </div>
      
      {/* Content ideas */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Content Ideas For You</h2>
          <p className="text-sm text-base-content/70 mb-4">Complete your profile to get personalized content ideas</p>
          
          <div className="space-y-4">
            <div className="p-4 bg-base-200 rounded-lg hover:bg-base-300 cursor-pointer transition-colors">
              <h3 className="font-semibold">Share Your Professional Journey</h3>
              <p className="text-sm text-base-content/70">
                Tell your network about a challenge you overcame in your career and what you learned from it.
              </p>
            </div>
            
            <div className="p-4 bg-base-200 rounded-lg hover:bg-base-300 cursor-pointer transition-colors">
              <h3 className="font-semibold">Industry Insight</h3>
              <p className="text-sm text-base-content/70">
                Share your perspective on a recent trend or news in your industry.
              </p>
            </div>
            
            <div className="p-4 bg-base-200 rounded-lg hover:bg-base-300 cursor-pointer transition-colors">
              <h3 className="font-semibold">Ask Your Network</h3>
              <p className="text-sm text-base-content/70">
                Pose a thoughtful question to engage your network in discussion.
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <Link 
              href="/dashboard/generate"
              className="btn btn-sm btn-link"
            >
              See More Ideas →
            </Link>
          </div>
        </div>
      </div>
      
      {/* Getting started guide */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Getting Started with LinkedFlow</h2>
          <div className="steps steps-vertical lg:steps-horizontal w-full">
            <div className="step">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-sm font-medium">Step 1</span>
                <span className="text-xs">Complete your profile</span>
              </div>
            </div>
            <div className="step step-neutral">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-sm font-medium">Step 2</span>
                <span className="text-xs">Generate your first content</span>
              </div>
            </div>
            <div className="step">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-sm font-medium">Step 3</span>
                <span className="text-xs">Post to LinkedIn</span>
              </div>
            </div>
            <div className="step">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-sm font-medium">Step 4</span>
                <span className="text-xs">Track performance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}