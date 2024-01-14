import { createSlice } from '@reduxjs/toolkit';
import CartThunkAPI from './CartThunkAPI';

const initialState = {
  cart: [],
  status: null,
  errMessage: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // extraReducers deal with side-effects
    // SET CART
    builder.addCase(CartThunkAPI.setCart.pending, (state) => {
      state.loading = 'loading';
      state.errMessage = null;
    });
    builder.addCase(CartThunkAPI.setCart.fulfilled, (state, action) => {
      state.loading = 'success';
      state.errMessage = null;
      state.cart = action.payload;
    });
    builder.addCase(CartThunkAPI.setCart.rejected, (state, action) => {
      state.status = 'error';
      state.errMessage = action.payload;
      state.cart = [];
    });

    // ADD TO CART
    builder.addCase(CartThunkAPI.addToCart.fulfilled, (state, action) => {
      state.loading = 'success';
      state.errMessage = null;
      state.cart.push(action.payload);
    });
    builder.addCase(CartThunkAPI.addToCart.rejected, (state, action) => {
      state.status = 'error';
      state.errMessage = action.payload;
    });

    // UPDATE CART
    builder.addCase(CartThunkAPI.updateCart.fulfilled, (state, action) => {
      state.loading = 'success';
      state.errMessage = null;
      state.cart = state.cart.map((item) =>
        item.id !== action.payload.id
          ? item
          : { ...item, quantity: action.payload.quantity }
      );
    });
    builder.addCase(CartThunkAPI.updateCart.rejected, (state, action) => {
      state.status = 'error';
      state.errMessage = action.payload;
    });

    // REMOVE FROM CART
    builder.addCase(CartThunkAPI.removeFromCart.fulfilled, (state, action) => {
      state.loading = 'success';
      state.errMessage = null;
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    });
    builder.addCase(CartThunkAPI.removeFromCart.rejected, (state, action) => {
      state.status = 'error';
      state.errMessage = action.payload;
    });

    // CLEAR CART
    builder.addCase(CartThunkAPI.clearCart.fulfilled, (state) => {
      state.loading = 'success';
      state.errMessage = null;
      state.cart = [];
    });
    builder.addCase(CartThunkAPI.clearCart.rejected, (state, action) => {
      state.status = 'error';
      state.errMessage = action.payload;
    });
  },
});

export const { setCart, addToCart, removeFromCart, updateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
