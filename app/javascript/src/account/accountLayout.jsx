import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, NavLink} from "react-router-dom";

const AccountLayout = (props) => {
  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <NavLink to='/account/booking'>
              {({isActive}) => (
                <h6 className={isActive ? "text-warning" : "text-secondary"}>Your Booking</h6>
              )}
              {/* <h6 className={isActive ? "text-warning" : "text-secondary"}>Your Booking</h6> */}
            </NavLink>

            <NavLink to='/account/property'>
              {({isActive}) => (
                <h6 className={isActive ? "text-warning" : "text-secondary"}>Your Properties</h6>
              )}
            {/* <h6 className="text-secondary">Your Properties</h6> */}
            </NavLink>

            <NavLink to='/account/rental'>
              {({isActive}) => (
                <h6 className={isActive ? "text-warning" : "text-secondary"}>Your Rental</h6>
              )}
            {/* <h6 className="text-secondary">Your Rental</h6> */}
            </NavLink>

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