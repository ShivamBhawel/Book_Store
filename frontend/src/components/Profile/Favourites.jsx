import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCart from '../BookCart/BookCart';

const Favourites = () => {
  const [books, setBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:2000/favourite/get-favourite-books", { headers });
        setBooks(res.data.data);
      } catch (error) {
        console.error("Failed to fetch favourites", error);
      }
    };

    fetch();
  }, [books]); 

  const handleRemoveBook = (id) => {
  setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
};


  return (
    <>
      {books.length === 0 && (
        <div className='text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center w-full'>
          No favourite Books
        </div>
      )}

      <div className='grid lg:grid-cols-3 md:grid-cols-3 gap-4 pt-0 pl-2'>
        {books.map((items, i) => (
          <div key={i}>
            <BookCart data={items} favourites={true} onRemove={handleRemoveBook} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Favourites;
