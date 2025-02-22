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
    return axios.post(apiUrl+'/blog', data)
    .then(result =>{
        return result;
    })
    .catch(err =>{
        return err;
    })
}
export const getBlogById = ()=>{

}