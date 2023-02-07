import React from 'react'
import { categorieList } from '../../data/data'
import '../annonces/annonces.css'
import {NavLink} from 'react-router-dom'
import { useState } from 'react'
import './categories.css'


const Categories = () => {
  const [categorieAfficher,setCategorieAfficher] = useState("Tout")
  return (
    
    <div className='annonces-categories'>
      <div>
        <h5>Explorez tout ce qui concerne l'immobilier</h5>
      </div>
        <ul>
          {categorieList.map((item, index) =>
          <li key={index}
            className={item === categorieAfficher ? "btn-cat-afficher" : "btn-cat"}
            onClick={() => {setCategorieAfficher(item)}} 
            >
            <NavLink to={item === "Tout"?'/home':'/categorie/'+item}>
            {item}
            </NavLink>
          </li>)}
          </ul>
    </div>
  )
}

export default Categories