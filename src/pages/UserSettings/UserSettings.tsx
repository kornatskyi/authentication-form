import React, { ReactElement } from 'react'
import RightBar from './RightBar'
import './UserSettings.scss'

export default function UserSettings(): ReactElement {
  return (
    <div className="userSettingsContainer">
      <div className="leftBar">
        <button className="active">Profile</button>
      </div>
      <RightBar />
    </div>
  )
}
