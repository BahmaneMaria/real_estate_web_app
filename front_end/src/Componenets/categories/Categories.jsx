import React from 'react'
import { categorieList } from '../../data/data'
import '../annonces/annonces.css'
import {NavLink} from 'react-router-dom'
import { useState } from 'react'


const Categories = () => {
  const [categorieAfficher,setCategorieAfficher] = useState("Tout")
  return (
    <div className='annonces-categories'>
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