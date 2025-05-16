import axios from 'axios';

const wooApi = axios.create({
  baseURL: 'https://www.ebook.makeyourshopping.com',

  auth: {
    username: 'ck_75c6657151a0a68d76b3cfeb4f7185c5abbabf5c',
    password: 'cs_05ede01241c6fb7ed892b11c9c89c7de899ec889'
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const nodeApi = axios.create({
  baseURL: 'http://172.20.10.8:5001/api',   //on android
  //baseURL: 'http://localhost:5001/api',        //on local 
  withCredentials: true,
});


export { wooApi, nodeApi };