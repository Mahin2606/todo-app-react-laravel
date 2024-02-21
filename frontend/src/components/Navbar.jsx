import React, { useEffect, useState } from 'react';
import { post } from '../utils/fetchAPI';
import { showErrorToast } from '../utils/toaster-alert';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = JSON.parse(localStorage.getItem('user'));
        setUser({...getUser});
    }, []);

    function logout() {
        post("logout", {}).then((res) => {
            localStorage.clear();
            navigate("/login");
        }).catch((err) => {
            showErrorToast(err?.response?.data?.message);
        });
    }

    return (
        <nav className="w-75 mx-auto navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <span className="nav-link">Welcome, {user?.user?.name}</span>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mps">
                            <span className="nav-link" onClick={logout}><i class="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;