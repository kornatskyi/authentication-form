import React from 'react'
import SignIn from './components/SIgnIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import UserPage from './components/UserPage/UserPage'
import NavBar from './components/Navbar/NavBar'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Home } from './components/Home/Home'

export default function App() {
  return (
    <div className="appContainer">
      <Router>
        <header>
          <NavBar pageNames={['userpage', 'signin', 'signup', 'home']} />
        </header>
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/userpage">
            <UserPage></UserPage>
          </Route>

          <Route path={['/', '/home']}>
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
