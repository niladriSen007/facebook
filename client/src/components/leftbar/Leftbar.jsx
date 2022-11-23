import React, { useContext } from 'react'
import "./leftbar.scss";
import FriendsImg from "../../assets/1.png";
import GroupsImg from "../../assets/2.png";
import MarketImg from "../../assets/3.png";
import WatchImg from "../../assets/4.png";
import MemoriesImg from "../../assets/5.png";
import EventsImg from "../../assets/6.png";
import GamingImg from "../../assets/7.png";
import GalleryImg from "../../assets/8.png";
import VideosImg from "../../assets/9.png";
import MessagesImg from "../../assets/10.png";
import TutorialsImg from "../../assets/11.png";
import CoursesImg from "../../assets/12.png";
import FundImg from "../../assets/13.png";
import { AuthContext } from '../../context/authContext';

const menu1=[
  {
    imgUrl:EventsImg,
    text:"Events",
  },
  {
    imgUrl:GamingImg,
    text:"Gaming",
  },
  {
    imgUrl:GalleryImg,
    text:"Gallery",
  },
  {
    imgUrl:VideosImg,
    text:"Videos",
  },
  {
    imgUrl:MessagesImg,
    text:"Messages",
  }
]



const menu2=[
  {
    imgUrl:FriendsImg,
    text:"Friends",
  },
  {
    imgUrl:GroupsImg,
    text:"Groups",
  },
  {
    imgUrl:MarketImg,
    text:"Market",
  },
  {
    imgUrl:WatchImg,
    text:"Watch",
  },
  {
    imgUrl:MemoriesImg,
    text:"Memories",
  }
]

const menu3=[
  {
    imgUrl:FundImg,
    text:"Fund",
  },
  {
    imgUrl:TutorialsImg,
    text:"Tutorials",
  },
  {
    imgUrl:CoursesImg,
    text:"Courses",
  }
]


const Leftbar = () => {

  const {user} = useContext(AuthContext)
  return (
    <div className='leftbar'>
        <div className="container">
          <div className="menu">
            <div className="user">
                <img src={user.profileImg} alt="user" />
                <span>{user.userName}</span>
            </div>
           
           {
              menu1.map(eachMenu=>(
                <div className='item' key={eachMenu.text}>
                  <img src={eachMenu.imgUrl} alt={eachMenu.text} />
                  <span>{eachMenu.text}</span>
                </div>
              ))
            }
           </div>
           <hr />
          
          <div className="menu">
           {
              menu2.map(eachMenu=>(
                <div className='item' key={eachMenu.text}>
                  <img src={eachMenu.imgUrl} alt={eachMenu.text} />
                  <span>{eachMenu.text}</span>
                </div>
              ))
            }
           </div>
           <hr />
           <div className="menu">
           {
              menu3.map(eachMenu=>(
                <div className='item' key={eachMenu.text}>
                  <img src={eachMenu.imgUrl} alt={eachMenu.text} />
                  <span>{eachMenu.text}</span>
                </div>
              ))
            }
           </div>
        </div>
    </div>
  )
}

export default Leftbar