import React, { Dispatch } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Link, useHistory } from 'react-router-dom'
import './UserPage.scss'
interface Props {
  isAuthorized: boolean
  setIsAuthorized: Dispatch<boolean>
}

const UserRelatedContent = (props: Props) => {
  const { isAuthorized, setIsAuthorized } = props
  const history = useHistory()
  if (!isAuthorized) {
    history.push('/home')
  }
  const axiosRequest = () => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: process.env.API_URL + '/authorize',
      withCredentials: true,
    }

    axios(config)
      .then(function (response: AxiosResponse) {
        if (response.status === 200) {
          console.log('authorized')
        }
      })
      .catch(function (error) {
        console.log(error)
        console.log('Error message: ' + error.message)
      })
  }

  const signOut = () => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: process.env.API_URL + '/signout',
      withCredentials: true,
    }

    axios(config)
      .then(function (response: AxiosResponse) {
        if (response.status === 200) {
          console.log('You signed out')
          setIsAuthorized(false)
        }
      })
      .catch(function (error) {
        console.log('Error message: ' + error.message)
      })
  }

  return (
    <div className="userPageContainer">
      <h1 className="pageTitle">User page</h1>
      <div className="navigation">
        <button onClick={() => axiosRequest()}>Is authorized?</button>
        <button onClick={() => signOut()}>Sign out.</button>
      </div>
    </div>
  )
}

export default UserRelatedContent
