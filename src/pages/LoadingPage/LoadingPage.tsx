import React, { ReactElement } from 'react'
import '../../styles/animations/loader.scss'

export default function LoadingPage(): ReactElement {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  )
}
