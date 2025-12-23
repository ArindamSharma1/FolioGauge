import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import FadeIn from '../ui/FadeIn';
import { Helmet } from 'react-helmet-async';
import './ProfilePage.css';

import ScoreHistoryChart from '../ui/charts/ScoreHistoryChart';
import CategoryRadarChart from '../ui/charts/CategoryRadarChart';

import ScanHistoryTable from '../ui/dashboard/ScanHistoryTable';
import ScanDetailModal from '../ui/dashboard/ScanDetailModal';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [usageStats, setUsageStats] = useState(null);
    const [scanHistory, setScanHistory] = useState([]);

    // New state for modal
    const [selectedScan, setSelectedScan] = useState(null);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate('/login');
                return;
            }

            setUser(user);

            // Fetch usage stats independently to not block UI
            fetchUsageStats();
            fetchScanHistory();

        } catch (error) {
            console.error('Error loading user:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsageStats = async () => {
        try {
            const session = await supabase.auth.getSession();
            const token = session.data.session?.access_token;
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

            if (token) {
                const res = await fetch(`${API_BASE_URL}/user/usage`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const stats = await res.json();
                    setUsageStats(stats);
                } else {
                    console.error("Failed to fetch usage:", await res.text());
                }
            }
        } catch (err) {
            console.error("Error fetching usage stats:", err);
        }
    };

    const fetchScanHistory = async () => {
        try {
            const session = await supabase.auth.getSession();
            const token = session.data.session?.access_token;

            if (token) {
                // Ensure API_BASE_URL is defined if this function runs independently, 
                // though typical React scope would capture it if defined at component level.
                // Safest to redefine or move constant to top level if reused.
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

                const res = await fetch(`${API_BASE_URL}/user/history`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const history = await res.json();
                    setScanHistory(history);
                } else {
                    console.error("Failed to fetch history:", await res.text());
                }
            }
        } catch (err) {
            console.error("Error fetching scan history:", err);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            setMessageType('error');
            return;
        }

        if (newPassword.length < 6) {
            setMessage("Password must be at least 6 characters");
            setMessageType('error');
            return;
        }

        try {
            setLoading(true);
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            setMessage("Password updated successfully");
            setMessageType('success');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setMessage(error.message);
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);

            // Call the secure RPC function to delete the user from auth.users
            // This will cascade delete their profile and data.
            const { error } = await supabase.rpc('delete_account');

            if (error) throw error;

            // Sign out to clear local session
            await supabase.auth.signOut();
            navigate('/');
        } catch (error) {
            console.error('Error deleting account:', error.message);
            setMessage("Failed to delete account completely. Please try again.");
            setMessageType('error');
            setShowDeleteModal(false);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (isoString) => {
        if (!isoString) return 'N/A';
        return new Date(isoString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    if (loading && !user) {
        return <div className="profile-container">Loading...</div>;
    }

    const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'User';

    return (
        <FadeIn>
            <Helmet>
                <title>My Profile | FolioGauge</title>
                <meta name="description" content="Manage your FolioGauge account, view scan history, and track your portfolio improvement." />
            </Helmet>
            <div className="profile-page-wrapper">
                <div className="profile-container">
                    <div className="profile-card">

                        {/* ... (Header and Content remain same) ... */}
                        <div className="profile-header-compact">
                            <div className="header-text">
                                <h1>Profile Settings</h1>
                                <p className="greeting-text">You’re all set, {firstName} 👋</p>
                            </div>
                            {usageStats && (
                                <div className={`tier-badge ${usageStats.tier}`}>
                                    {usageStats.tier.replace('_', ' ')}
                                </div>
                            )}
                        </div>

                        {message && (
                            <div className={`message ${messageType}`}>
                                {message}
                            </div>
                        )}

                        <div className="profile-content-row">
                            {/* Left Sidebar: Settings */}
                            <div className="settings-column">
                                <div className="section-block">
                                    <h3 className="section-title">Personal Info</h3>
                                    <div className="info-group">
                                        <label>Full Name</label>
                                        <div className="info-value">{user?.user_metadata?.full_name || 'N/A'}</div>
                                    </div>
                                    <div className="info-group">
                                        <label>Email Address</label>
                                        <div className="info-value">{user?.email}</div>
                                    </div>
                                </div>

                                {usageStats && (
                                    <div className="prob-card usage-card">
                                        <div className="usage-header">
                                            <h3>Current Plan</h3>
                                            <span className="limit-label">{usageStats.used} / {usageStats.limit} Scans Used</span>
                                        </div>
                                        <div className="progress-bar-container">
                                            <div
                                                className="progress-bar-fill"
                                                style={{ width: `${Math.min((usageStats.used / usageStats.limit) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                        <p className="usage-sub">Resets daily. Upgrade for more.</p>
                                    </div>
                                )}

                                <div className="section-block security-block">
                                    <h3 className="section-title">Security & Login</h3>
                                    <div className="security-row">
                                        <div className="sec-item">
                                            <label>Provider</label>
                                            <span>{user?.app_metadata?.provider || 'Email'}</span>
                                        </div>
                                        <div className="sec-item">
                                            <label>Last Login</label>
                                            <span>{formatDate(user?.last_sign_in_at)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="section-block password-block">
                                    <h3 className="section-title">Update Password</h3>
                                    <form onSubmit={handlePasswordUpdate}>
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="profile-input"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Confirm New Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="profile-input"
                                        />
                                        <button
                                            type="submit"
                                            className="action-btn update-btn"
                                            disabled={loading || !newPassword}
                                        >
                                            {loading ? 'Updating...' : 'Update Password'}
                                        </button>
                                    </form>
                                </div>

                                <button onClick={handleLogout} className="action-btn logout-btn">
                                    Sign Out
                                </button>
                                <button onClick={handleDeleteAccount} className="action-btn delete-btn">
                                    Delete Account
                                </button>
                            </div>

                            {/* Right Content: Analytics & Table */}
                            <div className="analytics-column">
                                {scanHistory.length > 0 ? (
                                    <div className="analytics-section-inner">
                                        <h3 className="section-title">Visual Analytics Dashboard</h3>
                                        <div className="charts-grid">
                                            <div className="chart-card">
                                                <h4>Score History</h4>
                                                <ScoreHistoryChart data={scanHistory} />
                                            </div>
                                            <div className="chart-card">
                                                <h4>Latest Scan Breakdown ({formatDate(scanHistory[0].created_at)})</h4>
                                                <CategoryRadarChart scan={scanHistory[0]} />
                                            </div>
                                        </div>

                                        {/* NEW: Scan History Table */}
                                        <ScanHistoryTable
                                            history={scanHistory}
                                            onView={(scan) => setSelectedScan(scan)}
                                        />
                                    </div>
                                ) : (
                                    <div className="no-data-placeholder">
                                        <h3>No Scan History Yet</h3>
                                        <p>Run your first scan to see analytics here.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Modal for viewing scan details */}
                <ScanDetailModal
                    scan={selectedScan}
                    onClose={() => setSelectedScan(null)}
                />

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}>
                        <div className="delete-modal-content" onClick={e => e.stopPropagation()}>
                            <div className="delete-modal-icon">⚠️</div>
                            <h3>Delete Account?</h3>
                            <p>This action cannot be undone. All your data including scan history will be permanently removed.</p>
                            <div className="delete-modal-actions">
                                <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                <button className="confirm-delete-btn" onClick={confirmDelete} disabled={loading}>
                                    {loading ? 'Deleting...' : 'Delete Permanently'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </FadeIn>
    );
};

export default ProfilePage;
