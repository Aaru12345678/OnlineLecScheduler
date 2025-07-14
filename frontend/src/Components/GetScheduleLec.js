import React,{useState,useEffect} from 'react'
import axios from 'axios'
import "../css/getScheduleLec.css"
import { useNavigate,useParams } from 'react-router-dom';

import Swal from "sweetalert2"
function GetScheduleLec({courseName}) {
    const [lecs,setLec]=useState([]);
    const [error,setError]=useState(null);
     const navigate=useNavigate();
     const {name}=useParams();
    useEffect(()=>{
        const getLecture=async()=>{
            try {
                const response=await axios.get(`http://localhost:5000/getschedulelec/${courseName}`);
                console.log(response)
                setLec(response.data);
            } catch (error) {
                setError("failed");
            }
        };
        getLecture();
    },[courseName]);
    
   const handleUpdate=async(id)=>{
      navigate(`/updateLec/${name}/${id}`)   
   }
   const handleDelete = async (id) => {
    const confirm = await Swal.fire({
        title: 'Delete this Lecture?',
        text: 'This will permanently delete the lecture and its image.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
        try {
            const res = await axios.delete(`http://localhost:5000/deletelec/${id}`);
            Swal.fire('Deleted!', res.data.message, 'success').then(() => {
            window.location.reload();
          });;
        } catch (err) {
            Swal.fire('Error!', 'Could not delete the course.', 'error');
        }
    }
};

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


  return (
    <div className="lec-container">
      {lecs.map((lec)=>(
        <div key={lec._id} className='lec-card'>
            <h5>{lec.instructor}</h5>
            <h6>{formatDate(lec.date)}</h6>
            <h6>{lec.course}</h6>
            <h6>{lec.lec}</h6>
            <h6>{lec.location}</h6>
          <div className='submit-container'>
          <button type="submit" className='submit' onClick={()=>handleUpdate(lec._id)}>Update</button><span></span>
          <button type="submit" className='submit1'onClick={()=>handleDelete(lec._id)}>Delete</button>
        </div>
        </div>
        
      ))}
    </div>
  )
}

export default GetScheduleLec
