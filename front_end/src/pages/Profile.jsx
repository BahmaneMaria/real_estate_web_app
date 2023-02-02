import React from "react";
import ProfileInfo from "../Componenets/ProfileInfo"
import ProfileContenu from "../Componenets/ProfileContenu"
import AnnonceSlider from "../Componenets/AnnonceSlider"
import { useParams} from "react-router-dom";
import NavBar from "../Componenets/Navbar";

const Profile = () => {
  const { id } = useParams();
  return (
    <div style={{ backgroundColor: "#f7f7f7" }}>
      <NavBar/>
      <div>{id}</div>
      <ProfileInfo />
      <ProfileContenu />
      <AnnonceSlider />
    </div>
  );
};

export default Profile;
