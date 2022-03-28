import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from "react-router-dom";
import axios from 'axios';


const ListingProperty = () => {

  let params = useParams();
  const [property, setProperty] = useState([]);
  const [title, setTitle] = useState("");
  

  useEffect(async() => {
    const result = await axios.get(`/api/properties/${params.id}/booking`, );
    console.log(result.data.property);
    setProperty(result.data.property);
    setTitle(result.data.property.title)
  }, [])


  return (
    <>
      <Container>
        <Row>
          <div className="d-flex my-2 py-2">
            <Col lg={4} className="mr-1 ml-3 d-none d-lg-block">
              <img src={property.image_url} alt={title} />
            </Col>
            <Col sx={12} lg={8}>
            <h5>{title}</h5>
            </Col>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default ListingProperty;