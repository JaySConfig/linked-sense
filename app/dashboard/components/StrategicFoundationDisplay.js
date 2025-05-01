"use client";

// React & Next.js Hooks
import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

// components
import StrategicFoundationDisplay from '../components/StrategicFoundationDisplay'; // Adjust the path

// --- Main Page Component ---
export default function SavedStrategyPage() {
  const { status: sessionStatus } = useSession();

  // Basic state for foundation data
  const [foundationStrategy, setFoundationStrategy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRetry, setIsRetry] = useState(false); // To prevent infinite loop

  const fetchFoundationData = useCallback(async () => {
    if (sessionStatus === 'authenticated') {
      try {
        setIsLoading(true);
        const response = await fetch('/api/profile');
        if (!response.ok) throw new Error(`Failed to fetch profile (${response.status})`);
        const data = await response.json();

        if (data.profile?.linkedinStrategy?.foundation) {
          setFoundationStrategy(data.profile.linkedinStrategy.foundation);
        } else {
          setError('No foundation data found.');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    } else if (sessionStatus === 'loading') {
      setIsLoading(true);
    } else { // Unauthenticated
      setIsLoading(false);
      setError('Please log in to view your saved strategy.');
    }
  }, [sessionStatus]);

  const retryFoundation = () => {
    setIsRetry(true);
    setError(null);
  };

  // Initial Data Load
  useEffect(() => {
    if (!isRetry) {
      fetchFoundationData();
    }
  }, [sessionStatus, isRetry, fetchFoundationData]);

  // --- Main Render Logic ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-lg"></span>
      </div>
    );
  }

  if (error && !foundationStrategy) {
    return (
      <div className="p-4 md:p-8">
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error: {error}</span>
            {error === 'No foundation data found.' && (
              <Link href="/dashboard/strategy" className="btn btn-primary btn-sm ml-4">
                Generate Strategy
              </Link>
            )}
            <button className="btn btn-sm btn-outline ml-2" onClick={retryFoundation}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!foundationStrategy) {
    return (
      <div className="space-y-6 p-4 md:p-8 text-center max-w-md mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold">No Strategy Found</h1>
        <p className="text-base-content/80">You haven&apos;t generated and saved your LinkedIn strategy yet. Get started now!</p>
        <Link href="/dashboard/strategy" className="btn btn-primary mt-4">Generate Your Strategy</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-base-content">My Saved Strategy</h1>

      {/* Display the StrategicFoundationDisplay component */}
      <StrategicFoundationDisplay
        strategy={foundationStrategy}
        loading={isLoading}
        onRetry={retryFoundation}
      />
    </div>
  );
}