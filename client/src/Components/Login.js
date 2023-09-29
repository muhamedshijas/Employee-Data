import React from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import './login.css'


function Login() {
  return (
    <div>
    <div className="login-container">
    <div className="login">
    <form action="">
    <h2>Login Here</h2>
    <MDBInput label='Email ' id='typeEmail' type='email' />
    <MDBInput label='Password ' id='typePassword' type='password' />
    <MDBBtn >Submit</MDBBtn>
    <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? Register here</p>

    </form>
    </div>
    </div>
    </div>
  )
}

export default Login