import React, { useContext, useState } from 'react'
import "./navbar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {

  const {user} = useContext(AuthContext)

  return (
    <nav className='navbar'>
      <section className="left">
            <Link to="/"><span>facebook</span></Link>
            <HomeOutlinedIcon />
            {/* <DarkModeOutlinedIcon /> */}
            <GridViewOutlinedIcon />
      </section>
      <section className="center">
        <SearchOutlinedIcon />
        <input type="text" name="search" id="search" placeholder='Search'/>
      </section>
      <section className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <span><Link to={"/login"} style={{textDecoration:"none",color:"#111",fontWeight:"600"}}>Logout</Link></span>
        <div className="user-container">
          <img src={user.profileImg} alt="user" />
          <span>{user.userName}</span>
        </div>
      </section>
    </nav>
  )
}

export default Navbar