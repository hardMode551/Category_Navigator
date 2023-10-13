import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, fetchCategories } from '../actions/asyncActions';

type CategoriesState = {
  currentCategory: Category;
  previousCategory: Category;
  selectedCategoryStack: Category[];
};

const initialState: CategoriesState = {
  currentCategory: {
    id: 0,
    name: '',
    slug: '',
    index: false,
    children: [],
  },
  previousCategory: {
    id: 0,
    name: '',
    slug: '',
    index: false,
    children: [],
  },
  selectedCategoryStack: [], 
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategoryStack.push(state.currentCategory); // Push the current category to the stack
      state.previousCategory = state.currentCategory;
      state.currentCategory = action.payload;
    },
    goBackCategory: (state, action: PayloadAction<number>) => {
      const depth = action.payload;
      for (let i = 0; i < depth; i++) {
        state.currentCategory = state.selectedCategoryStack.pop() || initialState.currentCategory;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        const categoryData = action.payload.categories;
        state.currentCategory = categoryData[0];
      })
      .addCase(fetchCategories.rejected, (_, action) => {
        console.error('Error:', action.error.message);
      });
  },
});

export const { selectCategory, goBackCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
