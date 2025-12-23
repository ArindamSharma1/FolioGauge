import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import "./features.css";
import FadeIn from "../FadeIn.jsx";

function Features() {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);

    useEffect(() => {
        if (!supabase) return;

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleUpgradeClick = (e) => {
        e.preventDefault();
        if (!session) {
            navigate("/signup");
        }
        // If logged in, do nothing
    };

    return (
        <>

            <section id="features" className="features-section">
                <FadeIn direction="up" amount={0.4}>
                    <div className="features-header">
                        <h2 className="features-title">Features & Pricing</h2>
                        <p className="features-description">
                            Explore the key features of our platform.
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
                                    <a href="#getstarted" className="cta-button">
                                        <div className="cta-button-overlay"></div>
                                        <span className="cta-button-text">Try Free</span>
                                    </a>
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
                                    <a href="#" className="cta-button" onClick={handleUpgradeClick}>
                                        <div className="cta-button-overlay"></div>
                                        <span className="cta-button-text">Start 7-days Trial</span>
                                    </a>
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
                                    <a href="#" className="cta-button" onClick={handleUpgradeClick}>
                                        <div className="cta-button-overlay"></div>
                                        <span className="cta-button-text">Upgrade</span>
                                    </a>
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
            </section>
        </>
    );
}

export default Features;
