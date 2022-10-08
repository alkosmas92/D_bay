function checkAdmin(username, password) {
  if (username === "admin" && password === "admin") {
    return 0;
  } else return 1;
}

export { checkAdmin };
