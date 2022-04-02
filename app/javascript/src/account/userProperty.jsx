import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropertyList from './component/propertylist';
import { Link } from "react-router-dom";
import axios from 'axios';

import './userProperty.scss';

const UserProperty = () => {

  const [properties, setProperties] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    const fetchData = async () => {

      setIsError(false);
      try{
        const result = await axios.get('/api/properties',
        );
        setProperties(result.data.properties);
        console.log(result.data.properties);
      }catch(error){
        setIsError(true);
      }
    };
    fetchData();
    
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} className="d-flex my-1">
            <h2 className="flex-grow-1">Your Properties</h2>
            <Link to='/account/property/add'>
              <Button variant="danger">Add Property</Button>
            </Link>
          </Col>

          <Col xs={12}>
            {properties.map(property => {
              return (
                <Link to={`/account/property/${property.id}`} key={property.id} >
                <PropertyList property={property} />
                </Link>
              )
            })}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default UserProperty;