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
const communesAdrar = [{ value: 'Adrar', label: "Adrar" },
{ value: 'oued semar', label: "Oued Semar" }]

export const categorieList = ["Tout", "Echange", "Vente", "Location", "Location Vacances"]
export const wilaya = [{ value: 'Adrar', label: 'Adrar', communes: communesAdrar },
{ value: 'chlef', label: 'Chlef', communes: communesAdrar },
{ value: 'laghouat', label: 'Laghouat', communes: communesAdrar }]

export const typeList = ["Tous les types",
"Terrain",
"Terrain Agricole",
"Appartement",
"Maison",
"Bangalow",
"Studio"];