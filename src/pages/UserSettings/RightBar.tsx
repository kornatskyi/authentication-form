import React, { ReactElement } from 'react'
import placeholder from '../../assets/images/placeholders/user_image_placeholder.png'

export default function RightBar(): ReactElement {
  return (
    <div className="rightBar">
      <Profile />
    </div>
  )
}

function Profile(): ReactElement {
  return (
    <div className="profileContainer">
      <div className="avatar">
        <h4>Profile picture</h4>
        <img src={placeholder} alt="" />
      </div>
      <div className="email">
        <h4>Name</h4>
        <input type="text" placeholder="UserName" />
      </div>
      <div className="name">
        <h4>Email</h4>
        <input type="text" placeholder="useremail@gmail.com" />
      </div>
      <div>
        <button className="update">Update profile</button>
      </div>
      <div>
        <button className="delete">Delete profile</button>
      </div>
    </div>
  )
}
