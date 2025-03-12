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
    You are a LinkedIn content expert skilled in crafting highly engaging, well-structured LinkedIn posts. 

      ### **Task**  
      Generate a LinkedIn post based on the following user inputs:  

      - **Content Category:** ${contentCategory}  
      - **Chosen Question:** ${contentQuestion}  
      - **User's Response:** ${answerText}  
      - **Post Tone:** ${postTone} (e.g., Professional, Conversational, Inspirational, Witty/Funny, Data-Driven)  
      - **Call to Action:** ${callToAction} (If "noCta", exclude a CTA)  

      ### **Guidelines:**  
      1️⃣ **Make it engaging & structured** – Use short paragraphs and line breaks for readability.  
      2️⃣ **Follow LinkedIn best practices** – Use **a strong hook** to grab attention.  
      3️⃣ **Include emojis and hashtags naturally** – But don’t overdo it.  
      4️⃣ **If a CTA is provided, make it compelling** – Ensure it flows naturally.  
      5️⃣ **Keep it concise** – Deliver value in a clear, engaging way.  

      ### **Example Output:**  
      For a **reflection post** on overcoming challenges, with a **conversational tone** and **CTA asking for engagement**, the output might look like this:

      ---
      🚀 **This week threw a curveball at me... but here’s what I learned!**  

      I faced a huge challenge when [describe user’s response]. At first, I struggled, but then I realized:  

      ✅ [Key takeaway 1]  
      ✅ [Key takeaway 2]  
      ✅ [Key takeaway 3]  

      This experience reminded me that [insight related to user’s answer].  

      💬 **What’s a challenge you overcame recently? Let’s share & learn from each other!**  

      #Leadership #Growth #LessonsLearned
      ---

      Now, using the provided inputs, craft a LinkedIn post following these principles.

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