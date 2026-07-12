import React, { useState } from "react";
import "./allfeatures.css";
import FadeIn from "../FadeIn.jsx";

const CheckGlyph = () => (
    <span className="spec-glyph pass">✓ PASS</span>
);

const LimitGlyph = ({ text }) => (
    <span className="spec-glyph limit">{text}</span>
);

const AllFeatures = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const specs = [
        {
            id: "spec-01",
            category: "engine",
            code: "ENG_DOM_PARSE",
            title: "Headless DOM & ARIA Synthesizer",
            desc: "Full browser runtime evaluation of semantic HTML5 hierarchy, landmark distribution, and WCAG AAA contrast compliance across 5 breakpoints.",
            std: "Basic Tree",
            pro: "5 Breakpoints",
            super: "Full Headless + ARIA"
        },
        {
            id: "spec-02",
            category: "engine",
            code: "ENG_ATS_SIM",
            title: "Neural ATS Keyword & Role Indexer",
            desc: "Cross-references your project descriptions against 40,000+ real engineering and product design job descriptions to calculate recruiter relevance scores.",
            std: "Top 5 Keywords",
            pro: "Full Role Match",
            super: "Deep Semantic ATS Audit"
        },
        {
            id: "spec-03",
            category: "personas",
            code: "PER_RECRUITER",
            title: "Senior Tech Recruiter Simulation",
            desc: "Simulates a 6-second initial scan to verify resume download clarity, contact reachability, and high-level tech stack prominence.",
            std: <CheckGlyph />,
            pro: <CheckGlyph />,
            super: <CheckGlyph />
        },
        {
            id: "spec-04",
            category: "personas",
            code: "PER_DESIGNER",
            title: "Design Director / Lead UI Critique",
            desc: "Evaluates typography pairing tension, negative space rhythm, micro-animation smoothness (fps check), and color palette harmony.",
            std: <LimitGlyph text="LOCKED" />,
            pro: <CheckGlyph />,
            super: <CheckGlyph />
        },
        {
            id: "spec-05",
            category: "personas",
            code: "PER_ENG_LEAD",
            title: "Principal Staff Engineer Code Check",
            desc: "Inspects live GitHub repositories linked in case studies, checking commit hygiene, README clarity, and test coverage indicators.",
            std: <LimitGlyph text="LOCKED" />,
            pro: <LimitGlyph text="LOCKED" />,
            super: <CheckGlyph />
        },
        {
            id: "spec-06",
            category: "export",
            code: "EXP_JSON_API",
            title: "Raw Telemetry & JSON Pipeline API",
            desc: "Direct access to our diagnostic endpoints to integrate portfolio health checks into your CI/CD workflow or custom dev dashboards.",
            std: <LimitGlyph text="LOCKED" />,
            pro: <LimitGlyph text="JSON ONLY" />,
            super: <CheckGlyph />
        },
        {
            id: "spec-07",
            category: "export",
            code: "EXP_BIO_REWRITE",
            title: "Automated Bio & Case Study Refactor",
            desc: "Instant drop-in markdown rewrites of weak project descriptions, replacing passive verbs with high-impact engineering metrics.",
            std: <LimitGlyph text="1 REWRITE" />,
            pro: <LimitGlyph text="10 REWRITES" />,
            super: <CheckGlyph />
        }
    ];

    const filteredSpecs = selectedCategory === "all" 
        ? specs 
        : specs.filter(s => s.category === selectedCategory);

    return (
        <section id="all-features" className="spec-matrix-section">
            <div className="hud-container">
                <FadeIn delay={0.1}>
                    <div className="matrix-header">
                        <div className="header-badge-row">
                            <span className="terminal-badge">SYS_CAPABILITIES // SPECIFICATION</span>
                            <span className="font-mono text-cyan" style={{ fontSize: '0.72rem' }}>[ MATRIX_REV: 2.4.0 ]</span>
                        </div>
                        <h2 className="section-title">
                            MODULAR <span className="gradient-cyan-text">CAPABILITY MATRIX</span>
                        </h2>
                        <p className="section-subtitle">
                            Granular breakdown of scanning heuristics, AI personas, and export protocols.
                        </p>

                        {/* Category Filter Pills */}
                        <div className="matrix-filter-pills font-mono">
                            <button 
                                className={`filter-pill ${selectedCategory === 'all' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('all')}
                            >
                                // ALL_SPECS ({specs.length})
                            </button>
                            <button 
                                className={`filter-pill ${selectedCategory === 'engine' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('engine')}
                            >
                                // ENGINE (2)
                            </button>
                            <button 
                                className={`filter-pill ${selectedCategory === 'personas' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('personas')}
                            >
                                // PERSONAS (3)
                            </button>
                            <button 
                                className={`filter-pill ${selectedCategory === 'export' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('export')}
                            >
                                // PROTOCOLS (2)
                            </button>
                        </div>
                    </div>
                </FadeIn>

                {/* High-Density Specs Table / Grid */}
                <FadeIn delay={0.3}>
                    <div className="spec-table-container tech-panel">
                        <div className="spec-table-header font-mono">
                            <div className="col-feature">SPECIFICATION / MODULE</div>
                            <div className="col-tier">STANDARD [FREE]</div>
                            <div className="col-tier">PRO [$15/MO]</div>
                            <div className="col-tier highlight">SUPER_PRO [$50/MO]</div>
                        </div>

                        <div className="spec-table-body">
                            {filteredSpecs.map((item) => (
                                <div className="spec-row" key={item.id}>
                                    <div className="col-feature">
                                        <div className="spec-code font-mono">{item.code}</div>
                                        <div className="spec-title">{item.title}</div>
                                        <div className="spec-desc">{item.desc}</div>
                                    </div>
                                    <div className="col-tier font-mono">{item.std}</div>
                                    <div className="col-tier font-mono">{item.pro}</div>
                                    <div className="col-tier highlight font-mono">{item.super}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* Bottom Hardware Note */}
                <FadeIn delay={0.5}>
                    <div className="matrix-footer-note font-mono">
                        <span>* ALL TIERS RUN ON DEDICATED LOW-LATENCY US-EAST-1 INFERENCE CLUSTERS WITH 99.9% GUARANTEED SLA.</span>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default AllFeatures;

