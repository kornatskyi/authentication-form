import React, { Dispatch, ReactElement, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import './SignIn.scss'
import { forgotPassword, signIn } from '../../apiCalls'
import { LoginCredentials } from '../../utils/interfaces'
import { AppContext } from '../../App'

export default function SignIn(): ReactElement {
  const [errorClass, setErrorClass] = useState('')
  const [wrongCredentialsMessage, setWrongCredentialsMessage] = useState(
    (() => <p></p>)()
  )

  const [isResetRequestSent, setIsResetRequestSent] = useState(false)

  const history = useHistory()

  const { isAuthorized, setIsAuthorized } = useContext(AppContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm<LoginCredentials>()

  const displayFormError = (message?: string): ReactElement | undefined => {
    if (message) {
      return <p className="error">{message}</p>
    }
  }

  if (isResetRequestSent) {
    return (
      <div className="formContainer">
        <h3>Check your Email request was sent</h3>
      </div>
    )
  } else {
    return (
      <div className="signInContainer formContainer">
        <div className="form-header">
          <h2>Login to you account</h2>
        </div>
        <form
          className="signInForm"
          onSubmit={handleSubmit((data) => {
            signIn(data)
              .then((res) => {
                if (res.status === 200) {
                  setIsAuthorized(true)
                  console.log('You are Signed In')
                  history.push('/home')
                } else {
                  setIsAuthorized(false)

                  console.log('Status ', res.status)

                  console.log('Something went wrong')
                }
              })
              .catch((err) => {
                setWrongCredentialsMessage(
                  (() => <p className="error">Wrong email or password</p>)()
                )
                console.log(err)
                console.log('Error when signing in')
              })
          })}
        >
          <input
            className={`${errorClass} `}
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
            className={`${errorClass} password`}
            {...register('password', {
              required: { value: true, message: 'Input your password!' },
              maxLength: {
                value: 30,
                message: 'Field length should be less then 30 chars!',
              },
            })}
            type="password"
            placeholder="Password"
          />
          {displayFormError(errors.password?.message)}
          {wrongCredentialsMessage}
          <input
            className={`${errorClass} button`}
            type="submit"
            value="Sign In"
          />
        </form>

        <div className="form-footer"></div>

        <p>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>

        <button
          className="forgotPassword"
          onClick={() => {
            //Check if email input field is not empty and if it is display error
            if (!getValues('email')) {
              //setting error if the email field is empty
              setError(
                'email',
                {
                  type: 'manual',
                  message: 'Enter your email!',
                },
                { shouldFocus: true }
              )
            } else {
              //Clear manually set input errors
              clearErrors('email')

              //Make API call, requesting API to send a link to the email for restoring password
              forgotPassword(getValues('email'))
                .then((res) => {
                  //If request is successful setting element state for displaying appropriate message
                  setIsResetRequestSent(true)
                })
                .catch((err) => {
                  console.log(err)

                  //show an error if user with this email doesn't exist
                  setError(
                    'email',
                    {
                      type: 'manual',
                      message: 'No user with this email!',
                    },
                    { shouldFocus: true }
                  )
                  //remove error message after some time
                  setTimeout(() => {
                    clearErrors('email')
                  }, 5000)
                })
            }
          }}
        >
          Forgot password
        </button>
      </div>
    )
  }
}
