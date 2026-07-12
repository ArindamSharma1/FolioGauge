import React, { useState } from 'react';
import './howitworks.css';
import FadeIn from '../FadeIn.jsx';

const HowItWorks = () => {
    const [activeStage, setActiveStage] = useState(1);

    const stages = [
        {
            id: 1,
            code: "STAGE_01",
            title: "DEEP DOM & TREE PARSING",
            subtitle: "// INGESTION ENGINE",
            badge: "0.14s EXEC",
            desc: "The scanner executes a headless browser instance, deconstructing your portfolio's DOM hierarchy, semantic landmarks, ARIA compliance, and asset payload efficiency.",
            snippet: "$ folio --ingest https://target.dev --mode=deep-dom",
            output: "✓ Extracted 42 DOM Nodes | 3 Landmark Roles | 0 ARIA Errors"
        },
        {
            id: 2,
            code: "STAGE_02",
            title: "MULTI-PERSONA INFERENCE",
            subtitle: "// NEURAL CRITIQUE MATRIX",
            badge: "CLAUDE / GEMINI",
            desc: "Three specialized AI agents simultaneously evaluate your portfolio: Senior Technical Recruiter (clarity & ATS), Design Director (visual hierarchy & tension), and Engineering Lead (code proof).",
            snippet: "$ folio --infer --personas=recruiter,designer,tech-lead",
            output: "💼 Recruiter: PASS | 🎨 Designer: EXCEPTIONAL | ⚙️ Lead: VERIFIED"
        },
        {
            id: 3,
            code: "STAGE_03",
            title: "ACTIONABLE TELEMETRY SYNTHESIS",
            subtitle: "// DIAGNOSTICS REPORT",
            badge: "CONVERSION READY",
            desc: "Instead of generic fluff, you receive exact CSS/HTML fix recommendations, ATS keyword gap analysis, and before/after impact projections to maximize interview conversion rates.",
            snippet: "$ folio --export --format=json --recommendations",
            output: "✦ Generated 14 High-Impact Recommendations | Score Bump: +18%"
        }
    ];

    return (
        <section className="pipeline-section" id="howitworks">
            <div className="hud-container">
                <FadeIn delay={0.1}>
                    <div className="section-header-terminal">
                        <div className="header-badge-row">
                            <span className="terminal-badge">SYS_PIPELINE // ARCHITECTURE</span>
                            <span className="font-mono text-cyan" style={{ fontSize: '0.72rem' }}>[ RUNTIME: NODE_ASYNC_V4 ]</span>
                        </div>
                        <h2 className="section-title">
                            AUTOMATED <span className="gradient-cyan-text">EXECUTION PIPELINE</span>
                        </h2>
                        <p className="section-subtitle">
                            How FolioGauge transforms a raw URL into precision engineering telemetry in under 30 seconds.
                        </p>
                    </div>
                </FadeIn>

                {/* Pipeline Stages Grid */}
                <div className="pipeline-grid">
                    {stages.map((stage, idx) => (
                        <FadeIn delay={0.2 + idx * 0.15} key={stage.id}>
                            <div 
                                className={`pipeline-node tech-panel ${activeStage === stage.id ? 'is-selected' : ''}`}
                                onClick={() => setActiveStage(stage.id)}
                                onMouseEnter={() => setActiveStage(stage.id)}
                            >
                                <div className="node-top-bar font-mono">
                                    <span className="node-code">{stage.code}</span>
                                    <span className="node-badge">{stage.badge}</span>
                                </div>

                                <div className="node-header">
                                    <h3 className="node-title">{stage.title}</h3>
                                    <span className="node-subtitle font-mono">{stage.subtitle}</span>
                                </div>

                                <p className="node-desc">{stage.desc}</p>

                                {/* Terminal Command Box */}
                                <div className="node-terminal-box font-mono">
                                    <div className="terminal-cmd">{stage.snippet}</div>
                                    <div className="terminal-out">{stage.output}</div>
                                </div>

                                {/* Node Status LED */}
                                <div className="node-footer font-mono">
                                    <span className="status-indicator"></span>
                                    <span>STATUS: {activeStage === stage.id ? 'ACTIVE_PROCESSING' : 'STANDBY'}</span>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Interactive Pipeline Telemetry Bar */}
                <FadeIn delay={0.6}>
                    <div className="pipeline-status-strip tech-panel font-mono">
                        <div className="strip-left">
                            <span className="terminal-badge lime">SYSTEM PING: OPTIMAL</span>
                            <span>PIPELINE_THROUGHPUT: 1,420 SCANS / HR</span>
                        </div>
                        <div className="strip-right">
                            <span>ENCRYPTION: AES-256-GCM</span>
                            <span>CLIENT_VERIFIED: TRUE</span>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default HowItWorks;

