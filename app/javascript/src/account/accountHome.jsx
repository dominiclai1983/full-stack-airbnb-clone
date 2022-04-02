import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import './accountHome.scss';

const AccountHome = () => {

  const [ID, setID] = useState(null);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDate = async() => {
      setIsError(false);
      try{
        const result = await axios.get('api/user', 
        );
        let data = {...result.data.user};
        setID(data.user_id);
        setUserName(data.username);
        setEmail(data.email);
      }catch(error){
        setIsError(true);
      }
    };
    fetchDate();
  },[])

  return (
    <>
      <h2 className="my-3">User Details</h2>
      <Container>
        <Row>
          <Col>
            <div className="rounded border p-2 my-2 box">
              <h5 className="text-dark">User ID</h5>
              <h5 className="text-muted">{ID}</h5>
            </div>
            <div className="rounded border p-2 my-2 box">
              <h5 className="text-dark">UserName</h5>
              <h5 className="text-muted">{username}</h5>
            </div>
            <div className="rounded border p-2 my-2 box">
              <h5 className="text-dark">Email</h5>
              <h5 className="text-muted">{email}</h5>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AccountHome;