import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../css/getInstructors.css'

function GetInstructors() {
    const [instructors,setInstructor]=useState([]);
    const [error,setError]=useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchInstructors = async () => {
            try{
                  const response = await axios.get('http://localhost:5000/users');
                  setInstructor(response.data);
            }catch(err){
                  setError('Failed to fetch');
                  console.log(err);
            }
        };
        fetchInstructors();
    },[]);

    const handleInstructor=async(name)=>{
        //  const response= await axios.get(`http://localhost:5000/users/${instructors}`)
          navigate(`/instructor/${name}`)
    }

    

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="instructor-container">
        {instructors.map((instructor, index) => (
          <div className="instructor-card" key={instructor._id}
           onClick={()=>handleInstructor(instructor.name)}
          >
            {instructor.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetInstructors

