import React , {useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../Store/auth';
import { useDispatch } from 'react-redux';



const Login = () => {

   const [Values , setValue] = useState({
          username:"",
          password:""
         });
  
         const navigate = useNavigate();
         const dispatch = useDispatch();

  
         const change = (e) => {
          const {name , value} = e.target;
          setValue({...Values,[name]:value})
         }
  
         const submit = async () => {
          try{
  
               if(Values.username === "" || Values.password === ""){
                alert("All fields are required");
              }
             else{
                const response = await axios.post(
                  "http://localhost:2000/user/login",
                  Values
                  );
              dispatch(authActions.changeRole(response.data.role));
              dispatch(authActions.login());
              localStorage.setItem("id",response.data.id);
              localStorage.setItem("token",response.data.token);
              localStorage.setItem("role",response.data.role);
              navigate("/profile");
              }
          }catch(err){
            alert(err.response.data.message);
          }
         }


  return (
     <>
       <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
                <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'> 
                 <p className='text-zinc-200 text-xl'> Login</p> 
                 
              <div className='mt-4'>
              <label htmlFor='' className='text-zinc-400'>User Name</label>
              <input type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='Username'
              name='username'
              value={Values.username}
              onChange={change}
              required 
              />
        </div>


        <div className='mt-4'>
        
              <label htmlFor='' className='text-zinc-400'>Password</label>
              <input type='password'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='password'
              name='password'
              value={Values.password}
              onChange={change}
              required 
              />
       </div>



      <div className='mt-4'>
      <button className='w-full bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-500 transition-all duration-300' onClick={submit}>Login</button></div> 
      <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'> Or </p>
      <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
      Don't have an account ? &nbsp; 
       <Link to="/SignUp" className='hover:text-blue-500'> 
      <u>SignUP</u>
      </Link>
       </p>
      
       
      
        </div>
       </div>
      
     </>
  )
}

export default Login;