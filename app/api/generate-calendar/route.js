import { GoogleGenerativeAI } from "@google/generative-ai";
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";

import { format, getQuarter } from 'date-fns'

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
  // try {
  //   // Get the submission data from the request
  //   const submissionData = await request.json();
    
  //   if (!foundation) {
  //     return res.status(400).json({ error: 'Missing foundation in request body' });
  //   }
    
  //   if (!submissionData || !submissionData.answers) {
  //     return res.status(400).json({ error: 'Missing submission data in request body' });
  //   }
    
  //   console.log("Received submission data for calendar generation");
    
  //   // Get API key
  //   const apiKey = process.env.GOOGLE_API;
  //   if (!apiKey) {
  //     console.error("API key is undefined or empty");
  //     return Response.json(
  //       { error: "API key configuration error" },
  //       { status: 500 }
  //     );
  //   }
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
    // Parse the request body ONCE
    const requestData = await request.json();
    
    // Destructure correctly
    const { foundation, ...submissionData } = requestData;
    
    // Validate inputs
    if (!foundation) {
      console.error("Missing foundation in request body");
      return Response.json(
        { error: 'Missing foundation in request body' },
        { status: 400 }
      );
    }

    if (!submissionData || !submissionData.answers) {
      console.error("Missing or invalid submission data", submissionData);
      return Response.json(
        { error: 'Missing submission data in request body' },
        { status: 400 }
      );
    }
    
    // console.log("Received submission data for calendar generation");
    
    // Get API key - THIS IS THE FIX - GET API KEY CORRECTLY
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
    
    // Get answers and foundation from submission
    const answers = submissionData.answers || {};

     // --- Get Current Date Info ---
     const now = new Date();
     const currentYear = now.getFullYear(); // e.g., 2025
     const currentMonthName = format(now, 'MMMM'); // e.g., "April" using date-fns format
     const currentQuarter = getQuarter(now); // e.g., 2 (for Q2) using date-fns getQuarter
     // --- End Date Info ---
 
    
    // Format the prompt for calendar only
    const prompt = createCalendarPrompt(answers, foundation, currentYear, currentMonthName);
    
    // console.log("Sending calendar generation prompt to Gemini API...");
    // console.log("Prompt Data:", { currentYear, currentMonthName, currentQuarter, postingFrequency: answers.postingFrequency }); // Log context


    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const calendar = response.text();
    
    // console.log("Successfully received calendar from Gemini API");
    
    return Response.json({ calendar });
    
  } catch (error) {
    console.error("Detailed error:", error);
    return Response.json(
      {
        error: "Failed to generate LinkedIn content calendar",
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// // Create the prompt for calendar only
// function createCalendarPrompt(answers, foundation) {
//   return `
// You are a LinkedIn strategy expert who helps executives and professionals build their personal brand on LinkedIn.

// ### Comprehensive User Profile
// * Industry: ${getReadableValue(answers.industry, 'industry')}
// * Professional Role: ${getReadableValue(answers.role, 'role')}
// * Primary LinkedIn Goal: ${getReadableValue(answers.primaryGoal, 'primaryGoal')}
// * Target Audience: ${getReadableValue(answers.targetAudience, 'targetAudience')}
// * Commercial Objectives: ${getReadableValue(answers.commercialObjectives, 'commercialObjectives')} 
// * Communication Style: ${getReadableValue(answers.uniquePerspective, 'uniquePerspective')}
// * Content Tone/Feel: ${getReadableValue(answers.userVoice, 'userVoice')}
// * Posting Frequency: ${getReadableValue(answers.postingFrequency, 'postingFrequency')}

// ### Content Strategy Foundation
// * Content Pillars: ${formatArrayAnswer(answers.contentPillars)}
// * Preferred Content Types: ${formatContentTypes(answers.contentTypes)}
// * Engagement Preferences: ${formatArrayAnswer(answers.engagementStyle)}

// ### Previously Generated Strategy Foundation
// ${foundation}

// ### Task
// Based on this user profile and the previously generated strategy foundation, create a detailed 4-week content calendar:

// ## FOUR-WEEK CONTENT CALENDAR
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
// - Ensure the table is properly formatted with markdown syntax
// - Make the calendar specific and actionable

// Focus ONLY on the content calendar in your response.
// `;
// }

// ///// new prompt that calculates posts per week 

// In app/api/generate-calendar/route.js

// --- Make sure helper functions are accessible here ---
// getReadableValue, formatArrayAnswer, formatContentTypes, getPostingFrequencyCount

// function createCalendarPrompt(answers, foundation) {
//   // Calculate the target number of posts per week
//   // Your helper currently returns "4" for "3-4". Let's use that.
//   const postingCount = getPostingFrequencyCount(answers.postingFrequency); // e.g., "4"
//   const postsPerWeekText = `${postingCount} posts per week`;
//   // Calculate total expected posts for clearer instruction (optional)
//   const totalPosts = 4 * parseInt(postingCount, 10); // e.g., 16

//   return `
// You are a LinkedIn strategy expert who helps executives and professionals build their personal brand on LinkedIn. Your output must be only the requested markdown table.

// ### Comprehensive User Profile
// * Industry: ${getReadableValue(answers.industry, 'industry')}
// * Professional Role: ${getReadableValue(answers.role, 'role')}
// * Primary LinkedIn Goal: ${getReadableValue(answers.primaryGoal, 'primaryGoal')}
// * Target Audience: ${getReadableValue(answers.targetAudience, 'targetAudience')}
// * Commercial Objectives: ${getReadableValue(answers.commercialObjectives, 'commercialObjectives')}
// * Communication Style: ${getReadableValue(answers.uniquePerspective, 'uniquePerspective')}
// * Content Tone/Feel: ${getReadableValue(answers.userVoice, 'userVoice')}
// * Posting Frequency: ${getReadableValue(answers.postingFrequency, 'postingFrequency')}

// ### Content Strategy Foundation
// * Content Pillars: ${formatArrayAnswer(answers.contentPillars)}
// * Preferred Content Types: ${formatContentTypes(answers.contentTypes)}
// * Engagement Preferences: ${formatArrayAnswer(answers.engagementStyle)}

// ### Previously Generated Strategy Foundation
// ${foundation}

// ### Task
// Based on this user profile and the previously generated strategy foundation, create a detailed 4-week content calendar:

// ## FOUR-WEEK CONTENT CALENDAR
// Create a detailed 4-week content plan with ${postsPerWeekText} (Monday-Friday).

// **IMPORTANT SCHEDULING INSTRUCTIONS:**
// * Schedule exactly ${postingCount} posts for each of the 4 weeks.
// * Distribute these ${postingCount} posts across **different weekdays (Monday to Friday)** each week. For example, if posting 4 times, use days like Monday, Tuesday, Thursday, Friday, or Monday, Wednesday, Thursday, Friday.
// * Aim for an even distribution throughout the week.
// * **Do NOT schedule multiple posts on the same day within the same week.**

// Format the content plan as a clear markdown table with these columns:
// | Week - Day | Pillar | Topic | Approach | Content Type |
// | ---------- | ------ | ----- | -------- | ------------ |
// | Week 1 - Monday | Pillar Name | Topic description | Detailed approach | Format details |
// | ... (Ensure exactly ${totalPosts} data rows plus header/separator) ... | ... | ... | ... | ... |

// In the 'Approach' column, explain the specific angle the post will take (educational, case study, myth-busting, etc.) with details on what points it will cover.

// In the 'Content Type' column, specify both the format (text, carousel, image, etc.) and what specific elements the content should include.

// Include at least one promotional post per week and one value-add resource (checklist, template, guide, etc.) per week.

// ### Output Formatting
// - Format your response as clean, readable markdown.
// - Ensure the table is properly formatted with markdown syntax.
// - Make the calendar specific and actionable.
// - Output ONLY the content calendar section starting with the '## FOUR-WEEK CONTENT CALENDAR' heading and the markdown table itself. Do not include any preamble or concluding remarks.
// `;
// }


/// includes season

// In app/api/generate-calendar/route.js

// Update function signature
function createCalendarPrompt(answers, foundation, currentYear, currentMonthName, currentQuarter) {
  const postingCount = getPostingFrequencyCount(answers.postingFrequency);
  const postsPerWeekText = `${postingCount} posts per week`;
  const totalPosts = 4 * parseInt(postingCount, 10);

  // Determine Season (simple example for Northern Hemisphere)
  const monthNum = new Date().getMonth() + 1; // 1 (Jan) - 12 (Dec)
  let season = 'Winter';
  if (monthNum >= 3 && monthNum <= 5) season = 'Spring';
  else if (monthNum >= 6 && monthNum <= 8) season = 'Summer';
  else if (monthNum >= 9 && monthNum <= 11) season = 'Autumn';

  return `
You are a LinkedIn strategy expert creating timely, relevant content plans.

### Comprehensive User Profile
* Industry: ${getReadableValue(answers.industry, 'industry')}
* Role: ${getReadableValue(answers.role, 'role')}
* Goal: ${getReadableValue(answers.primaryGoal, 'primaryGoal')}
* Audience: ${getReadableValue(answers.targetAudience, 'targetAudience')}
* Objectives: ${getReadableValue(answers.commercialObjectives, 'commercialObjectives')}
* Style: ${getReadableValue(answers.uniquePerspective, 'uniquePerspective')}
* Tone: ${getReadableValue(answers.userVoice, 'userVoice')}
* Frequency: ${getReadableValue(answers.postingFrequency, 'postingFrequency')}

### Current Temporal Context
* Year: ${currentYear}
* Month: ${currentMonthName}
* Quarter: Q${currentQuarter}
* Season: ${season}

### Content Strategy Foundation
* Pillars: ${formatArrayAnswer(answers.contentPillars)}
* Preferred Types: ${formatContentTypes(answers.contentTypes)}
* Engagement: ${formatArrayAnswer(answers.engagementStyle)}

### Previously Generated Strategy Foundation
${foundation}

### Task
Based on the user profile, strategy foundation, and **current temporal context (especially ${currentMonthName}, Q${currentQuarter}, ${season})**, create a detailed 4-week content calendar starting from the next appropriate Monday.

## FOUR-WEEK CONTENT CALENDAR
Create a detailed 4-week content plan with ${postsPerWeekText} (Monday-Friday).

**IMPORTANT SCHEDULING & CONTENT INSTRUCTIONS:**
* Schedule exactly ${postingCount} posts for each of the 4 weeks.
* Distribute these ${postingCount} posts across **different weekdays (Monday to Friday)** each week evenly. Do NOT schedule multiple posts on the same day within the same week.
**CRUCIAL FOR TOPICS:** Ensure generated topics, advice, or examples are **generally timely for the current period ${currentMonthName} ${currentYear}, Q${currentQuarter})**. Consider common business cycles or themes relevant now based on the user's industry and goals, but avoid over-focusing on a single narrow theme (like a specific season) across all posts. Aim for a balanced mix of relevant evergreen and timely topics. Avoid topics clearly dated to past years. * Consider typical business cycles, holidays (if any relevant ones are upcoming), or seasonal themes appropriate for ${currentMonthName} / ${season}.
* Avoid generic or outdated topics (e.g., "Predictions for ${currentYear - 1}").
* Include at least one promotional post per week and one value-add resource (checklist, template, guide, etc.) per week, tailoring them to the current context if possible.

Format the content plan as a clear markdown table with these columns:
| Week - Day | Pillar | Topic | Approach | Content Type |
| ---------- | ------ | ----- | -------- | ------------ |
| Week 1 - Monday | [Pillar] | [Timely Topic for ${currentMonthName}/${currentYear}] | [Context-Relevant Approach] | [Content Type Details] |
| ... (ensure exactly ${totalPosts} data rows plus header/separator) ... | ... | ... | ... | ... |

In the 'Approach' and 'Content Type' columns, provide specific, actionable details as requested before.

### Output Formatting
- Format your response as clean, readable markdown.
- Ensure the table is properly formatted with markdown syntax.
- Make the calendar specific, actionable, and **temporally relevant**.
- Output ONLY the content calendar section starting with the '## FOUR-WEEK CONTENT CALENDAR' heading and the markdown table itself. Do not include any preamble or concluding remarks.
`;
}



// Include all the helper functions here - same as in the foundation route
function getReadableValue(value) {
  // Copy from foundation route
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