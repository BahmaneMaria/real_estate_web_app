import React from 'react'
import Noresult from '../assets/search.png'
const NoResultFound = () => {
  return (
    <div>
        <div>
            <h4>No result found , Please try again</h4>
        </div>
        <img src={Noresult}></img>
    </div>
  )
}

export default NoResultFound