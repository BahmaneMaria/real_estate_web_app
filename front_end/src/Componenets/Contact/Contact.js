import "./Contact.css";
import "@material-ui/core";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {FaPhone ,FaSearchLocation, FaMailBulk} from 'react-icons/fa';
import {BsFillPersonFill} from "react-icons/bs";
import {MdAlternateEmail} from "react-icons/md";
import {ImLocation} from "react-icons/im";
//import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
//import PermContactCalendarRoundedIcon from "@mui/icons-material/PermContactCalendarRounded";
//import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
//import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";

export const Contact= ({TheAnnonce})  => {
  return (
    <div className="container2">
      <div className="row2">
        <div className="titledescription2">
        <BsFillPersonFill/>
        </div>
        <Typography className="contentdescription2">{TheAnnonce.Nom}</Typography>
      </div>
      <Divider />
      <div className="row2">
        <div className="titledescription2">
        <FaPhone/>
        </div>
        <Typography className="contentdescription2">{TheAnnonce.telephone}</Typography>
      </div>
      <Divider />
      <div className="row2">
        <div className="titledescription2">
        <MdAlternateEmail/>
        </div>
        <Typography className="contentdescription2">
        {TheAnnonce.Email}
        </Typography>
      </div>
      <Divider />
      <div className="row2">
        <div className="titledescription2">
        <ImLocation/>
        </div>
        <Typography className="contentdescription2">
        {TheAnnonce.COMMUNE_annonceur} , {TheAnnonce.WILAYA_annonceur}
        </Typography>
      </div>
    </div>
  );
}
