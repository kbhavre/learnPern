import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Blog from './pages/Blog';
import CreateBlog from './pages/CreateBlog'
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
     <BrowserRouter>
     <ToastContainer position="top-right" autoClose={3000} />
      <Routes> 
        <Route path='/' element={<Layout/>} > 
        <Route path='/' element={<Home/>}></Route>
        <Route path='/blog' element={<Blog/>}></Route>
        <Route path='/create' element={<CreateBlog/>}></Route>
        </Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
