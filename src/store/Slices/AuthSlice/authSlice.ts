import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";

// Types
//
interface User {
  id?: string;
  role: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  profileImage?: string;
  about?: string;
  recommendations?: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};


// API Calls (wrapped in async thunks)

// Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    payload: { email: string; password: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", payload);
      // data = { resetToken }
      localStorage.setItem("resetToken", data.resetToken);
      return data;
    } catch (error: any) {
      console.error("Register Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Verify OTP
export const verifyUserOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (
    payload: { resetToken: string; emailOtp: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post(
        "/auth/signup-verify-otp",
        payload
      );
      // data = { success, message, data: { token, user } }
      const { token, user } = data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (error: any) {
      console.error("Verify OTP Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", payload);
      const { token, user } = data?.data;
      console.log(token, data);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (error: any) {
      console.error("Login Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Reset Verify OTP
export const resetVerifyOtp = createAsyncThunk(
  "auth/resetVerifyOtp",
  async (
    payload: { resetToken: string; emailOtp: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post(
        "/auth/reset-verify-otp",
        payload
      );
      return data;
    } catch (error: any) {
      console.error(
        "Reset Verify OTP Error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Reset verify OTP failed"
      );
    }
  }
);

// Forget Password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (payload: { email: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/auth/forget-password",
        payload
      );
      return data;
    } catch (error: any) {
      console.error(
        "Forget Password Error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Forget password failed"
      );
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    payload: { resetToken: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post(
        "/auth/reset-password",
        payload
      );
      return data;
    } catch (error: any) {
      console.error(
        "Reset Password Error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Reset password failed"
      );
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("resetToken");
  return true;
});

//
// 🔹 Slice
//
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUserFromStorage: (state) => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token && user) {
          state.token = token;
          state.user = { ...JSON.parse(user), isLoggedIn: true }; // ✅ ensure isLoggedIn flag
        }
      } catch (err) {
        console.error("Error loading user from storage", err);
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Verify OTP
      .addCase(verifyUserOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUserOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = { ...action.payload.user, isLoggedIn: true };
      })
      .addCase(verifyUserOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = { ...action.payload.user, isLoggedIn: true };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { loadUserFromStorage, updateUser } = authSlice.actions;
export default authSlice.reducer;
