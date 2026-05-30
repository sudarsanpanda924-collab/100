export function getPrompt(toolSlug: string, inputs: Record<string, string>): string {
  switch (toolSlug) {
    // --- AI WRITING TOOLS ---
    case "ai-cold-email-writer":
      return `Write a highly personalized cold email to a recipient who is a "${inputs.recipient}".
Our core value proposition / offer is: "${inputs.offer}".
Make the tone of the email "${inputs.tone || "professional"}".
The email must include a catchy subject line, a clear value hook, address prospect pain points, and end with a low-friction call to action. Keep it under 150 words and well-spaced.`;

    case "ai-product-description-generator":
      return `Create a high-converting, SEO-optimized product description for:
Product Name: "${inputs.name}"
Key Features: "${inputs.features}"
Target Audience: "${inputs.audience}"
Format the response with a compelling hook, a short paragraph describing the benefits, and a bulleted list of the key features. Add a strong Call to Action (CTA) at the end.`;

    case "ai-bio-generator":
      return `Write a professional and captivating profile bio for:
Name: "${inputs.name}"
Profession & Skills: "${inputs.profession}"
Vibe/Style: "${inputs.style}"
Make it concise (max 3 options, under 160 characters per option), with appropriate spacing and optional emojis.`;

    case "ai-tweet-rewriter":
      return `Rewrite the following draft tweet to maximize engagement and virality:
Draft: "${inputs.tweet}"
Goal: "${inputs.goal}"
Provide 3 variations:
1. Punchy & Direct (Short)
2. Hook + Value (Thread-starter style)
3. Question / Engagement Bait (Asks for replies)
Keep each option under 280 characters. Do not write anything other than the options.`;

    case "linkedin-post-formatter":
      return `Format this raw post into an engaging LinkedIn post:
Raw Draft: "${inputs.post}"
Hook Style: "${inputs.hookStyle}"
Instructions:
- Start with a scroll-stopping hook based on the "${inputs.hookStyle}" style.
- Use wide line spacing (1-2 sentences per paragraph) for readability.
- Add relevant bullet points.
- Include 3 relevant hashtags at the bottom.
- Add a conversational Call to Action (CTA) requesting opinions.`;

    case "freelancer-proposal-generator":
      return `Write a winning project proposal for this job description:
"${inputs.jobDescription}"
My relevant skills and portfolio: "${inputs.skills}"
Include:
1. A warm opening acknowledging the client's problem.
2. 2-3 sentences explaining exactly how I will solve it.
3. Proof of experience/skills matching their requirements.
4. A Call to Action requesting a quick 10-minute call.
Keep the tone professional, confident, and direct.`;

    case "contract-simplifier":
      return `Simplify the following legal clause/text into clear, plain English that a non-lawyer can understand:
Legal text: "${inputs.clause}"
Format the output with:
- **Simplified Explanation**: 1-2 easy sentences.
- **Key Takeaways / Risks**: Bullet points outlining what this means for me.`;

    case "ai-meeting-notes-summarizer":
      return `Summarize the following meeting notes/transcript segment into clean, structured takeaways:
Notes: "${inputs.notes}"
Output format:
- **Meeting Summary**: A brief paragraph summarizing the discussion.
- **Key Decisions**: Bullet points of decisions made.
- **Action Items**: A list of tasks showing who is responsible (e.g. [Sarah] Fix landing page).`;

    case "ai-startup-idea-generator":
      return `Brainstorm 3 high-potential startup ideas focused on:
Niche/Industry: "${inputs.niche}"
Current Tech/Trend: "${inputs.trend}"
For each idea, provide:
1. **Startup Name Idea** (catchy & brandable)
2. **The Problem** (the pain point addressed)
3. **The Solution** (how it solves it using the trend)
4. **Monetization Model** (how it makes money)`;

    case "ai-ad-copy-generator":
      return `Generate 3 ad copy variations for:
Product Name & Offer: "${inputs.product}"
Channel: "${inputs.channel}"
Include a Scroll-Stopping Headline, Primary Text (Body), and a clear Call to Action (CTA). Tailor the tone and length to the "${inputs.channel}" platform.`;

    case "blog-intro-generator":
      return `Write an engaging intro paragraph for a blog post with the title: "${inputs.title}".
Topic Summary: "${inputs.summary}".
Use the AIDA framework (Attention, Interest, Desire, Action) to hook the reader immediately. Max 100 words.`;

    case "blog-outline-generator":
      return `Create a detailed, SEO-friendly outline for a blog post titled: "${inputs.title}".
Target Keywords to include: "${inputs.keywords}".
Structure the outline with H2 and H3 headings, and include a brief 1-sentence note for what to cover under each heading.`;

    case "paragraph-rewriter":
      return `Rewrite the following paragraph:
Paragraph: "${inputs.paragraph}"
Mode: "${inputs.mode}"
Make sure to improve clarity and flow while adhering to the specified mode.`;

    case "grammar-fixer":
      return `Fix all grammar, spelling, punctuation, and wording errors in the following text. Do not rewrite completely, just make it correct and natural:
Text: "${inputs.text}"
Output only the corrected version, followed by a bulleted list of key fixes made.`;

    case "email-subject-line-generator":
      return `Generate 10 highly clickable email subject lines for:
Email Content/Offer: "${inputs.content}"
Style: "${inputs.style}"
Make them short, engaging, and designed to increase open rates. Do not include quotes around them.`;

    case "resume-summary-generator":
      return `Write 3 different versions of a professional resume summary for:
Role: "${inputs.profession}"
Skills & Experience: "${inputs.experience}"
Keep each option under 3 sentences. Highlight impact and key technologies.`;

    case "cover-letter-generator":
      return `Write a personalized cover letter for:
Target Job: "${inputs.jobTitle}"
Job Details: "${inputs.jobDetails}"
My Experience: "${inputs.resume}"
Ensure the cover letter shows enthusiasm for the role, aligns my skills with the job requirements, and maintains a professional tone.`;

    case "business-proposal-generator":
      return `Write a formal business proposal for:
Client: "${inputs.client}"
Project Scope: "${inputs.project}"
Structure it with sections: Executive Summary, Proposed Solution, Deliverables, Timeline, and Investment.`;

    case "product-review-generator":
      return `Generate a realistic product review:
Product: "${inputs.product}"
Pros: "${inputs.pros}"
Cons: "${inputs.cons}"
Rating: "${inputs.rating} Stars"
Tone: Balanced and helpful for prospective buyers.`;

    case "social-media-post-generator":
      return `Generate social media posts for:
Message: "${inputs.message}"
Target Platform: "${inputs.platforms}"
Provide tailored text, formatting, and hashtag recommendations for the selected platform format.`;

    // --- YOUTUBE CREATOR TOOLS ---
    case "youtube-title-generator":
      return `Generate 10 attention-grabbing YouTube titles for:
Topic: "${inputs.topic}"
Style: "${inputs.style}"
Include curiosity-inducing, search-friendly, and psychological-based title variations. Keep them under 70 characters.`;

    case "youtube-description-generator":
      return `Generate a complete YouTube description for a video with:
Title: "${inputs.title}"
Summary: "${inputs.summary}"
Include:
- A strong 2-line intro hook (optimized for search preview).
- An detailed section of what's covered.
- Placeholder timestamps ([0:00] Intro, etc.).
- Call to Actions (Subscribe, links).
- 3 hashtags.`;

    case "youtube-tags-generator":
      return `Generate 30 high-performing search tags for a YouTube video about:
Topic: "${inputs.topic}"
Provide the tags as a comma-separated list. No explanations.`;

    case "youtube-hashtag-generator":
      return `Generate 15 trending hashtags for a YouTube video about:
Topic: "${inputs.topic}"
Provide the hashtags starting with #, separated by spaces.`;

    case "youtube-script-outline-generator":
      return `Create a structured YouTube video script outline for:
Topic: "${inputs.topic}"
Video Duration: "${inputs.length}"
Structure:
1. Hook (First 30 seconds)
2. Intro & Value Proposition
3. Body points (H2 sections with key details to explain)
4. Outro & Call to Action (CTR transfer)`;

    case "youtube-hook-score-checker":
      return `Evaluate this YouTube script hook and give it a retention score out of 100:
Script Hook: "${inputs.script}"
Provide:
- **Hook Score**: X/100
- **Strengths**: What works well.
- **Weaknesses**: Why viewers might click away.
- **Rewritten Version**: 2 improved variations of this exact hook.`;

    case "youtube-hook-generator":
      return `Write 5 different visual and verbal hook options for the first 30 seconds of a video about:
"${inputs.topic}"
Focus on emotional hooks, shocking facts, curiosity gaps, and fast-paced staging setups.`;

    case "thumbnail-idea-generator":
      return `Generate 3 distinct thumbnail concepts for:
Video Title: "${inputs.title}"
For each concept, specify:
1. **Visual Scene**: What is in the background and foreground.
2. **Text Overlay**: 1-3 high-impact words.
3. **Color & Emotion**: Vibe, contrast, and emotions targeted.`;

    case "youtube-channel-bio-generator":
      return `Write a compelling channel bio for:
Niche: "${inputs.niche}"
Value Proposition: "${inputs.audience}"
Format the response with a catchy header, a description of the content, upload schedules (placeholder), and a subscription CTA.`;

    case "youtube-video-summary-generator":
      return `Analyze this YouTube transcript and create a concise summary:
Transcript: "${inputs.transcript}"
Provide a brief overview, 5 key take-aways, and actionable summaries.`;

    case "youtube-seo-score-checker":
      return `Analyze the YouTube metadata details:
Title: "${inputs.title}"
Description: "${inputs.desc}"
Keywords: "${inputs.tags}"
Provide a detailed report:
1. **SEO Score**: X/100
2. **Title Analysis**: Length, keyword placement.
3. **Description Analysis**: Density of search terms.
4. **Actionable Recommendations**: How to reach a 100/100 SEO score.`;

    case "youtube-shorts-script-generator":
      return `Write a fast-paced 60-second YouTube Shorts script for:
Topic: "${inputs.topic}"
Use a split table or two-column format showing:
- **Audio (Voiceover)**: Punchy, spoken words.
- **Visuals & Editing Cues**: Zoom-ins, text overlays, sound effects.`;

    case "youtube-community-post-generator":
      return `Generate 3 community post templates for a channel announcing:
"${inputs.purpose}"
Provide:
1. A conversational engagement post (asking a question).
2. A poll template with options.
3. A teaser/hype post for an upcoming video.`;

    case "youtube-video-idea-generator":
      return `Brainstorm 10 trending YouTube video ideas for a channel in this niche:
Niche: "${inputs.niche}"
For each idea, write a working title, a 1-sentence hook concept, and the target audience.`;

    case "youtube-intro-generator":
      return `Generate 3 intro script variations for a video titled: "${inputs.title}".
Keep them under 30 seconds. Focus on immediate value delivery and stopping drop-offs.`;

    case "youtube-outro-generator":
      return `Write 3 variations of a high-CTR outro script that redirects the viewer to a video about: "${inputs.videoTopic}".
Instruct the editor on visual elements (pointing to endscreen cards) and voiceover scripting.`;

    // --- INSTAGRAM TOOLS ---
    case "instagram-caption-generator":
      return `Write 3 engaging Instagram captions for a post about:
Topic: "${inputs.topic}"
Vibe: "${inputs.vibes}"
Provide formatting (line breaks, emojis, hashtags). Make one option short (punchy), one medium (storytelling), and one interactive (asks a question).`;

    case "instagram-hashtag-generator":
      return `Generate 30 curated Instagram hashtags for the niche: "${inputs.niche}".
Categorize them into:
- 10 High Volume (Broad appeal, competitive)
- 10 Medium Volume (Niche-specific)
- 10 Low Volume (Highly targeted, easy ranking)`;

    case "instagram-bio-generator":
      return `Create 5 different Instagram bio designs for:
Niche/Goal: "${inputs.niche}"
Link/CTA: "${inputs.link}"
Use special characters, vertical line formatting, and bullet symbols to make them stand out.`;

    case "instagram-post-idea-generator":
      return `Generate 7 Instagram post ideas for the theme: "${inputs.theme}".
Define the layout (reels, carousel, or graphic) and explain the visual concept.`;

    case "instagram-reel-hook-generator":
      return `Generate 5 scroll-stopping hooks for an Instagram Reel about:
"${inputs.topic}"
Include both visual hooks (what to show on screen) and text overlay options.`;

    case "instagram-content-calendar-generator":
      return `Generate a complete 7-day Instagram content calendar for:
Niche: "${inputs.niche}"
Define for each day: Post Type (Reel/Carousel/Post), Visual Concept, Caption Draft, Hook, and hashtags.`;

    case "instagram-story-idea-generator":
      return `Brainstorm 10 Instagram Story ideas to achieve:
Goal: "${inputs.goal}"
Include poll ideas, slider setups, interactive questions, and raw daily clips.`;

    case "instagram-carousel-outline-generator":
      return `Write a slide-by-slide outline (up to 8 slides) for an Instagram carousel about:
Topic: "${inputs.topic}"
Provide exact title texts, bullet contents, and visual cues for each slide.`;

    case "instagram-dm-reply-generator":
      return `Write a polite, conversational Instagram DM reply for:
User message: "${inputs.msg}"
Our response goal: "${inputs.responseGoal}"
Include emojis and keep the language casual and helpful.`;

    case "instagram-username-idea-generator":
      return `Generate 20 creative, available-sounding Instagram username ideas using:
Keywords: "${inputs.keywords}"
Categorize them by aesthetic (professional, aesthetic, minimalist, playful).`;

    // --- AI IMAGE TOOLS ---
    case "ai-image-prompt-generator":
      return `Expand this simple image description into a hyper-detailed prompt for image generators (Midjourney, DALL-E, Stable Diffusion):
Concept: "${inputs.concept}"
Art Style: "${inputs.style}"
Make sure to specify lighting, camera angle, atmosphere, rendering engines (e.g. Octane Render), and detailed texture prompts. Output only the prompt block.`;

    case "ai-thumbnail-prompt-generator":
      return `Generate a detailed Stable Diffusion / Midjourney visual prompt optimized for YouTube thumbnails:
Concept: "${inputs.concept}"
Focus on vibrant colors, extreme expressions, high contrast, clean backgrounds, and dramatic cinematic lighting.`;

    case "ai-logo-prompt-generator":
      return `Create 3 detailed prompts for a logo generator:
Brand Name: "${inputs.brand}"
Style: "${inputs.logoStyle}"
Ensure the prompts specify flat vector styling, high contrast, isolated white backgrounds, and minimalist aesthetics.`;

    case "ai-wallpaper-prompt-generator":
      return `Generate a 4K resolution image prompt for a background/wallpaper:
Theme: "${inputs.theme}"
Specify detail density, color schemes, lighting, and cinematic landscape parameters.`;

    case "ai-product-photography-prompt-generator":
      return `Generate a commercial-grade product photography prompt:
Product Details: "${inputs.product}"
Specify studio lighting (softboxes, rim light), depth of field, surface textures, backdrop, and high-end camera settings (e.g. 85mm lens, f/1.8).`;

    case "ai-thumbnail-text-generator":
      return `For a video titled: "${inputs.title}"
Suggest 5 options for text overlays to put on the thumbnail (max 3 words per option), along with font style, colors, and layout recommendations.`;

    case "ai-color-palette-generator":
      return `Create a complete color palette report for:
Mood/Brand: "${inputs.mood}"
Provide:
- 5 harmonious colors with Hex Codes.
- Color Psychology and Mood analysis.
- UI Design Usage guidelines (which is background, primary, text, accent).`;

    case "ai-character-prompt-generator":
      return `Generate a detailed prompt for generating a consistent character concept:
Character concept: "${inputs.concept}"
Include descriptions of clothing, hair, age, facial features, pose, camera angle, and artistic styling.`;

    case "ai-poster-prompt-generator":
      return `Write a detailed image prompt to generate a poster:
Theme: "${inputs.theme}"
Include layout instructions, typography spaces, vintage paper textures, or clean vector prints.`;

    case "ai-banner-prompt-generator":
      return `Create an ultra-wide image prompt (aspect ratio 3:1) for LinkedIn or Twitter headers:
Theme/Industry: "${inputs.industry}"
Focus on professional abstract designs, tech symbols, clean spacing, and modern gradient backgrounds.`;

    case "ai-ad-creative-prompt-generator":
      return `Create a high-converting advertisement creative image prompt:
Product description: "${inputs.product}"
Specify target emotions, professional retail layout, clean text space, and vibrant modern coloring.`;

    case "ai-3d-render-prompt-generator":
      return `Generate a 3D isometric render prompt for:
Object/Room: "${inputs.object}"
Specify clay render, pastel gradients, volumetric lighting, blender styling, and isolated background look.`;

    case "ai-anime-prompt-generator":
      return `Generate a detailed anime-style image prompt:
Scene/Subject: "${inputs.subject}"
Include instructions matching studio Ghibli or modern Makoto Shinkai quality (sunbeams, detailed sky, rich watercolors, anime aesthetic).`;

    // --- PDF & OCR TOOLS ---
    case "pdf-invoice-data-extractor":
      return `Carefully analyze this raw text parsed from an invoice and extract all key data points:
Raw Text: "${inputs.text}"
Output structured Markdown:
- **Seller details**: Name, Address.
- **Client details**: Name, Address.
- **Invoice Metadata**: Number, Date, Due Date.
- **Line Items**: Table format with Item, Quantity, Unit Price, Total.
- **Totals**: Subtotal, Tax, Final Amount.`;

    case "resume-ats-score-checker":
      return `Act as an expert ATS (Applicant Tracking System) algorithm. Compare this resume against the job description:
Resume Text: "${inputs.resumeText}"
Job Description: "${inputs.jobDesc}"
Provide:
1. **ATS Compatibility Score**: X/100
2. **Missing Keywords**: Key terms/skills present in the job description but missing in the resume.
3. **Formatting & Structure Issues**: Check for common ATS errors.
4. **Actionable Suggestions**: Specific changes to raise the compatibility score.`;

    // --- BUSINESS & FINANCE TOOLS ---
    case "business-name-availability-checker":
      return `Check business name availability constraints and brainstorm branding variations for:
Proposed Name: "${inputs.name}"
Analyze:
- Pronunciation, memorize potential, brandability score.
- Domain availability suggestions (suggest alternative extensions like .ai, .co).
- Trademark class suggestions.
- Generate 5 catchy alternative name concepts.`;

    // --- YOUTUBE OPTIMIZATION SUITE ---
    case "thumbnail-ctr-analyzer":
      return `Analyze the YouTube thumbnail details and video concept:
Concept: "${inputs.concept}"
Provide a simulated design CTR report:
1. **Estimated CTR potential**: (High, Med, Low)
2. **Visual Hierarchy Analysis**: What element grabs attention first.
3. **Contrast & Text Readability**: Evaluation of visibility on mobile layouts.
4. **Recommendations**: Color shifts, face sizing, or text shortening to improve clicks.`;

    case "thumbnail-roast-tool":
      return `Perform a brutal, honest, yet constructive roast of this thumbnail concept:
Concept: "${inputs.concept || "standard setup"}"
Point out all visual flaws, boring compositions, unreadable text placements, and explain why viewers would scroll past it. Give clear steps to save it.`;

    case "thumbnail-ab-tester":
      return `Compare two thumbnail descriptions and determine the winner:
Thumbnail A Concept: "${inputs.fileA}"
Thumbnail B Concept: "${inputs.fileB}"
Provide:
- **Winner Prediction**: (Thumbnail A or B)
- **Design Comparison**: Contrast, readability, curiosity loop.
- **Audience Impact Analysis**: Which triggers higher clicking emotions.`;

    case "thumbnail-text-checker":
      return `Evaluate text overlays in this thumbnail concept:
Thumbnail details: "${inputs.concept || "standard preview"}"
Analyze font size, background contrast, word count, and mobile sizing readability.`;

    case "thumbnail-color-analyzer":
      return `Analyze the color spectrum of this thumbnail concept:
Thumbnail details: "${inputs.concept || "standard image"}"
Check for complementary colors, background isolation, brightness, and standard visual patterns.`;

    case "youtube-title-ctr-analyzer":
      return `Perform a simulated CTR audit for this YouTube title:
Title: "${inputs.title}"
Provide:
1. **Click-Through Potential**: Score out of 100.
2. **Emotional Triggers**: Fear of missing out, curiosity, anger, excitement.
3. **Character Optimization Check**: Length, keyword placement.
4. **3 Higher-CTR Alternatives**: Rewritten versions.`;

    case "title-roast-tool":
      return `Roast this YouTube title draft and explain why it will get 0 views:
Title: "${inputs.title}"
Point out why it is boring, too long, too generic, or lacks stakes. Provide 3 viral replacements.`;

    case "title-rewriter":
      return `Rewrite the YouTube title:
Original Title: "${inputs.title}"
Provide 5 rewrites based on:
1. Curiosity Loop (leaves a question unanswered)
2. Extreme Contrast (contradiction)
3. Fear of Missing Out (FOMO)
4. Listicle/Speed
5. MrBeast-style story stakes`;

    case "viral-title-generator":
      return `Generate 10 viral YouTube titles for the concept:
"${inputs.topic}"
Use extreme action verbs, high stakes, time limits, or numerical highlights. Keep them clickable but avoid pure clickbait.`;

    case "style-based-title-generator":
      return `Generate 5 YouTube titles for the topic: "${inputs.topic}"
Tailor them exactly to the style of: "${inputs.creatorStyle}".
Make sure to explain why these titles match the creator's upload history and tone.`;

    case "title-ab-tester":
      return `Perform an A/B CTR prediction on two title options:
Title A: "${inputs.titleA}"
Title B: "${inputs.titleB}"
Compare keyword SEO potential, curiosity loops, readability speed, and declare a statistical winner with reasons.`;

    case "keyword-optimizer":
      return `Identify high-potential keywords and write optimized video tags for:
Niche: "${inputs.niche}"
Provide search volumes (estimated), competition level, and direct combinations of keyword clusters to use.`;

    case "curiosity-gap-analyzer":
      return `Analyze the curiosity gap of this title:
Title: "${inputs.title}"
Rate the title's open loop (out of 10). Detail if the user is giving away too much information in the title, and rewrite it to make clicking mandatory.`;

    case "search-intent-checker":
      return `Check the search intent for:
Keyword: "${inputs.keyword}"
Detail whether the user wants informational tutorials, broad entertainment, product comparison, or transaction. Suggest the exact video style that fits this intent.`;

    case "title-thumbnail-match-checker":
      return `Check the visual alignment between:
Title: "${inputs.title}"
Thumbnail: "${inputs.concept || "standard image"}"
Check for cognitive friction. If the thumbnail says one thing and the title says another, highlight the clash and recommend a unified hook strategy.`;

    case "video-packaging-score-checker":
      return `Audit the entire packaging package of a video:
Title: "${inputs.title}"
Thumbnail: "${inputs.concept || "standard preview"}"
Hook script: "${inputs.hook}"
Score the overall combination out of 100 and identify the weakest link in the chain.`;

    case "viral-potential-checker":
      return `Evaluate the viral ceiling of this video concept:
Concept: "${inputs.concept}"
Check broad audience appeal, shareability triggers, trending nature, and international search interest.`;

    case "audience-retention-predictor":
      return `Predict retention drops based on this script segment:
Script: "${inputs.script}"
Identify sentences that are too slow, filler words, or places where the user might close the video. Suggest cuts and visuals.`;

    default:
      return `Create a high-quality output for the tool: "${toolSlug}".
Inputs: ${JSON.stringify(inputs)}`;
  }
}
