import React from 'react';
import ReactDOM from 'react-dom';
import Success from './success';

document.addEventListener('DOMContentLoaded', () => {

  const node = document.getElementById('params');
  const booking = JSON.parse(node.getAttribute('data-params'));

  ReactDOM.render(
    <Success booking_id={booking.booking_id} />,
    document.body.appendChild(document.createElement('div')),
  )
})
