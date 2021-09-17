import React, { Dispatch, useState } from 'react'
import { Link } from 'react-router-dom'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import './NavBar.scss'
import burger from '../../assets/images/icons/burger.svg'
import UserButton from '../UserButton/UserButton'
interface Props {
  pageNames: Array<string>
  isAuthorized: boolean
  setIsAuthorized: Dispatch<boolean>
}

function NavBar(props: Props) {
  const { pageNames, isAuthorized, setIsAuthorized } = props
  const [toggle, setToggle] = useState('')

  const signOut = () => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: process.env.API_URL + '/signout',
      withCredentials: true,
    }

    axios(config)
      .then(function (response: AxiosResponse) {
        if (response.status === 200) {
          console.log('You signed out')
          setIsAuthorized(false)
        }
      })
      .catch(function (error) {
        console.log('Error message: ' + error.message)
      })
  }

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
            <>
              <Link to="/signin">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          ) : (
            <UserButton />
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar
