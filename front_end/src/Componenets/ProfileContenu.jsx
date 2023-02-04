import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  margin: 10px;
  display: flex;
  justify-content:center;
  align-items: center;
  padding: 20px;
`;
const Item = styled.div`
  display: flex;
  scale: 1.05;
  font-weight: bold;
  &:hover{scale: 1.5;
    transition: var(--transition);
    font-weight: bold;}
`;

export default function ProfileContenu() {
  let nav = useNavigate();
  const { id } = useParams();
  const clickHandel=()=>{
    nav(`/add/${id}`)
  }
  return (
    <Container>
      <Item>
        <label>Mes annonces</label>
      </Item>
        <button style={{
          marginLeft: "40px", cursor: "pointer",
          backgroundColor: "#3346d3",
          border: "none",
          color: "white",
          borderRadius: "10px",
          padding: "5px",
          fontSize:"17px"
        }} onClick={clickHandel}>Créer Annonce</button>
    </Container>
  );
}
