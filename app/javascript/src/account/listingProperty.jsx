//account -> properties -> single properties dashboards ->
//account/property/:id 
// :id = let params = useParams();
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
  const [mode, setMode] = useState('upcoming');//has two states, upcoming and completed
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
        //getting details of specific property according to property_id
        if(result.data){
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
      //getting details of upcoming bookings, default loading information when loading the page
      if(result.data){
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
      //getting details of completed bookings, shown when user click completed button
      );
      if(result.data){
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
  
  // <NoBooking /> shown when property.length === 0, i.e no booking at all
  const NoBooking = () => {
    return (
      <h5 className="text-warning">More Booking Is Coming!</h5>
    )
  }

  const imageLogic = () => {
    if((property.image_url && property.image) || property.image){
      return property.image;
    }else{
      return property.image_url;
    }
  }

  return (
    <>
      <Container fluid>
        <Row>
          <div className="d-flex my-1">
            <Col lg={5} className="mr-1 ml-3 d-none d-lg-block">
              <Image src={imageLogic()} rounded style={{width: "175px", height: "131px"}}/>
            </Col>
            <Col xs={12} lg={7}>
            <div className="d-flex align-items-center">
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
        
        <Row className={bookings.length? null : "d-none"}>
          <Col xs={12}>
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
          <Col xs={12}>
            {bookings.map((booking, key) => {
              return ( <ListingBooking booking={booking} key={key} />
              )
            })}
            {bookings.length === 0? <NoBooking /> : null}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ListingProperty;
