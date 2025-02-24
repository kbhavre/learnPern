import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { uploadFile, createBlog } from "../api/Api";

const CreateBlog = () => {
  const blankBlog = { title: "", image: "", post: "<p><br></p>", category: "" };
  const [newBlog, setNewBlog] = useState(blankBlog);
  const [quillInstance, setQuillInstance] = useState(null);
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);
  const initialized = useRef(false);

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

      editor.on("text-change", () => {
        setNewBlog((prev) => ({ ...prev, post: editor.root.innerHTML }));
      });

      setQuillInstance(editor);
      initialized.current = true;
    }
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      let uploadedFile = await uploadFile(file);
      if (uploadedFile?.imageUrl) {
        setNewBlog((prev) => ({ ...prev, image: uploadedFile.imageUrl }));
      } else {
        console.error("Upload failed: No URL received");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async () => {
    const createdBlog = await createBlog(newBlog);
    if (createdBlog?.desc === 1) {
      setNewBlog(blankBlog);
      if (quillInstance) quillInstance.root.innerHTML = "";
      if (fileInputRef.current) fileInputRef.current.value = "";
      alert("Blog added successfully!");
    } else {
      alert("Failed to add blog. Please try again!");
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-10 bg-gray-100 min-h-screen">
      <div className="bg-white w-full max-w-3xl p-6 shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Blog Post
        </h1>
        <div className="flex flex-col space-y-4">
          {/* Title */}
          <div>
            <label className="text-gray-700 font-medium">Title</label>
            <input
              type="text"
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              placeholder="Enter blog title"
              className="w-full mt-1 p-3 border rounded-lg"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-gray-700 font-medium">Category</label>
            <select
              value={newBlog.category}
              onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
              className="w-full mt-1 p-3 border rounded-lg"
            >
              <option value="" disabled>Select Category</option>
              {["Nature", "Politics", "Travel", "Technology"].map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-gray-700 font-medium">Image</label>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleImageUpload}
              className="w-full mt-1 p-3 border rounded-lg"
            />
          </div>

          {/* Post Editor */}
          <div>
            <label className="text-gray-700 font-medium">Post</label>
            <div ref={editorRef} style={{ height: "200px" }} className="h-52 border rounded-b-lg p-2"></div>
          </div>

          {/* Submit Button */}
          <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;