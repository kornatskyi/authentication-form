import axios, { AxiosRequestConfig } from 'axios'
import React, { ReactElement, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import '../../styles/FormContainer.scss'
import './SignUp.scss'

type FormValues = {
  email: string
  name: string
  password: string
  repeatPassword: string
}

function SignUp(): ReactElement {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()

  const displayFormError = (message?: string): ReactElement | undefined => {
    if (message) {
      return <p className="error">{message}</p>
    }
  }

  const password = useRef({})
  password.current = watch('password', '')

  const axiosRequest = (data: unknown) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: process.env.API_URL + '/users',

      data: data,
      withCredentials: true,
    }
    axios(config)
      .then(function (response) {
        console.log(response)

        console.log(response.status)
        console.log('shfsdhf')

        if (response.status === 200) {
          console.log('registered')
        }
      })
      .catch(function (error) {
        console.log(error)
        console.log('Error message: ' + error.message)
      })
  }

  return (
    <div className="signUpContainer formContainer">
      <div className="form-header">
        <h2>Create a new account</h2>
      </div>
      <form
        className="signUpForm"
        onSubmit={handleSubmit((data) => {
          console.log(data)

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
          {...register('name', {
            required: { value: true, message: 'Choose your user name!' },
            maxLength: {
              value: 16,
              message: 'Field length should be less then 16 chars!',
            },
          })}
          type="text"
          placeholder="User name"
        />
        {displayFormError(errors.name?.message)}

        <input
          {...register('password', {
            required: { value: true, message: 'Choose your password' },
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

        <input
          {...register('repeatPassword', {
            required: { value: true, message: 'Repeat your password' },
            maxLength: {
              value: 30,
              message: 'Field length should be less then 30 chars!',
            },
            validate: (value) =>
              value === password.current || 'The passwords do not match',
          })}
          type="password"
          className="password"
          placeholder="Repeat password"
        />
        {displayFormError(errors.repeatPassword?.message)}

        <input type="submit" className="button" value="Sign Up" />
      </form>

      <div className="form-footer"></div>
      <p>
        Already have an account? <Link to="/signin">Log In</Link>
      </p>
    </div>
  )
}

export default SignUp
