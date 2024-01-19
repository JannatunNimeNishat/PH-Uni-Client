import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TInitialState = {
  user: null | object;
  token: null | string;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = state;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const userCurrentToken = (state:RootState)=>(state.auth.token);
export const userCurrentUser = (state:RootState)=>(state.auth.user);