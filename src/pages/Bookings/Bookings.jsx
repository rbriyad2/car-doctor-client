import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingTable from "./BookingTable";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate()
  const url = `https://car-doctor-server-4bg71wq7q-rbriyad2gmailcoms-projects.vercel.app/bookings?email=${user?.email}`;

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('car-access-token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if(!data.error){
          setBookings(data)
        }
        else{
          navigate('/')
        }
      });
  }, [url, navigate]);


  const handleDelete = id =>{
    const proceed =confirm('Are you sure delete it ?')
    if(proceed){
      fetch(`https://car-doctor-server-4bg71wq7q-rbriyad2gmailcoms-projects.vercel.app/bookings/${id}`,{
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.deletedCount > 0){
          Swal.fire({
            title: 'success',
            text: 'Delete Successfully',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          const remaining = bookings.filter(booking => booking._id !== id)
          setBookings(remaining)
        }
      })
    }
  }

  const handleBookingConfirm= id=>{
    fetch(`https://car-doctor-server-4bg71wq7q-rbriyad2gmailcoms-projects.vercel.app/bookings/${id}`,{
      method: 'PATCH',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify({status: 'confirm'})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.modifiedCount > 0){
        const remaining = bookings.filter(booking => booking._id !==id);
        const updated = bookings.find(booking => booking._id ===id);
        updated.status ='confirm'
        const newBookings =[updated, ...remaining];
        setBookings(newBookings)
      }
    })
  }

  return (
    <div>
      <h2 className="text-3xl font-bold my-3 text-center">Your Bookings: {bookings.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Delete</th>
              <th>Service Name</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
    {bookings.map(booking => <BookingTable key={booking._id} handleBookingConfirm={handleBookingConfirm} handleDelete={handleDelete} booking={booking}></BookingTable>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
