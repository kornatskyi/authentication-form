import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.scss'
import burger from '../../assets/images/icons/burger.svg'
import UserButton from '../UserButton/UserButton'
import { AppContext } from '../../App'

function NavBar() {
  const [toggle, setToggle] = useState('')
  // Depending authorized user or not display appropriate buttons in the right corner
  const { isAuthorized } = useContext(AppContext)

  return (
    <div
      className={`navbar on ${toggle}`}
      onBlur={() => {
        setToggle('in')
      }}
    >
      <div className="burgerContainer" role="button" tabIndex={0} onClick={() => setToggle(toggle === 'out' ? 'in' : 'out')} onKeyDown={() => setToggle(toggle === 'out' ? 'in' : 'out')}>
        <img src={burger} className="burger" alt="" />
      </div>

      <div id="links" className={`links on ${toggle}`}>
        <div className="leftLinks">
          <Link to="/home">Home</Link>
        </div>
        <div className="rightLinks">
          {isAuthorized ? (
            <UserButton />
          ) : (
            <>
              <Link to="/signIn">Log In</Link>
              <Link to="/signUp">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar
