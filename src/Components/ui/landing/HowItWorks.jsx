import React from 'react';
import './howitworks.css'; // Changed import from '../../pages/ScanPage.css' to './howitworks.css'

const HowItWorks = () => {
    return (
        <div className="how-it-works-container">
            <h2 className="how-it-works-title">How It Works</h2>

            <div className="how-it-works-grid">
                {/* Connecting Line (Desktop) */}
                <div className="connector-line"></div>

                {/* Step 1 */}
                <div className="step-card step-1">
                    <div className="step-icon-circle">
                        🔗
                    </div>
                    <h3 className="step-title">1. Paste URL</h3>
                    <p className="step-description">
                        Simply enter your portfolio link. No sign-up required for a quick check.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="step-card step-2">
                    <div className="step-icon-circle">
                        🤖
                    </div>
                    <h3 className="step-title">2. AI Analysis</h3>
                    <p className="step-description">
                        Our multi-persona AI scans your UX, content, and mobile responsiveness.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="step-card step-3">
                    <div className="step-icon-circle">
                        🚀
                    </div>
                    <h3 className="step-title">3. Get Hired</h3>
                    <p className="step-description">
                        Apply the actionable tips, polish your bio, and impress recruiters.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
