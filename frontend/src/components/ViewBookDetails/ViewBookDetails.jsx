import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';


const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [loading, setLoading] = useState(true); // optional loading state
 
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/book/get-book-by-id/${id}`);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch book data', error);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const headers = {
   id:localStorage.getItem("id"),
   authorization: `Bearer ${localStorage.getItem("token")}`,
   bookid:id,
 };

   const handelFavorite = async() => {

     const response = await axios.put('http://localhost:2000/favourite/add-book-to-favourite',{},{headers});
     alert(response.data.message)
   }


   const AddToCart = async () => {

    const res = await axios.put('http://localhost:2000/cart/add-to-cart',{},{headers});
    alert(res.data.message);
   }

  if (loading || !Data) return <div  className='h-screen bg-zinc-900 flex items-center justify-center my-8'><Loader /></div>; // show loader or return null

  return (
     <>
      {Data && ( 
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start'>
      <div className='   w-full lg:w-3/6   '>
       <div className='flex flex-col lg:flex-row justify-around p-12 bg-zinc-800 rounded'>  
         <img src={Data.url} alt='Book' className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded ' />
        {isLoggedIn === true && role === "user" && (
           <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'> 
         <button className='bg-white rounded mt-8 lg:rounded-full text-3xl p-3 text-red-600 flex items-center justify-center'
          onClick={handelFavorite}> <FaHeart /> 
          <span className='ms-4 block lg:hidden'> Favourites</span>
          </button>
         <button className='bg-blue-600 rounded mt-8 lg:rounded-full text-3xl p-3  lg:mt-8 text-white flex items-center justify-center' onClick={AddToCart}> <IoCart /> 
         <span className='ms-4 block lg:hidden'>add to cart</span>
          </button>
        </div>
        )}
       </div>

     {isLoggedIn === true && role === "admin" && (
           <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'> 
         <button className='bg-white  rounded mt-8 lg:rounded-full text-3xl p-3 text-black flex items-center justify-center'> <FaEdit />
          <span className='ms-4 block lg:hidden'>Edit Book</span>
          </button>
         <button className='bg-white  rounded mt-8  lg:rounded-full text-3xl p-3  lg:mt-8 text-red-500 flex items-center justify-center'> <MdDeleteForever />
         <span className='ms-4 block lg:hidden'>Delete Book</span>
          </button>
        </div>
        )}

      </div>
      <div className='p-4 w-full lg:w-3/6'>
        <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
        <p className='text-zinc-400 mt-1'>by {Data.author}</p>
        <p className='text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
        <p className='flex mt-4 items-center justify-start text-zinc-400'>
  <GrLanguage /> {Data.language}  </p>
        <p className='mt-4 text-zinc-100 text-3xl font-semibold'>Price : ₹ {Data.price} {" "}</p>
      </div>
    </div>
      )}
     </>
  );
};

export default ViewBookDetails;
