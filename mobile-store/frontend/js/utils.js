// frontend/js/utils.js

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

function isLoggedIn() {
  return !!localStorage.getItem('token');
}
