/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { nodeApi } from "../lib/axios";


export const useAuthStore = create(
    persist(
        (set) => ({

            authUser: null,
            ischeckingAuth: true,
            isloading: false,

            // checkAuth: async () => {
            //     try {
            //         const res = await axiosInstance.get("/auth/check");
            //         set({ authUser: res.data });
            //     } catch (error) {
            //         console.log("Error in checkAuth:", error);
            //         set({ authUser: null });
            //     } finally {
            //         set({ ischeckingAuth: false });
            //     }
            // },

            signup: async (data) => {
                set({ isloading: true })
                try {
                    const res = await nodeApi.post("/auth/signup", data);
                    set({ authUser: res.data });
                    Alert.alert("Success", "Account created successfully");
                    //console.log(res.data);
                    return true;
                } catch (error) {
                    const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
                    Alert.alert("Error", errorMessage);
                } finally {
                    set({ isloading: false })
                }
            },

            login: async (data) => {
                set({ isloading: true })
                try {
                    const res = await nodeApi.post("/auth/login", data);
                    set({ authUser: res.data });
                    Alert.alert("Success", "Logged In successfully");
                    //console.log(res.data);
                    return true;
                } catch (error) {
                    console.log("Login error:", error.response?.data || error.message);
                    const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials or try again.";
                    Alert.alert("Error", errorMessage);
                    return false;
                } finally {
                    set({ isloading: false })
                }
            },

            logout: async () => {
                set({ isloading: true })
                try {
                    //await nodeApi.post("/auth/logout");
                    set({ authUser: null });
                    Alert.alert("Success", "Logged out Successful");
                } catch (error) {
                    const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
                    Alert.alert("Error", errorMessage);
                } finally {
                    set({ isloading: false })
                }
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ authUser: state.authUser }),
        }
    )
)