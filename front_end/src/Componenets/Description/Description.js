import "./Description.css";
import "@material-ui/core";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import APIService from "../APIService";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const Description= ({TheAnnonce})  => {
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
  const [categorie, setcategorie] = useState();
  const [commune, setCommune] = useState();
  const [type_bien, settype_bien] = useState();
  const [wilaya, setwilaya] = useState();
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
      }; setAnnonce(a);APIService.GetCategorie(resp.id_categorie).then(res => setcategorie(res.nom));
      APIService.GetType(resp.id_type_bien_immobilier).then(res => { settype_bien(res.nom) });
      APIService.GetCommune(resp.id_commune).then(res => {setCommune(res.nom);APIService.GetWilaya(res.wilaya_id).then(r=>setwilaya(r.nom))}) 
    });

  }, [id])
   
  return (
    <div className="container">
      <div className="row">
        <Typography className="titledescription">Identifiant</Typography>
        <Typography className="contentdescription">{Annonce.id}</Typography>
      </div>
      <Divider />
      <div className="row">
        <Typography className="titledescription">Catégorie</Typography>
        <Typography className="contentdescription">{categorie}</Typography>
      </div>
      <Divider />
      <div className="row">
        <Typography className="titledescription">Type du bien</Typography>
        <Typography className="contentdescription">{type_bien}</Typography>
      </div>
      <Divider />
      <div className="row">
        <Typography className="titledescription">Localisation</Typography>
        <Typography className="contentdescription">{commune}, {wilaya}</Typography>
      </div>
      <Divider />
      <div className="row">
        <Typography className="titledescription">Surface</Typography>
        <Typography className="contentdescription">{Annonce.surface} m²</Typography>
      </div>
      <Divider />
      <div className="row">
        <Typography className="titledescription">Prix</Typography>
        <Typography className="contentdescription">{Annonce.prix} DA</Typography>
      </div>
      <Divider />
      <div className="row">
        <Typography className="titledescription">Description</Typography>
        <Typography className="contentdescription">
        {Annonce.description}
        </Typography>
      </div>
    </div>
  );
}
