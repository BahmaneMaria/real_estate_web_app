import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import APIService from "./APIService";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  border: 1px solid;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  padding: 10px;
  margin: 20px 50px 20px 50px;
`;
const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;
const InfoContainer = styled.div`
  width: 50%;
`;
const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin:10px
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid;
  background-color: transparent;
  width: 75%;
`;
export default function ProfileInfo() {
  const { id } = useParams();
  const [num_tlp,setnum_tlp]=useState('');
  const [address,setaddress]=useState('');
  const [user, setuser] = useState({
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    tlp: '',
    img: '',
    adr: '',
  });
  const [state, setstate] = useState(false);
  useEffect(() => {
    APIService.GetUtilisateur(id).then(resp => { const newuser = { id: resp.id_User, nom: resp.Nom, prenom: resp.Prenom, email: resp.Email, tlp: resp.telephone, img: resp.Lien_Image, adr: resp.Adresse }; setuser(newuser); });
  }, [id, state])
  const clickHandel = () => {
    setstate(true);
  }
  const update = () => { setstate(false);APIService.UpdateUser(id,{address,num_tlp}).catch(Error=>console.log(Error));
     }
  return (
    <Container>
      <AvatarContainer>
        <Avatar
          sx={{ width: 120, height: 120 }}
          src={user.img}
        />
      </AvatarContainer>
      <InfoContainer>
        <InfoItem>
          {user.nom}
          <button style={{
            marginLeft: "40px", cursor: "pointer",
            backgroundColor: "#3346d3",
            border: "none",
            color: "white",
            borderRadius: "10px",
            padding: "2px",
            fontSize: "17px"
          }} onClick={clickHandel}>Modifier</button>
        </InfoItem>
        <InfoItem>
          <label style={{ marginRight: "10px" }}>Nom: </label>
          <label>{user.nom}</label>
        </InfoItem>
        <InfoItem>
          <label style={{ marginRight: "10px" }}>Adresse: </label>
          <label >{user.adr}</label>
        </InfoItem>
        <InfoItem>
          <label style={{ marginRight: "10px" }}>Téléphone: </label>
          <label>{user.tlp}</label>
        </InfoItem>
        <InfoItem>
          <label style={{ marginRight: "10px" }}>Email:</label>
          <label>{user.email}</label>
        </InfoItem>
        {state ?
          <InfoContainer>
            <InfoItem>
            <label style={{ marginRight: "10px" }}>Adresse: </label>
            <Input type="text" onChange={(e) => setaddress(e.target.value)} />
            </InfoItem>
            <InfoItem>
               <label style={{ marginRight: "10px" }}>Téléphone: </label>
              <Input type="tle"  onChange={(e) => setnum_tlp(e.target.value)} /></InfoItem>
            <InfoItem>
              <button style={{
              marginLeft: "40px", cursor: "pointer",
              backgroundColor: "#3346d3",
              border: "none",
              color: "white",
              borderRadius: "10px",
              padding: "2px",
              fontSize: "17px"
            }} onClick={update}>Enregistrer</button></InfoItem>
          </InfoContainer> : null
        }


      </InfoContainer>
    </Container>
  );
}
