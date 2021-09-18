import React, { ReactElement, useContext } from 'react'
import { Link } from 'react-router-dom'
import './UserDropdown.scss'
import { signout } from '../../apiCalls'
import { AuthorizedContext } from '../../App'

export default function UserDropdown(): ReactElement {
  const { setIsAuthorized } = useContext(AuthorizedContext)
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
              .then((res) => {
                setIsAuthorized(false)
              })
              .catch((err) => {
                console.log("Can't sign out")

                console.log(err)
              })
          }}
        >
          Log Out
        </Link>
      </div>
    </div>
  )
}
