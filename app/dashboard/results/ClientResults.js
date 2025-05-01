// app/dashboard/results/ClientResults.js
"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ResultsContentClient from './ResultsContentClient';

export default function ClientResults() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we're in the client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-lg"></span></div>;
  }
  
  if (!id) {
    return <div className="p-8 text-center text-error">Invalid request: Missing submission ID.</div>; 
  }
  
  return <ResultsContentClient submissionId={id} />;
}