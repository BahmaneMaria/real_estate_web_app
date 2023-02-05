import "./Contact.css";
import "@material-ui/core";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {FaPhone ,FaSearchLocation, FaMailBulk} from 'react-icons/fa';
import {BsFillPersonFill} from "react-icons/bs";
import {MdAlternateEmail} from "react-icons/md";
import {ImLocation} from "react-icons/im";
import { useParams } from "react-router";
import APIService from "../APIService";
import { useEffect, useState } from "react";
//import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
//import PermContactCalendarRoundedIcon from "@mui/icons-material/PermContactCalendarRounded";
//import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
//import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";

export const Contact= ({TheAnnonce})  => {
  const { id } = useParams();

  const [Annonce, setAnnonce] = useState(
    {
      id: 0,
      id_categorie: 0,
      id_type_bien_immobilier: 0,
      surface: 0.0,
      prix: 0.0,
      id_commune: 0,
      address: '',
      description: '',
      date_creation: '',
      id_utilisateur: 0,
      num_tlp: '',
      nb: 0,
    }
  );
  const [user, setuser] = useState({
    id,
    nom: '',
    prenom: '',
    email: '',
    tlp: '',
    adr:'',
  });
  useEffect(() => {
    APIService.GetFullAnnonce(id).then(resp => {
      const a = {
        id: resp.id, id_categorie: resp.id_categorie,
        id_type_bien_immobilier: resp.id_type_bien_immobilier,
        surface: resp.surface,
        prix: resp.prix,
        id_commune: resp.id_commune,
        address: resp.address,
        description: resp.description,
        date_creation: resp.date_creation,
        id_utilisateur: resp.id_utilisateur,
        num_tlp: resp.num_tlp,
        nb: resp.nb,
      }; setAnnonce(a);APIService.GetUtilisateur(resp.id_utilisateur).then(resp => { const newuser = { id: resp.Id_User, nom: resp.Nom, prenom: resp.Prenom, email: resp.Email, tlp: resp.telephone,adr:resp.Adresse }; setuser(newuser);});
    });

  }, [id])
  return (
    <div className="container2">
      <div className="row2">
        <div className="titledescription2">
        <BsFillPersonFill/>
        </div>
        <Typography className="contentdescription2">{user.nom}</Typography>
      </div>
      <Divider />
      <div className="row2">
        <div className="titledescription2">
        <FaPhone/>
        </div>
        <Typography className="contentdescription2">{user.tlp}</Typography>
      </div>
      <Divider />
      <div className="row2">
        <div className="titledescription2">
        <MdAlternateEmail/>
        </div>
        <Typography className="contentdescription2">
        {user.email}
        </Typography>
      </div>
      <Divider />
      <div className="row2">
        <div className="titledescription2">
        <ImLocation/>
        </div>
        <Typography className="contentdescription2">
        {user.adr}
        </Typography>
      </div>
    </div>
  );
}
