import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { supabase } from '../../../supabaseClient';

const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isActive, setIsActive] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [session, setSession] = useState(null);
    const lastScrollY = React.useRef(0);

    useEffect(() => {
        if (supabase && supabase.auth) {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session);
            });

            const {
                data: { subscription },
            } = supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session);
            });

            return () => subscription?.unsubscribe();
        }
    }, []);

    const handleLogout = async () => {
        if (supabase && supabase.auth) {
            await supabase.auth.signOut();
            window.location.href = "/";
        }
    };

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    const closeMenu = () => {
        setIsActive(false);
    };

    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'initial';
        }
    }, [isActive]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 80 && !isActive) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isActive]);

    return (
        <header className={`hud-header ${showNavbar ? '' : 'hidden'}`} id="header">
            {/* Top Micro-Telemetry Strip */}
            <div className="hud-topbar">
                <div className="hud-container topbar-inner">
                    <div className="telemetry-group">
                        <span className="telemetry-item"><span className="status-dot online"></span> SYS_STATUS: ONLINE</span>
                        <span className="telemetry-item hide-mobile">ENGINE: NEURAL_V2.4</span>
                        <span className="telemetry-item hide-mobile">NODE: US-EAST-1</span>
                    </div>
                    <div className="telemetry-group right">
                        <span className="telemetry-item">SEC_LEVEL: 256_BIT</span>
                        {session ? (
                            <button onClick={handleLogout} className="topbar-action-btn">SYS_LOGOUT</button>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Main Command Navigation Bar */}
            <nav className="hud-navbar hud-container">
                <Link to="/" className="hud-brand" onClick={closeMenu}>
                    <div className="brand-logo-box">
                        <span className="brand-symbol">∆</span>
                    </div>
                    <div className="brand-text-box">
                        <span className="brand-title">F O L I O G A U G E</span>
                        <span className="brand-subtitle">PORTFOLIO OBSERVABILITY // AI</span>
                    </div>
                </Link>

                <div className={`hud-menu ${isActive ? 'is-active' : ''}`} id="menu">
                    <div className="mobile-hud-header hide-desktop">
                        <span className="terminal-badge">SYS_CONSOLE // NAV</span>
                    </div>

                    <ul className="hud-menu-inner">
                        <li className="hud-menu-item">
                            {isHome ? (
                                <a href="#home" className="hud-link" onClick={(e) => {
                                    e.preventDefault();
                                    closeMenu();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>
                                    <span className="hud-link-prefix">//</span>
                                    <span className="hud-link-text">HOME</span>
                                </a>
                            ) : (
                                <Link to="/" className="hud-link" onClick={() => { closeMenu(); window.scrollTo(0, 0); }}>
                                    <span className="hud-link-prefix">//</span>
                                    <span className="hud-link-text">HOME</span>
                                </Link>
                            )}
                        </li>

                        <li className="hud-menu-item">
                            {isHome ? (
                                <a href="#all-features" className="hud-link" onClick={closeMenu}>
                                    <span className="hud-link-prefix">//</span>
                                    <span className="hud-link-text">SPECS</span>
                                </a>
                            ) : (
                                <Link to="/#all-features" className="hud-link" onClick={closeMenu}>
                                    <span className="hud-link-prefix">//</span>
                                    <span className="hud-link-text">SPECS</span>
                                </Link>
                            )}
                        </li>

                        <li className="hud-menu-item">
                            {isHome ? (
                                <a href="#pricing" className="hud-link" onClick={closeMenu}>
                                    <span className="hud-link-prefix">//</span>
                                    <span className="hud-link-text">PRICING</span>
                                </a>
                            ) : (
                                <Link to="/#pricing" className="hud-link" onClick={closeMenu}>
                                    <span className="hud-link-prefix">//</span>
                                    <span className="hud-link-text">PRICING</span>
                                </Link>
                            )}
                        </li>

                        <li className="hud-menu-item">
                            {isHome ? (
                                <a href="#tf" className="hud-link" onClick={closeMenu}>
                                    <span className="hud-link-prefix">//</span>
                                    <span className="hud-link-text">LOGS</span>
                                </a>
                            ) : (
                                <Link to="/#tf" className="hud-link" onClick={closeMenu}>
                                    <span className="hud-link-prefix">//</span>
                                    <span className="hud-link-text">LOGS</span>
                                </Link>
                            )}
                        </li>

                        <li className="hud-menu-item">
                            {session ? (
                                <Link to="/profile" className="hud-link" onClick={closeMenu}>
                                    <span className="hud-link-prefix">//</span>
                                    <span className="hud-link-text">ACCOUNT</span>
                                </Link>
                            ) : (
                                <Link to="/login" className="hud-link" onClick={closeMenu}>
                                    <span className="hud-link-prefix">//</span>
                                    <span className="hud-link-text">OPERATOR_LOGIN</span>
                                </Link>
                            )}
                        </li>

                        {/* CTA Console Button in Menu for Mobile */}
                        <li className="hud-menu-item hide-desktop">
                            <Link to="/scan" className="hud-console-btn" onClick={closeMenu}>
                                <span>[ LAUNCH SCAN CONSOLE &gt;&gt; ]</span>
                            </Link>
                        </li>
                    </ul>

                    {isActive && (
                        <div className="mobile-hud-footer hide-desktop">
                            <span className="mono-font" style={{ fontSize: '0.7rem', color: '#64748b' }}>
                                STATUS: ALL SYSTEMS NOMINAL
                            </span>
                        </div>
                    )}
                </div>

                <div className="hud-actions">
                    <Link to="/scan" className="hud-console-btn hide-mobile">
                        <span>[ LAUNCH SCAN CONSOLE &gt;&gt; ]</span>
                    </Link>

                    <button
                        type="button"
                        className={`hud-burger ${isActive ? 'is-active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        <span className="burger-line"></span>
                        <span className="burger-line"></span>
                        <span className="burger-line"></span>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
