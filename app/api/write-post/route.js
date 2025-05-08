import { GoogleGenerativeAI } from "@google/generative-ai";
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";

const limiter = new RateLimiterMemory({
  points: 5,          // 5 requests
  duration: 300,      // per 5 minutes
  blockDuration: 600  // Block for 10 minutes if exceeded
});



export const POST = async (request) => {
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
    const { postTopic, postTone, postType, postLength, keyTakeaway, callToAction } = await request.json();
    
    // Debug: Print all environment variables (be careful with sensitive info)
    // console.log("Available env vars:", Object.keys(process.env));
    // console.log("GOOGLE_API_KEY exists:", !!process.env.GOOGLE_API);
    // console.log("GOOGLE_API_KEY first 5 chars:", process.env.GOOGLE_API ? process.env.GOOGLE_API.substring(0, 5) : "undefined");
    
    // Debug: Check if API key is being loaded
    const apiKey = process.env.GOOGLE_API;
    if (!apiKey) {
      console.error("API key is undefined or empty");
      return Response.json(
        { error: "API key configuration error" },
        { status: 500 }
      );
    }
    

    
    // Initialize the API with your API key
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Create a prompt for the LinkedIn post
    const prompt = `
    You are an expert LinkedIn content writer. Your task is to generate a well-structured, engaging LinkedIn post based on the following user input.

        **Post Details:**
        - **Topic:** ${postTopic}
        - **Key Takeaways:** ${keyTakeaway}
        - **Post Type:** ${postType} (e.g., Thought Leadership, Personal Story, Industry Insights)
        - **Tone:** ${postTone} (e.g., Professional, Conversational, Inspirational)
        - **Post Length:** ${postLength} (e.g., Short, Medium, Long)
        - **Call to Action:** ${callToAction} (If “noCta,” do not include a CTA)

        ### **Guidelines:**
        - Write in a compelling, authentic LinkedIn style.
        - Use clear formatting, short paragraphs, and line breaks to enhance readability.
        - If **key takeaways** are provided, focus on delivering **valuable insights** around them.
        - If the **post type** is "thoughtLeadership," provide **unique perspectives** that spark discussion.
        - If a **CTA is included**, make it natural and engaging.

        ### **Example Output:**  
        For a **thought leadership post** on “AI in Marketing” with a **professional tone**, the output might look like this:

        ---
        💡 **AI is changing the marketing game—are you keeping up?**  

        In the last five years, we’ve seen AI go from a **buzzword** to a **game-changer**. But it’s not about replacing marketers—it’s about **enhancing creativity and efficiency**.  

        🔹 AI helps **personalize content at scale**  
        🔹 Automates repetitive tasks so teams focus on **strategy**  
        🔹 Provides **data-driven insights** for better decision-making  

        The question is: **How are you leveraging AI in your marketing strategy?**  

        #AI #Marketing #Innovation
        ---

        **Now, generate a LinkedIn post based on the provided inputs.** 🚀

    `;
    
    console.log("Sending prompt to Gemini API...");
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedPost = response.text();
    
    console.log("Successfully received response from Gemini API");
    
    return Response.json({ post: generatedPost });
  } catch (error) {
    console.error("Detailed error:", error);
    
    // Return a more detailed error message
    return Response.json(
      { 
        error: "Failed to generate post", 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}