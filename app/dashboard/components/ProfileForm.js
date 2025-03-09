"use client";

import { useState } from 'react';
import { saveProfileData } from '../actions';

export default function ProfileForm({ initialData = {} }) {
  // State for the form data with initial values
  const [formData, setFormData] = useState({
    industry: initialData.industry || '',
    role: initialData.role || '',
    experience: initialData.experience || '',
    expertise: initialData.expertise || '',
    linkedinGoals: initialData.linkedinGoals || [],
    targetAudience: initialData.targetAudience || '',
    professionalBrand: initialData.professionalBrand || '',
    influencers: initialData.influencers || '',
    examplePosts: initialData.examplePosts || '',
    uniquePerspective: initialData.uniquePerspective || ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

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
      // Call the server action to save data
      const result = await saveProfileData(formData);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Error saving profile. Please try again.');
      console.error('Save error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form JSX remains mostly the same...
  return (
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
          
          {/* Rest of professional background fields... */}
        </div>
      </div>
      
      {/* Other form sections... */}
      
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
  );
}