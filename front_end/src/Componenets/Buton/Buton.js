import "./Buton.css";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
//import MapsUgcRoundedIcon from "@mui/icons-material/MapsUgcRounded";
import {BsMessenger} from "react-icons/bs";
export default function Buton() {
  return (
    <div className="buttocontainer">
       <Link to='/'><button className="envoimsgbtn">
        <div className="iconcontainer"> 
        <BsMessenger/>    
        </div>
       <div className="message">Envoyer Message</div>
      </button></Link>
    </div>
  );
}
