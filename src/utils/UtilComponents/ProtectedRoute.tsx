import React, { ReactComponentElement, ReactElement , useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthorizedContext } from '../../App'

export default function ProtectedRoute(props: any): ReactElement {
  const Component = props.component

  const isAuthorized = useContext(AuthorizedContext)

  console.log(props)
  console.log(isAuthorized)

  return (
    <Route
      path={props.path}
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
