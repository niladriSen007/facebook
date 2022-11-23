import { useContext, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import "./comments.scss"
const comments = [
    {
      id: 1,
      desc: "💙💙💙",
      name: "Mrinal",
      userId: 1,
      profilePicture:
        "https://ik.imagekit.io/ksaehdhru/273364330_1532570477118161_3894044405618514382_n__jP0G3XVP.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1668187553601",
    },
    {
      id: 2,
      desc: "So Good  ",
      name: "Mrinal's wife",
      userId: 2,
      profilePicture:
        "https://ik.imagekit.io/ksaehdhru/313375301_1490408928110242_4711694325550971081_n_OW1MXTrCQ.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1668187553459",
    },
  ];

 


const Comments = () => {

    const {user} = useContext(AuthContext);

    const comment = useRef("")

    // const handleSubmit =(e) =>{
    //   e.preventDefault();
    //   const newComment = {
    //     id:comments.length,
    //     desc:comment.current.value,
    //     name:user.userName,
    //     userId:user._id,
    //     profilePicture:user.profileImg,
    //   }
    //   comments.push(newComment)
    //   comment.current.value =""
    // }


  return (
    <div className='comments'>
          <form className="comment-box" >
                        <img src={user.profileImg} alt="niladri" />
                        <input type="text" name="comment" id="comment" placeholder="Write a comment" ref={comment.current.value}/>
                        <button type="submit">send</button>
          </form>
        {
            comments.map(comment=>(
                <div className="comment" key={comment.id}>
                    <div className="user-comment">
                        <img src={comment.profilePicture} alt="comment" />
                        <span>{comment.name}</span>
                        <span>{comment.desc}</span>
                    </div>
                    <div className="time">
                        <span className="timeText">an hour ago</span>
                    </div>
            </div>
            ))
        }
    </div>
  )
}

export default Comments