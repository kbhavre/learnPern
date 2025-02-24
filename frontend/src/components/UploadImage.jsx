import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CLOUD_NAME = "kbhavre78"; // Replace this
const UPLOAD_PRESET = "learnPern"; // Replace this

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setUploaded(false);
    toast.info("Uploading image...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      setImage(res.data.secure_url);
      setUploaded(true);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error?.message || "Image upload failed!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!uploaded) {
      toast.error("Please wait for the image to finish uploading.");
      return;
    }

    console.log("Submitting blog with image:", image);
    toast.success("Blog submitted successfully!");
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleImageUpload} disabled={loading} />
      {loading && <p className="text-blue-500 mt-2">Uploading...</p>}
      {image && (
        <div className="mt-4">
          <img src={image} alt="Uploaded" className="w-32 h-32 object-cover" />
        </div>
      )}
      <button
        onClick={handleSubmit}
        disabled={!uploaded}
        className={`mt-4 px-4 py-2 text-white ${
          uploaded ? "bg-green-500" : "bg-gray-500 cursor-not-allowed"
        }`}
      >
        Submit Blog
      </button>
    </div>
  );
};

export default UploadImage;