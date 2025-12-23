import React from "react";
import "../../landing/features.css"; // Reusing features CSS for pricing cards
import FadeIn from "../../FadeIn.jsx";

function Pricing() {
    return (
        <div className="page-container" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#0a0a0a" }}>
            <FadeIn direction="up">
                <div className="features-header">
                    <h2 className="features-title">Pricing Plans</h2>
                    <p className="features-description">
                        Choose the plan that fits your portfolio needs.
                    </p>
                </div>

                <div className="pricing-container">
                    {/* --------------------FREE---------------------- */}
                    <div className="pricing-card-wrapper">
                        <div className="pricing-card">
                            <div className="pricing-header">
                                <h5 className="plan-name">Standard</h5>
                                <span className="price">Free</span>
                                <span className="price-period">Per user</span>
                                <button className="cta-button">
                                    <div className="cta-button-overlay"></div>
                                    <span className="cta-button-text">Try Free</span>
                                </button>
                            </div>

                            <ul className="features-list">
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon disabled">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text disabled">Enhanced Scanning</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon disabled">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text disabled">Enhanced Scoring</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">3 Scans Per Day</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">Limited AI Suggestions</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon disabled">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text disabled">Full Export</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">10-Page Upload Limit</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* --------------------PRO---------------------- */}
                    <div className="pricing-card-wrapper">
                        <div className="pricing-card">
                            <div className="pricing-header">
                                <h5 className="plan-name">Pro</h5>
                                <span className="price">$15</span>
                                <span className="price-period">Per user, Per month</span>
                                <button className="cta-button">
                                    <div className="cta-button-overlay"></div>
                                    <span className="cta-button-text">Start 7-days Trial</span>
                                </button>
                            </div>

                            <ul className="features-list">
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">Enhanced Scanning</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">Enhanced Scoring</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">5 Scans Per Day</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">Advanced AI Suggestions</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">Text Export</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">50-Page Upload Limit</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* --------------------SUPER PRO---------------------- */}
                    <div className="pricing-card-wrapper">
                        <div className="pricing-card">
                            <div className="pricing-header">
                                <h5 className="plan-name">Super Pro</h5>
                                <span className="price">$50</span>
                                <span className="price-period">Per user, Per month</span>
                                <button className="cta-button">
                                    <div className="cta-button-overlay"></div>
                                    <span className="cta-button-text">Upgrade</span>
                                </button>
                            </div>

                            <ul className="features-list">
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">Everything in Pro</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">Batch Scanning</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">Compare with Behance</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">Branding Recommendations</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">Figma Export</span>
                                </li>
                                <li className="feature-item">
                                    <svg viewBox="0 0 20 20" className="check-icon">
                                        <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                                    </svg>
                                    <span className="feature-text">Mockup Generation</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}

export default Pricing;
