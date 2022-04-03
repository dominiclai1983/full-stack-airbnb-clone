import React from 'react'
import Col from 'react-bootstrap/Col';
import './bookinglist.scss';

const BookingList = (props) => {

  const {booking, index, mode} = props

  const checkBorder = (index) => { //programatically to add border class
    if (( index + 1 ) %2 != 0){
      return "d-flex my-2 py-2 border rounded"
    }else{
      return "d-flex my-2 py-2"
    }
  }

  return (

    <div className={checkBorder(index)}>
      <Col lg={3} className="mr-1 ml-3 d-none d-lg-block">
        <img src={booking.image_url} alt={booking.title} />
      </Col>

      <Col sx={12} lg={9} className="mt-1">
      <h5>{booking.title}</h5>
      <p>Booking ID: {booking.id}</p>
      <p className={(mode === 'upcoming')? null: "d-none"}>Check-In Date: {booking.start_date}</p>
      </Col>
    </div>

  )
}

export default BookingList;
