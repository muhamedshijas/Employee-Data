import React from 'react';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './app.css'
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <div>
    <Routes>
    <>
    <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      </>
      </Routes>
      </div>
  );
}

export default App;
