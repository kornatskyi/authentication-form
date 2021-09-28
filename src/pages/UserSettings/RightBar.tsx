import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { RegistrationCredentials } from '../../utils/interfaces'
import { emailValidation, nameValidation, passwordValidation, repeatPasswordValidation } from '../../utils/updateInputValidation'
import { deleteUser, isEmailConfirmed, requestEmailConfirmationLink, updateCredentials } from '../../api'
import LoadingElement from '../../components/LoadingElement/LoadingElement'
import { AppContext } from '../../App'

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

  const { userData } = useContext(AppContext)

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
      })
      .catch((err) => {
        console.log(err)
        setSuccessMessage('')
        setErrorMessage(err.response.statusText)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleConfirmationLinkRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    requestEmailConfirmationLink()
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err.response.statusText)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    deleteUser()
      .then((res) => {
        console.log(res.data)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.response.statusText)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="profileContainer">
      <div className="avatar">
        <h2>User profile settings</h2>
      </div>
      <form className="signUpForm" onSubmit={handleSubmit(handleSubmitCallback)}>
        <h4>Email: </h4>
        <input {...register('email', emailValidation())} type="email" placeholder={userData.email} />
        {isConfirmed ? (
          <></>
        ) : (
          <div className="warning">
            Email isn&apos;t confirmed <button onClick={handleConfirmationLinkRequest}>send confirmation link</button>{' '}
          </div>
        )}
        {displayFormError(errors.email?.message)}
        <h4>User name: </h4>
        <input {...register('name', nameValidation())} type="text" placeholder={userData.name} />
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
