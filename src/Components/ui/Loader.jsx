import React, { useEffect, useState } from "react";
import "./Loader.css";

const Loader = ({ onLoaded }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Start fading out after 1.5 seconds
        const timer = setTimeout(() => {
            setIsFading(true);
        }, 1500);

        // Notify parent that loading is completely done after fade transition (0.5s)
        const cleanupTimer = setTimeout(() => {
            if (onLoaded) onLoaded();
        }, 2000);

        return () => {
            clearTimeout(timer);
            clearTimeout(cleanupTimer);
        };
    }, [onLoaded]);

    return (
        <div className={`loader-container ${isFading ? "fade-out" : ""}`}>
            <div className="loader-content">
                <img src="/logo-nobg.svg" alt="FolioGauge" className="loader-logo" />
            </div>
        </div>
    );
};

export default Loader;
