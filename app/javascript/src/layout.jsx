// layout.js
import React, {useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

function Layout(props){

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("@username");

  useEffect(async () => {
    const result = await axios('/api/authenticated',
    );
    setIsLogin(result.data.authenticated);
    setUsername(result.data.authenticated.username);
  }, []);

  const handleLoginOut = () => {
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

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="#home">Airbnb <i className="fab fa-airbnb"></i></Navbar.Brand>
          {isLogin? <LoginTrueDropDown username={username} /> : <LoginFalseDropDown onLogOut={handleLoginOut} />}
        </Container>
      </Navbar>
      {props.children}
      <footer className="p-3 bg-light">
        <div>
          <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
        </div>
      </footer>
    </>
  );
}

const LoginFalseDropDown = () => {

  return (
  <>
    <Nav className="d-flex">
      <Nav.Link href="/" className="justify-content-between">Home
      </Nav.Link>
      <Nav.Link href="">
        <Button variant="secondary" className="d-none d-lg-block">Sign In</Button>
      </Nav.Link>
      <Nav.Link href="/">
        <Button variant="outline-secondary" className="d-none d-lg-block">Create An Account</Button>
      </Nav.Link>
    </Nav>
    <div className="d-block d-lg-none">
      <Dropdown>
        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
          <i className="fas fa-bars"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu align="right" id="singin-menu">
          <Dropdown.Item href="/">
            <Button variant="secondary" size="lg" block>Sign In</Button>
          </Dropdown.Item>
          <Dropdown.Item href="/">
            <Button variant="outline-secondary" size="lg" block>Create An Account</Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </>
  )
}

const LoginTrueDropDown = (props) => {

  let {username, onLogOut} = props;

  return (
    <>
      <Nav className="d-flex">
        <Nav.Link href="/" className="d-blo">Home
        </Nav.Link>
      </Nav>
      <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
        Welcome! ${username}
      </Dropdown.Toggle>
      <Dropdown.Menu align="right" id="login-menu">
        <Dropdown.Item href="#/">Your Booking</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/">Your Properties</Dropdown.Item>
        <Dropdown.Item href="#/">Your Rental</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/">Your Rental</Dropdown.Item>
        <Dropdown.Divider />
        <Button variant="outline-secondary" className="d-none d-lg-block" onClick={onLogOut}>Sign Out</Button>
      </Dropdown.Menu>
      </Dropdown>
    </>
  )
}


export default Layout;

