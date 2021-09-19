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
      <h1 className="pageTitle">Description</h1>

      <p>This is a simple boilerplate of a user Authentication setup</p>
    </div>
  )
}
