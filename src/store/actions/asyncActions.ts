import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type Category = {
  id: number;
  name: string;
  slug: string;
  index: boolean;
  children: Category[] | null;
};

type FetchCategoriesResponse = {
  categories: Category[];
};

export const fetchCategories = createAsyncThunk<FetchCategoriesResponse, void, { state: RootState }>(
  'categories/fetchCategories',
  async (_, { getState }) => {
    try {
      const response = await axios.get('https://express-shina.ru/vacancy/catalog');
      return response.data as FetchCategoriesResponse;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }
);
