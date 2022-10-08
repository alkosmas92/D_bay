export default function username(state = "", action) {
  switch (action.type) {
    case "CHANGE_USERNAME":
      return action.payload;
    default:
      return state;
  }
}
