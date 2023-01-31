import React from "react";
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
  return (
    <Container>
      <Item>
        <label>Mes annonces</label>
      </Item>
    </Container>
  );
}
