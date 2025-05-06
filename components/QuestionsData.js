
//// testing app 

export const sections = [
  {
      id: 'profile',
      title: 'Your Profile',
      description: "Let's start with some basic information about you and your work.",
      questions: [
        {
          id: 'industry',
          question: 'What industry do you work in?',
          type: 'tagInput',
          description: 'This helps us tailor content ideas to your specific field.',
          maxSelections: 1, // Only allow one industry
          suggestions: [
            'Technology & Software', 
            'Banking & Finance', 
            'Healthcare & Wellness',
            'Education & Training',
            'Marketing & Advertising',
            'E-commerce & Retail',
            'Consulting & Professional Services',
            'Manufacturing & Engineering',
            'Media & Entertainment'
          ]
        },
        {
          id: 'role',
          question: 'What is your professional role?',
          type: 'tagInput',
          description: 'Your role influences the type of content that will resonate with your audience.',
          maxSelections: 1, // Only allow one role
          suggestions: [
            'Executive/C-Suite',
            'Manager/Director',
            'Founder/Entrepreneur',
            'Consultant/Advisor',
            'Specialist/Individual Contributor'
          ]
        }
        // {
        //   id: 'industry',
        //   question: 'What industry do you work in?',
        //   type: 'singleSelect',
        //   options: [
        //     { value: 'technology', label: 'Technology & Software' },
        //     { value: 'banking', label: 'Banking' },
        //     { value: 'finance', label: 'Finance' },
        //     { value: 'insurance', label: 'Insurance' },
        //     { value: 'healthcare', label: 'Healthcare & Wellness' },
        //     { value: 'education', label: 'Education & Training' },
        //     { value: 'marketing', label: 'Marketing & Advertising' },
        //     { value: 'ecommerce', label: 'E-commerce & Retail' },
        //     { value: 'consulting', label: 'Consulting & Professional Services' },
        //     { value: 'manufacturing', label: 'Manufacturing & Engineering' },
        //     { value: 'media', label: 'Media & Entertainment' },
        //     { value: 'other', label: 'Other' }
        //   ]
        // },
        
        
        // {
        //   id: 'role',
        //   question: 'What is your professional role?',
        //   type: 'singleSelect',
        //   options: [
        //     { value: 'executive', label: 'Executive/C-Suite' },
        //     { value: 'manager', label: 'Manager/Director' },
        //     { value: 'founder', label: 'Founder/Entrepreneur' },
        //     { value: 'consultant', label: 'Consultant/Advisor' },
        //     { value: 'specialist', label: 'Specialist/Individual Contributor' },
        //     { value: 'other', label: 'Other' }
        //   ]
        // },
        
        // {
        //   id: 'offering',
        //   question: 'What products or services do you or your company offer?',
        //   type: 'tagInput',
        //   description: 'Enter key products, services or solutions you provide',
        //   maxSelections: 5,
        //   suggestions: [
        //     'Software Solutions', 'Consulting Services', 'Financial Advice',
        //     'Digital Marketing', 'Training Programs', 'Healthcare Services',
        //     'E-commerce Platform', 'Manufacturing Solutions'
        //   ]
        // }
      ]
    },
  {
    id: 'goals',
    title: 'Goals',
    description: "Let's understand what you want to achieve on LinkedIn.",
    questions: [
      {
        id: 'primaryGoal',
        question: 'What do you want to achieve on LinkedIn?"',
        type: 'singleSelect',
        description: 'This will shape your entire content strategy and approach.',
        options: [
          { value: 'thoughtLeadership', label: 'Thought Leadership' },
          { value: 'leadGeneration', label: 'Lead Generation' },
          { value: 'careerGrowth', label: 'Career Growth' },
          { value: 'communityBuilding', label: 'Community Building' },
          { value: 'brandAwareness', label: 'PR/Brand Awareness' }
        ]
      },
      {
        id: 'targetAudience',
        question: 'Who do you want to connect with?',
        type: 'singleSelect',
        description: 'Knowing your audience helps create content that speaks directly to them.',
        options: [
          { value: 'executives', label: 'Senior Executives & Decision Makers' },
          { value: 'peers', label: 'Industry Peers & Colleagues' },
          { value: 'clients', label: 'Potential Clients & Customers' },
          { value: 'recruiters', label: 'Recruiters & Hiring Managers' },
          { value: 'investors', label: 'Investors & Stakeholders' }
        ]
      },
      {
        id: 'commercialObjectives',
        question: 'What do you want to achieve on LinkedIn?',
        type: 'singleSelect',
        description: 'This helps us focus your strategy on specific outcomes.',
        // minSelections: 1,
        options: [
          { value: 'driveSales', label: 'Drive Sales' },
          { value: 'attractJobOffers', label: 'Attract Job Offers' },
          { value: 'secureFunding', label: 'Secure Funding' },
          { value: 'establishCredibility', label: 'Establish Credibility' },
          { value: 'expandNetwork', label: 'Expand Professional Network' }
        ]
      }
    ]
  },
  {
    id: 'audience',
    title: 'Understanding Your Audience',
    description: "Great content addresses specific problems your audience faces.",
    questions: [
      {
        id: 'audienceChallenges',
        question: 'What problems do your connections struggle with?',
        type: 'tagInput',
        description: 'Identify the key struggles your audience encounters.',
        minSelections: 2,
        maxSelections: 3,
        suggestions: [
          'Scaling their business', 'Generating consistent leads', 'Navigating industry changes', 'Managing remote teams',
          'Breaking into leadership roles'
        ]
      },
      // {
      //   id: 'audienceFears',
      //   question: 'What are your audience’s biggest fears when it comes to their industry or career?',
      //   type: 'tagInput',
      //   description: 'Recognize the concerns that may hold your audience back.',
      //   minSelections: 3,
      //   maxSelections: 5,
      //   suggestions: [
      //     'Losing relevance in the industry', 'Struggling to stand out', 'Failing to generate enough revenue', 'Losing job security',
      //     'Being seen as an imposter'
      //   ]
      // },
      {
        id: 'audienceGoals',
        question: 'What are people in your industry trying to accomplish?',
        type: 'tagInput',
        description: 'Understanding goals helps you create content that feels relevant and timely.',
        minSelections: 2,
        maxSelections: 3,
        suggestions: [
          'Building a strong personal brand', 'Getting promoted to leadership', 'Raising funding for their startup',
          'Becoming a sought-after speaker', 'Mastering digital marketing'
        ]
      }
    ]
  },
  {
    id: 'persona',
    title: 'Executive Persona & Positioning',
    description: "Let's define how you want to be perceived on LinkedIn.",
    questions: [
      // {
      //   id: 'expertiseAreas',
      //   question: 'Which key areas of expertise do you want to be recognized for on LinkedIn?',
      //   type: 'tagInput',
      //   description: 'These will become your content pillars on LinkedIn.',
      //   minSelections: 3,
      //   maxSelections: 5,
      //   suggestions: [
      //     'Leadership', 'Strategy', 'Innovation', 'Digital Transformation',
      //     'Marketing', 'Sales', 'Finance', 'Operations', 'Human Resources',
      //     'Customer Experience', 'Product Development', 'Sustainability',
      //     'AI/Machine Learning', 'Blockchain', 'Industry Insights'
      //   ]
      // },
      {
        id: 'uniquePerspective',
        question: 'How do you prefer to share your ideas?',
        type: 'singleSelect',
        description: 'This helps us match content formats to your natural communication style.',
        options: [
          { value: 'analytical', label: 'Analytical (Breaks down complex ideas with logic & data)' },
          { value: 'inspiring', label: 'Inspiring (Motivates with personal stories & big-picture thinking)' },
          { value: 'challenging', label: 'Challenging (Questions norms & disrupts industry beliefs)' },
          { value: 'informative', label: 'Informative (Provides structured knowledge through education & tutorials)' }
        ]
      },
      {
        id: 'contentPillars',
        question: 'What topics do you consistently post about?',
        type: 'tagInput',
        description: 'These key topics will form the foundation of your content calendar.',
        minSelections: 2,
        maxSelections: 3,
        suggestions: [
          'Startup Growth & Bootstrapping', 'AI in Marketing & Tech Trends', 'Leadership & Team Building',
          'Personal Branding & Career Growth', 'Fundraising & Investor Relations', 'Sales & Business Development'
        ]
      }
    ]
  },
  {
    id: 'content',
    title: 'Content Strategy',
    description: "Let's define how you'll structure and deliver your content on LinkedIn.",
    questions: [
      {
        id: 'contentTypes',
        question: 'How would you like to share your ideas?',
        type: 'multiSelect',
        description: 'A mix of content types keeps your audience engaged and interested.',
        minSelections: 2,
        options: [
          { value: 'storytelling', label: 'Storytelling (Personal experiences & insights)' },
          { value: 'controversial', label: 'Controversial Takes (Challenging industry norms)' },
          { value: 'educational', label: 'Educational How-To Guides (Step-by-step breakdowns)' },
          { value: 'dataDriven', label: 'Data-Driven Insights (Using research & stats)' },
          { value: 'engagement', label: 'Engagement-Driven Posts (Polls, questions, carousels)' },
          { value: 'caseStudies', label: 'Case Studies & Testimonials (Proof-based content)' },
          { value: 'promotional', label: 'Promotional & Lead-Generation Posts (Sales-focused content)' }
        ]
      },
      {
        id: 'postingFrequency',
        question: 'How often do you want to post each week?',
        type: 'singleSelect',
        description: 'Consistency matters more than frequency - pick what you can maintain.',
        options: [
          { value: '1-2', label: '1-2 times per week' },
          { value: '3-4', label: '3-4 times per week' },
          { value: '5', label: '5 times per week' }
        ]
      },
      {
        id: 'userVoice',
        question: 'How should your content feel to your audience?',
        type: 'singleSelect',
        description: 'Your tone should match your personal brand and resonate with your audience.',
        options: [
          { value: 'professional', label: 'Professional & Insightful' },
          { value: 'casual', label: 'Casual & Conversational' },
          { value: 'authoritative', label: 'Authoritative & Bold' },
          { value: 'storytelling', label: 'Storytelling & Relatable' }
        ]
      },
      // {
      //   id: 'engagementStyle',
      //   question: ' How do you prefer to engage with your LinkedIn audience?',
      //   type: 'multiSelect',
      //   description: 'Pick at least one engagement type that matches your style.',
      //   minSelections: 1,
      //   options: [ // Load saved progress when component mounts
      //     // { value: 'commenting', label: 'Commenting on industry posts' },
      //     // { value: 'polls', label: 'Running polls & discussions' },
      //     // { value: 'DMs', label: 'Building connections through DMs' },
      //     // { value: 'live', label: 'Hosting LinkedIn Live sessions' }
      //   ]
      // },
    ]
  }
];