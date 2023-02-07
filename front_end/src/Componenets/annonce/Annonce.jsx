import React from 'react'
import './annonce.css'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {AiOutlineClockCircle} from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Annonce = (props) => {
    const [wilaya, setwilaya] = useState({nom:""})
    const [commune, setcommune] = useState({nom:""})

    const getwilaya = async () => {
        const result = await fetch('http://127.0.0.1:5000/getwilayacommune/'+props.annonce.id_commune, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const body = await result.json();
        setwilaya(body);
    }

    const getcommune = async () => {
        const result = await fetch('http://127.0.0.1:5000/getcommune/'+props.annonce.id_commune, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const body = await result.json();
        setcommune(body);
    }
    useEffect(() => {
        getwilaya();
        getcommune()
    },[]);
  return (
      <div>
          <Link className='annonce-container' to={"/Affichage/"+props.annonce.id}>
              <div className='annonce-img'>
                {<img src={`http://127.0.0.1:5000/getimage/${props.annonce.id}/0`} />}
              </div>
              <div className='annonce-info'>
                  <h4>{props.annonce.description}</h4>
                  <a className='annonce-surface'>{props.annonce.surface + " m²"}</a>
                  <div className='annonce-location'>
                      <FaMapMarkerAlt className='map-icon' />
                      <a>{wilaya.nom+", "+commune.nom+", "+props.annonce.address}</a>
                  </div>
                  <div className='annonce-date'>
                      <AiOutlineClockCircle className='clock-icon' />
                      <a>{props.annonce.date_creation}</a>
                  </div>
                  <h3 className='annonce-price'>{props.annonce.prix + " Millions"}</h3>
              </div>
          </Link>
      </div>
  )
}

export default Annonce