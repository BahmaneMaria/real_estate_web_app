import "./Description.css";
import "@material-ui/core";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export const Description= ({TheAnnonce})  => {
   
  return (
    <div className="container">
      <div className="row">
        <Typography className="titledescription">Identifiant</Typography>
        <Typography className="contentdescription">{TheAnnonce.ID}</Typography>
      </div>
      <Divider />
      <div className="row">
        <Typography className="titledescription">Catégorie</Typography>
        <Typography className="contentdescription">{TheAnnonce.CATEGORIE}</Typography>
      </div>
      <Divider />
      <div className="row">
        <Typography className="titledescription">Type du bien</Typography>
        <Typography className="contentdescription">{TheAnnonce.TYPE}</Typography>
      </div>
      <Divider />
      <div className="row">
        <Typography className="titledescription">Localisation</Typography>
        <Typography className="contentdescription">{TheAnnonce.COMMUNE}, {TheAnnonce.WILAYA}</Typography>
      </div>
      <Divider />
      <div className="row">
        <Typography className="titledescription">Surface</Typography>
        <Typography className="contentdescription">{TheAnnonce.SURFACE} m²</Typography>
      </div>
      <Divider />
      <div className="row">
        <Typography className="titledescription">Prix</Typography>
        <Typography className="contentdescription">{TheAnnonce.PRIX} DA</Typography>
      </div>
      <Divider />
      <div className="row">
        <Typography className="titledescription">Description</Typography>
        <Typography className="contentdescription">
        {TheAnnonce.DESCRIPTION}
        </Typography>
      </div>
    </div>
  );
}
