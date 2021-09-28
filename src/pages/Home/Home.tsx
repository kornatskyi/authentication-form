import React from 'react'
import svg from '../../assets/images/undraw_two_factor_authentication_namy.svg'

import './Home.scss'

export const Home = () => {
  return (
    <div className="homeContainer">
      <h1 className="pageTitle">This is a boilerplate for React authentication app</h1>
      <img src={svg} className="homeImg" alt="" />
    </div>
  )
}
