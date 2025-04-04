// app/api/profile/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth"; // This should match where your auth config is
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

// export async function GET(req) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }

//   try {
//     await connectMongo();
//     const user = await User.findById(session.user.id);
    
//     return NextResponse.json({ profile: user?.profile || {} });
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
//   }
// }

// app/api/profile/route.js
export async function GET(req) {
    try {
      // Log the session to debug
      const session = await getServerSession(authOptions);
      console.log("Session:", session);
      
      if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
  
      await connectMongo();
      console.log("Connected to MongoDB");
      
      // Log the user ID being queried
      console.log("Looking for user ID:", session.user.id);
      
      const user = await User.findById(session.user.id);
      console.log("User found:", user ? "Yes" : "No");
      
      return NextResponse.json({ profile: user?.profile || {} });
    } catch (error) {
      // Detailed error logging
      console.error('Error in GET /api/profile:', error);
      return NextResponse.json({ 
        error: "Failed to fetch profile",
        details: error.message 
      }, { status: 500 });
    }
  }

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const profileData = await req.json();
    await connectMongo();
    
    // Update user with profile data
    await User.findByIdAndUpdate(
      session.user.id,
      { $set: { profile: profileData } }, // Using $set to update only the profile field
      { new: true }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving profile:', error);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}