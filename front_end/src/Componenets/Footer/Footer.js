import "./Footer.css";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <div className="Containerfooter">
      <div className="rowfooter">
        <Typography className="titlefooter"> Logo</Typography>
      </div>
      <div className="rowfooter">
        <Typography className="titlefooter"> Contactez-nous</Typography>
      </div>
      <div className="rowfooter">
        <Typography className="titlefooter"> Comment ça fonctionne</Typography>
      </div>
      <div className="rowfooter">
        <Typography className="titlefooter"> A propos de nous</Typography>
      </div>
    </div>
  );
}
