import React from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Link } from 'react-router-dom'

const UserRelatedContent = () => {
  const axiosRequest = () => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: process.env.API_URL + '/authorize',
      withCredentials: true,
    }

    axios(config)
      .then(function (response: AxiosResponse) {
        console.log(response.data)
        console.log(response.status)

        if (response.status === 200) {
          console.log('authorized')
        }
      })
      .catch(function (error) {
        console.log(error)
        console.log('Error message: ' + error.message)
      })
  }

  return (
    <div>
      <h1>User page</h1>
      <button onClick={() => axiosRequest()}>Is authorized?</button>
      <Link to="signin">Login</Link>
    </div>
  )
}

export default UserRelatedContent
