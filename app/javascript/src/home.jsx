// home.jsx
import React from 'react';
import ReactDOM from 'react-dom'
import Layout from '@src/layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { handleErrors } from '@utils/fetchHelper';
import Index from './index';
import Login from './login/login';
import Signup from './signup/signup';
import AccountLayout from './account/accountLayout';
import AccountHome from './account/accountHome';
import Booking from './account/booking';
import UserProperty from './account/userProperty';
import AddProperty from './account/addProperty';
import ListingProperty from './account/listingProperty';
import EditProperty from './account/editProperty';
import Rental from './account/rental';
import Wrong from './wrong/wrong';

import './home.scss';

class Home extends React.Component {

  state = {
    authenticated: false
  }

  componentDidMount(){
    //check login status
    fetch('/api/authenticated')
    .then(handleErrors)
    .then(data => {
      if(data.authenticated){
        this.setState({
          authenticated: data.authenticated,
        })
        console.log(data.authenticated);
      }
    })
  }

 render (){

  return (
    <>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route index element={<Index />} />
            <Route path="/" element={<Index />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            {/*nested route for account section*/}
              <Route path="account" element={<AccountLayout />} >
                <Route index element={<AccountHome />} />
                <Route path="profiles" element={<AccountHome />} />
                <Route path="booking" element={<Booking />} />
                <Route path="property" element={<UserProperty />} />
                <Route path="property/add" element={<AddProperty />} />
                <Route path="property/:id" element={<ListingProperty />} />
                <Route path="property/:id/edit" element={<EditProperty />} />
                <Route path="rental" element={<Rental />} /> 
                <Route path="*" element={<Wrong />} /> 
              </Route>
          </Routes>
        </BrowserRouter>
      </Layout>
    </>
  );
 }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})