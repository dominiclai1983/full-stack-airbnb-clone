//account -> rental
//account/property
import React, { useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import RentalList from './component/rentallist';
import { Link } from "react-router-dom";
import axios from 'axios';

const Rental = () => {

  const [rentals, setRentals] = useState([]);
  const [mode, setMode] = useState('upcoming');
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {

    const fetchData = () => {
      handleUpcoming();
    };

    fetchData();
  },[])

  const handleUpcoming = async () => {

    setIsError(false);

    try{
      const result = await axios.get('/api/rental',
      );
      setRentals(result.data.bookings);
    }catch(error){
      setIsError(true);
    }
  };

  const handleCompleted = async () => {

    setIsError(false);
    try{
      const result = await axios.get('/api/rental/completed',
      );
      setRentals(result.data.bookings);
    }catch(error){
      setIsError(true);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <h2>Your Rental</h2>
          <Col xs={12} className="mb-1 mt-2">
            <Badge pill variant={(mode === 'upcoming')? "warning": "secondary"} onClick={() => {
              handleUpcoming();
              setMode('upcoming')}} >
            Upcoming
            </Badge>{' '}

            <Badge pill variant={(mode === 'completed')? "warning": "secondary"} onClick={() => {
              handleCompleted();
              setMode('completed')}} >
            Check-Out
            </Badge>{' '}
          </Col>
          <Col xs={12}>
            {rentals.map((rental, key) => {
              return (
                <Link to={`/account/property/${rental.propertyID}`} key={key} >
                  <RentalList rental={rental} />
                </Link>
              )
            })}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Rental;