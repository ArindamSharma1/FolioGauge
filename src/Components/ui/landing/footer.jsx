import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
    return (
        <footer className="terminal-footer">
            <div className="footer-top-telemetry">
                <div className="footer-container telemetry-strip">
                    <div className="telemetry-block">
                        <span className="terminal-badge">SYSTEM // DIAGNOSTICS</span>
                        <span className="telemetry-txt font-mono">UPTIME: 99.98%</span>
                        <span className="telemetry-txt font-mono">LATENCY: 14ms</span>
                        <span className="telemetry-txt font-mono hide-mobile">ENGINE: CLAUDE/GEMINI HYBRID V2.4</span>
                    </div>
                    <div className="telemetry-block right font-mono">
                        <span>[ SYSTEM HEALTH: <strong style={{ color: '#10b981' }}>OPTIMAL</strong> ]</span>
                    </div>
                </div>
            </div>

            <div className="footer-container footer-main-content">
                <div className="footer-system-summary">
                    <div className="footer-brand-header">
                        <span className="footer-logo-glyph">∆</span>
                        <h3 className="footer-logo-title">F O L I O G A U G E</h3>
                    </div>
                    <p className="footer-system-desc">
                        Next-generation portfolio intelligence platform & automated observability console. 
                        Simulating recruiter, design lead, and client critique loops with neural precision.
                    </p>
                    <div className="footer-system-specs font-mono">
                        <div>&gt; TARGET_AUDIENCE: DEVELOPERS & DESIGNERS</div>
                        <div>&gt; SCAN_MODE: DEEP_DOM_PARSE + AI_PERSONAS</div>
                        <div>&gt; ENCRYPTION: TLS 1.3 / AES-GCM-256</div>
                    </div>
                </div>

                <div className="footer-links-grid font-mono">
                    <div className="footer-col">
                        <h4>// CONSOLE</h4>
                        <ul>
                            <li><Link to="/scan">Launch Scanner &gt;&gt;</Link></li>
                            <li><a href="#all-features">Capability Specs</a></li>
                            <li><a href="#pricing">Resource Allocations</a></li>
                            <li><a href="#howitworks">Execution Pipeline</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>// TELEMETRY</h4>
                        <ul>
                            <li><Link to="/profile">Operator Profile</Link></li>
                            <li><Link to="/login">Operator Login</Link></li>
                            <li><Link to="/signup">Register Identity</Link></li>
                            <li><Link to="/faq">Knowledgebase</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>// PROTOCOLS</h4>
                        <ul>
                            <li><Link to="/privacy">Privacy Protocol</Link></li>
                            <li><Link to="/terms">Terms of Operation</Link></li>
                            <li><Link to="/refund">Refund Policy</Link></li>
                            <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub Repository</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-big-backdrop">
                <span className="footer-giant-text">F O L I O G A U G E</span>
            </div>

            <div className="footer-bottom-bar font-mono">
                <div className="footer-container bottom-inner">
                    <span>© {new Date().getFullYear()} FOLIOGAUGE SYSTEM INC. ALL RIGHTS RESERVED.</span>
                    <span className="bottom-meta">SYS_BUILD: 2026.07.12 // PROD</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

