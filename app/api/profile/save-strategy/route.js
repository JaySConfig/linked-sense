// // // // app/api/profile/save-strategy/route.js
// // import { NextResponse } from "next/server";
// // import { getServerSession } from "next-auth/next";
// // import { authOptions } from "@/libs/next-auth";
// // import connectMongo from "@/libs/mongoose";
// // import User from "@/models/User";

// // export async function POST(req) {
// //   const session = await getServerSession(authOptions);

// //   if (!session) {
// //     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
// //   }

// //   try {
// //     const { submissionId, answers, foundation, calendar, contentCalendar } = await req.json();

// //     console.log("Attempting MongoDB connection using URI:", process.env.MONGODB_URI);

// //     await connectMongo();
    
// //     const user = await User.findById(session.user.id);
    
// //     if (!user) {
// //       return NextResponse.json({ error: "User not found" }, { status: 404 });
// //     }
    
// //     // Initialize the profile if it doesn't exist
// //     if (!user.profile) {
// //       user.profile = {};
// //     }
    
// //     // Set the linkedinStrategy data
// //     user.profile.linkedinStrategy = {
// //       submissionId,
// //       answers,
// //       foundation,
// //       calendar,
// //       contentCalendar,
// //       savedAt: new Date(),
// //       // Preserve any existing saved posts
// //       savedPosts: user.profile.linkedinStrategy?.savedPosts || []
// //     };
    
// //     await user.save();
    
// //     return NextResponse.json({ success: true });
// //   } catch (error) {
// //     console.error('Error saving strategy:', error);
// //     return NextResponse.json({ error: "Failed to save strategy" }, { status: 500 });
// //   }
// // }

// // app/api/profile/save-strategy/route.js (Temporary Test)

// // app/api/profile/save-strategy/route.js
// // app/api/profile/save-strategy/route.js

// // import { getDay, nextMonday, startOfDay } from 'date-fns';
// // import { NextResponse } from "next/server";
// // import { getServerSession } from "next-auth/next";
// // import { authOptions } from "@/libs/next-auth";
// // import connectMongo from "@/libs/mongoose";
// // import User from "@/models/User";

// // export async function POST(req) {
// //   // 1. Get Session (Now working correctly)
// //   const session = await getServerSession(authOptions);

// //   if (!session || !session.user?.id) { // Added extra check for session.user.id
// //     // This case should ideally not happen if logged in, but good practice
// //     return NextResponse.json({ error: "Not authenticated or user ID missing" }, { status: 401 });
// //   }
// //   const userId = session.user.id; // Get the user ID

// //   try {
// //     // 2. Parse Request Body (Now working correctly)
// //     const { submissionId, answers, foundation, calendar, contentCalendar } = await req.json();

// //     // 3. Connect to Database
// //     await connectMongo();

// //     // 4. Find User by ID
// //     const user = await User.findById(userId);

// //     if (!user) {
// //       return NextResponse.json({ error: "User not found" }, { status: 404 });
// //     }

// //      // --- Calculate the Start Date ---
// //      const now = startOfDay(new Date());
// //      const calculatedStartDate = getDay(now) === 1 ? now : nextMonday(now); // Next Monday (or today if Monday)
// //      console.log("Calculated startDate during save:", calculatedStartDate);
// //      // --- End Calculation ---

// //     // 5. Prepare and Update Profile Data
// //     // Initialize the profile object if it doesn't exist
// //      // Initialize profile/strategy if they don't exist
// //      if (!user.profile) user.profile = {};
// //      if (!user.profile.linkedinStrategy) user.profile.linkedinStrategy = {};
 

// //     // Set the linkedinStrategy data (overwriting previous strategy if exists)
// //     user.profile.linkedinStrategy = {
// //       submissionId,
// //       answers,
// //       foundation,
// //       calendar, // The raw markdown calendar
// //       contentCalendar, // The parsed calendar data object
// //       savedAt: new Date(),
// //       calendarStartDate: calculatedStartDate,
// //       // Preserve any saved posts that might have been added separately
// //       // If posts are only saved *within* a strategy save, this might always be empty initially
// //       savedPosts: user.profile.linkedinStrategy?.savedPosts || []
// //     };

// //     // 6. Save the updated user document
// //     await user.save();

// //     // Return success response
// //     return NextResponse.json({ success: true, message: "Strategy saved successfully!" });

// //   } catch (error) {
// //     console.error('Error saving strategy:', error); // Log the actual error
// //     return NextResponse.json({ error: "Failed to save strategy", details: error.message }, { status: 500 });
// //   }
// // }


// //// updated gemini for multiple calendars .......... 

// // app/api/profile/save-strategy/route.js (Updated for multiple calendars)

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/libs/next-auth";
// import connectMongo from "@/libs/mongoose";
// import User from "@/models/User";
// import { addDays, getDay, startOfDay, isBefore, isEqual, parseISO, nextMonday, isAfter } from 'date-fns'; // Import necessary date-fns
// import mongoose from "mongoose";


// // Helper function to add weekdays (same as used in frontend)
// const addWeekdays = (date, daysToAdd) => {
//     if (!date || !(date instanceof Date) || isNaN(date)) return null;
//     let currentDate = new Date(date.getTime()); // Clone date
//     let addedDays = 0;
//     while (addedDays < daysToAdd) {
//       currentDate = addDays(currentDate, 1);
//       const dayOfWeek = getDay(currentDate); // 0=Sun, 6=Sat
//       if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//         addedDays++;
//       }
//     }
//     return currentDate;
// };

// export async function POST(req) {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user?.id) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }
//   const userId = session.user.id;

//   // try {
//   //   // Data received from results page (includes newly generated calendar)
//   //   const { submissionId, answers, foundation, calendar, contentCalendar } = await req.json();

//   //   // Validate essential data
//   //   if (!foundation || !calendar || !contentCalendar || !contentCalendar.rows || contentCalendar.rows.length === 0) {
//   //       return NextResponse.json({ error: "Incomplete strategy data received." }, { status: 400 });
//   //   }

//   //   await connectMongo();

//   //    // --- ADD CONNECTION LOGS ---
//   //    console.log("--- DB Connection Check ---");
//   //    console.log("DB Connection State (1=connected):", mongoose.connection.readyState);
//   //    console.log("DB Name:", mongoose.connection.db.databaseName);
//   //    console.log("DB Host:", mongoose.connection.host);
//   //    console.log("--------------------------");
//   //    // --- END CONNECTION LOGS ---

     
//   //   const user = await User.findById(userId);
//   //   if (!user) {
//   //     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   //   }

//   //   // Initialize profile/strategy objects if they don't exist
//   //   if (!user.profile) user.profile = {};
//   //   if (!user.profile.linkedinStrategy) user.profile.linkedinStrategy = {};
//   //   // Ensure savedCalendars array exists
//   //   if (!user.profile.linkedinStrategy.savedCalendars) {
//   //       user.profile.linkedinStrategy.savedCalendars = [];
//   //   }

//   //   const savedCalendars = user.profile.linkedinStrategy.savedCalendars;

//   //   // --- Limit Check ---
//   //   const CALENDAR_LIMIT = 3;
//   //   if (savedCalendars.length >= CALENDAR_LIMIT) {
//   //     return NextResponse.json({ error: `Calendar limit (${CALENDAR_LIMIT}) reached.` }, { status: 400 });
//   //   }

//   //   // --- Determine Start Date for the new calendar ---
//   //   let newStartDate;
//   //   if (savedCalendars.length === 0) {
//   //     // First calendar: Start next Monday
//   //     const now = startOfDay(new Date());
//   //     newStartDate = getDay(now) === 1 ? now : nextMonday(now);
//   //     console.log("Calculating startDate for first calendar:", newStartDate);
//   //   } else {
//   //     // Subsequent calendars: Start next weekday after the latest end date
//   //     // Sort existing calendars by end date to find the latest one
//   //     savedCalendars.sort((a, b) => b.endDate.getTime() - a.endDate.getTime());
//   //     const latestEndDate = savedCalendars[0].endDate;
//   //     newStartDate = addWeekdays(latestEndDate, 1); // Calculate next weekday after last end date
//   //     console.log("Calculating sequential startDate based on latest endDate:", latestEndDate, "-> New start:", newStartDate);
//   //   }

//   //   // --- Calculate End Date (assuming 20 posts = 19 weekdays after start) ---
//   //   // Adjust '19' if your calendar length is different (e.g., 8 posts = 7 weekdays)
//   //   let numberOfWeekdaysInPlan = (contentCalendar.rows?.length || 0) -1; // Assuming rows includes the data
//   //   if(numberOfWeekdaysInPlan < 0 ) numberOfWeekdaysInPlan = 19; // Default if rows missing
//   //   const newEndDate = addWeekdays(newStartDate, numberOfWeekdaysInPlan);
//   //   console.log(`Calculated endDate (${numberOfWeekdaysInPlan} weekdays after start):`, newEndDate);

//   //   if (!newStartDate || !newEndDate) {
//   //       throw new Error("Failed to calculate valid start or end date.");
//   //   }

//   //   // --- Overlap Check (Optional but recommended) ---
//   //   for (const existingCal of savedCalendars) {
//   //       const existingStart = existingCal.startDate;
//   //       const existingEnd = existingCal.endDate;
//   //       // Check if new range [start, end] overlaps with existing [start, end]
//   //       // Overlap = !(newEnd < existingStart || newStart > existingEnd)
//   //       if (!(isBefore(newEndDate, existingStart) || isAfter(newStartDate, existingEnd))) {
//   //           console.log("Overlap detected with existing calendar:", existingCal);
//   //           return NextResponse.json({ error: "New calendar date range overlaps with an existing saved calendar." }, { status: 400 });
//   //       }
//   //   }
//   //   console.log("No date overlap detected.");


//   //   // --- Prepare the new calendar entry ---
//   //   const newCalendarEntry = {
//   //       calendar: calendar, // Raw markdown
//   //       contentCalendar: contentCalendar, // Parsed object
//   //       startDate: newStartDate,
//   //       endDate: newEndDate,
//   //       savedAt: new Date()
//   //   };

//   //   // --- Update the User Document ---
//   //   // Update foundation/answers (if they should be overwritten each time)
//   //   user.profile.linkedinStrategy.foundation = foundation;
//   //   user.profile.linkedinStrategy.answers = answers;
//   //   user.profile.linkedinStrategy.submissionId = submissionId; // Update submission ID if needed
//   //   user.profile.linkedinStrategy.savedAt = new Date(); // Update overall save time

//   //   // Add the new calendar to the array
//   //   user.profile.linkedinStrategy.savedCalendars.push(newCalendarEntry);
//   //   user.profile.linkedinStrategy.savedAt = new Date(); // Update overall strategy save time

//   //   user.markModified('profile.linkedinStrategy.savedCalendars');



//   //   // Save the user

//   //   console.log(`Attempting user.save() with ${updatedCalendars.length} total calendars in array...`);

//   //   // --- Add Logs Around Save ---
//   //   console.log("Attempting user.save()...");
//   //   const savedUser = await user.save(); // Save the user document
//   //   console.log("--- user.save() completed ---");

    
//   //   // Log the relevant part of the document *returned* by the save() command
//   //   // Check if savedCalendars exists on the *result* of the save
//   //   console.log(
//   //       "Saved user profile.linkedinStrategy snapshot:"
//   //       // JSON.stringify(savedUser?.profile?.linkedinStrategy, null, 2)
//   //   );
//   //   // --- End Logs Around Save ---


//   //   return NextResponse.json({ success: true, message: "Strategy updated and new calendar period saved!" });

//   // } catch (error) {
//   //   console.error('Error saving strategy/calendar:', error);
//   //   return NextResponse.json({ error: "Failed to save strategy", details: error.message }, { status: 500 });
//   // }

//   try {
//     // Data received from results page (includes newly generated calendar)
//     const { submissionId, answers, foundation, calendar, contentCalendar } = await req.json();

//     // Validate essential data
//     if (!foundation || !calendar || !contentCalendar || !contentCalendar.rows || contentCalendar.rows.length === 0) {
//         return NextResponse.json({ error: "Incomplete strategy data received." }, { status: 400 });
//     }

//     // --- DB Connection Check ---
//     await connectMongo();
//     console.log("--- DB Connection Check ---");
//     console.log("DB Connection State (1=connected):", mongoose.connection.readyState);
//     console.log("DB Name:", mongoose.connection.db.databaseName);
//     console.log("DB Host:", mongoose.connection.host);
//     console.log("--------------------------");
//     // --- END DB Connection Check ---


//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Initialize profile/strategy objects if they don't exist
//     if (!user.profile) user.profile = {};
//     if (!user.profile.linkedinStrategy) user.profile.linkedinStrategy = {};
//     // Ensure savedCalendars array exists
//     if (!Array.isArray(user.profile.linkedinStrategy.savedCalendars)) { // Check if it's an array
//         user.profile.linkedinStrategy.savedCalendars = [];
//     }

//     const savedCalendars = user.profile.linkedinStrategy.savedCalendars;

//     // --- Limit Check ---
//     const CALENDAR_LIMIT = 3;
//     if (savedCalendars.length >= CALENDAR_LIMIT) {
//       console.log(`Calendar limit (${CALENDAR_LIMIT}) reached. Aborting save.`); // Log limit reached
//       return NextResponse.json({ error: `Calendar limit (${CALENDAR_LIMIT}) reached.` }, { status: 400 });
//     }

//     // --- Determine Start Date for the new calendar ---
//     let newStartDate;
//     if (savedCalendars.length === 0) {
//       const now = startOfDay(new Date());
//       // Use helper correctly: check if today is Monday (1), if so use today, else find next Monday
//       newStartDate = getDay(now) === 1 ? now : nextMonday(now);
//       console.log("Calculating startDate for first calendar:", newStartDate);
//     } else {
//       // Sort to find the latest end date reliably
//       savedCalendars.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
//       const latestEndDate = savedCalendars[0].endDate;
//       // Ensure latestEndDate is a valid Date object before using addWeekdays
//        if (!latestEndDate || !(latestEndDate instanceof Date) || isNaN(latestEndDate)) {
//          throw new Error("Could not determine a valid end date from previously saved calendars.");
//        }
//       newStartDate = addWeekdays(latestEndDate, 1);
//       console.log("Calculating sequential startDate based on latest endDate:", latestEndDate, "-> New start:", newStartDate);
//     }

//     // --- Calculate End Date ---
//     let numberOfWeekdaysInPlan = (contentCalendar?.rows?.length || 20) - 1;
//     if (numberOfWeekdaysInPlan < 0) {
//         console.warn(`Calculated numberOfWeekdaysInPlan was negative, defaulting to 19.`);
//         numberOfWeekdaysInPlan = 19;
//     }
//     const newEndDate = addWeekdays(newStartDate, numberOfWeekdaysInPlan);
//     console.log(`Calculated endDate (${numberOfWeekdaysInPlan} weekdays after start):`, newEndDate);

//     if (!newStartDate || !newEndDate) {
//         throw new Error("Failed to calculate valid start or end date.");
//     }

//     // --- Overlap Check (Optional but recommended) ---
//     for (const existingCal of savedCalendars) {
//         // Ensure existing dates are valid Date objects
//          const existingStart = existingCal.startDate instanceof Date ? existingCal.startDate : new Date(existingCal.startDate);
//          const existingEnd = existingCal.endDate instanceof Date ? existingCal.endDate : new Date(existingCal.endDate);
//          if (isNaN(existingStart) || isNaN(existingEnd)) continue; // Skip check if existing dates are invalid

//         // Check if new range [start, end] overlaps with existing [start, end]
//         if (!(isBefore(newEndDate, existingStart) || isAfter(newStartDate, existingEnd))) {
//             console.log("Overlap detected with existing calendar:", existingCal);
//             return NextResponse.json({ error: "New calendar date range overlaps with an existing saved calendar." }, { status: 400 });
//         }
//     }
//     console.log("No date overlap detected.");


//     // --- Prepare the new calendar entry ---
//     const newCalendarEntry = {
//         calendar: calendar, // Raw markdown
//         contentCalendar: contentCalendar, // Parsed object
//         startDate: newStartDate,
//         endDate: newEndDate,
//         savedAt: new Date()
//     };

//     // --- Update the User Document (Using New Array Method) ---
//     const currentCalendars = user.profile.linkedinStrategy.savedCalendars; // Already ensured it's an array
//     // Create the updated array
//     const updatedCalendars = [...currentCalendars, newCalendarEntry]; // <-- DEFINED HERE

//     // Assign the new array back to the strategy object
//     user.profile.linkedinStrategy.savedCalendars = updatedCalendars; // Assign new array
//     // Update foundation/answers/etc. if they should be overwritten
//     user.profile.linkedinStrategy.foundation = foundation;
//     user.profile.linkedinStrategy.answers = answers;
//     user.profile.linkedinStrategy.submissionId = submissionId;
//     user.profile.linkedinStrategy.savedAt = new Date(); // Update overall save time

//     // Explicitly mark the path as modified (can be helpful)
//     user.markModified('profile.linkedinStrategy.savedCalendars');

//     // --- Logging BEFORE save ---
//     console.log(`Attempting user.save() with ${updatedCalendars.length} total calendars in array...`); // <-- USED HERE

//     const savedUser = await user.save(); // Save the user document
//     console.log("--- user.save() completed ---");


//     // --- ADD RE-FETCH AND LOG ---
//     console.log("--- Re-fetching user immediately after save ---");
//     // Use .lean() to get a plain JS object, potentially bypassing some Mongoose caching
//     const userAfterSave = await User.findById(userId).lean();
//     console.log("User data IMMEDIATELY after save (re-fetched):");
//     console.log(JSON.stringify(userAfterSave?.profile?.linkedinStrategy, null, 2));
//     console.log("------------------------------------------------");
//     // --- END RE-FETCH ---


//     // // Log snapshot AFTER save
//     // console.log(
//     //     "Saved user profile.linkedinStrategy snapshot:",
//     //     // JSON.stringify(savedUser?.profile?.linkedinStrategy, null, 2)
//     // );

//     // Return success, potentially including the count
//     return NextResponse.json({
//         success: true,
//         message: `Strategy updated! Total calendars now saved: ${updatedCalendars.length}` // <-- USED HERE
//     });

//   } catch (error) {
//     // Log error caught in this try block
//     console.error('Error saving strategy/calendar:', error); // Log the actual error object
//     return NextResponse.json({
//         error: "Failed to save strategy",
//         details: error.message // Pass error message back
//     }, { status: 500 });
//   }
// }


//// ----- claude version  ------ ////


import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { addDays, getDay, startOfDay, isBefore, isAfter, parseISO, nextMonday } from 'date-fns'; // Add missing isAfter import
import mongoose from "mongoose";

// Helper function to add weekdays (same as used in frontend)
const addWeekdays = (date, daysToAdd) => {
    if (!date || !(date instanceof Date) || isNaN(date)) return null;
    let currentDate = new Date(date.getTime()); // Clone date
    let addedDays = 0;
    while (addedDays < daysToAdd) {
      currentDate = addDays(currentDate, 1);
      const dayOfWeek = getDay(currentDate); // 0=Sun, 6=Sat
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        addedDays++;
      }
    }
    return currentDate;
};

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const { submissionId, answers, foundation, calendar, contentCalendar } = await req.json();
    if (!foundation || !calendar || !contentCalendar) {
      return NextResponse.json({ error: "Incomplete data" }, { status: 400 });
    }

    await connectMongo();
    
    // Get current user for date calculations
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    // Log the exact structure of the profile
    // console.log("Current profile structure:", JSON.stringify(currentUser.profile, null, 2));
    
    // Calculate dates as before
    let newStartDate;
    const now = startOfDay(new Date());
    newStartDate = getDay(now) === 1 ? now : nextMonday(now);
    console.log("Using start date:", newStartDate);
    
    const numberOfWeekdaysInPlan = 7;
    const newEndDate = addWeekdays(newStartDate, numberOfWeekdaysInPlan);
    console.log("Using end date:", newEndDate);
    
    // Create a new document from scratch with atomic update operations
    const updateResult = await mongoose.connection.db.collection('users').updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      {
        $set: {
          'profile.linkedinStrategy.foundation': foundation,
          'profile.linkedinStrategy.answers': answers,
          'profile.linkedinStrategy.submissionId': submissionId,
          'profile.linkedinStrategy.savedAt': new Date()
        },
        $push: {
          'profile.linkedinStrategy.savedCalendars': {
            calendar: calendar,
            contentCalendar: contentCalendar,
            startDate: newStartDate,
            endDate: newEndDate,
            savedAt: new Date()
          }
        }
      },
      { upsert: false }
    );
    
    console.log("Direct MongoDB update result:", updateResult);
    
    // Verify directly from MongoDB
    const updatedDoc = await mongoose.connection.db.collection('users').findOne(
      { _id: new mongoose.Types.ObjectId(userId) }
    );
    
    console.log("Raw document after update:", JSON.stringify({
      hasCalendarsArray: Array.isArray(updatedDoc?.profile?.linkedinStrategy?.savedCalendars),
      calendarsCount: updatedDoc?.profile?.linkedinStrategy?.savedCalendars?.length || 0
    }));
    
    return NextResponse.json({
      success: true,
      message: "Strategy updated!"
    });
    
  } catch (error) {
    console.error('Error saving strategy/calendar:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}