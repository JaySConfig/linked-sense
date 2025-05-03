// dashboard/strategy/page.js

'use client'
import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import MarkdownContent from '@/components/MarkdownContent';

import OnboardingFlow from '@/components/OnboardingFlow';

const StrategyPage = () => {
    // Change to remove unused session variable
    const { status: sessionStatus } = useSession();
    const [strategyData, setStrategyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false); // New state

    // Wrap fetchStrategyData in useCallback
    const fetchStrategyData = useCallback(async () => {
        if (sessionStatus === 'authenticated') {
            try {
                setIsLoading(true);
                const response = await fetch('/api/profile');
                if (!response.ok) {
                    throw new Error(`Failed to fetch profile (${response.status})`);
                }
                const data = await response.json();
                if (data.profile?.linkedinStrategy) {
                    setStrategyData(data.profile.linkedinStrategy);
                } else {
                    setStrategyData(null);
                }
            } catch (err) {
                console.error('Error fetching strategy:', err);
                setError(err.message || 'Failed to load strategy.');
                setStrategyData(null);
            } finally {
                setIsLoading(false);
                setInitialLoadComplete(true); // Set to true after initial fetch
            }
        } else if (sessionStatus === 'loading') {
            setIsLoading(true);
        } else {
            setIsLoading(false);
            setError('Please log in to view or create your strategy.');
            setInitialLoadComplete(true); // Also set to true if not authenticated
        }
    }, [sessionStatus]);

    // Add fetchStrategyData as a dependency
    useEffect(() => {
        fetchStrategyData();
    }, [sessionStatus, fetchStrategyData]);

    const handleStartNewStrategy = () => {
        setShowConfirmation(true);
    };

    const handleConfirmNewStrategy = () => {
        setStrategyData(null);
        setShowConfirmation(false);
    };

    const handleCancelNewStrategy = () => {
        setShowConfirmation(false);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-lg"></span>
        </div>;
    }

    if (error) {
        return <div className="p-4 text-center text-error">
            {error}
        </div>;
    }

    return (
        <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
            {initialLoadComplete && strategyData ? ( // Check initialLoadComplete
                <>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-base-content">
                        My LinkedIn Strategy
                    </h1>

                    {/* Strategy Foundation */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Strategy Foundation</h2>

                            {/* commented out for error testing */}
                            <MarkdownContent content={strategyData.foundation} />
                            <button className='btn btn-primary' onClick={handleStartNewStrategy}>Create a New Strategy</button>
                        </div>
                    </div>

                    {/* Content Calendar (basic display) */}
                    
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title mb-4">View Content Calendars</h2>
                                <button className='btn btn-secondary'><Link href='/dashboard/calendar'>View Calendars</Link></button>
                                {/* More detailed calendar display here */}
                            </div>
                        </div>
                       

                    {/* Confirmation Modal/Dialog */}
                    {showConfirmation && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">Start New Strategy?</h2>
                                    <p>
                                        Are you sure you want to create a new strategy? This will <span className="font-bold text-red-500">overwrite</span> your existing strategy and all associated data.
                                    </p>
                                    <div className="card-actions justify-end mt-4">
                                        <button className="btn btn-secondary" onClick={handleCancelNewStrategy}>Cancel</button>
                                        <button className="btn btn-primary" onClick={handleConfirmNewStrategy}>Yes, Start New</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                initialLoadComplete && // Check initialLoadComplete
                <div className="space-y-6">
                    <h1 className="text-2xl font-bold">Get Started With Your Strategy</h1>
                    <p className="text-base-content/80">
                        It looks like you haven&apos;t created your LinkedIn strategy yet. Let&apos;s get started!
                    </p>
                    <OnboardingFlow />
                </div>
            )}
        </div>
    );
};

export default StrategyPage;