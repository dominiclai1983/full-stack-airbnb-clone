import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import BookingList from './component/bookinglist';


import './booking.scss'

const Booking = () => {

  const [bookings, setBookings] = useState([]);//any array to hold all the booking returns from server
  const [mode, setMode] = useState('upcoming')//with mode: upcoming, completed, cancelled

  const handleUpcoming = async () => {

    const result = await axios('/api/bookings',    
    );
    setBookings(result.data.bookings);
  }

  useEffect(handleUpcoming, []);

  const handleCompleted = async () => {

   try{
     const result = await axios.get('/api/bookings/completed',);
     setBookings(result.data.bookings);
   }catch(err){
     console.log(err);
   }

  };

  return (
    <>
      <Container>
        <Row>
          <h2>Your Bookings</h2>
          <Col xs={12} className="ml-4 my-3">
            <Badge pill variant={(mode === 'upcoming')? "primary": "secondary"} onClick={() => {
              handleUpcoming();
              setMode('upcoming')}} >
            Upcoming
            </Badge>{' '}

            <Badge pill variant={(mode === 'completed')? "primary": "secondary"} onClick={() => {
              handleCompleted();
              setMode('completed')}} >
            Completed
            </Badge>{' '}

            <Badge pill variant={(mode === 'cancelled')? "primary": "secondary"} onClick={() => setMode('cancelled')}>
            Cancelled
            </Badge>{' '}
          </Col>

          <Col xs={12}>
          {bookings.map((booking, index) => {
            return <BookingList key={booking.id} booking={booking} index={index} mode={mode} />
          })}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Booking;

