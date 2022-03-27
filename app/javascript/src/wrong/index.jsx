import React from 'react'
import ReactDOM from 'react-dom'
import Wrong from './wrong'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Wrong />,
    document.body.appendChild(document.createElement('div')),
  )
})