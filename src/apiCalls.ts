import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const authorize = async () => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: process.env.API_URL + '/authorize',
    withCredentials: true,
  }

  return axios(config)
    .then(function (response: AxiosResponse) {
      return true
    })
    .catch(function (error) {
      console.log('Not authorized')
      return false
    })
}

export const signout = async () => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: process.env.API_URL + '/signout',
    withCredentials: true,
  }

  return axios(config)
    .then(function (response: AxiosResponse) {
      console.log("You've been sign out")
    })
    .catch(function (error) {
      console.log('Error when signing out')
    })
}
