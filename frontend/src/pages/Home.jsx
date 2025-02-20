import React from 'react'
import BlogCard from '../components/BlogCard'

const Home = () => {
    const data = [
        {
            title: "Understanding React Hooks",
            image: "https://picsum.photos/300/200?random=1",
            description: "A deep dive into React Hooks and how they simplify state management in functional components.",
            createdOn: "2025-02-20",
            comments: 12,
          },
          {
            title: "Mastering Tailwind CSS",
            image: "https://picsum.photos/300/200?random=2",
            description: "Learn how to build beautiful and responsive UIs quickly using Tailwind CSS.",
            createdOn: "2025-02-18",
            comments: 8,
          },
          {
            title: "The Future of AI in Web Development",
            image: "https://picsum.photos/300/200?random=3",
            description: "Exploring how AI is revolutionizing web development with automation and intelligent design.",
            createdOn: "2025-02-15",
            comments: 20,
          },
          {
            title: "Building a Full-Stack MERN App",
            image: "https://picsum.photos/300/200?random=4",
            description: "A step-by-step guide to building a scalable full-stack application using MongoDB, Express, React, and Node.js.",
            createdOn: "2025-02-10",
            comments: 15,
          },
          {
            title: "Introduction to Next.js",
            image: "https://picsum.photos/300/200?random=5",
            description: "Discover the benefits of Next.js for building fast and scalable React applications.",
            createdOn: "2025-02-08",
            comments: 5,
          },
    ]
  return (
    <div className =''>
     <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5"> 
  {data.map((x, index) => (
    <BlogCard key={index} {...x} />
  ))}
</div>
    </div>
  )
}

export default Home
