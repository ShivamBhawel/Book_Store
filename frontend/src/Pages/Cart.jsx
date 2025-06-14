import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { MdOutlineDeleteOutline } from "react-icons/md";

import Loader from '../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart,setcart] = useState();
  const [Total , setTotal] = useState(0);
  const navigate = useNavigate();
  
  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
  const fetch = async () => {
    try {
      const res = await axios.get("http://localhost:2000/cart/get-user-cart", { headers });
      setcart(res.data.data); 
    } catch (err) {
      console.error("Error fetching cart:", err);
      
    }
  };
  fetch();
}, [cart]); 
const deletItem = async (bookid) => {
   
    const res = await axios.put(
      `http://localhost:2000/cart/remove-from-cart/${bookid}`,
          {} , {headers}
      );
      alert(res.data.message);

}

useEffect( ()=>{
         
         if(cart && cart.length > 0){
          let Total = 0;
          cart.map((items) => {
            Total += items.price;
          });
          setTotal(Total);
          Total = 0;
         }
},[cart]);

const placeorder = async () => {
  try {
    const res = await axios.post(
      `http://localhost:2000/order/place-order`,
      { order: cart }, 
      { headers }
    );
    console.log(res.data);
    alert(res.data.message);
    
    navigate("/Profile/UserOrderHistory");
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

  return (
    <div className='bg-zinc-900 px-12 h-screen py-8'>

     {!cart && <div className='w-full h-[100%] flex items-center justify-center'> <Loader /> </div> }
    {cart && cart.length == 0 && (
      <div className='h-screen '>
           <div className='h-[100%] flex items-center justify-center flex-col'>
           <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
            Empty Cart
           </h1>
            {/* <img 
              src="/cempty-cart.png"
              alt='empty cart'
              className='lg:h-[50vh]'
            /> */}
           </div>
      </div>
    )}
    {cart && cart.length > 0 && (

      <>
         <h1 className='text-5xl font-semibold text-zinc-500 mb-8'> Your Cart </h1>
         {cart.map((items,i) => (
          <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
            <img
               src={items.url}
               alt="/"
               className='h[20vh] md:h-[10vh] object-cover'
             />
             <div className='w-full md:w-auto'>
              <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'> {items.title}</h1>
              <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                {items.desc.slice(0,100)}...
              </p>
              <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden '>
                {items.desc.slice(0,65)}...
              </p>
              <p className='text-normal text-zinc-300 mt-2 block md:hidden'>
                {items.desc.slice(0,100)}...
              </p>
         </div>
         <div className='flex mt-4 w-full md:w-auto items-center justify-between'> 
         <h2 className='text-zinc-100 text-3xl font-semibold flex'>
          ₹ {items.price}
         </h2>
         <button className='bg-red-100 text-red-700 border-red-700 rounded p-2 ms-12'
          onClick={()=> deletItem(items._id)}> 
          <MdOutlineDeleteOutline />
         </button>
         </div>
          </div>

         ))}
      </>
    )}
    
    { cart && cart.length > 0 && (
      <div className='mt-4 w-full flex items-center justify-end'> 
         <div className='p-4 bg-zinc-800 rounded'>
            <h1 className='text-3xl text-zinc-200 font-semibold'> 
                Total Amount
            </h1>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
                 <h2>{cart.length} Books</h2> <h2>₹ {Total}</h2>
             </div>
             <div className='w-[100%] mt-3'> 
             <button
              className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200 transition-all duration-300' 
              onClick={placeorder}> palce your order </button>
             </div>
          </div>
      </div>
    )}

    </div>
  )
}

export default Cart