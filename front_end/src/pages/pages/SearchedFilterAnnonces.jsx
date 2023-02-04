import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Routes,
  Route,
  useSearchParams,
  BrowserRouter, useLocation
} from "react-router-dom"

import { useState , useEffect } from 'react'
import { useCallback } from 'react'
import Annonces from '../components/annonces/Annonces'


const SearchedFilterAnnonces = () => {
  const [queryParameters] = useSearchParams()
  const categorie = queryParameters.get("categorie").length === 0 ? "" : queryParameters.get("categorie")
  const search = queryParameters.get("search").length === 0 ? "" : queryParameters.get("search")
  const types = queryParameters.get("type").length === 0 ? "" : queryParameters.getAll("type").join("%")
  const wilayas = queryParameters.get("wilaya") === null ? "" : queryParameters.getAll("wilaya").join("%")
  const communes = queryParameters.get("commune") === null ? "" : queryParameters.getAll("commune").join("%")

  const filter = "search="+search+"&"+"categorie="+categorie+"&"+"types="+types+"&"+"wilayas="+wilayas+"&"+"communes="+communes+"&"

  const [AnnoncesList, setAnnoncesList] = useState([])
  const getSearched = useCallback( async (search) => {
    const result = await fetch('http://127.0.0.1:5000/annonces_search_filter/'+filter.toLowerCase(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    const body = await result.json();
    setAnnoncesList(body);
  },[])
  useEffect(() => {
      getSearched(search);
  },[search]);


  return (
    <div>
      <Annonces annonces = {AnnoncesList}/>
    </div>
  )
}

export default SearchedFilterAnnonces