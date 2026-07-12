import React from "react";
import { Link } from "react-router-dom";
import "./getstarted.css";
import FadeIn from "../FadeIn.jsx";

function GetStarted() {
    return (
        <section className="gs-cyber-section" id="getstarted">
            <div className="hud-container">
                <FadeIn delay={0.15}>
                    <div className="gs-node-container tech-panel font-mono">
                        {/* LEFT SIDE: DIAGNOSTIC WIREFRAME / VISUAL */}
                        <div className="gs-visual-side">
                            <div className="gs-wireframe-box">
                                <div className="wireframe-header">
                                    <span>// RADAR_LOCK : SCANNER_v3.4</span>
                                    <span className="status-indicator live"></span>
                                </div>
                                <div className="wireframe-body">
                                    <img src="/br-1-nobg.png" alt="Scanning Radar Visual" loading="lazy" className="gs-radar-img" />
                                    <div className="radar-sweep-line"></div>
                                </div>
                                <div className="wireframe-footer">
                                    <span>TARGET: UNINITIALIZED</span>
                                    <span className="text-cyan">READY_FOR_CRAWL</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: TELEMETRY & LAUNCH */}
                        <div className="gs-content-side">
                            <div className="header-badge-row" style={{ marginBottom: '1.2rem' }}>
                                <span className="terminal-badge">DEPLOY_NODE // INITIALIZE</span>
                                <span className="text-lime">[ LATENCY: 12ms ]</span>
                            </div>

                            <h2 className="gs-title font-heading">
                                INITIALIZE YOUR <span className="gradient-cyan-text">AUTONOMOUS AUDIT.</span>
                            </h2>

                            <p className="gs-desc">
                                Deploy FolioGauge across your design system, UX architecture, and DOM hierarchy. Receive deterministic, AI-driven scores tailored to top 1% industry standards—without guessing what elite engineering teams expect.
                            </p>

                            <div className="gs-launch-row font-mono">
                                <div className="gs-cmd-preview">
                                    <span>$ folio --execute --target=localhost</span>
                                </div>
                                <Link to="/scan" className="gs-cyber-btn">
                                    <span>LAUNCH_NEURAL_SCAN [&rarr;]</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

export default GetStarted;

