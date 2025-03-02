// app/dashboard/layout.js
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default async function LayoutPrivate({ children }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect(config.auth.loginUrl);
  }
  
  return (
    <div className="flex min-h-screen bg-base-100">
      {/* Enhanced inline sidebar */}
      <div className="w-64 bg-base-200 p-4 flex flex-col min-h-screen">
        <div className="p-2 mb-6">
          <Link href="/" className="text-xl font-bold">{config.appName}</Link>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-1">
            <li>
              <Link 
                href="/dashboard" 
                className="flex items-center p-3 rounded-lg hover:bg-base-300"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/generate" 
                className="flex items-center p-3 rounded-lg hover:bg-base-300"
              >
                Generate Content
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/profile" 
                className="flex items-center p-3 rounded-lg hover:bg-base-300"
              >
                My Profile
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Simple user info section */}
        <div className="border-t border-base-300 pt-4 mt-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content mr-3">
              {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{session.user.name}</p>
              <p className="text-xs opacity-70">{session.user.email}</p>
            </div>
          </div>
          
          <form action={async () => {
            'use server';
            await signOut({ callbackUrl: "/" });
          }}>
            <button className="btn btn-outline btn-sm w-full">Sign Out</button>
          </form>
        </div>
      </div>
      
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}