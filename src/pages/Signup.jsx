import React, { useState } from 'react'
import "./Login.css";
import socialDesktop from '../assets/images/social-desktop.PNG';
import socialMobile from '../assets/images/social-mobile.PNG';
import { Link } from 'react-router-dom';
import SwAl from "sweetalert2";
// import axios from 'axios';


const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const signup = async (e) => {
        e.preventDefault();
        setLoading(true);
        await fetch(`http://localhost:8000/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: fullName,
                email: email,
                password: password
            })
        }).then((result) => {
            if (result.ok) {
                setLoading(false);
                SwAl.fire({
                    icon: "success",
                    title: "User Registered Successfully"
                })
                e.target.reset();
            }
        }).catch(err => {
            console.error(err);
            SwAl.fire({
                icon: "error",
                title: "Error, Please try again later"
            })
        });
        // axios.post(`${process.env.API_BASE_URL}/signup`, reqData)
        //     .then((result) => {
        //         if (result.statusText === "OK") {
        //             setLoading(false)
        //             SwAl.fire({
        //                 icon: "success",
        //                 title: "User Registered Successfully"
        //             })
        //         }
        //     })
        //     .catch(err => {
        //         console.error(err);
        //         SwAl.fire({
        //             icon: "error",
        //             title: "Error, Please try again later"
        //         })
        //     });
    };


    return (
        <div className='container login-container'>
            <div className="row align-items-center">
                <div className="col-md-7 col-sm-12">
                    <img src={socialDesktop} alt="login-prop-img" className='socialDesktop social-desktop-img m-auto' />
                    <img src={socialMobile} alt="login-prop-img" className='socialMobile m-auto' />
                </div>
                <div className="col-md-5 col-sm-12 mt-2">
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
                                <h4 className="card-title mb-3 fw-bold">Sign Up</h4>
                                <form onSubmit={(e) => signup(e)}>
                                    {/* <input type="text" className="my-2 p-3 form-control input-bg rounded-1" placeholder='Mobile No.' /> */}
                                    <input type="email" className="my-2 p-3 form-control input-bg rounded-1" placeholder='Email' onChange={e => setEmail(e.target.value)} />
                                    <input type="text" className="my-2 p-3 form-control input-bg rounded-1" placeholder='Full Name' onChange={e => setFullName(e.target.value)} />
                                    <input type="password" className="my-2 p-3 form-control input-bg rounded-1" placeholder='Password' onChange={e => setPassword(e.target.value)} />
                                    <div className="mt-3 form-check text-start">
                                        <input type="checkbox" className="form-check-input" id="password" />
                                        <label className="form-check-label" htmlFor="password">Remember Password</label>
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="mt-3 custom-btn custom-btn-blue">Sign Up</button>
                                    </div>
                                    <div className="mt-3 divider">
                                        <hr className='text-muted' />
                                        <h6 className='text-muted'>OR</h6>
                                        <hr className='text-muted' />
                                    </div>
                                    <div className="mt-3 d-grid">
                                        <button type="submit" className="mt-3 custom-btn custom-btn-white">
                                            <span className='text-muted'>Already have an account? </span>
                                            <Link to={'/login'} className='ms-1 text-info fw-bold'>Log In</Link>
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

export default Signup;