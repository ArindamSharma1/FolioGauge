import React, { useState } from 'react';
import './ScanHistoryTable.css';
import { motion } from 'framer-motion';

export default function ScanHistoryTable({ history, onView }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(history.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = history.slice(startIndex, startIndex + itemsPerPage);

    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="history-table-container">
            <div className="table-header">
                <h3>History</h3>
                <span className="count-label">{history.length} Scans</span>
            </div>

            <div className="table-responsive">
                <table className="scan-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Website</th>
                            <th>Persona</th>
                            <th>Score</th>
                            <th className="action-col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((scan) => (
                            <motion.tr
                                key={scan.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                            >
                                <td className="date-cell">{formatDate(scan.created_at)}</td>
                                <td className="url-cell" title={scan.url}>{scan.url}</td>
                                <td className="persona-cell">
                                    <span className="persona-tag">{scan.insights?.persona || 'recruiter'}</span>
                                </td>
                                <td className="score-cell">
                                    <span
                                        className={`score-badge ${scan.score >= 80 ? 'high' :
                                                scan.score >= 50 ? 'med' : 'low'
                                            }`}
                                    >
                                        {scan.score}
                                    </span>
                                </td>
                                <td className="action-cell">
                                    <button onClick={() => onView(scan)} className="view-btn">
                                        View
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
