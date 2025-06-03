import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {

    const Links = [
        {
            title:"Home",
            link:"/",
        },
        {
            title:"All Books",
            link:"/All-books",
        },
        {
            title:"Cart",
            link:"/Cart",
        },
        {
            title:"Profile",
            link:"/Profile",
        }
    ];
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if(isLoggedIn === false){
        Links.splice(2,2);
    }
    const [mobilenav,setmobilenav] = useState("hidden");
  return (
    <> 
    <nav className=' z-50 relative  bg-zinc-800 text-white px-8 py-2 flex items-center justify-between'>
        <Link className="flex items-center">
             <img 
            className="h-10 me-4"
             src='https://cdn-icons-png.flaticon.com/128/10433/10433049.png' alt='image'/>
            <h1 className="text-2xl font-semibold">Book Heaven</h1>
        </Link>
         <div className="nav-links-bookheaven block md:flex items-center gap-4">
           <div className="hidden md:flex gap-4"> {Links.map((items,i) => (
                <Link to={items.link} 
                className="hover:text-blue-500 transition-all duration-300"
                 key={i}> {items.title} 

                 </Link>
            ))}
        </div>
        <div className="hidden md:flex gap-4"> 
               <Link to="/Login"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">login</Link>
               <Link to="/SignUp"
               className="px-4 py-1 bg-blue-500  rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">SignUp</Link>
         </div>
         <button className= 'block md:hidden text-white text-2xl hover:text-zinc-400' onClick={()=>
          mobilenav ==="hidden" ?
          setmobilenav("block") :
          setmobilenav("hidden")
          }>
            <FaGripLines />
         </button>
        </div>
    </nav>
    <div
     className={`${mobilenav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-cente`}>
        {Links.map((items,i) => (
                <Link to={items.link} 
                className="text-white text-3xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300"
                 key={i}> {items.title} 

                 </Link>
            ))}

            {isLoggedIn === false && (

            <>
               <Link to="/Login"
               className={` ${mobilenav} px-6 py-2 mb-8 text-3xl font-semibold  border border-blue-500 rounded text-white  hover:bg-white hover:text-zinc-800 transition-all duration-300`}>login</Link>
               <Link to="/SignUp"
               className={`${mobilenav} px-6 py-2 mb-8 text-2xl font-semibold bg-blue-500  rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>
            </>
            
            )}
              
    </div>
    </>
  );
};

export default Navbar