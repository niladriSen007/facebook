import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext';
// import {useHistory} from "react-router"
import "./register.scss"

const Register = () => {


  const navigateTo = useNavigate();

  const email = useRef();
  const password = useRef();
  const userName=useRef();
  const confirmPassword = useRef();
  // const history = useHistory()

  const {user,isFetching,error,dispatch} = useContext(AuthContext)

  const register = async(userCredentials,dispatch) =>{
    dispatch({type:"LOGIN_START"})
    try
    {
      const res = await axios.post("/register",userCredentials)
      // console.log(res.data)
      dispatch({type:"LOGIN_SUCCESS",payload:res.data})
      navigateTo('/login')
    }
    catch(e)
    {
      dispatch({type:"LOGIN_FAILURE",payload:e})
      alert("Please check your credentials");
    }
    
  }

  const handleSubmit =(e) =>{
    e.preventDefault();
    register({email:email.current.value,password:password.current.value,userName:userName.current.value,confirmPassword:confirmPassword.current.value},dispatch)
    
  }






  return (
    <div className='register'>
        <div className="logo-container">
            <img src="https://ik.imagekit.io/ksaehdhru/fb-removebg-preview_Q4Pu_nD6r.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668100631562" alt="facebook" />
        </div>
        <div className="form-container">
                <form onSubmit={(e)=>handleSubmit(e)}>
                      <input type="text" name="userName" id="userName"  placeholder='Enter your Username ' ref={userName}/>
                      <input type="email" name="email" id="email" placeholder='Enter your email ' ref={email}/>
                      <input type="password" name="password" id="password" placeholder='Enter  password' ref={password}/>
                      <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm  password' ref={confirmPassword}/>
                      {/* <input type="text" name="name" id="name" placeholder='Enter your name ' /> */}
                      <button className='register-btn' type="submit">Register</button>
                </form>
                <p>Already have an account? <span><Link to="/">Login</Link> </span>here</p>
        </div>
    </div>
  )
}

export default Register