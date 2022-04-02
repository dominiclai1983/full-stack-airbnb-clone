import React from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const UploadImage = (props) => {

  const {previewImage, handleChange} = props;

  const placeholder = "https://picsum.photos/id/237/750/562";

  return (
    <>
      <h2>Adding an image: </h2>      
      <Col xs={12} className="mb-2">
        <Image src={previewImage? previewImage : placeholder} fluid />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload An Image For Your Properties</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleChange}/>
        </Form.Group>
      </Col>
    </>
  )
}

export default UploadImage;