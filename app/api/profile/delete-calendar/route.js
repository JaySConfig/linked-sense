// // // // app/api/profile/delete-calendar/route.js
// // // import { NextResponse } from "next/server";
// // // import { getServerSession } from "next-auth/next";
// // // import { authOptions } from "@/libs/next-auth";
// // // import connectMongo from "@/libs/mongoose";
// // // import User from "@/models/User";

// // // // export async function POST(req) {
// // // //   const session = await getServerSession(authOptions);
// // // //   if (!session || !session.user?.id) {
// // // //     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
// // // //   }
// // // //   const userId = session.user.id;

// // // //   try {
// // // //     // Parse request body
// // // //     const { calendarIndex } = await req.json();
    
// // // //     // Validate calendarIndex
// // // //     if (calendarIndex === undefined || calendarIndex < 0) {
// // // //       return NextResponse.json({ error: "Invalid calendar index" }, { status: 400 });
// // // //     }

// // // //     await connectMongo();
    
// // // //     const user = await User.findById(userId);
// // // //     if (!user) {
// // // //       return NextResponse.json({ error: "User not found" }, { status: 404 });
// // // //     }

// // // //     // Check if strategy data and calendars array exist
// // // //     if (!user.profile?.linkedinStrategy?.savedCalendars || 
// // // //         !Array.isArray(user.profile.linkedinStrategy.savedCalendars) ||
// // // //         calendarIndex >= user.profile.linkedinStrategy.savedCalendars.length) {
// // // //       return NextResponse.json({ error: "Calendar not found" }, { status: 404 });
// // // //     }

// // // //     // Remove the calendar at the specified index
// // // //     user.profile.linkedinStrategy.savedCalendars.splice(calendarIndex, 1);
    
// // // //     // Mark as modified and save
// // // //     user.markModified('profile.linkedinStrategy.savedCalendars');
// // // //     await user.save();
    
// // // //     return NextResponse.json({ 
// // // //       success: true, 
// // // //       message: "Calendar deleted successfully", 
// // // //       remainingCalendars: user.profile.linkedinStrategy.savedCalendars.length 
// // // //     });

// // // //   } catch (error) {
// // // //     console.error('Error deleting calendar:', error);
// // // //     return NextResponse.json({
// // // //       error: "Failed to delete calendar",
// // // //       details: error.message
// // // //     }, { status: 500 });
// // // //   }
// // // // }
// // // export async function POST(req) {
// // //     const session = await getServerSession(authOptions);
// // //     if (!session || !session.user?.id) {
// // //       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
// // //     }
// // //     const userId = session.user.id;
  
// // //     try {
// // //       // Parse request body
// // //       const { calendarIndex } = await req.json();
      
// // //       // Validate calendarIndex
// // //       if (calendarIndex === undefined || calendarIndex < 0) {
// // //         return NextResponse.json({ error: "Invalid calendar index" }, { status: 400 });
// // //       }
  
// // //       console.log("Connecting to MongoDB");
// // //       await connectMongo();
// // //       console.log("MongoDB connected");
      
// // //       return NextResponse.json({ 
// // //         success: true, 
// // //         message: "MongoDB connected successfully",
// // //         calendarIndex: calendarIndex,
// // //         userId: userId
// // //       });
// // //     } catch (error) {
// // //       console.error('Error:', error);
// // //       return NextResponse.json({ error: error.message }, { status: 500 });
// // //     }
// // //   }


// // // Example: app/api/profile/delete-calendar/route.js
// // import { NextResponse } from "next/server";
// // import { getServerSession } from "next-auth/next";
// // import { authOptions } from "@/libs/next-auth"; // Adjust path if needed
// // import connectMongo from "@/libs/mongoose"; // Adjust path if needed
// // import User from "@/models/User"; // Adjust path if needed
// // import mongoose from 'mongoose'; // Keep for logging connection state if desired

// // export async function POST(req) { // Using POST, but DELETE might be semantically better
// //   const session = await getServerSession(authOptions);
// //   if (!session || !session.user?.id) {
// //     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
// //   }
// //   const userId = session.user.id;

// // //   try {
// // //     // Get the index to delete from the request body
// // //     const { calendarIndex } = await req.json();

// // //     // --- Input Validation ---
// // //     if (typeof calendarIndex !== 'number' || calendarIndex < 0 || !Number.isInteger(calendarIndex)) {
// // //       console.log("Invalid calendarIndex received:", calendarIndex);
// // //       return NextResponse.json({ error: "Invalid calendar index provided." }, { status: 400 });
// // //     }

// // //     await connectMongo();
// // //     console.log(`Attempting to delete calendar at index ${calendarIndex} for user ${userId}`);

// // //     // --- Fetch only the necessary data ---
// // //     // Use .lean() because we only need to read the array, not save this instance
// // //     const userData = await User.findById(userId, 'profile.linkedinStrategy.savedCalendars').lean();

// // //     if (!userData || !userData.profile?.linkedinStrategy) {
// // //       // Check if strategy exists at all
// // //       return NextResponse.json({ error: "User or strategy not found" }, { status: 404 });
// // //     }

// // //     const currentCalendars = userData.profile.linkedinStrategy.savedCalendars || [];

// // //     // --- Index Bounds Check ---
// // //     if (calendarIndex >= currentCalendars.length) {
// // //        console.log(`Attempted to delete index ${calendarIndex}, but array length is ${currentCalendars.length}`);
// // //        return NextResponse.json({ error: "Calendar index out of bounds." }, { status: 404 });
// // //     }

// // //     // --- Create the NEW array excluding the item at calendarIndex ---
// // //     const updatedCalendars = currentCalendars.filter((_, index) => index !== calendarIndex);

// // //     console.log(`Current length: ${currentCalendars.length}, New length after filter: ${updatedCalendars.length}`);

// // //     // --- Use findByIdAndUpdate to $set the entire array ---
// // //     const updateResult = await User.findByIdAndUpdate(
// // //         userId,
// // //         {
// // //             // Set the nested array path directly to the new filtered array
// // //             $set: { 'profile.linkedinStrategy.savedCalendars': updatedCalendars }
// // //             // Optionally update the main strategy 'savedAt' timestamp if desired
// // //             // $set: { 'profile.linkedinStrategy.savedCalendars': updatedCalendars, 'profile.linkedinStrategy.savedAt': new Date() }
// // //         },
// // //         { new: true } // Return the updated document (optional, but good for logging/confirmation)
// // //     );

// // //     if (!updateResult) {
// // //         // Should not happen if user was found initially
// // //         throw new Error("Failed to update user document during calendar deletion.");
// // //     }

// // //     console.log(`Successfully updated calendar array for user ${userId}. New count: ${updatedCalendars.length}`);

// // //     // Return success response
// // //     return NextResponse.json({
// // //         success: true,
// // //         message: "Calendar deleted successfully",
// // //         remainingCalendars: updatedCalendars.length
// // //     });

// // //   } catch (error) {
// // //     console.error('Error deleting calendar:', error);
// // //     return NextResponse.json({
// // //       error: "Failed to delete calendar",
// // //       details: error.message
// // //     }, { status: 500 });
// // //   }

// // // Inside the POST handler for deleting a calendar

// // // Replace the entire try...catch block in the POST handler

// // try {
// //     const { calendarIndex } = await req.json();

// //     // Input Validation
// //     if (typeof calendarIndex !== 'number' || calendarIndex < 0 || !Number.isInteger(calendarIndex)) {
// //       console.log("Invalid calendarIndex received:", calendarIndex);
// //       return NextResponse.json({ error: "Invalid calendar index provided." }, { status: 400 });
// //     }

// //     await connectMongo();
// //     console.log(`Attempting to delete calendar at index ${calendarIndex} for user ${userId}`);

// //     // --- Fetch the FULL document this time (not lean) to access subdocument _id ---
// //     const user = await User.findById(userId);

// //     if (!user || !user.profile?.linkedinStrategy || !Array.isArray(user.profile.linkedinStrategy.savedCalendars)) {
// //        return NextResponse.json({ error: "User, strategy, or calendars not found" }, { status: 404 });
// //     }

// //     const currentCalendars = user.profile.linkedinStrategy.savedCalendars;
// //     const initialLength = currentCalendars.length;
// //     console.log(`Current calendar count: ${initialLength}`);

// //     // Index Bounds Check
// //     if (calendarIndex >= initialLength) {
// //        console.log(`Attempted to delete index ${calendarIndex}, but array length is ${initialLength}`);
// //        return NextResponse.json({ error: "Calendar index out of bounds." }, { status: 404 });
// //     }

// //     // --- Get the specific MongoDB _id of the subdocument to remove ---
// //     const calendarToRemoveId = currentCalendars[calendarIndex]._id;
// //     console.log(`Identified subdocument _id to remove: ${calendarToRemoveId}`);

// //     if (!calendarToRemoveId) {
// //         // This shouldn't happen if the index is valid, as Mongoose adds _id by default
// //         throw new Error(`Could not find _id for calendar at index ${calendarIndex}.`);
// //     }

// //     // --- Use findByIdAndUpdate with $pull based on the subdocument _id ---
// //     console.log(`Attempting to $pull calendar with _id: ${calendarToRemoveId} from profile.linkedinStrategy.savedCalendars`);
// //     const updateResult = await User.findByIdAndUpdate(
// //         userId,
// //         {
// //             // Use $pull to remove the object from the array that matches the _id
// //             $pull: {
// //                 'profile.linkedinStrategy.savedCalendars': { _id: calendarToRemoveId }
// //             },
// //             // Optionally update the main strategy 'savedAt' timestamp
// //             $set: { 'profile.linkedinStrategy.savedAt': new Date() }
// //         },
// //         { new: true, lean: true } // Return updated doc as plain object
// //     );

// //     if (!updateResult) {
// //         throw new Error("User document not found during $pull update operation.");
// //     }
// //     console.log("--- findByIdAndUpdate with $pull completed ---");

// //     const resultCalendars = updateResult?.profile?.linkedinStrategy?.savedCalendars;
// //     const resultLength = resultCalendars?.length ?? 0;
// //     console.log(
// //         "Snapshot AFTER $pull (from result):",
// //         JSON.stringify(resultCalendars, null, 2)
// //     );
// //     console.log(`Length reported in updateResult: ${resultLength}`);

// //     // Check if the length actually decreased
// //      if (resultLength >= initialLength && initialLength > 0) {
// //          console.error(`!!! ERROR: Length did not decrease after $pull attempt! Initial: ${initialLength}, Result: ${resultLength}`);
// //          throw new Error("Database update using $pull failed to remove the element.");
// //      }

// //     return NextResponse.json({
// //         success: true,
// //         message: "Calendar deleted successfully using $pull",
// //         remainingCalendars: resultLength
// //     });

// //   } catch (error) {
// //     console.error('Error deleting calendar:', error);
// //     return NextResponse.json({
// //       error: "Failed to delete calendar",
// //       details: error.message
// //     }, { status: 500 });
// //   }

// // }


// // Full code for: app/api/profile/delete-calendar/route.js

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/libs/next-auth"; // Adjust path if needed
// import connectMongo from "@/libs/mongoose"; // Adjust path if needed
// import User from "@/models/User"; // Adjust path if needed
// import mongoose from 'mongoose'; // Needed for connection checks

// // Optional: Import date-fns if you were using addWeekdays here (not needed for delete)
// // import { addDays, getDay, startOfDay, isBefore, isEqual, parseISO, nextMonday } from 'date-fns';

// export async function POST(req) {
//   // 1. Authentication
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user?.id) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }
//   const userId = session.user.id;

//   try {
//     // 2. Parse Request Body
//     const { calendarIndex } = await req.json();

//     // 3. Validate Input
//     if (typeof calendarIndex !== 'number' || calendarIndex < 0 || !Number.isInteger(calendarIndex)) {
//       console.log("Invalid calendarIndex received:", calendarIndex);
//       return NextResponse.json({ error: "Invalid calendar index provided." }, { status: 400 });
//     }

//     // 4. Connect to DB
//     await connectMongo();
//     console.log(`Attempting to delete calendar at index ${calendarIndex} for user ${userId}`);
//     // Optional: Connection check logs
//     // console.log("--- DB Connection Check ---");
//     // console.log("DB Connection State (1=connected):", mongoose.connection.readyState);
//     // console.log("DB Name:", mongoose.connection.db.databaseName);
//     // console.log("DB Host:", mongoose.connection.host);
//     // console.log("--------------------------");

//     // 5. Fetch FULL User Document (needed for subdocument _id)
//     const user = await User.findById(userId);


//     // --- ADD DETAILED LOG OF FETCHED USER DATA ---
//     console.log("--- Data fetched by findById in delete route ---");
//     if (!user) {
//         console.log("User document not found!");
//     } else if (!user.profile) {
//         console.log("User found, but user.profile is missing.");
//     } else if (!user.profile.linkedinStrategy) {
//         console.log("User profile found, but profile.linkedinStrategy is missing.");
//         // Optional: See what keys ARE in profile
//         // console.log("User profile keys:", Object.keys(user.profile));
//     } else if (!Array.isArray(user.profile.linkedinStrategy.savedCalendars)) {
//         console.log("linkedinStrategy found, but savedCalendars is missing or not an array.");
//         console.log("Value of savedCalendars:", user.profile.linkedinStrategy.savedCalendars);
//     } else {
//         console.log("Found savedCalendars array with length:", user.profile.linkedinStrategy.savedCalendars.length);
//     }
//     console.log("------------------------------------------");
//     // --- END DETAILED LOG ---


//     // 6. Check if user and necessary nested data exist
//     if (!user || !user.profile?.linkedinStrategy || !Array.isArray(user.profile.linkedinStrategy.savedCalendars)) {
//        console.log("User, strategy, or savedCalendars array not found.");
//        return NextResponse.json({ error: "Saved strategy or calendars not found for user." }, { status: 404 });
//     }

//     const currentCalendars = user.profile.linkedinStrategy.savedCalendars;
//     const initialLength = currentCalendars.length;
//     console.log(`Current calendar count before deletion: ${initialLength}`);

//     // 7. Index Bounds Check
//     if (calendarIndex >= initialLength) {
//        console.log(`Attempted to delete index ${calendarIndex}, but array length is ${initialLength}`);
//        return NextResponse.json({ error: "Calendar index out of bounds." }, { status: 404 });
//     }

//     // 8. Get the specific MongoDB _id of the subdocument to remove
//     const calendarToRemoveId = currentCalendars[calendarIndex]._id;
//     console.log(`Identified subdocument _id to remove: ${calendarToRemoveId}`);

//     if (!calendarToRemoveId) {
//         // This case indicates an internal issue if Mongoose didn't assign an ID
//         throw new Error(`Could not find MongoDB _id for calendar at index ${calendarIndex}.`);
//     }

//     // 9. Perform Update using findByIdAndUpdate with $pull
//     console.log(`Attempting to $pull calendar with _id: ${calendarToRemoveId} from profile.linkedinStrategy.savedCalendars`);
//     const updateResult = await User.findByIdAndUpdate(
//         userId,
//         {
//             $pull: {
//                 // Specify the path to the array and the condition to match for removal
//                 'profile.linkedinStrategy.savedCalendars': { _id: calendarToRemoveId }
//             },
//              // Optionally update the main strategy 'savedAt' timestamp
//              $set: { 'profile.linkedinStrategy.savedAt': new Date() }
//         },
//         { new: true, lean: true } // Return the updated document as a plain JS object
//     );

//     // 10. Check Update Result
//     if (!updateResult) {
//         // Should only happen if user was deleted between findById and findByIdAndUpdate
//         throw new Error("User document not found during the update operation.");
//     }
//     console.log("--- findByIdAndUpdate with $pull completed ---");

//     const resultCalendars = updateResult?.profile?.linkedinStrategy?.savedCalendars;
//     const resultLength = resultCalendars?.length ?? 0;

//     // Log the state AFTER the update operation returned
//     console.log(
//         "Snapshot AFTER $pull (from returned document):",
//         JSON.stringify(resultCalendars, null, 2)
//     );
//     console.log(`Length reported in updateResult: ${resultLength}`);

//     // 11. Verify Length Decreased (Important Check)
//      if (resultLength >= initialLength && initialLength > 0) {
//          const message = `Database update failed: Length did not decrease after $pull attempt! Initial: ${initialLength}, Result: ${resultLength}. SubDoc ID: ${calendarToRemoveId}`;
//          console.error("!!! ERROR:", message);
//          // Return an error response if deletion didn't persist
//          return NextResponse.json({ error: "Deletion failed to persist", details: message }, { status: 500 });
//      }

//     // 12. Return Success Response
//     return NextResponse.json({
//         success: true,
//         message: "Calendar deleted successfully",
//         remainingCalendars: resultLength
//     });

//   } catch (error) {
//     // 13. Catch Block for Unexpected Errors
//     console.error('Error deleting calendar:', error);
//     return NextResponse.json({
//       error: "Failed to delete calendar",
//       // Be careful about sending back raw error messages in production
//       details: error.message // Send specific error message back
//     }, { status: 500 });
//   }
// }
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
    console.log("DELETE CALENDAR API - Starting execution");
    
    // 1. Authentication
    const session = await getServerSession(authOptions);
    console.log("Session obtained:", !!session);
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const userId = session.user.id;
    console.log("User ID from session:", userId);

    // 2. Parse request body
    const body = await req.json();
    console.log("Request body:", body);
    const { calendarIndex } = body;

    // 3. Validate input
    if (typeof calendarIndex !== 'number' || calendarIndex < 0 || !Number.isInteger(calendarIndex)) {
      console.log("Invalid calendarIndex received:", calendarIndex);
      return NextResponse.json({ error: "Invalid calendar index provided." }, { status: 400 });
    }

    // 4. Connect to database
    console.log("Connecting to MongoDB...");
    await connectMongo();
    console.log("Connected to MongoDB");
    
    // 5. Fetch the user document
    console.log("Fetching user document for ID:", userId);
    const user = await User.findById(userId);
    console.log("User found:", !!user);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 6. Check user profile structure
    console.log("User profile exists:", !!user.profile);
    console.log("LinkedinStrategy exists:", !!user.profile?.linkedinStrategy);
    
    // Let's look at what fields actually exist in linkedinStrategy
    if (user.profile?.linkedinStrategy) {
      console.log("Fields in linkedinStrategy:", Object.keys(user.profile.linkedinStrategy));
    }
    
    // 7. Check for savedCalendars array
    const hasSavedCalendars = !!user.profile?.linkedinStrategy?.savedCalendars;
    const isArray = Array.isArray(user.profile?.linkedinStrategy?.savedCalendars);
    console.log("savedCalendars exists:", hasSavedCalendars);
    console.log("savedCalendars is array:", isArray);
    
    if (isArray) {
      console.log("savedCalendars length:", user.profile.linkedinStrategy.savedCalendars.length);
    }
    
    // If there's no savedCalendars array, let's try a direct MongoDB check
    if (!isArray) {
      console.log("Checking raw MongoDB document for savedCalendars");
      const rawUser = await mongoose.connection.db.collection('users').findOne(
        { _id: new mongoose.Types.ObjectId(userId) }
      );
      
      console.log("Raw MongoDB check:");
      console.log("- savedCalendars exists:", !!rawUser?.profile?.linkedinStrategy?.savedCalendars);
      console.log("- Is array:", Array.isArray(rawUser?.profile?.linkedinStrategy?.savedCalendars));
      
      if (Array.isArray(rawUser?.profile?.linkedinStrategy?.savedCalendars)) {
        console.log("- Array length:", rawUser.profile.linkedinStrategy.savedCalendars.length);
        
        // Try a direct MongoDB update
        console.log("Attempting direct MongoDB update");
        const savedCalendars = rawUser.profile.linkedinStrategy.savedCalendars;
        
        if (calendarIndex >= savedCalendars.length) {
          return NextResponse.json({ error: "Calendar index out of bounds (raw check)" }, { status: 400 });
        }
        
        savedCalendars.splice(calendarIndex, 1);
        
        const updateResult = await mongoose.connection.db.collection('users').updateOne(
          { _id: new mongoose.Types.ObjectId(userId) },
          { $set: { 'profile.linkedinStrategy.savedCalendars': savedCalendars } }
        );
        
        console.log("Direct MongoDB update result:", updateResult);
        
        return NextResponse.json({
          success: true,
          message: "Calendar deleted successfully (direct MongoDB)",
          remainingCalendars: savedCalendars.length
        });
      }
      
      // Initialize if missing (both in Mongoose object and MongoDB)
      console.log("savedCalendars not found - initializing empty array");
      
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
    console.log(`Removing calendar at index ${calendarIndex}`);
    savedCalendars.splice(calendarIndex, 1);
    
    // 10. Mark as modified and save
    user.markModified('profile.linkedinStrategy.savedCalendars');
    console.log("Saving updated user document...");
    await user.save();
    console.log("User document saved successfully");
    
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