import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useNavigate } from "react-router-dom";
import { AddCircleOutline, HomeOutlined } from "@material-ui/icons";
const Container = styled.div`
  height: 40px;
  background-color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.14);
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Logo = styled.img`
  width: 10%;
  height: 10%;
  object-fit: cover;
`;
const AppName = styled.h1`
  font-weight: bold;
  margin-left: 10px;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const MenuItem = styled.div`
  cursor: pointer;
  margin-left: 25px;
`;

export default function Navbar({id}) {
  let nav = useNavigate();
  return (
    <Container>
      <Left>
        <Logo src="https://www.hicom.fr/wp-content/uploads/2017/09/Logo_TV_2015.png" />
        <AppName>RealEstate</AppName>
      </Left>
      <Right>
        <MenuItem>
        <Link to="/home"><HomeOutlined fontSize="large" /></Link>
            
        </MenuItem>
        <MenuItem>
          <Link to="/">
            <MenuIcon fontSize="large" />
          </Link>
        </MenuItem>
      </Right>
    </Container>
  );
}
