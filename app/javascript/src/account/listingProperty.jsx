import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ListingBooking from './component/listingbookinglist'
import {countryListAlpha2} from './component/supportlist';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";

const ListingProperty = () => {

  let params = useParams();
  const [bookings, setBookings] = useState([]);
  const [property, setProperty] = useState({});
  const [mode, setMode] = useState('upcoming');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      getUpcomingBooking();
    };
    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try{
        const result = await axios.get(`/api/properties/${params.id}`, );
        if(result.data){
          console.log(result.data);
          setProperty(result.data.property);
        }
      }catch(error){
        setIsError(true);
      }
    } 
    fetchData();
  },[]);

  const getUpcomingBooking = async() => {
    setIsError(false);
    try{
      const result = await axios.get(`/api/properties/${params.id}/bookings`, );
      if(result.data){
        console.log(result.data.bookings);
        setBookings(result.data.bookings);
      }
    }catch(error){
      setIsError(true);
    }
  }

  const getCompletedBooking = async () => {
    setIsError(false);
    try{
      const result = await axios.get(`/api/properties/${params.id}/completed`, 
      );
      if(result.data){
        console.log(result.data.bookings);
        setBookings(result.data.bookings);
      }
    }catch(error){
      setIsError(true); 
    }
  }
  
  const findCountry = (obj, countryCode) => {
    let result = Object.entries(obj).filter(([key,value]) => key === countryCode).flat();
    return result[1];
  }

  return (
    <>
      <Container>
        <Row>
          <div className="d-flex my-1">
            <Col lg={4} className="mr-1 ml-3 d-none d-lg-block">
              {property.image_url? 
                <Image src={property.image_url} rounded style={{width: "175px", height: "131px"}}/> :
                <Image src={property.image} rounded style={{width: "175px", height: "131px"}}/> 
              }
            </Col>
            <Col sx={12} lg={8}>
            <div className="d-inline-flex align-items-center">
              <h5 className="mr-auto">{property.title}</h5>
              <Link to={`/account/property/${params.id}/edit`}>
                <Button variant="danger">Change</Button>
              </Link>
            </div>
            <ul>
              <li>Property ID: {property.id}</li>
              <li>Price: {property.price_per_night}</li>
              <li>Country: {findCountry(countryListAlpha2,property.country)}</li>
              <li>City: {property.city}</li>
            </ul>

            </Col>
          </div>
        </Row>
        
        <Row className={bookings.length? null: "d-none"}>
          <Col sx={12}>
            <Badge variant={(mode === 'upcoming')? "warning": "secondary"} onClick={() => {
              getUpcomingBooking();
              setMode('upcoming');
            }}>Upcoming</Badge>{' '}

            <Badge variant={(mode === 'completed')? "warning": "secondary"} onClick={() => {
              getCompletedBooking();
              setMode('completed');
            }}>Completed</Badge>
          </Col>
        </Row>
        <Row>
          <Col sx={12}>
            {bookings.map((booking, key) => {
              return ( <ListingBooking booking={booking} key={key} />
              )
            })}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ListingProperty;
