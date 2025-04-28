import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://www.ebook.makeyourshopping.com', 
  timeout: 10000,
  auth: {
    username: 'ck_75c6657151a0a68d76b3cfeb4f7185c5abbabf5c',
    password: 'cs_05ede01241c6fb7ed892b11c9c89c7de899ec889'
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstancenode = axios.create({
  baseURL: 'http://localhost:5001/api', 
  withCredentials: true,
});


export  {axiosInstance,axiosInstancenode};

