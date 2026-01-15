# FolioGauge 🚀
**AI-powered portfolio analysis platform for developers and designers**

![License](https://img.shields.io/github/license/ArindamSharma1/FolioGauge)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind-38bdf8)
![Status](https://img.shields.io/badge/Status-Live-success)

> **"Get professional portfolio feedback in 5 minutes, not 5 days."**

**FolioGauge** is an AI-powered analytics tool designed to help developers, designers, and freelancers drastically improve their hiring probability. By leveraging advanced LLMs and web scraping, FolioGauge analyzes portfolio websites in real-time, providing a detailed score, actionable feedback, and a comprehensive improvement roadmap.

🔗 **Live Demo:** [https://folio-gauge.vercel.app/](https://folio-gauge.vercel.app/)

---

## 📸 Screenshots

| Landing Page | Analysis Dashboard |
|:---:|:---:|
| ![Landing Page](public/landing-demo.png)  | ![Dashboard](public/dashboard-demo.png) |

---

## ✨ Key Features

FolioGauge goes beyond simple page speed tests. It understands the *context* of a portfolio.

### 🧠 Intelligent Analysis Engine
- **Visual Design Critique:** Evaluates layout consistency, color theory usage, typography hierarchy, and overall responsive design.
- **Content Quality Check:** Analyzes project descriptions for clarity, technical depth, and storytelling ability.
- **Code Quality Assessment:** (If GitHub is linked) Scans repositories for organization, best practices, and documentation quality.
- **Uniqueness Score:** Detects cookie-cutter templates vs. creative, personal branding.

### 📊 Comprehensive Scoring System
- **0-100 FolioScore:** A weighted aggregate score based on 5 key hiring metrics.
- **Hiring Probability:** An AI-estimated percentage of how market-ready the portfolio is.
- **Category Breakdowns:** Granular scores for Design, Content, Code, and Creativity.

### 💡 Actionable Feedback Loop
- **Strengths & Weaknesses:** Identifies exactly what you're doing right and where you're losing recruiters.
- **Prioritized Recommendations:** Generates a "High/Medium/Low" impact todo list (e.g., *"Fix the broken contrast on your Hero section"* vs *"Add a favicon"*).
- **Time Estimates:** Estimates how long each improvement will take to implement.

### 🛠️ Developer-Centric Tools
- **Tech Stack Detection:** Automatically extracts and validates the technologies listed in your projects.
- **PDF Export:** Generate professional audit reports to share with mentors or keep for records.
- **History Tracking:** Compare your current score against previous scans to track improvement.

---

## 🏗️ Technical Architecture

FolioGauge is built on a modern, scalable tech stack focusing on performance and type safety.

### The Stack
- **Frontend:** [Next.js 14](https://nextjs.org/) (App Router), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Backend:** Next.js API Routes (Serverless)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/) / Supabase)
- **ORM:** [Prisma](https://www.prisma.io/)
- **AI/LLM:** OpenAI GPT-4 / Anthropic Claude Integration
- **Web Scraping:** Puppeteer / Cheerio for DOM parsing
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Google & GitHub OAuth)

### System Flow
1. **Input:** User submits a Portfolio URL.
2. **Scrape:** The backend orchestrates a headless browser to scrape the DOM, capturing text, meta tags, and structure.
3. **Enrich:** If a GitHub link is found, the GitHub API fetches repo stats (commits, languages, readme quality).
4. **Analyze:** Aggregated data is structured and sent to the LLM with a specialized system prompt for evaluation.
5. **Result:** structured JSON is returned, parsed, stored in Postgres, and streamed to the client.

---

## 🚀 Getting Started

Follow these steps to set up FolioGauge locally on your machine.

### Prerequisites
- Node.js 18+
- PostgreSQL database URL
- OpenAI/Claude API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/ArindamSharma1/FolioGauge.git](https://github.com/ArindamSharma1/FolioGauge.git)
   cd FolioGauge

```

2. **Install dependencies**
```bash
npm install
# or
yarn install

```


3. **Environment Setup**
Create a `.env` file in the root directory and add the following variables:
```env
# Database
DATABASE_URL="postgresql://user:password@host:port/db?schema=public"

# Auth (NextAuth)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key"
GOOGLE_CLIENT_ID="your-google-id"
GOOGLE_CLIENT_SECRET="your-google-secret"

# AI Provider
OPENAI_API_KEY="sk-..." 
# or ANTHROPIC_API_KEY if using Claude

# Optional: GitHub API (for deeper code analysis)
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"

```


4. **Database Migration**
```bash
npx prisma generate
npx prisma db push

```


5. **Run the Development Server**
```bash
npm run dev

```


Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```
folio-gauge/
├── app/                  # Next.js App Router
│   ├── api/              # Backend API endpoints (Scraping, AI, Auth)
│   ├── dashboard/        # User dashboard pages
│   └── analyze/          # Analysis result views
├── components/           # React components
│   ├── ui/               # Reusable shadcn/ui atoms
│   ├── analysis/         # Analysis-specific graphs & cards
│   └── landing/          # Landing page sections
├── lib/                  # Utilities (AI wrappers, DB client, Scraper logic)
├── prisma/               # Database schema & migrations
└── public/               # Static assets

```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Contact

**Arindam Sharma** - GitHub: [@ArindamSharma1](https://github.com/ArindamSharma1)

* LinkedIn: [Arindam Sharma](https://www.linkedin.com/in/arindam-sharma-ab4712251/)

Project Link: [https://github.com/ArindamSharma1/FolioGauge](https://github.com/ArindamSharma1/FolioGauge)

```