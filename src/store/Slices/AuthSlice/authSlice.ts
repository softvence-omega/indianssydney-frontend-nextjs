import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    role: string;
    name: string;
    email: string;
    isLoggedIn: boolean;
    profileImage?: string;
    about?: string;
    recommendations?: string[];
  } | null;
}

const initialState: AuthState = {
  user: {
    profileImage:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "user",
    name: "John Doe",
    email: "s0y2K@example.com",
    about: "I am a test user",
    isLoggedIn: true,
    recommendations: [], // Initialize as empty array
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        email: string;
        name?: string;
        profileImage?: string;
        about?: string;
        recommendations?: string[];
      }>
    ) => {
      state.user = {
        role: "contributor",
        name: action.payload.name || "Test User",
        email: action.payload.email,
        isLoggedIn: true,
        profileImage:
          action.payload.profileImage ||
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        about: action.payload.about || "I am a test user",
        recommendations: action.payload.recommendations || [],
      };
    },
    logout: (state) => {
      state.user = null;
    },
    updateUser: (
      state,
      action: PayloadAction<{
        name?: string;
        email?: string;
        profileImage?: string;
        about?: string;
        recommendations?: string[];
      }>
    ) => {
      if (state.user) {
        state.user = {
          ...state.user,
          name: action.payload.name || state.user.name,
          email: action.payload.email || state.user.email,
          profileImage: action.payload.profileImage || state.user.profileImage,
          about: action.payload.about || state.user.about,
          recommendations: action.payload.recommendations || state.user.recommendations,
        };
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;