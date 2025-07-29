document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const BASE_URL = 'https://codealpha-tasks-3c9t.onrender.com'; // ✅ Backend URL

  // Redirect user if already logged in
  if (localStorage.getItem('token')) {
    window.location.href = 'index.html';
    return;
  }

  // Handle login form submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    if (!email || !password) {
      return alert('⚠️ Please enter both email and password.');
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user._id);
        localStorage.setItem('userEmail', data.user.email);

        alert('✅ Login successful!');
        window.location.href = 'index.html';
      } else {
        alert(`❌ ${data.message || 'Invalid credentials'}`);
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('❌ An unexpected error occurred. Please try again later.');
    }
  });
});
