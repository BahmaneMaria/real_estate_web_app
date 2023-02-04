import annonceimg1 from '../assets/annonce1.jpg'
import annonceimg2 from '../assets/annonce2.jpg'

export const AnnoncesList = [{titre:"Location Terrain Agricole",surface:"12000m²",prix:"10 Million",location:"Ain Beniian, Alger",photo:annonceimg1},
{titre:"Location Terrain Agricole",surface:"12000m²",prix:"10 Million",location:"Ain Beniian, Alger",photo:annonceimg2},
{titre:"Location Terrain Agricole",surface:"12000m²",prix:"10 Million",location:"Ain Beniian, Alger",photo:annonceimg1},
{titre:"Location Terrain Agricole",surface:"12000m²",prix:"10 Million",location:"Ain Beniian, Alger",photo:annonceimg1},
{titre:"Location Terrain Agricole",surface:"12000m²",prix:"10 Million",location:"Ain Beniian, Alger",photo:annonceimg1},
{titre:"Location Terrain Agricole",surface:"12000m²",prix:"10 Million",location:"Ain Beniian, Alger",photo:annonceimg1},]


//commnues de chaque wilaya ici
//puis changer les communes dans la var wilaya
const communesAlger = [{ value: 'bab azzouar', label: "Bab azzouar" },
{ value: 'oued semar', label: "Oued Semar" }]

export const categorieList = ["Tout", "Echange", "Vente", "Location", "Location Vacances"]
export const wilaya = [{ value: 'alger', label: 'Alger', communes: communesAlger },
{ value: 'tebessa', label: 'Tebessa', communes: communesAlger },
{ value: 'annaba', label: 'Annaba', communes: communesAlger }]

export const typeList = ["Tous les types",
"Terrain",
"Terrain Agricole",
"Appartement",
"Maison",
"Bangalow",
"Studio"];