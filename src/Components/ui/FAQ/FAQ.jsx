import React, { useState, useEffect } from 'react';
import './FAQ.css';
import Footer from '../landing/footer.jsx';
import FadeIn from '../FadeIn';

const FAQ = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeTab, setActiveTab] = useState('ALL');
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const categories = [
        { id: 'ALL', label: 'All Protocols' },
        { id: 'ENGINE', label: 'Diagnostic Engine' },
        { id: 'TARGETS', label: 'Target Specifications' },
        { id: 'CLEARANCE', label: 'Clearance Tiers' },
        { id: 'ANOMALY', label: 'Anomaly Recovery' },
    ];

    const knowledgeModules = [
        {
            category: 'ENGINE',
            badge: 'PROTOCOL 101',
            question: 'How does the FolioGauge heuristic scoring engine calculate portfolio ratings?',
            answer: 'Our proprietary AI scanner parses the DOM tree and evaluates four primary telemetry vectors: Structural Visual Hierarchy (30%), Typography & Contrast Accessibility (25%), Case Study Narrative Depth (25%), and Lighthouse Performance & Mobile Viewport Rigidity (20%). Each metric is weighted against active hiring manager screening benchmarks from tier-1 engineering and design teams.',
            codeSnippet: 'SCORING_WEIGHTS = { hierarchy: 0.30, accessibility: 0.25, narrative: 0.25, performance: 0.20 }'
        },
        {
            category: 'TARGETS',
            badge: 'INPUT SPEC',
            question: 'What web architectures and file formats are supported for ingestion?',
            answer: 'The scanner supports any standard publicly accessible URL (Framer, Webflow, Next.js, React, custom HTML/CSS/JS endpoints) as well as direct PDF resume uploads up to 15MB. Note that Behance and Dribbble portfolio feeds are flagged as partial data because they lack standalone DOM routing and detailed architectural case studies.',
            codeSnippet: 'ALLOWED_PROTOCOLS: ["https://*", "http://*"], ALLOWED_MIME: ["application/pdf"]'
        },
        {
            category: 'ENGINE',
            badge: 'AI CRITIQUE',
            question: 'Why do my portfolio scores fluctuate between consecutive deployments?',
            answer: 'When you push changes to your staging or production branch, our headless browser captures a fresh snapshot and recalculates DOM metrics in real time. Additionally, our grading models undergo continuous calibration every 14 days to align with evolving UX/UI hiring standards and modern web design patterns.',
            codeSnippet: 'CALIBRATION_FREQUENCY: "14d" // Syncs with global design hiring benchmarks'
        },
        {
            category: 'CLEARANCE',
            badge: 'QUOTAS',
            question: 'What are the resource allocation limits between Level 1 (Free) and Level 4 (Pro)?',
            answer: 'Level 1 clearance provides 3 deep AI scans per month to allow rapid baseline testing. Level 4 (Pro Operator) clearance unlocks unlimited telemetry scans, complete historical timeline diffing, competitor URL comparison checks, and priority queue processing without rate limiting.',
            codeSnippet: 'QUOTA_CHECK: user.tier === "PRO" ? Infinity : Math.max(0, 3 - user.scansThisMonth)'
        },
        {
            category: 'CLEARANCE',
            badge: 'DATA SECURITY',
            question: 'How are analyzed DOM snapshots and personal data encrypted at rest?',
            answer: 'All data is encrypted in transit via TLS 1.3 and at rest using AES-256. We only store parsed JSON diagnostic reports to construct your profile telemetry dashboard. Raw PDF files and DOM snapshots are purged from ephemeral cache immediately after score generation.',
            codeSnippet: 'ENCRYPTION: "AES-256-GCM", STORAGE_RETENTION: "METRICS_ONLY"'
        },
        {
            category: 'ANOMALY',
            badge: 'ERR_TIMEOUT',
            question: 'Scan execution hangs at "Parsing DOM structure" or throws a timeout anomaly.',
            answer: 'This occurs when target servers enforce aggressive Cloudflare bot protection or if asset bundle sizes exceed 25MB, delaying DOMContentLoaded events. Verify that your site allows headless User-Agent requests (`FolioGaugeBot/2.4`) and check that no heavy uncompressed background videos are blocking the main thread.',
            codeSnippet: 'RECOMMENDATION: Whitelist User-Agent "FolioGaugeBot/2.4" across CDN firewall rules.'
        },
        {
            category: 'ANOMALY',
            badge: 'ERR_AUTH_EXPIRED',
            question: 'Operator terminal reports "Invalid or Expired Security Token" during scan initiation.',
            answer: 'To maintain zero-trust security protocol, authentication tokens expire after 7 days of inactivity or upon IP change detection. Click "Sign Out" in your navigation HUD and re-initialize your session via secure credentials or OAuth 2.0.',
            codeSnippet: 'TOKEN_TTL: 604800 // 7 days in seconds'
        },
        {
            category: 'ANOMALY',
            badge: 'ERR_ACCESS_DENIED',
            question: 'Scanner returns a 403 Forbidden or 401 Unauthorized status on public URL.',
            answer: 'Ensure that your staging or production URL is not protected by HTTP Basic Auth, Vercel/Netlify preview passwords, or geo-blocking rules. The scanner must be able to perform an unauthenticated GET request from our distributed US East cluster.',
            codeSnippet: 'HTTP_STATUS_REQUIRED: 200 // Must be publicly routable'
        }
    ];

    const filteredModules = activeTab === 'ALL' 
        ? knowledgeModules 
        : knowledgeModules.filter(m => m.category === activeTab);

    return (
        <>
            <div className="faq-page-container">
                {/* Header Section */}
                <header className="faq-header-section">
                    <FadeIn delay={0.1}>
                        <div className="faq-status-badge">
                            <span className="status-dot"></span>
                            <span className="status-text">SYSTEM KNOWLEDGEBASE // DOCS_v2.4</span>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <h1 className="faq-title">Technical Protocol Manual</h1>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <p className="faq-subtitle">
                            Explore comprehensive documentation on telemetry ingestion, AI heuristic weights, clearance tiers, and anomaly resolution protocols.
                        </p>
                    </FadeIn>
                </header>

                {/* Category Navigation Tabs */}
                <section className="faq-tabs-section">
                    <FadeIn delay={0.35}>
                        <div className="faq-tabs-grid">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`faq-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveTab(cat.id);
                                        setActiveIndex(null);
                                    }}
                                >
                                    <span className="tab-bracket">[</span>
                                    {cat.label}
                                    <span className="tab-bracket">]</span>
                                </button>
                            ))}
                        </div>
                    </FadeIn>
                </section>

                {/* Collapsible Knowledge Modules */}
                <section className="faq-modules-section">
                    <FadeIn delay={0.4}>
                        <div className="faq-accordion-list">
                            {filteredModules.map((module, index) => {
                                const isExpanded = activeIndex === index;
                                return (
                                    <div
                                        key={index}
                                        className={`faq-module-card ${isExpanded ? 'expanded' : ''}`}
                                    >
                                        <button
                                            className="faq-module-header"
                                            onClick={() => toggleAccordion(index)}
                                            aria-expanded={isExpanded}
                                        >
                                            <div className="faq-module-left">
                                                <span className="faq-module-badge">{module.badge}</span>
                                                <h3 className="faq-module-question">{module.question}</h3>
                                            </div>
                                            <div className="faq-module-toggle">
                                                <span className="toggle-symbol">{isExpanded ? '[-]' : '[+]'}</span>
                                            </div>
                                        </button>

                                        <div className="faq-module-body">
                                            <div className="faq-module-content">
                                                <p className="faq-answer-text">{module.answer}</p>
                                                {module.codeSnippet && (
                                                    <div className="faq-code-box">
                                                        <div className="code-box-header">
                                                            <span className="code-label">SYSTEM_TERMINAL</span>
                                                            <span className="code-status">EXEC_READY</span>
                                                        </div>
                                                        <pre className="code-text"><code>{module.codeSnippet}</code></pre>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </FadeIn>
                </section>

                {/* Quick Diagnostics Strip */}
                <section className="faq-diagnostics-section">
                    <FadeIn delay={0.5}>
                        <div className="diagnostics-panel">
                            <div className="diag-header">
                                <h3>Operational Status & Quick Checks</h3>
                                <span className="diag-live">ALL CLUSTERS ONLINE</span>
                            </div>
                            <div className="diag-grid">
                                <div className="diag-item">
                                    <span className="diag-icon">⚡</span>
                                    <div className="diag-info">
                                        <h4>Avg DOM Parse Speed</h4>
                                        <p>1,420ms across global edge runners</p>
                                    </div>
                                </div>
                                <div className="diag-item">
                                    <span className="diag-icon">🛡️</span>
                                    <div className="diag-info">
                                        <h4>Security Protocol</h4>
                                        <p>Strict TLS 1.3 / Zero-Trust API validation</p>
                                    </div>
                                </div>
                                <div className="diag-item">
                                    <span className="diag-icon">📡</span>
                                    <div className="diag-info">
                                        <h4>Telemetry Support</h4>
                                        <p>24/7 Priority escalation for Pro clearance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* Support Contact Console */}
                <section className="faq-contact-console">
                    <FadeIn delay={0.6}>
                        <div className="console-box">
                            <h2>Require Custom Architecture Assistance?</h2>
                            <p>Our lead engineers are available for enterprise integration and bespoke scoring pipeline calibration.</p>
                            <div className="console-actions">
                                <a href="mailto:support@foliogauge.com" className="console-btn-primary">
                                    <span className="btn-prefix">&gt;</span> OPEN SUPPORT TICKET
                                </a>
                                <a href="/scan" className="console-btn-secondary">
                                    LAUNCH DIAGNOSTIC SCAN
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default FAQ;
