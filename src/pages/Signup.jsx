import React from 'react'
import "./Login.css";
import socialDesktop from '../assets/images/social-desktop.PNG';
import socialMobile from '../assets/images/social-mobile.PNG';

const Signup = () => {
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
                            <h4 className="card-title mb-3 fw-bold">Sign Up</h4>
                            <form>
                                <input type="text" className="my-2 p-3 form-control input-bg rounded-1" placeholder='Mobile No.' />
                                <input type="email" className="my-2 p-3 form-control input-bg rounded-1" placeholder='Email' />
                                <input type="text" className="my-2 p-3 form-control input-bg rounded-1" placeholder='Full Name' />
                                <input type="password" className="my-2 p-3 form-control input-bg rounded-1" placeholder='Password' />
                                <div class="mt-3 form-check text-start">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Remember Password</label>
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
                                        <span className='ms-1 text-info fw-bold'>Log In</span>
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <div className="container signup-container">
        //     <div className="row">
        //         <div className="col-md-7 border">
        //             <img className='social-desktop-img' src={socialDesktop} alt="signup_image" />
        //             <img className='social-mobile-img' src={socialMobile} alt="signup_image" />
        //         </div>
        //         <div className="col-md-5 border">
        //             <div className="card">
        //                 <div className="card-body">
        //                     <h5 className="card-title">Sign Up</h5>

        //                     <form>
        //                         <input type="number" className="form-control" placeholder='0000000000' />
        //                         <input type="email" className="form-control" placeholder='Email' />
        //                         <input type="text" className="form-control" placeholder='Full Name' />
        //                         <input type="password" className="form-control" placeholder='Password' />
        //                         <div class="mb-3 form-check text-start">
        //                             <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        //                             <label class="form-check-label" for="exampleCheck1">Remember Password</label>
        //                         </div>
        //                         <div className="d-grid">
        //                             <button type="submit" className="btn btn-primary">Submit</button>
        //                         </div>

        //                         <div>
        //                             <hr />
        //                             <span>OR</span>
        //                             <hr />
        //                         </div>

        //                         <div className="d-grid">
        //                             <button type="submit" className="btn btn-primary">Submit</button>
        //                         </div>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </div >
        // </div >
    )
}

export default Signup