// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import Login from './login/login';
import AccountHome from './account/accountHome'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { handleErrors } from '@utils/fetchHelper';
import AccountLayout from './account/accountLayout';
import Booking from './account/booking';
import Wrong from './wrong/wrong';
import UserProperty from './account/userProperty';

import './home.scss';

class Index extends React.Component {
  state = {
    properties: [],
    total_pages: null,
    next_page: null,
    loading: true,
    authenticated: false
  }

  componentDidMount() {

    /* fetch('/api/properties?page=1') */
    const LISTING_URL = process.env.LISTING_URL;

    fetch(LISTING_URL+1)
      .then(handleErrors)
      .then(data => {
        this.setState({
          properties: data.properties,
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        })
      })


  }

  loadMore = () => {
    if (this.state.next_page === null) {
      return;
    }
    this.setState({ loading: true });
    /*fetch(`/api/properties?page=${this.state.next_page}`)*/
    /* testing out how to use ENV varaiable only */
    const LISTING_URL = process.env.LISTING_URL;

    fetch(LISTING_URL+this.state.next_page)
      .then(handleErrors)
      .then(data => {
        this.setState({
          properties: this.state.properties.concat(data.properties),
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        })
      })
  }

  render () {
    const { properties, next_page, loading } = this.state;
    return (

        <div className="container pt-4">
          <h4 className="mb-1">Top-rated places to stay</h4>
          <p className="text-secondary mb-3">Explore some of the best-reviewed stays in the world</p>
          <div className="row">
            {properties.map(property => {
              return (
                <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                  <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                    <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})` }} />
                    <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                    <h6 className="mb-0">{property.title}</h6>
                    <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                  </a>
                </div>
              )
            })}
          </div>
          {loading && <p>loading...</p>}
          {(loading || next_page === null) ||
            <div className="text-center">
              <button
                className="btn btn-light mb-4"
                onClick={this.loadMore}
              >load more</button>
            </div>
          }
        </div>
    )
  }
}

export default Index;