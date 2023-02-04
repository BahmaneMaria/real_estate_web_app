import React from 'react'
import {Route,Routes} from 'react-router-dom';
import RecentAnnonces from './RecentAnnonces';
import CategoriesAnnonces from './CategoriesAnnonces'
import SearchedAnnonces from './SearchedAnnonces';
import SearchedFilterAnnonces from './SearchedFilterAnnonces';


const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<RecentAnnonces/>}/>
      <Route path = "/categorie/:type" element={<CategoriesAnnonces/>}/>
      <Route path='/searched/:search' element={<SearchedAnnonces/>}/>
      <Route path='/searchedfilter' element={<SearchedFilterAnnonces/>}/>
    </Routes>

  )
}

export default Home