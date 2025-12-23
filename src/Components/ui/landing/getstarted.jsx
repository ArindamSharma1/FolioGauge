import React from "react";
import { Link } from "react-router-dom";
import "./getstarted.css";
import FadeIn from "../FadeIn.jsx";

function GetStarted() {
    return (
        <div className="getstarted" id="getstarted">

            {/* LEFT SIDE */}
            <FadeIn direction="right" amount={0.3} className="image-side">
                <img src="/br-1-nobg.png" alt="" loading="lazy" />
            </FadeIn>

            {/* RIGHT SIDE */}
            <FadeIn direction="left" amount={0.3} className="content-side">
                <h1>Get Started</h1>
                <p>
                    Get started with FolioGauge to automatically analyze <br /> your portfolio across design, UX, structure, and content. <br />
                    Receive clear scores, actionable AI feedback, and <br /> improvement insights tailored to industry standards. <br />
                    Build a stronger, more confident portfolio <br />without guessing what recruiters expect.
                </p>

                <Link to="/scan">
                    <button>
                        <span>Get Started</span>
                    </button>
                </Link>
            </FadeIn>
        </div>
    );
}

export default GetStarted;
