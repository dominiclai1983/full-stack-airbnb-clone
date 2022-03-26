import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {
  propertyTypeArray, 
  oneToTwentyRangeArray,
  countryListAlpha2
} from './component/supportlist';
import axios from 'axios';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './addProperty.scss'

const AddProperty = () => {
  //:title-, :description-, :city, :country, :property_type-, 
  //:price_per_night-, :max_guests-, :bedrooms-, :beds-, :baths-

  //
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("San Francisco");
  const [country, setCountry] = useState("United States of America");
  const [propertyType, setPropertyType] = useState('Studio');//:property_type-
  const [maxGuests, setMaxGuests] = useState(0);
  const [bedrooms, setBedRooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [pricePerNight, setPricePerNight] = useState(0);

  const [countrySearch, setCountrySearch] = useState("");

  const property = {
    title: title,
    description: description,
    city: city,
    country: country,
    property_type: propertyType,
    max_guests: maxGuests,
    bedrooms: bedrooms,
    beds: beds,
    baths: baths,
    price_per_night: pricePerNight
  }

  const handleSubmit = () => {

    fetch('/api/properties', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        property: property
      })
    }))
    .then(handleErrors)
    .then(res => {
      console.log(res);
    })

  }

  return (
    <>
      <h2>Adding new property</h2>
      <Form>
        {/* -- :title -- */}
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label><i class="fas fa-house-user"></i> The Title Of Your Property *
          </Form.Label>
          <Form.Control type="text" placeholder="My Beautiful Home" value={title} onChange={(event) => {
            event.preventDefault();
            setTitle(event.target.value);
          }}/>
        </Form.Group>

        {/* -- :price_per_night -- */}
        <Form.Group controlId="exampleForm.ControlInput2">
          <Form.Label><i class="fas fa-house-user"></i> Price Per Night 
          </Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="number" 
              aria-label="Amount (to the nearest dollar)"
              value={pricePerNight}
              onChange={(event) => {
                event.preventDefault();
                setPricePerNight(parseInt(event.target.value));
              }}
            />
          </InputGroup>
        </Form.Group>

        {/* -- :country -- */}
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label><i class="fas fa-home"></i> Property Country 
          </Form.Label>
          <Form.Control as="select" value={country} onChange={(event) => {
            console.log(event.target.value);
            setCountry(event.target.value);
          }}>
            {Object.entries(countryListAlpha2).map(([key, item], index) => {
              return (<option key={index} value={key}>{item}</option>)
            })}
          </Form.Control>
        </Form.Group>

        {/* -- :city -- */}
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label><i class="fas fa-house-user"></i> Property City 
          </Form.Label>
          <Form.Control type="text" placeholder="" value={city} onChange={(event) => {
            event.preventDefault();
            setCity(event.target.value);
          }}/>
        </Form.Group>

        {/* -- :property_type -- */}
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label><i class="fas fa-home"></i> Property Type 
          </Form.Label>
          <Form.Control as="select" value={propertyType} onChange={(event) => {
            console.log(event.target.value);
            setPropertyType(event.target.value);
          }}>
            {propertyTypeArray.map((item,key) => {
              return (<option key={key} value={item}>{item}</option>)
            })}
          </Form.Control>
        </Form.Group>
        
        {/* -- :max_guests -- */}
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label><i class="fas fa-user"></i> Number of Guests Allowed 
          </Form.Label>
          <Form.Control as="select" value={maxGuests} onChange={(event) => {
            console.log(event.target.value);
            setMaxGuests(event.target.value);
          }}>
            {oneToTwentyRangeArray().map((item, key) => {
              return (<option key={key} value={item}>{item}</option>)
            })}
          </Form.Control>
        </Form.Group>

        {/* -- :bedrooms -- */}
        <Form.Group controlId="exampleForm.ControlSelect3">
          <Form.Label><i class="fas fa-door-open"></i> Number of Bedrooms 
          </Form.Label>
          <Form.Control as="select" value={bedrooms} onChange={(event) => {
            console.log(event.target.value);
            setBedRooms(event.target.value);
          }}>
            {oneToTwentyRangeArray().map((item, key) => {
              return (<option key={key} value={item}>{item}</option>)
            })}
          </Form.Control>
        </Form.Group>

        {/* -- :beds -- */}
        <Form.Group controlId="exampleForm.ControlSelect3">
          <Form.Label><i class="fas fa-bed"></i> Number of Beds 
          </Form.Label>
          <Form.Control as="select" value={beds} onChange={(event) => {
            console.log(event.target.value);
            setBeds(event.target.value);
          }}>
            {oneToTwentyRangeArray().map((item, key) => {
              return (<option key={key} value={item}>{item}</option>)
            })}
          </Form.Control>
        </Form.Group>

        {/* -- :baths -- */}
        <Form.Group controlId="exampleForm.ControlSelect3">
          <Form.Label><i class="fas fa-bath"></i> Number of Baths 
          </Form.Label>
          <Form.Control as="select" value={baths} onChange={(event) => {
            console.log(event.target.value);
            setBaths(event.target.value);
          }}>
            {oneToTwentyRangeArray().map((item, key) => {
              return (<option key={key} value={item}>{item}</option>)
            })}
          </Form.Control>
        </Form.Group>        

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label><i class="far fa-clipboard"></i> Description 
          </Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={event => {
            event.preventDefault();
            setDescription(event.target.value);
          }} />
        </Form.Group>

        <Form.Group className="text-right">
        <Button variant="danger" onClick={handleSubmit}>Add Property</Button> 
        </Form.Group>
      </Form>
    </>
  )
}

export default AddProperty;