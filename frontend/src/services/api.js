const API_BASE_URL = "http://127.0.0.1:8000/api";

// Get all products
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


// Get a single product using its slug
export const getProduct = async (slug) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/${slug}/`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};