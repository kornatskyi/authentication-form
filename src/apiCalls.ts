import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { LoginCredentials, RegistrationCredentials } from './utils/interfaces'

export const authorize = async () => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: process.env.API_URL + '/authorize',
    withCredentials: true,
  }

  return axios(config)
}

export const signout = async () => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: process.env.API_URL + '/signout',
    withCredentials: true,
  }

  return axios(config)
}

export const signIn = async (data: LoginCredentials) => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: process.env.API_URL + '/signin',
    data: data,
    withCredentials: true,
  }

  return axios(config)
}

export const signUp = (registrationCredentials: RegistrationCredentials) => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: process.env.API_URL + '/signup',

    data: registrationCredentials,
    withCredentials: true,
  }
  return axios(config)
}

export const isEmailConfirmed = () => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: process.env.API_URL + '/isconfirmed',

    withCredentials: true,
  }
  return axios(config)
}

export const forgotPassword = (email: string) => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: process.env.API_URL + '/forgot-password',
    data: {
      email: email,
    },
    withCredentials: true,
  }

  return axios(config)
}

export const restorePassword = (password: string, token: string) => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: process.env.API_URL + '/reset-password-by-link',
    data: {
      password: password,
      token: token,
    },
    withCredentials: true,
  }
  return axios(config)
}
