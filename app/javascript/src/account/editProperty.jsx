import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Image from 'react-bootstrap/Image';
import {
  propertyTypeArray, 
  oneToTwentyRangeArray,
  countryListAlpha2
} from './component/supportlist';
import UpdateImage from './updateImage';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import './addProperty.scss'

const EditProperty = () => {
  //:title-, :description-, :city, :country, :property_type-, 
  //:price_per_night-, :max_guests-, :bedrooms-, :beds-, :baths-
  //

  let params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [propertyType, setPropertyType] = useState('Studio');//:property_type-
  const [maxGuests, setMaxGuests] = useState(0);
  const [bedrooms, setBedRooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [pricePerNight, setPricePerNight] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/properties/${params.id}`, 
      );
      if(result.data){
        let data = {...result.data.property};
        console.log(data)
        setTitle(data.title);
        setDescription(data.description);
        setCity(data.city);
        setCountry(data.country.toUpperCase());
        setPropertyType(data.property_type);
        setMaxGuests(data.max_guests);
        setBedRooms(data.bedrooms);
        setBeds(data.beds);
        setBaths(data.baths);
        setPricePerNight(data.price_per_night);
        
        if((data.image_url && data.image) || (data.image)){
          setImageUrl(data.image);
        }else{
          setImageUrl(data.image_url);
        }
      }
    };
    fetchData();
  }, [])

  const handleChange = (event) => {
    setPreviewImage(window.URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  }

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

  const handleSubmit = (event) => {

    event.preventDefault();

    const formData = new FormData();

    formData.append('property[title]',title);
    formData.append('property[description]',description);
    formData.append('property[city]',city);
    formData.append('property[country]',country);
    formData.append('property[property_type]',propertyType);
    formData.append('property[max_guests]',maxGuests);
    formData.append('property[bedrooms]',bedrooms);
    formData.append('property[beds]',beds);
    formData.append('property[baths]',baths);
    formData.append('property[price_per_night]',pricePerNight);
    formData.append('property[image]',image);

    axios.put(`/api/properties/${params.id}`, property)
      .then(res => {
        console.log(res.data);
        if(res.data){
          document.location.href=`/account/property/${params.id}`;
        }
      })

  }

  return (
    <>
      <h2>Edit Your Property</h2>
      <Tabs defaultActiveKey="property" id="uncontrolled-tab-example">
        <Tab eventKey="property" title="Details">
          <Form className="mt-2">
              {/* -- :title -- */}
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label><i className="fas fa-house-user"></i> The Title Of Your Property *
                </Form.Label>
                <Form.Control type="text" placeholder="Your Beautiful Home" value={title} onChange={(event) => {
                  event.preventDefault();
                  setTitle(event.target.value);
                }}/>
              </Form.Group>

              {/* -- :price_per_night -- */}
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Label><i className="fas fa-house-user"></i> Price Per Night 
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
                <Form.Label><i className="fas fa-home"></i> Property Country 
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
                <Form.Label><i className="fas fa-house-user"></i> Property City 
                </Form.Label>
                <Form.Control type="text" placeholder="" value={city} onChange={(event) => {
                  event.preventDefault();
                  setCity(event.target.value);
                }}/>
              </Form.Group>

              {/* -- :property_type -- */}
              <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label><i className="fas fa-home"></i> Property Type 
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
                <Form.Label><i className="fas fa-user"></i> Number of Guests Allowed 
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
                <Form.Label><i className="fas fa-door-open"></i> Number of Bedrooms 
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
                <Form.Label><i className="fas fa-bed"></i> Number of Beds 
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
                <Form.Label><i className="fas fa-bath"></i> Number of Baths 
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
                <Form.Label><i className="far fa-clipboard"></i> Description 
                </Form.Label>
                <Form.Control as="textarea" rows={3} value={description} onChange={event => {
                  event.preventDefault();
                  setDescription(event.target.value);
                }} />
              </Form.Group>
          </Form>
        </Tab>
        <Tab eventKey="image" title="Image">
          <UpdateImage previewImage={previewImage} imageUrl={imageUrl} handleChange={handleChange} />
        </Tab>
      </Tabs> 
      <div>          
        <Form.Group className="d-flex justify-content-between">
          <Link to='/account/property'>
            <Button variant="secondary" >Cancel</Button> 
          </Link>
          <Button variant="danger" onClick={handleSubmit}>Submit</Button> 
        </Form.Group>
      </div>
    </>
  )
}

export default EditProperty;