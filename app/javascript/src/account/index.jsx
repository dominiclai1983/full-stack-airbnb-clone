import React from 'react';
import ReactDOM from 'react-dom';
import Account from './account';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Account />,
    document.body.appendChild(document.createElement('div')),
  )
})