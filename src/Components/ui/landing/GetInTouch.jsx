import React from "react";
import "./GetInTouch.css";
import FadeIn from "../FadeIn";

const GetInTouch = () => {
    return (
        <section className="get-in-touch-section">
            <FadeIn>
                <div className="get-in-touch-container">
                    <div className="git-layout">
                        <div className="git-text-side">
                            <h2 className="git-title">Let’s Start a<br />Conversation.</h2>
                            <p className="git-subtitle">
                                Whether you identified a bug, have a feature request, or just want to say hi, we’re standing by.
                            </p>
                        </div>

                        <div className="git-actions-side">
                            <a href="mailto:hello@foliogauge.com" className="git-action-card">
                                <div className="git-icon-box">@</div>
                                <div className="git-action-text">
                                    <h3>General Support</h3>
                                    <p>hello@foliogauge.com</p>
                                </div>
                            </a>

                            <a href="https://instagram.com/foliogauge" target="_blank" rel="noopener noreferrer" className="git-action-card">
                                <div className="git-icon-box">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </div>
                                <div className="git-action-text">
                                    <h3>Follow Updates</h3>
                                    <p>@foliogauge</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </section>
    );
};

export default GetInTouch;
