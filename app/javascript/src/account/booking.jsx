import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import BookingList from './component/bookinglist';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { 
  safeCredentials, 
  handleErrors, 
  checkStatus, 
  json } from '@utils/fetchHelper';

const Booking = () => {

  const [bookings, setBookings] = useState([]);
  const [mode, setMode] = useState('upcoming')//with mode: upcoming, completed, cancelled

  const handeUpcoming = async () => {

    const result = await axios('/api/bookings',    
    );
    console.log(result.data.bookings);
    console.log(result.data);
    setBookings(result.data.bookings);
  }

  useEffect(handeUpcoming, []);

  const handleCompleted = async () => {

   try{
     const result = await axios.get('/api/bookings/completed',);
     console.log(result.data);
     setBookings(result.data.bookings);
   }catch(err){
     console.log(err);
   }

  };

  return (
    <>
      <Container>
        <Row>

          <Col xs={12} className="ml-4 my-3">
            <Badge pill variant={(mode === 'upcoming')? "primary": "secondary"} onClick={() => {
              handeUpcoming();
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
          {bookings.map(booking => {
            return <BookingList key={booking.id} booking={booking} />
          })}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Booking;

