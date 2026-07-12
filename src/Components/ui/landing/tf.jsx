import React, { useState } from "react";
import "./tf.css";
import TypewriterText from "../TypewriterText.jsx";
import FadeIn from "../FadeIn.jsx";

function TF() {
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [isVideoInteractible, setIsVideoInteractible] = useState(false);

    return (
        <section id="tf" className="tf-section">
            <div className="hud-container">
                <FadeIn delay={0.1}>
                    <div className="tf-terminal-header font-mono">
                        <span className="terminal-badge">SYS_FEED // ARCHITECTURE_OVERVIEW</span>
                        <div className="header-status">
                            <span className="status-indicator live"></span>
                            <span className="status-text">SIGNAL_LOCKED: 1080p_60fps</span>
                        </div>
                    </div>

                    <div className="video-tech-wrapper">
                        <div className="corner-bracket tl"></div>
                        <div className="corner-bracket tr"></div>
                        <div className="corner-bracket bl"></div>
                        <div className="corner-bracket br"></div>

                        <iframe
                            className={`video-element ${isVideoInteractible ? "interactible" : ""}`}
                            src="https://www.youtube.com/embed/Nj_UqU17AjU?rel=0&modestbranding=1"
                            title="FolioGauge Overview"
                            frameBorder="0"
                            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        {!isVideoInteractible && (
                            <div
                                className="video-overlay"
                                onClick={() => setIsVideoInteractible(true)}
                            >
                                <div className="cyber-play-hint font-mono">
                                    <span className="play-icon">▶</span> INITIALIZE_VIDEO_FEED
                                </div>
                            </div>
                        )}
                    </div>
                </FadeIn>

                <div className="about-1">
                    <div className="about-content">
                        <div className="about-terminal-box tech-panel font-mono">
                            <div className="box-top-bar">
                                <span>// MISSION_STATEMENT : CORE_OBJECTIVE</span>
                                <span className="text-cyan">[ STATUS: VERIFIED ]</span>
                            </div>
                            <p className={`about-1-text ${isTypingComplete ? "typing-done" : ""}`}>
                                <TypewriterText text="FolioGauge is our autonomous neural critique" />
                                <br />
                                <TypewriterText text="pipeline, elevating portfolio evaluation into" delay={0.5} />
                                <br />
                                <TypewriterText
                                    text="the deterministic AI-driven era."
                                    delay={1.0}
                                    onComplete={() => setIsTypingComplete(true)}
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TF;

