import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({ children, delay = 0, className = "", direction = "up", style = {}, amount = 0.3 }) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.8,
                delay: delay,
                ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smooth pop-up
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: amount }}
            variants={variants}
            className={className}
            style={{ ...style, willChange: 'transform, opacity' }}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
