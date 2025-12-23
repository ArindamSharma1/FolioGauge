import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ScanDetailModal.css';

// Reusing charts or UI elements if possible, or building lightweight versions
// For speed, we'll build a clean detailed view here

export default function ScanDetailModal({ scan, onClose }) {
    if (!scan) return null;

    const { insights, suggestions } = scan;

    return (
        <AnimatePresence>
            <motion.div
                className="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="modal-content-dashboard"
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-header">
                        <div>
                            <h2>Scan Report</h2>
                            <a href={scan.url} target="_blank" rel="noopener noreferrer" className="modal-url">
                                {scan.url}
                            </a>
                        </div>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>

                    <div className="modal-body">
                        {/* Top Stats Row */}
                        <div className="stats-row">
                            <div className="stat-card main-score">
                                <span className="label">Overall Score</span>
                                <span className={`value ${scan.score >= 80 ? 'high' : scan.score >= 50 ? 'med' : 'low'}`}>
                                    {scan.score}
                                </span>
                            </div>
                            <div className="stat-card">
                                <span className="label">Persona</span>
                                <span className="value-text">{insights?.persona || 'recruiter'}</span>
                            </div>
                            <div className="stat-card">
                                <span className="label">Date</span>
                                <span className="value-text">
                                    {new Date(scan.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className="modal-scroll-area">
                            {/* Insights Section */}
                            <div className="detail-section">
                                <h3>🔍 AI Analysis</h3>
                                <p className="summary-text">{insights?.summary || "No summary available."}</p>

                                <div className="strengths-weaknesses">
                                    <div className="sw-col">
                                        <h4>Key Strengths</h4>
                                        <ul>
                                            {insights?.strengths?.map((s, i) => <li key={i}>✅ {s}</li>)}
                                        </ul>
                                    </div>
                                    <div className="sw-col">
                                        <h4>Areas for Improvement</h4>
                                        <ul>
                                            {insights?.weaknesses?.map((w, i) => <li key={i}>⚠️ {w}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Suggestions Section */}
                            <div className="detail-section">
                                <h3>💡 Actionable Suggestions</h3>
                                <div className="suggestions-list">
                                    {suggestions && Object.entries(suggestions).map(([key, items]) => (
                                        <div key={key} className="suggestion-group">
                                            <h4 className="suggestion-cat-title">{key.replace(/_/g, ' ')}</h4>
                                            <ul>
                                                {Array.isArray(items) ? items.map((item, idx) => (
                                                    <li key={idx}>{item}</li>
                                                )) : <li>{items}</li>}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
