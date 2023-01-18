import React from "react";
import styled from "styled-components";
const Container = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const Item = styled.div`
  display: flex;
  &:hover{scale: 1.05;
    transition: var(--transition);
    font-weight: bold;
`;

export default function ProfileContenu() {
  return (
    <Container>
      <Item>
        <label>Mes annonces</label>
      </Item>
      <Item>
        <label>Mes enregistrements</label>
      </Item>
      <Item>
        <label>Mes commandes</label>
      </Item>
    </Container>
  );
}
