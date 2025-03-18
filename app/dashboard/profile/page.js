// app/dashboard/profile/page.js
"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { useState } from 'react';

export default function ProfilePage() {
  // State for the form data
  const [formData, setFormData] = useState({
    typeOfProfile: '',
    industry: '',
    role: '',
    experience: '',
    expertise: '',
    linkedinGoals: [],
    targetAudience: '',
    professionalBrand: '',
    influencers: '',
    examplePosts: '',
    uniquePerspective: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const { data: session } = useSession();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session) return;

      try{
        console.log('fetching profile data...')
        const response = await fetch('/api/profile');
        console.log('api response status', response.status);


        if (response.ok) {
          const data = await response.json();
          console.log('profile data recieved', data);

          if (data.profile && Object.keys(data.profile).length > 0) {
          console.log('Setting form data with profile');
          setFormData(prev => ({
            ...prev,
            ...data.profile,
            linkedinGoals: Array.isArray(data.profile.linkedinGoals) ? 
              data.profile.linkedinGoals : []
          }));
        } else {
          console.log('No profile data found');
        }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [session]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle checkbox changes for multiple selections
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter(item => item !== value)
      });
    }
  };

      // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setMessage('');
      
      try {
        // Call the API to save profile data
        const response = await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to save profile');
        }
        
        setMessage('Profile updated successfully!');
      } catch (error) {
        setMessage('Error saving profile. Please try again.');
        console.error('Save error:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl md:text-4xl font-extrabold">My Profile</h1>
      <p className="text-base-content/80">Complete your profile to get personalised LinkedIn content suggestions</p>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Show success/error message if any */}
        {message && (
          <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
            {message}
          </div>
        )}
        
        {/* Professional Background Section */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Professional Background</h2>
            <p className="text-sm text-base-content/70">Tell us about your professional experience</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            <div className="form-control">
                <label className="label">
                  <span className="label-text">Type of Profile</span>
                </label>
                <select 
                  name="typeOfProfile" 
                  value={formData.typeOfProfile}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="" disabled>Select your profile</option>
                  <option value="personal">Personal</option>
                  <option value="company">Company</option>
                  
                </select>
              </div>



              <div className="form-control">
                <label className="label">
                  <span className="label-text">Industry</span>
                </label>
                <select 
                  name="industry" 
                  value={formData.industry}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="" disabled>Select your industry</option>
                  <option value="technology">Technology</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Current Role</span>
                </label>
                <input 
                  type="text" 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="e.g. Marketing Manager, Software Engineer"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Years of Experience</span>
                </label>
                <select 
                  name="experience" 
                  value={formData.experience}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="" disabled>Select experience range</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="11-15">11-15 years</option>
                  <option value="15+">15+ years</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Areas of Expertise (3-5 recommended)</span>
                </label>
                <input 
                  type="text" 
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="E.g. Digital Marketing, SEO, Content Strategy"
                />
                <label className="label">
                  <span className="label-text-alt">Enter areas separated by commas</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Strategy Section */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Content Strategy</h2>
            <p className="text-sm text-base-content/70">Define how you want to position yourself on LinkedIn</p>
            
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Primary LinkedIn Goals</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="linkedinGoals"
                    value="networking"
                    onChange={handleCheckboxChange}
                    className="checkbox" 
                  />
                  <span>Networking & Connections</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="linkedinGoals"
                    value="thoughtLeadership"
                    onChange={handleCheckboxChange}
                    className="checkbox" 
                  />
                  <span>Thought Leadership</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="linkedinGoals"
                    value="jobHunting"
                    onChange={handleCheckboxChange}
                    className="checkbox" 
                  />
                  <span>Job Hunting</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="linkedinGoals"
                    value="businessDevelopment"
                    onChange={handleCheckboxChange}
                    className="checkbox" 
                  />
                  <span>Business Development/Sales</span>
                </label>
              </div>
            </div>
            
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Target Audience</span>
              </label>
              <textarea 
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                className="textarea textarea-bordered h-20"
                placeholder="Describe who you want to reach with your content (e.g. Marketing professionals, Tech startup founders)"
              />
            </div>
            
            <div className="form-control mt-2">
              <label className="label">
                <span className="label-text">Professional Brand</span>
              </label>
              <textarea 
                name="professionalBrand"
                value={formData.professionalBrand}
                onChange={handleChange}
                className="textarea textarea-bordered h-20"
                placeholder="What do you want to be known for? What&apos;s your professional value proposition?"
              />
            </div>
          </div>
        </div>
        
        {/* Influences Section */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Influences & Examples</h2>
            <p className="text-sm text-base-content/70">Share content styles that inspire you</p>
            
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">LinkedIn Creators You Admire</span>
              </label>
              <textarea 
                name="influencers"
                value={formData.influencers}
                onChange={handleChange}
                className="textarea textarea-bordered h-20"
                placeholder="Which LinkedIn creators do you follow and admire? What do you like about their content?"
              />
            </div>
            
            <div className="form-control mt-2">
              <label className="label">
                <span className="label-text">Example Posts You Like</span>
              </label>
              <textarea 
                name="examplePosts"
                value={formData.examplePosts}
                onChange={handleChange}
                className="textarea textarea-bordered h-20"
                placeholder="Paste URLs or describe LinkedIn posts that resonated with you"
              />
            </div>
          </div>
        </div>
        
        {/* Unique Perspective Section */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Your Unique Perspective</h2>
            <p className="text-sm text-base-content/70">What makes your professional voice unique?</p>
            
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">What&apos;s Your Story?</span>
              </label>
              <textarea 
                name="uniquePerspective"
                value={formData.uniquePerspective}
                onChange={handleChange}
                className="textarea textarea-bordered h-32"
                placeholder="Share key experiences, challenges you&apos;ve overcome, or unique perspectives you bring to your field"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-8">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 
              <span className="loading loading-spinner loading-sm"></span> : 
              'Save Profile'
            }
          </button>
        </div>
      </form>
    </div>
  );
}

app/dashboard/profile/page.js
