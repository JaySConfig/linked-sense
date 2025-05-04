
// app/api/profile/delete-calendar/route.js

// Make sure all imports are correctly specified// app/api/profile/delete-calendar/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    // console.log("DELETE CALENDAR API - Starting execution");
    
    // 1. Authentication
    const session = await getServerSession(authOptions);
    // console.log("Session obtained:", !!session);
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const userId = session.user.id;
    // console.log("User ID from session:", userId);

    // 2. Parse request body
    const body = await req.json();
    // console.log("Request body:", body);
    const { calendarIndex } = body;

    // 3. Validate input
    if (typeof calendarIndex !== 'number' || calendarIndex < 0 || !Number.isInteger(calendarIndex)) {
      // console.log("Invalid calendarIndex received:", calendarIndex);
      return NextResponse.json({ error: "Invalid calendar index provided." }, { status: 400 });
    }

    // 4. Connect to database
    // console.log("Connecting to MongoDB...");
    await connectMongo();
    // console.log("Connected to MongoDB");
    
    // 5. Fetch the user document
    // console.log("Fetching user document for ID:", userId);
    const user = await User.findById(userId);
    // console.log("User found:", !!user);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 6. Check user profile structure
    // console.log("User profile exists:", !!user.profile);
    // console.log("LinkedinStrategy exists:", !!user.profile?.linkedinStrategy);
    
    // Let's look at what fields actually exist in linkedinStrategy
    if (user.profile?.linkedinStrategy) {
      // console.log("Fields in linkedinStrategy:", Object.keys(user.profile.linkedinStrategy));
    }
    
    // 7. Check for savedCalendars array
    const hasSavedCalendars = !!user.profile?.linkedinStrategy?.savedCalendars;
    const isArray = Array.isArray(user.profile?.linkedinStrategy?.savedCalendars);
    // console.log("savedCalendars exists:", hasSavedCalendars);
    // console.log("savedCalendars is array:", isArray);
    
    // if (isArray) {
    //   // console.log("savedCalendars length:", user.profile.linkedinStrategy.savedCalendars.length);
    // }
    
    // If there's no savedCalendars array, let's try a direct MongoDB check
    if (!isArray) {
      // console.log("Checking raw MongoDB document for savedCalendars");
      const rawUser = await mongoose.connection.db.collection('users').findOne(
        { _id: new mongoose.Types.ObjectId(userId) }
      );
      
      // console.log("Raw MongoDB check:");
      // console.log("- savedCalendars exists:", !!rawUser?.profile?.linkedinStrategy?.savedCalendars);
      // console.log("- Is array:", Array.isArray(rawUser?.profile?.linkedinStrategy?.savedCalendars));
      
      if (Array.isArray(rawUser?.profile?.linkedinStrategy?.savedCalendars)) {
        // console.log("- Array length:", rawUser.profile.linkedinStrategy.savedCalendars.length);
        
        // Try a direct MongoDB update
        // console.log("Attempting direct MongoDB update");
        const savedCalendars = rawUser.profile.linkedinStrategy.savedCalendars;
        
        if (calendarIndex >= savedCalendars.length) {
          return NextResponse.json({ error: "Calendar index out of bounds (raw check)" }, { status: 400 });
        }
        
        savedCalendars.splice(calendarIndex, 1);
        
        const updateResult = await mongoose.connection.db.collection('users').updateOne(
          { _id: new mongoose.Types.ObjectId(userId) },
          { $set: { 'profile.linkedinStrategy.savedCalendars': savedCalendars } }
        );
        
        // console.log("Direct MongoDB update result:", updateResult);
        
        return NextResponse.json({
          success: true,
          message: "Calendar deleted successfully (direct MongoDB)",
          remainingCalendars: savedCalendars.length
        });
      }
      
      // Initialize if missing (both in Mongoose object and MongoDB)
      // console.log("savedCalendars not found - initializing empty array");
      
      if (!user.profile) user.profile = {};
      if (!user.profile.linkedinStrategy) user.profile.linkedinStrategy = {};
      user.profile.linkedinStrategy.savedCalendars = [];
      
      user.markModified('profile.linkedinStrategy');
      await user.save();
      
      return NextResponse.json({ 
        error: "No calendars found to delete", 
        details: "savedCalendars array was initialized but empty" 
      }, { status: 404 });
    }

    // 8. Handle the normal case where savedCalendars exists and is an array
    const savedCalendars = user.profile.linkedinStrategy.savedCalendars;
    
    if (calendarIndex >= savedCalendars.length) {
      return NextResponse.json({ 
        error: "Calendar index out of bounds", 
        details: `Index ${calendarIndex} exceeds array length ${savedCalendars.length}` 
      }, { status: 400 });
    }

    // 9. Remove the calendar
    // console.log(`Removing calendar at index ${calendarIndex}`);
    savedCalendars.splice(calendarIndex, 1);
    
    // 10. Mark as modified and save
    user.markModified('profile.linkedinStrategy.savedCalendars');
    // console.log("Saving updated user document...");
    await user.save();
    // console.log("User document saved successfully");
    
    // 11. Return success
    return NextResponse.json({
      success: true,
      message: "Calendar deleted successfully",
      remainingCalendars: savedCalendars.length
    });

  } catch (error) {
    console.error('Error deleting calendar:', error);
    return NextResponse.json({
      error: "Failed to delete calendar",
      details: error.message
    }, { status: 500 });
  }
}