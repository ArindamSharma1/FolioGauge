import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./hero.css";
import FloatingParticles from "./FloatingParticles.jsx";
import FadeIn from "../FadeIn.jsx";

function ConsoleFooterBar({ targetUrl }) {
    const [scanPulse, setScanPulse] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setScanPulse((prev) => (prev + 1) % 100);
        }, 1000); // 1s tick instead of 150ms for rock solid 60fps stability
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="console-footer-bar font-mono">
            <span className="footer-status-text">
                <span className="live-blink">▶</span> TARGET: {targetUrl || "none"}
            </span>
            <span className="footer-status-meta">SYS_LOAD: {(24 + (scanPulse % 8))}%</span>
        </div>
    );
}

function Hero() {
    const [targetUrl, setTargetUrl] = useState("https://github.com/developer-portfolio");
    const [activeTab, setActiveTab] = useState("telemetry");
    const navigate = useNavigate();

    const handleRunAnalysis = (e) => {

        e.preventDefault();
        if (targetUrl.trim()) {
            localStorage.setItem("folio_target_url", targetUrl.trim());
        }
        navigate("/scan");
    };

    return (
        <section className="cyber-hero-section" id="home">
            <FloatingParticles />
            
            {/* Ambient Background Glows */}
            <div className="hero-grid-overlay"></div>
            <div className="hero-glow-cyan"></div>
            <div className="hero-glow-magenta"></div>

            <div className="hud-container hero-split-container">
                {/* Left Side: Editorial Headline & Command Input */}
                <div className="hero-command-panel">
                    <FadeIn delay={0.1}>
                        <div className="hero-system-status">
                            <span className="terminal-badge">SYS_ID: FOLIOGAUGE-V2 // PROD</span>
                            <span className="system-ping font-mono">
                                <span className="ping-indicator"></span> ACTIVE ENGINE
                            </span>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <h1 className="hero-editorial-headline">
                            PORTFOLIO <br />
                            <span className="gradient-cyan-text">OBSERVABILITY</span> <br />
                            <span className="gradient-violet-text">COMMAND CENTER</span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <p className="hero-technical-subtext">
                            Stop guessing how recruiters and tech leads perceive your work. 
                            Ingest your portfolio URL for multi-persona neural critique, DOM accessibility breakdown, 
                            and high-impact conversion benchmarks.
                        </p>
                    </FadeIn>

                    {/* Interactive Scan Command Field */}
                    <FadeIn delay={0.4}>
                        <form className="hero-command-form tech-panel" onSubmit={handleRunAnalysis}>
                            <div className="command-input-header font-mono">
                                <span>$ target_url --analyze --verbose</span>
                                <span className="status-badge-mini">READY</span>
                            </div>
                            <div className="command-input-body">
                                <span className="command-prompt font-mono">&gt;</span>
                                <input
                                    type="text"
                                    className="command-input font-mono"
                                    placeholder="https://yourportfolio.dev"
                                    value={targetUrl}
                                    onChange={(e) => setTargetUrl(e.target.value)}
                                    required
                                />
                                <button type="submit" className="hero-execute-btn">
                                    <span className="btn-glow"></span>
                                    <span>[ RUN ANALYSIS &gt;&gt; ]</span>
                                </button>
                            </div>
                        </form>
                    </FadeIn>

                    {/* Quick Telemetry Badges */}
                    <FadeIn delay={0.5}>
                        <div className="hero-telemetry-metrics font-mono">
                            <div className="metric-pill">
                                <span className="metric-num">30s</span>
                                <span className="metric-lbl">AVG SCAN TIME</span>
                            </div>
                            <div className="metric-pill">
                                <span className="metric-num">3+</span>
                                <span className="metric-lbl">PERSONA MODELS</span>
                            </div>
                            <div className="metric-pill">
                                <span className="metric-num">98.4%</span>
                                <span className="metric-lbl">ATS AUDIT ACCURACY</span>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Right Side: Live Animated Diagnostics Console */}
                <div className="hero-diagnostics-console">
                    <FadeIn delay={0.3} direction="left">
                        <div className="console-wrapper tech-panel glow-border">
                            {/* Console Header Bar */}
                            <div className="console-header font-mono">
                                <div className="console-window-actions">
                                    <span className="dot dot-red"></span>
                                    <span className="dot dot-yellow"></span>
                                    <span className="dot dot-green"></span>
                                </div>
                                <div className="console-title">DIAGNOSTICS_STREAM // SIMULATION</div>
                                <div className="console-live-tag">
                                    <span className="pulse-circle"></span> STREAMING
                                </div>
                            </div>

                            {/* Console Navigation Tabs */}
                            <div className="console-tabs font-mono">
                                <button 
                                    type="button" 
                                    className={`console-tab ${activeTab === 'telemetry' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('telemetry')}
                                >
                                    [01 // TELEMETRY]
                                </button>
                                <button 
                                    type="button" 
                                    className={`console-tab ${activeTab === 'personas' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('personas')}
                                >
                                    [02 // PERSONAS]
                                </button>
                                <button 
                                    type="button" 
                                    className={`console-tab ${activeTab === 'dom' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('dom')}
                                >
                                    [03 // DOM_AUDIT]
                                </button>
                            </div>

                            {/* Console Body Output */}
                            <div className="console-body font-mono">
                                {activeTab === 'telemetry' && (
                                    <div className="tab-pane telemetry-pane">
                                        <div className="scan-progress-strip">
                                            <div className="progress-label">
                                                <span>NEURAL EVALUATION SCORE</span>
                                                <span className="score-highlight">94 / 100</span>
                                            </div>
                                            <div className="progress-bar-bg">
                                                <div className="progress-bar-fill" style={{ width: `94%` }}></div>
                                            </div>
                                        </div>

                                        <div className="console-log-feed">
                                            <div className="log-item success">
                                                <span className="log-time">[00:12ms]</span>
                                                <span className="log-msg">✓ DOM Hierarchy & Semantic Structure Verified</span>
                                            </div>
                                            <div className="log-item success">
                                                <span className="log-time">[00:28ms]</span>
                                                <span className="log-msg">✓ Contrast Ratio Passes WCAG AAA (12.4:1)</span>
                                            </div>
                                            <div className="log-item warn">
                                                <span className="log-time">[00:45ms]</span>
                                                <span className="log-msg">! Recruiter Persona: Project ROI metrics under-indexed</span>
                                            </div>
                                            <div className="log-item info">
                                                <span className="log-time">[00:61ms]</span>
                                                <span className="log-msg">&gt; ATS Keyword Density Check: 88% Match with Lead roles</span>
                                            </div>
                                        </div>

                                        <div className="console-radar-preview">
                                            <div className="radar-metric">
                                                <span className="radar-lbl">UI / Visual Impact</span>
                                                <span className="radar-val">96%</span>
                                            </div>
                                            <div className="radar-metric">
                                                <span className="radar-lbl">UX Flow & Clarity</span>
                                                <span className="radar-val">92%</span>
                                            </div>
                                            <div className="radar-metric">
                                                <span className="radar-lbl">Recruiter Hook Rate</span>
                                                <span className="radar-val">88%</span>
                                            </div>
                                            <div className="radar-metric">
                                                <span className="radar-lbl">Mobile Performance</span>
                                                <span className="radar-val">99%</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'personas' && (
                                    <div className="tab-pane personas-pane">
                                        <div className="persona-sim-card active-persona">
                                            <div className="sim-header">
                                                <span className="sim-role">💼 RECRUITER MODE</span>
                                                <span className="terminal-badge lime">VERDICT: PASS</span>
                                            </div>
                                            <p className="sim-comment">
                                                &quot;Clear contact info above fold. Case studies clearly list technologies used (`Next.js`, `TypeScript`). Recommend highlighting 1 business metric in hero summary.&quot;
                                            </p>
                                        </div>

                                        <div className="persona-sim-card">
                                            <div className="sim-header">
                                                <span className="sim-role">🎨 DESIGN LEAD MODE</span>
                                                <span className="terminal-badge magenta">VERDICT: EXCEPTIONAL</span>
                                            </div>
                                            <p className="sim-comment">
                                                &quot;Excellent type scale tension and intentional negative space. Micro-animations feel snappy (60fps). Grid alignment is crisp across breakpoints.&quot;
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'dom' && (
                                    <div className="tab-pane dom-pane">
                                        <div className="code-stream">
                                            <div><span className="code-key">&lt;header</span> <span className="code-attr">role=</span><span className="code-val">&quot;banner&quot;</span>&gt;</div>
                                            <div className="indent-1"><span className="code-key">&lt;nav</span> <span className="code-attr">aria-label=</span><span className="code-val">&quot;main&quot;</span>&gt; ... <span className="code-key">&lt;/nav&gt;</span></div>
                                            <div className="indent-1"><span className="code-key">&lt;h1</span> <span className="code-attr">class=</span><span className="code-val">&quot;hero-title&quot;</span>&gt;Senior Full Stack Engineer<span className="code-key">&lt;/h1&gt;</span></div>
                                            <div className="indent-1"><span className="code-key">&lt;section</span> <span className="code-attr">id=</span><span className="code-val">&quot;projects&quot;</span> <span className="code-attr">aria-labelledby=</span><span className="code-val">&quot;proj-heading&quot;</span>&gt;</div>
                                            <div className="indent-2"><span className="code-key">&lt;article</span> <span className="code-attr">class=</span><span className="code-val">&quot;case-study&quot;</span>&gt; ... <span className="code-key">&lt;/article&gt;</span></div>
                                            <div className="indent-1"><span className="code-key">&lt;/section&gt;</span></div>
                                            <div><span className="code-key">&lt;/header&gt;</span></div>
                                        </div>
                                        <div className="dom-footer-status">
                                            <span>ACCESSIBILITY SCORE: 100/100</span>
                                            <span className="status-lime">ARIA COMPLIANT ✓</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Scanline overlay & animated status bar */}
                            <div className="scanline-overlay"></div>
                            <ConsoleFooterBar targetUrl={targetUrl} />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}

export default Hero;

