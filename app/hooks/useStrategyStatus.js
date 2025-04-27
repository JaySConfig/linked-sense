"use client";
import { useState, useEffect } from 'react';

export default function useStrategyStatus() {
  const [hasStrategy, setHasStrategy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial check when component mounts
    checkStrategy();
    
    // Set up event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', checkStrategy);
      return () => window.removeEventListener('storage', checkStrategy);
    }
  }, []);

  const checkStrategy = () => {
    if (typeof window !== 'undefined') {
      // Get value from localStorage, with proper null handling
      const savedValue = localStorage.getItem('hasStrategy');
      console.log("Reading hasStrategy from localStorage:", savedValue);
      
      // Explicitly check for 'true' string since localStorage stores strings
      const savedStatus = savedValue === 'true';
      setHasStrategy(savedStatus);
    }
    setIsLoading(false);
  };

  const setStrategyStatus = (status) => {
    if (typeof window !== 'undefined') {
      console.log("Setting hasStrategy in localStorage to:", status);
      setHasStrategy(status);
      localStorage.setItem('hasStrategy', status ? 'true' : 'false');

      // This custom event dispatch doesn't work across different components
      // Unless they share the same window, which they might not in Next.js
      // Let's use a more reliable method by directly updating localStorage
      window.dispatchEvent(new Event('storage'));
    }
  };

  return { hasStrategy, isLoading, setStrategyStatus };
}