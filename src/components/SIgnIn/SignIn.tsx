import React, { Dispatch, ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import axios, { AxiosRequestConfig } from 'axios'

import './SignIn.scss'

interface Props {
  isAuthorized: boolean
  setIsAuthorized: Dispatch<boolean>
}

type FormValues = {
  email: string
  password: string
}

export default function SignIn(props: Props): ReactElement {
  const { isAuthorized, setIsAuthorized } = props
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const displayFormError = (message?: string): ReactElement | undefined => {
    if (message) {
      return <p className="error">{message}</p>
    }
  }

  const axiosRequest = (data: unknown) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: process.env.API_URL + '/signin',
      data: data,
      withCredentials: true,
    }

    axios(config)
      .then(function (response) {
        //setting authorized to true when user is signed in
        setIsAuthorized(true)
        //redirect to user page
        history.push('/Profile')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div className="signInContainer formContainer">
      <div className="form-header">
        <h2>Login to you account</h2>
      </div>
      <form
        className="signInForm"
        onSubmit={handleSubmit((data) => {
          axiosRequest(data)
        })}
      >
        <input
          {...register('email', {
            required: { value: true, message: 'Input your email!' },
            maxLength: {
              value: 30,
              message: 'Field length should be less then 30 chars!',
            },
          })}
          type="text"
          placeholder="Email"
        />
        {displayFormError(errors.email?.message)}

        <input
          {...register('password', {
            required: { value: true, message: 'Input your password!' },
            maxLength: {
              value: 30,
              message: 'Field length should be less then 30 chars!',
            },
          })}
          type="password"
          className="password"
          placeholder="Password"
        />
        {displayFormError(errors.password?.message)}

        <input type="submit" className="button" value="Sign In" />
      </form>

      <div className="form-footer"></div>
      <p>
        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
      </p>
      <a href="/restore-password">Restore password</a>
      <Link to="/Profile">user page</Link>
    </div>
  )
}
