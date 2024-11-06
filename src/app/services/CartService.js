import Config from "../config/config"

class CartService {
  static async getCart(cartId) {
    try {
      const response = await fetch(`${Config.baseURL}/carts/${cartId}`);
      if (!response.ok) throw new Error("Failed to fetch cart");
      return await response.json();
    } catch (error) {
      console.error("Error fetching cart:", error);
      return { error: error.message };
    }
  }

  static async addItem(cartId, productId, quantity = 1) {
    try {
      const response = await fetch(`${Config.baseURL}/carts/${cartId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!response.ok) throw new Error("Failed to add item to cart");
      return await response.json();
    } catch (error) {
      console.error("Error adding item to cart:", error);
      return { error: error.message };
    }
  }

  static async updateItem(cartId, productId, quantity) {
    try {
      const response = await fetch(`${Config.baseURL}/carts/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!response.ok) throw new Error("Failed to update item in cart");
      return await response.json();
    } catch (error) {
      console.error("Error updating item in cart:", error);
      return { error: error.message };
    }
  }

  static async deleteItem(cartId, productId) {
    try {
      const response = await fetch(`${Config.baseURL}/carts/${cartId}/items/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item from cart");
      return await response.json();
    } catch (error) {
      console.error("Error deleting item from cart:", error);
      return { error: error.message };
    }
  }

  static async clearCart(cartId) {
    try {
      const response = await fetch(`${Config.baseURL}/carts/${cartId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to clear cart");
      return await response.json();
    } catch (error) {
      console.error("Error clearing cart:", error);
      return { error: error.message };
    }
  }
}

export default CartService;
