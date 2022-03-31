import React, {useState, useEffect} from 'react'
import Layout from '@src/layout';
import Booking from './booking';
import Rental from './rental';
import AccountHome from './home';
import UserProperty from './userProperty';
import AddProperty from './addProperty';
import AccountLayout from './accountLayout';
import ListingProperty from './listingProperty';
import EditProperty from './editProperty';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';

import './account.scss';

function Account(){

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {

    const fetchData = async () => {
      const result = await axios('/api/authenticated',
      );
      setIsLogin(result.data.authenticated);
      setUsername(result.data.username);
    };

    fetchData();
    
  },[])

  return (
    <>
      <Layout>
          <BrowserRouter>
            <AccountLayout>
              <Routes>
                <Route index path="/account" element={<AccountHome />} />
                <Route path="/account/booking" element={<Booking />} />
                <Route path="/account/property" element={<UserProperty />} />
                <Route path="/account/property/add" element={<AddProperty />} />
                <Route path="/account/property/:id" element={<ListingProperty />} />
                <Route path="/account/property/:id/edit" element={<EditProperty />} />
                <Route path="/account/rental" element={<Rental />} />
              </Routes>
              </AccountLayout>
          </BrowserRouter>
      </Layout>
    </>
  )
}

export default Account;

