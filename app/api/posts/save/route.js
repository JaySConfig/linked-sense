// // // // app/api/posts/save/route.js
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
// //     const { content, postIndex, pillar, topic, approach, contentType, weekDay } = await req.json();
// //     await connectMongo();
    
// //     const user = await User.findById(session.user.id);
    
// //     if (!user) {
// //       return NextResponse.json({ error: "User not found" }, { status: 404 });
// //     }
    
// //     // Initialize the profile if it doesn't exist
// //     if (!user.profile) {
// //       user.profile = {};
// //     }
    
// //     // Initialize linkedinStrategy if it doesn't exist
// //     if (!user.profile.linkedinStrategy) {
// //       user.profile.linkedinStrategy = {
// //         savedPosts: []
// //       };
// //     }
    
// //     // Initialize savedPosts array if it doesn't exist
// //     if (!user.profile.linkedinStrategy.savedPosts) {
// //       user.profile.linkedinStrategy.savedPosts = [];
// //     }
    
// //     // Create the post data
// //     const postData = {
// //       postIndex,
// //       content,
// //       pillar,
// //       topic,
// //       approach,
// //       contentType,
// //       weekDay,
// //       savedAt: new Date()
// //     };
    
// //     // Find if the post already exists
// //     const existingPostIndex = user.profile.linkedinStrategy.savedPosts.findIndex(
// //       post => post.postIndex === postIndex
// //     );
    
// //     if (existingPostIndex >= 0) {
// //       // Update existing post
// //       user.profile.linkedinStrategy.savedPosts[existingPostIndex] = postData;
// //     } else {
// //       // Add new post
// //       user.profile.linkedinStrategy.savedPosts.push(postData);
// //     }
    
// //     await user.save();
// //     console.log("--- savePost API: User saved successfully ---"); // Added log

// //     console.log("--- savePost API: Current savedPosts array:", JSON.stringify(user.profile.linkedinStrategy.savedPosts, null, 2));


    
// //     return NextResponse.json({ success: true });
// //   } catch (error) {
// //     console.error('Error saving post:', error);
// //     return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
// //   }
// // }


// ////// google gemini with console.logs

// // app/api/posts/save/route.js
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/libs/next-auth";
// import connectMongo from "@/libs/mongoose";
// import User from "@/models/User";
// ///////////////
// // export async function POST(req) {
// //   const session = await getServerSession(authOptions);

// //   if (!session || !session.user?.id) {
// //     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
// //   }
// //   const userId = session.user.id;

// //   try {
// //     // Add calendarIndex to the request parameters
// //     const { content, postIndex, pillar, topic, approach, contentType, weekDay, calendarIndex } = await req.json();
// //     await connectMongo();

// //     const user = await User.findById(userId);

// //     if (!user) {
// //       return NextResponse.json({ error: "User not found" }, { status: 404 });
// //     }

// //     // Check if linkedinStrategy exists
// //     if (!user.profile?.linkedinStrategy?.savedCalendars) {
// //       return NextResponse.json({ error: "No saved calendars found" }, { status: 404 });
// //     }

// //     // Check if the specified calendar exists
// //     if (!user.profile.linkedinStrategy.savedCalendars[calendarIndex]) {
// //       return NextResponse.json({ error: "Calendar not found" }, { status: 404 });
// //     }

// //     // Initialize posts array if it doesn't exist
// //     if (!user.profile.linkedinStrategy.savedCalendars[calendarIndex].posts) {
// //       user.profile.linkedinStrategy.savedCalendars[calendarIndex].posts = [];
// //     }

// //     // Create the post data
// //     const postData = {
// //       postIndex,
// //       content,
// //       pillar,
// //       topic,
// //       approach,
// //       contentType,
// //       weekDay,
// //       savedAt: new Date()
// //     };

// //     // Find if the post already exists
// //     const calendarPosts = user.profile.linkedinStrategy.savedCalendars[calendarIndex].posts;
// //     const existingPostIndex = calendarPosts.findIndex(post => post.postIndex === postIndex);

// //     if (existingPostIndex >= 0) {
// //       // Update existing post
// //       calendarPosts[existingPostIndex] = postData;
// //     } else {
// //       // Add new post
// //       calendarPosts.push(postData);
// //     }

// //     await user.save();
    
// //     return NextResponse.json({ success: true, message: "Post saved successfully!" });

// //   } catch (error) {
// //     console.error('Error saving post:', error);
// //     return NextResponse.json({ error: "Failed to save post", details: error.message }, { status: 500 });
// //   }
// // // }
// //   export async function POST(req) {
// //     const session = await getServerSession(authOptions);

// //     if (!session || !session.user?.id) {
// //       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
// //     }
// //     const userId = session.user.id;

// //     try {
// //       // Add calendarIndex to the request parameters
// //       const { content, postIndex, pillar, topic, approach, contentType, weekDay, calendarIndex } = await req.json();
// //       await connectMongo();

// //       const user = await User.findById(userId);

// //       if (!user) {
// //         return NextResponse.json({ error: "User not found" }, { status: 404 });
// //       }

// //       // Check if linkedinStrategy exists
// //       if (!user.profile?.linkedinStrategy?.savedCalendars) {
// //         return NextResponse.json({ error: "No saved calendars found" }, { status: 404 });
// //       }

// //       // Check if the specified calendar exists
// //       if (!user.profile.linkedinStrategy.savedCalendars[calendarIndex]) {
// //         return NextResponse.json({ error: "Calendar not found" }, { status: 404 });
// //       }

// //       // Initialize posts array if it doesn't exist
// //       if (!user.profile.linkedinStrategy.savedCalendars[calendarIndex].posts) {
// //         user.profile.linkedinStrategy.savedCalendars[calendarIndex].posts = [];
// //       }

// //       // Create the post data
// //       const postData = {
// //         postIndex,
// //         content,
// //         pillar,
// //         topic,
// //         approach,
// //         contentType,
// //         weekDay,
// //         savedAt: new Date()
// //       };

// //       // Find if the post already exists
// //       const calendarPosts = user.profile.linkedinStrategy.savedCalendars[calendarIndex].posts;
// //       const existingPostIndex = calendarPosts.findIndex(post => post.postIndex === postIndex);

// //       if (existingPostIndex >= 0) {
// //         // Update existing post
// //         calendarPosts[existingPostIndex] = postData;
// //       } else {
// //         // Add new post
// //         calendarPosts.push(postData);
// //       }

// //       await user.save();
      
// //       return NextResponse.json({ success: true, message: "Post saved successfully!" });

// //     } catch (error) {
// //       console.error('Error saving post:', error);
// //       return NextResponse.json({ error: "Failed to save post", details: error.message }, { status: 500 });
// //     }
// //   }

// /////////////


// // api/posts/save/route.js// api/posts/save/route.js
// export async function POST(req) {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user?.id) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }
//   const userId = session.user.id;

//   try {
//     const { content, postIndex, pillar, topic, approach, contentType, weekDay, calendarIndex } = await req.json();
    
//     // Log full received data
//     console.log("POST /api/posts/save - Full received data:", { 
//       content: content?.substring(0, 20) + "...", 
//       postIndex, 
//       calendarIndex,
//       pillar,
//       topic: topic?.substring(0, 20) + "..."
//     });
    
//     await connectMongo();
//     const user = await User.findById(userId);

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Create the post data
//     const postData = {
//       postIndex,
//       content,
//       pillar,
//       topic,
//       approach,
//       contentType,
//       weekDay,
//       savedAt: new Date()
//     };

//     // -- Save to the calendar posts array --
//     if (user.profile?.linkedinStrategy?.savedCalendars?.[calendarIndex]) {
//       console.log(`Found calendar at index ${calendarIndex}`);
      
//       // Make sure the calendar has a posts array
//       if (!user.profile.linkedinStrategy.savedCalendars[calendarIndex].posts) {
//         console.log(`Creating posts array for calendar ${calendarIndex}`);
//         user.profile.linkedinStrategy.savedCalendars[calendarIndex].posts = [];
//       }
      
//       // Get the posts array
//       const calendarPosts = user.profile.linkedinStrategy.savedCalendars[calendarIndex].posts;
      
//       // Check if post already exists
//       const existingPostIndex = calendarPosts.findIndex(post => post.postIndex === postIndex);
      
//       if (existingPostIndex >= 0) {
//         console.log(`Updating existing post at index ${postIndex} in calendar ${calendarIndex}`);
//         calendarPosts[existingPostIndex] = postData;
//       } else {
//         console.log(`Adding new post at index ${postIndex} to calendar ${calendarIndex}`);
//         calendarPosts.push(postData);
//       }
      
//       console.log(`Calendar ${calendarIndex} now has ${calendarPosts.length} posts`);
//     } else {
//       console.log(`Calendar at index ${calendarIndex} not found, cannot save post there`);
//       return NextResponse.json({ error: `Calendar at index ${calendarIndex} not found` }, { status: 404 });
//     }

//     await user.save();
//     console.log("User saved with updated posts");
    
//     // Get updated counts for verification
//     const updatedCalendarPostsCount = user.profile.linkedinStrategy.savedCalendars[calendarIndex].posts?.length || 0;
    
//     return NextResponse.json({ 
//       success: true, 
//       message: "Post saved successfully!", 
//       calendarIndex,
//       postsInCalendar: updatedCalendarPostsCount
//     });

//   } catch (error) {
//     console.error('Error saving post:', error);
//     return NextResponse.json({ 
//       error: "Failed to save post", 
//       details: error.message,
//       stack: error.stack 
//     }, { status: 500 });
//   }
// }

// api/posts/save/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth"; // Ensure this path is correct
import connectMongo from "@/libs/mongoose";   // Ensure this path is correct
import User from "@/models/User";           // Ensure this path is correct
// import mongoose from "mongoose"; // Import mongoose if needed for ObjectId, etc.

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const { content, postIndex, pillar, topic, approach, contentType, weekDay, calendarIndex } = await req.json();

    // Log received data
    console.log(`--- /api/posts/save: Received request ---`);
    console.log(`User ID: ${userId}`);
    console.log(`Calendar Index: ${calendarIndex}, Post Index: ${postIndex}`);
    console.log(`Pillar: ${pillar}, Topic: ${topic ? topic.substring(0, 30) + '...' : 'N/A'}`);
    // console.log(`Content Snippet: ${content ? content.substring(0, 50) + '...' : 'N/A'}`); // Be cautious logging full content if sensitive

    if (typeof calendarIndex !== 'number' || typeof postIndex !== 'number') {
        return NextResponse.json({ error: "Invalid index type provided." }, { status: 400 });
    }

    await connectMongo();
    console.log("MongoDB connected.");

    const user = await User.findById(userId);

    if (!user) {
      console.error(`User not found for ID: ${userId}`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate profile structure and target calendar
    if (!user.profile) {
        console.error(`User ${userId} is missing the 'profile' field.`);
        return NextResponse.json({ error: "User profile structure is missing." }, { status: 500 });
    }
     if (!user.profile.linkedinStrategy) {
        console.error(`User ${userId} profile is missing 'linkedinStrategy'.`);
        return NextResponse.json({ error: "User profile structure is missing linkedinStrategy." }, { status: 500 });
    }
    if (!Array.isArray(user.profile.linkedinStrategy.savedCalendars)) {
        console.error(`User ${userId} linkedinStrategy is missing 'savedCalendars' array.`);
        return NextResponse.json({ error: "User profile structure is missing savedCalendars array." }, { status: 500 });
    }
    if (!user.profile.linkedinStrategy.savedCalendars[calendarIndex]) {
      console.error(`Calendar not found at index ${calendarIndex} for user ${userId}`);
      return NextResponse.json({ error: `Calendar at index ${calendarIndex} not found` }, { status: 404 });
    }

    // Ensure posts array exists within the target calendar (important safeguard)
    if (!Array.isArray(user.profile.linkedinStrategy.savedCalendars[calendarIndex].posts)) {
      console.log(`Initializing posts array for calendar ${calendarIndex}`);
      user.profile.linkedinStrategy.savedCalendars[calendarIndex].posts = [];
    }

    // Create the post data object
    const postData = {
      postIndex,
      content,
      pillar,
      topic,
      approach,
      contentType,
      weekDay,
      savedAt: new Date()
      // Mongoose will automatically add an _id
    };

    const calendarPosts = user.profile.linkedinStrategy.savedCalendars[calendarIndex].posts;
    const existingPostIndexInArray = calendarPosts.findIndex(post => post.postIndex === postIndex);

    if (existingPostIndexInArray >= 0) {
      console.log(`Updating existing post at internal array index ${existingPostIndexInArray} (postIndex ${postIndex}) in calendar ${calendarIndex}`);
      // Preserve the original MongoDB _id if updating
      const originalId = calendarPosts[existingPostIndexInArray]._id;
      calendarPosts[existingPostIndexInArray] = { ...postData, _id: originalId }; // Keep original _id
    } else {
      console.log(`Adding new post with postIndex ${postIndex} to calendar ${calendarIndex}`);
      calendarPosts.push(postData); // Mongoose will add _id upon save
    }

    console.log(`--- Before user.save() ---`);
    console.log(`Target Calendar Posts Array Length: ${calendarPosts.length}`);
    // Optional: Log the post being saved/updated
    // console.log("Post data being saved/updated:", JSON.stringify(postData));

    // Mark the specific array as modified (can be crucial for nested arrays)
    user.markModified(`profile.linkedinStrategy.savedCalendars.${calendarIndex}.posts`);
    // Also mark the parent if needed, though modifying the nested path often suffices
    user.markModified('profile.linkedinStrategy.savedCalendars');

    // --- The actual save operation ---
    await user.save();
    // --- Save operation finished ---

    console.log(`--- After user.save() ---`);
    console.log(`User document for ${userId} saved successfully.`);

    // Optional but recommended: Re-fetch immediately AFTER save to check persistence
    const userAfterSave = await User.findById(userId).lean(); // Use .lean() for plain JS object
    const updatedPostsArray = userAfterSave?.profile?.linkedinStrategy?.savedCalendars?.[calendarIndex]?.posts || [];
    console.log(`Post-Save Check: Posts array length in calendar ${calendarIndex}: ${updatedPostsArray.length}`);
    const savedPostCheck = updatedPostsArray.find(p => p.postIndex === postIndex);
    console.log(`Post-Save Check: Post with index ${postIndex} found in re-fetched data:`, !!savedPostCheck);
    // Optional: Log the content snippet of the saved post from re-fetched data
    // if (savedPostCheck) {
    //    console.log(`Post-Save Check Content Snippet: ${savedPostCheck.content ? savedPostCheck.content.substring(0,50)+'...' : 'N/A'}`);
    // }

    return NextResponse.json({
      success: true,
      message: "Post saved successfully!",
      calendarIndex,
      postsInCalendar: updatedPostsArray.length // Return updated count
    });

  } catch (error) {
    console.error('--- Error in /api/posts/save ---:', error); // Log the full error object
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack); // Log the stack trace for more context
    return NextResponse.json({
      error: "Failed to save post",
      details: error.message,
      // Optionally include stack in development environments
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}