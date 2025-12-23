import React from "react";
import { motion } from "framer-motion";

const TypewriterText = ({ text, delay = 0, className = "", onComplete }) => {
    const characters = text.split("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: delay,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
        },
    };

    return (
        <motion.span
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={childVariants}
                    onAnimationComplete={() => {
                        if (index === characters.length - 1 && onComplete) {
                            onComplete();
                        }
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default TypewriterText;
