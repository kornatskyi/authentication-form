import React, { Dispatch, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import './NavBar.scss'
import burger from '../../assets/images/icons/burger.svg'
import UserButton from '../UserButton/UserButton'
import { AuthorizedContext } from '../../App'

interface Props {
  pageNames: Array<string>
  isAuthorized: boolean
  setIsAuthorized: Dispatch<boolean>
}

function NavBar(props: Props) {
  const { pageNames, setIsAuthorized } = props
  const [toggle, setToggle] = useState('')

  const { isAuthorized } = useContext(AuthorizedContext)

  return (
    <div
      className={`navbar on ${toggle}`}
      onBlur={() => {
        setToggle('in')
      }}
    >
      <div
        className="burgerContainer"
        role="button"
        tabIndex={0}
        onClick={() => setToggle(toggle === 'out' ? 'in' : 'out')}
        onKeyDown={() => setToggle(toggle === 'out' ? 'in' : 'out')}
      >
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
              <Link to="/signin">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar
