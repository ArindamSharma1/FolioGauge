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
    const isActiveRef = React.useRef(isActive);

    useEffect(() => {
        isActiveRef.current = isActive;
    }, [isActive]);

    useEffect(() => {
        if (supabase) {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session);
            });

            const {
                data: { subscription },
            } = supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session);
            });

            return () => subscription.unsubscribe();
        }
    }, []);

    const handleLogout = async () => {
        if (supabase) {
            await supabase.auth.signOut();
            window.location.href = "/"; // Force redirect to home
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

            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }

            lastScrollY.current = currentScrollY;

            if (isActiveRef.current) {
                closeMenu();
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`header ${showNavbar ? '' : 'hidden'}`} id="header">
            <nav className="navbar container">
                <img className="brand" src="/logo-nobg.svg" alt="brand" />
                <div className={`menu ${isActive ? 'is-active' : ''}`} id="menu">
                    <ul className="menu-inner">
                        <li className="menu-item">
                            {isHome ? (
                                <a href="#" className="menu-link" onClick={(e) => {
                                    e.preventDefault();
                                    closeMenu();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>
                                    <span className="link-text-wrapper">
                                        <span className="link-text">HOME</span>
                                        <span className="link-text">HOME</span>
                                    </span>
                                </a>
                            ) : (
                                <Link to="/" className="menu-link" onClick={() => { closeMenu(); window.scrollTo(0, 0); }}>
                                    <span className="link-text-wrapper">
                                        <span className="link-text">HOME</span>
                                        <span className="link-text">HOME</span>
                                    </span>
                                </Link>
                            )}
                        </li>
                        <li className="menu-item">
                            {session ? (
                                <Link to="/profile" className="menu-link" onClick={closeMenu}>
                                    <span className="link-text-wrapper">
                                        <span className="link-text">ACCOUNT</span>
                                        <span className="link-text">ACCOUNT</span>
                                    </span>
                                </Link>
                            ) : (
                                <Link to="/signup" className="menu-link" onClick={closeMenu}>
                                    <span className="link-text-wrapper">
                                        <span className="link-text">SIGN IN</span>
                                        <span className="link-text">SIGN IN</span>
                                    </span>
                                </Link>
                            )}
                        </li>
                        <li className="menu-item">
                            {isHome ? (
                                <a href="#pricing" className="menu-link" onClick={closeMenu}>
                                    <span className="link-text-wrapper">
                                        <span className="link-text">PRICING</span>
                                        <span className="link-text">PRICING</span>
                                    </span>
                                </a>
                            ) : (
                                <Link to="/#pricing" className="menu-link" onClick={closeMenu}>
                                    <span className="link-text-wrapper">
                                        <span className="link-text">PRICING</span>
                                        <span className="link-text">PRICING</span>
                                    </span>
                                </Link>
                            )}
                        </li>
                        <li className="menu-item">
                            {isHome ? (
                                <a href="#tf" className="menu-link" onClick={closeMenu}>
                                    <span className="link-text-wrapper">
                                        <span className="link-text">ABOUT US</span>
                                        <span className="link-text">ABOUT US</span>
                                    </span>
                                </a>
                            ) : (
                                <Link to="/#tf" className="menu-link" onClick={closeMenu}>
                                    <span className="link-text-wrapper">
                                        <span className="link-text">ABOUT US</span>
                                        <span className="link-text">ABOUT US</span>
                                    </span>
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="menu-block">
                    <button
                        type="button"
                        className={`burger ${isActive ? 'is-active' : ''}`}
                        id="burger"
                        onClick={toggleMenu}
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
