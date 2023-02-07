import React from 'react'
import './navbar.css'
import {AiOutlineMenu} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import logo from '../../assets/logo.svg'

const Navbar = () => {
  return (
    <div className='navbar-container'>
        <div className='navbar-logo'><a href='#'><img src={logo} alt='logo'/></a></div>
        <div className='navbar-links'>
          <div className='navbar-profile'> <a href='#profile'><CgProfile className='icon'/></a></div>
          <div className='navbar-menu'> <a><AiOutlineMenu className='icon'/></a></div>
        </div>
    </div>
  )
}

export default Navbar