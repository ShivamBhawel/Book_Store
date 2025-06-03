import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null);
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
    <div className='px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8'>
      <div className='bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh]  w-full lg:w-3/6  flex flex-col md:flex-row items-center justify-center'>
        <img src={Data.url} alt='Book' className='h-[50vh] lg:h-[70vh] rounded' />
      </div>
      <div className='p-4 w-3/6'>
        <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
        <p className='text-zinc-400 mt-1'>by {Data.author}</p>
        <p className='text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
        <p className='flex mt-4 items-center justify-start text-zinc-400'>
  <GrLanguage /> {Data.language}  </p>
        <p className='mt-4 text-zinc-100 text-3xl font-semibold'>Price : ₹ {Data.price} {" "}</p>
      </div>
    </div>
  );
};

export default ViewBookDetails;
