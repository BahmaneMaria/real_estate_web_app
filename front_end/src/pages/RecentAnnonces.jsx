import React from 'react'
import Annonces from '../Componenets/annonces/Annonces'
import { useState , useEffect } from 'react'
import Header from '../Componenets/header/Header'
import Categories from '../Componenets/categories/Categories'
import Footer from '../Componenets/Footer'


const RecentAnnonces = () => {
    const [AnnoncesList, setAnnoncesList] = useState([])

    const getCategorie = async () => {
        const result = await fetch('http://127.0.0.1:5000/get_annonce', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const body = await result.json();
        setAnnoncesList(body);
    }
    useEffect(() => {
        getCategorie();
    },[]);

    return (
        <div>
          <Header/>
          <Categories/>
          <Annonces annonces = {AnnoncesList}/>
          <Footer/>
        </div>
    )
}

export default RecentAnnonces
