import React from 'react'
import Annonces from '../components/annonces/Annonces'
import { useState , useEffect } from 'react'


const RecentAnnonces = () => {
    const [AnnoncesList, setAnnoncesList] = useState([])

    const getCategorie = async () => {
        const result = await fetch('http://127.0.0.1:5000/get_annonces', {
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
            <Annonces annonces = {AnnoncesList}/>
        </div>
    )
}

export default RecentAnnonces


 /*const fetchData = async () => {
    try {
     const result = await fetch('http://127.0.0.1:5000/get_annonce', {
        method: "GET",
        headers: {
             "Content-Type": "application/json"
        },
      });
     const body = await result.json();
     setAnnoncesList(body);
    } catch(err) {
      console.log(err)
    } 
  }*/




  /*useEffect(() => {
    const fetchData = async () => {
       const result = await fetch('http://127.0.0.1:5000/get_annonce', {
          method: "GET",
          headers: {
               "Content-Type": "application/json"
          },
        });
       const body = await result.json();
       setAnnoncesList(body);      
    }

    fetchData()
    },[])*/

    /*

    import { categorieList } from '../../data/data'
import {useParams} from 'react-router-dom';


     let params = useParams();

  const [categorieAfficher,setCategorieAfficher] = useState("Tout")
    <div className='annonces-categories'>
          <h2>Explorez tout ce qui concerne l'immobilier</h2>
          <ul>
          {categorieList.map((item, index) =>
          <li key={index}
            className={item === categorieAfficher ? "btn-cat-afficher" : "btn-cat"}
            onClick={() => { setCategorieAfficher(item);
            getCategorie("categorie") }}>
              {item}
          </li>)}
          </ul>
        </div>*/

  /*
  <div className='annonces'>


        <div className='annonces-container'>
        {props.annonces.map((item,index)=>
            <div key={index} className='annonce-container'>
              <Annonce annonce = {item}/>
            </div>
          )}
        </div>
    </div>
     */
