import React from 'react'
import {ImGoogle3} from "react-icons/im";
function NavBar() {
  const buttonStyles = {
    boxShadow: '1px 2px 5px #D1D1D2',
    display : 'flex',
  };
  return (
    <nav  className='flex justify-between items-center px-20  pt-5   '>
        <header className=' text-2xl font-extrabold text-[#3D3B40] font-bold text-lg '>LOGO HERE</header>
        <button style={buttonStyles} className=' bg-[#3346D3] text-white font-bold px-4 py-2
        rounded-lg hover:bg-[#fcfcfc] hover:text-[#3346D3] justify-between '> <div className='pr-2 pt-1 flex'><ImGoogle3/>
        </div><div >Se connecter</div>
      </button>
    </nav>
  )
}

export default NavBar