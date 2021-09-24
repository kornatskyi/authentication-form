import React, { Dispatch, ReactElement, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import './SignIn.scss'
import { forgotPassword, signIn } from '../../apiCalls'
import { LoginCredentials } from '../../utils/interfaces'
import { AppContext } from '../../App'

export default function SignIn(): ReactElement {
  const [errorClass, setErrorClass] = useState('')
  const [wrongCredentialsMessage, setWrongCredentialsMessage] = useState((() => <p></p>)())
  const [isLoading, setIsLoading] = useState(false)

  // Switch Login form to restore Password form if reset password request was sent
  const [isResetRequestSent, setIsResetRequestSent] = useState(false)

  const history = useHistory()

  // Used for setting context value of weather user authorized or not. Set it after
  // successful login
  const { isAuthorized, setIsAuthorized } = useContext(AppContext)

  //React Hook Form methods
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm<LoginCredentials>()
  // Handling form errors
  const displayFormError = (message?: string): ReactElement | undefined => {
    if (message) {
      return <p className="error">{message}</p>
    }
  }

  //Validation schemas
  const emailValidation = {
    required: { value: true, message: 'Input your email!' },
    maxLength: {
      value: 30,
      message: 'Field length should be less then 254 chars!',
    },
  }

  const passwordValidation = {
    required: { value: true, message: 'Choose your password' },
    maxLength: {
      value: 30,
      message: 'Field length should be less then 30 chars!',
    },
  }

  const handleSubmitCallback = (data: LoginCredentials) => {
    setIsLoading(true)
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
        setWrongCredentialsMessage((() => <p className="error">Wrong email or password</p>)())
        console.log(err)
        console.log('Error when signing in')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleForgotPasswordButton = () => {
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
  }

  if (isResetRequestSent) {
    return (
      <div className="formContainer">
        <h3>We sent a mail with instructions on restoring the password</h3>
      </div>
    )
  } else {
    return (
      <div className="signInContainer formContainer">
        <div className="form-header">
          <h2>Login to your account</h2>
        </div>
        <form className="signInForm" onSubmit={handleSubmit(handleSubmitCallback)}>
          <input className={`${errorClass} `} {...register('email', emailValidation)} type="email" placeholder="Email" />
          {displayFormError(errors.email?.message)}

          <input className={`${errorClass} password`} {...register('password', passwordValidation)} type="password" placeholder="Password" />
          {displayFormError(errors.password?.message)}
          {wrongCredentialsMessage}
          <input className={`${errorClass} button`} type="submit" disabled={isLoading} value="Sign In" />
        </form>

        <div className="form-footer">
          <p>
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </p>

          <button disabled={isLoading} className="forgotPassword" onClick={handleForgotPasswordButton}>
            Forgot password
          </button>
        </div>
      </div>
    )
  }
}
