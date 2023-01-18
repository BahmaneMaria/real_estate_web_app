import React from 'react'
import './annonces.css'
import { LockClockSharp, MapOutlined } from '@mui/icons-material'



const Annonce = ({annonce}) => {

  return (
            <div className='annonce-container'>
              <div className='annonce-img'><img src={`http://127.0.0.1:5000/getimage/${annonce.id}`} /></div>
              <div className='annonce-info'>
                <h4>{annonce.id}</h4>
                <a className='annonce-surface'>{annonce.surface} m²</a>
                <div className='annonce-location'>
                  <MapOutlined className='map-icon' />
                  <a>{annonce.id_commune}</a>
                </div>
                <div className='annonce-date'>
                  <LockClockSharp className='clock-icon' />
                  <a>il y a {annonce.date_creation} min</a>
                </div>
                <h3 className='annonce-price'>{annonce.prix} da</h3>
              </div>
            </div>);
}

export default Annonce