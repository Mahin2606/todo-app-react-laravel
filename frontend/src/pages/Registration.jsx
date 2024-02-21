import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../utils/fetchAPI';
import { showErrorToast, showSuccessToast } from '../utils/toaster-alert';

function Registration() {
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
        post("register", {...formData}).then((res) => {
            showSuccessToast(res?.data?.message);
            navigate("/login");
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
                        <h4>Sign Up</h4>
                        <hr className="border opacity-100" />
                        <form onSubmit={submitForm}>
                            <div className="mb-3">
                                <label className="mb-1">Name</label>
                                <input type="text" className="form-control" required name="name" value={formData.name} onChange={(e) => handleFormData(e)} />
                                {
                                    !!errors && errors?.name && 
                                    <small className="text-danger">{errors?.name}</small>
                                }
                            </div>
                            <div className="mb-3">
                                <label className="mb-1">Email</label>
                                <input type="email" className="form-control" required name="email" value={formData.email} onChange={(e) => handleFormData(e)} />
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
                            <div className="mb-3">
                                <label className="mb-1">Confirm Password</label>
                                <input type="password" className="form-control" required name="password_confirmation" onChange={(e) => handleFormData(e)} />
                                {
                                    !!errors && errors?.password_confirmation && 
                                    <small className="text-danger">{errors?.password_confirmation}</small>
                                }
                            </div>
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </form>
                        <label className="mt-2">Already have an account? <Link to="/login">Login here</Link></label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;
