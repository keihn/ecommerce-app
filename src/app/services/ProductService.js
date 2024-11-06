import Config from "../config/config"

class ProductService {
  static async fetchProducts(params = {}) {
    try {
      // Construct the query string from the params object
      const query = new URLSearchParams(params).toString();
      const url = `${Config.apiBaseUrl}/products?limit=20`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Config.apiKey}`, // Include if API requires auth
        },
      });

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return { error: error.message };
    }
  }

  static async fetchProductById(productId) {
    try {
      const url = `${Config.apiBaseUrl}/products/${productId}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch product with ID ${productId}:`, error);
      return { error: error.message };
    }
  }
}

export default ProductService;
