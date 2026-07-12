import React, { useEffect, useState, useRef } from "react";
import "./Loader.css";

const Loader = ({ onLoaded }) => {
    const [isFading, setIsFading] = useState(false);
    const onLoadedRef = useRef(onLoaded);

    useEffect(() => {
        onLoadedRef.current = onLoaded;
    }, [onLoaded]);

    useEffect(() => {
        // Start fading out quickly (600ms) for crisp cyberpunk boot feel
        const timer = setTimeout(() => {
            setIsFading(true);
        }, 600);

        // Notify parent that loading is completely done after transition (400ms fade)
        const cleanupTimer = setTimeout(() => {
            if (onLoadedRef.current) onLoadedRef.current();
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearTimeout(cleanupTimer);
        };
    }, []); // Empty dependency array ensures timer NEVER resets on parent re-renders

    return (
        <div className={`loader-container ${isFading ? "fade-out" : ""}`}>
            <div className="loader-content font-mono">
                <div className="loader-logo-wrapper">
                    <span className="loader-symbol">∆</span>
                    <div className="loader-ring"></div>
                </div>
                <div className="loader-text-status">
                    <span>INITIALIZING OBSERVABILITY ENGINE...</span>
                    <div className="loader-bar-bg">
                        <div className="loader-bar-fill"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;

