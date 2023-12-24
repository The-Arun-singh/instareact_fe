import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import Swal from 'sweetalert2';

const PostOverview = () => {


    const [allPosts, setAllPosts] = useState([]);

    const getAllPosts = async () => {
        try {
            const res = await fetch("http://localhost:8000/allposts", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // "authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            })
            const data = await res.json();
            // console.log(data);

            if (res && res.ok) {
                setAllPosts(data.post);
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error while fetching post:" + error,
            })
        }
        // console.log(allPosts)
    }

    const deletePostHandler = async (id) => {
        try {
            await fetch(`http://localhost:8000/deletepost/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then((result) => console.log(result.json()))
            getAllPosts();

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllPosts();
    }, [])

    return (
        <div className='container-fluid mt-md-5 mt-3'>
            <div className="row mx-5">
                {allPosts.map((post) => {
                    // console.log(post)
                    return (
                        <PostCard postData={post} key={post._id} deletePost={() => deletePostHandler(post._id)} getAllPosts={getAllPosts} />
                    )
                })}
            </div>
        </div>
    )
}

export default PostOverview