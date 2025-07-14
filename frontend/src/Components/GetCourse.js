import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/getcourse.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function GetCourse() {
  const [courses, setCourse] = useState([]);
  const [error, setError] = useState(null);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getcourse");
        setCourse(response.data);
      } catch (err) {
        setError("failed to add course");
        console.log(err);
      }
    };
    fetchCourses();
  }, []);

  const HoverData = "Click on Image to Schedule lecture";

  const onHover = (e) => {
    e.preventDefault();
    setHover(true); // turn true
    console.log("hovered");
  };

  const onHoverOver = (e) => {
    e.preventDefault(); // turn false
    setHover(false);
  };

  const handleCourse = (name) => {
    navigate(`/schedulelec/${name}`);
  };
  const handleUpdatecourse = (id) => {
    navigate(`/updatecourse/${id}`);
  };
  const handleDelete = async (courseId) => {
    const confirm = await Swal.fire({
      title: "Delete this course?",
      text: "This will permanently delete the course and its image.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(
          `http://localhost:5000/deletecourse/${courseId}`
        );
        Swal.fire("Deleted!", res.data.message, "success");
      } catch (err) {
        Swal.fire("Error!", "Could not delete the course.", "error");
      }
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="course-container">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            {console.log(course.image)}
            {/* if hover is true then only show the text */}
            {hover && <p className={hover}>{HoverData}</p>}
            <img
              src={`http://localhost:5000/Images/${course.image}`}
              onMouseEnter={(e) => onHover(e)}
              onMouseLeave={(e) => onHoverOver(e)}
              alt={course.name}
              className="course-img"
              onClick={() => handleCourse(course.name)}
            />
            <h5>{course.name}</h5>
            <h6>{course.level}</h6>
            {/* <button tye='submit' className='submit'>Schedulelec</button> */}
            <div className="submit-container1">
              <button
                type="submit"
                className="submit"
                onClick={() => handleUpdatecourse(course._id)}
              >
                Update Course
              </button>
              <button
                type="submit"
                className="submit1"
                onClick={() => handleDelete(course._id)}
              >
                Delete Course
              </button>
              {/* <button type='submit' className='submit' onClick={()=>handleUpdatecourse(course._id)}>Update Course</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetCourse;
