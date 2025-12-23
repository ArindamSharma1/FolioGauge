import React from "react";
import "./allfeatures.css";
import FadeIn from "../FadeIn.jsx";

const CheckIcon = () => (
    <svg className="icon-check" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const CrossIcon = () => (
    <svg className="icon-cross" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const AllFeatures = () => {
    return (
        <section id="all-features" className="all-features-section">
            <FadeIn amount={0.3}>
                <div className="all-features-container">
                    <h2 className="all-features-title">All Features</h2>

                    <div className="features-table-wrapper">
                        <table className="features-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th>
                                        <span className="table-header-plan">Standard</span>
                                        <span className="table-header-price">Free</span>
                                    </th>
                                    <th>
                                        <span className="table-header-plan">Pro</span>
                                        <span className="table-header-price">$15/mo</span>
                                    </th>
                                    <th>
                                        <span className="table-header-plan">Super Pro</span>
                                        <span className="table-header-price">$50/mo</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Core Scanning */}
                                <tr className="category-row">
                                    <td colSpan="4">Core Scanning</td>
                                </tr>
                                <tr>
                                    <td>Scans Per Day</td>
                                    <td>3</td>
                                    <td>5</td>
                                    <td>Unlimited</td>
                                </tr>
                                <tr>
                                    <td>Page Upload Limit</td>
                                    <td>10 Pages</td>
                                    <td>50 Pages</td>
                                    <td>Unlimited</td>
                                </tr>
                                <tr>
                                    <td>Mobile Responsiveness Check</td>
                                    <td><CheckIcon /></td>
                                    <td><CheckIcon /></td>
                                    <td><CheckIcon /></td>
                                </tr>

                                {/* Analysis Depth */}
                                <tr className="category-row">
                                    <td colSpan="4">Analysis Depth</td>
                                </tr>
                                <tr>
                                    <td>AI Scoring Engine</td>
                                    <td>Basic</td>
                                    <td>Enhanced</td>
                                    <td>Priority</td>
                                </tr>
                                <tr>
                                    <td>SEO & Accessibility Audit</td>
                                    <td>Basic</td>
                                    <td>Advanced</td>
                                    <td>Deep Dive</td>
                                </tr>
                                <tr>
                                    <td>AI Suggestions</td>
                                    <td>Limited</td>
                                    <td>Advanced</td>
                                    <td>Expert</td>
                                </tr>

                                {/* AI Context (Personas) */}
                                <tr className="category-row">
                                    <td colSpan="4">AI Perspectives (Personas)</td>
                                </tr>
                                <tr>
                                    <td>Recruiter Persona</td>
                                    <td><CheckIcon /></td>
                                    <td><CheckIcon /></td>
                                    <td><CheckIcon /></td>
                                </tr>
                                <tr>
                                    <td>Design Lead Persona</td>
                                    <td><CrossIcon /></td>
                                    <td><CrossIcon /></td>
                                    <td><CheckIcon /></td>
                                </tr>
                                <tr>
                                    <td>Client Persona</td>
                                    <td><CrossIcon /></td>
                                    <td><CrossIcon /></td>
                                    <td><CheckIcon /></td>
                                </tr>

                                {/* Benchmarking */}
                                <tr className="category-row">
                                    <td colSpan="4">Benchmarking</td>
                                </tr>
                                <tr>
                                    <td>Industry Ranking</td>
                                    <td><CrossIcon /></td>
                                    <td><CheckIcon /></td>
                                    <td><CheckIcon /></td>
                                </tr>
                                <tr>
                                    <td>Behance Comparison</td>
                                    <td><CrossIcon /></td>
                                    <td><CrossIcon /></td>
                                    <td><CheckIcon /></td>
                                </tr>

                                {/* Export & Tools */}
                                <tr className="category-row">
                                    <td colSpan="4">Tools & Export</td>
                                </tr>
                                <tr>
                                    <td>PDF Export</td>
                                    <td><CrossIcon /></td>
                                    <td>Text Only</td>
                                    <td>Full PDF</td>
                                </tr>
                                <tr>
                                    <td>Figma Export</td>
                                    <td><CrossIcon /></td>
                                    <td><CrossIcon /></td>
                                    <td><CheckIcon /></td>
                                </tr>
                                <tr>
                                    <td>Branding Recommendations</td>
                                    <td><CrossIcon /></td>
                                    <td><CrossIcon /></td>
                                    <td><CheckIcon /></td>
                                </tr>
                                <tr>
                                    <td>Mockup Generation</td>
                                    <td><CrossIcon /></td>
                                    <td><CrossIcon /></td>
                                    <td><CheckIcon /></td>
                                </tr>
                                <tr>
                                    <td>Bio Polish (AI Rewrite)</td>
                                    <td><CrossIcon /></td>
                                    <td><CheckIcon /></td>
                                    <td><CheckIcon /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </FadeIn>
        </section>
    );
};

export default AllFeatures;
