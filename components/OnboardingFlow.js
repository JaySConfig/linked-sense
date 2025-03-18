import React, { useState } from 'react';

function OnboardingFlow() {
  // Define our sections with their questions
  const sections = [
    {
      id: 'goals',
      title: 'Goals',
      description: "Let's understand what you want to achieve on LinkedIn.",
      questions: [
        {
          id: 'primaryGoal',
          question: 'What is your primary LinkedIn goal?',
          type: 'singleSelect',
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
          question: 'Which audience are you primarily trying to reach on LinkedIn?',
          type: 'singleSelect',
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
          question: 'What commercial objectives do you have?',
          type: 'singleSelect',
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
      description: "Let's identify who you're speaking to and what matters most to them.",
      questions: [
        {
          id: 'audienceChallenges',
          question: 'What are the biggest challenges your audience faces?',
          type: 'tagInput',
          description: 'Identify the key struggles your audience encounters.',
          minSelections: 3,
          maxSelections: 5,
          suggestions: [
            'Scaling their business', 'Generating consistent leads', 'Navigating industry changes', 'Managing remote teams',
            'Breaking into leadership roles'
          ]
        },
        {
          id: 'audienceFears',
          question: 'What are your audience’s biggest fears when it comes to their industry or career?',
          type: 'tagInput',
          description: 'Recognize the concerns that may hold your audience back.',
          minSelections: 3,
          maxSelections: 5,
          suggestions: [
            'Losing relevance in the industry', 'Struggling to stand out', 'Failing to generate enough revenue', 'Losing job security',
            'Being seen as an imposter'
          ]
        },
        {
          id: 'audienceGoals',
          question: 'What are the primary goals your audience wants to achieve?',
          type: 'tagInput',
          description: 'Determine the aspirations that drive your audience forward.',
          minSelections: 3,
          maxSelections: 5,
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
          id: 'expertiseAreas',
          question: 'Which key areas of expertise do you want to be recognized for on LinkedIn?',
          type: 'tagInput',
          description: 'These will become your content pillars on LinkedIn.',
          minSelections: 3,
          maxSelections: 5,
          suggestions: [
            'Leadership', 'Strategy', 'Innovation', 'Digital Transformation',
            'Marketing', 'Sales', 'Finance', 'Operations', 'Human Resources',
            'Customer Experience', 'Product Development', 'Sustainability',
            'AI/Machine Learning', 'Blockchain', 'Industry Insights'
          ]
        },
        {
          id: 'uniquePerspective',
          question: 'How do you naturally express your insights?',
          type: 'singleSelect',
          description: 'Define the style in which you communicate your expertise.',
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
          description: 'Define the recurring themes that shape your LinkedIn content.',
          minSelections: 3,
          maxSelections: 5,
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
          question: 'What content types do you want to create?',
          type: 'multiSelect',
          description: 'Pick at least two content types that match your style.',
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
          description: 'Choose a frequency that aligns with your goals and availability.',
          options: [
            { value: '1-2', label: '1-2 times per week' },
            { value: '3-4', label: '3-4 times per week' },
            { value: '5', label: '5 times per week' }
          ]
        }
      ]
    }
  ];
  

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState('');
  
  // Get current section and question
  const currentSection = sections[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];
  
  // Navigation functions
  const goToNextQuestion = () => {
    // If there are more questions in this section
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } 
    // If we're at the last question but there are more sections
    else if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };
  
  const goToPreviousQuestion = () => {
    // If we're not at the first question of the section
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } 
    // If we're at the first question but not the first section
    else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      // Go to the last question of the previous section
      setCurrentQuestionIndex(sections[currentSectionIndex - 1].questions.length - 1);
    }
  };
  
  // Handle different answer types
  const handleSingleSelect = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };
  
  const handleMultiSelect = (questionId, value) => {
    // Get current selections for this question (or empty array if none)
    const currentSelections = answers[questionId] || [];
    
    // If already selected, remove it
    if (currentSelections.includes(value)) {
      setAnswers({
        ...answers,
        [questionId]: currentSelections.filter(item => item !== value)
      });
    } 
    // Otherwise add it, if not exceeding max selections
    else if (!currentQuestion.maxSelections || currentSelections.length < currentQuestion.maxSelections) {
      setAnswers({
        ...answers,
        [questionId]: [...currentSelections, value]
      });
    }
  };

  const handleTagAdd = () => {
    const tags = answers[currentQuestion.id] || [];
    if (inputValue.trim() && !tags.includes(inputValue.trim()) && 
        tags.length < (currentQuestion.maxSelections || Infinity)) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: [...tags, inputValue.trim()]
      });
      setInputValue('');
    }
  };

  const handleTagRemove = (tag) => {
    const tags = answers[currentQuestion.id] || [];
    setAnswers({
      ...answers,
      [currentQuestion.id]: tags.filter(t => t !== tag)
    });
  };

  const handleSuggestionClick = (suggestion) => {
    const tags = answers[currentQuestion.id] || [];
    if (tags.length < (currentQuestion.maxSelections || Infinity) && !tags.includes(suggestion)) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: [...tags, suggestion]
      });
    }
  };

  // Render different question types
  const renderSingleSelect = () => {
    return (
      <div className="flex flex-col space-y-3 ">
        {currentQuestion.options.map((option, index) => {
          const isSelected = answers[currentQuestion.id] === option.value;
          
          return (
            <button 
              key={option.value}
              className={`flex items-center p-4 border rounded-lg text-left transition-colors
                ${isSelected 
                  ? 'border-emerald-700 bg-emerald-50' 
                  : 'border-gray-200 hover:bg-gray-50'}`}
              onClick={() => handleSingleSelect(currentQuestion.id, option.value)}
            >
              <span className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded mr-3 text-sm font-medium">
                {String.fromCharCode(65 + index)}
              </span> 
              {option.label}
            </button>
          );
        })}
      </div>
    );
  };

  const renderMultiSelect = () => {
    const selectedValues = answers[currentQuestion.id] || [];
    const canSelectMore = !currentQuestion.maxSelections || selectedValues.length < currentQuestion.maxSelections;
    
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          {selectedValues.length} of {currentQuestion.maxSelections || 'unlimited'} selected
          {currentQuestion.minSelections && ` (minimum ${currentQuestion.minSelections})`}
        </p>
        
        <div className="flex flex-col space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedValues.includes(option.value);
            
            return (
              <button 
                key={option.value}
                className={`flex items-center p-4 border rounded-lg text-left transition-colors
                  ${isSelected 
                    ? 'border-emerald-700 bg-emerald-50' 
                    : !canSelectMore && !isSelected
                      ? 'border-gray-200 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:bg-gray-50'}`}
                onClick={() => handleMultiSelect(currentQuestion.id, option.value)}
                disabled={!canSelectMore && !isSelected}
              >
                <span className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded mr-3 text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span> 
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTagInput = () => {
    const tags = answers[currentQuestion.id] || [];
    
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          {tags.length} of {currentQuestion.maxSelections || 'unlimited'} selected
          {currentQuestion.minSelections && ` (minimum ${currentQuestion.minSelections})`}
        </p>
        
        {/* Selected tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <div key={tag} className="flex items-center bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
              <span className="mr-1">{tag}</span>
              <button 
                type="button"
                onClick={() => handleTagRemove(tag)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        {/* Input field with suggestions */}
        {tags.length < (currentQuestion.maxSelections || Infinity) && (
          <div className="space-y-2">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type an expertise area..."
                className="border border-gray-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-emerald-500 "
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    e.preventDefault();
                    handleTagAdd();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="bg-white border border-gray-300 border-l-1 rounded-r-lg px-4 py-2 ml-1 hover:bg-gray-50"
              >
                Add
              </button>
            </div>
            
            {/* Suggestions */}
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-2">Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {currentQuestion.suggestions
                  .filter(suggestion => !tags.includes(suggestion))
                  .slice(0, 8) // Show only a few suggestions to avoid overwhelming
                  .map(suggestion => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-sm"
                      disabled={tags.length >= (currentQuestion.maxSelections || Infinity)}
                    >
                      {suggestion}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Main render function that calls the appropriate render method
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'singleSelect':
        return renderSingleSelect();
      case 'multiSelect':
        return renderMultiSelect();
      case 'tagInput':
        return renderTagInput();
      default:
        return <p>Unknown question type: {currentQuestion.type}</p>;
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-1">{currentSection.title}</p>
          <h2 className="text-xl font-medium mb-1 text-gray-700">
            {currentQuestionIndex + 1}→ {currentQuestion.question}
          </h2>
          <p className="text-sm text-gray-500">{currentSection.description}</p>
        </div>
        
        {renderQuestion()}
      </div>
      
      <div className="mt-8 flex justify-end w-full max-w-md mx-auto">
        {(currentQuestionIndex > 0 || currentSectionIndex > 0) && (
          <button
            onClick={goToPreviousQuestion}
            className="px-4 py-2 border mr-2 border-gray-700 rounded-md text-gray-900 hover:bg-gray-100"
          >
            Back
          </button>
        )}
        <button
          onClick={goToNextQuestion}
          className="px-4 py-2 bg-white text-black border border-emerald-700 rounded-md  hover:bg-emerald-100"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default OnboardingFlow;