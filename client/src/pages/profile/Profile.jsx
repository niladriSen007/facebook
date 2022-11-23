import React, { useContext, useEffect, useRef } from 'react'
import "./profile.scss"
import {BiMessageRoundedDetail} from "react-icons/bi"
import {AiOutlineSearch,AiOutlineUserAdd} from "react-icons/ai"
import {RiUserFollowLine} from "react-icons/ri"
import Posts from '../../components/posts/Posts'
import { useState } from 'react'
import axios from 'axios'
import {useParams} from "react-router"
import { AuthContext } from '../../context/authContext'

// console.log(document.body.scrollWidth)

const Profile = () => {


  const {user : LoginUser,dispatch} = useContext(AuthContext)
  console.log(LoginUser)



  const params = useParams()
  const userId = params.id;

  const [user,setUser] = useState({})
  const following = useRef(0);
  const followers = useRef(0);


  const [isFollowReq,setIsFollowReq] = useState(LoginUser.followings.includes(user?._id))


  useEffect(()=>{
    setIsFollowReq(LoginUser.followings.includes(user?._id))
  },[LoginUser,user._id])


    //this useEffect is for fetching user data
  useEffect(()=>{
    const fetchPost = async()=>{
         const {data} = await axios.get(`/${userId}`)
         
        setUser(data)
        // console.log(data.followings.length)
        
        following.current = data.followings.length;
        followers.current = data.followers.length;
    }
    fetchPost()
  },[userId])




  const setSendFriendReq = async() =>{
    // setSendFollowReq(true)
      try
      {
         if(!isFollowReq)
            {
              const {data}= await axios.put(`/${user._id}/follow`,{userId:LoginUser._id})
              setIsFollowReq(true)
              dispatch({type:"FOLLOW",payload:user._id})
         console.log(data);
            }
            else
            {
              const {data}= await axios.put(`/${user._id}/unfollow`,{userId:LoginUser._id})
              setIsFollowReq(false)
              dispatch({type:"UNFOLLOW",payload:user._id})
          console.log(data);
            }
          
      }
      catch(e)
      {
        console.log(e)
      }
  }


  return (
    <div className='profile'>
        <div className="cover-img">
          <img   src={user.coverImg} alt="cover" />
        </div>
        <div className="details-container">
            <div className="profilePic">
              <img src={user.profileImg} alt="profile" />
            </div>
            <div className="follow">
              <h2>{user.userName}</h2>
              <p><span>{followers.current} { followers.current  !== 1 ? "followers" : "follower"}</span> <span>•</span> <span>{following.current} following</span></p>
            </div>
            <div className="buttons">    
              {(user._id !== LoginUser._id) ?  <button className='message'><BiMessageRoundedDetail /> Message</button>: ''}
             {(user._id !== LoginUser._id) ?  <button>{!isFollowReq  ? <AiOutlineUserAdd onClick={setSendFriendReq}/> : <RiUserFollowLine onClick={setSendFriendReq}/> } {isFollowReq ? "Following" : "Follow"}  </button>: ''}
              <button className='search'> <AiOutlineSearch /> Search</button>
            </div>
        </div>
       <div className="posts-container">
          <Posts userId = {`${userId}`}/>
       </div>
    </div>
  )
}

export default Profile