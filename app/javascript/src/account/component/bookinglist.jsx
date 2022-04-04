import React from 'react'
import Col from 'react-bootstrap/Col';
import './bookinglist.scss';

const BookingList = (props) => {

  const {booking, mode} = props

  return (

    <div className="d-flex py-2 my-1 border rounded">
      <Col lg={3} className="d-none d-lg-block">
        {booking.image_url? <img src={booking.image_url} alt={booking.title} /> : 
          <img src={booking.image} alt={booking.title} /> }
      </Col>

      <Col xs={12} lg={9} >
      <h5>{booking.title}</h5>
      <ul>
        <li>Booking ID: {booking.id}</li>
        <li className={(mode === 'upcoming')? null: "d-none"}>
          Check-In Date: {booking.start_date}
        </li>
        <li className={(mode === 'upcoming')? null: "d-none"}>
          Check-Out Date: {booking.end_date}
        </li>
        <li className={(mode === 'upcoming')? null: "d-none"}>
          Total Number Of Nights: {booking.days}
        </li>
      </ul>
      </Col>
    </div>

  )
}

export default BookingList;
