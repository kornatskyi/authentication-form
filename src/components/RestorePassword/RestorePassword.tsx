import React, { Dispatch, ReactElement, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { signIn } from '../../apiCalls'
import { LoginCredentials } from '../../utils/interfaces'
import { AppContext } from '../../App'

export default function RestorePassword() {
  const [errorClass, setErrorClass] = useState('')
  const [wrongCredentialsMessage, setWrongCredentialsMessage] = useState(
    (() => <p></p>)()
  )
  const history = useHistory()

  const { isAuthorized, setIsAuthorized } = useContext(AppContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>()

  const displayFormError = (message?: string): ReactElement | undefined => {
    if (message) {
      return <p className="error">{message}</p>
    }
  }
  return (
    <div className="restorePasswordContainer formContainer">
      <div className="form-header">
        <h2>Restore Password</h2>
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
          className={`${errorClass} button`}
          type="submit"
          value="Send reset message"
        />
      </form>

      <div className="form-footer"></div>
      <p>
        Remember password <Link to="/signin">Sign In</Link>
      </p>
    </div>
  )
}
