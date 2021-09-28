import React from 'react'
import { Link } from 'react-router-dom'
import svg from '../../assets/images/undraw_two_factor_authentication_namy.svg'

import './Home.scss'

export const Home = () => {
  return (
    <div className="homeContainer">
      <h1 className="pageTitle">This is a boilerplate for React authentication app</h1>
      <h3>It includes</h3>
      <ul>
        <li>
          <Link to="/home">Home page</Link>
        </li>
        <li>
          <Link to="/signIn">Login Page (only for unauthorized)</Link>
        </li>
        <li>
          <Link to="/signUp">Registration Page (only for unauthorized)</Link>
        </li>
        <li>
          <Link to="/settings">Profile setting page (Private route, for authorized users)</Link>
        </li>
        <li>
          <Link to="/404">404 page</Link>
        </li>
      </ul>
      <img src={svg} className="homeImg" alt="" />
    </div>
  )
}
