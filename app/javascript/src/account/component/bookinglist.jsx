import React from 'react'
import Col from 'react-bootstrap/Col';
import './bookinglist.scss';

const BookingList = (props) => {

  const {booking, mode} = props

  return (

    <div className="d-flex my-2 py-2 border rounded">
      <Col lg={3} className="mr-1 ml-3 d-none d-lg-block">
        <img src={booking.image_url} alt={booking.title} />
      </Col>

      <Col xs={12} lg={9} className="mt-1">
      <h5>{booking.title}</h5>
      <ul>
        <li>Booking ID: {booking.id}</li>
        <li>Total Price: {booking.id}</li>
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
