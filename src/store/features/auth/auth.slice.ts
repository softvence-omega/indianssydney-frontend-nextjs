// import { TUser } from "@/types/user";
// import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../../store";

// type Tstate = {
//   user: TUser | null;
//   token: string | null;
// };

// const initialState: Tstate = {
//   user: null,
//   token: null,
// };

// const authSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       const { user, token } = action.payload || {};

//       if (!user || !token) {
//         console.error("Invalid payload received:", action.payload);
//         return;
//       }

//       state.token = token;
//       state.user = user;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { setUser, logout } = authSlice.actions;

// export const selectUser = (state: RootState) => state.auth?.user;
// export const selectToken = (state: RootState) => state.auth?.token;

// const authReducer = authSlice.reducer;
// export default authReducer;


import { TUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: TUser; token?: string | null }>
    ) => {
      const { user, token } = action.payload || {};

      if (!user) {
        console.error("Invalid payload received:", action.payload);
        return;
      }

      // ✅ Update user info
      state.user = user;

      // ✅ Only replace token if a valid one exists
      if (token) {
        state.token = token;
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth?.user;
export const selectToken = (state: RootState) => state.auth?.token;

export default authSlice.reducer;
