import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
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

  if (loading || !Data) return <div  className='h-screen bg-zinc-900 flex items-center justify-center my-8'><Loader /></div>; // show loader or return null

  return (
     <>
      {Data && ( 
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start'>
      <div className='   w-full lg:w-3/6   '>
       <div className='flex justify-around p-12 bg-zinc-800 rounded'>  
         <img src={Data.url} alt='Book' className='h-[50vh] lg:h-[70vh] rounded object-cover' />
         <div className='flex md:flex-col'> 
         <button className='bg-white rounded-full text-3xl p-3 text-red-600'> <FaHeart /> </button>
         <button className='bg-white rounded-full text-3xl p-3 mt-8 text-blue-600'> <IoCart /> </button>
        </div>
       </div>
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
