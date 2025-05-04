// // 'use client'

// // import Link from 'next/link';
// // import { useState, useEffect } from 'react';
// // import useStrategyStatus from '@/app/hooks/useStrategyStatus';
// // import { userAgent } from 'next/server';
// // import { useSession } from 'next-auth/react';



// // export const dynamic = "force-dynamic";

// // // This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// // // It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// // // See https://shipfa.st/docs/tutorials/private-page
// // // app/dashboard/page.js


// // export default function Dashboard() {
// //   const { hasStrategy, isLoading, setStrategyStatus } = useStrategyStatus();
// //   const [checkingAPI, setCheckingAPI] = useState(true);
// //   const { data: session } = useSession();


// //   useEffect(() => {
// //     // Check if strategy exists via API
// //     const checkStrategyViaAPI = async () => {
// //       try {
// //         const response = await fetch('/api/profile');
// //         if (response.ok) {
// //           const data = await response.json();
// //           const hasLinkedInStrategy = !!data?.profile?.linkedinStrategy;
          
// //           // Update both the hook state and localStorage
// //           setStrategyStatus(hasLinkedInStrategy);
// //         }
// //       } catch (error) {
// //         console.error("Failed to check strategy via API:", error);
// //       } finally {
// //         setCheckingAPI(false);
// //       }
// //     };
    
// //     checkStrategyViaAPI();
// //   }, [setStrategyStatus]);

// //   // Show loading state while checking strategy status
// //   if (isLoading || checkingAPI) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <span className="loading loading-lg"></span>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-5xl mx-auto p-8">
// //       <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

// //       {hasStrategy ? (
// //         <div className="space-y-6">
        
// //           <p className="text-lg"> {session?.user?.name && <h1>Welcome back, {session.user.name} 👋</h1>}</p>
// //           <div className="flex flex-wrap gap-4">
// //             <Link href="/dashboard/strategy" className="btn btn-primary">
// //               View Strategy
// //             </Link>
// //             {/* <Link href="/dashboard/posts" className="btn btn-secondary">
// //               View Your Posts
// //             </Link> */}
// //             <Link href="/dashboard/calendar" className="btn btn-secondary">
// //               View Your Calendar
// //             </Link>
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="space-y-6">
// //           <p className="text-lg">🚀 You haven't generated a strategy yet.</p>
// //           <p className="text-base-content/70">
// //             Start by creating your strategy — everything else gets built from there!
// //           </p>
// //           <Link href="/dashboard/strategy" className="btn btn-primary">
// //             Generate My Strategy
// //           </Link>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// 'use client'

// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import useStrategyStatus from '@/app/hooks/useStrategyStatus';
// import { useSession } from 'next-auth/react';
// import CalendarPreview from './components/CalendarPreview';
// export const dynamic = "force-dynamic";

// // const CalendarPreview = () => {
// //   return (
// //     <div className="card bg-base-100 shadow-sm">
// //       <div className="card-body">
// //         <h2 className="card-title">Upcoming Content</h2>
// //         <p className="text-base-content/70">Loading your calendar preview...</p>
// //       </div>
// //     </div>
// //   );
// // };



// export default function Dashboard() {
//   const { hasStrategy, isLoading, setStrategyStatus } = useStrategyStatus();
//   const [checkingAPI, setCheckingAPI] = useState(true);
//   const { data: session } = useSession();

//   useEffect(() => {
//     // Check if strategy exists via API
//     const checkStrategyViaAPI = async () => {
//       try {
//         const response = await fetch('/api/profile');
//         if (response.ok) {
//           const data = await response.json();
//           const hasLinkedInStrategy = !!data?.profile?.linkedinStrategy;
          
//           // Update both the hook state and localStorage
//           setStrategyStatus(hasLinkedInStrategy);
//         }
//       } catch (error) {
//         console.error("Failed to check strategy via API:", error);
//       } finally {
//         setCheckingAPI(false);
//       }
//     };
    
//     checkStrategyViaAPI();
//   }, [setStrategyStatus]);

//   // Show loading state while checking strategy status
//   if (isLoading || checkingAPI) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

//       {hasStrategy ? (
//         <div className="space-y-8">
//           <div className="bg-base-100 p-6 rounded-lg shadow-sm">
//             <p className="text-xl font-semibold mb-2">
//               {session?.user?.name ? `Welcome back, ${session.user.name} 👋` : 'Welcome back 👋'}
//             </p>
//             <p className="text-base-content/70 mb-4">
//               Here&apos;s an overview of your upcoming content and strategy.
//             </p>
//             <div className="flex flex-wrap gap-4">
//               <Link href="/dashboard/strategy" className="btn btn-primary">
//                 View Strategy
//               </Link>
//               <Link href="/dashboard/calendar" className="btn btn-secondary">
//                 View Calendar
//               </Link>
//             </div>
//           </div>
          
//           {/* Calendar Preview Component */}
//           <CalendarPreview />
          
//           {/* Add strategy metrics or other useful information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="card bg-base-100 shadow-sm">
//               <div className="card-body">
//                 <h2 className="card-title">Content Strategy</h2>
//                 <p className="text-base-content/70">
//                   Manage your LinkedIn content strategy and adjust your content pillars.
//                 </p>
//                 <div className="card-actions justify-end">
//                   <Link href="/dashboard/strategy" className="btn btn-sm btn-primary">
//                     View Strategy
//                   </Link>
//                 </div>
//               </div>
//             </div>
            
//             {/* <div className="card bg-base-100 shadow-sm">
//               <div className="card-body">
//                 <h2 className="card-title">Need Help?</h2>
//                 <p className="text-base-content/70">
//                   Get tips on optimizing your LinkedIn content strategy or contact support.
//                 </p>
//                 <div className="card-actions justify-end">
//                   <Link href="/help" className="btn btn-sm btn-ghost">
//                     View Resources
//                   </Link>
//                 </div>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           <p className="text-lg">🚀 You haven&apos;t generated a strategy yet.</p>
//           <p className="text-base-content/70">
//             Start by creating your strategy — everything else gets built from there!
//           </p>
//           <Link href="/dashboard/strategy" className="btn btn-primary">
//             Generate My Strategy
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }
'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CalendarPreview from './components/CalendarPreview';
export const dynamic = "force-dynamic";

export default function Dashboard() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [hasStrategy, setHasStrategy] = useState(false);

  useEffect(() => {
    const checkForStrategy = async () => {
      try {
        const response = await fetch('/api/profile');
        
        if (!response.ok) {
          console.error("Profile API returned error:", response.status);
          setHasStrategy(false);
          return;
        }
        
        const data = await response.json();
        
        // Check for meaningful content in the linkedinStrategy
        // The issue is that linkedinStrategy exists but only has an empty savedCalendars array
        const hasValidStrategy = !!(
          data?.profile?.linkedinStrategy && 
          typeof data.profile.linkedinStrategy === 'object' &&
          (
            // Check for presence of specific strategy properties
            // Add whatever properties indicate a completed strategy in your app
            data.profile.linkedinStrategy.contentPillars ||
            data.profile.linkedinStrategy.audience ||
            data.profile.linkedinStrategy.persona ||
            data.profile.linkedinStrategy.contentStrategy ||
            
            // Or check any array properties to make sure they're not empty
            (data.profile.linkedinStrategy.savedCalendars && 
             data.profile.linkedinStrategy.savedCalendars.length > 0)
          )
        );
        
        console.log("Strategy validity check result:", hasValidStrategy);
        setHasStrategy(hasValidStrategy);
      } catch (error) {
        console.error("Failed to check strategy:", error);
        setHasStrategy(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkForStrategy();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-lg"></span>
      </div>
    );
  }

  // Show the create strategy UI if no strategy exists
  if (!hasStrategy) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="bg-base-100 p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Thinkd.In!</h2>
          <p className="text-lg mb-6">
            Your strategic LinkedIn content journey begins with creating a strategy.
          </p>
          <div className="flex justify-center">
            <Link href="/dashboard/strategy" className="btn btn-primary btn-lg">
              Create My Strategy
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Only render the full dashboard if a valid strategy exists
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="space-y-8">
        <div className="bg-base-100 p-6 rounded-lg shadow-sm">
          <p className="text-xl font-semibold mb-2">
            {session?.user?.name ? `Welcome back, ${session.user.name} 👋` : 'Welcome back 👋'}
          </p>
          <p className="text-base-content/70 mb-4">
            Here&apos;s an overview of your upcoming content and strategy.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/strategy" className="btn btn-primary">
              View Strategy
            </Link>
            <Link href="/dashboard/calendar" className="btn btn-secondary">
              View Calendar
            </Link>
          </div>
        </div>
        
        {/* Calendar Preview Component */}
        <CalendarPreview />
        
        {/* Add strategy metrics or other useful information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Content Strategy</h2>
              <p className="text-base-content/70">
                Manage your LinkedIn content strategy and adjust your content pillars.
              </p>
              <div className="card-actions justify-end">
                <Link href="/dashboard/strategy" className="btn btn-sm btn-primary">
                  View Strategy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}