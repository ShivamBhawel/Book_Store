import axios from 'axios';
import React from 'react'
import { GrLanguage } from 'react-icons/gr';
import { Link } from 'react-router-dom';
const BookCart = ({data , favourites , onRemove}) => {
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
  };
  const removebook = async () => {
  try {
    const res = await axios.put(
      "http://localhost:2000/favourite/remove-book-from-favourite",
      {},
      { headers }
    );
    alert(res.data.message);

    // ✅ Update the UI
    onRemove(data._id);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to remove book from favourites.");
  }
};

  return (
   <div className='bg-zinc-800 rounded p-4 flex flex-col'>
      <Link to={`/view-book-details/${data._id}`}> 
     <div className='bg-zinc-800 rounded p-4 flex flex-col'>
        <div className='bg-zinc-900 rounded flex items-center justify-center'>
            <img src={data.url} alt='/' className='h-[25vh]' />
        </div>
        <h2 className='mt-4 text-xl text-white font-semibold'>{data.title}</h2>
        <p className="mt-2 text-zinc-400 font-semibold"> by {data.author}</p>
       <p className='mt-2 flex flex-row items-center justify-start text-white '> <GrLanguage className='me-3 '/>  {data.language}</p>
        <p className="mt-2 text-zinc-200 font-semibold"> ₹{data.price}</p>
     </div>
    </Link>

    {favourites && ( 
    <button className='bg-yellow-50  px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4' onClick={removebook}> 
    Remove from favourites  </button>

    )}
   </div>
  )
}

export default BookCart