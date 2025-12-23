import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand-message">
                        <h3>Defy limits</h3>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Product</h4>
                            <ul>
                                <li><a href="#getstarted">Get Started</a></li>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/faq">FAQ</Link></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>Resources</h4>
                            <ul>
                                <li><Link to="/faq">Help</Link></li>
                                <li><a href="#features">Pricing</a></li>
                                <li><Link to="/faq#use-cases">Use Cases</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-middle">
                    <h1 className="footer-big-text">FolioGauge</h1>
                </div>

                <div className="footer-bottom">
                    <div className="footer-logo">
                        <span>FolioGauge</span>
                    </div>
                    <div className="footer-legal">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/refund">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
