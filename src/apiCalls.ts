import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { LoginCredentials, RegistrationCredentials, UpdatingCredentials } from './utils/interfaces'

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

export const requestEmailConfirmationLink = () => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: process.env.API_URL + '/request-confirmation-link',

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
export const updateCredentials = (credentials: UpdatingCredentials) => {
  const config: AxiosRequestConfig = {
    method: 'put',
    url: process.env.API_URL + '/update',
    data: credentials,
    withCredentials: true,
  }
  return axios(config)
}

export const deleteUser = () => {
  const config: AxiosRequestConfig = {
    method: 'delete',
    url: process.env.API_URL + '/delete',
    withCredentials: true,
  }
  return axios(config)
}
