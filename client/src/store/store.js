import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import userReducer from '../features/user/userSlice';
import filterReducer from '../features/filters/filterSlice';

// CONFIGURING STORE USING REDUX TOOLKIT
const store = configureStore({
  reducer: {
    // adding reducers
    cart: cartReducer, // the state of cart will be access via state.cart
    user: userReducer,
    filter: filterReducer,
  },
});

export default store;
