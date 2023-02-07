import React, { useState } from "react";
import './filter.css';
import Select from 'react-select';
import {GrClose} from 'react-icons/gr';
import {typeList,categorieList,wilaya} from '../../data/data'
import {useNavigate} from 'react-router-dom';


const Filter = (props) => {
  
  const [userWilayaChoice, setUserWilayaChoice] = useState([])
  const [userCommuneChoice, setUserCommuneChoice] = useState([])
  const [userCatChoice, setUserCatChoice] = useState(props.cat)
  const [userTypeChoice, setUserTypeChoice] = useState(["Tous les types"]);
  const [touschecked, settouschecked] = useState(true);
  var filter = "search="+props.search

  const [userFilter, setUserFilter] = useState({userTypeChoice, userWilayaChoice , userCommuneChoice})
  const navigate =  useNavigate();

    const submitHandler = (e) =>{
        e.preventDefault();
        const categories = "categorie=" + userCatChoice
        const types = userTypeChoice.map((item) => "type="+item).join("&")
        const wilayas = userWilayaChoice.map((item) => "wilaya="+item.value).join("&")
        const communes = userCommuneChoice.map((item) => "commune="+item).join("&")
        filter = filter+"&"+categories +"&" + types + "&" + wilayas + "&" + communes + "&" 
        navigate('/searchedfilter?'+filter);
    };

    // handle onChange event of the dropdown
    const handleChange = (e) => {
    setUserWilayaChoice(Array.isArray(e) ? e.map(x => x) : []);
    setUserCommuneChoice([])
    }
    const handleChangeCommunes = (e) => {
      setUserCommuneChoice(Array.isArray(e) ? e.map(x => x.value) : []);
    }


  // Add/Remove checked/unchecked item from list
  const handleCheck = (event) => {
    var updatedList = [...userTypeChoice];
    if (event.target.checked) {//checked
      updatedList = [...userTypeChoice, event.target.value];
      if (event.target.value === "Tous les types") {
        updatedList = [event.target.value];
        var x = document.getElementsByClassName("item");
        var i = 0
        for (i = 1; i < x.length; i++) {
          x[i].checked = false;
        }
        settouschecked(!touschecked)
      } else {
        if (touschecked) {
          var index = updatedList.indexOf("Tous les types")
          updatedList.splice(index, 1)
          x = document.getElementsByClassName("item");
          i = 0
          x[i].checked = false
          settouschecked(!touschecked)
        }
      }
    } else { //unchecked
      if (event.target.value === "Tous les types") {
        settouschecked(!touschecked)
      }
      updatedList.splice(userTypeChoice.indexOf(event.target.value), 1);
      if (updatedList.length === 0) {
        updatedList = ["Tous les types"]
        x = document.getElementsByClassName("item");
        i = 0
        x[i].checked = true
        settouschecked(!touschecked)
      }
    }
    setUserTypeChoice(updatedList);
  };

  return (
    <div className='filter-window'>
      <GrClose className="filter-close-btn" onClick={props.handleClose} />
      <h1>Filter</h1>
      <ul className='categories cat-filter'>
        {categorieList.map((item, index) =>
          <li key={index}
            className={item === userCatChoice ? "categorie-active" : ""}
            onClick={() => { setUserCatChoice(item) }}>{item}
          </li>)}
      </ul>
      <div className="filter-options-container">
        <div className="types-container">
          <h2 className="filter-title">Type de propriété</h2>
          <div className="types">
            {typeList.map((item, index) => (
              <div key={index}>
                <input value={item} type="checkbox" onChange={handleCheck} className='item' defaultChecked={item === 'Tous les types'} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="wilaya-container">
          <h2 className="filter-title">Wilaya</h2>
          <Select
            placeholder="N'importe quel"
            isMulti
            options={wilaya}
            className="basic-multi-select"
            classNamePrefix="select"
            value={wilaya.filter(obj => userWilayaChoice.includes(obj))} // set selected values
            onChange={handleChange} // assign onChange function
          />
          <div>
            wilaya:
          </div>
          <div>{JSON.stringify(userWilayaChoice, null, 2)}</div>
        </div>
        
        {userWilayaChoice.length === 1 ?
          <div className="commune-container">
            <h2 className="filter-title">Commune</h2>
            <Select
              placeholder="N'importe quel"
              isMulti
              options={userWilayaChoice[0].communes}
              className="basic-multi-select"
              classNamePrefix="select"
              value={userWilayaChoice[0].communes.filter(obj => userCommuneChoice.includes(obj.value))} // set selected values
              onChange={handleChangeCommunes} // assign onChange function
            />
            <div>
            wilaya:
          </div>
          <div>{JSON.stringify(userCommuneChoice, null, 2)}</div>
          </div>
          : null}
      </div>
      <div className="filter-search">
        <div className='search-btn-filter btn-blue ' onClick={submitHandler} >Search</div>
      </div>
    </div>

  );
}

export default Filter