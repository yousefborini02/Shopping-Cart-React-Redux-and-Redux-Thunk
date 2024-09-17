import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// إنشاء thunk لجلب البيانات
export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await axios.get('http://localhost:3333/api/productdata');
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};


// إنشاء thunk لحذف المنتج
export const deleteProduct = (id) => async (dispatch) => {
  dispatch(deleteProductStart());
  try {
    await axios.delete(`http://localhost:3333/api/productdata/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure(error.message));
  }
};

// إنشاء slice لإدارة الحالة
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {
    fetchProductsStart(state) {
      state.status = 'loading';
    },
    fetchProductsSuccess(state, action) {
      state.status = 'succeeded';
      state.items = action.payload;
    },
    fetchProductsFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    deleteProductStart(state) {
      state.status = 'loading';
    },
    deleteProductSuccess(state, action) {
      state.status = 'succeeded';

    },
    deleteProductFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, deleteProductStart, deleteProductSuccess, deleteProductFailure } = productSlice.actions;
export default productSlice.reducer;
