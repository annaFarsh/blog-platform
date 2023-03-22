function saveLoginLS(username, email, token, image, bio) {
  localStorage.setItem("image", image);
  localStorage.setItem("email", email);
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  localStorage.setItem("bio", bio);
}
function deleteLoginLS() {
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  localStorage.removeItem("image");
  localStorage.removeItem("bio");
}
function checkLoginLS() {
  let username = localStorage.getItem("username");
  let email = localStorage.getItem("email");
  let token = localStorage.getItem("token");
  let image = localStorage.getItem("image");
  if (username && email && token && image) {
    return { username, email, token, image };
  } else {
    return null;
  }
}
export { saveLoginLS, deleteLoginLS, checkLoginLS };
