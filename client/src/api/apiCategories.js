import axios from 'axios';

class CategoryAPI {
  // get all categories
  static async getCategories() {
    try {
      const res = await axios.get('/api/v1/categories');
      const { categories } = res.data.data;
      return categories;
    } catch (err) {
      throw new Error('Failed to fetch results');
    }
  }
  static async getCategory(id) {
    // get a category with an id
    try {
      const res = await axios.get(`/api/v1/categories/${id}`);
      const { category } = res.data.data;
      return category;
    } catch (err) {
      throw new Error('Failed to fetch product');
    }
  }
}

export default CategoryAPI;
