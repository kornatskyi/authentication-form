import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import './UserDropdown.scss'

export default function UserDropdown(): ReactElement {
  return (
    <div className="userDropdownContainer">
      <div>
        <Link to="/">Settings</Link>
      </div>
      <div className="logOut">
        <Link to="/">Log Out</Link>
      </div>
    </div>
  )
}
