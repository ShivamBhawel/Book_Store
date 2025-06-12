import React from 'react';
import { Link } from 'react-router-dom';
const Sidebar = ( {data}) => {
  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]'>
    <div className='flex flex-col items-center justify-center'> 
        <img src={data.avatar} className='h-[12vh]' />
       
           <p className='mt-3 text-xl text-zinc-100 font-semibold'>{data.username}</p>
        <p className='mt-1 text-normal text-zinc-300'>{data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>

       </div>
        <div className='w-full flex-col items-ceter hidden lg:flex'>
       <Link 
        to="/Profile"
        className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        > 
        Favourites
       </Link>

       <Link 
        to="/Profile/UserOrderHistory" 
        className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        > 
        Order History 
       </Link>

       <Link 
        to="/Profile/Settings"
        className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        > 
        Settings 
       </Link>
        </div>
        <button className='bg-zinc-900 w-3/6 lg:w-full mt-3 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-zinck-700 transition-all duration-300'>
        Log Out <div className='pl-3'>   <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>    </svg> </div>
 </button>
    </div>
  )
}

export default Sidebar