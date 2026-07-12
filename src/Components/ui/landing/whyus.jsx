import React from "react";
import { Link } from "react-router-dom";
import "./whyus.css";
import FadeIn from "../FadeIn.jsx";

const WhyUs = () => {
    return (
        <section className="whyus-section" id="whyus">
            <div className="hud-container">
                <FadeIn delay={0.1}>
                    <div className="section-header-terminal">
                        <div className="header-badge-row">
                            <span className="terminal-badge">SYS_ADVANTAGE // BENCHMARK</span>
                            <span className="font-mono text-cyan" style={{ fontSize: '0.72rem' }}>[ PRECISION: 99.4% ]</span>
                        </div>
                        <h2 className="section-title">
                            WHY <span className="gradient-cyan-text">FOLIOGAUGE</span>
                        </h2>
                        <p className="section-subtitle">
                            We don't do soft blue template fluff. We build high-precision engineering inspection tools for top-1% developers and designers.
                        </p>
                    </div>
                </FadeIn>

                {/* Core Differentials Grid */}
                <div className="whyus-grid">
                    <FadeIn delay={0.2}>
                        <div className="whyus-panel tech-panel">
                            <div className="panel-top font-mono">
                                <span className="panel-tag">// DIFFERENTIAL_01</span>
                                <span className="panel-metric text-cyan">ATS_SYNTHESIS</span>
                            </div>
                            <h3 className="panel-title">Zero-Fluff Conversion Telemetry</h3>
                            <p className="panel-desc">
                                While generic tools check superficial SEO tags, FolioGauge deconstructs your portfolio's ability to clear enterprise applicant tracking systems and retain recruiter eyeballs.
                            </p>
                            <div className="panel-benchmark font-mono">
                                <span>REC_TIME_SAVED: ~4.5 MIN / APP</span>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.35}>
                        <div className="whyus-panel tech-panel active-highlight">
                            <div className="panel-top font-mono">
                                <span className="panel-tag">// DIFFERENTIAL_02</span>
                                <span className="panel-metric text-lime">MULTI_AGENT_SIM</span>
                            </div>
                            <h3 className="panel-title">Tri-Persona Evaluation Matrix</h3>
                            <p className="panel-desc">
                                Get simultaneous feedback from three competing AI agents: a strict Engineering Lead, a typography-obsessed Design Director, and a speed-focused Tech Recruiter.
                            </p>
                            <div className="panel-benchmark font-mono">
                                <span>PERSONA_FIDELITY: GPT-4O / CLAUDE-3.5</span>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.5}>
                        <div className="whyus-panel tech-panel">
                            <div className="panel-top font-mono">
                                <span className="panel-tag">// DIFFERENTIAL_03</span>
                                <span className="panel-metric text-violet">DOM_SPEED_CHECK</span>
                            </div>
                            <h3 className="panel-title">Headless Runtime Inspection</h3>
                            <p className="panel-desc">
                                We execute actual DOM layout shifts, JavaScript hydration delays, and CSS animation frames to detect stutter before your interviewer experiences it.
                            </p>
                            <div className="panel-benchmark font-mono">
                                <span>LATENCY_CHECK: &lt; 140ms AVG</span>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Side-by-side Comparison Banner */}
                <FadeIn delay={0.6}>
                    <div className="whyus-comparison tech-panel font-mono">
                        <div className="comp-header">
                            <span>GENERIC SaaS TEMPLATES vs. FOLIOGAUGE COMMAND CENTER</span>
                        </div>
                        <div className="comp-grid">
                            <div className="comp-side old">
                                <div className="comp-label">GENERIC AUDITORS</div>
                                <ul>
                                    <li>✖ Generic "Good job!" summary fluff</li>
                                    <li>✖ Static screenshot color check</li>
                                    <li>✖ Ignored code quality &amp; repo links</li>
                                    <li>✖ Soft rounded pastel templates</li>
                                </ul>
                            </div>
                            <div className="comp-side new">
                                <div className="comp-label text-cyan">FOLIOGAUGE ENGINE</div>
                                <ul>
                                    <li>✦ Line-by-line DOM &amp; ARIA node fixes</li>
                                    <li>✦ Live multi-persona inference debate</li>
                                    <li>✦ GitHub commit &amp; README hygiene inspect</li>
                                    <li>✦ Cyberpunk developer command console</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.7}>
                    <div className="whyus-faq-link-row font-mono">
                        <span>NEED DEEPER ARCHITECTURAL SPECS?</span>
                        <Link to="/faq" className="cyber-faq-link">VIEW SYSTEM FAQ [&rarr;]</Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default WhyUs;

