import React from 'react'
import './NavBar.css';
import logo from '../assets/images/logo.PNG'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(user, Boolean(user.id));

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    }

    return (
        <nav className="navbar d-block navbar-expand-lg shadow-sm align-items-center">
            <div className="container-fluid d-flex ">

                <NavLink className="navbar-brand" to={'/'}>
                    <img src={logo} alt="logo" className='logo' />
                </NavLink>
                {localStorage.getItem("token") ? (
                    <>
                        <div>
                            <form className="d-flex align-items-center" role="search">
                                <input className="searchbox form-control me-4 rounded-1 p-2" type="search" placeholder="Search" />
                                <span className='me-3 text-dark fs-5 search'><i className="fa-solid fa-magnifying-glass"></i></span>
                                <NavLink className="nav-link me-3 text-dark fs-5" to={'/allposts'}><i className="fa-solid fa-house"></i></NavLink>
                                <NavLink className="nav-link me-3 text-dark fs-5" to={'/'}><i className="fa-regular fa-heart"></i></NavLink>
                                <div className="dropdown">
                                    <div className=' d-flex align-items-center justify-content-center'
                                        data-bs-toggle="dropdown">
                                        <img
                                            className='rounded-circle profile-pic'
                                            alt="profile pic"
                                            src="https://images.unsplash.com/photo-1682687220795-796d3f6f7000?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        />
                                    </div>
                                    <ul className="dropdown-menu dropdown-menu-end mt-2">
                                        <li className='dropdown-item ps-2'>
                                            <NavLink className="nav-link text-dark fs-6 fw-semibold" to={'/myprofile'}>My Profile</NavLink>
                                        </li>
                                        <li className='dropdown-item fw-semibold ps-2'>
                                            <p onClick={logout} className='m-0 logout'>Logout</p>
                                        </li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </>) : (<>
                        <div>
                            <form className="d-flex align-items-center" role="search">
                                <input className="searchbox form-control me-4 rounded-1 p-2" type="search" placeholder="Search" />
                                <span className='me-3 text-dark fs-5 search'><i className="fa-solid fa-magnifying-glass"></i></span>
                                <NavLink className="nav-link me-3 text-dark fs-5" to={'/allposts'}><i className="fa-solid fa-house"></i></NavLink>
                            </form>
                        </div>
                    </>)}
            </div>
        </nav>
    )
}

export default NavBar

