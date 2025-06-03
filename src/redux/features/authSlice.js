import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net";

export const loginUser = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try {
    const loginRes = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!loginRes.ok) {
      const errorData = await loginRes.json();
      throw new Error(errorData.error || "Login failed");
    }

    const loginData = await loginRes.json();
    const token = loginData.token.result;
    const userId = loginData.userId;

    const userRes = await fetch(`${BASE_URL}/api/Users/${userId}`);
    if (!userRes.ok) {
      throw new Error("Failed to fetch user info");
    }

    const userInfo = await userRes.json();

    return {
      ...userInfo,
      token,
    };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const registerUser = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
  try {
    const response = await fetch("https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
    }
    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectError = (state) => state.auth.error;
export const selectLoading = (state) => state.auth.loading;
export default authSlice.reducer;