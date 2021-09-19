import React, { ReactElement, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AppContext } from '../../App'

export default function PrivateRoute(props: any): ReactElement {
  console.log(props)

  const { Component, path } = props

  const { isAuthorized } = useContext(AppContext)

  return (
    <Route
      path={path}
      render={(props) => {
        if (isAuthorized) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      }}
    ></Route>
  )
}
