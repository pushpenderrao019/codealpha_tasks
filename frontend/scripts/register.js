document.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = 'https://codealpha-tasks-3c9t.onrender.com';
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = registerForm.username.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();

    if (!username || !email || !password) {
      alert('⚠️ Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Registration successful! You can now login.');
        window.location.href = 'login.html';
      } else {
        alert(`❌ ${data.message || 'Registration failed!'}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('❌ Something went wrong. Try again.');
    }
  });
});