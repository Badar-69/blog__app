import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import Author from './Components/Author/Author'
import Contact from './Components/ContactUs/Contact';
import Post from './Components/Posts/Post';
import Error from './Components/Error/Error'



function App() {
  useEffect(() => {
    document.title = 'NoonPost - Personal Blog';
  }, []);


  return (
    <>
      <Router basename=''>
        <Navbar />
        <Routes>
          <Route exact = 'true' path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="author" element={<Author />} />
          <Route path="contactUs" element={<Contact />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="error" element={<Error />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
