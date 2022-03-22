// login.jsx
import React from 'react';
import Layout from '@src/layout';
import LoginWidget from './loginWidget';
import SignupWidget from './signupWidget';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
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

  toggle = () => {
    this.setState({
      show_login: !this.state.show_login,
    })
  }

  handleLoginOut = () => {
    fetch('/api/sessions', safeCredentials({
      method: 'DELETE'
    }))
    .then(handleErrors)
    .then(data => {
      if(data.success){
        document.location.href="/";
      }
    })
  }

  render () {
    const { authenticated, show_login } = this.state;

    return (
      <Layout login={authenticated}>
        <Container>
          <Row>
            <Col xs={12} md={9} lg={6} className="mx-auto my-4">
              <div className="border p-4">
                {show_login ? <LoginWidget toggle={this.toggle} /> : <SignupWidget toggle={this.toggle} />}
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default Login;