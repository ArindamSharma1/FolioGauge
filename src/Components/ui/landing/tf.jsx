import React, { useState } from "react";
import "./tf.css";
import TypewriterText from "../TypewriterText.jsx";
import FadeIn from "../FadeIn.jsx";

function TF() {
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [isVideoInteractible, setIsVideoInteractible] = useState(false);

    return (
        <>
            <section id="tf" className="tf-section">
                <FadeIn direction="up" style={{ width: "100%" }}>
                    <div className="video-wrapper">
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
                                <div className="play-hint">Click to interact</div>
                            </div>
                        )}
                    </div>
                </FadeIn>
            </section>

            <div className="about-1">
                <div className="about-content">
                    <p className={`about-1-text ${isTypingComplete ? "typing-done" : ""}`}>
                        <TypewriterText text="FolioGauge is our automated critique" />
                        <br />
                        <TypewriterText text="system, elevating portfolio analysis into" delay={0.5} />
                        <br />
                        <TypewriterText
                            text="the AI-driven era."
                            delay={1.0}
                            onComplete={() => setIsTypingComplete(true)}
                        />
                    </p>
                </div>
            </div>
        </>
    );
}

export default TF;
