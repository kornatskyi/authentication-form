import React from 'react'
import SignIn from './components/SIgnIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import UserPage from './components/UserPage/UserPage'
import NavBar from './components/Navbar/NavBar'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export default function App() {
  return (
    <div className="appContainer">
      <Router>
        <header>
          <NavBar pageNames={['userpage', 'signin', 'signup']} />
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

          <Route path="/">
            <h1>Home page</h1>

            <Link to="/signin">Login</Link>
            <Link to="/signup">Registration</Link>
            <Link to="/userpage">User Page</Link>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
