import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import AddCourse from './Components/Addcourse';
import Schedulelec from './Components/Schedulelec';
import Dashboard from './Components/Dashboard';
import GetInstructors from './Components/GetInstructors';
import Instructordetails from './Components/Instructordetails';
import UpdateCourse from './Components/UpdateCourse';
import UpdateLec from './Components/UpdateLec';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/createinstructor" element={<Register/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/addcourse' element={<AddCourse/>}/>
        <Route path='/schedulelec/:name' element={<Schedulelec/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/instructor/:name' element={<Instructordetails/>}/>
        {/* <Route path='/main' element={<GetInstructors/>}/> */}
        <Route path='/updatecourse/:courseId' element={<UpdateCourse/>}/>
        <Route path='/updatelec/:name/:id' element={<UpdateLec/>}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
