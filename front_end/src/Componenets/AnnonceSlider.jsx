import React, { useEffect, useState } from "react";
import styled from "styled-components";
import APIService from "./APIService";
import Annonce from "./Annonce";
const Container = styled.div`
margin-top: 3rem;
    display: flex;
    flex-wrap: wrap; 
    flex-flow: wrap;
    justify-content:center;
    transition: var(--transition);
    margin:10px;
`;
export default function AnnonceSlider() {
  const [annonces, setannonces] = useState();
  const [user,setuser]=useState({
    id:0,
    nom:'',
    prenom:'',
    email:'',
    tlp:'',
  });
  useEffect(() => {
    APIService.GetUtilisateur().then(resp=>{const newuser={id:resp.id_User,nom:resp.Nom,prenom:resp.Prenom,email:resp.Email,tlp:resp.telephone};setuser(newuser);alert(resp.id_User);APIService.GetAnnonce(resp.id_User).then(res => setannonces(res)).catch(Error => console.log(Error));});
  },[])
  const deleteAnnonce=(annonce)=>{
    const new_annonces=annonces.filter((my_annonce)=>{
      if(my_annonce.id === annonce.id){
        return false
      }
      else{return true}
    })
    setannonces(new_annonces)
  }
  return (
    <Container>
      {
        annonces ? annonces.map((annonce) => {return (<Annonce annonce={annonce} key={annonce.id} deleteAnnonce={deleteAnnonce}/>); })
          : <img src="http://127.0.0.1:5000/getimage/0"/>}

    </Container>
    
  );
}
