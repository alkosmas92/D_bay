export default function changeToken(reduxToken) {
  return { type: "CHANGE_TOKEN", payload: reduxToken };
}
