import React, { useState } from 'react'
import img from "../assets/blue-view-32.png";
import img1 from "../assets/blue-person-32.png";
import "../css/Register.css";
import Swal from 'sweetalert2';

import {useNavigate} from 'react-router-dom';
import GetInstructors from './GetInstructors';
function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [disabled,setDisabled]=useState(true);
    const navigate=useNavigate();
     localStorage.setItem("isAuthenticated", true); // on login

    const handleSubmit = async (e) => {
      // Prevents the form from refreshing the page on submit
      e.preventDefault();
      // console.warn(name,password,"email,password");
      const nameRegex = /^[A-Z][a-zA-Z]*$/;
  if (!nameRegex.test(name)) {
    Swal.fire({
      title: 'Invalid Name',
      text: 'Name should start with a capital letter and contain only alphabets.',
      icon: 'warning',
      confirmButtonText: 'OK',
    });
    return;
  }

  // Password validation: Minimum 8 characters, includes uppercase, lowercase, number, special char
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password)) {
    Swal.fire({
      title: 'Weak Password',
      text: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
      icon: 'warning',
      confirmButtonText: 'OK',
    });
    return;
  }

      try{
        const response = await fetch('http://localhost:5000/login',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({name,password}),  
        });

        if(response.ok){
           const result=await response.json();
            Swal.fire({
                     title: 'Success!',
                     text: 'Registration successful!',
                     icon: 'success',
                     confirmButtonText: 'OK',
                   }).then(() => {
                     if(name.toLowerCase()==="admin")
                      {navigate('/dashboard');}
                     else{
                      navigate(`/instructor/${name}`)
                     } //  Redirect after user clicks OK
                   });
        }
        else {
                const errorResponse = await response.json();
                const error = errorResponse.message || "An error occurred";
                Swal.fire({
                  title: 'Error!',
                  text: 'Login failed!',
                  icon: 'error',
                  confirmButtonText: 'Try Again',
                }); 
              }
      }
      catch (err) {
            const error = "Login failed. Please try again.";
            Swal.fire({
              title: 'Error!',
              text: 'Login failed!',
              icon: 'error',
              confirmButtonText: 'Try Again',
            }); 
          }
      
    };
  
    return (
      <div className='container1'>
        <div className='header'>
          <div className='text'>Login</div>
          <div className='underline'></div>
        </div>
  
        <form onSubmit={handleSubmit} className='inputs'>
          <div className='input'>
            <img src={img1} alt="User icon"/>
            <input
              type='text'
              value={name}
              name='name'
              onChange={(e) => {setName(e.target.value);setDisabled(!e.target.value)}}
              placeholder='Enter your username'
              required
            />
          </div>
  
          <div className='input'>
            <img src={img} alt="Password icon"/>
            <input
              type='password'
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              required
            />
          </div>
  
          <div className='forget-password'>
            <a href='#'>Forgot Password?</a>
          </div>
          <div className='account'>
            <h6>Don't have account?<span><a href='/createinstructor'>Create One</a></span></h6>
          </div>
          
          <div className='submit-container1'>
            <button type='submit' className='submit'>Login</button>
          </div>
        </form>
      </div>
    );
}

export default Login

