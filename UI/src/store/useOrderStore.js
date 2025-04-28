import { create } from 'zustand';
import { wooApi } from '../lib/axios.js'
const useOrderStore = create((set) => ({
    orders: [],
    totalOrders: 0, // Add totalOrders
    totalPages: 0, // Add totalPages
    currentPage: 1, // Add currentPage
    loading: false,
    error: null,

    fetchOrders: async (page = 1, perPage = 20, dateFilter = 'all', statusFilter = 'all') => {
        set({ loading: true, error: null });
        try {
            // We will not implement fetchOrdersByDeliveryStatus here for now.
            // If 'delivered' or 'returned' require special handling beyond the standard API,
            // that logic would need to be added separately.

            let apiUrl = `/wp-json/wc/v3/orders?page=${page}&per_page=${perPage}`;

            // Add date filter if not 'all'
            if (dateFilter !== 'all') {
                const today = new Date();
                let startDate, endDate;

                if (dateFilter === 'today') {
                    startDate = new Date(today);
                    startDate.setHours(0, 0, 0, 0);
                    endDate = new Date(today);
                    endDate.setHours(23, 59, 59, 999);
                } else if (dateFilter === 'yesterday') {
                    startDate = new Date(today);
                    startDate.setDate(today.getDate() - 1);
                    startDate.setHours(0, 0, 0, 0);
                    endDate = new Date(today);
                    endDate.setDate(today.getDate() - 1);
                    endDate.setHours(23, 59, 59, 999);
                } else if (dateFilter === 'last7') {
                    startDate = new Date(today);
                    startDate.setDate(today.getDate() - 7);
                    startDate.setHours(0, 0, 0, 0);
                    endDate = new Date(today);
                    endDate.setHours(23, 59, 59, 999);
                } else if (dateFilter === 'last30') {
                    startDate = new Date(today);
                    startDate.setDate(today.getDate() - 30);
                    startDate.setHours(0, 0, 0, 0);
                    endDate = new Date(today);
                    endDate.setHours(23, 59, 59, 999);
                } else if (dateFilter === 'thismonth') {
                    startDate = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
                    endDate = new Date(today);
                    endDate.setHours(23, 59, 59, 999);
                }

                // Add date parameters to API URL
                // Ensure startDate and endDate are defined before using toISOString
                if (startDate && endDate) {
                    apiUrl += `&after=${startDate.toISOString()}&before=${endDate.toISOString()}`;
                }
            }

            // Add status filter if not 'all'
            if (statusFilter !== 'all') {
                apiUrl += `&status=${statusFilter}`;
            }

            const response = await wooApi.get(apiUrl);
            //console.log(response.data.phone);

            // Get total number of orders and total pages from headers
            const totalOrders = response.headers['x-wp-total'];
            const totalPages = response.headers['x-wp-totalpages'];

            set({
                orders: response.data,
                totalOrders: totalOrders ? parseInt(totalOrders, 10) : 0,
                totalPages: totalPages ? parseInt(totalPages, 10) : 0,
                currentPage: page,
                loading: false,
                error: null,
            });

            // Return data for potential chaining or use in component
            return {
                orders: response.data,
                totalOrders: totalOrders ? parseInt(totalOrders, 10) : 0,
                totalPages: totalPages ? parseInt(totalPages, 10) : 0,
                currentPage: page,
            };

        } catch (error) {
            console.error('Error fetching orders:', error);
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

export default useOrderStore;