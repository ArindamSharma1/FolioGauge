import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Toast.css';

const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto close after 3s

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast-container">
            <motion.div
                className="toast-box"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <div className="toast-icon">✓</div>
                <span>{message}</span>
            </motion.div>
        </div>
    );
};

export default Toast;
