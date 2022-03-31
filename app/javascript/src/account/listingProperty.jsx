import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ListingBooking from './component/listingbookinglist'
import { useParams } from "react-router-dom";
import axios from 'axios';


const ListingProperty = () => {

  let params = useParams();
  const [bookings, setBookings] = useState([]);
  const [property, setProperty] = useState({});
  const [mode, setMode] = useState('upcoming');

  useEffect(() => {

    const fetchData = async () => {
      const result = await axios.get(`/api/properties/${params.id}/bookings`, );
      if(result.data){
        console.log(result.data.bookings);
        setBookings(result.data.bookings);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/properties/${params.id}`, );
      if(result.data){
        console.log(result.data);
        setProperty(result.data.property);
      }
    }
    fetchData();
  },[])

  const getUpcomingBooking = async() => {
    const result = await axios.get(`/api/properties/${params.id}/bookings`, );
    if(result.data){
      console.log(result.data.bookings);
      setBookings(result.data.bookings);
    }
  }

  const getCompletedBooking = async () => {
    const result = await axios.get(`/api/properties/${params.id}/completed`, 
    );
    if(result.data){
      console.log(result.data.bookings);
      setBookings(result.data.bookings);
    }
  }

  return (
    <>
      <Container>
        <Row>
          <div className="d-flex my-2 py-2">
            <Col lg={4} className="mr-1 ml-3 d-none d-lg-block">
              <img src={property.image_url} />
            </Col>
            <Col sx={12} lg={8}>
            <h5>{property.title}</h5>
            <p>{property.id}</p>
            <Button variant="danger">Change</Button> 
            </Col>
          </div>
        </Row>

        <hr/>

        <Row>
          <Col sx={12}>
            <Badge variant={(mode === 'upcoming')? "primary": "secondary"} onClick={() => {
              getUpcomingBooking();
              setMode('upcoming');
            }}>Upcoming</Badge>{' '}

            <Badge variant={(mode === 'completed')? "primary": "secondary"} onClick={() => {
              getCompletedBooking();
              setMode('completed');
            }}>Completed</Badge>
          </Col>
        </Row>
        <Row>
          <Col sx={12}>
            {bookings.map(booking => {
              return ( <ListingBooking booking={booking} />
              )
            })}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ListingProperty;
