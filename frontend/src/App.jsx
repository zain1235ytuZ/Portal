import React from 'react';
import './App.css';
import Header from './Component/header.jsx';
import Footer from './Component/footer.jsx';
import Main from './Component/main.jsx';
import Register from './Component/Register.jsx';
import { BrowserRouter, Routes, Route } from "react-router";
import LoginForm from './Component/login.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {


  return (
  <>
 

<BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<LoginForm />} />
  </Routes>
  <ToastContainer />
  <Footer />
</BrowserRouter>

   </>
  )
}

export default App
