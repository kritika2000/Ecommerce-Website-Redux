import axios from 'axios';
import LocalStorage from './apiStorage';

// cart APIs are authorized, so they require authorization header.
class CartAPI {
  // access token is read from local storage using the storage API
  static async getCartItems() {
    try {
      const res = await axios.get('/api/v1/cart', {
        headers: {
          Authorization: `Bearer ${LocalStorage.getAccessToken()}`,
        },
      });
      const { cart } = res.data.data;
      return cart;
    } catch (err) {
      throw new Error('Failed to fetch results');
    }
  }

  static async addToCart(item) {
    try {
      const res = await axios.post(
        '/api/v1/cart',
        {
          ...item,
        },
        {
          headers: {
            Authorization: `Bearer ${LocalStorage.getAccessToken()}`,
          },
        }
      );
      const { cart } = res.data.data;
      return cart.item;
    } catch (err) {
      throw new Error('Failed to add item to cart');
    }
  }
  static async updateCart(id, quantity) {
    try {
      await axios.patch(
        `/api/v1/cart/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${LocalStorage.getAccessToken()}`,
          },
        }
      );
      return quantity;
    } catch (err) {
      throw new Error('Failed to update item to cart');
    }
  }
  static async removeFromCart(id) {
    try {
      await axios.delete(`/api/v1/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${LocalStorage.getAccessToken()}`,
        },
      });
      return true;
    } catch (err) {
      throw new Error('Failed to remove item from cart');
    }
  }
  static async clearCart() {
    try {
      await axios.delete(`/api/v1/cart`, {
        headers: {
          Authorization: `Bearer ${LocalStorage.getAccessToken()}`,
        },
      });
      return true;
    } catch (err) {
      throw new Error('Failed to clear cart');
    }
  }
}

export default CartAPI;
