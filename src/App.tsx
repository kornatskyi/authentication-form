import React, { useEffect, useState } from 'react'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import NavBar from './components/Navbar/NavBar'
import { Switch, Route, useHistory } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import './styles/style.scss'
import UserSettings from './pages/UserSettings/UserSettings'
import { authorize } from './apiCalls'

import ProtectedRoute from './utils/UtilComponents/ProtectedRoute'

export const AuthorizedContext = React.createContext({})

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  console.log()

  //Check if user is authorized on App load
  useEffect(() => {
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
  }, [])

  return (
    <AuthorizedContext.Provider value={isAuthorized}>
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
            <Route path="/route1">
              <h1>Route 1</h1>
            </Route>
            <Route path="/route2">
              <h1>Route 2</h1>
            </Route>
            {/* <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
 */}
            <ProtectedRoute component={UserSettings} path="/settings" />

            <Route path={['/', '/home']}>
              <Home isAuthorized={isAuthorized}></Home>
            </Route>
          </Switch>
        </main>
      </div>
    </AuthorizedContext.Provider>
  )
}
