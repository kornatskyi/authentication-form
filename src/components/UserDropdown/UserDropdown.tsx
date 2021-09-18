import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import './UserDropdown.scss'
import { signout } from '../../apiCalls'

export default function UserDropdown(): ReactElement {
  return (
    <div className="userDropdownContainer">
      <div>
        <Link to="/settings">Settings</Link>
      </div>
      <div className="logOut">
        <Link
          to="/"
          onClick={() => {
            console.log('click')

            signout()
          }}
        >
          Log Out
        </Link>
      </div>
    </div>
  )
}
