import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import './App.css'
import Hero from "./Components/ui/landing/hero.jsx"
import Pricing from "./Components/ui/landing/pricing.jsx"
import AllFeatures from "./Components/ui/landing/AllFeatures.jsx"
import HowItWorks from "./Components/ui/landing/HowItWorks.jsx"
import TF from "./Components/ui/landing/tf.jsx"
import GetInTouch from "./Components/ui/landing/GetInTouch.jsx"
import GetStarted from "./Components/ui/landing/getstarted.jsx"
import WhyUs from "./Components/ui/landing/whyus.jsx"
import Footer from "./Components/ui/landing/footer.jsx"
import FAQ from "./Components/ui/FAQ/FAQ.jsx"
import Lenis from 'lenis'

import Signup from "./Components/ui/login-signup/signup.jsx"
import Login from "./Components/ui/login-signup/login.jsx"
import IconStrip from "./Components/ui/IconStrip.jsx"
import Layout from "./Layout.jsx"
import Loader from "./Components/ui/Loader.jsx"
import ProtectedRoute from "./Components/ProtectedRoute.jsx"
import ScanPage from "./Components/pages/ScanPage.jsx"
import ProfilePage from "./Components/pages/ProfilePage.jsx"
import { supabase } from "./supabaseClient"


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on initial load/refresh
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    supabase?.auth.onAuthStateChange((event, session) => {
      if (session) {
        // Session active
      }
    });
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      smoothWheel: true,
      autoRaf: true,
    });




    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href');
        if (id === '#') return;
        const element = document.querySelector(id);
        if (element) {
          lenis.scrollTo(element);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>FolioGauge | AI-Powered Portfolio Analytics</title>
        <meta name="description" content="Optimize your design portfolio with AI-driven insights. Get instant feedback on your case studies, layout, and content to land your dream job." />
        <meta name="keywords" content="portfolio review, design portfolio, ux portfolio, ai design critique, career growth, designer tools" />
      </Helmet>
      {isLoading && <Loader onLoaded={() => setIsLoading(false)} />}
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={
              <>
                <Hero />
                <Pricing />
                <TF />
                <IconStrip />
                <GetStarted />
                <WhyUs />
                <AllFeatures />
                <HowItWorks />
                <GetInTouch />
                <Footer />
              </>
            } />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/help" element={<FAQ />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/scan" element={<ScanPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App
