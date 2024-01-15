import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategories: [],
  categories: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAllCategories(state, action) {
      state.categories = action.payload;
    },
    setSelectedCategories(state, action) {
      state.selectedCategories = action.payload;
    },
    addCategory(state, action) {
      state.selectedCategories.push(action.payload);
    },
    removeCategory(state, action) {
      console.log(action.payload);
      state.selectedCategories = state.selectedCategories.filter(
        (category) => category.id !== action.payload
      );
    },
    clearAllCategories(state) {
      state.selectedCategories = [];
    },
  },
});

export const {
  setAllCategories,
  setSelectedCategories,
  addCategory,
  removeCategory,
  clearAllCategories,
} = filterSlice.actions;

export default filterSlice.reducer;
