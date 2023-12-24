import React from 'react'
import "./EditModal.css"

const Modal = ({ allMyPosts, getAllMyPosts }) => {

    // console.log(allMyPosts)

    const deletepostHandler = async (id) => {
        try {
            await fetch(`http://localhost:8000/deletepost/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }).then(response => console.log(response));
            getAllMyPosts();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            {allMyPosts.map((post) => {
                return (<>
                    <div className="modal fade" id="editpost" tabIndex="-1">
                        <div className="modal-dialog modal-xl modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body d-flex">

                                    <div className="col-md-6">
                                        <div>
                                            <div id="carouselExampleIndicators" className="carousel slide">
                                                <div className="carousel-indicators">
                                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active fa-solid fa-circle" aria-current="true" ><i className="fa-solid fa-circle fs-6"></i></button>
                                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" ><i className="fa-solid fa-circle fs-6"></i></button>
                                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" ><i className="fa-solid fa-circle fs-6"></i></button>
                                                </div>
                                                <div className="carousel-inner">
                                                    <div className="carousel-item active">
                                                        <img src={post.image} className="d-block w-100 img-fluid rounded" alt={post.description} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div>
                                            <div className="ps-3 pt-2">
                                                <div className="d-flex justify-content-between">
                                                    <div className="col-6 d-flex flex-column">
                                                        <div className='d-flex align-items-center'>
                                                            <img className='rounded-circle profile-pic ' alt="profile pic" src="https://images.unsplash.com/photo-1682687220795-796d3f6f7000?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                                            <p className='m-0 ps-3 fw-bold fs-6'>{post.author.name}</p>
                                                        </div>
                                                        <div className='m-2'>
                                                            <p className='m-0 p-0 fs-6'>{post.caption}</p>
                                                            <p className='m-0 p-0 fs-6'>{post.location}</p>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <div className='d-flex float-end align-items-center p-0'>
                                                            <div className="dropdown">
                                                                <i className="btn modal-more-action-btn fw-bold fs-3 fa-solid fa-ellipsis pe-2" data-bs-toggle="dropdown"></i>
                                                                <ul className="dropdown-menu dropdown-menu-end">
                                                                    <li className='ps-2'>
                                                                        <i className="fa-regular fa-pen-to-square pe-2 fw-bold"></i>
                                                                        Edit Post
                                                                    </li>
                                                                    <li className='ps-2'>
                                                                        <i className="fa-regular fa-trash-can pe-2 fw-bold btn" onClick={() => deletepostHandler(post._id)} data-bs-dismiss="modal">
                                                                            <span>Delete Post</span>
                                                                        </i>

                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <i className="btn fa-solid fa-xmark" data-bs-dismiss="modal"></i>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className=" text-muted fs-6 px-2">2 hours ago</div>
                                                <div className=" fs-6 px-2">{post.description}</div>
                                                <div className=" d-flex flex-column pt-2 px-2">
                                                    <div className=''>
                                                        <i className="'text-dark fs-4 pe-2 fa-regular fa-comment"></i>
                                                        <i className="'text-dark fs-4 pe-2 fa-regular fa-heart"></i>
                                                        <i className="'text-dark fs-4 pe-2 fa-regular fa-paper-plane"></i>
                                                    </div>
                                                    <div className='fw-bold'>200 likes</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
            })}

            {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button> */}

        </>
    )
}

export default Modal