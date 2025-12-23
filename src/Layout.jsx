import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from './Components/ui/navbar/Navbar';
import Toast from './Components/ui/Toast';
import { AnimatePresence } from 'framer-motion';

const Layout = () => {
    const location = useLocation();
    const hideNavbarRoutes = ['/login', '/signup'];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    useEffect(() => {
        if (location.state?.toastMessage) {
            setToastMessage(location.state.toastMessage);
            // Clear state so it doesn't reappear on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        <>
            {shouldShowNavbar && <Navbar />}
            <Outlet />
            <AnimatePresence>
                {toastMessage && (
                    <Toast
                        message={toastMessage}
                        onClose={() => setToastMessage(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Layout;
