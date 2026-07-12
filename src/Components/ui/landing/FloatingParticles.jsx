import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function FloatingParticles() {
    const [init, setInit] = useState(false);
    const [gpuSafe, setGpuSafe] = useState(true);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // THIS is the required loader, ise mat chedna 
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        }).catch((err) => {
            console.warn("TSParticles engine initialization skipped due to GPU/WebGL context:", err);
            setGpuSafe(false);
        });

        const handleContextLost = (e) => {
            e.preventDefault();
            console.warn("WebGL context lost detected on window. Unmounting TSParticles to protect browser stability.");
            setGpuSafe(false);
        };

        window.addEventListener("webglcontextlost", handleContextLost);
        return () => window.removeEventListener("webglcontextlost", handleContextLost);
    }, []);

    const options = useMemo(
        () => ({
            background: {
                color: "transparent",
            },
            fullScreen: {
                enable: false,
                zIndex: -1, // behind hero, ise bhe mat chedna
            },
            detectRetina: false,
            fpsLimit: 60,
            particles: {
                number: {
                    value: 12, // Reduced density for ultra-low GPU footprint and zero crash risk
                    density: { enable: true, area: 1000 },
                },
                color: {
                    value: "#60A5FA",
                },
                opacity: {
                    value: 0.6,
                    random: { enable: true, minimumValue: 0.2 },
                },
                size: {
                    value: { min: 1, max: 2 },
                },
                move: {
                    enable: true,
                    speed: 0.4,
                    direction: "none",
                    outModes: "out",
                },
                links: {
                    enable: false,
                },
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: false,
                    },
                },
            },
        }),
        []
    );

    if (init && gpuSafe) {
        return <Particles id="tsparticles" options={options} />;
    }

    return null;
}

export default React.memo(FloatingParticles);


