import React from 'react';
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



const App = () => {
  return (
    <div>
  
         <Navbar />
         <Routes>
          <Route exact path='/' element={<Home />} />
            <Route exact path='/all-books' element={<AllBooks />} />
            <Route exact path='/Cart' element={<Cart />} />
            <Route exact path='/Profile' element={<Profile />} />
            <Route exact path='/Login' element={<Login />} />
            <Route exact path='/SignUp' element={<SingUp />} />
            <Route path='view-book-details/:id' element={<ViewBookDetails />} />
         </Routes>
         <Footer />
      
     
    </div>
  );
};

export default App