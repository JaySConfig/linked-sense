// app/api/extract-strategy-data/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { messages } = await request.json();
    
    // Initialize Gemini
    const apiKey = process.env.GOOGLE_API;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Create extraction prompt - improved for stricter JSON output
    const extractionPrompt = `
      Based on our conversation about LinkedIn strategy, extract the information into JSON format.
      
      CRITICAL: Return ONLY raw JSON with no markdown formatting, explanation, or backticks.
      
      Extract this structure:
      {
        "industry": "user's industry",
        "role": "user's professional role",
        "linkedinGoals": ["1-2 goals they mentioned"],
        "targetAudience": ["1-2 audience groups they mentioned"],
        "desiredResults": ["1-2 results they want"],
        "areasOfExpertise": ["up to 3 areas they want to be known for"],
        "contentPillars": ["2-3 topics they want to post about"],
        "contentTypes": ["2-3 content formats they prefer"],
        "communicationStyle": "their communication style",
        "postingFrequency": "how often they'll post",
        "audienceChallenges": ["2-3 challenges their audience faces"],
        "audienceGoals": ["2-3 goals their audience has"]
      }
      
      DO NOT include any explanatory text, code block markers, or anything other than the JSON itself.
      NEVER use backticks or markdown formatting. No "{" or "\`\`\`json" before the JSON.
      The response should start with { and end with } with no other characters.
    `;
    
    // Format messages for extraction
    const formattedMessages = messages.map(msg => ({
      role: msg.isUser ? "user" : "model",
      parts: [{ text: msg.text }],
    }));
    
    // Add extraction request
    formattedMessages.push({
      role: "user",
      parts: [{ text: extractionPrompt }],
    });
    
    // Generate content with the model
    const result = await model.generateContent({
      contents: formattedMessages,
      generationConfig: {
        temperature: 0.1, // Low temperature for more deterministic output
      },
    });
    
    let responseText = result.response.text();
    
    // Clean up the response - remove any markdown code block markers
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // If it still starts with a backtick, remove it
    if (responseText.startsWith('`')) {
      responseText = responseText.substring(1);
    }
    
    // If it ends with a backtick, remove it
    if (responseText.endsWith('`')) {
      responseText = responseText.substring(0, responseText.length - 1);
    }
    
    // Parse the JSON response
    try {
      const strategyData = JSON.parse(responseText);
      return Response.json({ strategyData });
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      console.error("Raw response:", responseText);
      return Response.json(
        { error: "Failed to extract structured data", rawResponse: responseText },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Extraction error:", error);
    return Response.json(
      { error: "Failed to extract data" },
      { status: 500 }
    );
  }
}