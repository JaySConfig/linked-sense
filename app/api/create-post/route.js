// // 

// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const runtime = 'nodejs';
// export const dynamic = 'force-dynamic';
// export const fetchCache = 'force-no-store';

// // Helper functions
// function getUserVoiceLabel(userVoice) {
//   const voiceMap = {
//     'professional': 'Professional & Insightful',
//     'casual': 'Casual & Conversational',
//     'authoritative': 'Authoritative & Bold',
//     'storytelling': 'Storytelling & Relatable'
//   };
//   return voiceMap[userVoice] || userVoice;
// }
  
// function getPerspectiveLabel(uniquePerspective) {
//   const perspectiveMap = {
//     'analytical': 'Analytical (Breaks down complex ideas with logic & data)',
//     'inspiring': 'Inspiring (Motivates with personal stories & big-picture thinking)',
//     'challenging': 'Challenging (Questions norms & disrupts industry beliefs)',
//     'informative': 'Informative (Provides structured knowledge through education & tutorials)'
//   };
//   return perspectiveMap[uniquePerspective] || uniquePerspective;
// }

// export async function POST(request) {
//   try {
//     const { pillar, topic, approach, contentType, userVoice, uniquePerspective } = await request.json();
    
//     console.log("Generating post for:", { pillar, topic, approach, contentType, userVoice, uniquePerspective });
    
//     // Get API key
//     const apiKey = process.env.GOOGLE_API;
//     if (!apiKey) {
//       console.error("API key is undefined or empty");
//       return Response.json(
//         { error: "API key configuration error" },
//         { status: 500 }
//       );
//     }
    
//     // Initialize the API
//     const genAI = new GoogleGenerativeAI(apiKey);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     // Get label texts for better context
//     const voiceLabel = getUserVoiceLabel(userVoice);
//     const perspectiveLabel = getPerspectiveLabel(uniquePerspective);
    
//     // Format the prompt for post generation
//     const prompt = `
// You are a LinkedIn content creation expert. Create a ready-to-post LinkedIn post based on the following details:

// PILLAR: ${pillar}
// TOPIC: ${topic}
// APPROACH: ${approach}
// CONTENT TYPE: ${contentType}

// USER'S COMMUNICATION STYLE: ${perspectiveLabel || "Not specified"}
// USER'S DESIRED TONE: ${voiceLabel || "Not specified"}

// Your task is to create a complete, ready-to-post LinkedIn post in the specified format.
// The post should:
// 1. Be engaging and professional
// 2. Follow the specified approach exactly
// 3. Match the content type format (this is critical - if it mentions carousel, make carousel slides, if it mentions video, create a video post structure)
// 4. Include appropriate hashtags (3-5)
// 5. Have a clear call-to-action
// 6. CRITICALLY IMPORTANT: Match the user's communication style and tone specified above

// IMPORTANT: Do NOT include any introductory text like "Okay, here's a LinkedIn post draft..." or any instructions. Start directly with the LinkedIn post content.

// Format the response as a complete LinkedIn post, ready to copy and paste.
// `;
    
//     // Generate content
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const post = response.text();
    
//     console.log("Successfully generated post");
    
//     return Response.json({ post });
    
//   } catch (error) {
//     console.error("Detailed error:", error);
//     return Response.json(
//       {
//         error: "Failed to generate LinkedIn post",
//         details: error.message,
//         stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//       },
//       { status: 500 }
//     );
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Create a rate limiter instance directly in this file
const limiter = new RateLimiterMemory({
  points: 5,          // 5 requests
  duration: 300,      // per 5 minutes
  blockDuration: 600  // Block for 10 minutes if exceeded
});

// Helper functions - defined at the file scope
function getUserVoiceLabel(userVoice) {
    const voiceMap = {
      'professional': 'Professional & Insightful',
      'casual': 'Casual & Conversational',
      'authoritative': 'Authoritative & Bold',
      'storytelling': 'Storytelling & Relatable'
    };
    return voiceMap[userVoice] || userVoice;
}
  
function getPerspectiveLabel(uniquePerspective) {
    const perspectiveMap = {
      'analytical': 'Analytical (Breaks down complex ideas with logic & data)',
      'inspiring': 'Inspiring (Motivates with personal stories & big-picture thinking)',
      'challenging': 'Challenging (Questions norms & disrupts industry beliefs)',
      'informative': 'Informative (Provides structured knowledge through education & tutorials)'
    };
    return perspectiveMap[uniquePerspective] || uniquePerspective;
}

export async function POST(request) {
  try {

    // Get the user session for auth-based rate limiting
   const session = await getServerSession(authOptions);
    
   // If not authenticated, return 401
   if (!session) {
     return Response.json(
       { error: "Authentication required" },
       { status: 401 }
     );
   }
   
   // Use user ID for rate limiting (much better than IP)
   const userId = session.user.id;
   
   // Apply rate limiting with user ID
   try {
     await limiter.consume(userId);
   } catch (rateLimiterRes) {
     // If rate limited, return 429 response
     const retryAfter = Math.ceil(rateLimiterRes.msBeforeNext / 1000);
     return Response.json(
       { 
         error: "Rate limit exceeded. Please try again later.",
         retryAfter
       },
       { 
         status: 429,
         headers: { 'Retry-After': retryAfter }
       }
     );
   }
    // Extract all parameters including user voice and perspective
    const { pillar, topic, approach, contentType, userVoice, uniquePerspective } = await request.json();
    
    // console.log("Generating post for:", { pillar, topic, approach, contentType, userVoice, uniquePerspective });
    
    // Get API key
    const apiKey = process.env.GOOGLE_API;
    if (!apiKey) {
      console.error("API key is undefined or empty");
      return Response.json(
        { error: "API key configuration error" },
        { status: 500 }
      );
    }
    
    // Initialize the API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Get label texts for better context
    const voiceLabel = getUserVoiceLabel(userVoice);
    const perspectiveLabel = getPerspectiveLabel(uniquePerspective);
    
//     // Format the prompt for post generation
//     const prompt = `
// You are a LinkedIn content creation expert. Create a ready-to-post LinkedIn post based on the following details:

// PILLAR: ${pillar}
// TOPIC: ${topic}
// APPROACH: ${approach}
// CONTENT TYPE: ${contentType}

// USER'S COMMUNICATION STYLE: ${perspectiveLabel || "Not specified"}
// USER'S DESIRED TONE: ${voiceLabel || "Not specified"}

// Your task is to create a complete, ready-to-post LinkedIn post in the specified format.
// The post should:
// 1. Be engaging and professional
// 2. Follow the specified approach exactly
// 3. Match the content type format (this is critical - if it mentions carousel, make carousel slides, if it mentions video, create a video post structure)
// 4. Include appropriate hashtags (3-5)
// 5. Have a clear call-to-action
// 6. CRITICALLY IMPORTANT: Match the user's communication style and tone specified above

// IMPORTANT: Do NOT include any introductory text like "Okay, here's a LinkedIn post draft..." or any instructions. Start directly with the LinkedIn post content.

// Format the response as a complete LinkedIn post, ready to copy and paste.
// `;

// ////// prompt with image suggestions.

// Format the prompt for post generation with visual guidance added
// const prompt = `
// You are a LinkedIn content creation expert. Create a ready-to-post LinkedIn post based on the following details:

// PILLAR: ${pillar}
// TOPIC: ${topic}
// APPROACH: ${approach}
// CONTENT TYPE: ${contentType}

// USER'S COMMUNICATION STYLE: ${perspectiveLabel || "Not specified"}
// USER'S DESIRED TONE: ${voiceLabel || "Not specified"}

// Your task is to create a complete, ready-to-post LinkedIn post in the specified format.
// The post should:
// 1. Be engaging and professional
// 2. Follow the specified approach exactly
// 3. Match the content type format (this is critical - if it mentions carousel, make carousel slides, if it mentions video, create a video post structure)
// 4. Include appropriate hashtags (3-5)
// 5. Have a clear call-to-action
// 6. CRITICALLY IMPORTANT: Match the user's communication style and tone specified above

// VISUAL GUIDANCE SECTION:
// - Add a brief paragraph at the end titled "📸 Visual Recommendation:" 
// - Suggest 1-2 specific visual elements that would complement this post
// - Be specific about what the image/visual should contain (e.g., "A split-screen comparison showing traditional vs. zero-budget marketing tactics")
// - Consider the emotional response the visual should evoke
// - For carousel posts, suggest a distinctive visual theme that could unite all slides
// - For video posts, suggest a simple visual structure or setting

// IMPORTANT: Do NOT include any introductory text like "Okay, here's a LinkedIn post draft..." or any instructions. Start directly with the LinkedIn post content.

// Format the response as a complete LinkedIn post, ready to copy and paste, with the Visual Recommendation section at the end.
// `;

////// ----- prompt that guides the user ----- /////

const prompt = `
You are a LinkedIn content coach.

Create a structured *LinkedIn post framework* using the following details:

PILLAR: ${pillar}
TOPIC: ${topic}
APPROACH: ${approach}
CONTENT TYPE: ${contentType}

USER'S COMMUNICATION STYLE: ${perspectiveLabel || "Not specified"}
USER'S DESIRED TONE: ${voiceLabel || "Not specified"}

The framework should:
1. Be formatted as a real LinkedIn post, but include placeholder prompts for the user to fill in
2. Include guidance in brackets (e.g. [Insert a personal story about...], [Share 1-2 key takeaways from...])
3. Still match the content type — e.g., carousel, video, etc.
4. Include 3-5 suggested hashtags
5. Include a sample CTA the user can customize
6. Match the style and tone as much as possible

VISUAL RECOMMENDATION SECTION:
- Add a short section at the end titled "📸 Visual Recommendation:"
- Suggest 1 or 2 visuals that would enhance the post
- Be specific and emotionally resonant

IMPORTANT: 
- Do NOT generate a finished post.
- Begin immediately with the post structure, using placeholder prompts and examples as needed.
`;

    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const post = response.text();
    
    // console.log("Successfully generated post");
    
    return Response.json({ post });
    
  } catch (error) {
    console.error("Detailed error:", error);
    return Response.json(
      {
        error: "Failed to generate LinkedIn post",
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}