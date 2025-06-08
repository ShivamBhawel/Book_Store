import React , {useEffect,useState} from 'react'
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCart from '../components/BookCart/BookCart';

const AllBooks = () => {

   const [Data,setData] = useState();
      useEffect(() => {
          const fetch = async () => {
           const response =    await axios.get("http://localhost:2000/book/get-all-books");
              setData(response.data.data);
          };
          fetch();
      },[]);

  return (
    <div className="bg-zinc-900 h-screen px-12 py-8">
    
     <h4 className="text-3xl text-yellow-100">All books</h4>
    {!Data && (
      <div className='flex items-center justify-center my-8'>  <Loader/> </div>
    )}
    <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Data && 
      Data.map((items,i) => (
        <div key={i}> 
        <BookCart data={items}/> {" "}
        </div>
      ))}
    </div> </div>
  )
}

export default AllBooks