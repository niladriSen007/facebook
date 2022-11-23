import React, { useContext } from 'react'
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import "./share.scss"
import { AuthContext } from '../../context/authContext';
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { RiCalendarCheckLine } from 'react-icons/ri';

const Share = () => {

  let postDesc = useRef();

  const {user} = useContext(AuthContext)

  const [file,setFile] = useState();

  const handleSubmit= async(e) =>{
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc:postDesc.current.value,
    }
    if(file)
    {
      const data = new FormData();
      const newFileName = `/images/${file.name}`;
      data.append("file",file)
      data.append("name",newFileName)
      newPost.img = newFileName;
      // console.log(newPost)
      try
      {
          await axios.post("/upload",data)
      }
      catch(e)
      {
        console.log(e)
      }
    }
    try
    {
        //  console.log("Hiiiiiiii")
         const {data} = await axios.post("/posts",newPost)
        window.location.reload();
        // postDesc.current.value="";
        //  console.log(data)
         
    }
    catch(e)
    {
      // console.log((e))
      console.log(JSON.stringify(e))
    }
  }


  return (
    <div className='share'>
      <div className="top">
        <img src={user.profileImg} alt={user.userName} />
        <input type="text" name="share" id="share" placeholder={`What's on your mind, ${user.userName.split(" ")[0]}?`} ref={postDesc}/>
      </div>
      <form className="bottom" onSubmit={(e)=>handleSubmit(e)}>
         <label className="live" htmlFor='file'>
         <InsertPhotoOutlinedIcon  style={{color:"green"}}/>    
          <span>Photo/video</span>
          <input style={{display:"none"}} type="file" name="file" id="file" accept='.png,.jpeg,.jpg' onChange={(e)=>setFile(e.target.files[0])}/>
        </label>
        <div className="photo">
        <VideoCameraFrontOutlinedIcon style={{color:"red"}}/>
          <span>Live video</span>
        </div>
        <div className="feeling">
          <EmojiEmotionsOutlinedIcon  style={{color:"yellow"}}/>
          <span>Feeling/activity</span>
        </div>
        <div className="button">
          <button type='submit'>Post</button>
        </div>
      </form>
      {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelOutlinedIcon className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
    </div>
  )
}

export default Share