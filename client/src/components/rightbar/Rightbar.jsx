import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import "./rightbar.scss"



const Rightbar = () => {

  const {user} = useContext(AuthContext)

  const [userFriends,setUserFriends] = useState([])
  // console.log(`/friends/${user._id}`)

  const [allUsers,setAllUsers] = useState([])


  //for fetching the users whom the user follows
  useEffect(()=>{
    const getFriends = async()=>{
      try
      {
        const friends = await axios.get(`/friends/${user._id}`)
        console.log(friends)
        setUserFriends(friends.data)
      }
      catch(e)
      {
        console.log(e)
      }
    }
    getFriends()
  },[user._id])


  //for fetching all users
useEffect(()=>{
  const getAllUsers = async()=>{
    try
    {
      const {data} = await axios.get(`/users/all`)
      setAllUsers(data)
      // (data.map(dat=>console.log(dat)))
      console.log(data)
    }
    catch(e)
    {
      console.log(e)
    }
  }
  getAllUsers()
},[])


  return (
    <div className='rightbar'>
        <div className="container">
          <div className="item">
            <span>Suggestions for you</span>
            {
              allUsers.map(eachUser=>(
                <div className="user" key={eachUser._id}>
                  <div className="user-info">
                          <img src={eachUser.profileImg} alt={eachUser._id} />
                          <span><Link to={`/profile/${eachUser._id}`} style={{textDecoration:"none",color:"#111"}}>{eachUser.userName}</Link></span>
                  </div>
                  <div className="buttons">
                    <button className="btn1">{eachUser.followers.includes(user._id) ? "Following" : "Follow"}</button>
                    <button className="btn2">Delete</button>
                  </div>
            </div>
              ))
            }
            
          </div>

          {/* <div className="activity">
            <span>Latest Activities</span>
            <div className="user">
                  <div className="user-info">
                          <img src="https://ik.imagekit.io/ksaehdhru/307977841_662929038534681_2223989801815955183_n_H6AfhQ-om.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1668182831059" alt="rishav" />
                          <span>Rishav </span>
                  </div>
                  <div className="buttons">
                    <p className="btn1">Married Urvashi</p>
                    <p className="btn2">1 min ago</p>
                  </div>
            </div>
            <div className="user">
                  <div className="user-info">
                          <img src="https://ik.imagekit.io/ksaehdhru/120140455_199201051565000_4857248505538955794_n_WqAM0WhzXE.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1668182844389" alt="ravi" />
                          <span>Ravi</span>
                  </div>
                  <div className="buttons">
                      <p className="btn1">got arrested</p>
                      <p className="btn2">1 min ago</p>
                  </div>
            </div>
            <div className="user">
                  <div className="user-info">
                          <img src="https://ik.imagekit.io/ksaehdhru/271702736_489151519241692_2266730039188606624_n_u2FtB2R7p.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1668182844409" alt="hrithik" />
                          <span>Hrithik</span>
                  </div>
                  <div className="buttons">
                      <p className="btn1">got bald</p>
                      <p className="btn2">3 min ago</p>
                  </div>
            </div>
            <div className="user">
                  <div className="user-info">
                          <img src="https://ik.imagekit.io/ksaehdhru/39034365_3438383092846169_1669016491_n_ngSZKFCOx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668183486234" alt="google" />
                          <span>Google</span>
                  </div>
                  <div className="buttons">
                      <p className="btn1">fired everyone</p>
                      <p className="btn2">5 min ago</p>
                  </div>
            </div>
          </div> */}
          <div className="online-friends" >
              <span>Online</span>
                {
                  userFriends.map(name=>(
                    <div className='eachFriend' key={name.userName}>
                          <div className="user">
                          <div className="user-details">
                              <img src={name.profileImg} alt={name.userName} />
                              <span><Link to={`/profile/${name._id}`}>{name.userName}</Link></span>
                          </div>
                          <div className="online"></div>
                          <button className="message">Message</button>
                          </div>
                    </div>
                  ))
                }
          </div>

        </div>
    </div>
  )
}

export default Rightbar