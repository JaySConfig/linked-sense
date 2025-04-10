import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(request) {
  try {
    // Get the submission data from the request
    const submissionData = await request.json();
    
    console.log("Received submission data for calendar generation");
    
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
    
    // Get answers and foundation from submission
    const answers = submissionData.answers || {};
    const foundation = submissionData.foundation || "";
    
    // Format the prompt for calendar only
    const prompt = createCalendarPrompt(answers, foundation);
    
    console.log("Sending calendar generation prompt to Gemini API...");
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const calendar = response.text();
    
    console.log("Successfully received calendar from Gemini API");
    
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

// Create the prompt for calendar only
function createCalendarPrompt(answers, foundation) {
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
* Posting Frequency: ${getReadableValue(answers.postingFrequency, 'postingFrequency')}

### Content Strategy Foundation
* Content Pillars: ${formatArrayAnswer(answers.contentPillars)}
* Preferred Content Types: ${formatContentTypes(answers.contentTypes)}
* Engagement Preferences: ${formatArrayAnswer(answers.engagementStyle)}

### Previously Generated Strategy Foundation
${foundation}

### Task
Based on this user profile and the previously generated strategy foundation, create a detailed 4-week content calendar:

## FOUR-WEEK CONTENT CALENDAR
Create a detailed 4-week content plan with ${getPostingFrequencyCount(answers.postingFrequency)} posts per week (Monday-Friday).

Format the content plan as a clear markdown table with these columns:
| Week - Day | Pillar | Topic | Approach | Content Type |
| ---------- | ------ | ----- | -------- | ------------ |
| Week 1 - Monday | Pillar Name | Topic description | Detailed approach | Format details |

In the 'Approach' column, explain the specific angle the post will take (educational, case study, myth-busting, etc.) with details on what points it will cover.

In the 'Content Type' column, specify both the format (text, carousel, image, etc.) and what specific elements the content should include.

Include at least one promotional post per week and one value-add resource (checklist, template, guide, etc.) per week.

### Output Formatting
- Format your response as clean, readable markdown
- Ensure the table is properly formatted with markdown syntax
- Make the calendar specific and actionable

Focus ONLY on the content calendar in your response.
`;
}

// Include all the helper functions here - same as in the foundation route
function getReadableValue(value, questionId) {
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