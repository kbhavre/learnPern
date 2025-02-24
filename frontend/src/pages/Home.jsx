import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { getBlogs } from "../api/Api";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const allBlogs = await getBlogs();
      setBlogs(allBlogs.data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-5">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {blogs.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;