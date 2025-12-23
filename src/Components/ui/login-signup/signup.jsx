import React, { useState } from 'react';
import "./signup.css";
import { Link } from 'react-router-dom';
import { supabase } from "../../../supabaseClient";
import { Helmet } from 'react-helmet-async';

export default function SignupBox() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Disposable Email Blocklist
    const DISPOSABLE_DOMAINS = [
        'tempmail.com', 'throwawaymail.com', 'mailinator.com', '10minutemail.com',
        'guerrillamail.com', 'yopmail.com', 'getnada.com', 'dispostable.com'
    ];

    const validateEmail = (email) => {
        const domain = email.split('@')[1];
        if (DISPOSABLE_DOMAINS.includes(domain)) {
            setError("Please use a work or personal email provider (Gmail, Yahoo, etc).");
            setLoading(false);
            return false;
        }
        return true;
    };

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!validateEmail(email)) {
            return;
        }

        try {
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: name },
                },
            });

            if (signUpError) {
                throw signUpError;
            }

            setMessage("Check your email to confirm signup!");
        } catch (err) {
            console.error("Signup error:", err);
            setError(err.message || "An error occurred during signup");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setError(null);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) setError(error.message);
    };

    return <div className="bg-container">
        <Helmet>
            <title>Sign Up | FolioGauge</title>
            <meta name="description" content="Create a free FolioGauge account to start optimizing your design portfolio today." />
        </Helmet>
        {/* Watermark Logo */}
        <svg className="watermark-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="signup-wrapper">
            <div className="signup-header">
                <h1>Create account</h1>
                <p>Join the community of top designers.</p>
                <p className="tagline">AI-powered portfolio insights for modern creators</p>
            </div>

            <div className="form-box">
                <form className="form" onSubmit={handleEmailSignup}>
                    <div className="form-container">
                        <input name="name" type="text" className="input" placeholder="Full Name" required />
                        <input name="email" type="email" className="input" placeholder="Email" required />
                        <div className="password-input-wrapper" style={{ position: 'relative' }}>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className="input"
                                placeholder="Password"
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
                                    color: '#9CA3AF',
                                    padding: 0,
                                    height: 'auto',
                                    boxShadow: 'none',
                                    marginTop: 0
                                }}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div style={{ color: '#ef4444', marginBottom: '0.5rem', fontSize: '0.85rem', textAlign: 'left' }}>
                            {error}
                        </div>
                    )}

                    {message && (
                        <div style={{ color: '#4ade80', marginBottom: '0.5rem', fontSize: '0.85rem', textAlign: 'left' }}>
                            {message}
                        </div>
                    )}

                    <button type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    <div className="divider">OR CONTINUE WITH</div>

                    <button type="button" className="google-btn" onClick={handleGoogleSignup}>
                        <svg className="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            <path fill="none" d="M0 0h48v48H0z" />
                        </svg>
                        Google
                    </button>

                    <div className="form-section">
                        Already have an account?
                        <Link to="/login"> Log in</Link>
                    </div>
                </form>
            </div>

            {/* Trust Strip */}
            <div className="trust-strip">
                <div className="trust-item">
                    <span className="trust-icon">🔒</span> Secure authentication via Supabase
                </div>
                <div className="trust-item">
                    <span className="trust-icon">🛡️</span> Passwords are encrypted
                </div>
                <div className="trust-item">
                    <span className="trust-icon">👤</span> No spam. No data selling.
                </div>
            </div>

            {/* Social Proof */}
            <div className="social-proof">
                <p>Used by designers and developers to improve portfolio clarity and hiring impact.</p>
            </div>

            {/* Footer Micro-text */}
            <div className="auth-footer-text">
                Trusted by creators • Built with privacy in mind
            </div>
        </div>
    </div>
}
