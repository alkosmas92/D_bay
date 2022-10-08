import { combineReducers } from "redux";
import username from "./username";
import emailSignIn from "./emailSignIn";
import emailSignUp from "./emailSignUp";
import passwordSingIn from "./passwordSingIn";
import passwordSingUp from "./passwordSingUp";
import address from "./address";
import afm from  "./afm";
import telephone from "./telephone";
import firstname from "./firstname";
import lastname from "./lastname";
import reduxToken from "./token";
import password_check from "./password_check";

export default combineReducers({
  username,
  emailSignIn,
  emailSignUp,
  passwordSingIn,
  passwordSingUp,
  reduxToken,
  address,
  afm,
  firstname,
  lastname,
  telephone,
  password_check,
});
