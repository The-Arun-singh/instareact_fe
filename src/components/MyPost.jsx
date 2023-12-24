import React from 'react'

const MyPost = ({ postData }) => {
    // console.log(postData)
    return (
        <div className="col-md-4 mb-2">
            <div className="card p-0 btn" data-bs-toggle="modal" data-bs-target="#editpost" >
                <img src={postData.image} className="card-img-top img-fluid rounded" alt={postData.description} />
            </div>
        </div>
    )
}

export default MyPost