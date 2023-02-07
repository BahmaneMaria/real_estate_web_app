import { useEffect, useRef, useState } from "react";
import "./Slider.css";
import { useParams } from "react-router";
import APIService from "../APIService";
 
export const Slider= ()  => {
  const caroussel = useRef();
  const [width, setWidth] = useState(0);
  const { id } = useParams();
  const [Annonce_Pic, setAnnonce_Pic] = useState([])

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
  const Get_images = (j) =>{
    for(let i=0;i<j;i++)
    {
      Annonce_Pic.push(`http://127.0.0.1:5000/getimage/${id}/${i}`);
    }  
    };
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
      }; setAnnonce(a);  Get_images(resp.nb);
      setWidth(caroussel.current.scrollWidth - caroussel.current.offsetWidth);
    });

  }, [])




    return (
      <div className="coureselparent">
        <x ref={caroussel} className="carousel">
          <x
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="inner-carousel"
          >
            {Annonce_Pic.map((image) => {
              return (
                <x className="items">
                  <img src={image} />
                </x>
            );}
            )}
          </x>
        </x>
      </div>
    );
  }
  
