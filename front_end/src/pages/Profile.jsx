import React from "react";
import ProfileInfo from "../Componenets/ProfileInfo"
import ProfileContenu from "../Componenets/ProfileContenu"
import AnnonceSlider from "../Componenets/AnnonceSlider"
import Footer from "../Componenets/Footer"
import { useParams} from "react-router-dom";
import NavBar from "../Componenets/Navbar";

const Profile = () => {
  const { id } = useParams();
  return (
    <div style={{ backgroundColor: "#f7f7f7" }}>
      <NavBar id={id}/>
      <ProfileInfo />
      <ProfileContenu />
      <AnnonceSlider />
      <Footer/>
    </div>
  );
};

export default Profile;
