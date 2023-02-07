import Ajout from "./pages/Ajout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Componenets/Navbar";
import Profile from "./pages/Profile";
import PageAuth from "./pages/auth";
import React from "react";
import Affichage from './pages/Affichage';
import Recherche from './pages/Recherche';
import RecentAnnonces from './pages/RecentAnnonces'
import SearchedAnnonces from './pages/SearchedAnnonces'
import CategoriesAnnonces from './pages/CategoriesAnnonces'
import SearchedFilterAnnonces from './pages/SearchedFilterAnnonces'


function App() {
  
  return (
    <Router>
      <div style={{ backgroundColor: "#f7f7f7" }}>
        <Routes>
          <Route path="/Add/:id" element={<Ajout />}></Route>
          <Route path="/" element={<PageAuth />}></Route>
          <Route path="/Profile/:id" element={<Profile />}></Route>
          <Route path="/recherche" element={<Recherche/>} />
          <Route path="/Affichage/:id" element={<Affichage/>} />
          <Route path="/home" element={<RecentAnnonces/>}/>
          <Route path='/searched/:search' element={<SearchedAnnonces/>}/>
          <Route path = "/categorie/:type" element={<CategoriesAnnonces/>}/>
          <Route path='/searchedfilter' element={<SearchedFilterAnnonces/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
