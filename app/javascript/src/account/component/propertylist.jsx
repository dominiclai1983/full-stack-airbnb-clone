import React from 'react'
import Col from 'react-bootstrap/Col';

const PropertyList = (props) => {

  const {property} = props;

  return (
    <div className="d-flex my-2 py-2 border rounded">
      <Col lg={3} className="mr-1 ml-3 d-none d-lg-block">
      {property.image_url? <img src={property.image_url} alt={property.title} /> : <img src={property.image} alt={property.title} /> }
      </Col>

      <Col sx={12} lg={9} className="mt-1">
      <h5>{property.title}</h5>
      <p>Property ID: {property.id}</p>
      </Col>
    </div>
  )
}

export default PropertyList;