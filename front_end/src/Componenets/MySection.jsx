import React from 'react'

function MySection(props) {
    const buttonStyles = {
        boxShadow: '1px 2px 9px #D1D1D2',
      };
  return (
    
    <section className='pl-5 pb-20 pt-20  pr-5  '>
        <h1 className='text-[#3D3B40] pt-10 text-5xl text-center font-medium mb-2 '>Bienvenue</h1>
        <h1 className='text-[#3D3B40] text-5xl text-center font-medium '>sur <b className='text-5xl text-[#3346D3]'>APP NAME</b></h1>
         <p className='text-[#3D3B40] text-1xl text-center font-medium mt-10 '> Déposer vos annonces immobilières</p>
        <p className='text-[#3D3B40] text-1xl text-center font-medium mt-2 '> Trouver l'annonce qui correspond à vos besoins</p>
        <p className='text-[#3D3B40] text-1xl text-center font-medium mt-2 mb-10'> Contacter les annonceurs & consulter vos messages d'offre</p>
        <p className=' text-center' >
        <button style={buttonStyles} className=' bg-[#3346D3] text-white font-bold  px-4 py-2 
        rounded-md hover:bg-[#ffffff] hover:text-[#3346D3]' onClick={(e)=>props.auth(e)}>Commencer ICI</button>
       </p>
        
    </section>
  )
}

export default MySection