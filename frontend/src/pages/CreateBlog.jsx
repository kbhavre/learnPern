import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const CreateBlog = () => {
  const [quillInstance, setQuillInstance] = useState(null);
  const editorRef = useRef(null);
  const initialized = useRef(false); // Prevent multiple initializations

  useEffect(() => {
    if (!initialized.current && editorRef.current) {
      const editor = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog post here...",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
      });

      setQuillInstance(editor);
      initialized.current = true; // Mark initialization as done
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center py-10 bg-gray-100 min-h-screen">
      <div className="bg-white w-full max-w-3xl p-6 shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Blog Post
        </h1>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Title</label>
            <input
              type="text"
              placeholder="Enter blog title"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Category</label>
            <select className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none">
              <option>Nature</option>
              <option>Travel</option>
              <option>Technology</option>
              <option>Politics</option>
            </select>
          </div>

          <div>
            <label className="text-gray-700 font-medium">Image</label>
            <input
              type="file"
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Post</label>
            <div
              ref={editorRef}
              className="h-52 border border-gray-300 rounded-lg bg-white p-2"
            ></div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;