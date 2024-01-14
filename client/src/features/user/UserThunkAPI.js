import { createAsyncThunk } from '@reduxjs/toolkit';
import UserAPI from '../../api/apiUser';

export default class ThunkAPI {
  static setUsers = createAsyncThunk(
    'user/setUsers',
    async ({ rejectWithValue }) => {
      try {
        const user = await UserAPI.getUsers();
        return user;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  static getUser = createAsyncThunk(
    'user/getUser',
    async (userId, { rejectWithValue }) => {
      try {
        const user = await UserAPI.getUser(userId);
        return user;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );

  static createUser = createAsyncThunk(
    'user/createUser',
    async (data, { rejectWithValue }) => {
      try {
        const user = await UserAPI.createUser(data);
        return user;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  static updatePassword = createAsyncThunk(
    'user/updatePassword',
    async (userId, password, { rejectWithValue }) => {
      try {
        const user = await UserAPI.updateUser(userId, password);
        return user;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  static deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (userId, { rejectWithValue }) => {
      try {
        await UserAPI.deleteUser(userId);
        return userId;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  static userLogin = createAsyncThunk(
    'user/userLogin',
    async (userData, { rejectWithValue }) => {
      try {
        const user = await UserAPI.userLogin(userData);
        return user;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  static authorizeUser = createAsyncThunk(
    'user/authorizeUser',
    async (arg, { rejectWithValue }) => {
      try {
        const user = await UserAPI.setUser();
        return user;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  static logoutUser = createAsyncThunk(
    'user/logoutUser',
    async (arg, { rejectWithValue }) => {
      try {
        await UserAPI.logoutUser();
        return true;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
}
