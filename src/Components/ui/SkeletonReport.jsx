import React from 'react';
import '../pages/ScanPage.css'; // We'll add styles there

const SkeletonReport = () => {
    return (
        <div className="skeleton-wrapper">
            {/* Header / Score Area */}
            <div className="skeleton-header">
                <div className="skeleton-text-group">
                    <div className="skeleton-line title"></div>
                    <div className="skeleton-line subtitle"></div>
                </div>
                <div className="skeleton-circle"></div>
            </div>

            {/* Benchmarks Row */}
            <div className="skeleton-row">
                <div className="skeleton-card small"></div>
                <div className="skeleton-card small"></div>
                <div className="skeleton-card small"></div>
            </div>

            {/* Grid Area */}
            <div className="skeleton-grid">
                <div className="skeleton-card large">
                    <div className="skeleton-line header"></div>
                    <div className="skeleton-line text"></div>
                    <div className="skeleton-line text"></div>
                    <div className="skeleton-line text"></div>
                </div>
                <div className="skeleton-card large">
                    <div className="skeleton-line header"></div>
                    <div className="skeleton-line text"></div>
                    <div className="skeleton-line text"></div>
                    <div className="skeleton-line text"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonReport;
