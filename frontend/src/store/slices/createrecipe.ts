// src/store/recipeSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the type for a recipe
interface Recipe {
  title: string;
  photo: string;
  ingredients: string;
  instructions: string;
  cooktime: string;
  preptime: string;
  servingSize: string;
  difficulty: string;
  tags: string;
}

// Define the type for the initial state
interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

// Async thunk to create a new recipe
export const createRecipe = createAsyncThunk<Recipe, Recipe>(
  'recipes/create',
  async (recipeData) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('accessToken');
    
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/recipes`, recipeData, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    });

    return response.data;
  }
);

// Initial state with proper types
const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRecipe.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes.push(action.payload);
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create recipe';
      });
  },
});

export default recipeSlice.reducer;
