import React, { useEffect, useState } from 'react'
import "./MyProfile.css"
import MyPost from '../components/MyPost'
import EditModal from '../components/EditModal'
import UploadPostModal from '../components/UploadPostModal'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const MyProfile = () => {
    const [allMyPosts, setAllMyPosts] = useState([]);

    const user = useSelector(state => state.userReducer.user)

    const getAllMyPosts = async () => {
        try {
            const res = await fetch("http://localhost:8000/myallposts", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });
            const data = await res.json();
            if (res && res.ok) {
                setAllMyPosts(data.myposts);
                // console.log(data, data.myposts, allMyPosts);
            }
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getAllMyPosts();
    }, [])


    return (
        <div className='myprofile-container bg-light shadow p-md-2'>
            <div className="row p-4">
                <div className="col-md d-flex flex-column justify-content-between">
                    <div className="profile-img">
                        <img className='rounded-circle profile-img' src="https://images.unsplash.com/photo-1702350252685-fffaa65954a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="profile pic" />
                    </div>
                    <h5 className="fw-bold">{user.email}</h5>
                    <p>{user.fullName}</p>
                    <p>UI/UX Designer @{user.fullName} | Follow at @{user.fullName}</p>
                    <p>My Portfolio on <NavLink>www.portfolio/{user.fullName}</NavLink></p>
                </div>
                <div className="col-md d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-evenly">
                        <div>
                            <h5 className="fw-bold">{allMyPosts.length}</h5>
                            <p>Posts</p>
                        </div>
                        <hr className='vr' />
                        <div>
                            <h5 className="fw-bold">20</h5>
                            <p>Following</p>
                        </div>
                        <hr className='vr' />
                        <div>
                            <h5 className="fw-bold">20</h5>
                            <p>Followers</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-evenly align-items-center">
                        <button className='p-2 btn btn-light border border-2'>
                            <span>Edit Profile</span>
                        </button>
                        <button className='p-2 btn btn-light border border-2' data-bs-toggle="modal" data-bs-target="#uploadpost">Upload Post</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <hr className='mx-auto my-3' style={{ width: '95%' }} />
            </div>
            <div className="row m-auto">
                <div className="justify-content-center d-flex">
                    {allMyPosts.map(post => {
                        return (
                            <MyPost postData={post} key={post._id} />
                        )
                    })}
                </div>
            </div>
            <div>
                <EditModal allMyPosts={allMyPosts} getAllMyPosts={getAllMyPosts} />
            </div>
            <div>
                <UploadPostModal />
            </div>
        </div>
    )
}

export default MyProfile