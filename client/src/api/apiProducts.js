import axios from 'axios';

class ProductAPI {
  // get all products
  static async getProducts() {
    try {
      const res = await axios.get('/api/v1/products');
      const { products } = res.data.data;
      return products;
    } catch (err) {
      throw new Error('Failed to fetch results');
    }
  }
  static async getProduct(id) {
    // get a product with an id
    try {
      const res = await axios.get(`/api/v1/products/${id}`);
      const { product } = res.data.data;
      return product;
    } catch (err) {
      throw new Error('Failed to fetch product');
    }
  }
}

export default ProductAPI;
