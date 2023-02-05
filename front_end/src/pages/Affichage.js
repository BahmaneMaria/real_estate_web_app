import './App.css';
import React, { useEffect, useState } from "react";
import Footer from "../Componenets/Footer/Footer";
import { Description } from "../Componenets/Description/Description";
import Buton from '../Componenets/Buton/Buton';
import { Contact } from '../Componenets/Contact/Contact';
import { Slider } from '../Componenets/Slider/Slider';
import { FaBeer } from 'react-icons/fa';
import Navbar from "../Componenets/Navbar";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useNavigate } from "react-router-dom";
import APIService from '../Componenets/APIService';
//import Page2 from "./page2";
//import Page3 from "./page3";




function Affichage() {
  const { id } = useParams();
  let nav = useNavigate();

  const [Annonce, setAnnonce] = useState(
    {
      id: 0,
      id_categorie: 0,
      id_type_bien_immobilier: 0,
      surface: 0.0,
      prix: 0.0,
      id_commune: 0,
      address: '',
      description: '',
      date_creation: '',
      id_utilisateur: 0,
      num_tlp: '',
      nb: 0,
    }
  );
  const [categorie, setcategorie] = useState();
  const [commune, setCommune] = useState();
  const [wilaya, setwilaya] = useState();
  const [type_bien, settype_bien] = useState();
  useEffect(() => {
    APIService.GetFullAnnonce(id).then(resp => {
      const a = {
        id: resp.id, id_categorie: resp.id_categorie,
        id_type_bien_immobilier: resp.id_type_bien_immobilier,
        surface: resp.surface,
        prix: resp.prix,
        id_commune: resp.id_commune,
        address: resp.address,
        description: resp.description,
        date_creation: resp.date_creation,
        id_utilisateur: resp.id_utilisateur,
        num_tlp: resp.num_tlp,
        nb: resp.nb,
      }; setAnnonce(a);APIService.GetCategorie(resp.id_categorie).then(res => setcategorie(res.nom));
      APIService.GetType(resp.id_type_bien_immobilier).then(res => { settype_bien(res.nom) });
      APIService.GetCommune(resp.id_commune).then(res => {setCommune(res.nom);APIService.GetWilaya(res.wilaya_id).then(r=>setwilaya(r.nom))}) 
      
    });

  }, [id])


  return (
    <div className="App"><Navbar id={Annonce.id_utilisateur} />
      <div className="menu">

        <h2 className="title">{Annonce.id} {categorie} {type_bien} {wilaya} {commune}</h2>
        <Slider TheAnnonce_id={id} nb={Annonce.nb} />
        <h2 className="title">Description de l’annonce </h2>
        <Description TheAnnonce={Annonce} />
        <h2 className="title">Contact et Coordonnées</h2>
        <Contact TheAnnonce={Annonce} />
      </div>
      <Footer />
    </div>
  );
}

export default Affichage;
