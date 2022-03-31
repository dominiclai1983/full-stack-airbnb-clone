import React from 'react'

const ListingBooking = (props) => {

  let {booking} = props;

  return (
    <div className="d-flex my-2 border rounded-pill justify-content-around align-items-center">
      <h6>Booking ID: {booking.id}</h6>
      <h6>Username: {booking.username}</h6>
    </div>
  )
}

export default ListingBooking;