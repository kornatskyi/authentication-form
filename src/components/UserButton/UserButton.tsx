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
      onBlur={() => setDropdownToggle(false)}
    >
      <button
        onClick={() => {
          setDropdownToggle(dropdownToggle ? false : true)
        }}
      >
        <img src={userImagePlaceholder} alt="User profile" />
      </button>
      {dropdownToggle ? <UserDropdown /> : <></>}
    </div>
  )
}

export default UserButton
