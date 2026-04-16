import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
     <Navbar/> 
     <div className='container mx-auto mt-4'>
        <Outlet/>
     </div>
       
    </>
  )
}

export default Home