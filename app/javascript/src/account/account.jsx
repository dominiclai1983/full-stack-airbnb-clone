import React, {useState, useEffect} from 'react'
import Layout from '@src/layout';
import AccountLayout from './accountLayout';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home';
import Booking from './booking';
import Rental from './rental';
import UserProperty from './userProperty';
import AddProperty from './addProperty';

import './account.scss';

function Account(){

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(async () => {
    const result = await axios('/api/authenticated',
    );
    setIsLogin(result.data.authenticated);
    setUsername(result.data.username);
  },[])

  return (
    <>
      <Layout>

          <BrowserRouter>
            <AccountLayout>
              <Routes>
                <Route index path="/account" element={<Home />} />
                <Route path="/account/booking" element={<Booking />} />
                <Route path="/account/property" element={<UserProperty />} />
                <Route path="/account/property/add" element={<AddProperty />} />
              </Routes>
              </AccountLayout>
          </BrowserRouter>
      </Layout>
    </>
  )
}

export default Account;

