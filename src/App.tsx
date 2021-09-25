import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import NavBar from './components/Navbar/NavBar'
import { Home } from './pages/Home/Home'
import './styles/style.scss'
import UserSettings from './pages/UserSettings/UserSettings'
import { authorize } from './apiCalls'
import LoadingPage from './pages/LoadingPage/LoadingPage'
import PrivateRoute from './utils/UtilComponents/PrivateRoute'
import Page404 from './pages/Page404/Page404'
import RestorePassword from './components/RestorePassword/RestorePassword'
import { UserData } from './utils/interfaces'

// AppContext should be exported, and at the same time I'm using a component's
// state variables that cannot be accessed outside of the component. So I defined
// it by using 'let' keyword, and then initialize inside the component
export let AppContext: React.Context<{
  isAuthorized: boolean
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
  userData: UserData
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
}>

function App() {
  //Keep information wether the user authorized or not
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // Keep not secret user's data to be access in another components
  const [userData, setUserData] = useState({ email: '', name: '' })
  const contextValue = {
    isAuthorized: isAuthorized,
    setIsAuthorized: setIsAuthorized,
    userData: userData,
    setUserData: setUserData,
  }

  //Context initialization
  AppContext = React.createContext(contextValue)

  //Check if user is authorized on App load
  useEffect(() => {
    setIsLoading(true)
    authorize()
      .then((res) => {
        if (res.status === 200) {
          setUserData({
            email: res.data.email,
            name: res.data.name,
          })
          setIsAuthorized(true)
          console.log('Authorized')
        }
        console.log(res.status)
      })
      .catch((err) => {
        setIsAuthorized(false)
        console.log(err)
        console.log(err.response.statusMessage)
        console.log('Not authorized')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <LoadingPage />
  } else {
    return (
      <AppContext.Provider value={{ isAuthorized, setIsAuthorized, userData, setUserData }}>
        <div className="appContainer">
          <header>
            <NavBar setIsAuthorized={setIsAuthorized} isAuthorized={isAuthorized} pageNames={['Home', 'User page', 'Sign In', 'Sign Up']} />
          </header>
          <main>
            <Switch>
              <PrivateRoute exact Component={UserSettings} path="/settings" />

              <Route path="/signIn" component={SignIn} />
              <Route path="/restore-password/:token" component={RestorePassword} />

              <Route exact path="/signUp" component={SignUp} />

              <Route exact path={['/', '/home']} component={() => <Home isAuthorized={isAuthorized}></Home>} />

              <Route component={Page404}></Route>
            </Switch>
          </main>
        </div>
      </AppContext.Provider>
    )
  }
}

export default App
