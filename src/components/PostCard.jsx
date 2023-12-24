import { useState } from 'react'
import './PostCard.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostCard = ({ postData, deletePost, getAllPosts }) => {

    const user = useSelector(state => state.userReducer.user)
    console.log(user, postData);
    const like = postData.likes.filter(id => id === user.id);
    // console.log(like, Boolean(like[0] == user.id), postData, user);

    const [commentbox, setCommentbox] = useState(false);
    const [comment, setComment] = useState("");

    const likeHandler = async (postId) => {
        try {
            await fetch(`http://localhost:8000/like`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ postId: postId })
            }).then(response => response.json()).then(response => console.log(response))
            getAllPosts();
        } catch (error) {
            console.error(error);
        }
    }
    const unLikeHandler = async (postId) => {
        try {
            await fetch(`http://localhost:8000/unlike`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ postId: postId })
            }).then(response => response.json()).then(response => console.log(response))
            getAllPosts();
        } catch (error) {
            console.error(error);
        }
    }

    const handleClick = () => {
        if (commentbox) {
            setCommentbox(false);
        } else {
            setCommentbox(true);
        }
    }

    const commentSubmit = async (id) => {
        try {
            const body = { commentText: comment, postId: id };
            const res = await fetch(`http://localhost:8000/comment`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(body),
            }).then(response => response.json());

            if (res && res.ok) {
                getAllPosts();
                handleClick();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="col-md-4 mb-2">
                <div className="Card shadow bg-light-subtle rounded-3 mb-3">
                    <div className="card-body p-3">
                        <div className="row align-items-center">
                            <div className="col-6 d-flex">
                                <img className='rounded-circle profile-pic p-1' alt="profile pic" src="https://images.unsplash.com/photo-1682687220795-796d3f6f7000?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                <div className='m-2'>
                                    <p className='m-0 p-0 fw-bold fs-6'>{postData.author.name}</p>
                                    <p className='m-0 p-0 fs-6'>{postData.caption}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <span className='float-end'>
                                    {postData.author._id === user.id && (
                                        <div className="dropdown">
                                            <div className=' d-flex align-items-center justify-content-center'
                                                data-bs-toggle="dropdown">
                                                <i className="fw-bold fs-3 fa-solid fa-ellipsis-vertical pe-2"></i>
                                            </div>
                                            <ul className="dropdown-menu dropdown-menu-end mt-2">
                                                <li className='dropdown-item ps-2'>
                                                    <NavLink className="nav-link text-dark fs-6 fw-semibold" to={'/myprofile'}>Edit Post</NavLink>
                                                </li>
                                                <li className='dropdown-item fw-semibold ps-2'>
                                                    <p className='m-0 logout' onClick={() => deletePost(postData._id)}>Delete Post</p>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="row-sm p-2">
                            <img
                                className='img-fluid rounded'
                                src={postData.image}
                                alt={postData.description}
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pt-2 ps-3">
                            <div className='d-flex'>
                                <i className="'m-3 text-dark fs-4 pe-2 fa-regular fa-comment" onClick={handleClick}></i>
                                {like[0] === user.id ?
                                    <i className="'m-3 text-dark fs-4 pe-2 fa-solid fa-heart" onClick={() => unLikeHandler(postData._id)}></i>
                                    :
                                    <i className="'m-3 text-dark fs-4 pe-2 fa-regular fa-heart" onClick={() => likeHandler(postData._id)}></i>
                                }
                                <i className="'m-3 text-dark fs-4 pe-2 fa-regular fa-paper-plane"></i>
                            </div>
                            <div className='fw-bold pe-3 '>
                                <span>{postData.likes.length} likes</span>
                            </div>
                        </div>
                        {postData.comments.map(comment => {
                            return (
                                <div className="d-flex align-items-center justify-content-between text-muted fs-6 px-3 py-0" key={comment._id}>
                                    <span>{comment.commentText}</span>
                                    <span>by - {comment.commentedBy.fullName}</span>
                                </div>
                            )
                        })
                        }
                        {commentbox && (<>
                            <div className="d-flex justify-content-between m-2 px-2">

                                <div className=''>
                                    <textarea className='form-control' onChange={e => setComment(e.target.value)} name="comment" id="" cols="30" rows="1" required></textarea>
                                </div>
                                <div className="">
                                    <button className='btn btn-secondary' onClick={() => commentSubmit(postData._id)}>Comment</button>
                                </div>
                            </div>
                        </>)
                        }
                        <div className="text-muted fs-6 ps-3 p-2">2 hours ago</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostCard