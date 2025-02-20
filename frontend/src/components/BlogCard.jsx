import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ title, image, description, createdOn }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      <Link to='/blog'>
        <div className="w-full flex flex-col">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-left">{title}</h2>
            <p className="text-sm text-gray-600 text-left mt-2">
              {description}
            </p>
            <div className="text-gray-500 text-xs mt-3">{createdOn}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
