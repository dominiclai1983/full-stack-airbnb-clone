import React from 'react'
import ReactDOM from 'react-dom'
import Signup from './signup'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Signup />,
    document.body.appendChild(document.createElement('div')),
  )
})