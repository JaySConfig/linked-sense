import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (request) => {
  try {
    const { contentCategory, contentQuestion, postTone, callToAction, answerText } = await request.json();
    
    // Debug: Print all environment variables (be careful with sensitive info)
    console.log("Available env vars:", Object.keys(process.env));
    console.log("GOOGLE_API_KEY exists:", !!process.env.GOOGLE_API);
    console.log("GOOGLE_API_KEY first 5 chars:", process.env.GOOGLE_API ? process.env.GOOGLE_API.substring(0, 5) : "undefined");
    
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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Create a prompt for the LinkedIn post
    const prompt = `
    You're a linkedIn expert, use the following information to create a professional linkedIn post 
    that will generate engagement. ${answerText}. The tone should be ${postTone}. At the end of the post we will want to ${callToAction}
      Format it with emojis and hashtags as appropriate for LinkedIn.
      Keep it concise and engaging.
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