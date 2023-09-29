import React, { useState } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import './login.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';


function Login() {
  const dispatch=useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMessage, setErrMessage] = useState("")
  function validationErr(){
  
    if(email.replaceAll(' ', "")==="" || password.replaceAll(' ',"")===""){
        return true
    }
    return false
  }
  async function handleSubmit(e){
    console.log("hii")
    e.preventDefault();
    if(!validationErr()){
      let {data}=await axios.post('/admin/login',{email,password})
      console.log(data);
      if(!data.err){
        dispatch({type:"refresh"})
      }else{
        setErrMessage(data.message)
      }
    }
  }
  return (
    <div>
      <div className="login-container">
        <div className="login">
          <form action="">
            <h2>Login Here</h2>
            {
              errMessage &&
              <div className="login-row" style={{ justifyContent: "flex-start" }}>
                <p className='text-danger'>{errMessage}</p>
              </div>
            }
            <MDBInput label='Email ' id='typeEmail' type='email'  value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <MDBInput label='Password ' id='typePassword' type='password'  value={password} onChange={(e)=>setPassword(e.target.value)} />
            <MDBBtn  disabled={validationErr()} onClick={handleSubmit} >Submit</MDBBtn>
            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? Register here</p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login