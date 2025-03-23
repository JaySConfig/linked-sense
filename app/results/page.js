"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Results() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [submission, setSubmission] = useState(null);
  const [strategy, setStrategy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    try {
      // Get submission from localStorage
      const savedSubmission = localStorage.getItem(`submission_${id}`);
      
      if (!savedSubmission) {
        setError('Submission not found. It may have been deleted or expired.');
        return;
      }
      
      const parsedSubmission = JSON.parse(savedSubmission);
      setSubmission(parsedSubmission);
      
      // Generate strategy
      generateStrategy(parsedSubmission);
      
    } catch (err) {
      console.error('Error loading submission:', err);
      setError('Failed to load your submission. Please try again.');
    }
  }, [id]);

  const generateStrategy = async (submissionData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/generate-strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate strategy');
      }
      
      const data = await response.json();
      setStrategy(data.strategy);
      
    } catch (err) {
      console.error('Error generating strategy:', err);
      setError('Failed to generate your LinkedIn strategy. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p>{error}</p>
          <a href="/" className="px-4 py-2 bg-emerald-600 text-white rounded-md mt-4 inline-block">
            Start Over
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your LinkedIn Strategy</h1>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
            <p>Generating your personalized LinkedIn strategy...</p>
            <p className="text-sm text-gray-500 mt-2">This may take up to a minute</p>
          </div>
        ) : strategy ? (
          // Use this:
            <div className="prose prose-emerald max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {strategy}
            </ReactMarkdown>
            </div>
        ) : submission ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-green-800 mb-4">
              Loading Your Strategy...
            </h2>
            <p>
              We're preparing your personalized LinkedIn strategy based on your answers.
            </p>
          </div>
        ) : (
          <p>Loading your submission data...</p>
        )}
        
        <div className="mt-8">
          <a href="/test" className="px-4 py-2 bg-emerald-600 text-white rounded-md inline-block">
            Create New Strategy
          </a>
        </div>
      </div>
    </div>
  );
}