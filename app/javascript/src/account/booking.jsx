import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import BookingList from './component/bookinglist';
import axios from 'axios';

import './booking.scss'

const Booking = () => {

  const [bookings, setBookings] = useState([]);//any array to hold all the booking returns from server
  const [mode, setMode] = useState('upcoming')//with mode: upcoming, completed, cancelled
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    
    const fetchData = async () => {
      setIsError(false);
      try{
        const result = await axios.get('/api/bookings',    
        );
        setBookings(result.data.bookings);
      }catch(error){
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  const handleUpcoming = async () => {

    setIsError(false);
    try{
      const result = await axios.get('/api/bookings',    
      );
      setBookings(result.data.bookings);
    }catch(error){
      setIsError(true);
    }
}

  const handleCompleted = async () => {

    setIsError(false);
    try{
      const result = await axios.get('/api/bookings/completed',);
      setBookings(result.data.bookings);
    }catch(error){
      setIsError(true);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <h2>Your Bookings</h2>
          <Col xs={12} className="mb-1 mt-2">
            <Badge pill variant={(mode === 'upcoming')? "warning": "secondary"} onClick={() => {
              handleUpcoming();
              setMode('upcoming')}} >
            Upcoming
            </Badge>{' '}

            <Badge pill variant={(mode === 'completed')? "warning": "secondary"} onClick={() => {
              handleCompleted();
              setMode('completed')}} >
            Completed
            </Badge>{' '}
          </Col>

          <Col xs={12}>
          {bookings.length === 0? <h6>More Booking Soon!</h6> : null}
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

