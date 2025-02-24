import axios from 'axios';

const apiUrl = 'http://localhost:3000';

export const getBlogs = async () => {
    try {
        const result = await axios.get(apiUrl + '/blog');
        return result.data;
    } catch (err) {
        console.error("Error fetching blogs:", err);
        return null;
    }
};

export const createBlog = async (data) => {
    try {
        const result = await axios.post(apiUrl + '/create-blog', data);
        return result.data;
    } catch (err) {
        console.error("Error creating blog:", err);
        return null;
    }
};

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(apiUrl + "/blog-image", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
};