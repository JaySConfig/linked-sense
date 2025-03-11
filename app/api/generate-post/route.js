import { GoogleGenerativeAI } from "@google/generative-ai";

export const writePOST = async (request) => {
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