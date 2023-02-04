import React from 'react'
import Annonces from '../components/annonces/Annonces'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'

const CategoriesAnnonces = () => {
  const [AnnoncesList, setAnnoncesList] = useState([])
  let params = useParams();

  const getCategorie = async (cat) => {
      const result = await fetch('http://127.0.0.1:5000/get_annonce/categorie/'+cat, {
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
          <Annonces annonces = {AnnoncesList}/>
      </div>
  )
}

export default CategoriesAnnonces