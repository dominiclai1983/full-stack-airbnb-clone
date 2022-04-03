import React from 'react'
import Col from 'react-bootstrap/Col';
import './bookinglist.scss';

const RentalList = (props) => {

  const {rental} = props

  return (

    <div className="d-flex border mt-2 py-1">
      <Col lg={3} className="mr-1 ml-3 d-none d-lg-block">
        {rental.image_url? <img src={rental.image_url} alt={rental.title} /> : <img src={rental.image} alt={rental.title} /> }
      </Col>

      <Col xs={12} lg={9} className="mt-1">
      <h5 className="text-muted">{rental.title}</h5>
      <ul>
        <li>Rental ID: {rental.id}</li>
        <li>Start Date: {rental.start_date}</li>
        <li>End Date: {rental.end_date}</li>
        <li>Guess Name: {rental.username}</li>
      </ul>
      
      </Col>
    
    </div>

  )
}

export default RentalList;
