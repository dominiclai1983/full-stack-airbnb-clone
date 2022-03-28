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
  const [username, setUsername] = useState("");

  useEffect(async () => {

      const result = await axios('/api/authenticated',
      );
      setIsLogin(result.data.authenticated);
      setUsername(result.data.username);
  }, []);

  const handleLoginOut = async () => {

    try {
      const result = await axios.delete('/api/sessions', );
      console.log(result.data);
    }catch (err){
      console.error(err);
    }

  }

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="/">Airbnb <i className="fab fa-airbnb"></i></Navbar.Brand>
          {isLogin? <LoginTrueDropDown username={username} onLogOut={handleLoginOut}/> : <LoginFalseDropDown />}
          {/* this is a very expensive lesson on wrongly passing down!!!*/}
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
      <Nav.Link href="/login">
        <Button variant="secondary" className="d-none d-lg-block">Sign In</Button>
      </Nav.Link>
      <Nav.Link href="/signup">
        <Button variant="outline-secondary" className="d-none d-lg-block">Create An Account</Button>
      </Nav.Link>
    </Nav>
    <div className="d-block d-lg-none">
      <Dropdown>
        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
          <i className="fas fa-bars"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu align="right" id="singin-menu">
          <Dropdown.Item href="/login">
            <Button variant="secondary" size="lg" block>Sign In</Button>
          </Dropdown.Item>
          <Dropdown.Item href="/signup">
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
        <Nav.Link href="/" className="d-block">Home
        </Nav.Link>
      </Nav>
      <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
        Welcome! ${username}
      </Dropdown.Toggle>
      <Dropdown.Menu align="right" id="login-menu">

        <Dropdown.Item href="/account/booking">Your Booking</Dropdown.Item>
        <Dropdown.Divider />

        <Dropdown.Item href="/account/property">Your Properties</Dropdown.Item>
        <Dropdown.Item href="/account/rental">Your Rental</Dropdown.Item>
        <Dropdown.Divider />

        <Dropdown.Item href="/account">Your Account</Dropdown.Item>
        <Dropdown.Divider />

        <Dropdown.Item href="/" onClick={onLogOut}>
        <Button variant="outline-secondary" size="lg" block>Sign Out</Button>
        </Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
    </>
  )
}


export default Layout;

