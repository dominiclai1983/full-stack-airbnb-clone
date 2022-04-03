import React from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const UpdateImage = (props) => {

  const {previewImage, imageUrl, handleChange} = props;

  return (
    <>
      <h2>Adding an image: </h2>      
      <Col xs={12} className="mb-2">
        <Image src={previewImage? previewImage : imageUrl} fluid />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload An Image For Your Properties</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleChange}/>
        </Form.Group>
      </Col>
    </>
  )
}

export default UpdateImage;