

// import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/libs/next-auth";
// import config from "@/config";
// import DashboardSidebar from "./components/DashboardSidebar";

// // This is a server-side component to ensure the user is logged in.
// // If not, it will redirect to the login page.
// // It's applied to all subpages of /dashboard in /app/dashboard/*** pages
// // You can also add custom static UI elements like a Navbar, Sidebar, Footer, etc..
// // See https://shipfa.st/docs/tutorials/private-page


import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";
import Link from "next/link";

export default async function LayoutPrivate({ children }) {
  const session = await getServerSession(authOptions);


  
  if (!session) {
    redirect(config.auth.loginUrl);
  }
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-100">
      {/* Sidebar with responsive classes */}
      <div className="w-full md:w-64 bg-base-200 p-4 md:min-h-screen">
        <div className="flex justify-between items-center p-2 mb-6">
          <Link href="/" className="text-xl font-bold">{config.appName}</Link>
          
          {/* Hamburger icon only visible on mobile as decoration (not functional) */}
          <div className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
        </div>
        
        <nav className="md:flex-1">
          <ul className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-1 overflow-x-auto md:overflow-visible">
            <li>
              <Link 
                href="/dashboard" 
                className="flex items-center p-3 rounded-lg hover:bg-base-300 whitespace-nowrap"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/generate" 
                className="flex items-center p-3 rounded-lg hover:bg-base-300 whitespace-nowrap"
              >
                Generate Content
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/profile" 
                className="flex items-center p-3 rounded-lg hover:bg-base-300 whitespace-nowrap"
              >
                My Profile
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* User info - hidden on mobile */}
        <div className="hidden md:block border-t border-base-300 pt-4 mt-6">
          <div className="flex items-center mb-4">
            {session.user.image ? (
              <img 
                src={session.user.image} 
                alt={session.user.name || "User"} 
                className="w-8 h-8 rounded-full mr-3"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content mr-3">
                {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-medium">{session.user.name}</p>
              <p className="text-xs opacity-70">{session.user.email}</p>
            </div>
          </div>
          
          <Link href="/api/auth/signout" className="btn btn-outline btn-sm w-full">
            Sign Out
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}


// import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/libs/next-auth";
// import config from "@/config";
// import Link from "next/link";

// // DEVELOPMENT ONLY: Auth bypass function
// // IMPORTANT: REMOVE BEFORE DEPLOYING TO PRODUCTION
// function bypassAuth() {
//   if (process.env.NODE_ENV === 'development') {
//     return {
//       user: {
//         id: 'dev-user-id',
//         name: 'Development User',
//         email: 'dev@example.com',
//         image: null
//       },
//       expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString()
//     };
//   }
//   return null;
// }

// export default async function LayoutPrivate({ children }) {
//   // Get real session or use development bypass
//   const session = await getServerSession(authOptions) || bypassAuth();

//   if (!session) {
//     redirect(config.auth.loginUrl);
//   }

//   // Add a visual indicator when using the bypass (dev only)
//   const isUsingBypass = process.env.NODE_ENV === 'development' && session.user.id === 'dev-user-id';

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-base-100">
//       {/* Dev mode indicator */}
//       {isUsingBypass && (
//         <div className="bg-warning text-warning-content text-center py-1 px-4 text-sm">
//           Development Mode - Using Auth Bypass
//         </div>
//       )}
      
//       {/* Sidebar with responsive classes */}
//       <div className="w-full md:w-64 bg-base-200 p-4 md:min-h-screen">
//         <div className="flex justify-between items-center p-2 mb-6">
//           <Link href="/" className="text-xl font-bold">{config.appName}</Link>
//           {/* Hamburger icon only visible on mobile as decoration (not functional) */}
//           <div className="md:hidden">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//             </svg>
//           </div>
//         </div>
//         <nav className="md:flex-1">
//           <ul className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-1 overflow-x-auto md:overflow-visible">
//             <li>
//               <Link
//                 href="/dashboard"
//                 className="flex items-center p-3 rounded-lg hover:bg-base-300 whitespace-nowrap"
//               >
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/dashboard/generate"
//                 className="flex items-center p-3 rounded-lg hover:bg-base-300 whitespace-nowrap"
//               >
//                 Generate Content
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/dashboard/profile"
//                 className="flex items-center p-3 rounded-lg hover:bg-base-300 whitespace-nowrap"
//               >
//                 My Profile
//               </Link>
//             </li>
//           </ul>
//         </nav>
//         {/* User info - hidden on mobile */}
//         <div className="hidden md:block border-t border-base-300 pt-4 mt-6">
//           <div className="flex items-center mb-4">
//             {session.user.image ? (
//               <img
//                 src={session.user.image}
//                 alt={session.user.name || "User"}
//                 className="w-8 h-8 rounded-full mr-3"
//               />
//             ) : (
//               <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content mr-3">
//                 {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
//               </div>
//             )}
//             <div>
//               <p className="font-medium">{session.user.name}</p>
//               <p className="text-xs opacity-70">{session.user.email}</p>
//             </div>
//           </div>
//           <Link href="/api/auth/signout" className="btn btn-outline btn-sm w-full">
//             Sign Out
//           </Link>
//         </div>
//       </div>
//       {/* Main content */}
//       <div className="flex-1 p-4 md:p-8">
//         {children}
//       </div>
//     </div>
//   );
// }