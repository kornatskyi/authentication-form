import React, { useEffect, useState, Dispatch } from 'react'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import NavBar from './components/Navbar/NavBar'
import { Switch, Route, useHistory, Redirect } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import './styles/style.scss'
import UserSettings from './pages/UserSettings/UserSettings'
import { authorize } from './apiCalls'
import LoadingPage from './pages/LoadingPage/LoadingPage'

import PrivateRoute from './utils/UtilComponents/PrivateRoute'
import Page404 from './pages/Page404/Page404'

//Create let variable for being able to set up values inside the component body.
export let AppContext: React.Context<{
  isAuthorized: boolean
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}>

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const contextValue = {
    isAuthorized: isAuthorized,
    setIsAuthorized: setIsAuthorized,
  }

  AppContext = React.createContext(contextValue)

  //Check if user is authorized on App load
  authorize()
    .then((res) => {
      if (res.status === 200) {
        setIsAuthorized(true)
        console.log('Authorized')
      }
    })
    .catch((err) => {
      setIsAuthorized(false)
      console.log('Not authorized')
    })
    .finally(() => {
      setIsLoading(false)
    })
  if (isLoading) {
    return <LoadingPage />
  } else {
    return (
      <AppContext.Provider value={{ isAuthorized, setIsAuthorized }}>
        <div className="appContainer">
          <header>
            <NavBar
              setIsAuthorized={setIsAuthorized}
              isAuthorized={isAuthorized}
              pageNames={['Home', 'User page', 'Sign In', 'Sign Up']}
            />
          </header>
          <main>
            <Switch>
              <PrivateRoute exact Component={UserSettings} path="/settings" />

              <Route exact path="/signin" component={SignIn} />

              <Route exact path="/signup" component={SignUp} />

              <Route
                exact
                path={['/', '/home']}
                component={() => <Home isAuthorized={isAuthorized}></Home>}
              />

              <Route component={Page404}></Route>
            </Switch>
          </main>
        </div>
      </AppContext.Provider>
    )
  }
}
