import { createAsyncThunk } from '@reduxjs/toolkit';
import CartAPI from '../../api/apiCart';

// https://blog.logrocket.com/using-redux-toolkits-createasyncthunk/

class ThunkAPI {
  static setCart = createAsyncThunk(
    'cart/setCart',
    async (arg, { rejectWithValue }) => {
      try {
        const cart = await CartAPI.getCartItems();
        return cart;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  static addToCart = createAsyncThunk(
    'cart/addToCart',
    async (item, { rejectWithValue }) => {
      try {
        const newItem = await CartAPI.addToCart(item);
        return newItem;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  static updateCart = createAsyncThunk(
    'cart/updateCart',
    async ({ id, quantity }, { rejectWithValue }) => {
      try {
        await CartAPI.updateCart(id, quantity);
        return { id, quantity };
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  static removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (id, { rejectWithValue }) => {
      try {
        await CartAPI.removeFromCart(id);
        return id;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  static clearCart = createAsyncThunk(
    'cart/clearCart',
    async (arg, { rejectWithValue }) => {
      try {
        await CartAPI.clearCart();
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
}

export default ThunkAPI;
