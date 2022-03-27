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
  
  const getAllProperty = async () => {
      const result = await axios.get('/api/properties',
      );
      setProperties(result.data.properties);
      console.log(result.data.properties);

  }

  useEffect(() => {
    getAllProperty();
    return () => {
      setProperties([]);
    };
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} className="d-flex my-1">
            <h2 className="flex-grow-1">Your Properties</h2>
            <a href="/account/property/add" className="text-right">
              <Button variant="danger">Add Property</Button>
            </a>
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