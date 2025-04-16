// // // app/api/profile/save-strategy/route.js
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/libs/next-auth";
// import connectMongo from "@/libs/mongoose";
// import User from "@/models/User";

// export async function POST(req) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }

//   try {
//     const { submissionId, answers, foundation, calendar, contentCalendar } = await req.json();

//     console.log("Attempting MongoDB connection using URI:", process.env.MONGODB_URI);

//     await connectMongo();
    
//     const user = await User.findById(session.user.id);
    
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }
    
//     // Initialize the profile if it doesn't exist
//     if (!user.profile) {
//       user.profile = {};
//     }
    
//     // Set the linkedinStrategy data
//     user.profile.linkedinStrategy = {
//       submissionId,
//       answers,
//       foundation,
//       calendar,
//       contentCalendar,
//       savedAt: new Date(),
//       // Preserve any existing saved posts
//       savedPosts: user.profile.linkedinStrategy?.savedPosts || []
//     };
    
//     await user.save();
    
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Error saving strategy:', error);
//     return NextResponse.json({ error: "Failed to save strategy" }, { status: 500 });
//   }
// }

// app/api/profile/save-strategy/route.js (Temporary Test)

// app/api/profile/save-strategy/route.js
// app/api/profile/save-strategy/route.js

import { getDay, nextMonday, startOfDay } from 'date-fns';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

export async function POST(req) {
  // 1. Get Session (Now working correctly)
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) { // Added extra check for session.user.id
    // This case should ideally not happen if logged in, but good practice
    return NextResponse.json({ error: "Not authenticated or user ID missing" }, { status: 401 });
  }
  const userId = session.user.id; // Get the user ID

  try {
    // 2. Parse Request Body (Now working correctly)
    const { submissionId, answers, foundation, calendar, contentCalendar } = await req.json();

    // 3. Connect to Database
    await connectMongo();

    // 4. Find User by ID
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

     // --- Calculate the Start Date ---
     const now = startOfDay(new Date());
     const calculatedStartDate = getDay(now) === 1 ? now : nextMonday(now); // Next Monday (or today if Monday)
     console.log("Calculated startDate during save:", calculatedStartDate);
     // --- End Calculation ---

    // 5. Prepare and Update Profile Data
    // Initialize the profile object if it doesn't exist
     // Initialize profile/strategy if they don't exist
     if (!user.profile) user.profile = {};
     if (!user.profile.linkedinStrategy) user.profile.linkedinStrategy = {};
 

    // Set the linkedinStrategy data (overwriting previous strategy if exists)
    user.profile.linkedinStrategy = {
      submissionId,
      answers,
      foundation,
      calendar, // The raw markdown calendar
      contentCalendar, // The parsed calendar data object
      savedAt: new Date(),
      calendarStartDate: calculatedStartDate,
      // Preserve any saved posts that might have been added separately
      // If posts are only saved *within* a strategy save, this might always be empty initially
      savedPosts: user.profile.linkedinStrategy?.savedPosts || []
    };

    // 6. Save the updated user document
    await user.save();

    // Return success response
    return NextResponse.json({ success: true, message: "Strategy saved successfully!" });

  } catch (error) {
    console.error('Error saving strategy:', error); // Log the actual error
    return NextResponse.json({ error: "Failed to save strategy", details: error.message }, { status: 500 });
  }
}