import { createSlice } from "@reduxjs/toolkit";

const loadAuthStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("auth-info");

    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const initialState = loadAuthStateFromLocalStorage() || {
  auth: {
    git_id: "",
    login: "",
    name: "",
    avatar_url: "",
    url: "",
    userSignedIn: false,
  },
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.auth.userSignedIn = true;
      state.auth.git_id = action.payload.id;
      state.auth.login = action.payload.login;
      state.auth.name = action.payload.name;
      state.auth.avatar_url = action.payload.avatar_url;
      state.auth.url = action.payload.url;

      localStorage.setItem("auth-info", JSON.stringify(state));
    },
    logOut: (state) => {
      state.auth.userSignedIn = false;
      state.auth.git_id = null;
      state.auth.login = null;
      state.auth.name = null;
      state.auth.avatar_url = null;
      state.auth.url = null;

      // Auth Info
      localStorage.removeItem("auth-info");
    },
  },
});

export const { signIn, logOut } = auth.actions;
export default auth.reducer;
