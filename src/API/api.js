import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

// get method - For FetchOld.jsx
export const getData = () => {
    return api.get("/posts");
};

// get method
export const getPostData = async () => {
    try {
        const res = await api.get("/posts");
        return res.status === 200 ? res.data : [];
    } catch (error) {
        console.log(error);
    }
};

// to fetch the indv. data
export const fetchInvPost = async (id) => {
    try {
        const res = await api.get(`/posts/${id}`);
        return res.status === 200 ? res.data : [];
    } catch (error) {
        console.log(error);
    }
};

// For Pagination
export const getPaginationData = async (pageNumber) => {
    const limit = 3;
    const start = (pageNumber-1)*limit;

    try {
        const res = await api.get(`/posts?_start=${start}&_limit=${limit}`);
        return res.status === 200 ? res.data : [];
    } catch (error) {
        console.log(error);
    }
};