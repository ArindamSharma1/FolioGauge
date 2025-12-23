import React from "react";
import { Link } from "react-router-dom";
import "./whyus.css";
import FadeIn from "../FadeIn.jsx";

const WhyUs = () => {
    return (
        <section className="whyus-section">
            <FadeIn amount={0.5}>
                <h2 className="whyus-title">Why FolioGauge</h2>

                <div className="whyus-cards-container">
                    {/* Card 1: Conversion Focused */}
                    <div className="whyus-card">
                        <div className="whyus-icon-wrapper">
                            <svg className="whyus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <h3 className="whyus-card-title">Optimize for<br />Conversion</h3>
                        <p className="whyus-card-description">
                            Don't just show work. Prove your value. Our AI analyzes your portfolio's ability to turn visitors into leads and interviews.
                        </p>
                    </div>

                    {/* Card 2: Recruiter Perspective */}
                    <div className="whyus-card">
                        <div className="whyus-icon-wrapper">
                            <svg className="whyus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <h3 className="whyus-card-title">See Through<br />Recruiter Eyes</h3>
                        <p className="whyus-card-description">
                            Switch personas to simulate how a busy Design Lead or ROI-focused Client executes a 30-second scan of your site.
                        </p>
                    </div>

                    {/* Card 3: Benchmarking */}
                    <div className="whyus-card">
                        <div className="whyus-icon-wrapper">
                            <svg className="whyus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="20" x2="18" y2="10"></line>
                                <line x1="12" y1="20" x2="12" y2="4"></line>
                                <line x1="6" y1="20" x2="6" y2="14"></line>
                            </svg>
                        </div>
                        <h3 className="whyus-card-title">Data-Driven<br />Benchmarking</h3>
                        <p className="whyus-card-description">
                            Stop guessing. Compare your site speed, UX, and mobile performance against the top 10% of industry portfolios.
                        </p>
                    </div>
                </div>

                <div className="whyus-link-wrapper">
                    <Link to="/faq" className="whyus-link">FAQ</Link>
                </div>
            </FadeIn>
        </section>
    );
};

export default WhyUs;
