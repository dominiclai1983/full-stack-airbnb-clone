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
  const [total_pages, setTotalPages] = useState(null);
  const [next_page, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    const fetchData = async () => {

      setIsError(false);
      try{
        const result = await axios.get('/api/rental/properties?page=1',
        );
        setProperties(result.data.properties);
        setTotalPages(result.data.total_pages);
        setNextPage(result.data.next_page);
        setLoading(false);
      }catch(error){
        setIsError(true);
      }
    };
    fetchData();
    
  }, []);

  const loadMore = async () => {
    if (next_page === null){
      return;
    }
    setLoading(true);

    setIsError(false);
    try{
      const result = await axios.get(`/api/rental/properties?page=${next_page}`,
      );
      setProperties(result.data.properties);
      setTotalPages(result.data.total_pages);
      setNextPage(result.data.next_page);
      setLoading(false);
    }catch(error){
      setIsError(true);
    }

  }

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
        {loading && <p>loading...</p>}
        {(loading || next_page === null) ||
            <div className="text-center">
              <button
                className="btn btn-light mb-4"
                onClick={loadMore}
              >load more</button>
            </div>
          }
      </Container>
    </>
  )
}

export default UserProperty;