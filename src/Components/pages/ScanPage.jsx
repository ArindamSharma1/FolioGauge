import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ScanPage.css';
import './PersonaStyles.css';
import { supabase } from '../../supabaseClient';
import FadeIn from '../ui/FadeIn.jsx';
import SocialShare from '../ui/SocialShare.jsx';
import SkeletonReport from '../ui/SkeletonReport.jsx';
import confetti from 'canvas-confetti';
import { Helmet } from 'react-helmet-async';

const ScanPage = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [userTier, setUserTier] = useState('free'); // default user will be free (obviously)
    const [url, setUrl] = useState('');
    const [persona, setPersona] = useState('recruiter'); // recruiter, design_lead, client
    const [isScanning, setIsScanning] = useState(false);
    const [isValid, setIsValid] = useState(null);
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [toolMessage, setToolMessage] = useState(null);
    const resultsRef = useRef(null);

    // Tool States
    const [showBrandingModal, setShowBrandingModal] = useState(false);
    const [showMockupModal, setShowMockupModal] = useState(false);
    const [showRewriteModal, setShowRewriteModal] = useState(false);
    const [paletteCopyFeedback, setPaletteCopyFeedback] = useState(null);

    // Rewrite Tool State
    const [rewriteInput, setRewriteInput] = useState('');
    const [rewriteTone, setRewriteTone] = useState('professional');
    const [rewriteResult, setRewriteResult] = useState(null);
    const [isRewriting, setIsRewriting] = useState(false);

    // AI Q&A State
    const [activeQuestionIndices, setActiveQuestionIndices] = useState(new Set());

    const toggleQuestion = (idx) => {
        setActiveQuestionIndices(prev => {
            const next = new Set(prev);
            if (next.has(idx)) next.delete(idx);
            else next.add(idx);
            return next;
        });
    };

    const handleCopyColor = (color) => {
        navigator.clipboard.writeText(color);
        setPaletteCopyFeedback(`Color code copied: ${color}`);
        setTimeout(() => setPaletteCopyFeedback(null), 2000);
    };

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

    const handleRewrite = async () => {
        if (!rewriteInput.trim()) return;
        setIsRewriting(true);
        setRewriteResult(null);

        try {
            let accessToken = null;
            if (supabase) {
                const { data: sessionData } = await supabase.auth.getSession();
                accessToken = sessionData?.session?.access_token;
            }

            const res = await fetch(`${API_BASE_URL}/tools/rewrite`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ text: rewriteInput, tone: rewriteTone }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "Rewrite failed");

            setRewriteResult(data.rewritten);

        } catch (err) {
            setToolMessage({ type: 'error', text: err.message });
            setTimeout(() => setToolMessage(null), 4000);
        } finally {
            setIsRewriting(false);
        }
    };




    useEffect(() => {
        if (scanResult && resultsRef.current) {
            setTimeout(() => {
                resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

            // Trigger Confetti if score is good
            if (scanResult.score >= 80) {
                const duration = 3 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                const interval = setInterval(function () {
                    const timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    const particleCount = 50 * (timeLeft / duration);

                    // Random burst
                    confetti({
                        ...defaults,
                        particleCount,
                        origin: { x: Math.random() * 0.2 + 0.1, y: Math.random() - 0.2 }
                    });
                    confetti({
                        ...defaults,
                        particleCount,
                        origin: { x: Math.random() * 0.2 + 0.7, y: Math.random() - 0.2 }
                    });
                }, 250);
            }
        }
    }, [scanResult]);

    // Fetch tier on mount to unlock UI immediately
    useEffect(() => {
        const checkTier = async () => {
            if (supabase) {
                const { data: sessionData } = await supabase.auth.getSession();
                const token = sessionData?.session?.access_token;
                if (token) {
                    fetchUserTier(token);
                }
            }
        };
        checkTier();
    }, []);

    const validateUrl = (value) => {
        const pattern = new RegExp(
            '^(https?:\\/\\/)' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$',
            'i'
        );
        return !!pattern.test(value);
    };

    const handleInput = (e) => {
        const value = e.target.value;
        setUrl(value);
        setScanResult(null);
        setError(null);
        setToolMessage(null); // clear tool messages on input

        if (value) {
            setIsValid(validateUrl(value));
        } else {
            setIsValid(null);
        }
    };

    // --- Tool Functions ---
    const handleTextExport = () => {
        if (!scanResult) return;
        const text = `FolioGauge Scan Report\nScore: ${scanResult.score}\n\nInsights:\n${scanResult.insights.map(i => '- ' + i).join('\n')}\n\nSuggestions:\n${scanResult.suggestions.map(s => '- ' + s).join('\n')}`;
        const blob = new Blob([text], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `report_${new Date().getTime()}.txt`;
        link.click();
    };

    const handleFigmaExport = () => {
        // Simulation: Creating a JSON of "design tokens"
        const tokens = {
            colors: { primary: "#2563EB", secondary: "#1E40AF", background: "#FFFFFF", text: "#1F2937" },
            typography: { h1: "Work Sans, 32px, 700", body: "Inter, 16px, 400" },
            spacing: { sm: "8px", md: "16px", lg: "32px" }
        };
        const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `figma_tokens_${new Date().getTime()}.json`;
        link.click();
    };

    const handleToolClick = (requiredTier, actionName) => {
        const tiers = ['free', 'pro', 'super_pro'];
        const userTierIdx = tiers.indexOf(userTier);
        const requiredIdx = tiers.indexOf(requiredTier);

        if (userTierIdx < requiredIdx) {
            // Locked
            setToolMessage({ type: 'error', text: `🔒 Upgrade to ${requiredTier === 'super_pro' ? 'Super Pro' : 'Pro'} to access ${actionName}!` });
            setTimeout(() => setToolMessage(null), 3000);
        } else {
            // Active
            setToolMessage({ type: 'success', text: `🚀 running ${actionName}...` });
            setTimeout(() => setToolMessage(null), 3000);

            // Execute
            if (actionName === 'Text Export') handleTextExport();
            if (actionName === 'Figma Export') handleFigmaExport();
            if (actionName === 'Branding') setShowBrandingModal(true);
            if (actionName === 'Mockup Gen') setShowMockupModal(true);
            if (actionName === 'Bio Polish') setShowRewriteModal(true);
        }
    };

    const fetchUserTier = async (token) => {
        try {
            const res = await fetch(`${API_BASE_URL}/user/usage`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setUserTier(data.tier); // Backend returns "super_pro" for admin
            }
        } catch (error) {
            console.error('Error fetching tier:', error);
        }
    };

    const handleScan = async (e, overridePersona = null) => {
        if (e) e.preventDefault();
        setToolMessage(null);
        if (!url || !isValid) return;

        setIsScanning(true);
        const activePersona = overridePersona || persona;

        let accessToken = null;
        if (supabase) {
            const { data: sessionData } = await supabase.auth.getSession();
            accessToken = sessionData?.session?.access_token;
            if (accessToken) {
                fetchUserTier(accessToken);
            }
        }

        if (!accessToken) {
            setError("Please log in first to use the scanner.");
            setIsScanning(false);
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/scan`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ url, persona: activePersona }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || "Scan failed");
            }


            setScanResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsScanning(false);
        }
    };


    const handlePersonaClick = (selectedPersona) => {
        if (selectedPersona === 'recruiter') {
            setPersona('recruiter');
            if (url && isValid && scanResult) {
                handleScan(null, 'recruiter');
            }
            return;
        }

        if (userTier !== 'super_pro') {
            setToolMessage({ type: 'error', text: '🔒 Upgrade to Super Pro to unlock AI Personas!' });
            setTimeout(() => setToolMessage(null), 3000);
            return;
        }
        setPersona(selectedPersona);

        // Auto-rescan if we already have a valid URL and results are showing (or just if URL is valid)
        // User asked for "after the results we select design lead", so checking scanResult is safer 
        // to avoid accidental scans while typing, but checking isValid is enough if they want instant feedback.
        // Let's stick to: if we have a URL, just go for it.
        if (url && isValid) {
            handleScan(null, selectedPersona);
        }
    };


    return (
        <div className="scan-page">
            <FadeIn direction="up">
                <div className="scan-hero">
                    <Helmet>
                        <title>Scan Your Portfolio | FolioGauge</title>
                        <meta name="description" content="Get instant AI feedback on your design portfolio. Scan for UX issues, visual clarity, and hiring impact." />
                    </Helmet>
                    <h1>Optimize Your Portfolio</h1>
                    <p>
                        Enter your portfolio URL to receive AI-powered feedback
                        on design, structure, and clarity.
                    </p>
                </div>
            </FadeIn>


            <FadeIn direction="up" delay={0.2}>
                <div className="scan-container">
                    <div className="persona-selector">
                        <span className="persona-label">Who is viewing?</span>
                        <div className="persona-options">
                            <button
                                type="button"
                                className={`persona-btn ${persona === 'recruiter' ? 'active' : ''}`}
                                onClick={() => handlePersonaClick('recruiter')}
                            >
                                💼 Recruiter
                            </button>
                            <button
                                type="button"
                                className={`persona-btn ${persona === 'design_lead' ? 'active' : ''} ${userTier !== 'super_pro' ? 'locked-persona' : ''}`}
                                onClick={() => handlePersonaClick('design_lead')}
                            >
                                {userTier !== 'super_pro' ? '🔒' : '🎨'} Design Lead
                            </button>
                            <button
                                type="button"
                                className={`persona-btn ${persona === 'client' ? 'active' : ''} ${userTier !== 'super_pro' ? 'locked-persona' : ''}`}
                                onClick={() => handlePersonaClick('client')}
                            >
                                {userTier !== 'super_pro' ? '🔒' : '🤝'} Client
                            </button>
                        </div>
                    </div>

                    <form className="url-input-group" onSubmit={handleScan}>
                        <div className="url-input-wrapper">
                            <input
                                type="url"
                                className={`url-input ${isValid === false ? 'invalid' : isValid === true ? 'valid' : ''}`}
                                placeholder="https://yourportfolio.com"
                                value={url}
                                onChange={handleInput}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="scan-btn"
                            disabled={isScanning || !isValid}
                        >
                            {isScanning ? 'Analyzing…' : 'Analyze Now'}
                        </button>
                    </form>

                    {error && (
                        <div className="scan-error-container">
                            <p className="scan-error">{error}</p>
                            {error.toLowerCase().includes("limit reached") && (
                                <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                                    <span style={{ color: '#4B5563', fontSize: '0.9rem' }}>Want more scans? </span>
                                    {isHome ? (
                                        <a href="#features" style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}>
                                            Upgrade to Pro &rarr;
                                        </a>
                                    ) : (
                                        <Link to="/#features" style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}>
                                            Upgrade to Pro &rarr;
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </FadeIn>

            {!scanResult && !isScanning && (
                <FadeIn direction="up" delay={0.4}>
                    <div className="scan-features-wrapper">
                        <div className="scan-features-grid">
                            <div className="feature-glass-card">
                                <div className="feature-icon-box">⚡</div>
                                <h3>Instant Analysis</h3>
                                <p>Get immediate, AI-driven feedback on your portfolio's clarity and structure.</p>
                            </div>
                            <div className="feature-glass-card">
                                <div className="feature-icon-box">📱</div>
                                <h3>Mobile Check</h3>
                                <p>Ensure your site looks perfect on all devices with our responsiveness scan.</p>
                            </div>
                            <div className="feature-glass-card">
                                <div className="feature-icon-box">🔍</div>
                                <h3>SEO & Structure</h3>
                                <p>Verify your heading hierarchy, meta tags, and accessibility standards.</p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            )
            }

            {/* Skeleton Loader */}
            {
                isScanning && (
                    <div className="scan-results">
                        <SkeletonReport />
                    </div>
                )
            }


            {
                scanResult && (
                    <div className="scan-results" ref={resultsRef}>
                        <div className="results-header">
                            <div>
                                <h2>Analysis Report</h2>
                                <div className="persona-badge-display">
                                    Viewing as: <strong>{persona === 'design_lead' ? 'Design Lead' : persona === 'client' ? 'Client' : 'Recruiter'}</strong>
                                </div>
                            </div>
                            <div className="score-badge">
                                <span className="score-label">Overall Score</span>
                                <span className="score-value">{scanResult.score}</span>
                            </div>
                        </div>

                        {/* Benchmarking Section */}
                        {scanResult.benchmarks && scanResult.benchmarks.length > 0 && (
                            <div className="benchmarks-row">
                                {scanResult.benchmarks.map((b, idx) => (
                                    <div key={idx} className="benchmark-card">
                                        <span className="bench-cat">{b.category}</span>
                                        <div className="bench-stat">
                                            {b.text}
                                            <span className="bench-percent">({b.percentile}%)</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="results-grid">
                            <div className="result-card insights-card">
                                <h3>Key Insights</h3>
                                <ul className="result-list">
                                    {scanResult.insights.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="result-card suggestions-card">
                                <h3>
                                    {userTier === 'free' ? 'Basic Suggestions' : 'Advanced Suggestions'}
                                    {userTier === 'free' && <span className="badge-free">Limited</span>}
                                </h3>
                                <ul className="result-list">
                                    {scanResult.suggestions.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                                {userTier === 'free' && (
                                    <div className="blur-overlay-hint">
                                        <p>Upgrade to see more...</p>
                                    </div>
                                )}
                            </div>

                            {/* AI Questions Card (Pro/Super Pro) */}
                            {scanResult.ai_questions && scanResult.ai_questions.length > 0 && (
                                <div className="result-card ai-questions-card">
                                    <div className="ai-badge">🤖 AI Deep Dive</div>
                                    <h3>Suggested Questions</h3>
                                    <p className="ai-subtext">Click to reveal expert answers customized for you:</p>
                                    <div className="ai-questions-list">
                                        {scanResult.ai_questions.map((qObj, idx) => {
                                            const isOpen = activeQuestionIndices.has(idx);
                                            return (
                                                <div key={idx} className={`ai-question-bubble ${isOpen ? 'open' : ''}`}>
                                                    <div
                                                        className="ai-question-summary"
                                                        onClick={() => toggleQuestion(idx)}
                                                    >
                                                        {qObj.question}
                                                        <span className="ai-toggle-icon">+</span>
                                                    </div>
                                                    <div className="ai-question-content-wrapper">
                                                        <div className="ai-question-answer">
                                                            {qObj.answer}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Social Share Card - Growth Loop */}
                        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                            <SocialShare score={scanResult.score} />
                        </div>

                        {/* --- New Tools Section --- */}
                        <div className="scan-tools-section">
                            <h3>Tools & Actions</h3>
                            {toolMessage && (
                                <div className={`tool-feedback-message ${toolMessage.type}`}>
                                    {toolMessage.type === 'error' ? '⚠️ ' : '✅ '}
                                    {toolMessage.text}
                                </div>
                            )}
                            <div className="tools-grid">
                                {/* Text Export - PRO */}
                                <button
                                    className={`tool-card ${userTier === 'free' ? 'locked' : ''}`}
                                    onClick={() => handleToolClick('pro', 'Text Export')}
                                >
                                    <div className="tool-icon">{userTier === 'free' ? '🔒' : '📄'}</div>
                                    <div className="tool-info">
                                        <h4>Text Export</h4>
                                        <span>Download detailed PDF/Text report</span>
                                    </div>
                                </button>

                                {/* Figma Export - SUPER PRO */}
                                <button
                                    className={`tool-card ${userTier !== 'super_pro' ? 'locked' : ''}`}
                                    onClick={() => handleToolClick('super_pro', 'Figma Export')}
                                >
                                    <div className="tool-icon">{userTier !== 'super_pro' ? '🔒' : '🎨'}</div>
                                    <div className="tool-info">
                                        <h4>Figma Export</h4>
                                        <span>Convert portfolio to Figma design</span>
                                    </div>
                                </button>

                                {/* Mockup Gen - SUPER PRO */}
                                <button
                                    className={`tool-card ${userTier !== 'super_pro' ? 'locked' : ''}`}
                                    onClick={() => handleToolClick('super_pro', 'Mockup Gen')}
                                >
                                    <div className="tool-icon">{userTier !== 'super_pro' ? '🔒' : '🖼️'}</div>
                                    <div className="tool-info">
                                        <h4>Mockup Gen</h4>
                                        <span>Create device mockups instantly</span>
                                    </div>
                                </button>

                                {/* Branding Recs - SUPER PRO */}
                                <button
                                    className={`tool-card ${userTier !== 'super_pro' ? 'locked' : ''}`}
                                    onClick={() => handleToolClick('super_pro', 'Branding')}
                                >
                                    <div className="tool-icon">{userTier !== 'super_pro' ? '🔒' : '✨'}</div>
                                    <div className="tool-info">
                                        <h4>Branding</h4>
                                        <span>Color & Font Recommendations</span>
                                    </div>
                                </button>

                                {/* Bio Polish - PRO */}
                                <button
                                    className={`tool-card ${userTier === 'free' ? 'locked' : ''}`}
                                    onClick={() => handleToolClick('pro', 'Bio Polish')}
                                >
                                    <div className="tool-icon">{userTier === 'free' ? '🔒' : '✍️'}</div>
                                    <div className="tool-info">
                                        <h4>Bio Polish</h4>
                                        <span>Rewrite text with AI</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="plan-upsell-container">
                            <div className="current-plan-status">
                                <span className="status-label">Current Plan:</span>
                                <span className={`status-value ${userTier}`}>{userTier === 'super_pro' ? 'Super Pro' : userTier === 'pro' ? 'Pro' : 'Free'}</span>
                            </div>

                            {userTier === 'free' && (
                                <div className="upsell-content">
                                    <h4>Unlock Full Power with Pro</h4>
                                    <div className="upsell-features">
                                        <div className="upsell-feature">✨ Enhanced Scoring</div>
                                        <div className="upsell-feature">🚀 5 Scans Per Day</div>
                                        <div className="upsell-feature">🤖 Advanced AI Suggestions</div>
                                        <div className="upsell-feature">📄 Text Export</div>
                                    </div>
                                    {isHome ? (
                                        <a href="#features" className="upgrade-btn">Upgrade Plan</a>
                                    ) : (
                                        <Link to="/#features" className="upgrade-btn">Upgrade Plan</Link>
                                    )}
                                </div>
                            )}

                            {userTier === 'pro' && (
                                <div className="upsell-content">
                                    <h4>Go Super Pro</h4>
                                    <div className="upsell-features">
                                        <div className="upsell-feature">🎨 Mockup Generation</div>
                                        <div className="upsell-feature">⚡ Batch Scanning</div>
                                        <div className="upsell-feature">🖌️ Figma Export</div>
                                        <div className="upsell-feature">🏢 Branding Recommendations</div>
                                    </div>
                                    {isHome ? (
                                        <a href="#features" className="upgrade-btn">Upgrade Plan</a>
                                    ) : (
                                        <Link to="/#features" className="upgrade-btn">Upgrade Plan</Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>



                )
            }

            {/* --- MODALS (Moved outside FadeIn to avoid stacking context issues) --- */}
            {
                showBrandingModal && (
                    <div className="modal-overlay" onClick={() => setShowBrandingModal(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h3>Brand Identity Kit</h3>
                            <p>AI-Recommended Palette based on your site:</p>

                            {paletteCopyFeedback && (
                                <div className="palette-feedback-message">
                                    {paletteCopyFeedback}
                                </div>
                            )}

                            <div className="brand-palette-grid">
                                <div className="palette-swatch" onClick={() => handleCopyColor('#2563EB')} style={{ background: '#2563EB' }}><span>Primary</span></div>
                                <div className="palette-swatch" onClick={() => handleCopyColor('#1E40AF')} style={{ background: '#1E40AF' }}><span>Secondary</span></div>
                                <div className="palette-swatch" onClick={() => handleCopyColor('#F3F4F6')} style={{ background: '#F3F4F6' }}><span>Surface</span></div>
                                <div className="palette-swatch" onClick={() => handleCopyColor('#111827')} style={{ background: '#111827' }}><span>Text</span></div>
                            </div>
                            <p style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.9rem' }}>Font Pair: <strong>Inter / Work Sans</strong></p>
                            <button className="scan-btn" onClick={() => setShowBrandingModal(false)} style={{ marginTop: '2rem', width: '100%' }}>Close</button>
                        </div>
                    </div>
                )
            }

            {
                showMockupModal && (
                    <div className="modal-overlay" onClick={() => setShowMockupModal(false)}>
                        <div className="modal-content large" onClick={e => e.stopPropagation()}>
                            <h3>Device Mockup Generator</h3>
                            <div className="mockup-frame">
                                <div className="mockup-screen">
                                    <iframe title="preview" src={url} className="mockup-iframe" />
                                </div>
                            </div>
                            <button className="scan-btn" onClick={() => setShowMockupModal(false)} style={{ marginTop: '1rem', width: '100%' }}>Download Mockup (PNG)</button>
                        </div>
                    </div>
                )
            }



            {/* Rewrite Modal */}
            {
                showRewriteModal && (
                    <div className="modal-overlay" onClick={() => setShowRewriteModal(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h3>Bio Polish ✍️</h3>
                            <p>Refine your "About Me" or project descriptions instantly.</p>

                            <div className="rewrite-container">
                                <textarea
                                    className="rewrite-input"
                                    placeholder="Paste your bio here (e.g., 'I am a designer who likes making cool stuff...')"
                                    value={rewriteInput}
                                    onChange={(e) => setRewriteInput(e.target.value)}
                                />

                                <div className="rewrite-controls">
                                    <label>Tone:</label>
                                    <select value={rewriteTone} onChange={(e) => setRewriteTone(e.target.value)}>
                                        <option value="professional">Professional</option>
                                        <option value="creative">Creative</option>
                                        <option value="minimal">Minimal</option>
                                    </select>
                                </div>

                                <button
                                    className="scan-btn"
                                    onClick={handleRewrite}
                                    disabled={isRewriting || !rewriteInput.trim()}
                                    style={{ width: '100%', marginTop: '1rem' }}
                                >
                                    {isRewriting ? 'Polishing...' : '✨ Rewrite with AI'}
                                </button>

                                {rewriteResult && (
                                    <div className="rewrite-result-box">
                                        <div className="result-label">Polished Version:</div>
                                        <p>{rewriteResult}</p>
                                        <button
                                            className="copy-mini-btn"
                                            onClick={() => {
                                                navigator.clipboard.writeText(rewriteResult);
                                                setToolMessage({ type: 'success', text: 'Copied to clipboard!' });
                                                setTimeout(() => setToolMessage(null), 2000);
                                            }}
                                        >
                                            Copy
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button className="close-text-btn" onClick={() => setShowRewriteModal(false)}>Close</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ScanPage;
