import React from 'react'

function Footer() {
    const divStyles = {
        fontfamily: 'Poppins'};
    
  return (
    <div style={{ justifyContent: 'center'}} className='bg-[#252525] mt-20  justify flex between items-center px-40 '>
    <ul className='flex gap-10 pb-40 pt-10  text-[#ffffff] text-1xl font-regular'>
        <li style={divStyles} ><b>LOGO</b></li>
        <li >Contactez-nous</li>
        <li >comment ca fonctionne</li>
        <li >A propre de nous</li>
    </ul>
</div>
  )
}

export default Footer