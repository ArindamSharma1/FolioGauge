# Portfolio Auto-Evaluator: Complete Project Blueprint

## 📋 Project Overview

**Name:** FolioGauge (or your preferred name)

**Description:** An AI-powered tool that analyzes developer and designer portfolios, providing detailed scores, feedback, and improvement suggestions to increase hiring probability.

**Target Users:** 
- Junior/Mid-level developers building portfolios
- Designers creating their showcase websites
- Bootcamp graduates entering job market
- Freelancers wanting to improve their online presence

**Core Value Proposition:** Get professional portfolio feedback in 5 minutes instead of paying ₹5,000-20,000 for consultant reviews.

---

## 🎯 Features & Functionality

### Phase 1 - MVP (Weeks 1-4)
**Core Features:**
1. Portfolio URL submission
2. Automated analysis of:
   - Website structure and navigation
   - Project descriptions quality
   - Code quality (if GitHub linked)
   - Visual design consistency
   - Content clarity
3. Score generation (0-100)
4. AI-generated improvement report
5. PDF export of results

### Phase 2 - Enhanced (Weeks 5-8)
**Additional Features:**
1. Resume upload and analysis
2. Skill gap identification
3. Industry-specific scoring (Frontend, Backend, Full-stack, Design, etc.)
4. Comparison with industry standards
5. Before/After tracking
6. Priority recommendations (High/Medium/Low impact)

### Phase 3 - Premium (Weeks 9-12)
**Advanced Features:**
1. LinkedIn profile integration
2. GitHub contribution analysis
3. Competitor portfolio comparison
4. Job match scoring (upload job description)
5. Video walkthrough of improvements
6. Portfolio builder suggestions
7. Community showcase (top-rated portfolios)

---

## 🏗️ Technical Architecture

### System Architecture Diagram
```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│     Frontend (Next.js)          │
│  - Landing Page                 │
│  - Dashboard                    │
│  - Analysis Results             │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│     Backend API (Node.js)       │
│  - URL Scraping                 │
│  - GitHub API Integration       │
│  - AI Analysis Orchestration    │
│  - Report Generation            │
└──────────┬──────────────────────┘
           │
           ├──────────────┬─────────────┬───────────────┐
           ▼              ▼             ▼               ▼
    ┌──────────┐   ┌──────────┐  ┌──────────┐   ┌──────────┐
    │ Claude/  │   │ Database │  │ GitHub   │   │ Storage  │
    │ GPT-4    │   │(Postgres)│  │   API    │   │ (AWS S3) │
    │   API    │   └──────────┘  └──────────┘   └──────────┘
    └──────────┘
```

### Data Flow
1. User submits portfolio URL
2. Backend scrapes website content
3. Fetches GitHub profile (if available)
4. Extracts projects, descriptions, tech stack
5. Sends data to AI for analysis
6. AI returns structured feedback
7. System calculates scores
8. Generates PDF report
9. Stores results in database
10. Displays to user

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (React)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Context / Zustand
- **Forms:** React Hook Form
- **PDF Generation:** react-pdf or jsPDF

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js or Next.js API Routes
- **Web Scraping:** Puppeteer or Cheerio
- **AI Integration:** Anthropic Claude API / OpenAI GPT-4
- **Authentication:** NextAuth.js
- **Payment:** Stripe or Razorpay

### Database
- **Primary DB:** PostgreSQL (Neon or Supabase)
- **ORM:** Prisma
- **Caching:** Redis (optional for Phase 2)

### External APIs
- **GitHub API:** For repository analysis
- **Claude/GPT-4:** For AI-powered evaluation
- **LinkedIn API:** (Phase 3, if approved)

### DevOps & Hosting
- **Hosting:** Vercel (Frontend + API)
- **Database:** Neon.tech or Supabase
- **File Storage:** AWS S3 or Vercel Blob
- **Monitoring:** Sentry
- **Analytics:** Vercel Analytics or Plausible

---

## 🗄️ Database Schema

### Tables

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  subscription_tier VARCHAR(50) DEFAULT 'free',
  credits_remaining INTEGER DEFAULT 1
);

-- Portfolio Analyses Table
CREATE TABLE portfolio_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  portfolio_url VARCHAR(500) NOT NULL,
  github_url VARCHAR(500),
  analysis_type VARCHAR(50), -- 'developer' or 'designer'
  
  -- Scores (0-100)
  overall_score INTEGER,
  design_score INTEGER,
  content_score INTEGER,
  code_quality_score INTEGER,
  uniqueness_score INTEGER,
  hiring_probability INTEGER,
  
  -- Analysis Data
  strengths JSONB,
  weaknesses JSONB,
  recommendations JSONB,
  tech_stack JSONB,
  project_count INTEGER,
  
  -- Metadata
  analysis_completed BOOLEAN DEFAULT false,
  report_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects Table (extracted from portfolio)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID REFERENCES portfolio_analyses(id),
  project_name VARCHAR(255),
  description TEXT,
  tech_stack TEXT[],
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  quality_score INTEGER
);

-- Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  amount DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'INR',
  status VARCHAR(50),
  payment_provider VARCHAR(50),
  credits_purchased INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 📁 Code Structure

```
portfolio-evaluator/
│
├── frontend/                    # Next.js frontend
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Landing page
│   │   ├── dashboard/
│   │   │   └── page.tsx        # User dashboard
│   │   ├── analyze/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Analysis results
│   │   └── api/                # API routes
│   │       ├── analyze/
│   │       │   └── route.ts    # Main analysis endpoint
│   │       ├── scrape/
│   │       │   └── route.ts
│   │       └── github/
│   │           └── route.ts
│   │
│   ├── components/
│   │   ├── ui/                 # shadcn components
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   └── Pricing.tsx
│   │   ├── analysis/
│   │   │   ├── AnalysisForm.tsx
│   │   │   ├── ScoreCard.tsx
│   │   │   ├── RecommendationsList.tsx
│   │   │   └── PDFReport.tsx
│   │   └── shared/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   │
│   ├── lib/
│   │   ├── db.ts               # Database client
│   │   ├── ai.ts               # AI API wrapper
│   │   ├── scraper.ts          # Web scraping logic
│   │   └── utils.ts
│   │
│   └── types/
│       ├── portfolio.ts
│       └── analysis.ts
│
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/
│
├── public/
│   ├── images/
│   └── examples/
│
├── .env.local                  # Environment variables
├── .env.example
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

---

## 🔌 API Endpoints Structure

### Authentication
```
POST   /api/auth/register       # User registration
POST   /api/auth/login          # User login
GET    /api/auth/session        # Get current session
```

### Analysis
```
POST   /api/analyze             # Submit portfolio for analysis
GET    /api/analyze/:id         # Get analysis results
GET    /api/analyze/history     # User's past analyses
DELETE /api/analyze/:id         # Delete analysis
```

### Scraping & Data Collection
```
POST   /api/scrape/portfolio    # Scrape portfolio website
POST   /api/github/analyze      # Analyze GitHub profile
```

### Reports
```
GET    /api/reports/:id/pdf     # Generate PDF report
GET    /api/reports/:id/json    # Get raw JSON data
```

### Payments
```
POST   /api/payments/create     # Create payment intent
POST   /api/payments/webhook    # Payment webhook
GET    /api/payments/history    # Payment history
```

---

## 🤖 AI Analysis Prompt Structure

### Main Analysis Prompt Template

```typescript
const PORTFOLIO_ANALYSIS_PROMPT = `
You are an expert portfolio reviewer for developers and designers. 
Analyze the following portfolio and provide detailed feedback.

PORTFOLIO DATA:
- URL: ${portfolioUrl}
- Projects: ${JSON.stringify(projects)}
- Tech Stack: ${techStack}
- GitHub Stats: ${githubStats}

ANALYZE THE FOLLOWING:
1. Design & Visual Appeal (0-100)
   - Layout consistency
   - Color scheme
   - Typography
   - Responsiveness
   - User experience

2. Content Quality (0-100)
   - Project descriptions clarity
   - Technical depth
   - Storytelling ability
   - Grammar and professionalism

3. Code Quality (0-100) [if GitHub available]
   - Code organization
   - Best practices
   - Documentation
   - Commit history quality

4. Uniqueness & Creativity (0-100)
   - Original projects
   - Creative solutions
   - Personal branding

5. Hiring Probability (0-100)
   - Overall impression
   - Market readiness

PROVIDE:
- Detailed scores for each category
- 5 specific strengths
- 5 specific weaknesses
- 10 actionable recommendations (prioritized)
- Estimated time to implement each recommendation

FORMAT: Return JSON only, no markdown.
{
  "scores": {
    "design": number,
    "content": number,
    "codeQuality": number,
    "uniqueness": number,
    "hiringProbability": number
  },
  "strengths": string[],
  "weaknesses": string[],
  "recommendations": {
    "high": [{ "title": string, "description": string, "effort": string }],
    "medium": [...],
    "low": [...]
  }
}
`;
```

---

## 📅 Implementation Roadmap (0 to 100)

### **Week 1: Setup & Foundation**
**Days 1-2: Project Setup**
- [ ] Initialize Next.js project with TypeScript
- [ ] Setup Tailwind CSS and shadcn/ui
- [ ] Setup Prisma with PostgreSQL
- [ ] Create GitHub repository
- [ ] Setup environment variables
- [ ] Deploy initial version to Vercel

**Days 3-4: Database & Auth**
- [ ] Design and implement database schema
- [ ] Setup NextAuth.js authentication
- [ ] Create user registration/login pages
- [ ] Test authentication flow

**Days 5-7: Landing Page**
- [ ] Design landing page wireframe
- [ ] Build Hero section
- [ ] Create Features section
- [ ] Build Pricing section
- [ ] Add testimonials section
- [ ] Make responsive for mobile

---

### **Week 2: Core Scraping & Data Collection**
**Days 8-10: Web Scraping**
- [ ] Setup Puppeteer or Cheerio
- [ ] Build URL validator
- [ ] Scrape portfolio homepage
- [ ] Extract project information
- [ ] Extract tech stack mentions
- [ ] Handle errors and edge cases
- [ ] Test with 10+ portfolio sites

**Days 11-14: GitHub Integration**
- [ ] Setup GitHub API integration
- [ ] Fetch user profile data
- [ ] Analyze repository count
- [ ] Get commit activity
- [ ] Extract languages used
- [ ] Calculate code quality metrics
- [ ] Handle private/no GitHub profiles

---

### **Week 3: AI Analysis Engine**
**Days 15-17: AI Integration**
- [ ] Setup Claude/GPT-4 API
- [ ] Write analysis prompt template
- [ ] Create scoring algorithm
- [ ] Test AI responses with sample data
- [ ] Implement retry logic for API failures
- [ ] Add response validation

**Days 18-21: Analysis Logic**
- [ ] Build analysis orchestration
- [ ] Combine scraped data + GitHub data
- [ ] Send to AI for evaluation
- [ ] Parse and structure AI response
- [ ] Calculate final scores
- [ ] Store results in database
- [ ] Handle edge cases (incomplete portfolios)

---

### **Week 4: Frontend & Results Display**
**Days 22-24: Analysis Form**
- [ ] Create portfolio submission form
- [ ] Add URL validation
- [ ] Show loading state during analysis
- [ ] Display progress indicators
- [ ] Handle submission errors

**Days 25-28: Results Dashboard**
- [ ] Design results page layout
- [ ] Create score visualization (charts/gauges)
- [ ] Display strengths section
- [ ] Display weaknesses section
- [ ] Show prioritized recommendations
- [ ] Add "Share Results" feature
- [ ] Make results page responsive

---

### **Week 5: PDF Reports & Polish**
**Days 29-31: PDF Generation**
- [ ] Setup PDF library (react-pdf/jsPDF)
- [ ] Design PDF template
- [ ] Generate downloadable reports
- [ ] Add branding to PDFs
- [ ] Test PDF generation

**Days 32-35: MVP Polish**
- [ ] Bug fixes and testing
- [ ] Improve error messages
- [ ] Add tooltips and help text
- [ ] Optimize performance
- [ ] Mobile responsiveness final check
- [ ] Write user documentation

---

### **Week 6: Payment Integration**
**Days 36-38: Stripe/Razorpay Setup**
- [ ] Create payment provider account
- [ ] Integrate payment SDK
- [ ] Create pricing plans
- [ ] Build payment flow
- [ ] Handle webhooks
- [ ] Test with test cards

**Days 39-42: Credit System**
- [ ] Implement credit-based system
- [ ] Track credit usage
- [ ] Show remaining credits in dashboard
- [ ] Add credit purchase flow
- [ ] Email receipts

---

### **Week 7: Testing & Beta Launch**
**Days 43-45: Testing**
- [ ] Write test cases
- [ ] Test with 20+ real portfolios
- [ ] Fix bugs
- [ ] Performance optimization
- [ ] Security audit
- [ ] Add analytics tracking

**Days 46-49: Beta Launch Prep**
- [ ] Create demo video
- [ ] Write launch blog post
- [ ] Prepare social media content
- [ ] Setup customer support email
- [ ] Create FAQ page
- [ ] Privacy policy and terms

---

### **Week 8: Launch & Iteration**
**Days 50-52: Public Launch**
- [ ] Launch on Product Hunt
- [ ] Post on Reddit (r/webdev, r/cscareerquestions)
- [ ] Share on Twitter/X
- [ ] Post in LinkedIn
- [ ] Share in dev communities (Discord, Slack)
- [ ] Email to beta users

**Days 53-56: Feedback & Iteration**
- [ ] Monitor user feedback
- [ ] Fix critical bugs
- [ ] Add most-requested features
- [ ] Improve AI prompts based on results
- [ ] Optimize conversion funnel

---

## 💰 Monetization Strategy

### Pricing Tiers

**Free Tier:**
- 1 portfolio analysis
- Basic scoring
- PDF report
- Email support

**Starter - ₹399/month:**
- 5 analyses per month
- Detailed recommendations
- Priority support
- Before/After tracking

**Professional - ₹999/month:**
- Unlimited analyses
- GitHub deep dive
- Job match scoring
- Resume analysis
- Priority AI processing
- Custom branding on reports

**Pay-Per-Use:**
- ₹199 per analysis (no subscription)

### Revenue Projections (Conservative)

**Month 1-2:** ₹10,000-30,000
- 50-100 free users
- 20 paid analyses

**Month 3-6:** ₹50,000-1,50,000
- 500+ free users
- 50-100 paid users

**Month 6-12:** ₹2,00,000-5,00,000
- 2000+ free users
- 200-500 paid subscribers

---

## 📊 Success Metrics (KPIs)

### User Metrics
- **Total Signups:** Track weekly
- **Portfolio Analyses Completed:** Daily count
- **Paid Conversion Rate:** Target 5-10%
- **User Retention:** Monthly active users

### Quality Metrics
- **Analysis Accuracy:** User satisfaction surveys
- **Average Score:** Should be realistic (60-75)
- **Completion Rate:** % of analyses successfully completed

### Business Metrics
- **Monthly Recurring Revenue (MRR)**
- **Customer Acquisition Cost (CAC)**
- **Lifetime Value (LTV)**
- **Churn Rate:** Target <5% monthly

---

## 🚀 Marketing Strategy

### Launch Channels
1. **Product Hunt:** Day 1 launch
2. **Reddit:** r/webdev, r/cscareerquestions, r/web_design
3. **Twitter/X:** Developer hashtags
4. **Dev.to:** Write blog posts about portfolio building
5. **LinkedIn:** Target junior developers
6. **YouTube:** Create tutorial videos
7. **Discord/Slack:** Developer communities

### Content Marketing
- "10 Portfolio Mistakes That Cost You Jobs"
- "How We Built an AI That Reviews 1000+ Portfolios"
- "Before/After: Portfolio Transformations"
- Free portfolio checklist PDF

### SEO Keywords
- "portfolio review"
- "developer portfolio feedback"
- "design portfolio critique"
- "portfolio analyzer"
- "improve developer portfolio"

---

## 💡 Cost Breakdown (Monthly)

### Infrastructure (Starting)
- Vercel Hosting: ₹0-2,000 (Pro if needed)
- Database (Neon/Supabase): ₹0-1,500
- Claude/GPT-4 API: ₹5,000-15,000 (scales with users)
- Domain: ₹1,000/year
- Email Service: ₹500-1,000

**Total Initial Monthly Cost:** ₹8,000-20,000

### Scaling (1000+ users)
- API costs: ₹30,000-50,000
- Hosting: ₹5,000-10,000
- Tools & Services: ₹5,000

**Total Scaling Cost:** ₹40,000-65,000

---

## ⚠️ Risk Mitigation

### Technical Risks
- **AI API outages:** Implement fallback logic
- **Scraping failures:** Multiple scraping strategies
- **GitHub API limits:** Cache results, rate limiting

### Business Risks
- **Low adoption:** Aggressive marketing, free tier
- **Competition:** Focus on unique features
- **High costs:** Optimize prompts, use cheaper models for initial screening

---

## 🎯 Phase 2 & 3 Features (Future)

### Phase 2 (Month 3-4)
- Resume upload and analysis
- LinkedIn integration
- Industry benchmarking
- Weekly improvement tips via email

### Phase 3 (Month 5-6)
- Portfolio builder suggestions
- Code snippet analysis
- Video portfolio reviews
- Community showcase of best portfolios
- Affiliate program

---

## 📝 Next Steps (Start TODAY)

1. **Day 1 Action Items:**
   - [ ] Create GitHub repository
   - [ ] Initialize Next.js project
   - [ ] Setup database on Neon/Supabase
   - [ ] Get Claude/GPT-4 API key
   - [ ] Buy domain name
   - [ ] Create project board (Trello/Notion)

2. **Week 1 Goal:**
   - Working authentication
   - Basic landing page live
   - Database connected

3. **Week 2 Goal:**
   - First successful portfolio scrape
   - GitHub data extraction working

---

## 🎓 Learning Resources

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Claude API: https://docs.anthropic.com
- Puppeteer Tutorial: [web scraping guides]
- GitHub API: https://docs.github.com/en/rest

---

**Document Version:** 1.0
**Last Updated:** November 2025
**Project Status:** Planning Phase

---

## Notes Section (For Your Tracking)
- Use this space to track deviations from plan
- Note blockers and solutions
- Track actual costs vs estimated
- User feedback summary