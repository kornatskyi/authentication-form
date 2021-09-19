import React, { useState } from 'react'
import userImagePlaceholder from '../../assets/images/placeholders/user_image_placeholder.png'
import UserDropdown from '../UserDropdown/UserDropdown'
import './UserButton.scss'
// interface Props {

// }

const UserButton = () => {
  const [dropdownToggle, setDropdownToggle] = useState(false)
  return (
    <div
      className="userButtonContainer"
      //wrong way to to this, should be fixed (remove timeout)
      onBlur={() =>
        setTimeout(() => {
          setDropdownToggle(false)
        }, 100)
      }
    >
      <button
        onClick={() => {
          setDropdownToggle(dropdownToggle ? false : true)
        }}
      >
        <img src={userImagePlaceholder} alt="User profile" />
        <span>
          Me{' '}
          <svg
            id="global-nav-icon--classic__down-arrow"
            width="16"
            height="16"
            data-supported-dps="16x16"
          >
            <path d="M8.8 10.66L14 5.12a.07.07 0 00-.07-.12H2.07a.07.07 0 00-.07.12l5.2 5.54a1.1 1.1 0 001.6 0z"></path>
          </svg>
        </span>
      </button>
      {dropdownToggle ? <UserDropdown /> : <></>}
    </div>
  )
}

export default UserButton
