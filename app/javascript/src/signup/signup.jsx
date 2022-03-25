import React, {useState, useEffect} from 'react'
import Layout from '@src/layout';
import SignupWidget from './signupWidget';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const Signup = () => {

  useEffect(async () => {
    const result = await axios('/api/authenticated',
    );
    if(result.data.authenticated){
      document.location.href="/";
    }
  }, []);

  return (
    <Layout>
      <Container>
        <Row>
          <Col xs={12} md={9} lg={6} className="mx-auto my-4">
            <div className="border p-4">
              <SignupWidget />
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Signup;
