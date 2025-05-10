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
    // Get the submission data from the request
    const submissionData = await request.json();
    
    // console.log("Received submission data for foundation generation");
    
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
    
    // Get answers from submission
    const answers = submissionData.answers || {};
    
    // Format the prompt for foundation only
    const prompt = createFoundationPrompt(answers);
    
    // console.log("Sending foundation generation prompt to Gemini API...");
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const foundation = response.text();
    
    // console.log("Successfully received foundation from Gemini API");
    
    return Response.json({ foundation });
    
  } catch (error) {
    console.error("Detailed error:", error);
    return Response.json(
      {
        error: "Failed to generate LinkedIn strategy foundation",
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// // Create the prompt for foundation only
// function createFoundationPrompt(answers) {
//   return `
// You are a LinkedIn strategy expert who helps executives and professionals build their personal brand on LinkedIn.

// ### Comprehensive User Profile
// * Industry: ${getReadableValue(answers.industry, 'industry')}
// * Professional Role: ${getReadableValue(answers.role, 'role')}
// * Products/Services: ${formatArrayAnswer(answers.offering)}
// * Primary LinkedIn Goal: ${getReadableValue(answers.primaryGoal, 'primaryGoal')}
// * Target Audience: ${getReadableValue(answers.targetAudience, 'targetAudience')}
// * Commercial Objectives: ${getReadableValue(answers.commercialObjectives, 'commercialObjectives')} 
// * Communication Style: ${getReadableValue(answers.uniquePerspective, 'uniquePerspective')}
// * Content Tone/Feel: ${getReadableValue(answers.userVoice, 'userVoice')}
// * Posting Frequency: ${getReadableValue(answers.postingFrequency, 'postingFrequency')}

// ### Audience Insights
// * Pain Points/Challenges: ${formatArrayAnswer(answers.audienceChallenges)}
// * Fears: ${formatArrayAnswer(answers.audienceFears)}
// * Goals: ${formatArrayAnswer(answers.audienceGoals)}

// ### Content Strategy Foundation
// * Expertise Areas: ${formatArrayAnswer(answers.expertiseAreas)}
// * Content Pillars: ${formatArrayAnswer(answers.contentPillars)}
// * Preferred Content Types: ${formatContentTypes(answers.contentTypes)}
// * Engagement Preferences: ${formatArrayAnswer(answers.engagementStyle)}

// ### Task
// Based on this user profile, create the strategic foundation for their LinkedIn presence:

// ## STRATEGIC FOUNDATION
// 1. **Executive Positioning Summary**: A compelling paragraph describing how the user should position themselves on LinkedIn based on their goals, expertise, and target audience.

// 2. **Content Pillars Analysis**: For each of the user's content pillars, provide:
//    - Clear definition of the pillar and its scope
//    - Why this pillar will resonate with their target audience
//    - How this pillar supports their primary goal
//    - 3 specific content ideas for this pillar

// 3. **Engagement Strategy**: Tactical recommendations for how they should engage with their audience based on their preferences.

// 4. **Growth & Measurement Plan**: Specific metrics to track based on their primary goals and realistic growth targets.

// 5.  **People & Pages to Follow:** Suggest 2-3 specific, well-known LinkedIn accounts relevant to the user's industry ('${getReadableValue(answers.industry, 'industry')}') and pillars (${getReadableValue(answers.contentPillars, 'contentPillars')}). These could be individual thought leaders (provide full name) or relevant Company Pages (provide name). For each, briefly explain (1 sentence) the value of following them. **Do NOT suggest software tools or platforms.** If you cannot identify suitable specific accounts, list 2-3 *types* of accounts relevant to their field to search for (e.g., 'Keynote speakers at [Industry] conferences', 'Research publications for [Pillar Topic]', 'Relevant industry associations on LinkedIn'). // <-- Simplified & Reinforced Instruction

// ### Output Formatting
// - Format your response as clean, readable markdown
// - Use headers, subheaders, and bullet points for clarity
// - Ensure every recommendation is specific and actionable
// - Keep the strategy both strategic and practical

// Make this strategic foundation something the user can implement immediately to build their LinkedIn presence.
// `;
// }

// // Helper function to get readable values for option-based answers
// function getReadableValue(value) {
//   if (!value) return "Not specified";
  
//   // Mapping of internal values to readable text
//   const valueMapping = {
//     // Industry values
//     technology: "Technology & Software",
//     finance: "Finance & Banking",
//     healthcare: "Healthcare & Wellness",
//     education: "Education & Training",
//     marketing: "Marketing & Advertising",
//     ecommerce: "E-commerce & Retail",
//     consulting: "Consulting & Professional Services",
//     manufacturing: "Manufacturing & Engineering",
//     media: "Media & Entertainment",
//     industry_other: "Other",
    
//     // Role values
//     executive: "Executive/C-Suite",
//     manager: "Manager/Director",
//     founder: "Founder/Entrepreneur",
//     consultant: "Consultant/Advisor",
//     specialist: "Specialist/Individual Contributor",
//     role_other: "Other",
    
//     // Primary goals
//     thoughtLeadership: "Thought Leadership",
//     leadGeneration: "Lead Generation",
//     careerGrowth: "Career Growth",
//     communityBuilding: "Community Building",
//     brandAwareness: "PR/Brand Awareness",
    
//     // Target audience
//     executives: "Senior Executives & Decision Makers",
//     peers: "Industry Peers & Colleagues",
//     clients: "Potential Clients & Customers",
//     recruiters: "Recruiters & Hiring Managers",
//     investors: "Investors & Stakeholders",
    
//     // Commercial objectives
//     driveSales: "Drive Sales",
//     attractJobOffers: "Attract Job Offers",
//     secureFunding: "Secure Funding",
//     establishCredibility: "Establish Credibility",
//     expandNetwork: "Expand Professional Network",
    
//     // Communication style
//     analytical: "Analytical (Breaks down complex ideas with logic & data)",
//     inspiring: "Inspiring (Motivates with personal stories & big-picture thinking)",
//     challenging: "Challenging (Questions norms & disrupts industry beliefs)",
//     informative: "Informative (Provides structured knowledge through education & tutorials)",
    
//     // Content tone
//     professional: "Professional & Insightful",
//     casual: "Casual & Conversational",
//     authoritative: "Authoritative & Bold",
//     tone_storytelling: "Storytelling & Relatable",
    
//     // Posting frequency
//     "1-2": "1-2 times per week",
//     "3-4": "3-4 times per week",
//     "5": "5 times per week",
    
//     // Engagement methods
//     commenting: "Commenting on industry posts",
//     polls: "Running polls & discussions",
//     DMs: "Building connections through DMs",
//     live: "Hosting LinkedIn Live sessions",
    
//     // Content types
//     content_storytelling: "Storytelling (Personal experiences & insights)",
//     controversial: "Controversial Takes (Challenging industry norms)",
//     educational: "Educational How-To Guides (Step-by-step breakdowns)",
//     dataDriven: "Data-Driven Insights (Using research & stats)",
//     engagement: "Engagement-Driven Posts (Polls, questions, carousels)",
//     caseStudies: "Case Studies & Testimonials (Proof-based content)",
//     promotional: "Promotional & Lead-Generation Posts (Sales-focused content)"
//   };
  
//   // For single values
//   if (typeof value === 'string') {
//     return valueMapping[value] || value;
//   }
  
//   // Return the original value if no mapping exists
//   return value;
// }

// // Helper function to format array answers
// function formatArrayAnswer(array) {
//   if (!array || array.length === 0) return "Not specified";
  
//   return array.map(item => `- ${item}`).join('\n');
// }

// // Helper function to format content types
// function formatContentTypes(contentTypes) {
//   if (!contentTypes || contentTypes.length === 0) return "Not specified";
  
//   const typeDescriptions = {
//     storytelling: "Storytelling (Personal experiences & insights)",
//     controversial: "Controversial Takes (Challenging industry norms)",
//     educational: "Educational How-To Guides (Step-by-step breakdowns)",
//     dataDriven: "Data-Driven Insights (Using research & stats)",
//     engagement: "Engagement-Driven Posts (Polls, questions, carousels)",
//     caseStudies: "Case Studies & Testimonials (Proof-based content)",
//     promotional: "Promotional & Lead-Generation Posts (Sales-focused content)"
//   };
  
//   return contentTypes.map((type, index) => {
//     const description = typeDescriptions[type] || type;
//     return `${index + 1}. ${description}`;
//   }).join('\n');
// }

// // Helper function to get the number of posts per week
// function getPostingFrequencyCount(frequency) {
//   if (frequency === "1-2") return "2";
//   if (frequency === "3-4") return "4";
//   if (frequency === "5") return "5";
//   return "3"; // Default
// }

////////// ----- new gemini prompt -----




// Create the prompt for foundation only
function createFoundationPrompt(answers) {

  // --- Inputs based on the 12 active questions ---
  // Assuming answers.industry and answers.role are now strings from tagInput
  const industry = answers.industry || "Not specified";
  const role = answers.role || "Not specified";
  const primaryGoal = getReadableValue(answers.primaryGoal);
  const targetAudience = getReadableValue(answers.targetAudience);
  const commercialObjectives = getReadableValue(answers.commercialObjectives);
  const audienceChallenges = formatArrayAnswer(answers.audienceChallenges);
  const audienceGoals = formatArrayAnswer(answers.audienceGoals);
  const uniquePerspective = getReadableValue(answers.uniquePerspective);
  const contentPillars = answers.contentPillars || []; // Keep as array for processing, format for display
  const formattedContentPillars = formatArrayAnswer(contentPillars);
  const contentTypes = answers.contentTypes || []; // Keep as array
  const formattedContentTypes = formatContentTypes(contentTypes);
  const postingFrequency = getReadableValue(answers.postingFrequency);
  const userVoice = getReadableValue(answers.userVoice);

  // --- NOTE: References to commented-out questions removed ---

  // return `You are an expert LinkedIn strategist and personal branding coach specializing in helping professionals and executives elevate their presence and achieve their goals. Your advice is practical, actionable, and tailored.

  //   ### User Profile & Goals Provided
  //   * **Industry:** ${industry}
  //   * **Professional Role:** ${role}
  //   * **Primary LinkedIn Goal:** ${primaryGoal}
  //   * **Target Audience on LinkedIn:** ${targetAudience}
  //   * **Commercial Objectives:** ${commercialObjectives}

  //   ### Audience Insights Provided by User
  //   * **Audience Challenges/Pain Points:** ${audienceChallenges}
  //   * **Audience Goals/Aspirations:** ${audienceGoals}

  //   ### User's Content & Persona Choices
  //   * **Natural Communication Style:** ${uniquePerspective}
  //   * **Recurring Content Pillars/Topics:** ${formattedContentPillars}
  //   * **Preferred Content Types:** ${formattedContentTypes}
  //   * **Desired Content Tone/Feel:** ${userVoice}
  //   * **Desired Posting Frequency:** ${postingFrequency}

  //   ---

  //   ### Your Task: Create a Strategic Foundation

  //   Based *only* on the specific information provided above, generate a clear, actionable strategic foundation for this user's LinkedIn presence. Ensure all recommendations directly stem from and reference the user's profile, goals, audience insights, and content choices.

  //   ## STRATEGIC FOUNDATION

  //   1.  **Executive Positioning Statement:**
  //       * Craft a compelling paragraph (3-4 sentences) defining the user's unique positioning on LinkedIn.
  //       * **Synthesize:** Explicitly blend their **Professional Role**, **Industry**, **Primary Goal**, and **Target Audience**.
  //       * **Focus:** Highlight the core value proposition they offer to their specific Target Audience.

  //   2.  **Content Pillars Analysis & Activation:**
  //       * For each **Content Pillar** topic provided by the user:
  //           * Provide a clear definition and scope for this pillar, relevant to their Role and Industry.
  //           * Explain *specifically* why content under this pillar will resonate with their **Target Audience**, referencing the Audience's **Challenges** OR **Goals**.
  //           * Describe how consistently posting about this pillar directly supports the user's **Primary LinkedIn Goal** and potentially their **Commercial Objectives**.
  //           * Generate 3 distinct and specific content ideas for this pillar. Each idea should align with at least one of the user's **Preferred Content Types** and reflect their chosen **Content Tone/Feel** and **Communication Style**.

  //   3.  **Targeted Engagement Strategy:**
  //       * Provide 2-3 tactical recommendations for *how* and *where* the user should engage on LinkedIn to reach their **Target Audience** and achieve their **Primary Goal**.
  //       * Consider their **Posting Frequency** and **Content Tone/Feel** when suggesting engagement tactics.
  //       * Focus on quality over quantity.

  //   4.  **Growth & Measurement Plan:**
  //       * Identify 2-3 specific Key Performance Indicators (KPIs) the user should track to measure progress towards their **Primary LinkedIn Goal** and **Commercial Objectives**.
  //       * For each KPI, explain *why* it's relevant to their specific goals.
  //       * Suggest a realistic focus for the first 3 months based on their chosen **Posting Frequency**.

  //   5.  **People & Pages to Follow:**
  //       * Suggest 2-3 specific, well-known LinkedIn accounts relevant to the user's specified **Industry** and **Content Pillars** (listed in the profile above).
  //       * These could be individual thought leaders (provide full name) or relevant Company Pages (provide name).
  //       * For each suggestion, briefly explain (1 sentence) the value of following them (e.g., for industry insights, content inspiration, understanding audience conversations).
  //       * **Do NOT suggest software tools or platforms.**
  //       * **Fallback:** If you cannot identify suitable specific accounts based on the provided information, list 2-3 *types* of accounts relevant to their field to search for (e.g., 'Keynote speakers at ${industry} conferences', 'Research publications for ${contentPillars.length > 0 ? contentPillars[0] : 'their main topic'}', 'Relevant industry associations on LinkedIn').

  //   ### Critical Output Formatting Requirements:
  //   * **Format:** Use clean Markdown with clear headers (\`##\`, \`**\`), sub-headers, and bullet points (\`*\` or \`-\`).
  //   * **Actionability:** Every recommendation MUST be specific and actionable. Avoid vague advice.
  //   * **Conciseness:** Be thorough but avoid unnecessary jargon or fluff.
  //   * **Relevance:** Ensure every part of the output directly relates back to the user's provided inputs. Do not introduce concepts not derived from the profile.

  //   Create a practical foundation the user can immediately use to guide their LinkedIn activities.`;

//  new claude prompt for shorter output and summary.

return  `You are an expert LinkedIn strategist and personal branding coach specializing in helping professionals and executives elevate their presence and achieve their goals. Your advice is practical, actionable, and tailored.

### User Profile & Goals Provided
* **Industry:** ${industry}
* **Professional Role:** ${role}
* **Primary LinkedIn Goal:** ${primaryGoal}
* **Target Audience on LinkedIn:** ${targetAudience}
* **Commercial Objectives:** ${commercialObjectives}

### Audience Insights Provided by User
* **Audience Challenges/Pain Points:** ${audienceChallenges}
* **Audience Goals/Aspirations:** ${audienceGoals}

### User's Content & Persona Choices
* **Natural Communication Style:** ${uniquePerspective}
* **Recurring Content Pillars/Topics:** ${formattedContentPillars}
* **Preferred Content Types:** ${formattedContentTypes}
* **Desired Content Tone/Feel:** ${userVoice}
* **Desired Posting Frequency:** ${postingFrequency}

---

### Your Task: Create a Strategic Foundation

Based *only* on the specific information provided above, generate a clear, actionable strategic foundation for this user's LinkedIn presence. Ensure all recommendations directly stem from and reference the user's profile, goals, audience insights, and content choices.

## STRATEGIC FOUNDATION

1. **Executive Summary:**
   * Begin with a concise 3-5 sentence overview of the complete strategy
   * Highlight the core positioning, key focus areas, and expected outcomes
   * This should provide a quick, scannable version of the entire strategy

2. **Executive Positioning Statement:**
   * Craft a compelling paragraph (3-4 sentences) defining the user's unique positioning on LinkedIn
   * **Synthesize:** Explicitly blend their **Professional Role**, **Industry**, **Primary Goal**, and **Target Audience**
   * **Focus:** Highlight the core value proposition they offer to their specific Target Audience

3. **Content Pillars Analysis:**
   * For each **Content Pillar** topic provided by the user:
     * Provide a clear definition and scope for this pillar, relevant to their Role and Industry
     * Explain *specifically* why content under this pillar will resonate with their **Target Audience**, referencing the Audience's **Challenges** OR **Goals**
     * Describe how consistently posting about this pillar directly supports the user's **Primary LinkedIn Goal** and potentially their **Commercial Objectives**
   * **Do NOT include specific content examples** - these will be provided in the content calendar

4. **Targeted Engagement Strategy:**
   * Provide 2-3 tactical recommendations for *how* and *where* the user should engage on LinkedIn to reach their **Target Audience** and achieve their **Primary Goal**
   * Consider their **Posting Frequency** and **Content Tone/Feel** when suggesting engagement tactics
   * Include specific actions (e.g., "Comment on posts from [specific type of industry leader] sharing [specific type of content]")
   * Focus on quality over quantity

5. **Growth & Measurement Plan:**
   * Identify 2 specific Key Performance Indicators (KPIs) the user should track to measure progress towards their **Primary LinkedIn Goal** and **Commercial Objectives**
   * For each KPI, explain *why* it's relevant to their specific goals and provide a realistic 90-day target
   * Choose KPIs that are easy to track and directly connected to the stated goals

6. **People & Pages to Follow:**
   * Suggest 2-3 specific, well-known LinkedIn accounts relevant to the user's specified **Industry** and **Content Pillars**
   * These could be individual thought leaders (provide full name) or relevant Company Pages (provide name)
   * For each suggestion, briefly explain (1 sentence) the value of following them
   * **Fallback:** If you cannot identify suitable specific accounts, list 2-3 *types* of accounts relevant to their field to search for

### Critical Output Formatting Requirements:
* **Format:** Use clean Markdown with clear headers (\`##\`, \`**\`), sub-headers, and bullet points (`*` or `-`)
* **Actionability:** Every recommendation MUST be specific and actionable. Avoid vague advice
* **Conciseness:** Be thorough but avoid unnecessary jargon or fluff
* **Relevance:** Ensure every part of the output directly relates back to the user's provided inputs

Create a practical foundation the user can immediately use to guide their LinkedIn activities.`


}

// --- Keep your existing helper functions below ---

// Helper function to get readable values for option-based answers
// (Ensure mappings are clean and only include active question options)
function getReadableValue(value) {
    if (!value) return "Not specified";
    const valueMapping = {
        // Primary goals
        thoughtLeadership: "Thought Leadership",
        leadGeneration: "Lead Generation",
        careerGrowth: "Career Growth",
        communityBuilding: "Community Building",
        brandAwareness: "PR/Brand Awareness",
        // Target audience
        executives: "Senior Executives & Decision Makers",
        peers: "Industry Peers & Colleagues",
        clients: "Potential Clients & Customers",
        recruiters: "Recruiters & Hiring Managers",
        investors: "Investors & Stakeholders",
        // Commercial objectives
        driveSales: "Drive Sales",
        attractJobOffers: "Attract Job Offers",
        secureFunding: "Secure Funding",
        establishCredibility: "Establish Credibility",
        expandNetwork: "Expand Professional Network",
        // Communication style
        analytical: "Analytical (Breaks down complex ideas with logic & data)",
        inspiring: "Inspiring (Motivates with personal stories & big-picture thinking)",
        challenging: "Challenging (Questions norms & disrupts industry beliefs)",
        informative: "Informative (Provides structured knowledge through education & tutorials)",
        // Content tone
        professional: "Professional & Insightful",
        casual: "Casual & Conversational",
        authoritative: "Authoritative & Bold",
        storytelling: "Storytelling & Relatable",
        // Posting frequency
        "1-2": "1-2 times per week",
        "3-4": "3-4 times per week",
        "5": "5 times per week",
    };
    if (typeof value === 'string') {
        return valueMapping[value] || value;
    }
    return value;
}

// Helper function to format array answers (like multi-tagInput or multiSelect results)
function formatArrayAnswer(array) {
    if (!array || !Array.isArray(array) || array.length === 0) return "Not specified";
    const validItems = array.filter(item => typeof item === 'string' && item.trim() !== '');
    if (validItems.length === 0) return "Not specified";
    return validItems.map(item => `- ${item.trim()}`).join('\n');
}

// Helper function to format content types (multiSelect)
function formatContentTypes(contentTypes) {
    if (!contentTypes || !Array.isArray(contentTypes) || contentTypes.length === 0) return "Not specified";
    const typeDescriptions = {
        storytelling: "Storytelling (Personal experiences & insights)",
        controversial: "Controversial Takes (Challenging industry norms)",
        educational: "Educational How-To Guides (Step-by-step breakdowns)",
        dataDriven: "Data-Driven Insights (Using research & stats)",
        engagement: "Engagement-Driven Posts (Polls, questions, carousels)",
        caseStudies: "Case Studies & Testimonials (Proof-based content)",
        promotional: "Promotional & Lead-Generation Posts (Sales-focused content)"
    };
    const validTypes = contentTypes.filter(type => typeof type === 'string' && typeDescriptions[type]);
    if (validTypes.length === 0) return "Not specified";
    return validTypes.map((type, index) => {
        const description = typeDescriptions[type];
        return `${index + 1}. ${description}`;
    }).join('\n');
}