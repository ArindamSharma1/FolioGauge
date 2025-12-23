import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from './Components/ui/navbar/Navbar';

const Layout = () => {
    const location = useLocation();
    const hideNavbarRoutes = ['/login', '/signup'];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

    React.useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    return (
        <>
            {shouldShowNavbar && <Navbar />}
            <Outlet />
        </>
    );
};

export default Layout;
