import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userId: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: boolean; // Add success property
}

const initialState: AuthState = {
  userId: null,
  token: null,
  loading: false,
  error: null,
  success: false, // Initialize success to false
};

// Async action to log in the user
export const loginUser = createAsyncThunk('auth/login', async (user: { email: string; password: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  if (!response.ok) {
    // Extract error message from the response
    const errorMessage = data.message || 'Login failed';
    throw new Error(errorMessage);
  }
  return data;
});

// Async action to register a user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { name: string; email: string; password: string; confirmPassword: string; bio: string }, { rejectWithValue }) => {
    const payload_data = {
      username: userData.name,
      email: userData.email,
      password: userData.password,
      bio: userData.bio,
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload_data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.userId = null;
      state.token = null;
      localStorage.removeItem('accessToken');
      state.success = false; // Reset success on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Login user cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ userId: string; access_token: string }>) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.token = action.payload.access_token;
        localStorage.setItem('accessToken', action.payload.access_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;        
        state.error = action.error.message || 'Login failed';
      })
      // Register user cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false; // Reset success on pending
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ userId: string }>) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.success = true; // Set success to true on successful registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false; // Reset success on error
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
