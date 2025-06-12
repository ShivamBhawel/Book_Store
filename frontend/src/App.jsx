import React, { useEffect } from 'react';
import Home from './Pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import {  Routes, Route} from "react-router-dom";
import SingUp from './Pages/SingUp';
import Login from './Pages/Login';
import AllBooks from './Pages/AllBooks';
import Cart from './Pages/Cart';
import Profile from './Pages/Profile';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './Store/auth';
import Favourites from './components/Profile/Favourites';
import UserOrderHistory from './components/Profile/UserOrderHistory'
import Settings from './components/Profile/Settings';




const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if(localStorage.getItem("id")&&
       localStorage.getItem("token") && 
       localStorage.getItem("role")){
        dispatch(authActions.login());
        dispatch(authActions.changeRole(localStorage.getItem("role")));
       }
  }, []);
  return (
    <div>
  
         <Navbar />
         <Routes>
          <Route  path='/Home' element={<Home />} />
           <Route path='/' element={<Home />}  /> 
            <Route  path='/all-books' element={<AllBooks />} />
            <Route  path='/Cart' element={<Cart />} />
            <Route  path='/Profile' element={<Profile />} > 
             <Route index element={<Favourites/>} />
              <Route path="/Profile/UserOrderHistory"  element={<UserOrderHistory/>} />
               <Route path="/Profile/Settings"  element={<Settings/>} />
             </Route>
            <Route exact path='/Login' element={<Login />} />
            <Route exact path='/SignUp' element={<SingUp />} />
            <Route path='view-book-details/:id' element={<ViewBookDetails />} />
         </Routes>
         <Footer />
      
     
    </div>
  );
};

export default App