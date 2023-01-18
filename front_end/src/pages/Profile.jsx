import React from "react";
import ProfileInfo from "../Componenets/ProfileInfo"
import ProfileContenu from "../Componenets/ProfileContenu"
import AnnonceSlider from "../Componenets/AnnonceSlider"

const Profile = () => {
  return (
    <div style={{ backgroundColor: "#f7f7f7" }}>
      <ProfileInfo />
      <ProfileContenu />
      <AnnonceSlider />
    </div>
  );
};

export default Profile;
