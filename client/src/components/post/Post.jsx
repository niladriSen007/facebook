import React, { useEffect, useState } from 'react'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comments from '../comments/Comments';
import {format} from "timeago.js"
import "./post.scss"
import { Link } from 'react-router-dom';

// import {users} from "../../dummy.js"
import axios from 'axios';
const Post = ({post}) => {

    const [like,setLike] = useState(post.likes.length)
    const [liked,setLiked] = useState(false)
    const [showComment,setShowComment] = useState(false)

    const [user,setUser] = useState({})

    //this useEffect is for fetching user data
    useEffect(()=>{
        const fetchUser = async()=>{
             const res = await axios.get(`/${post.userId}`)
            //  console.log(res.data)
            setUser(res.data)
            // console.log(res.data)
        }
        fetchUser()
      },[post.userId])

      useEffect(()=>{
        setLiked(post.likes.includes(user._id) ? true : false)
      },[user._id,post.likes])

    const Like = async(state) =>{
        setLiked(state ? true :false)
        setLike(state ? like+1 : like -1)
        // console.log(post._id);
        // console.log(user._id)
        
        try
        {
            await axios.put(`/posts/${post._id}/like`,{userId:`${user._id}`})
            
        }
        catch(e)
        {
            console.log(e)
        }
        
    }


    const deletePost = async() =>{
        try
        {
            // console.log(post.userId)
            // console.log(user._id)
              const {data}= await axios.delete(`/posts/${post._id}/delete`,{userId:`${user._id}`})
            console.log(data);
        }
        catch(e)
        {
            console.log(e)
        }
    }
   
  return (
    <div className='post'>
        <div className="user">
            <div className="userInfo">
                <div className="userImg">
                    <img src={user.profileImg} alt={user.userName}/>
                </div>
                <div className="userName">
                    <Link to={`profile/${post.userId}`}><span>{user.userName}</span></Link>
                    <span>{format(post.createdAt)}</span>
                </div>
            </div>
            <div className="details">
                <MoreHorizIcon onClick={deletePost}/>
            </div>
        </div>
        <div className="content">
                <span>{post.desc}</span>
                <img src={post.img} alt={post.name} />
        </div>
        <div className="info">
            <div className="like">
                {!liked ? <FavoriteBorderOutlinedIcon  onClick={()=>Like(true)}/>  : <FavoriteOutlinedIcon  onClick={()=>Like(false)}/>}
                <span>{like} </span>
            </div>
            <div className="comment">
                    <TextsmsOutlinedIcon onClick={()=>setShowComment(!showComment)}/>
                    <span> {post.comment} Comment</span>
            </div>
            <div className="share1">
                <ShareOutlinedIcon />
                <span>Share</span>
            </div>
        </div>
        <div className="comment">
        {showComment && <Comments />}
        </div>
    </div>
  )
}

export default Post