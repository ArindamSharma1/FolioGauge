import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import "./pricing.css";
import FadeIn from "../FadeIn.jsx";

function Pricing() {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [billingCycle, setBillingCycle] = useState("monthly");

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
    };

    const handleScrollToAllFeatures = (e) => {
        e.preventDefault();
        const element = document.getElementById('all-features');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="pricing" className="cyber-pricing-section">
            <div className="hud-container">
                <FadeIn delay={0.1}>
                    <div className="pricing-terminal-header">
                        <div className="header-badge-row">
                            <span className="terminal-badge">SYS_ALLOCATION // SUBSCRIPTION</span>
                            <span className="font-mono text-cyan" style={{ fontSize: '0.72rem' }}>[ PROTOCOL: STRIPE_V3 ]</span>
                        </div>
                        <h2 className="section-title">
                            RESOURCE <span className="gradient-cyan-text">ALLOCATION TIERS</span>
                        </h2>
                        <p className="section-subtitle">
                            Scale your neural diagnostic throughput and unlock advanced multi-persona simulation engines.
                        </p>

                        {/* Billing Toggle Strip */}
                        <div className="billing-toggle-strip font-mono">
                            <span className={billingCycle === "monthly" ? "active-label" : ""}>MONTHLY_BILLING</span>
                            <button 
                                className={`cyber-switch ${billingCycle === "annual" ? "annual" : ""}`}
                                onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                                aria-label="Toggle Annual Billing"
                            >
                                <span className="switch-thumb"></span>
                            </button>
                            <span className={billingCycle === "annual" ? "active-label text-lime" : ""}>
                                ANNUAL_BILLING <span className="discount-tag">[SAVE 20%]</span>
                            </span>
                        </div>
                    </div>
                </FadeIn>

                <div className="cyber-pricing-grid">
                    {/* TIER 1: STANDARD */}
                    <FadeIn delay={0.2}>
                        <div className="cyber-tier-card tech-panel font-mono">
                            <div className="tier-header">
                                <div className="tier-code">// TIER_01 : NODE_FREE</div>
                                <h3 className="tier-name">STANDARD</h3>
                                <div className="tier-price-box">
                                    <span className="tier-price">$0</span>
                                    <span className="tier-period">/ USER / MO</span>
                                </div>
                            </div>

                            <div className="tier-command-trigger">
                                <span>$ folio --init --tier=free</span>
                            </div>

                            <ul className="tier-specs">
                                <li><span className="spec-bullet">✓</span> 3 Diagnostics Scans / Day</li>
                                <li><span className="spec-bullet">✓</span> 10-Page DOM Crawl Limit</li>
                                <li><span className="spec-bullet">✓</span> Recruiter Persona Only</li>
                                <li><span className="spec-bullet">✓</span> Mobile Hydration Check</li>
                                <li className="locked"><span className="spec-bullet">✖</span> Design Lead Persona [LOCKED]</li>
                                <li className="locked"><span className="spec-bullet">✖</span> GitHub Hygiene Audit [LOCKED]</li>
                            </ul>

                            <a href="#getstarted" className="cyber-tier-btn outline">
                                INITIALIZE_FREE [&rarr;]
                            </a>
                        </div>
                    </FadeIn>

                    {/* TIER 2: PRO */}
                    <FadeIn delay={0.35}>
                        <div className="cyber-tier-card tech-panel is-featured font-mono">
                            <div className="featured-banner">POPULAR // DEV_CHOICE</div>
                            <div className="tier-header">
                                <div className="tier-code text-cyan">// TIER_02 : NODE_PRO</div>
                                <h3 className="tier-name">PRO ENGINEER</h3>
                                <div className="tier-price-box">
                                    <span className="tier-price">{billingCycle === "annual" ? "$12" : "$15"}</span>
                                    <span className="tier-period">/ USER / MO</span>
                                </div>
                            </div>

                            <div className="tier-command-trigger active">
                                <span>$ folio --upgrade --tier=pro</span>
                            </div>

                            <ul className="tier-specs">
                                <li><span className="spec-bullet text-cyan">✓</span> 5 Diagnostics Scans / Day</li>
                                <li><span className="spec-bullet text-cyan">✓</span> 50-Page DOM Crawl Limit</li>
                                <li><span className="spec-bullet text-cyan">✓</span> Recruiter &amp; Designer Personas</li>
                                <li><span className="spec-bullet text-cyan">✓</span> Priority Scoring Engine</li>
                                <li><span className="spec-bullet text-cyan">✓</span> Top 10% Industry Benchmarks</li>
                                <li><span className="spec-bullet text-cyan">✓</span> Automated Bio Polish (1/mo)</li>
                            </ul>

                            <a href="#" className="cyber-tier-btn primary" onClick={handleUpgradeClick}>
                                START_7_DAY_TRIAL [&rarr;]
                            </a>
                        </div>
                    </FadeIn>

                    {/* TIER 3: SUPER PRO */}
                    <FadeIn delay={0.5}>
                        <div className="cyber-tier-card tech-panel font-mono">
                            <div className="tier-header">
                                <div className="tier-code text-magenta">// TIER_03 : NODE_MAX</div>
                                <h3 className="tier-name">SUPER PRO</h3>
                                <div className="tier-price-box">
                                    <span className="tier-price">{billingCycle === "annual" ? "$40" : "$50"}</span>
                                    <span className="tier-period">/ USER / MO</span>
                                </div>
                            </div>

                            <div className="tier-command-trigger super">
                                <span>$ folio --upgrade --tier=super_pro</span>
                            </div>

                            <ul className="tier-specs">
                                <li><span className="spec-bullet text-lime">✦</span> UNLIMITED Diagnostics Scans</li>
                                <li><span className="spec-bullet text-lime">✦</span> UNLIMITED Page DOM Crawls</li>
                                <li><span className="spec-bullet text-lime">✦</span> ALL 3 Personas (+ Principal Lead)</li>
                                <li><span className="spec-bullet text-lime">✦</span> Behance &amp; Dribbble Cross-Check</li>
                                <li><span className="spec-bullet text-lime">✦</span> Figma &amp; PDF Export Protocols</li>
                                <li><span className="spec-bullet text-lime">✦</span> Automated Bio Polish (10/mo)</li>
                            </ul>

                            <a href="#" className="cyber-tier-btn magenta" onClick={handleUpgradeClick}>
                                UPGRADE_TO_SUPER_PRO [&rarr;]
                            </a>
                        </div>
                    </FadeIn>
                </div>

                {/* Explore Full Matrix Bar */}
                <FadeIn delay={0.65}>
                    <div className="pricing-explore-bar font-mono">
                        <span>WANT TO COMPARE ALL 28 GRANULAR HEURISTICS SIDE-BY-SIDE?</span>
                        <a href="#all-features" className="cyber-explore-link" onClick={handleScrollToAllFeatures}>
                            OPEN SPECIFICATION MATRIX [&darr;]
                        </a>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

export default Pricing;

