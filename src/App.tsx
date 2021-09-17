import React, { useEffect, useState } from 'react'
import SignIn from './components/SIgnIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import Profile from './pages/Profile/Profile'
import NavBar from './components/Navbar/NavBar'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import './styles/style.scss'
import UserSettings from './pages/UserSettings/UserSettings'

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false)

  // const axiosRequest = () => {
  //   const config: AxiosRequestConfig = {
  //     method: 'get',
  //     url: process.env.API_URL + '/authorize',
  //     withCredentials: true,
  //   }

  //   axios(config)
  //     .then(function (response: AxiosResponse) {
  //       if (response.status === 200) {
  //         setIsAuthorized(true)
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log('Not authorized')
  //     })
  // }

  // axiosRequest()

  return (
    <div className="appContainer">
      <Router>
        <header>
          <NavBar
            setIsAuthorized={setIsAuthorized}
            isAuthorized={isAuthorized}
            pageNames={['Home', 'User page', 'Sign In', 'Sign Up']}
          />
        </header>
        <main>
          <Switch>
            <Route path="/signin">
              <SignIn
                isAuthorized={isAuthorized}
                setIsAuthorized={setIsAuthorized}
              />
            </Route>
            <Route path="/signup">
              <SignUp isAuthorized={isAuthorized} />
            </Route>
            <Route path="/Profile">
              <Profile
                setIsAuthorized={setIsAuthorized}
                isAuthorized={isAuthorized}
              />
            </Route>

            <Route path={['/', '/home']}>
              {/* <Home isAuthorized={isAuthorized}></Home> */}
              <UserSettings />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  )
}
