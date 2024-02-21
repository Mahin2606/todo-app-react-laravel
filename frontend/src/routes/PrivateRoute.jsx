import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/helper';

const PrivateRoute = () => {
    const isLoggedIn = isAuthenticated();
    return (
        <div className="wrapper">
            {isLoggedIn ? <Outlet /> : <Navigate to='/login'  /> }
        </div>
    );
};

export default PrivateRoute;
