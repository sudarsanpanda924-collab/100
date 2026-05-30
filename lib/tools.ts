import { Tool } from "@/types";

export const CATEGORIES = [
  { id: "ai-writing", name: "AI Writing Tools", description: "Power up your copy and essays with Gemini & Groq", icon: "PenTool" },
  { id: "youtube-creator", name: "YouTube Creator Tools", description: "Optimize your channel growth and content planning", icon: "Youtube" },
  { id: "instagram", name: "Instagram Tools", description: "Captions, reels, bios, and strategies to stand out", icon: "Instagram" },
  { id: "ai-image", name: "AI Image Tools", description: "Generate visuals and prompts with Pollinations AI", icon: "Image" },
  { id: "pdf-ocr", name: "PDF & OCR Tools", description: "Manage documents and extract text using Hugging Face", icon: "FileText" },
  { id: "business-finance", name: "Business & Finance Tools", description: "Calculators and tools for founders and freelancers", icon: "Briefcase" },
  { id: "image-converter", name: "Image Converters", description: "Resize, compress, and change image formats instantly", icon: "RefreshCw" },
  { id: "document-converter", name: "Document Converters", description: "Convert PDFs, Words, Excels, and Markdown files", icon: "FileCode" },
  { id: "audio-video", name: "Audio & Video Tools", description: "Speech to text, noise cleaning, and compression", icon: "Video" },
  { id: "youtube-optimization", name: "YouTube Optimization Suite", description: "Analyze CTR, packaging, viral potential, and audience retention", icon: "TrendingUp" },
];

// Helper to generate default FAQ
const getFAQ = (title: string, category: string, isAI: boolean) => [
  {
    question: `How do I use the ${title}?`,
    answer: `Fill out the required inputs above and click "Generate" or "Run". Your result will appear instantly in the output section.`,
  },
  {
    question: `Is this ${title} free to use?`,
    answer: isAI 
      ? `Yes! You get 5 free generations per day for AI-powered tools on ToolVerse AI without logging in.`
      : `Yes! Non-AI tools have completely unlimited usage on ToolVerse AI.`,
  },
];

const rawTools: Omit<Tool, "faq">[] = [
  // --- AI WRITING TOOLS (1-20) ---
  {
    slug: "ai-cold-email-writer",
    title: "AI Cold Email Writer",
    category: "ai-writing",
    description: "Write high-converting cold emails tailored to your prospect's needs.",
    isAI: true,
    inputFields: [
      { name: "recipient", label: "Recipient Role/Company", type: "text", placeholder: "e.g. Marketing Director at Stripe" },
      { name: "offer", label: "Your Offer/Value Prop", type: "textarea", placeholder: "e.g. 20% increase in lead generation using AI search optimization" },
      { name: "tone", label: "Email Tone", type: "select", options: [
        { label: "Professional", value: "professional" },
        { label: "Casual & Friendly", value: "casual" },
        { label: "Bold & Direct", value: "bold" }
      ], defaultValue: "professional" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-product-description-generator",
    title: "AI Product Description Generator",
    category: "ai-writing",
    description: "Generate compelling, SEO-friendly product descriptions that sell.",
    isAI: true,
    inputFields: [
      { name: "name", label: "Product Name", type: "text", placeholder: "e.g. AeroStride running shoes" },
      { name: "features", label: "Key Features", type: "textarea", placeholder: "e.g. breathable mesh, carbon fiber plate, ultra-lightweight, 3 color options" },
      { name: "audience", label: "Target Audience", type: "text", placeholder: "e.g. Marathon runners and athletes" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-bio-generator",
    title: "AI Bio Generator",
    category: "ai-writing",
    description: "Create professional or creative bios for social profiles and portfolios.",
    isAI: true,
    inputFields: [
      { name: "name", label: "Your Name", type: "text", placeholder: "e.g. Alex Rivera" },
      { name: "profession", label: "Profession & Skills", type: "text", placeholder: "e.g. Fullstack Engineer, SaaS Builder" },
      { name: "style", label: "Bio Style", type: "select", options: [
        { label: "Professional / LinkedIn", value: "professional" },
        { label: "Creative / Twitter", value: "creative" },
        { label: "Casual / Instagram", value: "casual" }
      ], defaultValue: "professional" }
    ],
    outputType: "text",
    provider: "gemini"
  },
  {
    slug: "ai-tweet-rewriter",
    title: "AI Tweet Rewriter",
    category: "ai-writing",
    description: "Rewrite tweets to maximize engagement, clarity, and viral potential.",
    isAI: true,
    inputFields: [
      { name: "tweet", label: "Original Tweet", type: "textarea", placeholder: "Write your draft tweet here..." },
      { name: "goal", label: "Engagement Goal", type: "select", options: [
        { label: "Viral / Educational Thread-starter", value: "viral" },
        { label: "High Click-Through Rate", value: "ctr" },
        { label: "Professional & Authoritative", value: "authority" }
      ], defaultValue: "viral" }
    ],
    outputType: "text",
    provider: "groq"
  },
  {
    slug: "linkedin-post-formatter",
    title: "LinkedIn Post Formatter",
    category: "ai-writing",
    description: "Format post drafts with hooks, spacing, and emojis for LinkedIn feed optimization.",
    isAI: true,
    inputFields: [
      { name: "post", label: "LinkedIn Post Draft", type: "textarea", placeholder: "Enter raw draft..." },
      { name: "hookStyle", label: "Hook Style", type: "select", options: [
        { label: "Storytelling", value: "story" },
        { label: "Contrarian / Hot Take", value: "contrarian" },
        { label: "Statistical / Data-driven", value: "data" }
      ], defaultValue: "story" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "freelancer-proposal-generator",
    title: "Freelancer Proposal Generator",
    category: "ai-writing",
    description: "Generate winning project proposals for Upwork, Fiverr, or cold pitching.",
    isAI: true,
    inputFields: [
      { name: "jobDescription", label: "Job Description", type: "textarea", placeholder: "Paste job post details here..." },
      { name: "skills", label: "Your Relevant Skills & Portfolio", type: "textarea", placeholder: "e.g. 4 years of Next.js, built 10+ active SaaS products" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "contract-simplifier",
    title: "Contract Simplifier",
    category: "ai-writing",
    description: "Translate complex legal jargon in contracts into simple, understandable summaries.",
    isAI: true,
    inputFields: [
      { name: "clause", label: "Contract Clause / Legal text", type: "textarea", placeholder: "Paste legal text..." }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-meeting-notes-summarizer",
    title: "AI Meeting Notes Summarizer",
    category: "ai-writing",
    description: "Turn transcript segments or raw notes into structured summaries and action items.",
    isAI: true,
    inputFields: [
      { name: "notes", label: "Raw Meeting Transcript / Notes", type: "textarea", placeholder: "e.g. John said we need to fix checkout flow, Sarah to update Figma by Friday..." }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-startup-idea-generator",
    title: "AI Startup Idea Generator",
    category: "ai-writing",
    description: "Brainstorm high-potential startup ideas based on niches, trends, or technologies.",
    isAI: true,
    inputFields: [
      { name: "niche", label: "Niche/Industry Preference", type: "text", placeholder: "e.g. Developer tools, sustainable energy, remote work" },
      { name: "trend", label: "Current Tech/Trend Focus", type: "text", placeholder: "e.g. AI-agent automation, privacy-first data" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-ad-copy-generator",
    title: "AI Ad Copy Generator",
    category: "ai-writing",
    description: "Generate high-converting ad copy for Facebook, Instagram, Google, and LinkedIn.",
    isAI: true,
    inputFields: [
      { name: "product", label: "Product Name & Offer", type: "text", placeholder: "e.g. ZenFlow - Meditation app offering 30-day trial" },
      { name: "channel", label: "Ad Channel", type: "select", options: [
        { label: "Facebook/Instagram Ad", value: "facebook" },
        { label: "Google Search Ad", value: "google" },
        { label: "LinkedIn Ad", value: "linkedin" }
      ], defaultValue: "facebook" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "blog-intro-generator",
    title: "Blog Intro Generator",
    category: "ai-writing",
    description: "Write catchy blog introductions that keep readers hooked from the first sentence.",
    isAI: true,
    inputFields: [
      { name: "title", label: "Blog Post Title", type: "text", placeholder: "e.g. Why Next.js 15 is a Game Changer" },
      { name: "summary", label: "Core Topic Summary", type: "textarea", placeholder: "e.g. Introduction of server actions, stable turbopack, react 19 upgrades" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "blog-outline-generator",
    title: "Blog Outline Generator",
    category: "ai-writing",
    description: "Create structured SEO-optimized outlines for your upcoming blog posts.",
    isAI: true,
    inputFields: [
      { name: "title", label: "Blog Post Title", type: "text", placeholder: "e.g. The Ultimate Guide to Web Scraping in 2026" },
      { name: "keywords", label: "Target Keywords (comma-separated)", type: "text", placeholder: "e.g. web scraping, nodejs scraper, proxies, bypass cloudflare" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "paragraph-rewriter",
    title: "Paragraph Rewriter",
    category: "ai-writing",
    description: "Rewrite paragraphs to improve tone, flow, clarity, or word count.",
    isAI: true,
    inputFields: [
      { name: "paragraph", label: "Original Paragraph", type: "textarea", placeholder: "Enter paragraph here..." },
      { name: "mode", label: "Rewrite Mode", type: "select", options: [
        { label: "More Engaging", value: "engaging" },
        { label: "Professional & Concise", value: "concise" },
        { label: "Simplify Complex Language", value: "simple" },
        { label: "Expand / Elaborate", value: "expand" }
      ], defaultValue: "engaging" }
    ],
    outputType: "text",
    provider: "groq"
  },
  {
    slug: "grammar-fixer",
    title: "Grammar Fixer",
    category: "ai-writing",
    description: "Correct grammar, spelling, and punctuation errors instantly while retaining meaning.",
    isAI: true,
    inputFields: [
      { name: "text", label: "Your Text", type: "textarea", placeholder: "Paste your text here..." }
    ],
    outputType: "text",
    provider: "groq"
  },
  {
    slug: "email-subject-line-generator",
    title: "Email Subject Line Generator",
    category: "ai-writing",
    description: "Generate highly clickable subject lines to boost your email open rates.",
    isAI: true,
    inputFields: [
      { name: "content", label: "Email Content / Main Offer", type: "textarea", placeholder: "e.g. Announcing our 50% discount on annual plans starting Monday" },
      { name: "style", label: "Subject Line Style", type: "select", options: [
        { label: "Curiosity Gap", value: "curiosity" },
        { label: "Scarcity / Urgent", value: "urgent" },
        { label: "Direct & Benefit-oriented", value: "direct" }
      ], defaultValue: "curiosity" }
    ],
    outputType: "text",
    provider: "groq"
  },
  {
    slug: "resume-summary-generator",
    title: "Resume Summary Generator",
    category: "ai-writing",
    description: "Write impressive summary statements for the top of your resume.",
    isAI: true,
    inputFields: [
      { name: "profession", label: "Your Profession/Role", type: "text", placeholder: "e.g. Senior Frontend Developer" },
      { name: "experience", label: "Years of Experience & Key Skills", type: "textarea", placeholder: "e.g. 6 years, React, Next.js, Redux, Performance Tuning, AWS" }
    ],
    outputType: "text",
    provider: "gemini"
  },
  {
    slug: "cover-letter-generator",
    title: "Cover Letter Generator",
    category: "ai-writing",
    description: "Generate custom cover letters for job applications based on job desc and resume details.",
    isAI: true,
    inputFields: [
      { name: "jobTitle", label: "Target Job Title", type: "text", placeholder: "e.g. Product Manager at Vercel" },
      { name: "jobDetails", label: "Job Description details", type: "textarea", placeholder: "Paste key job requirements..." },
      { name: "resume", label: "Your Highlights / Resume highlights", type: "textarea", placeholder: "Paste key parts of your resume..." }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "business-proposal-generator",
    title: "Business Proposal Generator",
    category: "ai-writing",
    description: "Create professional business proposals for clients, partners, or investors.",
    isAI: true,
    inputFields: [
      { name: "client", label: "Client Name/Company", type: "text", placeholder: "e.g. Global Retail Corp" },
      { name: "project", label: "Project Title & Scope", type: "textarea", placeholder: "e.g. Inventory Management System modernization with cloud database and analytics dashboards" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "product-review-generator",
    title: "Product Review Generator",
    category: "ai-writing",
    description: "Generate realistic product reviews based on pros, cons, and rating preferences.",
    isAI: true,
    inputFields: [
      { name: "product", label: "Product/Service Name", type: "text", placeholder: "e.g. Kindle Paperwhite" },
      { name: "pros", label: "Pros / Positives", type: "text", placeholder: "e.g. Warm backlight, water resistant, long battery" },
      { name: "cons", label: "Cons / Negatives", type: "text", placeholder: "e.g. Slow PDF reading, micro-USB charger (old model)" },
      { name: "rating", label: "Rating (Stars)", type: "select", options: [
        { label: "5 Stars", value: "5" },
        { label: "4 Stars", value: "4" },
        { label: "3 Stars", value: "3" }
      ], defaultValue: "5" }
    ],
    outputType: "text",
    provider: "gemini"
  },
  {
    slug: "social-media-post-generator",
    title: "Social Media Post Generator",
    category: "ai-writing",
    description: "Write social media posts for multiple platforms based on a core message.",
    isAI: true,
    inputFields: [
      { name: "message", label: "Core Message / Announcement", type: "textarea", placeholder: "e.g. We just reached 10,000 active users on ToolVerse!" },
      { name: "platforms", label: "Select Platform", type: "select", options: [
        { label: "LinkedIn & Twitter/X", value: "linkedin_twitter" },
        { label: "Instagram & Facebook", value: "insta_fb" }
      ], defaultValue: "linkedin_twitter" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },

  // --- YOUTUBE CREATOR TOOLS (21-35) ---
  {
    slug: "youtube-title-generator",
    title: "YouTube Title Generator",
    category: "youtube-creator",
    description: "Generate highly clickable, viral YouTube titles based on your video topic.",
    isAI: true,
    inputFields: [
      { name: "topic", label: "Video Topic/Focus", type: "text", placeholder: "e.g. How to start coding in 2026" },
      { name: "style", label: "Title Style", type: "select", options: [
        { label: "Sensational / Viral", value: "viral" },
        { label: "Educational / Search Friendly", value: "seo" },
        { label: "Curiosity Gap / Story-based", value: "curiosity" }
      ], defaultValue: "viral" }
    ],
    outputType: "text",
    provider: "groq"
  },
  {
    slug: "youtube-description-generator",
    title: "YouTube Description Generator",
    category: "youtube-creator",
    description: "Generate structured, SEO-friendly descriptions with timestamps and video links.",
    isAI: true,
    inputFields: [
      { name: "title", label: "Video Title", type: "text", placeholder: "e.g. I Built 10 SaaS Products in 10 Days" },
      { name: "summary", label: "Video Summary / Key Takeaways", type: "textarea", placeholder: "e.g. Showing the exact stack, tools used, and lessons learned about launching quickly." }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "youtube-tags-generator",
    title: "YouTube Tags Generator",
    category: "youtube-creator",
    description: "Generate high-volume search tags for your YouTube videos.",
    isAI: true,
    inputFields: [
      { name: "topic", label: "Video Topic/Keyword", type: "text", placeholder: "e.g. Next.js 15 Tutorial" }
    ],
    outputType: "text",
    provider: "groq"
  },
  {
    slug: "youtube-hashtag-generator",
    title: "YouTube Hashtag Generator",
    category: "youtube-creator",
    description: "Get trending hashtags based on your YouTube channel niche and video topic.",
    isAI: true,
    inputFields: [
      { name: "topic", label: "Video Topic", type: "text", placeholder: "e.g. Personal Finance and Investing for Teens" }
    ],
    outputType: "text",
    provider: "groq"
  },
  {
    slug: "youtube-script-outline-generator",
    title: "YouTube Script Outline Generator",
    category: "youtube-creator",
    description: "Generate a complete narrative structure and outline for your next YouTube video.",
    isAI: true,
    inputFields: [
      { name: "topic", label: "Video Title / Topic", type: "text", placeholder: "e.g. Why most software engineers fail in their first year" },
      { name: "length", label: "Target Video Duration", type: "select", options: [
        { label: "Short (3-5 minutes)", value: "short" },
        { label: "Medium (8-12 minutes)", value: "medium" },
        { label: "Deep-dive (15-20+ minutes)", value: "long" }
      ], defaultValue: "medium" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "youtube-hook-generator",
    title: "YouTube Hook Generator",
    category: "youtube-creator",
    description: "Brainstorm 5 options for the first 30 seconds of your video to maximize retention.",
    isAI: true,
    inputFields: [
      { name: "topic", label: "Video Topic", type: "text", placeholder: "e.g. The dark truth about fast fashion" }
    ],
    outputType: "markdown",
    provider: "groq"
  },
  {
    slug: "thumbnail-idea-generator",
    title: "Thumbnail Idea Generator",
    category: "youtube-creator",
    description: "Get visual concepts, text placement, and color design ideas for high CTR thumbnails.",
    isAI: true,
    inputFields: [
      { name: "title", label: "Video Title", type: "text", placeholder: "e.g. I quit my $200k FAANG job to build a startup" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "youtube-channel-bio-generator",
    title: "YouTube Channel Bio Generator",
    category: "youtube-creator",
    description: "Write compelling YouTube channel 'About' bios that turn visitors into subscribers.",
    isAI: true,
    inputFields: [
      { name: "niche", label: "Channel Niche", type: "text", placeholder: "e.g. Coding tutorials and tech reviews" },
      { name: "audience", label: "Value Proposition (Why follow?)", type: "textarea", placeholder: "e.g. Helping developers learn fullstack skills, build SaaS, and get remote jobs through step-by-step guides" }
    ],
    outputType: "text",
    provider: "gemini"
  },
  {
    slug: "youtube-video-summary-generator",
    title: "YouTube Video Summary Generator",
    category: "youtube-creator",
    description: "Generate clear outlines and summaries from a YouTube video transcript.",
    isAI: true,
    inputFields: [
      { name: "transcript", label: "Video Transcript Segment", type: "textarea", placeholder: "Paste transcript text here..." }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "youtube-seo-score-checker",
    title: "YouTube SEO Score Checker",
    category: "youtube-creator",
    description: "Analyze your title, description, and keywords to get an optimization score out of 100.",
    isAI: true,
    inputFields: [
      { name: "title", label: "Video Title", type: "text", placeholder: "e.g. Coding a SaaS in 1 hour" },
      { name: "desc", label: "Video Description", type: "textarea", placeholder: "e.g. Today I will build a software-as-a-service from scratch..." },
      { name: "tags", label: "Keywords / Tags (comma separated)", type: "text", placeholder: "e.g. saas, nextjs, learn coding" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "youtube-shorts-script-generator",
    title: "YouTube Shorts Script Generator",
    category: "youtube-creator",
    description: "Write fast-paced, high-retention 60-second scripts with visual cues for Shorts/Reels/TikTok.",
    isAI: true,
    inputFields: [
      { name: "topic", label: "Shorts Topic", type: "text", placeholder: "e.g. 3 secret sites developers must use" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "youtube-community-post-generator",
    title: "YouTube Community Post Generator",
    category: "youtube-creator",
    description: "Write engaging text posts, updates, or polls for your channel community feed.",
    isAI: true,
    inputFields: [
      { name: "purpose", label: "Goal / Announcement", type: "textarea", placeholder: "e.g. Asking them what video style they prefer next, or promoting the coding tutorial launched today" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "youtube-video-idea-generator",
    title: "YouTube Video Idea Generator",
    category: "youtube-creator",
    description: "Brainstorm 10 high-demand video concepts based on your channel theme.",
    isAI: true,
    inputFields: [
      { name: "niche", label: "Your Channel Niche/Focus", type: "text", placeholder: "e.g. Tech gadgets, product reviews, and desk setups" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "youtube-intro-generator",
    title: "YouTube Intro Script Generator",
    category: "youtube-creator",
    description: "Write standard hooks and intros to ensure viewers stay past the first 10 seconds.",
    isAI: true,
    inputFields: [
      { name: "title", label: "Video Title", type: "text", placeholder: "e.g. How I cured my social media addiction" }
    ],
    outputType: "markdown",
    provider: "groq"
  },
  {
    slug: "youtube-outro-generator",
    title: "YouTube Outro Script Generator",
    category: "youtube-creator",
    description: "Write standard outro scripts that redirect users to another video to increase watch time.",
    isAI: true,
    inputFields: [
      { name: "videoTopic", label: "Topic of the Next Recommended Video", type: "text", placeholder: "e.g. How to set up a dopamine detox calendar" }
    ],
    outputType: "markdown",
    provider: "groq"
  },

  // --- INSTAGRAM TOOLS (36-45) ---
  {
    slug: "instagram-caption-generator",
    title: "Instagram Caption Generator",
    category: "instagram",
    description: "Generate highly engaging Instagram captions with formatting and spacing.",
    isAI: true,
    inputFields: [
      { name: "topic", label: "Post Topic/Photo details", type: "textarea", placeholder: "e.g. Picture of me working from a beach in Thailand as a digital nomad" },
      { name: "vibes", label: "Caption Vibe", type: "select", options: [
        { label: "Witty & Funny", value: "witty" },
        { label: "Inspirational", value: "inspirational" },
        { label: "Minimalist (Short & Punchy)", value: "minimal" }
      ], defaultValue: "witty" }
    ],
    outputType: "text",
    provider: "groq"
  },
  {
    slug: "instagram-hashtag-generator",
    title: "Instagram Hashtag Generator",
    category: "instagram",
    description: "Get curated hashtags grouped by size (low, medium, high volume) to beat the algorithm.",
    isAI: true,
    inputFields: [
      { name: "niche", label: "Niche/Post Topic", type: "text", placeholder: "e.g. minimalist interior design" }
    ],
    outputType: "text",
    provider: "groq"
  },
  {
    slug: "instagram-bio-generator",
    title: "Instagram Bio Generator",
    category: "instagram",
    description: "Create bios with hooks, call-to-actions, and styled characters.",
    isAI: true,
    inputFields: [
      { name: "niche", label: "Your Niche/Goal", type: "text", placeholder: "e.g. Gym coach helping desk workers lose weight" },
      { name: "link", label: "Link/Call to Action", type: "text", placeholder: "e.g. Free recipe book down below 👇" }
    ],
    outputType: "text",
    provider: "groq"
  },
  {
    slug: "instagram-post-idea-generator",
    title: "Instagram Post Idea Generator",
    category: "instagram",
    description: "Generate custom post ideas, themes, and visual briefs for static or carousel images.",
    isAI: true,
    inputFields: [
      { name: "theme", label: "Core Theme / Niche", type: "text", placeholder: "e.g. copywriting and marketing tips" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "instagram-reel-hook-generator",
    title: "Instagram Reel Hook Generator",
    category: "instagram",
    description: "Get text overlays and voiceover hooks that stop users from scrolling past your reels.",
    isAI: true,
    inputFields: [
      { name: "topic", label: "Reel Topic / Concept", type: "text", placeholder: "e.g. 3 productivity tools that feel illegal to know" }
    ],
    outputType: "markdown",
    provider: "groq"
  },
  {
    slug: "instagram-content-calendar-generator",
    title: "Instagram Content Calendar Generator",
    category: "instagram",
    description: "Create a 7-day post strategy with reels, stories, and carousel templates.",
    isAI: true,
    inputFields: [
      { name: "niche", label: "Niche / Business Type", type: "text", placeholder: "e.g. Eco-friendly apparel store" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "instagram-story-idea-generator",
    title: "Instagram Story Idea Generator",
    category: "instagram",
    description: "Get interactive story ideas (polls, slider, Q&A, behind-the-scenes) to build loyalty.",
    isAI: true,
    inputFields: [
      { name: "goal", label: "Current Goal", type: "select", options: [
        { label: "Increase Engagement / Votes", value: "engagement" },
        { label: "Direct Sales / Product Hype", value: "sales" },
        { label: "Brand Story / Personal Connection", value: "branding" }
      ], defaultValue: "engagement" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "instagram-carousel-outline-generator",
    title: "Instagram Carousel Outline Generator",
    category: "instagram",
    description: "Generate slide-by-slide text blueprints for engaging carousel posts.",
    isAI: true,
    inputFields: [
      { name: "topic", label: "Carousel Topic", type: "text", placeholder: "e.g. How to negotiate your salary" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "instagram-dm-reply-generator",
    title: "Instagram DM Reply Generator",
    category: "instagram",
    description: "Quickly reply to customer or fan messages politely, with sales guidance or FAQ links.",
    isAI: true,
    inputFields: [
      { name: "msg", label: "User Message", type: "textarea", placeholder: "Paste message..." },
      { name: "responseGoal", label: "Your Goal", type: "text", placeholder: "e.g. Book a free consultation call, link is calendly.com/fit" }
    ],
    outputType: "text",
    provider: "groq"
  },
  {
    slug: "instagram-username-idea-generator",
    title: "Instagram Username Idea Generator",
    category: "instagram",
    description: "Brainstorm highly brandable usernames based on keywords and vibe.",
    isAI: true,
    inputFields: [
      { name: "keywords", label: "Keywords / Your Name", type: "text", placeholder: "e.g. Sarah, design, UX" }
    ],
    outputType: "text",
    provider: "groq"
  },

  // --- AI IMAGE TOOLS (46-60) ---
  {
    slug: "ai-image-prompt-generator",
    title: "AI Image Prompt Generator",
    category: "ai-image",
    description: "Turn simple descriptions into hyper-detailed prompts for Midjourney, Stable Diffusion, or DALL-E.",
    isAI: true,
    inputFields: [
      { name: "concept", label: "Core Concept", type: "text", placeholder: "e.g. Astronaut on a horse on Mars" },
      { name: "style", label: "Art Style", type: "select", options: [
        { label: "Photorealistic / Cinematic", value: "cinematic" },
        { label: "3D Digital Art / Octane Render", value: "3d" },
        { label: "Anime / Cyberpunk", value: "anime" }
      ], defaultValue: "cinematic" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-thumbnail-prompt-generator",
    title: "AI Thumbnail Prompt Generator",
    category: "ai-image",
    description: "Create highly detailed prompts optimized for YouTube thumbnail generation.",
    isAI: true,
    inputFields: [
      { name: "concept", label: "Thumbnail Concept Description", type: "textarea", placeholder: "e.g. A developer crying in front of a broken computer screen with red warning signs" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-logo-prompt-generator",
    title: "AI Logo Prompt Generator",
    category: "ai-image",
    description: "Generate clean minimalist prompts for company and brand logos.",
    isAI: true,
    inputFields: [
      { name: "brand", label: "Brand Name & Core Value", type: "text", placeholder: "e.g. EcoBox, eco-friendly delivery packaging" },
      { name: "logoStyle", label: "Preferred Style", type: "select", options: [
        { label: "Minimalist Vector Logo", value: "minimal" },
        { label: "Modern Geometric Logo", value: "geometric" },
        { label: "Mascot Logo", value: "mascot" }
      ], defaultValue: "minimal" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-wallpaper-prompt-generator",
    title: "AI Wallpaper Prompt Generator",
    category: "ai-image",
    description: "Generate prompts for premium desktop and mobile 4K backgrounds.",
    isAI: true,
    inputFields: [
      { name: "theme", label: "Theme (e.g., cyber city, galaxy, cozy cabin)", type: "text", placeholder: "e.g. retro futuristic synthwave vaporwave environment" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-product-photography-prompt-generator",
    title: "AI Product Photography Prompt Generator",
    category: "ai-image",
    description: "Create prompt definitions for premium commercial product shots.",
    isAI: true,
    inputFields: [
      { name: "product", label: "Product Description", type: "text", placeholder: "e.g. luxury perfume bottle with water droplets" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-background-generator",
    title: "AI Background Generator",
    category: "ai-image",
    description: "Generate clean abstract or scene backdrop images for design headers or websites.",
    isAI: true,
    inputFields: [
      { name: "theme", label: "Describe Backdrop Scene", type: "text", placeholder: "e.g. soft pastel colored geometric abstract shapes floating in light blue mist" }
    ],
    outputType: "image",
    provider: "pollinations"
  },
  {
    slug: "ai-thumbnail-text-generator",
    title: "AI Thumbnail Text Generator",
    category: "ai-image",
    description: "Create punchy 1-3 word thumbnail texts and styling options that get clicks.",
    isAI: true,
    inputFields: [
      { name: "title", label: "Video Topic / Title", type: "text", placeholder: "e.g. I worked 100 hours this week" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-color-palette-generator",
    title: "AI Color Palette Generator",
    category: "ai-image",
    description: "Generate harmonious color palettes with hex codes, mood descriptors, and UI use cases.",
    isAI: true,
    inputFields: [
      { name: "mood", label: "Mood / Style Description", type: "text", placeholder: "e.g. modern SaaS, cozy coffee shop, high tech crypto dashboard" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-image-generator",
    title: "AI Image Generator",
    category: "ai-image",
    description: "Generate custom images instantly from text prompt description using Pollinations AI.",
    isAI: true,
    inputFields: [
      { name: "prompt", label: "Enter detailed image prompt", type: "textarea", placeholder: "e.g. A futuristic cybernetic workspace, neon accents, highly detailed, octane render" }
    ],
    outputType: "image",
    provider: "pollinations"
  },
  {
    slug: "ai-character-prompt-generator",
    title: "AI Character Prompt Generator",
    category: "ai-image",
    description: "Generate consistent character concepts and outfit design prompts.",
    isAI: true,
    inputFields: [
      { name: "concept", label: "Character Brief", type: "textarea", placeholder: "e.g. A futuristic female explorer, cybernetic arm, desert apparel, goggles" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-poster-prompt-generator",
    title: "AI Poster Prompt Generator",
    category: "ai-image",
    description: "Generate highly detailed prompts optimized for vintage, movie, or gaming posters.",
    isAI: true,
    inputFields: [
      { name: "theme", label: "Poster Theme / Title", type: "text", placeholder: "e.g. sci-fi space race, retro style travel poster" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-banner-prompt-generator",
    title: "AI Banner Prompt Generator",
    category: "ai-image",
    description: "Get banner image concepts and detailed prompts for LinkedIn or Twitter headers.",
    isAI: true,
    inputFields: [
      { name: "industry", label: "Your Industry / Theme", type: "text", placeholder: "e.g. cloud security and AI pipelines" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-ad-creative-prompt-generator",
    title: "AI Ad Creative Prompt Generator",
    category: "ai-image",
    description: "Generate detailed image prompts for marketing creatives that match ad copies.",
    isAI: true,
    inputFields: [
      { name: "product", label: "Product Description", type: "textarea", placeholder: "e.g. Premium wireless headphones sitting on a marble table with soft shadows" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-3d-render-prompt-generator",
    title: "AI 3D Render Prompt Generator",
    category: "ai-image",
    description: "Generate prompt parameters to get clean isometric or blender-style 3D illustrations.",
    isAI: true,
    inputFields: [
      { name: "object", label: "Illustrate Object/Room", type: "text", placeholder: "e.g. isometric gaming room setup with purple glow" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "ai-anime-prompt-generator",
    title: "AI Anime Prompt Generator",
    category: "ai-image",
    description: "Get specialized anime style prompts for character art or landscapes.",
    isAI: true,
    inputFields: [
      { name: "subject", label: "Describe Character / Scene", type: "text", placeholder: "e.g. anime boy reading book in library with sunbeams" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },

  // --- PDF & OCR TOOLS (61-70) ---
  {
    slug: "pdf-compressor",
    title: "PDF Compressor",
    category: "pdf-ocr",
    description: "Compress large PDFs safely and efficiently inside your browser.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select PDF File", type: "file", accept: ".pdf" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "screenshot-to-text-extractor",
    title: "Screenshot to Text Extractor",
    category: "pdf-ocr",
    description: "Extract text elements from screenshots or images using HF OCR model.",
    isAI: true,
    inputFields: [
      { name: "file", label: "Select Image (JPG/PNG)", type: "file", accept: "image/*" }
    ],
    outputType: "text",
    provider: "huggingface"
  },
  {
    slug: "pdf-invoice-data-extractor",
    title: "PDF Invoice Data Extractor",
    category: "pdf-ocr",
    description: "Extract structured billing information (items, tax, total, company) from invoices using AI reasoning.",
    isAI: true,
    inputFields: [
      { name: "text", label: "Invoice Text Content (or Paste)", type: "textarea", placeholder: "Paste raw invoice text..." }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "receipt-scanner",
    title: "Receipt Scanner",
    category: "pdf-ocr",
    description: "Analyze receipt details and pull purchase dates, totals, and storefronts.",
    isAI: true,
    inputFields: [
      { name: "file", label: "Upload Receipt Image", type: "file", accept: "image/*" }
    ],
    outputType: "markdown",
    provider: "huggingface"
  },
  {
    slug: "pdf-to-audiobook",
    title: "PDF to Audiobook",
    category: "pdf-ocr",
    description: "Extract paragraphs from PDF files and convert them into readable audiobook MP3 content.",
    isAI: true,
    inputFields: [
      { name: "text", label: "PDF Content Text", type: "textarea", placeholder: "Paste PDF contents..." }
    ],
    outputType: "file",
    provider: "huggingface"
  },
  {
    slug: "voice-note-to-blog-converter",
    title: "Voice Note to Blog Converter",
    category: "pdf-ocr",
    description: "Transcribe voice files and rewrite the output transcript into formatted blog layouts.",
    isAI: true,
    inputFields: [
      { name: "file", label: "Select Audio File", type: "file", accept: "audio/*" }
    ],
    outputType: "markdown",
    provider: "huggingface"
  },
  {
    slug: "resume-ats-score-checker",
    title: "Resume ATS Score Checker",
    category: "pdf-ocr",
    description: "Upload resume textual summary to compare against ATS criteria and job descriptions.",
    isAI: true,
    inputFields: [
      { name: "resumeText", label: "Resume Content (Paste text)", type: "textarea", placeholder: "Paste your resume details..." },
      { name: "jobDesc", label: "Target Job Description", type: "textarea", placeholder: "Paste target job description..." }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "pdf-merger",
    title: "PDF Merger",
    category: "pdf-ocr",
    description: "Combine multiple PDF files into a single master document.",
    isAI: false,
    inputFields: [
      { name: "file1", label: "First PDF Document", type: "file", accept: ".pdf" },
      { name: "file2", label: "Second PDF Document", type: "file", accept: ".pdf" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "pdf-splitter",
    title: "PDF Splitter",
    category: "pdf-ocr",
    description: "Separate pages from a PDF file into standalone PDF sheets.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select PDF Document", type: "file", accept: ".pdf" },
      { name: "pages", label: "Page Ranges (e.g. 1-3, 5)", type: "text", placeholder: "e.g. 1-3" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "pdf-page-remover",
    title: "PDF Page Remover",
    category: "pdf-ocr",
    description: "Remove unnecessary pages from a PDF file and save the rest.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select PDF Document", type: "file", accept: ".pdf" },
      { name: "pages", label: "Pages to Remove (comma-separated)", type: "text", placeholder: "e.g. 2, 4" }
    ],
    outputType: "file",
    provider: "local"
  },

  // --- BUSINESS & FINANCE TOOLS (71-80) ---
  {
    slug: "gst-calculator",
    title: "GST Calculator",
    category: "business-finance",
    description: "Calculate gross price, net price, and tax amounts based on standard GST slabs.",
    isAI: false,
    inputFields: [
      { name: "amount", label: "Base Amount (₹)", type: "number", defaultValue: "1000" },
      { name: "rate", label: "GST Rate (%)", type: "select", options: [
        { label: "5%", value: "5" },
        { label: "12%", value: "12" },
        { label: "18%", value: "18" },
        { label: "28%", value: "28" }
      ], defaultValue: "18" },
      { name: "type", label: "Calculation Type", type: "select", options: [
        { label: "Inclusive GST", value: "inclusive" },
        { label: "Exclusive GST", value: "exclusive" }
      ], defaultValue: "exclusive" }
    ],
    outputType: "json",
    provider: "local"
  },
  {
    slug: "currency-profit-calculator",
    title: "Currency Profit Calculator",
    category: "business-finance",
    description: "Determine profit margins and currency fluctuations for cross-border payments.",
    isAI: false,
    inputFields: [
      { name: "invoiced", label: "Invoiced Amount (USD)", type: "number", defaultValue: "100" },
      { name: "rateReceived", label: "Exchange Rate Received", type: "number", defaultValue: "83.5" },
      { name: "rateCurrent", label: "Ideal Current Exchange Rate", type: "number", defaultValue: "84.2" }
    ],
    outputType: "json",
    provider: "local"
  },
  {
    slug: "business-name-availability-checker",
    title: "Business Name Availability Checker",
    category: "business-finance",
    description: "Verify business naming rules and look up trademark registration patterns using AI.",
    isAI: true,
    inputFields: [
      { name: "name", label: "Proposed Business Name", type: "text", placeholder: "e.g. ToolVerse Solutions" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "qr-menu-builder",
    title: "QR Menu Builder",
    category: "business-finance",
    description: "Generate static QR code codes pointing to menu URLs or restaurant catalogs.",
    isAI: false,
    inputFields: [
      { name: "url", label: "Catalog / Menu Link URL", type: "text", defaultValue: "https://my-menu.com" }
    ],
    outputType: "image",
    provider: "local"
  },
  {
    slug: "profit-margin-calculator",
    title: "Profit Margin Calculator",
    category: "business-finance",
    description: "Calculate gross profit margins, markups, and cost of goods sold.",
    isAI: false,
    inputFields: [
      { name: "cost", label: "Cost of Goods ($)", type: "number", defaultValue: "50" },
      { name: "revenue", label: "Revenue / Sale Price ($)", type: "number", defaultValue: "80" }
    ],
    outputType: "json",
    provider: "local"
  },
  {
    slug: "invoice-generator",
    title: "Invoice Generator",
    category: "business-finance",
    description: "Create quick, beautiful PDF invoices directly from browser details.",
    isAI: false,
    inputFields: [
      { name: "from", label: "Seller Details", type: "text", defaultValue: "ACME Corp, NY" },
      { name: "to", label: "Client Details", type: "text", defaultValue: "Jane Smith, SF" },
      { name: "item", label: "Item Description", type: "text", defaultValue: "SaaS Development Service" },
      { name: "cost", label: "Amount ($)", type: "number", defaultValue: "1500" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "emi-calculator",
    title: "EMI Calculator",
    category: "business-finance",
    description: "Find monthly installments, interest split, and repayment schedule for loans.",
    isAI: false,
    inputFields: [
      { name: "principal", label: "Loan Amount ($)", type: "number", defaultValue: "100000" },
      { name: "interest", label: "Interest Rate (% per year)", type: "number", defaultValue: "8.5" },
      { name: "tenure", label: "Tenure (Years)", type: "number", defaultValue: "15" }
    ],
    outputType: "json",
    provider: "local"
  },
  {
    slug: "roi-calculator",
    title: "ROI Calculator",
    category: "business-finance",
    description: "Evaluate return on investments, gain/loss ratios, and annualized gains.",
    isAI: false,
    inputFields: [
      { name: "initial", label: "Initial Investment ($)", type: "number", defaultValue: "10000" },
      { name: "final", label: "Final Value ($)", type: "number", defaultValue: "14500" }
    ],
    outputType: "json",
    provider: "local"
  },
  {
    slug: "break-even-calculator",
    title: "Break Even Calculator",
    category: "business-finance",
    description: "Find how many sales are required to cover your fixed and variable operational costs.",
    isAI: false,
    inputFields: [
      { name: "fixed", label: "Fixed Costs (e.g. rent, salaries)", type: "number", defaultValue: "5000" },
      { name: "price", label: "Sale Price per Unit ($)", type: "number", defaultValue: "50" },
      { name: "variable", label: "Variable Cost per Unit ($)", type: "number", defaultValue: "20" }
    ],
    outputType: "json",
    provider: "local"
  },
  {
    slug: "startup-cost-calculator",
    title: "Startup Cost Calculator",
    category: "business-finance",
    description: "Estimate initial capital requirements to get a new venture off the ground.",
    isAI: false,
    inputFields: [
      { name: "assets", label: "One-time Assets ($) (e.g., machinery, software licenses)", type: "number", defaultValue: "8000" },
      { name: "expenses", label: "Monthly Expenses ($) (e.g., hosting, legal fees)", type: "number", defaultValue: "1500" },
      { name: "runway", label: "Required Runway Months", type: "number", defaultValue: "6" }
    ],
    outputType: "json",
    provider: "local"
  },

  // --- IMAGE CONVERTERS (81-90) ---
  {
    slug: "jpg-to-png-converter",
    title: "JPG to PNG Converter",
    category: "image-converter",
    description: "Convert JPG/JPEG images to PNG format instantly.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select JPG Image", type: "file", accept: "image/jpeg,image/jpg" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "png-to-jpg-converter",
    title: "PNG to JPG Converter",
    category: "image-converter",
    description: "Convert PNG images to JPG format instantly.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select PNG Image", type: "file", accept: "image/png" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "webp-to-png-converter",
    title: "WEBP to PNG Converter",
    category: "image-converter",
    description: "Convert WEBP images to PNG format instantly.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select WEBP Image", type: "file", accept: "image/webp" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "png-to-webp-converter",
    title: "PNG to WEBP Converter",
    category: "image-converter",
    description: "Convert PNG images to WEBP format instantly.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select PNG Image", type: "file", accept: "image/png" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "jpg-to-webp-converter",
    title: "JPG to WEBP Converter",
    category: "image-converter",
    description: "Convert JPG images to WEBP format instantly.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select JPG Image", type: "file", accept: "image/jpeg,image/jpg" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "image-resizer",
    title: "Image Resizer",
    category: "image-converter",
    description: "Resize images to specific dimensions (Width & Height) in pixels.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select Image", type: "file", accept: "image/*" },
      { name: "width", label: "Target Width (px)", type: "number", defaultValue: "800" },
      { name: "height", label: "Target Height (px)", type: "number", defaultValue: "600" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "image-compressor",
    title: "Image Compressor",
    category: "image-converter",
    description: "Reduce image file size by modifying resolution and quality compression scales.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select Image", type: "file", accept: "image/*" },
      { name: "quality", label: "Compression Quality (10-100)", type: "number", defaultValue: "70" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "image-cropper",
    title: "Image Cropper",
    category: "image-converter",
    description: "Crop edges of images using rectangular dimension filters.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select Image", type: "file", accept: "image/*" },
      { name: "x", label: "Start X Position (px)", type: "number", defaultValue: "0" },
      { name: "y", label: "Start Y Position (px)", type: "number", defaultValue: "0" },
      { name: "w", label: "Crop Width (px)", type: "number", defaultValue: "400" },
      { name: "h", label: "Crop Height (px)", type: "number", defaultValue: "400" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "background-remover",
    title: "Background Remover",
    category: "image-converter",
    description: "Remove background elements from product or subject shots using HF segmentation.",
    isAI: true,
    inputFields: [
      { name: "file", label: "Select Image", type: "file", accept: "image/*" }
    ],
    outputType: "image",
    provider: "huggingface"
  },
  {
    slug: "image-metadata-remover",
    title: "Image Metadata Remover",
    category: "image-converter",
    description: "Remove EXIF location and camera metadata from image files for privacy safety.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select Image File", type: "file", accept: "image/*" }
    ],
    outputType: "file",
    provider: "local"
  },

  // --- DOCUMENT CONVERTERS (91-100) ---
  {
    slug: "jpg-to-pdf-converter",
    title: "JPG to PDF Converter",
    category: "document-converter",
    description: "Convert JPG/JPEG images into formatted PDF files.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select Image (JPG)", type: "file", accept: "image/jpeg" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "pdf-to-jpg-converter",
    title: "PDF to JPG Converter",
    category: "document-converter",
    description: "Convert PDF pages into high-resolution JPG image sets.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select PDF File", type: "file", accept: ".pdf" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "png-to-pdf-converter",
    title: "PNG to PDF Converter",
    category: "document-converter",
    description: "Convert PNG images into formatted PDF documents.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select Image (PNG)", type: "file", accept: "image/png" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "word-to-pdf-converter",
    title: "Word to PDF Converter",
    category: "document-converter",
    description: "Convert Microsoft Word .docx files into standard PDF files.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select Word File (.docx)", type: "file", accept: ".docx" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "pdf-to-word-converter",
    title: "PDF to Word Converter",
    category: "document-converter",
    description: "Extract text from PDF sheets and save it inside structured Microsoft Word layouts.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select PDF File", type: "file", accept: ".pdf" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "excel-to-pdf-converter",
    title: "Excel to PDF Converter",
    category: "document-converter",
    description: "Format spreadsheet files into structured sheets suitable for PDF printing.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select Excel File (.xlsx)", type: "file", accept: ".xlsx" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "pdf-to-excel-converter",
    title: "PDF to Excel Converter",
    category: "document-converter",
    description: "Scan tables inside PDF sheets and extract columns into CSV or spreadsheet structures.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select PDF File", type: "file", accept: ".pdf" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "ppt-to-pdf-converter",
    title: "PPT to PDF Converter",
    category: "document-converter",
    description: "Turn PowerPoint slides (.pptx) into printable PDF packages.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select Presentation (.pptx)", type: "file", accept: ".pptx" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "text-to-pdf-converter",
    title: "Text to PDF Converter",
    category: "document-converter",
    description: "Save raw text configurations directly inside clean PDF documents.",
    isAI: false,
    inputFields: [
      { name: "text", label: "Document Text", type: "textarea", placeholder: "Type content here..." }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "markdown-to-pdf-converter",
    title: "Markdown to PDF Converter",
    category: "document-converter",
    description: "Format Markdown titles and quotes into a stylized PDF document.",
    isAI: false,
    inputFields: [
      { name: "markdown", label: "Markdown Editor Content", type: "textarea", placeholder: "# Headline \n Write markdown details..." }
    ],
    outputType: "file",
    provider: "local"
  },

  // --- AUDIO & VIDEO TOOLS (101-110) ---
  {
    slug: "video-to-mp3-converter",
    title: "Video to MP3 Converter",
    category: "audio-video",
    description: "Extract audio tracks from video files (like MP4) and save as high-quality MP3s.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select Video File", type: "file", accept: "video/*" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "audio-format-converter",
    title: "Audio Format Converter",
    category: "audio-video",
    description: "Convert audio files between different formats like WAV, MP3, AAC, and OGG.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select Audio File", type: "file", accept: "audio/*" },
      { name: "format", label: "Target Format", type: "select", options: [
        { label: "MP3", value: "mp3" },
        { label: "WAV", value: "wav" },
        { label: "M4A", value: "m4a" }
      ], defaultValue: "mp3" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "audio-noise-cleaner",
    title: "Audio Noise Cleaner",
    category: "audio-video",
    description: "Remove background hiss and hum from vocal recordings using AI filters.",
    isAI: true,
    inputFields: [
      { name: "file", label: "Select Voice Recording", type: "file", accept: "audio/*" }
    ],
    outputType: "file",
    provider: "huggingface"
  },
  {
    slug: "video-compressor",
    title: "Video Compressor",
    category: "audio-video",
    description: "Compress video files into web-friendly sizes without losing critical details.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select Video File", type: "file", accept: "video/*" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "audio-trimmer",
    title: "Audio Trimmer",
    category: "audio-video",
    description: "Cut unwanted sections from audio files by selecting specific start and end marks.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select Audio File", type: "file", accept: "audio/*" },
      { name: "start", label: "Start Position (seconds)", type: "number", defaultValue: "0" },
      { name: "end", label: "End Position (seconds)", type: "number", defaultValue: "10" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "video-thumbnail-extractor",
    title: "Video Thumbnail Extractor",
    category: "audio-video",
    description: "Grab high-quality frame captures from video clips at specific timestamps.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select Video File", type: "file", accept: "video/*" },
      { name: "time", label: "Timestamp (seconds)", type: "number", defaultValue: "5" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "mp4-to-gif-converter",
    title: "MP4 to GIF Converter",
    category: "audio-video",
    description: "Convert video loops into animated GIF files.",
    isAI: false,
    inputFields: [
      { name: "file", label: "Select MP4 File", type: "file", accept: "video/mp4" }
    ],
    outputType: "file",
    provider: "local"
  },
  {
    slug: "subtitle-generator",
    title: "Subtitle Generator",
    category: "audio-video",
    description: "Generate structured SRT or VTT subtitle lines from video file speech segments using transcription AI.",
    isAI: true,
    inputFields: [
      { name: "file", label: "Upload Video File", type: "file", accept: "video/*" }
    ],
    outputType: "text",
    provider: "huggingface"
  },
  {
    slug: "speech-to-text",
    title: "Speech to Text",
    category: "audio-video",
    description: "Convert audio voice recordings into textual scripts using Whisper AI.",
    isAI: true,
    inputFields: [
      { name: "file", label: "Select Audio Recording", type: "file", accept: "audio/*" }
    ],
    outputType: "text",
    provider: "huggingface"
  },
  {
    slug: "text-to-speech",
    title: "Text to Speech",
    category: "audio-video",
    description: "Create human-like speech voiceovers from written scripts.",
    isAI: true,
    inputFields: [
      { name: "text", label: "Vocal Script", type: "textarea", placeholder: "Type what you want the voice to say..." }
    ],
    outputType: "file",
    provider: "huggingface"
  },

  // --- YOUTUBE OPTIMIZATION SUITE (111-130) ---
  {
    slug: "thumbnail-ctr-analyzer",
    title: "Thumbnail CTR Analyzer",
    category: "youtube-optimization",
    description: "Analyze visual elements, color contrast, and faces inside thumbnails to predict click-through rates.",
    isAI: true,
    inputFields: [
      { name: "file", label: "Upload Thumbnail Image", type: "file", accept: "image/*" },
      { name: "concept", label: "Video Concept Description", type: "textarea", placeholder: "Describe the target concept..." }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "thumbnail-roast-tool",
    title: "Thumbnail Roast Tool",
    category: "youtube-optimization",
    description: "Receive unfiltered, constructive design feedback on what makes your thumbnail unclickable.",
    isAI: true,
    inputFields: [
      { name: "file", label: "Upload Thumbnail Image", type: "file", accept: "image/*" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "thumbnail-ab-tester",
    title: "Thumbnail A/B Tester",
    category: "youtube-optimization",
    description: "Compare two thumbnails side-by-side to determine which visual composition has better click intent.",
    isAI: true,
    inputFields: [
      { name: "fileA", label: "Thumbnail option A", type: "file", accept: "image/*" },
      { name: "fileB", label: "Thumbnail option B", type: "file", accept: "image/*" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "thumbnail-text-checker",
    title: "Thumbnail Text Checker",
    category: "youtube-optimization",
    description: "Scan your thumbnail to ensure text is readable, short (under 3 words), and clear on mobile screens.",
    isAI: true,
    inputFields: [
      { name: "file", label: "Upload Thumbnail Image", type: "file", accept: "image/*" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "thumbnail-color-analyzer",
    title: "Thumbnail Color Analyzer",
    category: "youtube-optimization",
    description: "Extract color palettes and evaluate color harmony, vibrancy, and readability against dark mode interfaces.",
    isAI: true,
    inputFields: [
      { name: "file", label: "Upload Thumbnail Image", type: "file", accept: "image/*" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "youtube-hook-score-checker",
    title: "YouTube Hook Score Checker",
    category: "youtube-optimization",
    description: "Paste your first 30 seconds script and receive a hook retention score (out of 100).",
    isAI: true,
    inputFields: [
      { name: "script", label: "Script Intro / Hook Text", type: "textarea", placeholder: "Paste script intro..." }
    ],
    outputType: "markdown",
    provider: "groq"
  },
  {
    slug: "youtube-title-ctr-analyzer",
    title: "YouTube Title CTR Analyzer",
    category: "youtube-optimization",
    description: "Score title concepts against emotional hooks, readability, curiosity factors, and search keywords.",
    isAI: true,
    inputFields: [
      { name: "title", label: "Video Title Option", type: "text", placeholder: "e.g. I Spent 100 Days in a VR Helmet" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "title-roast-tool",
    title: "Title Roast Tool",
    category: "youtube-optimization",
    description: "Get brutal feedback on why your title is boring and how to make it immediately interesting.",
    isAI: true,
    inputFields: [
      { name: "title", label: "Video Title Draft", type: "text", placeholder: "e.g. Setting up a new mechanical keyboard" }
    ],
    outputType: "markdown",
    provider: "groq"
  },
  {
    slug: "title-rewriter",
    title: "Title Rewriter",
    category: "youtube-optimization",
    description: "Rewrite simple titles using psychology patterns (fear of missing out, shock value, curiosity gaps).",
    isAI: true,
    inputFields: [
      { name: "title", label: "Original Video Title", type: "text", placeholder: "e.g. Coding a blog application" }
    ],
    outputType: "text",
    provider: "groq"
  },
  {
    slug: "viral-title-generator",
    title: "Viral Title Generator",
    category: "youtube-optimization",
    description: "Generate MrBeast-style titles that command clicks and emotional reactions.",
    isAI: true,
    inputFields: [
      { name: "topic", label: "Core Concept", type: "text", placeholder: "e.g. Surviving in a wild forest with only a knife" }
    ],
    outputType: "text",
    provider: "groq"
  },
  {
    slug: "style-based-title-generator",
    title: "Style-Based Title Generator",
    category: "youtube-optimization",
    description: "Generate titles matching specific creator profiles (e.g. Marques Brownlee, Ali Abdaal, Casey Neistat).",
    isAI: true,
    inputFields: [
      { name: "topic", label: "Video Subject", type: "text", placeholder: "e.g. iPhone 17 review after 1 month" },
      { name: "creatorStyle", label: "Creator Profile", type: "select", options: [
        { label: "Marques Brownlee (Clean, Direct, Tech-first)", value: "mkbhd" },
        { label: "Ali Abdaal (Mindful, Productive, Friendly)", value: "abdaal" },
        { label: "Casey Neistat (Narrative, Bold, Vlog-like)", value: "neistat" }
      ], defaultValue: "mkbhd" }
    ],
    outputType: "text",
    provider: "groq"
  },
  {
    slug: "title-ab-tester",
    title: "Title A/B Tester",
    category: "youtube-optimization",
    description: "Compare two title drafts and predict search click percentages using AI analytics.",
    isAI: true,
    inputFields: [
      { name: "titleA", label: "Title Concept A", type: "text", placeholder: "e.g. Why Coding is Getting Harder" },
      { name: "titleB", label: "Title Concept B", type: "text", placeholder: "e.g. The Real Reason You're Failing to Learn Coding" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "title-length-checker",
    title: "Title Length Checker",
    category: "youtube-optimization",
    description: "Checks character and pixel length of titles to ensure they don't get truncated in YouTube search layout limits.",
    isAI: false,
    inputFields: [
      { name: "title", label: "Video Title Draft", type: "text", defaultValue: "My standard title draft goes here" }
    ],
    outputType: "json",
    provider: "local"
  },
  {
    slug: "keyword-optimizer",
    title: "Keyword Optimizer",
    category: "youtube-optimization",
    description: "Identify high-search-intent, low-competition keywords to place in titles and description text segments.",
    isAI: true,
    inputFields: [
      { name: "niche", label: "Video Topic / Niche", type: "text", placeholder: "e.g. custom mechanical keyboard builds" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "curiosity-gap-analyzer",
    title: "Curiosity Gap Analyzer",
    category: "youtube-optimization",
    description: "Evaluate if your title leaves a strong open loop that forces viewers to click to find the answer.",
    isAI: true,
    inputFields: [
      { name: "title", label: "Video Title Draft", type: "text", placeholder: "e.g. This simple coding habit saved my career" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "search-intent-checker",
    title: "Search Intent Checker",
    category: "youtube-optimization",
    description: "Identify whether searchers typing this keyword want informational, transactional, or entertaining content.",
    isAI: true,
    inputFields: [
      { name: "keyword", label: "Target Keyword phrase", type: "text", placeholder: "e.g. build a nextjs portfolio" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "title-thumbnail-match-checker",
    title: "Title + Thumbnail Match Checker",
    category: "youtube-optimization",
    description: "Assess if title copy and thumbnail visuals work together without creating confusing cognitive friction.",
    isAI: true,
    inputFields: [
      { name: "file", label: "Upload Thumbnail Image", type: "file", accept: "image/*" },
      { name: "title", label: "Video Title", type: "text", placeholder: "e.g. I Spent 24 Hours in the Metaverse" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "video-packaging-score-checker",
    title: "Video Packaging Score Checker",
    category: "youtube-optimization",
    description: "Combine title, thumbnail design, and core hook script to get an overall packaging rating.",
    isAI: true,
    inputFields: [
      { name: "file", label: "Upload Thumbnail Image", type: "file", accept: "image/*" },
      { name: "title", label: "Video Title", type: "text", placeholder: "e.g. How to double your reading speed" },
      { name: "hook", label: "First 3 sentences of script", type: "textarea", placeholder: "Paste hook..." }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "viral-potential-checker",
    title: "Viral Potential Checker",
    category: "youtube-optimization",
    description: "Grade the broad-audience appeal of your video concept, thumbnail, and title to predict scalability.",
    isAI: true,
    inputFields: [
      { name: "concept", label: "Video Core Concept", type: "textarea", placeholder: "e.g. building a shelter out of mud in the tropical rainforest" }
    ],
    outputType: "markdown",
    provider: "gemini"
  },
  {
    slug: "audience-retention-predictor",
    title: "Audience Retention Predictor",
    category: "youtube-optimization",
    description: "Predict retention drop-offs by evaluating hook pacing and scripting flow elements.",
    isAI: true,
    inputFields: [
      { name: "script", label: "Script (Paste first 2 minutes or transcript)", type: "textarea", placeholder: "Paste script text here..." }
    ],
    outputType: "markdown",
    provider: "gemini"
  }
];

// Hydrate FAQs dynamically to keep file size optimized while meeting user constraints
export const TOOLS: Tool[] = rawTools.map((t) => ({
  ...t,
  faq: getFAQ(t.title, CATEGORIES.find((cat) => cat.id === t.category)?.name || t.category, t.isAI),
  seoDescription: `Use ${t.title} online for free. Fast, simple, ${t.isAI ? "AI-powered" : "browser-based"} tool for creators, students, freelancers, and businesses.`,
}));

export const getToolBySlug = (slug: string): Tool | undefined => {
  return TOOLS.find((t) => t.slug === slug);
};
