import React, { useState } from 'react'
import "./Login.css";
import socialDesktop from '../assets/images/social-desktop.PNG';
import socialMobile from '../assets/images/social-mobile.PNG';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import Swal from 'sweetalert2';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await fetch(`http://localhost:8000/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            })
            const data = await res.json();
            if (res.ok) {
                setLoading(false);
                // Swal.fire({
                //     icon: "success",
                //     title: "User Logged In Successfully"
                // });
                const user = data.user;
                localStorage.setItem("token", data.jwtToken);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch({ type: "LOGIN", payload: user });
                navigate("/myprofile");
            }

        } catch (err) {

            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error : invalid credentials"
            })
        }
    }


    return (
        <div className='container login-container'>
            <div className="row align-items-center">
                <div className="col-md-7 col-sm-12">
                    <img src={socialDesktop} alt="login-prop-img" className='socialDesktop social-desktop-img m-auto' />
                    <img src={socialMobile} alt="login-prop-img" className='socialMobile m-auto' />
                </div>
                <div className="col-md-5 col-sm-12 mt-4">
                    {loading ? (<>
                        <div className="row">
                            <div className="col-md-12 mt-2">
                                <div className="spinner-border text-primary" role='status'>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </>) : (<>
                        <div className="card shadow">
                            <div className="card-body">
                                <h4 className="card-title mb-3 fw-bold">Log In</h4>
                                <form onSubmit={e => login(e)}>
                                    <input type="email" className="my-2 p-3 form-control input-bg rounded-1" placeholder='Phone number, username, or email' onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                                    <input type="password" className="my-2 p-3 form-control input-bg rounded-1" placeholder='Password' onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                                    <div className="d-grid">
                                        <button type="submit" className="mt-3 custom-btn custom-btn-blue">Log In</button>
                                    </div>
                                    <div className="mt-3 divider">
                                        <hr className='text-muted' />
                                        <h6 className='text-muted'>OR</h6>
                                        <hr className='text-muted' />
                                    </div>
                                    <div className="mt-3 d-grid">
                                        <button type="submit" className="mt-3 custom-btn custom-btn-white">
                                            <span className='text-muted'>Don't have an account? </span>
                                            <Link to={'/signup'} className='ms-1 text-info fw-bold'>Sign Up</Link>
                                        </button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </>)}
                </div>
            </div>
        </div>
    )
}

export default Login