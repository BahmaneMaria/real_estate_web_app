import React from "react";
import styled from "styled-components";

import Avatar from "@mui/material/Avatar";
import SettingsIcon from "@mui/icons-material/Settings";
import { MailOutline } from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  border: 1px solid;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  padding: 10px;
  margin: 10px;
`;
const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  position: relative;
`;
const InfoContainer = styled.div`
  width: 50%;
`;
const InfoItem = styled.div`
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  color: white;
  background-color: #3346d3;
  border: none;
  border-radius: 14px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
`;
export default function ProfileInfo() {
  return (
    <Container>
      <AvatarContainer>
        <Avatar
          sx={{ width: 100, height: 100 }}
          src="https://ichef.bbci.co.uk/news/976/cpsprodpb/F382/production/_123883326_852a3a31-69d7-4849-81c7-8087bf630251.jpg"
        />
      </AvatarContainer>
      <InfoContainer>
        <InfoItem>
          Maria_bn
          <Button>modifier profile</Button>
          <Avatar sx={{ width: 30, height: 30 }}>
            <SettingsIcon />
          </Avatar>
          <Avatar sx={{ width: 30, height: 30 }}>
            <MailOutline />
          </Avatar>
        </InfoItem>
        <InfoItem>
          Nom:
          <label>Bahmane</label>
        </InfoItem>
        <InfoItem>
          Prenom:
          <label>Maria</label>
        </InfoItem>
        <InfoItem>
          Email:
          <label>km_bahmane@esi.dz</label>
        </InfoItem>
      </InfoContainer>
    </Container>
  );
}
