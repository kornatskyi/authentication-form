import axios, { AxiosRequestConfig } from 'axios'
import { LoginCredentials, RegistrationCredentials, UpdatingCredentials } from './utils/interfaces'

export const authorize = async () => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: process.env.API_HOST + '/authorize',
    withCredentials: true,
  }
  return axios(config)
}

export const signOut = async () => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: process.env.API_HOST + '/signOut',
    withCredentials: true,
  }
  return axios(config)
}

export const signIn = async (data: LoginCredentials) => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: process.env.API_HOST + '/signIn',
    data: data,
    withCredentials: true,
  }
  return axios(config)
}

export const signUp = (registrationCredentials: RegistrationCredentials) => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: process.env.API_HOST + '/signUp',
    data: registrationCredentials,
    withCredentials: true,
  }
  return axios(config)
}

export const isEmailConfirmed = () => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: process.env.API_HOST + '/isconfirmed',
    withCredentials: true,
  }
  return axios(config)
}

export const requestEmailConfirmationLink = () => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: process.env.API_HOST + '/request-confirmation-link',
    withCredentials: true,
  }
  return axios(config)
}

//Request link for restoring password
export const forgotPassword = (email: string) => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: process.env.API_HOST + '/forgot-password',
    data: {
      email: email,
    },
    withCredentials: true,
  }

  return axios(config)
}

//Sending token and new password
export const restorePassword = (password: string, token: string) => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: process.env.API_HOST + '/reset-password-by-link',
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
    url: process.env.API_HOST + '/update',
    data: credentials,
    withCredentials: true,
  }
  return axios(config)
}

export const getUserInfo = () => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: process.env.API_HOST + '/user-info',
    withCredentials: true,
  }
  return axios(config)
}

export const deleteUser = () => {
  const config: AxiosRequestConfig = {
    method: 'delete',
    url: process.env.API_HOST + '/delete',
    withCredentials: true,
  }
  return axios(config)
}
