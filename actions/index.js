import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance =  axios.create({
    baseURL: `${process.env.BASE_URL}/api/v1`,
    timeout: 10000
})

import { getCookieFromReq } from '../helpers/utils';

const setAuthHeader = (req) => {
    const token  = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt');

    if(token){
        return { headers: {'authorization': `Bearer ${token}`}}
    }

    return undefined;
}

const rejectPromise = (resError) => {
    let error = {};

    if(resError && resError.response && resError.response.data){
        error = resError.response.data;
    } else {
        error = resError;
    }

    return Promise.reject(error);
}

export const getSecretData = async (req) => {
    const url = '/secret';

    return await axiosInstance.get(url, setAuthHeader(req)).then(response => response.data );
}
// export const getSecretDataServer = async (req) => {
//     return await axios.get('http://localhost:3000/api/v1/secret', setAuthHeader(req)).then(response => response.data );
// }

export const getPortfolios = async () => {
    return await axiosInstance.get('/portfolios').then(response => response.data);
}

export const getPortfolio = async (id) => {
    return await axiosInstance.get(`/portfolios/${id}`).then(response => response.data);
}

export const createPortfolio = async (portfolioData) => {
    return await axiosInstance.post('/portfolios', portfolioData, setAuthHeader())
        .then(response => response.data)
        .catch(error => rejectPromise(error))
}

export const updatePortfolio = async (portfolioData) => {
    return await axiosInstance.patch(`/portfolios/${portfolioData._id}`, portfolioData, setAuthHeader())
        .then(response => response.data)
        .catch(error => rejectPromise(error))
}

export const deletePortfolio = (portfolioId) => {
    return axiosInstance.delete(`/portfolios/${portfolioId}`, setAuthHeader()).then(response => response.data);
}

// ------------- Blogs Action ------------------

export const getPublishedBlogs = async (req) => {
    return await axiosInstance.get('/blogs').then(response => response.data);
}

export const getBlogBySlug = async (slug) => {
    return await axiosInstance.get(`/blogs/s/${slug}`).then(response => response.data);
}

export const getUserBlogs = (req) => {
    return axiosInstance.get('/blogs/myBlogs', setAuthHeader(req)).then(response => response.data);
}

export const createBlog = (blogData, lockId) => {
   return axiosInstance.post(`/blogs?lockId=${lockId}`, blogData, setAuthHeader())
            .then(response => response.data)
            .catch(err => rejectPromise(err))
}

export const getBlogById = (blogId) => {
    return axiosInstance.get(`/blogs/${blogId}`).then(response => response.data)
}

export const updateBlog = (blogData, blogId) => {
    return axiosInstance.patch(`/blogs/${blogId}`, blogData, setAuthHeader())
            .then(response => response.data)
            .catch(err => rejectPromise(err));
}

export const deleteBlog = (blogId) => {
    return axiosInstance.delete(`/blogs/${blogId}`, setAuthHeader())
            .then(response => response.data)
            .catch(err => rejectPromise(err));
}