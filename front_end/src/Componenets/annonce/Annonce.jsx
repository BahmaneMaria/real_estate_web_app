import React from 'react'
import './annonce.css'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {AiOutlineClockCircle} from 'react-icons/ai'
import { useState, useEffect } from 'react'

const Annonce = (props) => {
    const [wilaya, setwilaya] = useState({nom:"tout"})

    const getwilaya = async () => {
        const result = await fetch('http://127.0.0.1:5000/getwilaya/'+props.annonce.id_wilaya, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const body = await result.json();
        setwilaya(body);
    }
    useEffect(() => {
        getwilaya();
    },[]);
  return (
      <div>
          <div className='annonce-container'>
              <div className='annonce-img'>
                  <img src={require("../../static/images/" + props.annonce.annonce_pic)} alt={"../../static/images/" + props.annonce.annonce_pic} />
              </div>
              <div className='annonce-info'>
                  <h4>{props.annonce.title}</h4>
                  <a className='annonce-surface'>{props.annonce.surface + " m²"}</a>
                  <div className='annonce-location'>
                      <FaMapMarkerAlt className='map-icon' />
                      <a>{wilaya.nom+" "+props.annonce.address}</a>
                  </div>
                  <div className='annonce-date'>
                      <AiOutlineClockCircle className='clock-icon' />
                      <a>{props.annonce.date_creation}</a>
                  </div>
                  <h3 className='annonce-price'>{props.annonce.prix + " Millions"}</h3>
              </div>
          </div>
      </div>
  )
}

export default Annonce