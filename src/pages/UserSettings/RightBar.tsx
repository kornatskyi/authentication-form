import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { RegistrationCredentials } from '../../utils/interfaces'
import { emailValidation, nameValidation, passwordValidation, repeatPasswordValidation } from '../../utils/updateInputValidation'
import { deleteUser, isEmailConfirmed, requestEmailConfirmationLink, signUp, updateCredentials } from '../../apiCalls'
import LoadingElement from '../../components/LoadingElement/LoadingElement'

export default function RightBar(): ReactElement {
  return (
    <div className="rightBar">
      <Profile />
    </div>
  )
}

function Profile(): ReactElement {
  const [isConfirmed, setIsConfirmed] = useState(true)

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    isEmailConfirmed()
      .then((res) => {
        if (res.data === true) {
          setIsConfirmed(true)
        } else {
          setIsConfirmed(false)
        }
      })
      .catch((err) => {
        console.error('Something went wrong!')
        console.log(err.response.statusText)
      })
  }, [])

  //React Hook Form method
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

  const password = useRef('')
  password.current = watch('password', '')

  const handleSubmitCallback = (data: RegistrationCredentials) => {
    setIsLoading(true)
    updateCredentials(data)
      .then((res) => {
        if (res.status === 200) {
          setErrorMessage('')
          setSuccessMessage(res.data)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setSuccessMessage('')
        setErrorMessage(err.response.statusText)
        setIsLoading(false)
      })
  }

  const handleConfirmationLinkRequest = (e: any) => {
    e.preventDefault()
    requestEmailConfirmationLink()
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err.response.statusText)
      })
  }

  const handleDeleteButton = (e: any) => {
    e.preventDefault()

    deleteUser()
      .then((res) => {
        console.log(res.data)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.response.statusText)
      })
  }

  return (
    <div className="profileContainer">
      <div className="avatar">
        <h2>User profile setting</h2>
      </div>
      <form className="signUpForm" onSubmit={handleSubmit(handleSubmitCallback)}>
        <h4>Email: </h4>
        <input {...register('email', emailValidation())} type="email" placeholder="Email" />
        {isConfirmed ? (
          <></>
        ) : (
          <div className="warning">
            Email isn&apos;t confirmed <button onClick={handleConfirmationLinkRequest}>send confirmation link</button>{' '}
          </div>
        )}
        {displayFormError(errors.email?.message)}
        <h4>User name: </h4>
        <input {...register('name', nameValidation())} type="text" placeholder="User name" />
        {displayFormError(errors.name?.message)}
        <h4>Password:</h4>
        <input {...register('password', passwordValidation())} type="password" className="password" placeholder="Password" />
        {displayFormError(errors.password?.message)}
        <input {...register('repeatPassword', repeatPasswordValidation(password))} type="password" className="password" placeholder="Repeat password" />
        {displayFormError(errors.repeatPassword?.message)}
        <div className="form-footer">
          <button disabled={isLoading} className="button update">
            Update profile {isLoading ? <LoadingElement /> : <></>}
          </button>
          <p className="error">{errorMessage}</p>
          <p className="success">{successMessage}</p>
        </div>
      </form>
      <div>
        <button disabled={isLoading} className="button delete" onClick={handleDeleteButton}>
          Delete profile {isLoading ? <LoadingElement /> : <></>}
        </button>
      </div>
    </div>
  )
}
