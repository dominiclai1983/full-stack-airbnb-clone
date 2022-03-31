import React from 'react'
import Col from 'react-bootstrap/Col';
import './bookinglist.scss';

const RentalList = (props) => {

  const {rental} = props

  return (

    <div className="d-flex border mt-2">
      <Col lg={3} className="mr-1 ml-3 d-none d-lg-block"><img src={rental.image_url} alt={rental.title} />
      </Col>

      <Col sx={12} lg={9} className="mt-1">
      <h5>{rental.title}</h5>
      <p>Rental ID: {rental.id}</p>
      {/* <p className={(mode === 'upcoming')? null: "d-none"}>Check-In Date: {booking.start_date}</p> */}
      </Col>
    
    </div>

  )
}

export default RentalList;
