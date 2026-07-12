import React from "react";
import "./GetInTouch.css";
import FadeIn from "../FadeIn";

const GetInTouch = () => {
    return (
        <section className="git-cyber-section">
            <div className="hud-container">
                <FadeIn delay={0.15}>
                    <div className="git-terminal-box tech-panel font-mono">
                        <div className="git-layout">
                            <div className="git-text-side">
                                <div className="header-badge-row" style={{ marginBottom: '1rem' }}>
                                    <span className="terminal-badge">COMM_CHANNEL // FREQ_2.4GHz</span>
                                    <span className="text-lime">[ SIGNAL: OPTIMAL ]</span>
                                </div>
                                <h2 className="git-title font-heading">
                                    INITIATE <span className="gradient-cyan-text">UPSTREAM TRANSMISSION.</span>
                                </h2>
                                <p className="git-subtitle">
                                    Identified anomalous heuristics? Need enterprise telemetry quotas, or custom neural scoring modules? Our core engineering node is listening on encrypted channels.
                                </p>
                            </div>

                            <div className="git-actions-side font-mono">
                                <a href="mailto:hello@foliogauge.com" className="git-action-card">
                                    <div className="git-icon-box">✉</div>
                                    <div className="git-action-text">
                                        <div className="git-action-header">
                                            <h3>DIRECT_MAIL_PROTOCOL</h3>
                                            <span className="git-cmd">$ mail -s "Query"</span>
                                        </div>
                                        <p className="text-cyan">hello@foliogauge.com</p>
                                    </div>
                                </a>

                                <a href="https://instagram.com/foliogauge" target="_blank" rel="noopener noreferrer" className="git-action-card">
                                    <div className="git-icon-box magenta">✦</div>
                                    <div className="git-action-text">
                                        <div className="git-action-header">
                                            <h3>TELEMETRY_UPDATES</h3>
                                            <span className="git-cmd">$ follow --ig</span>
                                        </div>
                                        <p className="text-magenta">@foliogauge</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default GetInTouch;

