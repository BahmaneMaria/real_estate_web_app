import React from 'react'
import { ReactDOM } from 'react'
import './header.css'
import {FiFilter,FiSearch} from 'react-icons/fi'
import {GoSettings} from 'react-icons/go'
import { useState, useEffect ,useRef} from 'react'
import Filter from '../filter/Filter'
import '../filter/filter.css'
import { typeList ,categorieList, wilaya,communesAlger} from '../../data/data'
import {useNavigate} from 'react-router-dom';
import APIService from '../APIService'

const Header = () => {

  const [filter_active, setFilter] = useState(false)
  const [userCatChoice,setUserCatChoice] = useState ("Tout")
  const [userResearch, setUserResearch] = useState("")

  const navigate =  useNavigate();

    const submitHandler = (e) =>{
        e.preventDefault();
        navigate('/searched/'+userResearch);
    };

  return (
    <div className='header-container'>
      {filter_active? 
        <div className="app"><Filter 
        handleClose={() => setFilter(!filter_active)} 
        cat={userCatChoice} search={userResearch}/></div>
      :null}

      <div className='header-img-container'>
        <h1>Trouver Votre Immobilier</h1>
        <div className='searchbar'>
          <div className='searchbar-categories'>
            <ul className='categories'>
              {categorieList.map((item,index)=> 
              <li key={index} 
              className={item===userCatChoice? "categorie-active":""} 
              onClick={()=>{setUserCatChoice(item)}}>{item}
              </li>)}
            </ul>   
          </div>
          <div className='searchbar-search'>
            <div className='search'>
              <FiSearch />
              <input type="text" placeholder='Votre recherche ici' value={userResearch} onChange={(event)=> {setUserResearch(event.target.value)}}/>
            </div>
            <div className='searchbar-btns'>
              <div className='filter-btn' onClick={() => setFilter(!filter_active)}>
                <GoSettings className='filter-icon'/>
                <a>Filter</a>
              </div>
              <div className='search-btn btn-blue' onClick={submitHandler}>
                Search
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header