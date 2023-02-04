import React from 'react'
import Annonces from '../components/annonces/Annonces'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCallback } from 'react'


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
            <Annonces annonces = {AnnoncesList}/>
        </div>
    )
}

export default SearchedAnnonces