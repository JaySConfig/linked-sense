// pages/results.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Results() {
  const router = useRouter();
  const { id } = router.query;
  const [submission, setSubmission] = useState(null);
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
      
      setSubmission(JSON.parse(savedSubmission));
    } catch (err) {
      console.error('Error loading submission:', err);
      setError('Failed to load your submission. Please try again.');
    }
  }, [id]);

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

  if (!submission) {
    return <div>Loading your results...</div>;
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your LinkedIn Strategy</h1>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-green-800 mb-4">
            Strategy Created Successfully!
          </h2>
          <p>
            Thank you for completing the LinkedIn strategy questionnaire. 
            Here are your answers:
          </p>
        </div>
        
        <div className="space-y-8">
          {Object.entries(submission.answers).map(([questionId, answer]) => (
            <div key={questionId} className="bg-white border rounded-lg p-6">
              <h3 className="font-bold mb-2">{questionId}</h3>
              {Array.isArray(answer) ? (
                <ul className="list-disc pl-5">
                  {answer.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{answer}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <a href="/" className="px-4 py-2 bg-emerald-600 text-white rounded-md inline-block">
            Create New Strategy
          </a>
        </div>
      </div>
    </div>
  );
}