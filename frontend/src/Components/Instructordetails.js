import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

// import { eventNames } from '../../../backend/db/model/Schedulelec';
import "../css/instructorDetails.css"
function Instructordetails() {
  const [instructorDetails,setInstructorDetails]=useState([]);
  const [error,setError]=useState(null);
  const {name} = useParams();
  useEffect(()=>{
    try {
      const DetailsFetch=async()=>{
        const response=await axios.get(`http://localhost:5000/users/${name}`);
        setInstructorDetails(response.data);
      }
      DetailsFetch();
    } catch (error) {
      setError("Failed")
    } 
  },[name])
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
const navigate=useNavigate()
const handleLogout = () => {
    // Clear localStorage or authentication token
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userToken"); // if using token
     navigate('/', { replace: true }); // redirect to login page
  };
  return (
    <div className='container-name'>
      <div className="top-bar">
        <h1>Welcome!</h1> 
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      {
        instructorDetails.map((instructor)=>(
          <div key={instructor._id} className='name-card'>
            <h5>{instructor.instructor}</h5>
            <h6>{formatDate(instructor.date)}</h6>
            <h6>{instructor.course}</h6>
            <h6>{instructor.lec}</h6>
            <h6>{instructor.location}</h6>
        </div>
        ))
      }
    </div>
  )
}

export default Instructordetails
