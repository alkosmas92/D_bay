export default function passwordSingUp(state = "", action) {
  switch (action.type) {
    case "CHANGE_PASSWORD_SIGNUP":
      return action.payload;
    default:
      return state;
  }
}
