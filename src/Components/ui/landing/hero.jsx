import React from "react";
import "./hero.css";
import FloatingParticles from "./FloatingParticles.jsx";
import FadeIn from "../FadeIn.jsx";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <>
            <FloatingParticles />

            <div className="hero-text-main" id="home">
                <FadeIn delay={0.1}><h1 className="hero-text">A Smarter</h1></FadeIn>
                <FadeIn delay={0.2}><h1 className="hero-text">Way to </h1></FadeIn>
                <FadeIn delay={0.3}><h1 className="hero-text">Review Your</h1></FadeIn>
                <FadeIn delay={0.4}><h1 className="hero-text">Portfolio</h1></FadeIn>

                {/* SCAN NOW BUTTON */}
                <FadeIn delay={0.6}>
                    <Link to="/scan" className="learn-more">
                        <span className="circle" aria-hidden="true">
                            <span className="icon arrow"></span>
                        </span>
                        <span className="button-text">Scan Now</span>
                    </Link>
                </FadeIn>


            </div>

            <div className="vector-main">
                <FadeIn delay={0.8} direction="left">
                    <img src="/search-engine.svg" alt="vector-main" />
                </FadeIn>
            </div>
            {/* <div className="vector-main-2">
                <img src="/vector-main.svg" alt="vector-main-2" />
            </div> */}


        </>
    );
}

export default Hero;
