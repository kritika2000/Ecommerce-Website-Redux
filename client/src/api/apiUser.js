import axios from 'axios';
import LocalStorage from './apiStorage';

class UserAPI {
  static async getUsers() {
    try {
      const res = await axios.get('/api/v1/users', {
        headers: {
          Authorization: `Bearer ${LocalStorage.getAccessToken()}`,
        },
      });
      const { users } = res.data.data;
      return users;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }

  static async createUser({ username, userId, password }) {
    try {
      const res = await axios.post(
        '/api/v1/users',
        {
          username,
          userId,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${LocalStorage.getAccessToken()}`,
          },
        }
      );
      const { user } = res.data.data;
      return user;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
  static async getUser(userId) {
    try {
      const res = await axios.get(`/api/v1/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${LocalStorage.getAccessToken('token')}`,
        },
      });
      const { user } = res.data.data;
      return user;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
  static async updatePassword(userId, password) {
    try {
      await axios.patch(
        `/api/v1/cart/${userId}`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${LocalStorage.getAccessToken()}`,
          },
        }
      );
      return userId;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
  static async deleteUser(userId) {
    try {
      await axios.delete(`/api/v1/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${LocalStorage.getAccessToken()}`,
        },
      });
      return true;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
  static async userLogin({ userId, password }) {
    try {
      const res = await axios.post('/api/v1/login', {
        userId,
        password,
      });
      const user = res.data;
      return user;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
  static async setUser() {
    // this api sets the current logged in user by authorizing the user.
    try {
      const res = await axios.get('/api/v1/authorize', {
        headers: {
          Authorization: `Bearer ${LocalStorage.getAccessToken()}`,
        },
      });
      const user = res.data;
      return user;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
  static async logoutUser() {
    try {
      await axios.get('/api/v1/logout', {
        headers: {
          Authorization: `Bearer ${LocalStorage.getAccessToken()}`,
        },
      });
      return true;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
}

export default UserAPI;
