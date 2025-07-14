import React, { useState } from 'react';
import img from "../assets/blue-view-32.png";
import img1 from "../assets/blue-person-32.png";
import "../css/Register.css";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Prevents the form from refreshing the page on submit
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,email,password }),
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          title: 'Success!',
          text: 'Registration successful!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/'); //  Redirect after user clicks OK
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
    } catch (err) {
      const error = "Registration failed. Please try again.";
      Swal.fire({
        title: 'Error!',
        text: 'Registration failed!',
        icon: 'error',
        confirmButtonText: 'Try Again',
      }); 
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Create Instructor</div>
        <div className='underline'></div>
      </div>

      <form onSubmit={handleSubmit} className='inputs'>
        <div className='input'>
          <img src={img1} alt="User icon"/>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your username'
            required
          />
        </div>

        <div className='input'>
          <img src={img1} alt="User icon"/>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
          />
        </div>

        <div className='input'>
          <img src={img} alt="Password icon"/>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
          />
        </div>
        
        <div className='submit-container'>
          <button type='submit' className='submit'>Create</button>
          {/* <button type='submit' className='submit'></button> */}

        </div>
      </form>
    </div>
  );
}

export default Register;
