// // // app/api/posts/save/route.js
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
//     const { content, postIndex, pillar, topic, approach, contentType, weekDay } = await req.json();
//     await connectMongo();
    
//     const user = await User.findById(session.user.id);
    
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }
    
//     // Initialize the profile if it doesn't exist
//     if (!user.profile) {
//       user.profile = {};
//     }
    
//     // Initialize linkedinStrategy if it doesn't exist
//     if (!user.profile.linkedinStrategy) {
//       user.profile.linkedinStrategy = {
//         savedPosts: []
//       };
//     }
    
//     // Initialize savedPosts array if it doesn't exist
//     if (!user.profile.linkedinStrategy.savedPosts) {
//       user.profile.linkedinStrategy.savedPosts = [];
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
    
//     // Find if the post already exists
//     const existingPostIndex = user.profile.linkedinStrategy.savedPosts.findIndex(
//       post => post.postIndex === postIndex
//     );
    
//     if (existingPostIndex >= 0) {
//       // Update existing post
//       user.profile.linkedinStrategy.savedPosts[existingPostIndex] = postData;
//     } else {
//       // Add new post
//       user.profile.linkedinStrategy.savedPosts.push(postData);
//     }
    
//     await user.save();
//     console.log("--- savePost API: User saved successfully ---"); // Added log

//     console.log("--- savePost API: Current savedPosts array:", JSON.stringify(user.profile.linkedinStrategy.savedPosts, null, 2));


    
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Error saving post:', error);
//     return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
//   }
// }


////// google gemini with console.logs

// app/api/posts/save/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) { // Check ID exists
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = session.user.id; // Define userId

  try {
    const { content, postIndex, pillar, topic, approach, contentType, weekDay } = await req.json();
    await connectMongo();

    const user = await User.findById(userId); // Use userId

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Initialize the profile if it doesn't exist
    if (!user.profile) {
      user.profile = {};
    }

    // Initialize linkedinStrategy if it doesn't exist
    if (!user.profile.linkedinStrategy) {
      user.profile.linkedinStrategy = {
        savedPosts: [] // Ensure savedPosts array exists
      };
    }

    // Initialize savedPosts array if it doesn't exist inside linkedinStrategy
    if (!user.profile.linkedinStrategy.savedPosts) {
      user.profile.linkedinStrategy.savedPosts = [];
    }

    // Create the post data
    const postData = {
      postIndex,
      content,
      pillar,
      topic,
      approach,
      contentType,
      weekDay,
      savedAt: new Date()
    };

    // Find if the post already exists
    const existingPostIndexInArray = user.profile.linkedinStrategy.savedPosts.findIndex(
      post => post.postIndex === postIndex
    );

    if (existingPostIndexInArray >= 0) {
      // Update existing post
      console.log(`--- savePost API: Updating post at index ${postIndex} ---`); // Added log
      user.profile.linkedinStrategy.savedPosts[existingPostIndexInArray] = postData;
    } else {
      // Add new post
      console.log(`--- savePost API: Adding new post at index ${postIndex} ---`); // Added log
      user.profile.linkedinStrategy.savedPosts.push(postData);
    }

    await user.save();
    console.log("--- savePost API: User saved successfully ---"); // Added log

    // --- ADD THIS LOG TO CHECK THE SAVED DATA ---
    console.log("--- savePost API: Current savedPosts array:", JSON.stringify(user.profile.linkedinStrategy.savedPosts, null, 2));
    // --- END OF ADDED LOG ---

    return NextResponse.json({ success: true, message: "Post saved successfully!" }); // Added message

  } catch (error) {
    console.error('Error saving post:', error);
    // Return error details if possible, helps frontend debugging
    return NextResponse.json({ error: "Failed to save post", details: error.message }, { status: 500 });
  }
}

// // app/api/posts/save/route.js (Temporary Minimal Test)
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   console.log("--- MINIMAL TEST: POST request received at /api/posts/save ---");
//   // Simulate success for the frontend check
//   return NextResponse.json({ success: true, message: "Minimal save test OK!" });
// }

// // Optional: Add a GET handler just to be sure exports are recognized
// export async function GET(req) {
//     console.log("--- MINIMAL TEST: GET request received at /api/posts/save ---");
//     return NextResponse.json({ message: "Minimal GET test ok" });
// }