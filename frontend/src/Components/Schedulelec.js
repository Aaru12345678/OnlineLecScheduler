import React, { useEffect, useState } from 'react';
import img from "../assets/blue-view-32.png";
import img1 from "../assets/blue-person-32.png";
import "../css/scheduleLec.css";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import GetScheduleLec from './GetScheduleLec';


function Schedulelec(props) {
    const [option,setOption]=useState([]);
    const [option2,setOption2]=useState([]);
    const [form,setForm]=useState({
        instructor:'',
        date:'',
        course:'',
        lec:'',
        location:''
    })
    const navigate=useNavigate();
    
    const {name} = useParams()

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setForm((prevForm)=>({
            ...prevForm,
            [name]:value
        }));
    };

    useEffect(()=>{
          const fetchData = async ()=>{
            try {
                const response = await axios.get('http://localhost:5000/getlogin',{});
                setOption(response.data);
            } catch (error) {
                console.error('Error',error);
            }
          };
          fetchData();
    },[]);

    useEffect(()=>{
        const fetchData2= async()=>{
            try {
                const response = await axios.get('http://localhost:5000/getcourse',{});
                console.log(response)
                const allcourses=response.data;
                const selectedCourse=allcourses.find(course=>course.name === name);

                if (selectedCourse) {
                  setOption2([selectedCourse]);
                  setForm(prev => ({
                      ...prev,
                      course: selectedCourse.name // Preselect the course
                  }));
              }
            } catch (error) {
                console.error('Error',error);
            }
        };
        fetchData2();
    },[name]);

    const handleSubmit = async (e) => {
      // Prevents the form from refreshing the page on submit
      e.preventDefault();
      console.log(form);
      try {
        const response = await fetch('http://localhost:5000/schedulelec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
  
        if (response.ok) {
          const result = await response.json();
          Swal.fire({
            title: 'Success!',
            text: 'Registration successful!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            window.location.reload();
          });
        } else {
          const errorResponse = await response.json();
          const error = errorResponse.message || "An error occurred";
          Swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error',
            confirmButtonText: 'Try Again',
          }); 
        }
      } catch (err) {
        const error = "Registration failed. Please try again.";
        Swal.fire({
          title: 'Error!',
          text: err.message || error,
          icon: 'error',
          confirmButtonText: 'Try Again',
        }); 
      }
    };
  const handleLogout = () => {
    // Clear localStorage or authentication token
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userToken"); // if using token
     navigate('/', { replace: true }); // redirect to login page
  };
    return (
      <div>
        <div className="top-bar">
        <h1>Welcome!</h1> 
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      <div className='container'>
        <div className='header'>
          <div className='text'>Schedule Lecture</div>
          <div className='underline'></div>
        </div>
  
        <form onSubmit={handleSubmit} className='inputs'>
          <div className='input'>
            <img src={img1} alt="User icon"/>
            <select
                        name='instructor'
                        value={form.instructor}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Instructor</option>
                        {option.map((opt) => (
                            <option key={opt.id} value={opt.value}>{opt.name}</option>
                        ))}
                    </select>
          </div>
  
          <div className='input'>
            <img src={img} alt="Password icon"/>
            <input
              type='date'
              value={form.date}
              name='date'
              onChange={handleChange}
              placeholder='Enter your date'
              required
            />
          </div>
  
          <div className='input'>
            <img src={img1} alt="User icon"/>
            <select
                        name='course'
                        value={form.course}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Course</option>
                        {option2.map((opt2) => (
                            <option key={opt2.id} value={opt2.value}>{opt2.name}</option>
                        ))}
                    </select>
          </div>


           <div className='input'>
           <img src={img} alt="Password icon"/>
          <input
                type="text"
                name="lec"
                value={form.lec}
                onChange={handleChange}
                placeholder="Lecture"
            />
             </div>

            <div className='input'>
            <img src={img} alt="Password icon"/>
            <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
            />
       </div>
          
          <div className='submit-container'>
            <button type='submit' className='submit'>Done</button>
            {/* <button type='submit' className='submit'>View Lectures</button> */}
          </div>
        </form>
        
      </div>
      
      <GetScheduleLec courseName={name}/>
      </div>
    );
}

export default Schedulelec
