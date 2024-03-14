import store from "../stores";
import { useSelector } from "react-redux";
import { signIn, logOut as logOutStore } from "../stores/auth";

export const useAuthData = () => useSelector((state) => state.auth.auth);

export const useUserSignedIn = () =>
  useSelector((state) => state.auth.auth.userSignedIn);

export const signInUser = (userData) => store.dispatch(signIn(userData));

export const logOutUser = () => {
  store.dispatch(logOutStore());
};

export async function logOutScenario() {
  logOutUser();
  window.location.reload();
}
