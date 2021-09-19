import React, { Dispatch, ReactElement, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import './SignIn.scss'
import { signIn } from '../../apiCalls'
import { LoginCredentials } from '../../utils/interfaces'
import { AppContext } from '../../App'

export default function SignIn(): ReactElement {
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
                history.push('/home')
                console.log('You are Signed In')
              } else {
                setIsAuthorized(false)

                console.log('Status ', res.status)

                console.log('Something went wrong')
              }
            })
            .catch((err) => {
              console.log(err)
              console.log('Error when signing in')
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
