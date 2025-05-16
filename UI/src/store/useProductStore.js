import { create } from 'zustand';
import { wooApi } from '../lib/axios.js'
const useProductsStore = create((set) => ({
    products: [],
    totalProducts: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            let apiUrl = `/wp-json/wc/v3/products`;

            const response = await wooApi.get(apiUrl);
            //console.log(response.data);

            set({
                products: response.data,
                loading: false,
                error: null,
            });
            return {
                products: response.data,
            };

        } catch (error) {
            console.error('Error fetching products:', error);
            // Log more details about the Axios error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.error('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);

            set({ loading: false, error: error }); // Update state with error
            throw error; // Re-throw to allow components to catch if needed
        }
    },
}));

export default useProductsStore;