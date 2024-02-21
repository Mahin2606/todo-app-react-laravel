import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/helper';

const PublicRoutes = () => {
    const isLoggedIn = isAuthenticated();

    return (
        !!isLoggedIn ? <Navigate to='/' replace={true} /> : <Outlet />
    );
};

export default PublicRoutes;
