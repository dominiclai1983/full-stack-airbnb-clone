import React, {useState} from 'react'
import Col from 'react-bootstrap/Col';
import './bookinglist.scss';

const BookingList = (props) => {

  const {booking} = props

  return (
    <div className="d-flex my-2">
      <Col sm={3} className="mr-1 ml-3"><img src={booking.image_url} alt={booking.title} />
      </Col>

      <Col sm={9} className="mt-1">
      <h5>{booking.title}</h5>
      <p>Booking ID: {booking.id}</p>
      </Col>
    </div>
  )
}

export default BookingList;
