import React, { useState, useEffect} from 'react'
import RentalList from './component/rentallist';
import axios from 'axios';

const Rental = () => {

  const [rentals, setRentals] = useState([]);
  
  useEffect(() => {

    const fetchData = async () => {
      const result = await axios.get('/api/rental',
      );
      setRentals(result.data.bookings);
      console.log(result.data.bookings);
    };

    fetchData();
  },[])

  return (
    <>
      <h2>This is Rental</h2>
      {rentals.map((rental, key) => {
        return <RentalList key={key} rental={rental} />
      })}
    </>
  )
}

export default Rental;