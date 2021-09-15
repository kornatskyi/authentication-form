import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import './Home.scss'

export const Home = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)

  const axiosRequest = () => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: process.env.API_URL + '/authorize',
      withCredentials: true,
    }

    axios(config)
      .then(function (response: AxiosResponse) {
        if (response.status === 200) {
          setIsAuthorized(true)
        }
      })
      .catch(function (error) {
        console.log(error)
        console.log('Error message: ' + error.message)
      })
  }

  axiosRequest()

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
