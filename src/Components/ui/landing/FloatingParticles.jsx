import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function FloatingParticles() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // THIS is the required loader, ise mat chedna 
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
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
            particles: {
                number: {
                    value: 20,
                    density: { enable: true, area: 800 },
                },
                color: {
                    value: "#60A5FA",
                },
                opacity: {
                    value: 0.8,
                    random: { enable: true, minimumValue: 0.3 },
                },
                size: {
                    value: { min: 1, max: 3 },
                },
                move: {
                    enable: true,
                    speed: 0.6,
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

    if (init) {
        return <Particles id="tsparticles" options={options} />;
    }

    return <></>;
}
