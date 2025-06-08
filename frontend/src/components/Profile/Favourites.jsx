import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCart from '../BookCart/BookCart';
const Favourites = () => {

  const [books,setbooks] = useState();

  const headers = {

      id:localStorage.getItem("id"),
   authorization: `Bearer ${localStorage.getItem("token")}`,

  }
   useEffect( () => {
  
        const fetch = async () => {

          const res = await axios.get("http://localhost:2000/favourite/get-favourite-books",{headers})
          setbooks(res.data.data);
        }

        fetch();
 
   },[books])

  return (

    <>
       {/* { books.length === 0 && ( 
      <div className='text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center w-full'>
       No favourite Books </div>
    ) }  */}

    <div className='grid grid-cols-3  gap-4 pt-0'>
    {books && books.map((items,i) => ( 
 
     <div key={i}>
      <BookCart data={items} favourites={true}/>
     </div>
  
    ))} 
    </div>

    </>

  
  )
}

export default Favourites