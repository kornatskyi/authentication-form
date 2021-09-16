import React, { useState } from 'react'
import SignIn from './components/SIgnIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import UserPage from './components/UserPage/UserPage'
import NavBar from './components/Navbar/NavBar'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Home } from './components/Home/Home'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false)

  const axiosRequest = () => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: process.env.API_URL + '/authorize',
      withCredentials: true,
    }

    axios(config)
      .then(function (response: AxiosResponse) {
        if (response.status === 200) {
          setIsAuthorized(true)
        }
      })
      .catch(function (error) {
        console.log('Not authorized')
      })
  }
  axiosRequest()

  return (
    <div className="appContainer">
      <Router>
        <header>
          <NavBar
            isAuthorized={isAuthorized}
            pageNames={['Home', 'User page', 'Sign In', 'Sign Up']}
          />
        </header>
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
          <Route path="/userpage">
            <UserPage
              setIsAuthorized={setIsAuthorized}
              isAuthorized={isAuthorized}
            />
          </Route>

          <Route path={['/', '/home']}>
            <Home isAuthorized={isAuthorized}></Home>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
