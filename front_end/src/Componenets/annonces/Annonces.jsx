import React from 'react'
import './annonces.css'
import { useState , useEffect } from 'react'
import Annonce from '../annonce/Annonce'






const Annonces = (props) => {
 
  return (
    <div className='annonces'>


        <div className='annonces-container'>
          {props.annonces.map((item,index)=>
            <Annonce key = {index} annonce = {item}/>
          )}
        </div>
    </div>
  )
}

export default Annonces