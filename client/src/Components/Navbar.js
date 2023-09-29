import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

import './Navbar.css'
function Navbar() {
  const dispatch=useDispatch()
  async function handleLogout(e) {
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure? logout',
      text: "logout from this account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes, Logout!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.get("/admin/logout")
        dispatch({ type: "refresh" })
      }
    })
  }
  return (
    <div>
    <div className="nav">
    <div className="logo">
    <p>Home</p>
    <p> <Link to='/employeedetials'>Employee List</Link></p>
    </div>
    <div className="links">

    <p>Hukum Gupta</p>
    <p onClick={handleLogout}> Logout</p>
    </div>
    </div>
    </div>
  )
}

export default Navbar