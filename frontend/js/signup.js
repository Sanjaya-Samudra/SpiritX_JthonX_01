document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    let errors = false;
  
    document.getElementById('username-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('confirm-password-error').textContent = '';
  
    if (username.length < 8) {
      document.getElementById('username-error').textContent = 'Username must be at least 8 characters long';
      errors = true;
    }
  
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
      document.getElementById('password-error').textContent = 'Password must contain at least one lowercase letter, one uppercase letter, and one special character';
      errors = true;
    }
  
    if (password !== confirmPassword) {
      document.getElementById('confirm-password-error').textContent = 'Passwords do not match';
      errors = true;
    }
  
    if (!errors) {
      try {
        const response = await fetch('http://localhost:5000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        const result = await response.text();
        if (response.status === 201) {
          alert('User registered successfully');
          window.location.href = 'login.html';
        } else {
          alert(result);
        }
      } catch (error) {
        alert('An error occurred: ' + error.message);
      }
    }
  });
  