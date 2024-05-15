import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string;
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  user: "",
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.accessToken = action.payload.token;
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: string;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.user = "";
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } =
  authSlice.actions;
export default authSlice.reducer;
