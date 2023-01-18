import Ajout from "./pages/Ajout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Componenets/Navbar";
import Profile from "./pages/Profile";
import React from "react";
function App() {
  
  return (
    <Router>
      <div style={{ backgroundColor: "#f7f7f7" }}>
        < Navbar/>
        <Routes>
          <Route path="/" element={<Ajout />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
