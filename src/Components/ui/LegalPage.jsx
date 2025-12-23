import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './LegalPage.css';
import Footer from '../landing/footer';

const LegalPage = ({ type }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    const getContent = () => {
        switch (type) {
            case 'privacy':
                return {
                    title: 'Privacy Policy',
                    updated: 'Last updated: December 23, 2025',
                    content: (
                        <>
                            <p>At FolioGauge, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.</p>

                            <h3>1. Information We Collect</h3>
                            <p>We collect information you provide directly to us when you create an account, specifically your email address and name (via Supabase Auth). We also collect data related to the portfolios you scan to provide our core analytics service.</p>

                            <h3>2. How We Use Your Information</h3>
                            <p>We use your information to:</p>
                            <ul>
                                <li>Provide, maintain, and improve our services.</li>
                                <li>Process transactions and send you related information.</li>
                                <li>Send you technical notices, updates, and support messages.</li>
                            </ul>

                            <h3>3. Data Security</h3>
                            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We use industry-standard authentication (Supabase) to secure your account.</p>

                            <h3>4. Third-Party Services</h3>
                            <p>We may use third-party services (like Vercel for hosting, Supabase for database, and Razorpay for payments) that have their own privacy policies.</p>

                            <h3>5. Contact Us</h3>
                            <p>If you have any questions about this Privacy Policy, please contact us at support@foliogauge.com.</p>
                        </>
                    )
                };
            case 'terms':
                return {
                    title: 'Terms and Conditions',
                    updated: 'Last updated: December 23, 2025',
                    content: (
                        <>
                            <p>Welcome to FolioGauge. By accessing or using our website, you agree to be bound by these Terms and Conditions.</p>

                            <h3>1. Use of Service</h3>
                            <p>FolioGauge provides an AI-powered portfolio analysis tool. You may use our service for lawful purposes only. You agree not to use the service to analyze content that is illegal, harmful, or violates the rights of others.</p>

                            <h3>2. Account Registration</h3>
                            <p>To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

                            <h3>3. Intellectual Property</h3>
                            <p>The content, features, and functionality of FolioGauge are owned by us and are protected by international copyright, trademark, and other intellectual property laws.</p>

                            <h3>4. Limitation of Liability</h3>
                            <p>In no event shall FolioGauge, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>

                            <h3>5. Contact Us</h3>
                            <p>If you have any questions about these Terms, please contact us at support@foliogauge.com.</p>
                        </>
                    )
                };
            case 'refund':
                return {
                    title: 'Refund and Cancellation Policy',
                    updated: 'Last updated: December 23, 2025',
                    content: (
                        <>
                            <p>Thank you for choosing FolioGauge.</p>

                            <h3>1. Digital Products</h3>
                            <p>Since FolioGauge offers non-tangible, irrevocable digital goods (portfolio analysis reports), we generally do not provide refunds after the product is purchased, which you acknowledge prior to purchasing any product on the website.</p>

                            <h3>2. Exceptions</h3>
                            <p>We realize that exceptional circumstances can take place with regard to the character of the product we supply. Therefore, we DO honor requests for the refund on the following reasons:</p>
                            <ul>
                                <li><strong>Non-delivery of the product:</strong> Due to some mailing issues of your e-mail provider or your own mail server you might not receive a delivery e-mail from us.</li>
                                <li><strong>Major defects:</strong> Although all the products are thoroughly tested before release, unexpected errors may occur.</li>
                            </ul>

                            <h3>3. Contact for Refunds</h3>
                            <p>Please contact our support team at support@foliogauge.com for any refund requests. We will review each request on a case-by-case basis and aim to resolve issues amicably.</p>
                        </>
                    )
                };
            default:
                return { title: 'Page Not Found', content: <p>The requested policy page could not be found.</p> };
        }
    };

    const { title, updated, content } = getContent();

    return (
        <>
            <Helmet>
                <title>{title} | FolioGauge</title>
                <meta name="description" content={`Read our ${title} to understand how FolioGauge operates.`} />
            </Helmet>
            <div className="legal-page-wrapper">
                <div className="legal-container">
                    <div className="legal-header">
                        <h1>{title}</h1>
                        <p className="last-updated">{updated}</p>
                    </div>
                    <div className="legal-content">
                        {content}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default LegalPage;
