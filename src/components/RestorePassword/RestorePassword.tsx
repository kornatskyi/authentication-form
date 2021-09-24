import React, { ReactElement, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory, useParams } from 'react-router-dom'
import { restorePassword } from '../../apiCalls'
import { RestorePasswordCredentials } from '../../utils/interfaces'

export default function RestorePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RestorePasswordCredentials>()

  const displayFormError = (message?: string): ReactElement | undefined => {
    if (message) {
      return <p className="error">{message}</p>
    }
  }

  //get token from a url parameter
  const { token } = useParams<{ token: string }>()

  const password = useRef({})
  password.current = watch('password', '')
  return (
    <div className="restorePasswordContainer formContainer">
      <div className="form-header">
        <h2>Restore Password</h2>
      </div>
      <form
        className="signInForm"
        onSubmit={handleSubmit((data) => {
          restorePassword(data.password, token)
            .then((res) => {
              if (res.status === 200) {
                console.log('Password has been reset')
              } else {
                console.log('Status ', res.status)

                console.log('Something went wrong')
              }
            })
            .catch((err) => {
              console.log(err)
              console.log(err.message)

              console.log('Error when resetting password ')
            })
        })}
      >
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
            validate: (value) => value === password.current || 'The passwords do not match',
          })}
          type="password"
          className="password"
          placeholder="Repeat password"
        />
        {displayFormError(errors.repeatPassword?.message)}

        <input className="button" type="submit" value="Send reset message" />
      </form>

      <div className="form-footer"></div>
      <p>
        Remember password <Link to="/signin">Sign In</Link>
      </p>
    </div>
  )
}
