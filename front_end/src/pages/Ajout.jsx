import React, { useEffect, useState } from "react";
import APIService from "../Componenets/APIService";
import NouvelleAnnonce from "../Componenets/NouvelleAnnonce";
import Navbar from "../Componenets/Navbar";
import { useParams } from "react-router";
function Ajout() {
  const [wilayas, setwilayas] = useState();
  const [Categories,setcategories]=useState();
  const[type_bien,settype_bien]=useState();
  const { id } = useParams();
  useEffect(() => {
    APIService.GetWilayas().then(resp=>setwilayas(resp)).catch(error=>console.log(error));
    APIService.GetTypeBienImmobilier().then(resp=>settype_bien(resp)).catch(error=>console.log(error));
    APIService.GetCategories().then(resp=>setcategories(resp)).catch(error=>console.log(error));
  }, [])
  return (
    
     <><Navbar id={id}/>
     <div style={{ backgroundColor: "#f7f7f7" }}>
      <NouvelleAnnonce wilayas={wilayas} type_bien={type_bien} Categories={Categories} />
    </div></>
  );
};

export default Ajout;