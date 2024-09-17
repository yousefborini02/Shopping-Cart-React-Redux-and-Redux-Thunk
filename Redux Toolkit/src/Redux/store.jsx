import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import userReducer from './userSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    user: userReducer,
  },
  // redux-thunk is included by default, so we don't need to add it explicitly
});

export default store;