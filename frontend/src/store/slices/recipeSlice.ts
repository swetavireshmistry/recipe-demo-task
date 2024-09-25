import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type Recipe = {
  _id: string;
  title: string;
  photo: string;
  ingredients: string[];
  instructions: string[];
  cookTime: string;
  prepTime: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard'; 
  tags: string[];
  createdBy: {
    _id: string;
    username: string;
    bio: string;
    image: string;
  };
  createdAt: string; 
};

interface RecipeState {
  recipe: Recipe | null; 
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipe: null,
  loading: true,
  error: null,
};

// Async thunk to fetch a recipe by ID
export const fetchRecipeById = createAsyncThunk(
    'recipes/fetchById',
    async (id: string) => {
      // Retrieve the token from local storage or your state management
      const token = localStorage.getItem('accessToken');
  
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    }
  );

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;        
        state.recipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipe';
      });
  },
});

export const {} = recipeSlice.actions;

// Selectors
export const selectRecipe = (state: { recipe: RecipeState }) => state.recipe.recipe;
export const selectLoading = (state: { recipe: RecipeState }) => state.recipe.loading;
export const selectError = (state: { recipe: RecipeState }) => state.recipe.error;

// Export the reducer
export default recipeSlice.reducer;
