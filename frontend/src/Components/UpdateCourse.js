import React, { useEffect, useState } from 'react';
import img from "../assets/blue-view-32.png";
import img1 from "../assets/blue-person-32.png";
import "../css/addcourse.css";
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function UpdateCourse() {
    const {courseId}=useParams();
    const [name, setName] = useState('');
    const [level, setLevel] = useState('Beginner');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);  // Ensure the initial state is null for the file input
    
    useEffect(()=>{
        const fetchCourse=async()=>{
            try {
                const res= await axios.get(`http://localhost:5000/getcourse/${courseId}`)
                console.log(res)
                setName(res.data.name)
                setLevel(res.data.level)
                setDescription(res.data.description)
                //setImage(res.data.image)
            } catch (error) {
                    console.error("Failed")   
            }
        }
        fetchCourse();
        localStorage.clear()
    },[courseId])

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        console.log(formData.get('name'));
        formData.append("level", level);
        formData.append("description", description);
        formData.append("image", image);

        try {
            const response = await fetch(`http://localhost:5000/updatecourse/${courseId}`, {
                method: 'PUT',
                body: formData,
            });

            
            console.log(response);
            if(response.ok){
                const res = await response.json();
                        Swal.fire({
                                 title: 'Success!',
                                 text: 'Registration successful!',
                                 icon: 'success',
                                 confirmButtonText: 'OK',
                               }).then(() => {
                                window.location.reload();
                               });
                    }
                    else {
                            const errorResponse = await response.json();
                            const error = errorResponse.message || "An error occurred";
                            Swal.fire({
                              title: 'Error!',
                              text: 'Registration failed!',
                              icon: 'error',
                              confirmButtonText: 'Try Again',
                            }); 
                          }
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Update Course</div>
                <div className='underline'></div>
            </div>

            <form onSubmit={handleSubmit} className='inputs'>
                <div className='input'>
                    <img src={img} alt="User icon" />
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter course name'
                        required
                    />
                </div>

                <div className='input'>
                    <img src={img} alt="Password icon" />
                    <select value={level} onChange={(e) => setLevel(e.target.value)}>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <div className='input'>
                    <img src={img1} alt="User icon" />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        rows="5"
                    />
                </div>

                <div className='input'>
                    <img src={img} alt="User icon" />
                    <input
                        type="file"
                        //value={image}
                        onChange={(e) => setImage(e.target.files[0])}  // Ensure file object is directly set
                    />  
                </div>

                <div className='submit-container'>
                    <button type='submit' className='submit'>Update Course</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateCourse;
