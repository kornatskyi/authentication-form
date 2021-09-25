import React, { ReactElement } from 'react'
import RightBar from './RightBar'
import './UserSettings.scss'

export default function UserSettings(): ReactElement {
  return (
    <div className="userSettingsContainer">
      <div className="leftBar">
        <button className="active">Profile</button>
        <button className="">Some other tabs</button>
      </div>
      <RightBar />
    </div>
  )
}
