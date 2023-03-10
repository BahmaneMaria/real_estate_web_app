import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import APIService from "./APIService";
const Container = styled.div`
  background-color: transparent;
  border: 1px solid;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
`;
const TitreAnnonce = styled.h1`
  top: 0;
  left: 0;
  font-size: 22px;
`;
const AnnonceContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
`;
const CoteImage = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid;
  flex-direction: column;
  height: 100vh;
`;
const Form = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  padding: 10px;
  height: 100vh;
  overflow: auto;
`;
const FormItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  width:100%
`;
const Titre = styled.div`margin-right:10px ;
font-size: 17px;`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid;
  background-color: transparent;
  width: 75%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border: 1px solid;
  object-fit: cover;
`;
const Button = styled.button`
  cursor: pointer;
  background-color: #3346d3;
  border: none;
  color: white;
  border-radius: 10px;
  padding:5px
`;
const NouvelleAnnonce = (props) => {
  const { id } = useParams();
  const [wilaya, setwilaya] = useState();
  const [images, setimages] = useState([]);
  const [communes, setcommunes] = useState();
  const [categorie, setcategorie] = useState('');
  const [type_bien, settype_bien] = useState('_ _ _');
  const [commune, setCommune] = useState('');
  const [address, setaddress] = useState();
  const [description, setdesc] = useState();
  const [num_tlp, setnum_tlp] = useState();
  const [prix, setprix] = useState();
  const [surface, setsurface] = useState();
  const [idw, setid] = useState(1);
  const [user, setuser] = useState({
    id,
    nom: '',
    prenom: '',
    email: '',
    tlp: '',
  });
  const [nb_images,set_nb_images]=useState(0);
  let nav = useNavigate();
  useEffect(() => {
    APIService.GetCommunes(idw).then(resp => setcommunes(resp)).catch(Error => console.log(Error));
    APIService.GetUtilisateur(id).then(resp => { const newuser = { id: resp.Id_User, nom: resp.Nom, prenom: resp.Prenom, email: resp.Email, tlp: resp.telephone }; setuser(newuser); setnum_tlp(user.tlp); });
  }, [idw,nb_images])
  const addAnnonce = () => {
    const id_user = user.id;
    APIService.AddAnnonce({ address, description, id_user, categorie, commune, type_bien, num_tlp, prix, surface,nb_images}).then(resp => {
      if (images.length > 0) {
        images.forEach((image, i) => {
          const data = new FormData();
          data.append("pic", image, image.name);
          APIService.AddImage(data, resp.id,i);
        });
      };
      nav(`/profile/${user.id}`);
    }).catch(Error => alert("Erreur: Veuillez remplire ce qui manque"));;

  }

  return (
    <Container>
      <TitreAnnonce>Nouvelle Annonce</TitreAnnonce>
      <AnnonceContainer>
        <CoteImage>
          <Titre>Ajouter des photos</Titre>
          <input
            name="pic"
            id="imgInput"
            type="file"
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            onChange={(event) => {
              images.push(event.target.files[0])
              set_nb_images(images.length);
            }}
          />
          <Button>
            <label htmlFor="imgInput">Importer</label>
          </Button>
          {images.length > 0 ? <div style={{ display: "flex", width: "100%", height: "75%", overflow: "auto", margin: "10px" }}>{images && images.map((image) => { return <Image src={URL.createObjectURL(image)} /> })}</div> : null}
        </CoteImage>
        <Form>
          <FormItem>
            <Titre>Information annonce :</Titre>
          </FormItem>
          <FormItem>
            <Titre>Cat??gorie :</Titre>
            <select value={categorie} style={{borderBottom:" 1px solid"}} onChange={(e) => { setcategorie(e.target.value) }}>
              {
                props.Categories && props.Categories.map((categorie) => {
                  return (
                    <option key={categorie.id}>{categorie.nom}</option>
                  )
                })
              }
            </select>
          </FormItem>
          <FormItem>
            <Titre>Type du bien:</Titre>
            <select value={type_bien} placeholder="_ _ _" style={{borderBottom:" 1px solid"}} onChange={(e) => { settype_bien(e.target.value) }}>
              {
                props.type_bien && props.type_bien.map((type_bien) => {
                  return (
                    <option key={type_bien.id}>{type_bien.nom}</option>
                  )
                })
              }
            </select>
          </FormItem>
          <FormItem>
            <Titre>Wilaya :</Titre>
            <select value={wilaya} style={{borderBottom:" 1px solid"}} onChange={(e) => { setwilaya(e.target.value); const s = e.target.value.split(' '); setid(parseInt(s[0])) }}>
              {
                props.wilayas && props.wilayas.map((wilaya_) => {
                  return (
                    <option key={wilaya_.id}>{wilaya_.code} {wilaya_.nom}</option>
                  )
                })
              }
            </select>
          </FormItem>
          <FormItem>
            <Titre>Commune :</Titre>
            <select value={commune} style={{borderBottom:" 1px solid"}} onChange={(e) => { setCommune(e.target.value) }}>
              {communes ?
                communes.map((Commune) => {
                  return (
                    <option key={Commune.id}>{Commune.nom}</option>
                  )
                })
                : null}
            </select>
          </FormItem>
          <FormItem>
            <Titre>Addresse :</Titre>
            <Input type="text" onChange={(e) => setaddress(e.target.value)} />
          </FormItem>
          {commune ? <iframe width="600" height="468" id="gmap_canvas" src={`https://maps.google.com/maps?q=${commune}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe> : null}
          <FormItem>
            <Titre>Description :</Titre>
            <textarea style={{ width: "75%", border: "none", borderBottom: "1px solid", backgroundColor: "transparent" }} onChange={(e) => setdesc(e.target.value)} />
          </FormItem>
          <FormItem>
            <Titre>Prix :</Titre>
            <Input type="number" onChange={(e) => setprix(e.target.value)} /> DA
          </FormItem>
          <FormItem>
            <Titre>Surface :</Titre>
            <Input type="number" onChange={(e) => setsurface(e.target.value)} /> m??
          </FormItem>
          <FormItem>
            <Titre>Information annonceur :</Titre>
          </FormItem>
          <FormItem>
            <Titre>Nom :</Titre>
            <label>{user.nom}</label>
          </FormItem>
          <FormItem>
            <Titre>E_mail :</Titre>
            <label>{user.email}</label>
          </FormItem>
          <FormItem>
            <Titre>T??l??phone :</Titre>
            <Input type="tle" value={num_tlp} onChange={(e) => setnum_tlp(e.target.value)} />
          </FormItem>
          <FormItem>
            <Button onClick={addAnnonce}>Enregistrer</Button>
          </FormItem>
        </Form>
      </AnnonceContainer>
    </Container>
  );
};

export default NouvelleAnnonce;
