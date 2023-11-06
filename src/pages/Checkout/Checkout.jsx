import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const Checkout = () => {
  const {user, loading} = useContext(AuthContext)
    const service = useLoaderData()
    const {title, price, _id, img}= service;
const handleBookService =(event)=>{
  event.preventDefault()
  const form = event.target;
const name = form.name.value;
const email = form.email.value;
const date = form.date.value;
const price =form.price.value;
const textarea = form.textarea.value;
const booking ={
  customarName : name,
  email,
  date,
  service: title,
  service_id: _id,
  price: price,
  img,
  textarea
}
console.log(booking)
fetch('https://car-doctor-server-4bg71wq7q-rbriyad2gmailcoms-projects.vercel.app/bookings',{
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify(booking)
})
.then(res => res.json())
.then(data => {
  console.log(data)
  if(data.insertedId){
    Swal.fire({
      title: 'Success!',
      text: 'Order Successfully',
      icon: 'success',
      confirmButtonText: 'ok'
    })
  }
})
}
    return (
        <div>
            <h1 className='text-center font-extrabold text-3xl'>Service Name: {title}</h1>
    
      <div>
        <form onSubmit={handleBookService} className="card-body">
          <div className='grid grid-cols-2 gap-10'>
          <div className="form-control">
            <input type="text" placeholder="Name" name='name' defaultValue={user ? user?.displayName ? user.displayName: '' :''} className="input input-bordered" />
          </div>
          <div className="form-control">
            <input type="email" placeholder="Email" name='email' defaultValue={user ? user?.email : ''} className="input input-bordered" required />
          </div>
          <div className="form-control">
            
            <input type="date"  className="input input-bordered" name='date'  />
          </div>
          <div className="form-control">
            <input type="text" placeholder="Price" defaultValue={'$' + price} className="input input-bordered" name='price' required />
          </div>
          </div>
          <textarea className='w-full mt-5  bg-slate-100 rounded-lg p-4 h-40 border-black' name='textarea'  type="text">
          
          </textarea>
          <div className="form-control mt-6">
            <input className='btn btn-primary' type="submit" value='Confirm Order' />
          </div>
        </form>
      </div>
    </div>

    );
};

export default Checkout;