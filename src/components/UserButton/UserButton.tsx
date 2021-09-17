import React from 'react'
import userImagePlaceholder from '../../assets/images/placeholders/user_image_placeholder.png'
import './UserButton.scss'
// interface Props {

// }

const UserButton = () => {
  return (
    <div className="userButtonContainer">
      <button>
        <img src={userImagePlaceholder} alt="User profile" />
      </button>
    </div>
  )
}

export default UserButton
