import './App.css';
import React, {useEffect,useState} from "react";
import Footer from "../Componenets/Footer/Footer";
import {Description} from "../Componenets/Description/Description";
import Buton from '../Componenets/Buton/Buton';
import {Contact} from '../Componenets/Contact/Contact';
import {Slider} from '../Componenets/Slider/Slider';
import {FaBeer} from 'react-icons/fa';
import Navbar from "../Componenets/Navbar";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
//import Page2 from "./page2";
//import Page3 from "./page3";


function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}



function Affichage() {
  const { id } = useParams();  
  const images = importAll(require.context("./static/images", false, /\.(png|jpe?g|svg)$/));

  const [Annonce, setAnnonce] = useState([])
  const send_to_back = () =>{
    fetch('http://127.0.0.1:5000/get_id' , {
        method :'POST',
        body:JSON.stringify({
            Annonce_ID : id
        }), 
        header : { "Content-type": "application/json; charset=UTF-8"}
    }).then(response => response.json()).then (message => setAnnonce(message))}
    // Envoyer id de l'annonce au backend pour recuperer l'annonce
    useEffect(() => {
       send_to_back();  
    }, [])  
    

  return ( 
    <div className="App"><Navbar />
      <div className="menu">
      
        <h2 className="title">{Annonce.ID}{Annonce.CATEGORIE} {Annonce.TYPE} {Annonce.WILAYA} {Annonce.COMMUNE}</h2>
        <Slider TheAnnonce_id={id}/>
        <h2 className="title">Description de l’annonce </h2>
        <Description TheAnnonce={Annonce}/>
        <h2 className="title">Contact et Coordonnées</h2>
        <Contact TheAnnonce={Annonce}/>
        <Buton />
      </div>
      <Footer />
    </div>
  ); 
}

export default Affichage;
