import axios, { AxiosRequestConfig } from 'axios'
import React, { ReactElement, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { signUp } from '../../apiCalls'
import '../../styles/FormContainer.scss'
import { RegistrationCredentials } from '../../utils/interfaces'
import './SignUp.scss'

function SignUp(): ReactElement {
  const history = useHistory()
  const [isRegistered, setIsRegistered] = useState(false)
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationCredentials>()

  const displayFormError = (message?: string): ReactElement | undefined => {
    if (message) {
      return <p className="error">{message}</p>
    }
  }

  const password = useRef({})
  password.current = watch('password', '')

  if (true) {
    return (
      <div className="successfullyAuthenticated formContainer">
        <div>
          <h1>You are registered!</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-supported-dps="24x24"
            fill="currentColor"
            width="40"
            height="40"
            focusable="false"
          >
            <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1.25 15L7 13.25l1.41-1.41L10.59 14l4.84-6H18z"></path>
          </svg>
        </div>
        <p>Please confirm you email address.</p>
      </div>
    )
  } else {
    return (
      <div className="signUpContainer formContainer">
        <div className="form-header">
          <h2>Create a new account</h2>
        </div>
        <form
          className="signUpForm"
          onSubmit={handleSubmit((data) => {
            signUp(data)
              .then((res) => {
                console.log(res.data)
                if (res.status === 200) {
                  setIsRegistered(true)
                }
              })
              .catch((err) => {
                console.log(err)
              })
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
                value: 30,
                message: 'Field length should be less then 30 chars!',
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
}

export default SignUp
