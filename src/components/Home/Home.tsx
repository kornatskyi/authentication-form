import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import './Home.scss'

interface Props {
  isAuthorized: boolean
}

export const Home = (props: Props) => {
  const { isAuthorized } = props
  return (
    <div className="homeContainer">
      <h1 className="pageTitle">Home page</h1>

      <div className="linksContainer">
        {isAuthorized ? (
          <Link to="/userpage">User Page</Link>
        ) : (
          <>
            <Link to="/signin">Login</Link>{' '}
            <Link to="/signup">Registration</Link>
          </>
        )}
      </div>
    </div>
  )
}
