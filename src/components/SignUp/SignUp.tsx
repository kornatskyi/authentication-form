import React, { ReactElement, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

//Custom imports
import { signUp } from '../../apiCalls'
import { RegistrationCredentials } from '../../utils/interfaces'

//Styles
import './SignUp.scss'
import '../../styles/FormContainer.scss'
import successSvg from '../../assets/images/icons/success.svg'

//TODO: Block on clicking register button many times
//TODO: Resend confirmation link button

function SignUp(): ReactElement {
  // State for switching registration form to registration message block
  const [isRegistered, setIsRegistered] = useState(false)

  /** State that keeps confirmation status message after registration.
   * It will tell if sending confirmation message went wrong */
  const [confirmationLinkMessage, setConfirmationLinkMessage] = useState('')

  //State that keeps error status message in case if registration went wrong.
  const [errorStatusMessage, setErrorStatusMessage] = useState('')

  //React Hook Form methods
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationCredentials>()
  // Handling form error
  const displayFormError = (message?: string): ReactElement | undefined => {
    if (message) {
      return <p className="error">{message}</p>
    }
  }
  //Subscribe to password for checking passwords identity
  const password = useRef({})
  password.current = watch('password', '')

  //Validation schemas
  const emailValidation = {
    required: { value: true, message: 'Input your email!' },
    maxLength: {
      value: 30,
      message: 'Field length should be less then 254 chars!',
    },
  }
  const nameValidation = {
    required: { value: true, message: 'Choose your user name!' },
    maxLength: {
      value: 30,
      message: 'Field length should be less then 30 chars!',
    },
  }
  const passwordValidation = {
    required: { value: true, message: 'Choose your password' },
    maxLength: {
      value: 30,
      message: 'Field length should be less then 30 chars!',
    },
  }
  const repeatPasswordValidation = {
    required: { value: true, message: 'Repeat your password' },
    maxLength: {
      value: 30,
      message: 'Field length should be less then 30 chars!',
    },
    validate: (value: string) => value === password.current || 'The passwords do not match',
  }

  const handleSubmitCallback = (data: RegistrationCredentials) => {
    signUp(data)
      .then((res) => {
        console.log(res.data)
        setIsRegistered(true)
        setConfirmationLinkMessage(res.data)
      })
      .catch((err) => {
        console.dir(err.response.statusText)
        setErrorStatusMessage(err.response.statusText)
      })
  }

  //Conditional rendering. Redder message when user is registered
  if (isRegistered) {
    return (
      <div className="successfullyAuthenticated formContainer">
        <div>
          <h1>You are registered!</h1>
          <img src={successSvg} alt="success" />
        </div>
        <p>{confirmationLinkMessage}</p>
      </div>
    )
  } else {
    return (
      <div className="signUpContainer formContainer">
        <div className="form-header">
          <h2>Create a new account</h2>
        </div>
        <form className="signUpForm" onSubmit={handleSubmit(handleSubmitCallback)}>
          <input {...register('email', emailValidation)} type="email" placeholder="Email" />
          {displayFormError(errors.email?.message)}
          <input {...register('name', nameValidation)} type="text" placeholder="User name" />
          {displayFormError(errors.name?.message)}
          <input {...register('password', passwordValidation)} type="password" className="password" placeholder="Password" />
          {displayFormError(errors.password?.message)}
          <input {...register('repeatPassword', repeatPasswordValidation)} type="password" className="password" placeholder="Repeat password" />
          {displayFormError(errors.repeatPassword?.message)}
          <input type="submit" className="button" value="Sign Up" />
          <p style={{ color: 'red' }}>{errorStatusMessage}</p>
        </form>

        <div className="form-footer">
          <p>
            Already have an account? <Link to="/signin">Log In</Link>
          </p>
        </div>
      </div>
    )
  }
}

export default SignUp
