export default function emailSignUp(state = "", action) {
  switch (action.type) {
    case "CHANGE_EMAIL_SIGNUP":
      return action.payload;
    default:
      return state;
  }
}
