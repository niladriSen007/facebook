import React, { useContext, useState } from 'react'
import Post from '../post/Post';
import "./posts.scss"
import axios from "axios"
import { useEffect } from 'react';
import { AuthContext } from '../../context/authContext';


const Posts = ({userId}) => {

  const {user:LoginUser} = useContext(AuthContext)
  console.log(LoginUser._id)

      const [posts,setPosts] = useState([]);

      useEffect(()=>{
        const fetchPost = async()=>{
             const res = userId ? await axios.get(`/posts/profile/${userId}`) : await axios.get(`/posts/timeline/${LoginUser._id}`)
            //  console.log(data)
            setPosts(res.data.sort((p1,p2)=>{
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            }))
        }
        fetchPost()
      },[userId,LoginUser._id])


  return (
    <div className='posts'>
        {
            posts.map(post=>(
                <Post post={post} key={post._id}/>
            ))
        }
    </div>
  )
}

export default Posts