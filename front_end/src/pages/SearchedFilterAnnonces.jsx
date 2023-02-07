import React from 'react'
import { useParams } from 'react-router-dom'
import {useSearchParams} from "react-router-dom"

import { useState , useEffect } from 'react'
import { useCallback } from 'react'
import Annonces from '../Componenets/annonces/Annonces'
import Header from '../Componenets/header/Header'
import Categories from '../Componenets/categories/Categories'
import Footer from '../Componenets/Footer'
import { wilaya } from '../data/data'



const SearchedFilterAnnonces = () => {
  const [queryParameters] = useSearchParams()
  const categorie = queryParameters.get("categorie").length === 0 ? "" : queryParameters.get("categorie")
  const search = queryParameters.get("search").length === 0 ? "" : queryParameters.get("search")
  const types = queryParameters.get("type").length === 0 ? "" : queryParameters.getAll("type").join("%")
  const wilayas = queryParameters.get("wilaya") === null ? "" : queryParameters.getAll("wilaya").join("%")
  const communes = queryParameters.get("commune") === null ? "" : queryParameters.getAll("commune").join("%")

  const filter = "search="+search+"&"+"categorie="+categorie+"&"+"types="+types+"&"+"wilayas="+wilayas+"&"+"communes="+communes+"&"

  const [AnnoncesList, setAnnoncesList] = useState([])
  const getSearched = useCallback( async (filter) => {
    const result = await fetch('http://127.0.0.1:5000/annonces_search_filter/'+filter, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    const body = await result.json();
    setAnnoncesList(body);
  },[])
  useEffect(() => {
      getSearched(filter);
  },[filter]);


  return (
    <div>
      <Header/>
          <Categories/>
          <div>{wilayas}</div>
          <div>{filter}</div>
          <Annonces annonces = {AnnoncesList}/>
          <Footer/>
    </div>
  )
}

export default SearchedFilterAnnonces