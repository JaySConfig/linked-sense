
// //// testing app 

// export const sections = [
//   {
//       id: 'profile',
//       title: 'Your Profile',
//       description: "Let's start with some basic information about you and your work.",
//       questions: [
//         {
//           id: 'industry',
//           question: 'What industry do you work in?',
//           type: 'tagInput',
//           description: 'This helps us tailor content ideas to your specific field.',
//           maxSelections: 1, // Only allow one industry
//           suggestions: [
//             'Technology & Software', 
//             'Banking & Finance', 
//             'Healthcare & Wellness',
//             'Education & Training',
//             'Marketing & Advertising',
//             'E-commerce & Retail',
//             'Consulting & Professional Services',
//             'Manufacturing & Engineering',
//             'Media & Entertainment'
//           ]
//         },
//         {
//           id: 'role',
//           question: 'What is your professional role?',
//           type: 'tagInput',
//           description: 'Your role influences the type of content that will resonate with your audience.',
//           maxSelections: 1, // Only allow one role
//           suggestions: [
//             'Executive/C-Suite',
//             'Manager/Director',
//             'Founder/Entrepreneur',
//             'Consultant/Advisor',
//             'Specialist/Individual Contributor'
//           ]
//         }
//         // {
//         //   id: 'industry',
//         //   question: 'What industry do you work in?',
//         //   type: 'singleSelect',
//         //   options: [
//         //     { value: 'technology', label: 'Technology & Software' },
//         //     { value: 'banking', label: 'Banking' },
//         //     { value: 'finance', label: 'Finance' },
//         //     { value: 'insurance', label: 'Insurance' },
//         //     { value: 'healthcare', label: 'Healthcare & Wellness' },
//         //     { value: 'education', label: 'Education & Training' },
//         //     { value: 'marketing', label: 'Marketing & Advertising' },
//         //     { value: 'ecommerce', label: 'E-commerce & Retail' },
//         //     { value: 'consulting', label: 'Consulting & Professional Services' },
//         //     { value: 'manufacturing', label: 'Manufacturing & Engineering' },
//         //     { value: 'media', label: 'Media & Entertainment' },
//         //     { value: 'other', label: 'Other' }
//         //   ]
//         // },
        
        
//         // {
//         //   id: 'role',
//         //   question: 'What is your professional role?',
//         //   type: 'singleSelect',
//         //   options: [
//         //     { value: 'executive', label: 'Executive/C-Suite' },
//         //     { value: 'manager', label: 'Manager/Director' },
//         //     { value: 'founder', label: 'Founder/Entrepreneur' },
//         //     { value: 'consultant', label: 'Consultant/Advisor' },
//         //     { value: 'specialist', label: 'Specialist/Individual Contributor' },
//         //     { value: 'other', label: 'Other' }
//         //   ]
//         // },
        
//         // {
//         //   id: 'offering',
//         //   question: 'What products or services do you or your company offer?',
//         //   type: 'tagInput',
//         //   description: 'Enter key products, services or solutions you provide',
//         //   maxSelections: 5,
//         //   suggestions: [
//         //     'Software Solutions', 'Consulting Services', 'Financial Advice',
//         //     'Digital Marketing', 'Training Programs', 'Healthcare Services',
//         //     'E-commerce Platform', 'Manufacturing Solutions'
//         //   ]
//         // }
//       ]
//     },
//   {
//     id: 'goals',
//     title: 'Goals',
//     description: "Let's understand what you want to achieve on LinkedIn.",
//     questions: [
//       {
//         id: 'primaryGoal',
//         question: 'What do you want to achieve on LinkedIn?"',
//         type: 'singleSelect',
//         description: 'This will shape your entire content strategy and approach.',
//         options: [
//           { value: 'thoughtLeadership', label: 'Thought Leadership' },
//           { value: 'leadGeneration', label: 'Lead Generation' },
//           { value: 'careerGrowth', label: 'Career Growth' },
//           { value: 'communityBuilding', label: 'Community Building' },
//           { value: 'brandAwareness', label: 'PR/Brand Awareness' }
//         ]
//       },
//       {
//         id: 'targetAudience',
//         question: 'Who do you want to connect with?',
//         type: 'singleSelect',
//         description: 'Knowing your audience helps create content that speaks directly to them.',
//         options: [
//           { value: 'executives', label: 'Senior Executives & Decision Makers' },
//           { value: 'peers', label: 'Industry Peers & Colleagues' },
//           { value: 'clients', label: 'Potential Clients & Customers' },
//           { value: 'recruiters', label: 'Recruiters & Hiring Managers' },
//           { value: 'investors', label: 'Investors & Stakeholders' }
//         ]
//       },
//       {
//         id: 'commercialObjectives',
//         question: 'What do you want to achieve on LinkedIn?',
//         type: 'singleSelect',
//         description: 'This helps us focus your strategy on specific outcomes.',
//         // minSelections: 1,
//         options: [
//           { value: 'driveSales', label: 'Drive Sales' },
//           { value: 'attractJobOffers', label: 'Attract Job Offers' },
//           { value: 'secureFunding', label: 'Secure Funding' },
//           { value: 'establishCredibility', label: 'Establish Credibility' },
//           { value: 'expandNetwork', label: 'Expand Professional Network' }
//         ]
//       }
//     ]
//   },
//   {
//     id: 'audience',
//     title: 'Understanding Your Audience',
//     description: "Great content addresses specific problems your audience faces.",
//     questions: [
//       {
//         id: 'audienceChallenges',
//         question: 'What problems do your connections struggle with?',
//         type: 'tagInput',
//         description: 'Identify the key struggles your audience encounters.',
//         minSelections: 2,
//         maxSelections: 3,
//         suggestions: [
//           'Scaling their business', 'Generating consistent leads', 'Navigating industry changes', 'Managing remote teams',
//           'Breaking into leadership roles'
//         ]
//       },
//       // {
//       //   id: 'audienceFears',
//       //   question: 'What are your audience’s biggest fears when it comes to their industry or career?',
//       //   type: 'tagInput',
//       //   description: 'Recognize the concerns that may hold your audience back.',
//       //   minSelections: 3,
//       //   maxSelections: 5,
//       //   suggestions: [
//       //     'Losing relevance in the industry', 'Struggling to stand out', 'Failing to generate enough revenue', 'Losing job security',
//       //     'Being seen as an imposter'
//       //   ]
//       // },
//       {
//         id: 'audienceGoals',
//         question: 'What are people in your industry trying to accomplish?',
//         type: 'tagInput',
//         description: 'Understanding goals helps you create content that feels relevant and timely.',
//         minSelections: 2,
//         maxSelections: 3,
//         suggestions: [
//           'Building a strong personal brand', 'Getting promoted to leadership', 'Raising funding for their startup',
//           'Becoming a sought-after speaker', 'Mastering digital marketing'
//         ]
//       }
//     ]
//   },
//   {
//     id: 'persona',
//     title: 'Executive Persona & Positioning',
//     description: "Let's define how you want to be perceived on LinkedIn.",
//     questions: [
//       // {
//       //   id: 'expertiseAreas',
//       //   question: 'Which key areas of expertise do you want to be recognized for on LinkedIn?',
//       //   type: 'tagInput',
//       //   description: 'These will become your content pillars on LinkedIn.',
//       //   minSelections: 3,
//       //   maxSelections: 5,
//       //   suggestions: [
//       //     'Leadership', 'Strategy', 'Innovation', 'Digital Transformation',
//       //     'Marketing', 'Sales', 'Finance', 'Operations', 'Human Resources',
//       //     'Customer Experience', 'Product Development', 'Sustainability',
//       //     'AI/Machine Learning', 'Blockchain', 'Industry Insights'
//       //   ]
//       // },
//       {
//         id: 'uniquePerspective',
//         question: 'How do you prefer to share your ideas?',
//         type: 'singleSelect',
//         description: 'This helps us match content formats to your natural communication style.',
//         options: [
//           { value: 'analytical', label: 'Analytical (Breaks down complex ideas with logic & data)' },
//           { value: 'inspiring', label: 'Inspiring (Motivates with personal stories & big-picture thinking)' },
//           { value: 'challenging', label: 'Challenging (Questions norms & disrupts industry beliefs)' },
//           { value: 'informative', label: 'Informative (Provides structured knowledge through education & tutorials)' }
//         ]
//       },
//       {
//         id: 'contentPillars',
//         question: 'What topics do you consistently post about?',
//         type: 'tagInput',
//         description: 'These key topics will form the foundation of your content calendar.',
//         minSelections: 2,
//         maxSelections: 3,
//         suggestions: [
//           'Startup Growth & Bootstrapping', 'AI in Marketing & Tech Trends', 'Leadership & Team Building',
//           'Personal Branding & Career Growth', 'Fundraising & Investor Relations', 'Sales & Business Development'
//         ]
//       }
//     ]
//   },
//   {
//     id: 'content',
//     title: 'Content Strategy',
//     description: "Let's define how you'll structure and deliver your content on LinkedIn.",
//     questions: [
//       {
//         id: 'contentTypes',
//         question: 'How would you like to share your ideas?',
//         type: 'multiSelect',
//         description: 'A mix of content types keeps your audience engaged and interested.',
//         minSelections: 2,
//         options: [
//           { value: 'storytelling', label: 'Storytelling (Personal experiences & insights)' },
//           { value: 'controversial', label: 'Controversial Takes (Challenging industry norms)' },
//           { value: 'educational', label: 'Educational How-To Guides (Step-by-step breakdowns)' },
//           { value: 'dataDriven', label: 'Data-Driven Insights (Using research & stats)' },
//           { value: 'engagement', label: 'Engagement-Driven Posts (Polls, questions, carousels)' },
//           { value: 'caseStudies', label: 'Case Studies & Testimonials (Proof-based content)' },
//           { value: 'promotional', label: 'Promotional & Lead-Generation Posts (Sales-focused content)' }
//         ]
//       },
//       {
//         id: 'postingFrequency',
//         question: 'How often do you want to post each week?',
//         type: 'singleSelect',
//         description: 'Consistency matters more than frequency - pick what you can maintain.',
//         options: [
//           { value: '1-2', label: '1-2 times per week' },
//           { value: '3-4', label: '3-4 times per week' },
//           { value: '5', label: '5 times per week' }
//         ]
//       },
//       {
//         id: 'userVoice',
//         question: 'How should your content feel to your audience?',
//         type: 'singleSelect',
//         description: 'Your tone should match your personal brand and resonate with your audience.',
//         options: [
//           { value: 'professional', label: 'Professional & Insightful' },
//           { value: 'casual', label: 'Casual & Conversational' },
//           { value: 'authoritative', label: 'Authoritative & Bold' },
//           { value: 'storytelling', label: 'Storytelling & Relatable' }
//         ]
//       },
//       // {
//       //   id: 'engagementStyle',
//       //   question: ' How do you prefer to engage with your LinkedIn audience?',
//       //   type: 'multiSelect',
//       //   description: 'Pick at least one engagement type that matches your style.',
//       //   minSelections: 1,
//       //   options: [ // Load saved progress when component mounts
//       //     // { value: 'commenting', label: 'Commenting on industry posts' },
//       //     // { value: 'polls', label: 'Running polls & discussions' },
//       //     // { value: 'DMs', label: 'Building connections through DMs' },
//       //     // { value: 'live', label: 'Hosting LinkedIn Live sessions' }
//       //   ]
//       // },
//     ]
//   }
// ];

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
          { 
            value: 'thoughtLeadership', 
            label: 'Thought Leadership',
            description: 'Establish yourself as an expert and go-to authority in your field'
          },
          { 
            value: 'leadGeneration', 
            label: 'Lead Generation',
            description: 'Attract potential clients and create business opportunities'
          },
          { 
            value: 'careerGrowth', 
            label: 'Career Growth',
            description: 'Position yourself for promotions, job offers, or career advancement'
          },
          { 
            value: 'communityBuilding', 
            label: 'Community Building',
            description: 'Create a network of like-minded professionals around shared interests'
          },
          { 
            value: 'brandAwareness', 
            label: 'PR/Brand Awareness',
            description: 'Increase visibility for yourself, your company, or your products'
          }
        ]
      },
      {
        id: 'targetAudience',
        question: 'Who do you want to connect with?',
        type: 'singleSelect',
        description: 'Knowing your audience helps create content that speaks directly to them.',
        options: [
          { 
            value: 'executives', 
            label: 'Senior Executives & Decision Makers',
            description: 'C-suite, VPs, Directors who can approve budgets or partnerships'
          },
          { 
            value: 'peers', 
            label: 'Industry Peers & Colleagues',
            description: 'Professionals at your level for knowledge exchange and networking'
          },
          { 
            value: 'clients', 
            label: 'Potential Clients & Customers',
            description: 'People who might buy your products or services'
          },
          { 
            value: 'recruiters', 
            label: 'Recruiters & Hiring Managers',
            description: 'People who can help advance your career opportunities'
          },
          { 
            value: 'investors', 
            label: 'Investors & Stakeholders',
            description: 'People who might fund or support your business ventures'
          }
        ]
      },
      {
        id: 'commercialObjectives',
        question: 'What do you want to achieve on LinkedIn?',
        type: 'singleSelect',
        description: 'This helps us focus your strategy on specific outcomes.',
        options: [
          { 
            value: 'driveSales', 
            label: 'Drive Sales',
            description: 'Generate revenue through direct business opportunities'
          },
          { 
            value: 'attractJobOffers', 
            label: 'Attract Job Offers',
            description: 'Position yourself for new career opportunities and promotions'
          },
          { 
            value: 'secureFunding', 
            label: 'Secure Funding',
            description: 'Attract investors or partnerships for your business'
          },
          { 
            value: 'establishCredibility', 
            label: 'Establish Credibility',
            description: 'Build trust and authority in your industry or niche'
          },
          { 
            value: 'expandNetwork', 
            label: 'Expand Professional Network',
            description: 'Connect with valuable contacts for future opportunities'
          }
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
      {
        id: 'uniquePerspective',
        question: 'How do you prefer to share your ideas?',
        type: 'singleSelect',
        description: 'This helps us match content formats to your natural communication style.',
        options: [
          { 
            value: 'analytical', 
            label: 'Analytical (Breaks down complex ideas with logic & data)',
            description: 'You enjoy using facts, research, and structured reasoning to explain concepts'
          },
          { 
            value: 'inspiring', 
            label: 'Inspiring (Motivates with personal stories & big-picture thinking)',
            description: 'You prefer sharing experiences and vision to inspire and motivate others'
          },
          { 
            value: 'challenging', 
            label: 'Challenging (Questions norms & disrupts industry beliefs)',
            description: 'You like to challenge assumptions and present contrarian viewpoints'
          },
          { 
            value: 'informative', 
            label: 'Informative (Provides structured knowledge through education & tutorials)',
            description: 'You enjoy teaching and explaining concepts in an educational format'
          }
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
          { 
            value: 'storytelling', 
            label: 'Storytelling (Personal experiences & insights)',
            description: 'Share lessons learned from your own experiences and journey'
          },
          { 
            value: 'controversial', 
            label: 'Controversial Takes (Challenging industry norms)',
            description: 'Challenge conventional wisdom and start thought-provoking conversations'
          },
          { 
            value: 'educational', 
            label: 'Educational How-To Guides (Step-by-step breakdowns)',
            description: 'Provide practical, actionable advice and tutorials for your audience'
          },
          { 
            value: 'dataDriven', 
            label: 'Data-Driven Insights (Using research & stats)',
            description: 'Support your points with research, data, and statistical evidence'
          },
          { 
            value: 'engagement', 
            label: 'Engagement-Driven Posts (Polls, questions, carousels)',
            description: 'Encourage audience participation and interaction with your content'
          },
          { 
            value: 'caseStudies', 
            label: 'Case Studies & Testimonials (Proof-based content)',
            description: 'Share success stories and real-world examples of concepts in action'
          },
          { 
            value: 'promotional', 
            label: 'Promotional & Lead-Generation Posts (Sales-focused content)',
            description: 'Directly promote your products/services and generate business leads'
          }
        ]
      },
      {
        id: 'postingFrequency',
        question: 'How often do you want to post each week?',
        type: 'singleSelect',
        description: 'Consistency matters more than frequency - pick what you can maintain.',
        options: [
          { 
            value: '1-2', 
            label: '1-2 times per week',
            description: 'Good for busy professionals who want quality over quantity'
          },
          { 
            value: '3-4', 
            label: '3-4 times per week',
            description: 'Ideal balance for maintaining visibility without overwhelming yourself'
          },
          { 
            value: '5', 
            label: '5 times per week',
            description: 'Best for rapid audience growth and maximum visibility'
          }
        ]
      },
      {
        id: 'userVoice',
        question: 'How should your content feel to your audience?',
        type: 'singleSelect',
        description: 'Your tone should match your personal brand and resonate with your audience.',
        options: [
          { 
            value: 'professional', 
            label: 'Professional & Insightful',
            description: 'Polished, well-researched content that demonstrates expertise'
          },
          { 
            value: 'casual', 
            label: 'Casual & Conversational',
            description: 'Friendly, approachable tone that feels like a chat with a colleague'
          },
          { 
            value: 'authoritative', 
            label: 'Authoritative & Bold',
            description: 'Confident, decisive voice that positions you as a leader'
          },
          { 
            value: 'storytelling', 
            label: 'Storytelling & Relatable',
            description: 'Narrative-driven content that connects emotionally with readers'
          }
        ]
      }
    ]
  }
];