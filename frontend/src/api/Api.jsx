import axios from 'axios';

const apiUrl = 'http://localhost:3000';

export const getBlogs = ()=>{
    return axios.get(apiUrl+'/blog')
    .then(result =>{
        return result;
    })
    .catch(err =>{
        return err;
    })
}
export const createBlog = (data)=>{
    return axios.post(apiUrl+'/create-blog', data)
    .then(result =>{
        return result.data;
    })
    .catch(err =>{
        return err;
    })
}

export const getBlogById = ()=>{

}

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };

    try {
        const response = await axios.post(apiUrl + "/blog-image", formData, config);
        console.log("Upload Response:", response.data);

        return response.data; 
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
};