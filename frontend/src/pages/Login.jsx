import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../utils/fetchAPI';
import { showErrorToast } from '../utils/toaster-alert';

function Login() {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        post("login", {...formData}).then((res) => {
            localStorage.setItem('user', JSON.stringify(res?.data?.data));
            navigate("/");
        }).catch((err) => {
            showErrorToast(err?.response?.data?.message);
            setErrors({...err?.response?.data?.errors || {}});
        });
    };

    return (
        <div>
            <div className="w-25 mx-auto" style={{ marginTop: "10%" }}>
                <div className="card">
                    <div className="card-body">
                        <h4>Login</h4>
                        <hr className="border opacity-100" />
                        <form onSubmit={submitForm}>
                            <div className="mb-3">
                                <label className="mb-1">Email</label>
                                <input type="email" className="form-control" required name="email" onChange={(e) => handleFormData(e)} />
                                {
                                    !!errors && errors?.email && 
                                    <small className="text-danger">{errors?.email}</small>
                                }
                            </div>
                            <div className="mb-3">
                                <label className="mb-1">Password</label>
                                <input type="password" className="form-control" required name="password" onChange={(e) => handleFormData(e)} />
                                {
                                    !!errors && errors?.password && 
                                    <small className="text-danger">{errors?.password}</small>
                                }
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                        <label className="mt-2">Don't have an account? <Link to="/sign-up">Sign up here</Link></label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
