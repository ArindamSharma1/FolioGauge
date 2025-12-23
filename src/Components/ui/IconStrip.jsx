import React from 'react';
import { motion } from 'framer-motion';
import './IconStrip.css';

const baseIcons = [
    // Icon-Figma
    (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" /><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" /></svg>,
    // Icon-Gemini
    (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
    // Icon-ChatGPT
    (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z" /><path d="M12 12a10 10 0 0 1-10 10V12h10z" /><path d="M12 12a10 10 0 0 0 10-10v10H12z" /><path d="M12 12a10 10 0 0 1-10-10h10v10z" /></svg>, // Simplified geometric representation
    // Icon-Code
    (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    // Icon-React
    (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 21.7C17.3 21.7 21.7 17.3 21.7 12S17.3 2.3 12 2.3 2.3 6.7 2.3 12 6.7 21.7 12 21.7z" transform="rotate(-45 12 12)" /><path d="M12 21.7C17.3 21.7 21.7 17.3 21.7 12S17.3 2.3 12 2.3 2.3 6.7 2.3 12 6.7 21.7 12 21.7z" transform="rotate(45 12 12)" /></svg>,
    // Layers
    (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
];

// Repeat icons to fill the width (more repetitions for full coverage)
const icons = [...baseIcons, ...baseIcons, ...baseIcons, ...baseIcons, ...baseIcons];

const IconStrip = () => {
    return (
        <motion.div
            className="icon-strip-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="icon-strip">
                {icons.map((Icon, index) => (
                    <div
                        key={index}
                        className="icon-circle"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <Icon className="icon-svg" />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default IconStrip;
