document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userId = signupForm.userId.value;
      const password = signupForm.password.value;
      const role = signupForm.role.value;

      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password, role })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Signup successful. Please log in.');
        window.location.href = 'login.html';
      } else {
        alert(data.error || 'Signup failed');
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userId = loginForm.userId.value;
      const password = loginForm.password.value;

      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password })
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', data.role); // Optional: Store user role
        alert('Login successful');
        window.location.href = 'index.html';
      } else {
        alert(data.error || 'Login failed');
      }
    });
  }
});
