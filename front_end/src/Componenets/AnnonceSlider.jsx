import React, { useEffect, useState } from "react";
import styled from "styled-components";
import APIService from "./APIService";
import Annonce from "./Annonce";
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;
export default function AnnonceSlider() {
  const [annonces, setannonces] = useState();
  useEffect(() => {
    APIService.GetAnnonce().then(resp => setannonces(resp)).catch(Error => console.log(Error));
  }, [])
  return (
    <Container>
      {
        annonces ? annonces.map((annonce) => { return (<Annonce annonce={annonce} key={annonce.id} />) })
          : null}
    </Container>
  );
}
