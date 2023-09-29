import React, { useEffect } from 'react';
import axios from 'axios'
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './app.css'
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import EmployeePage from './Pages/EmployeePage';

function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;

  const {  refresh, admin } = useSelector((state) => {
  
    return state;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        let { data} = await axios.get("/admin/check-auth");
        console.log(data);
        dispatch({ type: "admin", payload: { login: data.loggedIn } })
      } catch (err) {
        console.log(err)
      }
    })()
  }, [refresh])



  return (
    <div>
    <Routes>

          {
            admin.login &&
            <>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<Navigate to='/' />}/>
            <Route path='/employeedetials' element={<EmployeePage/>}/>
         </>
          }

          {
            admin.login === false &&
            <>
            <Route path="/login" element={<LoginPage/>} />
            <Route path='/' element={<Navigate to='/login' />}/>
            <Route path='/employeedetials' element={<Navigate to='/login'/>}/>
            </>
          }
        </Routes>
    
    </div>
  );
}

export default App;
