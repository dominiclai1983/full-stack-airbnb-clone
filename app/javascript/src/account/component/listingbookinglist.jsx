import React from 'react'

const ListingBooking = (props) => {

  let {booking} = props;

  return (
    <div className="d-flex pt-2 pm-1 my-1 border rounded-pill justify-content-around align-middle">
      <h6>Booking ID: {booking.id}</h6>
      <h6>Username: {booking.username}</h6>
      <h6>Start Date: {booking.start_date}</h6>
      <h6>Start Date: {booking.start_date}</h6>
    </div>
  )
}

export default ListingBooking;