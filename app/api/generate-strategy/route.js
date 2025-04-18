// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function POST(request) {
//   try {
//     // Get the submission data from the request
//     const submissionData = await request.json();
    
//     // Debug logging
//     console.log("Received submission data for strategy generation");
    
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
    
//     // Get answers from submission
//     const answers = submissionData.answers || {};
    
//     // Format the prompt with the answers
//     const prompt = createStrategyPrompt(answers);
    
//     console.log("Sending strategy generation prompt to Gemini API...");
    
//     // Generate content
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const strategy = response.text();
    
//     console.log("Successfully received strategy from Gemini API");
    
//     return Response.json({ strategy });
    
//   } catch (error) {
//     console.error("Detailed error:", error);
//     return Response.json(
//       {
//         error: "Failed to generate LinkedIn strategy",
//         details: error.message,
//         stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//       },
//       { status: 500 }
//     );
//   }
// }

// // Create the prompt for the Gemini API
// function createStrategyPrompt(answers) {
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
// Based on this user profile, create a comprehensive LinkedIn strategy in two main parts:

// ## PART 1: STRATEGIC FOUNDATION
// 1. **Executive Positioning Summary**: A compelling paragraph describing how the user should position themselves on LinkedIn based on their goals, expertise, and target audience.

// 2. **Content Pillars Analysis**: For each of the user's content pillars, provide:
//    - Clear definition of the pillar and its scope
//    - Why this pillar will resonate with their target audience
//    - How this pillar supports their primary goal
//    - 3 specific content ideas for this pillar

// 3. **Engagement Strategy**: Tactical recommendations for how they should engage with their audience based on their preferences.

// 4. **Growth & Measurement Plan**: Specific metrics to track based on their primary goals and realistic growth targets.

// ## PART 2: FOUR-WEEK CONTENT CALENDAR
// Create a detailed 4-week content plan with ${getPostingFrequencyCount(answers.postingFrequency)} posts per week (Monday-Friday).

// Format the content plan as a clear markdown table with these columns:
// | Week - Day | Pillar | Topic | Approach | Content Type |
// | ---------- | ------ | ----- | -------- | ------------ |
// | Week 1 - Monday | Pillar Name | Topic description | Detailed approach | Format details |

// In the 'Approach' column, explain the specific angle the post will take (educational, case study, myth-busting, etc.) with details on what points it will cover.

// In the 'Content Type' column, specify both the format (text, carousel, image, etc.) and what specific elements the content should include.

// Include at least one promotional post per week and one value-add resource (checklist, template, guide, etc.) per week.

// ### Output Formatting
// - Format your response as clean, readable markdown
// - Use headers, subheaders, and bullet points for clarity
// - Make all tables properly formatted with markdown syntax
// - Ensure every recommendation is specific and actionable

// Make this strategy both strategic and practical - something the user can implement immediately to build their LinkedIn presence.
// `;
// }

// // Helper function to get readable values for option-based answers
// function getReadableValue(value, questionId) {
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

// // Helper function to format content pillars
// function formatContentPillars(contentPillars, expertiseAreas) {
//   // Use content pillars if available, otherwise fall back to expertise areas
//   const pillars = contentPillars || expertiseAreas || [];
//   if (pillars.length === 0) return "Not specified";
  
//   return pillars.map((pillar, index) => `${index + 1}. ${pillar}`).join('\n');
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

// ///////// Logic from test app 

import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(request) {
  try {
    // Get the submission data from the request
    const submissionData = await request.json();
    
    // Debug logging
    console.log("Received submission data for strategy generation");
    
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
    
    // Format the prompt with the answers
    const prompt = createStrategyPrompt(answers);
    
    console.log("Sending strategy generation prompt to Gemini API...");
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const strategy = response.text();
    
    console.log("Successfully received strategy from Gemini API");
    
    return Response.json({ strategy });
    
  } catch (error) {
    console.error("Detailed error:", error);
    return Response.json(
      {
        error: "Failed to generate LinkedIn strategy",
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// // Create the prompt for the Gemini API
// function createStrategyPrompt(answers) {
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
// Based on this user profile, create a comprehensive LinkedIn strategy in two main parts:

// ## PART 1: STRATEGIC FOUNDATION
// 1. **Executive Positioning Summary**: A compelling paragraph describing how the user should position themselves on LinkedIn based on their goals, expertise, and target audience.

// 2. **Content Pillars Analysis**: For each of the user's content pillars, provide:
//    - Clear definition of the pillar and its scope
//    - Why this pillar will resonate with their target audience
//    - How this pillar supports their primary goal
//    - 3 specific content ideas for this pillar

// 3. **Engagement Strategy**: Tactical recommendations for how they should engage with their audience based on their preferences.

// 4. **Growth & Measurement Plan**: Specific metrics to track based on their primary goals and realistic growth targets.

// ## PART 2: FOUR-WEEK CONTENT CALENDAR
// Create a detailed 4-week content plan with ${getPostingFrequencyCount(answers.postingFrequency)} posts per week (Monday-Friday).

// Format the content plan as a clear markdown table with these columns:
// | Week - Day | Pillar | Topic | Approach | Content Type |
// | ---------- | ------ | ----- | -------- | ------------ |
// | Week 1 - Monday | Pillar Name | Topic description | Detailed approach | Format details |

// In the 'Approach' column, explain the specific angle the post will take (educational, case study, myth-busting, etc.) with details on what points it will cover.

// In the 'Content Type' column, specify both the format (text, carousel, image, etc.) and what specific elements the content should include.

// Include at least one promotional post per week and one value-add resource (checklist, template, guide, etc.) per week.

// ### Output Formatting
// - Format your response as clean, readable markdown
// - Use headers, subheaders, and bullet points for clarity
// - Make all tables properly formatted with markdown syntax
// - Ensure every recommendation is specific and actionable

// Make this strategy both strategic and practical - something the user can implement immediately to build their LinkedIn presence.
// `;
// }

// altered prompt to account for removed questions

// Create the prompt for the Gemini API
function createStrategyPrompt(answers) {
  return `
You are a LinkedIn strategy expert who helps executives and professionals build their personal brand on LinkedIn.

### Comprehensive User Profile
* Industry: ${getReadableValue(answers.industry, 'industry')}
* Professional Role: ${getReadableValue(answers.role, 'role')}
* Primary LinkedIn Goal: ${getReadableValue(answers.primaryGoal, 'primaryGoal')}
* Target Audience: ${getReadableValue(answers.targetAudience, 'targetAudience')}
* Commercial Objectives: ${getReadableValue(answers.commercialObjectives, 'commercialObjectives')}
* Communication Style: ${getReadableValue(answers.uniquePerspective, 'uniquePerspective')}
* Content Tone/Feel: ${getReadableValue(answers.userVoice, 'userVoice')}

### Audience Insights
* Pain Points/Challenges: ${formatArrayAnswer(answers.audienceChallenges)}
* Goals: ${formatArrayAnswer(answers.audienceGoals)}

### Content Strategy Foundation
* Content Pillars: ${formatArrayAnswer(answers.contentPillars)}
* Preferred Content Types: ${formatContentTypes(answers.contentTypes)}
* Posting Frequency: ${getReadableValue(answers.postingFrequency, 'postingFrequency')}


### Task
Based on this user profile, create a comprehensive LinkedIn strategy in two main parts:

## PART 1: STRATEGIC FOUNDATION
1. **Executive Positioning Summary**: A compelling paragraph describing how the user should position themselves on LinkedIn based on their professional role, goals, content pillars, and target audience. Use their content pillars as their domain of expertise - DO NOT use placeholders or ask for more information.

2. **Content Pillars Analysis**: For each of the user's content pillars, provide:
 - Clear definition of the pillar and its scope
 - Why this pillar will resonate with their target audience
 - How this pillar supports their primary goal
 - 3 specific content ideas for this pillar

3. **Engagement Strategy:** Provide 2-4 tactical recommendations for how this user should generally engage on LinkedIn to effectively reach their target audience (${getReadableValue(answers.targetAudience, 'targetAudience')}) and achieve their primary goal (${getReadableValue(answers.primaryGoal, 'primaryGoal')}). Recommend common effective methods (e.g., strategic commenting on relevant content, asking engaging questions in posts, participating in relevant groups) tailored to their role (${getReadableValue(answers.role, 'role')}) and objectives. Do NOT base this on specific user preferences for engagement methods like DMs vs Polls vs Live. // <-- Modified Instruction

4. **Growth & Measurement Plan**: Specific metrics to track based on their primary goals and realistic growth targets.

5.  **People & Pages to Follow:** Suggest 2-3 specific, well-known LinkedIn accounts relevant to the user's industry ('${industry}') and pillars (${pillars}). These could be individual thought leaders (provide full name) or relevant Company Pages (provide name). For each, briefly explain (1 sentence) the value of following them. **Do NOT suggest software tools or platforms.** If you cannot identify suitable specific accounts, list 2-3 *types* of accounts relevant to their field to search for (e.g., 'Keynote speakers at [Industry] conferences', 'Research publications for [Pillar Topic]', 'Relevant industry associations on LinkedIn'). // <-- Simplified & Reinforced Instruction

## PART 2: FOUR-WEEK CONTENT CALENDAR

**SCHEDULING & CONTENT INSTRUCTIONS:**
* Schedule exactly ${postingCount} posts for each of the 4 weeks on weekdays (Monday-Friday only).
* **Spread these ${postingCount} posts out across the work week.** Do NOT schedule multiple posts on the same day.
* **Good Distribution Examples:**
    * If scheduling 2 posts: Use days like Monday & Thursday, OR Tuesday & Friday.
    * If scheduling 3 posts: Use days like Monday, Wednesday, & Friday.
    * If scheduling 4 posts: Use days like Monday, Tuesday, Thursday, & Friday OR Monday, Wednesday, Thursday, & Friday.
    * If scheduling 5 posts: Use Monday, Tuesday, Wednesday, Thursday, Friday.
* **Bad Distribution Examples:** Do not schedule posts on consecutive days like Monday & Tuesday if only posting twice per week. Do not schedule all posts clustered at the start or end of the week (e.g., Monday & Friday is better than Monday & Tuesday for 2 posts).
* Topics should primarily derive from the user's Content Pillars... (rest of topic instructions remain same) ...
* Avoid focusing heavily on specific seasons... (rest of topic instructions remain same) ...
* Include at least one promotional post per week and one value-add resource per week...

Format the content plan as a clear markdown table with these columns:
| Week - Day | Pillar | Topic | Approach | Content Type |
| ---------- | ------ | ----- | -------- | ------------ |
| Week 1 - Monday | Pillar Name | Topic description | Detailed approach | Format details |

In the 'Approach' column, explain the specific angle the post will take (educational, case study, myth-busting, etc.) with details on what points it will cover.
In the 'Content Type' column, specify both the format (text, carousel, image, etc.) and what specific elements the content should include.
Include at least one promotional post per week and one value-add resource (checklist, template, guide, etc.) per week.

### IMPORTANT INSTRUCTIONS
- DO NOT use placeholders like [SPECIFY INDUSTRY] or ask for more information in your response.
- Use the content pillars provided by the user as their domain of expertise.
- Make all recommendations specific and actionable based on the information provided.
- If you need to reference the user's professional domain, refer to their content pillars directly.

### Output Formatting
- Format your response as clean, readable markdown
- Use headers, subheaders, and bullet points for clarity
- Make all tables properly formatted with markdown syntax
- Ensure every recommendation is specific and actionable

Make this strategy both strategic and practical - something the user can implement immediately to build their LinkedIn presence.
`;
}

// Helper function to get readable values for option-based answers
function getReadableValue(value, questionId) {
  if (!value) return "Not specified";
  
  // Mapping of internal values to readable text
  const valueMapping = {
    // Industry values
    technology: "Technology & Software",
    finance: "Finance & Banking",
    healthcare: "Healthcare & Wellness",
    education: "Education & Training",
    marketing: "Marketing & Advertising",
    ecommerce: "E-commerce & Retail",
    consulting: "Consulting & Professional Services",
    manufacturing: "Manufacturing & Engineering",
    media: "Media & Entertainment",
    industry_other: "Other",
    
    // Role values
    executive: "Executive/C-Suite",
    manager: "Manager/Director",
    founder: "Founder/Entrepreneur",
    consultant: "Consultant/Advisor",
    specialist: "Specialist/Individual Contributor",
    role_other: "Other",
    
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
    tone_storytelling: "Storytelling & Relatable",
    
    // Posting frequency
    "1-2": "1-2 times per week",
    "3-4": "3-4 times per week",
    "5": "5 times per week",
    
    // Engagement methods
    commenting: "Commenting on industry posts",
    polls: "Running polls & discussions",
    DMs: "Building connections through DMs",
    live: "Hosting LinkedIn Live sessions",
    
    // Content types
    content_storytelling: "Storytelling (Personal experiences & insights)",
    controversial: "Controversial Takes (Challenging industry norms)",
    educational: "Educational How-To Guides (Step-by-step breakdowns)",
    dataDriven: "Data-Driven Insights (Using research & stats)",
    engagement: "Engagement-Driven Posts (Polls, questions, carousels)",
    caseStudies: "Case Studies & Testimonials (Proof-based content)",
    promotional: "Promotional & Lead-Generation Posts (Sales-focused content)"
  };
  
  // For single values
  if (typeof value === 'string') {
    return valueMapping[value] || value;
  }
  
  // Return the original value if no mapping exists
  return value;
}

// Helper function to format array answers
function formatArrayAnswer(array) {
  if (!array || array.length === 0) return "Not specified";
  
  return array.map(item => `- ${item}`).join('\n');
}

// Helper function to format content pillars
function formatContentPillars(contentPillars, expertiseAreas) {
  // Use content pillars if available, otherwise fall back to expertise areas
  const pillars = contentPillars || expertiseAreas || [];
  if (pillars.length === 0) return "Not specified";
  
  return pillars.map((pillar, index) => `${index + 1}. ${pillar}`).join('\n');
}

// Helper function to format content types
function formatContentTypes(contentTypes) {
  if (!contentTypes || contentTypes.length === 0) return "Not specified";
  
  const typeDescriptions = {
    storytelling: "Storytelling (Personal experiences & insights)",
    controversial: "Controversial Takes (Challenging industry norms)",
    educational: "Educational How-To Guides (Step-by-step breakdowns)",
    dataDriven: "Data-Driven Insights (Using research & stats)",
    engagement: "Engagement-Driven Posts (Polls, questions, carousels)",
    caseStudies: "Case Studies & Testimonials (Proof-based content)",
    promotional: "Promotional & Lead-Generation Posts (Sales-focused content)"
  };
  
  return contentTypes.map((type, index) => {
    const description = typeDescriptions[type] || type;
    return `${index + 1}. ${description}`;
  }).join('\n');
}

// Helper function to get the number of posts per week
function getPostingFrequencyCount(frequency) {
  if (frequency === "1-2") return "2";
  if (frequency === "3-4") return "4";
  if (frequency === "5") return "5";
  return "3"; // Default
}