import React, {useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function Page3(){
  // Donner une valeur au id de l'annonce
  const id=2;
  return (
    <><h1>Page Recherche</h1>
    <p>Afficher les details de l'annonce avec id = {id} </p>
  
    <Link to={`/Affichage/${id}`}><button >Afficher Annonce</button></Link>
       </>
    // aller a page 2 ou on affiche l'annonce a partir de son id   
  );
}
export default Page3;
