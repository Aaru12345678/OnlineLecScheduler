import React, { useState } from 'react';
import Addcourse from './Addcourse';
// import CourseList from './CourseList';
import '../css/dashboard.css';
import GetInstructors from './GetInstructors';
import GetCourse from './GetCourse';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const [courses, setCourses] = useState([]);

  const addCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };
  const navigate=useNavigate()
const handleLogout = () => {
    // Clear localStorage or authentication token
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userToken"); // if using token
     navigate('/', { replace: true }); // redirect to login page
  };
  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h1>Welcome!</h1> 
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      <div className="left-panel">
        <h2>Instructors</h2>
        <GetInstructors/>
      </div>

      <div className="right-panel">
        {/* <h2>Add a Course</h2> */}
        <Addcourse onAddCourse={addCourse} />
        <GetCourse/>
        {/* <CourseList courses={courses} /> */}
      </div>
    </div>
  );
}

export default Dashboard;
