import { createSlice } from '@reduxjs/toolkit';

// قراءة بيانات السلة من الـ localStorage عند بدء التشغيل
const getInitialCartState = () => {
  const savedCart = localStorage.getItem('cartItems');
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  cartItems: getInitialCartState(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== idToRemove);
      saveCartToLocalStorage(state.cartItems);
    },
    changeQuantity: (state, action) => {
      const { id, amount } = action.payload;
      const item = state.cartItems.find(item => item.id === id);

      if (item) {
        item.quantity = Math.max(1, item.quantity + amount);
      }
      saveCartToLocalStorage(state.cartItems);
    },
  },
});

// حفظ بيانات السلة في الـ localStorage
const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
