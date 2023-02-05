import React from 'react'
import './annonces.css'
import { LockClockSharp, MapOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { useEffect } from 'react'
import APIService from './APIService'
import { useNavigate } from 'react-router'



function Annonce(props) {
  let nav = useNavigate();
  const [categorie, setcategorie] = useState();
  const [commune, setCommune] = useState();
  const [type_bien, settype_bien] = useState();
  useEffect(() => {
    APIService.GetCategorie(props.annonce.id_categorie).then(resp => setcategorie(resp.nom));
    APIService.GetType(props.annonce.id_type_bien_immobilier).then(resp => { settype_bien(resp.nom) });
    APIService.GetCommune(props.annonce.id_commune).then(resp => setCommune(resp.nom))
  }, [])

  const deleteAnnonce = (annonce) => {
    APIService.DeleteAnnonce(annonce.id).then(() => {props.deleteAnnonce(annonce);APIService.DeleteImages(annonce.id);})
  }
  return (
    <div className='annonce-container'>
      <div className='annonce-img'>{<img src={`http://127.0.0.1:5000/getimage/${props.annonce.id}/0`} />}</div>
      <div className='annonce-info'>
        <div style={{ fontSize: "17px", justifyContent: "space-between", marginTop: "5px" }}>
          <a className='annonce-surface'>{categorie} </a>
          <a className='annonce-surface'>{type_bien} </a>
          <a className='annonce-surface'>{commune} </a>
        </div>
        <div className='annonce-date'>
          <LockClockSharp className='clock-icon' />
          <a>Mise le {props.annonce.date_creation}</a>
        </div>
        <a className='annonce-surface'>{props.annonce.surface} m²</a>
        <h3 className='annonce-price'>{props.annonce.prix} da</h3>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{ fontSize: "17px", backgroundColor: "#3346d3", color: "white", border: "none", borderRadius: "15px", cursor: "pointer",padding:"5px",margin:"10px"  }}
          onClick={() => {deleteAnnonce(props.annonce) }}>
          Supprimer
        </button>
        <button
          style={{ fontSize: "17px", backgroundColor: "#3346d3", color: "white", border: "none", borderRadius: "15px", cursor: "pointer",padding:"5px",margin:"10px" }}
          onClick={() => {nav(`/Affichage/${props.annonce.id}`)}}>
          Afficher
        </button>
      </div>
    </div>);
}

export default Annonce