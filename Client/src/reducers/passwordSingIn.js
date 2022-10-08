export default function passwordSingIn(state = "", action) {
  switch (action.type) {
    case "CHANGE_PASSWORD_SIGNIN":
      return action.payload;
    default:
      return state;
  }
}
