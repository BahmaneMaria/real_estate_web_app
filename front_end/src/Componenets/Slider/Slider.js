import { useEffect, useRef, useState } from "react";
import images from "./imagefolder";
import "./Slider.css";
import styled from "styled-components";
//import Slider from 'react-slick';


function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}


const Container = styled.div`
margin-top: 3rem;
    display: flex;
    flex-wrap: wrap; 
    flex-flow: wrap;
    justify-content:center;
    transition: var(--transition);
    margin:10px;
`;



 
export const Slider= ({TheAnnonce_id})  => {
  const images = importAll(require.context("../../pages/static/images", false, /\.(png|jpe?g|svg)$/));
  const caroussel = useRef();
  const [width, setWidth] = useState(0);


  const [Annonce_Pic, setAnnonce_Pic] = useState([])
  const Get_images = () =>{
    fetch('http://127.0.0.1:5000/Get_Images' , {
        method :'POST',
        body:JSON.stringify({
        Annonce_ID: TheAnnonce_id
        }), 
        header : { "Content-type": "application/json; charset=UTF-8"}
    }).then(response => response.json()).then (message => setAnnonce_Pic(message))}
    // Envoyer id de l'annonce au backend pour recuperer l'annonce
    useEffect(() => {
       Get_images();  
       setWidth(caroussel.current.scrollWidth - caroussel.current.offsetWidth);
    }, []);


    return (
      <div className="coureselparent">
        <x ref={caroussel} className="carousel">
          <x
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="inner-carousel"
          >
            {Annonce_Pic.map((Pic) => {
              return (
                <x className="item">
                  <img src={images[String(Pic.nom)]} alt={""} />
                </x>
              );
            })}
          </x>
        </x>
      </div>
    );
  }
  
