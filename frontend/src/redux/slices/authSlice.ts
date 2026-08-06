import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import Cookies from "js-cookie";

// ============================
// USER TYPE
// ============================

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  image?: string;
}

// ============================
// AUTH STATE
// ============================

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

// ============================
// INITIAL STATE
// ============================

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

// ============================
// AUTH SLICE
// ============================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    // ============================
    // LOGIN
    // ============================

    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      const {
        user,
        accessToken,
        refreshToken,
      } = action.payload;

      // ============================
      // Redux State
      // ============================

      state.user = user;

      state.accessToken =
        accessToken;

      state.refreshToken =
        refreshToken;

      state.isAuthenticated =
        true;

      // ============================
      // Cookies
      // ============================

      if (
        typeof window !==
        "undefined"
      ) {
        Cookies.set(
          "accessToken",
          accessToken,
          {
            expires: 1,
            sameSite: "lax",
            secure:
              process.env.NODE_ENV ===
              "production",
          }
        );

        Cookies.set(
          "refreshToken",
          refreshToken,
          {
            expires: 7,
            sameSite: "lax",
            secure:
              process.env.NODE_ENV ===
              "production",
          }
        );

        Cookies.set(
          "user",
          JSON.stringify(user),
          {
            expires: 7,
            sameSite: "lax",
            secure:
              process.env.NODE_ENV ===
              "production",
          }
        );

        Cookies.set(
          "role",
          user.role,
          {
            expires: 7,
            sameSite: "lax",
            secure:
              process.env.NODE_ENV ===
              "production",
          }
        );
      }
    },

    // ============================
    // RESTORE AUTH
    // ============================

    restoreCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken?: string;
      }>
    ) => {
      state.user =
        action.payload.user;

      state.accessToken =
        action.payload.accessToken;

      state.refreshToken =
        action.payload
          .refreshToken ?? null;

      state.isAuthenticated =
        true;
    },

    // ============================
    // LOGOUT
    // ============================

    logout: (state) => {
      // ============================
      // Clear Redux
      // ============================

      state.user = null;

      state.accessToken = null;

      state.refreshToken = null;

      state.isAuthenticated =
        false;

      // ============================
      // Clear Cookies
      // ============================

      if (
        typeof window !==
        "undefined"
      ) {
        Cookies.remove(
          "accessToken"
        );

        Cookies.remove(
          "refreshToken"
        );

        Cookies.remove(
          "user"
        );

        Cookies.remove(
          "role"
        );
      }
    },
  },
});

export const {
  setCredentials,
  restoreCredentials,
  logout,
} = authSlice.actions;

export default authSlice.reducer;