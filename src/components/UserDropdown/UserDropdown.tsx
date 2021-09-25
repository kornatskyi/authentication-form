import React, { ReactElement, useContext } from 'react'
import { Link } from 'react-router-dom'
import './UserDropdown.scss'
import { signOut } from '../../apiCalls'
import { AppContext } from '../../App'

export default function UserDropdown(): ReactElement {
  const { setIsAuthorized } = useContext(AppContext)

  const handleLogOut = () => {
    signOut()
      .then(() => {
        console.log('You logged out!')

        setIsAuthorized(false)
      })
      .catch((err) => {
        console.log("Can't log out")

        console.log(err)
      })
      .finally(() => {
        window.location.reload()
      })
  }
  return (
    <div className="userDropdownContainer">
      <div>
        <Link to="/settings">Settings</Link>
      </div>
      <div className="logOut">
        <Link to="/" onClick={handleLogOut}>
          Log Out
        </Link>
      </div>
    </div>
  )
}
