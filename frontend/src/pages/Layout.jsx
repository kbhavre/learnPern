import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
    const menu = [
        {
            text: 'Nature',
            path: '/',
        },
        {
            text: 'Travel',
            path: '/',
        },
        {
            text: 'Technology',
            path: '/',
        },
        {
            text: 'Politics',
            path: '/',
        },
    ]
  return (
    <div>
      {/*------------ Header ------------ */}
      <div className="border-b"> 
        <div className="container p-5 flex justify-between mx-auto">
        <Link to='/'>
        <span className='font-extrabold text-2xl'>BLOGGER</span>
        </Link>
            
            <div className="flex gap-x-20">  
            <ul className='flex items-center justify-center gap-x-10'>
            {
                menu.map(x => {
                    return (<li>
                    <Link>
                        <span className='font-semibold text-lg text-lime-700'> {x.text}</span>
                    </Link>
                </li>)
                })
            }
                
            </ul>
            <button className='bg-slate-400 border-black border-2 rounded-md py-2 px-4 text-white'>
                <Link to='/create'>+ New Post</Link>
            </button>
            </div>
        </div>
      </div>


      {/*------------ Body ------------ */}
      <div className="flex mx-auto px-5 md:px-20">
                <div className="mt-5 mb-5 min-h-[500px] w-full">
                    <Outlet></Outlet>
                </div>
            </div>


      {/*------------ Footer ------------ */}
      <div className="flex bg-slate-800">
        <div className="flex mx-auto px-20 py-20 items-center justify-center">
       
        <h3 className='text-gray-400' >
        <Link to='/blog'>
        BLOGGER
        </Link></h3>
       
           
        </div>
      </div>
    </div>
  )
}

export default Layout
