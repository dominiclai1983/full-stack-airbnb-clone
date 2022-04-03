import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {NavLink, Outlet} from "react-router-dom";

const AccountLayout = () => {
  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <NavLink to='booking'>
              {({isActive}) => (
                <h6 className={isActive ? "text-warning" : "text-secondary"}>Your Booking</h6>
              )}
            </NavLink>

            <NavLink to='property'>
              {({isActive}) => (
                <h6 className={isActive ? "text-warning" : "text-secondary"}>Your Properties</h6>
              )}
            </NavLink>

            <NavLink to='rental'>
              {({isActive}) => (
                <h6 className={isActive ? "text-warning" : "text-secondary"}>Your Rental</h6>
              )}
            </NavLink>

            <NavLink to='profiles'>
              {({isActive}) => (
                <h6 className={isActive ? "text-warning" : "text-secondary"}>Your Account</h6>
              )}
            </NavLink>
          </Col>
          <Col xs={10}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AccountLayout;