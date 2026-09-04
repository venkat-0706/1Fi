
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get a single product using its slug
export const getProduct = async (slug) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/products/${slug}/`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

