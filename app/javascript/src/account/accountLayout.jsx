import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const AccountLayout = (props) => {
  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
          <Link to='/account/booking'>
            <h6 className="text-secondary">Your Booking</h6>
          </Link>
            <Link to='/account/user_property'>
            <h6 className="text-secondary">Your Properties</h6>
            </Link>

            <Link to='/account/rental'>
            <h6 className="text-secondary">Your Rental</h6>
            </Link>
            <Link to='/account'>
            <h6 className="text-secondary">Your Account</h6>
            </Link>
          </Col>
          <Col xs={10}>
            {props.children} 
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AccountLayout;