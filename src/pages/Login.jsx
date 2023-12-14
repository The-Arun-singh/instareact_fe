import React from 'react'
import "./Login.css";
import socialDesktop from '../assets/images/social-desktop.PNG';
import socialMobile from '../assets/images/social-mobile.PNG';

const Login = () => {
    return (
        <div className='container login-container'>
            <div className="row align-items-center">
                <div className="col-md-7 col-sm-12">
                    <img src={socialDesktop} alt="login-prop-img" className='socialDesktop social-desktop-img m-auto' />
                    <img src={socialMobile} alt="login-prop-img" className='socialMobile m-auto' />
                </div>
                <div className="col-md-5 col-sm-12 mt-4">
                    <div className="card shadow ">
                        <div className="card-body">
                            <h4 className="card-title mb-3 fw-bold">Log In</h4>
                            <form>
                                <input type="email" className="my-2 p-3 form-control input-bg rounded-1" placeholder='Phone number, username, or email' />
                                <input type="password" className="my-2 p-3 form-control input-bg rounded-1" placeholder='Password' />
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
                                        <span className='ms-1 text-info fw-bold'>Sign Up</span>
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login