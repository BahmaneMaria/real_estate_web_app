import React from 'react'
import Annonces from '../Componenets/annonces/Annonces'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCallback } from 'react'
import Header from '../Componenets/header/Header'
import Categories from '../Componenets/categories/Categories'
import Footer from '../Componenets/Footer'
import NoResultFound from './NoResultFound'
import { positions } from '@mui/system'



const SearchedAnnonces = () => {

    const [AnnoncesList, setAnnoncesList] = useState([])
    let params = useParams();

    const getSearched = useCallback( async (search) => {
        const result = await fetch('http://127.0.0.1:5000/annonces_search/'+search, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const body = await result.json();
        setAnnoncesList(body);
    },[])
    useEffect(() => {
        getSearched(params.search);
    },[params.search]);

    return (
        <div>
          <Header/>
          <Categories/>
          <div>
          { AnnoncesList.length === 0 ? <NoResultFound />: <Annonces annonces = {AnnoncesList}/>  }
          </div>
          <Footer/>
        </div>
    )
}

export default SearchedAnnonces