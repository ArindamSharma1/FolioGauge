import React, { useState, useEffect } from 'react';
import './FAQ.css';
import Footer from '../landing/footer.jsx';
import FadeIn from '../FadeIn';

const FAQ = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What portfolios are supported?",
            answer: "We support standard personal portfolio websites (Framer, Webflow, Squarespace, custom code) and direct PDF uploads. Behance or Dribbble profiles are not currently supported as they lack the full context of a standalone case study."
        },
        {
            question: "How does the scoring work?",
            answer: "Our AI evaluates your portfolio against 4 key pillars: UX/UI Design Quality, Content Clarity, Technical Performance, and Mobile Responsiveness. The score is a weighted average based on industry standards for hiring."
        },
        {
            question: "Why am I limited to 3 scans?",
            answer: "Deep AI analysis requires significant processing power. To maintain speed and quality for everyone, we limit the number of free scans. Pro plans offer unlimited scanning capabilities."
        },
        {
            question: "Why does my score change?",
            answer: "If you make updates to your site, ur score will reflect those changes. Additionally, we periodically update our grading algorithms to match the latest design trends and hiring requirements, which may slightly adjust scores over time."
        },
        {
            question: "Is my data stored?",
            answer: "We only store the analysis report to build your history dashboard. We do not store your uploaded PDFs or crawl your website for any purpose other than the immediate analysis."
        }
    ];

    const troubleshooting = [
        {
            issue: "Scan stuck on loading",
            fix: "This usually happens with very large pages. Try refreshing. If it persists, check if your site blocks automated crawlers."
        },
        {
            issue: "Invalid or expired login",
            fix: "For security, sessions expire after 7 days. Simply log out and sign back in to refresh your secure token."
        },
        {
            issue: "Portfolio not accessible",
            fix: "Ensure your portfolio is public and not password protected. We cannot analyze sites that require a login to view."
        }
    ];

    return (
        <>
            <div className="help-page">
                {/* Hero Section */}
                <header className="help-hero">
                    <FadeIn delay={0.1}>
                        <h1 className="help-title">How can we help?</h1>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="help-subtitle">
                            FolioGauge analyzes your design portfolio and provides actionable, AI-driven feedback to help you get hired.
                        </p>
                    </FadeIn>
                </header>

                {/* Quick Start Guide */}
                <section className="help-section quick-start">
                    <FadeIn delay={0.3}>
                        <div className="steps-grid">
                            <div className="step-item">
                                <div className="step-num">1</div>
                                <h3>Sign In</h3>
                                <p>Create a free account to access your personal dashboard.</p>
                            </div>
                            <div className="step-item">
                                <div className="step-num">2</div>
                                <h3>Analyze</h3>
                                <p>Paste your portfolio link or upload a PDF resume.</p>
                            </div>
                            <div className="step-item">
                                <div className="step-num">3</div>
                                <h3>Review</h3>
                                <p>Get your score and fix-it list to improve your odds.</p>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* Use Cases Section */}
                <section id="use-cases" className="help-section use-cases">
                    <FadeIn delay={0.35}>
                        <h2 className="section-label">Who is this for?</h2>
                        <div className="use-cases-grid">
                            <div className="uc-item">
                                <h3>UX/UI Designers</h3>
                                <p>Validate your visual hierarchy, accessibility, and user flow explanations before applying to top tech companies.</p>
                            </div>
                            <div className="uc-item">
                                <h3>Students & Grads</h3>
                                <p>Benchmark your junior portfolio against senior-level standards to identify gaps and get hired faster.</p>
                            </div>
                            <div className="uc-item">
                                <h3>Freelancers</h3>
                                <p>Polish your case studies to win more clients. Ensure your value proposition is clear and persuasive.</p>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* FAQ Section */}
                <section className="help-section faq-wrapper">
                    <FadeIn delay={0.4}>
                        <h2 className="section-label">Frequently Asked Questions</h2>
                        <div className="faq-list">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                                >
                                    <button
                                        className="faq-question"
                                        onClick={() => toggleAccordion(index)}
                                        aria-expanded={activeIndex === index}
                                    >
                                        {faq.question}
                                        <svg
                                            className="faq-icon"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="faq-answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </section>

                {/* Plans & Limits */}
                <section className="help-section plans-info">
                    <FadeIn delay={0.5}>
                        <h2 className="section-label">Plans & Limits</h2>
                        <div className="info-block">
                            <h3>Free vs. Pro</h3>
                            <p>
                                The Free tier is designed for rapid checks and quick feedback. The Pro tier unlocks detailed historical tracking,
                                competitor benchmarking, and prioritized processing. We keep limits simple so you can focus on designing, not counting credits.
                            </p>
                        </div>
                    </FadeIn>
                </section>

                {/* Troubleshooting */}
                <section className="help-section troubleshooting">
                    <FadeIn delay={0.6}>
                        <h2 className="section-label">Troubleshooting</h2>
                        <div className="troubleshoot-grid">
                            {troubleshooting.map((item, index) => (
                                <div key={index} className="ts-item">
                                    <div className="ts-issue">{item.issue}</div>
                                    <div className="ts-fix">{item.fix}</div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </section>

                {/* Contact */}
                <section className="help-section contact-support">
                    <FadeIn delay={0.7}>
                        <p className="contact-text">Still stuck? Reach out and we’ll help.</p>
                        <a href="mailto:support@foliogauge.com" className="contact-link">Contact Support &rarr;</a>
                    </FadeIn>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default FAQ;
