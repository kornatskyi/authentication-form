import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.scss'
import burger from '../../assets/images/icons/burger.svg'

interface Props {
  pageNames: Array<string>
  isAuthorized: boolean
}

function NavBar(props: Props) {
  const { pageNames, isAuthorized } = props

  return (
    <div className="navbar">
      <div className="burgerContainer" role="button" tabIndex={0}>
        <img src={burger} className="burger" alt="" />
      </div>
      <div id="links" className={`links on`}>
        {pageNames
          .filter((pageName) => {
            if (isAuthorized) {
              return (
                isAuthorized &&
                !(pageName === 'Sign In' || pageName === 'Sign Up')
              )
            } else {
              return !(pageName === 'User page')
            }
          })
          .map((pageName, i) => {
            return (
              <Link
                className="nav-link"
                key={i}
                to={'/' + pageName.replace(/\W/g, '').toLowerCase()}
              >
                {pageName}
              </Link>
            )
          })}
        <div className="close" role="button" tabIndex={0}></div>
      </div>
    </div>
  )
}

export default NavBar
