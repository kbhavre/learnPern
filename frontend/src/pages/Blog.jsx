import React from 'react'

const Blog = () => {
  return (
    <div className='flex justify-center items-center'>
      <div className="flex flex-col w-[60%] overflow-hidden">    
        <h1 className='mt-1 text-3xl font-extrabold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio, adipisci!</h1>

        <div className='flex my-4'>
            <small>Jan 20, 2024</small>
        </div>

        <img className='rounded-lg' src="https://picsum.photos/300/200?random=4" alt="" />
        <div>
        <h2 className="text-2xl my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quibusdam exercitationem necessitatibus enim laudantium amet iure, saepe voluptatem ipsam aperiam.</h2>
      <h2 className="text-2xl my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quibusdam exercitationem necessitatibus enim laudantium amet iure, saepe voluptatem ipsam aperiam.</h2>
    </div>
        </div>
      </div>

      
  )
}

export default Blog
