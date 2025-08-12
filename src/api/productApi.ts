// src/api/productApi.ts

import apiInstance from ".";

export const fetchProducts = async () => {
    try {
        const response = await apiInstance.get("/products");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch products");
    }
};
