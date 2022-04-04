import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Success = (props) => {

  let {booking_id} = props;
  const [title, setTitle] = useState("");
  const [dispatch, setDispatch] = useState(null);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    //setDispatch(false);

    const fetchData = async () => {
      setDispatch(false);
      const result = await axios.get(`../../api/booking/${booking_id}`,
      );
      console.log(result.data);
      let booking = {...result.data.booking};
      if (booking.dispatch){
        document.location.href="/account/booking";
      }else{
        setDispatch(booking.dispatch)
        setDisplay(true);
      }
    }
    fetchData();
  },[])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDispatch();
    }, 5000);
    return () => clearTimeout(timer);
  },[]);

  const handleDispatch = () => {
    axios.put(`../../api/booking/${booking_id}/dispatch`,)
      .then(res => {
        if(res.data){
          document.location.href="/account/booking";
        };
      })
  }

  return (
    <div className={display? "text-center" : "d-none"}>
      <h4>Your Booking With ID {booking_id} Is Success!</h4>
      <h6>You will be redirected back to the site soon!</h6>
    </div>
  )
}

export default Success;