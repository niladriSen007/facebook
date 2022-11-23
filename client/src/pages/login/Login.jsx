import axios from 'axios'
import React, { useContext, useRef } from 'react'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import "./login.scss"
import { CircularProgress } from '@mui/material'

const Login = () => {

  const navigateTo = useNavigate();

  const email = useRef();
  const password = useRef();
  const {user,isFetching,error,dispatch} = useContext(AuthContext)

  const login = async(userCredentials,dispatch) =>{
    dispatch({type:"LOGIN_START"})
    try
    {
      const res = await axios.post("/login",userCredentials)
      // console.log(res.data)
      dispatch({type:"LOGIN_SUCCESS",payload:res.data})
      navigateTo('/')
    }
    catch(e)
    {
      dispatch({type:"LOGIN_FAILURE",payload:e})
      // console.log(e)
      alert("Please check login credentials")
    }
    
  }

  const handleSubmit =(e) =>{
    e.preventDefault();
    login({email:email.current.value,password:password.current.value},dispatch)
    
  }
  // console.log(user)


  // const handleLogin = () =>{

   
  //   login()
  // }
  return (
    <div className='login'>
      <div className="logo-container">
          <img src="https://ik.imagekit.io/ksaehdhru/fb-removebg-preview_Q4Pu_nD6r.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668100631562" alt="facebook" />
      </div>
      <div className="form-container">
             <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="email" name="email" id="email" placeholder='Enter your email ' ref={email}/>
                <input type="password" name="password" id="password" placeholder='Enter your password' ref={password} required/>
              {/* <button className='login-btn' onClick={handleLogin}>Login</button> */}
              <button className='login-btn' disabled={isFetching}>{isFetching ? <CircularProgress color="secondary" /> : "Login"}</button>
              <p>You don't have an account ? <span><Link to="/register">Register</Link> here</span></p>
             </form>
      </div>
    </div>
  )
}

export default Login