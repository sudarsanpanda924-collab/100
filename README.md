# ToolVerse AI – 100+ Free AI Tools

ToolVerse AI is a complete production-ready SaaS platform featuring 130 premium tools for creators, students, freelancers, agencies, and businesses. Users can execute tools instantly without log-in.

## Features
- **Credit Limit Control**: AI tools are rate-limited to 5 runs/day per client (monitored via IP & browser fingerprints stored in Firestore).
- **Unlimited Utilities**: 50+ Non-AI tools (such as document converters and business calculators) can be run without limits.
- **Provider Fallback Chain**: Automatically routes text generation calls with fallback support: Gemini (Primary) &rarr; Groq (Secondary) &rarr; OpenRouter (Fallback).
- **Media Builders**: Pollinations AI (Images) and Hugging Face serverless inference models (OCR speech translation, background removal).
- **SEO Ready**: Automated XML Sitemap generation, Robots configuration, breadcrumbs, OpenGraph tags, and JSON-LD schema objects on dynamic pages.

---

## Technical Stack
- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Next.js App Route APIs.
- **Database**: Firebase Firestore.
- **Form Handlers**: React Hook Form, HTML5 FileReader buffers.

---

## Getting Started

### 1. Install Dependencies
Run the following command at the root of the project to install all modules:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the project root folder and insert the following parameters:

```env
# Google Gemini API key
GEMINI_API_KEY=your_gemini_api_key_here

# Groq API key
GROQ_API_KEY=your_groq_api_key_here

# OpenRouter API key (fallback support)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Hugging Face Inference API key (for Speech, OCR, BG removal)
HF_API_KEY=your_hugging_face_token_here

# Firebase Client Configuration (Usage Limiter database)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

*Note: If no Firebase configuration is present, the app will automatically slide into a mock in-memory database mode for frictionless local testing.*

### 3. Run Development Server
Run the local dev command:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser to check the dashboard.

---

## Deployment

### Vercel Deployment
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project root directory and follow instructions.
3. Configure the environment variables inside the Vercel project settings dashboard.
4. Run production release: `vercel --prod`.

### Firebase Deployment
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Authenticate: `firebase login`
3. Initialize hosting and Firestore: `firebase init`
4. Build NextJS application: `npm run build`
5. Deploy assets: `firebase deploy`
