import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { uploadFile, createBlog } from "../api/Api";

const CreateBlog = () => {
  const blankBlog = {
    title: "",
    image: "",
    post: "<p><br></p>",
    category: "",
  };

  const [newBlog, setNewBlog] = useState(blankBlog);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      let uploadedFile = await uploadFile(file);

      if (uploadedFile && uploadedFile.path) {
        setNewBlog((prev) => ({ ...prev, image: uploadedFile.path }));
      } else {
        console.error("Upload failed: No path received");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fileInputRef = useRef(null);

  const handleSubmit = async () => {
    let createdBlog = await createBlog(newBlog);
    console.log("Response from API:", createdBlog); // Debugging

    if (createdBlog.desc === 1) {
      setNewBlog(blankBlog);

      // Reset Quill editor content
      if (quillInstance) {
        quillInstance.root.innerHTML = "";
      }

      // Reset file input field using useRef
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      alert("Blog added successfully!");
    } else {
      alert("Failed to add blog. Please try again!");
    }
  };

  const menu = [
    { text: "Nature", path: "/" },
    { text: "Politics", path: "/" },
    { text: "Travel", path: "/" },
    { text: "Technology", path: "/" },
  ];

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

      // Listen for text changes and update state dynamically
      editor.on("text-change", () => {
        setNewBlog((prev) => ({
          ...prev,
          post: editor.root.innerHTML, // Get the HTML content
        }));
      });

      setQuillInstance(editor);
      initialized.current = true;
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center py-10 bg-gray-100 min-h-screen">
      <div className="bg-white w-full max-w-3xl p-6 shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Blog Post
        </h1>
        <div className="flex flex-col space-y-4">
          <small>{JSON.stringify(newBlog)}</small>

          {/* ----------------------- Title ----------------------- */}
          <div>
            <label className="text-gray-700 font-medium">Title</label>
            <input
              type="text"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
              placeholder="Enter blog title"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* ----------------------- Category ----------------------- */}
          <div>
            <label className="text-gray-700 font-medium">Category</label>
            <select
              value={newBlog.category}
              onChange={(e) =>
                setNewBlog({ ...newBlog, category: e.target.value })
              }
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="" default disabled>
                Select Category
              </option>
              {menu.map((x, index) => {
                return (
                  <option key={index} value={x.text}>
                    {x.text}
                  </option>
                );
              })}
            </select>
          </div>
          {/* ----------------------- Image ----------------------- */}
          <div>
            <label className="text-gray-700 font-medium">Image</label>
            <input
              ref={fileInputRef} // Attach ref here
              type="file"
              onChange={(e) => handleImageUpload(e)}
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* ----------------------- Post ----------------------- */}
          <div>
            <label className="text-gray-700 font-medium">Post</label>
            <div
              ref={editorRef}
              style={{ height: "200px" }}
              className="h-52 border border-gray-400 rounded-b-lg bg-white p-2"
            ></div>
          </div>

          {/* ----------------------- Button ----------------------- */}
          <button
            onClick={() => handleSubmit()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
