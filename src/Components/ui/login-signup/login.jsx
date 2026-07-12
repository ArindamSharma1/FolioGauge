import React, { useState } from 'react';
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "../../../supabaseClient";
import { Helmet } from 'react-helmet-async';

export default function LoginBox() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        const email = e.target.email.value;
        const password = e.target.password.value;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) setError(error.message);
        else window.location.href = "/scan";
    };

    const handleGoogleLogin = async () => {
        setError(null);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) setError(error.message);
    };

    return (
        <div className="bg-container">
            <Helmet>
                <title>Login | FolioGauge</title>
                <meta name="description" content="Log in to FolioGauge to access your portfolio analytics and insights." />
            </Helmet>
            {/* Watermark Logo */}
            <svg className="watermark-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="login-wrapper">
                <div className="login-header">
                    <h1>Operator Authorization</h1>
                    <p>Enter your credentials to access the telemetry network.</p>
                    <p className="tagline">Encrypted Protocol Session • Security Level 4</p>
                </div>

                <div className="form-box">
                    <form className="form" onSubmit={handleLogin}>
                        <div className="form-container">
                            <input name="email" type="email" className="input" placeholder="Operator Email Address" required />
                            <div className="password-input-wrapper" style={{ position: 'relative' }}>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="input"
                                    placeholder="Security Key / Password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#38bdf8',
                                        padding: 0,
                                        height: 'auto',
                                        boxShadow: 'none',
                                        marginTop: 0,
                                        fontFamily: 'JetBrains Mono',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div style={{ color: '#ef4444', marginBottom: '0.5rem', fontSize: '0.85rem', textAlign: 'left', fontFamily: 'JetBrains Mono' }}>
                                {error}
                            </div>
                        )}

                        <button type="submit">Initialize Session</button>

                        <div className="divider">OR AUTHENTICATE VIA PROTOCOL</div>

                        <button type="button" className="google-btn" onClick={handleGoogleLogin}>
                            <svg className="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                                <path fill="none" d="M0 0h48v48H0z" />
                            </svg>
                            Google OAuth 2.0
                        </button>

                        <div className="form-section">
                            No active clearance?
                            <Link to="/signup"> Register Clearance</Link>
                        </div>
                    </form>
                </div>

                {/* Trust Strip */}
                <div className="trust-strip">
                    <div className="trust-item">
                        <span className="trust-icon">🔒</span> Encrypted Auth Layer
                    </div>
                    <div className="trust-item">
                        <span className="trust-icon">⚡</span> Zero-Latency Telemetry
                    </div>
                    <div className="trust-item">
                        <span className="trust-icon">🛡️</span> SHA-256 Protocol Security
                    </div>
                </div>

                {/* Social Proof */}
                <div className="social-proof">
                    <p>Engineered for elite developers & designers optimizing technical portfolios.</p>
                </div>

                {/* Footer Micro-text */}
                <div className="auth-footer-text">
                    Trusted by creators • Built with privacy in mind
                </div>
            </div>
        </div>
    );
}
