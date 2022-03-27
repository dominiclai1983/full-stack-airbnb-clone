// login.jsx
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from '@src/layout';
import LoginWidget from './loginWidget';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './login.scss';

class Login extends React.Component {
  state = {
    authenticated: false,
    show_login: true,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        if(data.authenticated){
          document.location.href="/";
        }
      })
  }

  render () {
    const { authenticated, show_login } = this.state;

    return (
      <Layout>
        <Container>
          <Row>
            <Col xs={12} md={9} lg={6} className="mx-auto my-4">
              <div className="border p-4">
                <LoginWidget />
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default Login;