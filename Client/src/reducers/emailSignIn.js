export default function emailSignIn(state = "", action) {
  switch (action.type) {
    case "CHANGE_EMAIL_SIGNIN":
      return action.payload;
    default:
      return state;
  }
}
