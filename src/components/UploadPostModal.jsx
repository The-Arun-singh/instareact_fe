import React, { useState } from 'react'
import './UploadPostModal.css'
import swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const UploadPostModal = () => {
    const [image, setImage] = useState({
        preview: "",
        data: "",
    })
    const [caption, setCaption] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleFileSelect = (e) => {
        const img = {
            preview: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "",
            data: e.target.files[0]
        }
        setImage(img)
    }

    const handleImgUpload = async () => {
        let formData = new FormData();
        formData.append('file', image.data);
        try {
            const res = await fetch("http://localhost:8000/uploadfile", {
                method: "POST",
                body: formData
            });
            const jsonRes = await res.json();
            return jsonRes;
        } catch (error) {
            // console.error("Error uploading file: ", error);
            throw error;
        }
    }

    const addPost = async (e) => {
        e.preventDefault();
        if (image.preview === "") {
            swal.fire({
                icon: "error",
                title: "Image is Mandatory"
            })
        } else if (caption === "") {
            swal.fire({
                icon: "error",
                title: "caption is Mandatory"
            })
        } else if (location === "") {
            swal.fire({
                icon: "error",
                title: "location is Mandatory"
            })
        } else {
            setLoading(true);
            const imgRes = await handleImgUpload();
            // console.log(imgRes, imgRes.fileName);
            const req = {
                caption: caption,
                description: description,
                location: location,
                image: `http://localhost:8000/files/${imgRes.fileName}`
            };
            try {
                const res = await fetch("http://localhost:8000/createpost", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(req)
                })
                setLoading(false);
                // console.log(res.ok)
                if (res && res.ok) {
                    navigate("/allposts");
                }
            } catch (error) {
                // console.log(error);
                swal.fire({
                    icon: "error",
                    title: "Some Error occured!"
                })
            }
        }
    }

    return (
        <>
            {loading ? (<>
                <div className="row">
                    <div className="col-md-12 mt-2">
                        <div className="spinner-border text-primary" role='status'>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </>) : (<>
                <div className="modal fade" id="uploadpost" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div>
                                    <div className='d-flex justify-content-between'>
                                        <h1 className="modal-title fs-5" id="uploadpost">Upload Post</h1>
                                        <i className="btn fa-solid fa-xmark" data-bs-dismiss="modal"></i>
                                    </div>
                                    <div className="d-flex flex-sm-row flex-column">
                                        <div className="upload w-100 p-sm-4 p-3 my-3 my-sm-0 mt-4 mt-sm-0">
                                            <div className='uploadOverlay d-flex flex-column align-items-center justify-content-center px-5 py-4 m-sm-0 ms-4'>
                                                {image.preview ? (<>
                                                    <img src={image.preview} alt="preview" className='rounded' width='100%' height="100%" />
                                                </>) : (<>
                                                    <i className="fa-solid fa-cloud-arrow-up fs-1"></i>
                                                    <div>Upload from your Computer</div>
                                                </>)}
                                            </div>
                                            <input type="file" name="uploadfile" className='uploadfile' accept='.jpg, .png, .gif' onChange={e => handleFileSelect(e)} />
                                        </div>
                                        <div className=" justify-content-between p-4 w-100">
                                            <div>
                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control" id="floatingInput" placeholder="Add Caption" onChange={e => setCaption(e.target.value)} />
                                                    <label htmlFor="floatingInput">Add Caption</label>
                                                </div>
                                                <div className="form-floating mb-1">
                                                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" onChange={e => setDescription(e.target.value)}></textarea>
                                                    <label htmlFor="floatingTextarea">Comments</label>
                                                </div>
                                                <div className="form-floating mb-2">
                                                    <input type="text" className="form-control" id="floatingInput" placeholder="Location" onChange={e => setLocation(e.target.value)} />
                                                    <label htmlFor="floatingInput">Location</label>
                                                </div>
                                            </div>
                                            <div>
                                                <button className='btn btn-danger p-2 px-5 float-end mt-5' onClick={e => addPost(e)} data-bs-dismiss="modal" >Post</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>)}
        </>
    )
}

export default UploadPostModal