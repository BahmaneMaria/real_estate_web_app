import React from 'react'
import Annonces from '../Componenets/annonces/Annonces'

import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../Componenets/header/Header'
import Categories from '../Componenets/categories/Categories'
import Footer from '../Componenets/Footer'


const CategoriesAnnonces = () => {
  const [AnnoncesList, setAnnoncesList] = useState([])
  let params = useParams();

  const getCategorie = async (cat) => {
      const result = await fetch('http://127.0.0.1:5000//get_annonces_cat/'+cat+'/', {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
      });
      const body = await result.json();
      setAnnoncesList(body);
  }
  useEffect(() => {
      getCategorie(params.type);
  },[params.type]);

  return (
      <div>
          <Header/>
          <Categories/>
          <Annonces annonces = {AnnoncesList}/>
          <Footer/>
      </div>
  )
}

export default CategoriesAnnonces