document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    let errors = false;
  
    document.getElementById('username-error').textContent = '';
    document.getElementById('password-error').textContent = '';
  
    if (username.length < 8) {
      document.getElementById('username-error').textContent = 'Username must be at least 8 characters long';
      errors = true;
    }
  
    if (password === '') {
      document.getElementById('password-error').textContent = 'Password cannot be empty';
      errors = true;
    }
  
    if (!errors) {
      try {
        const response = await fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        const result = await response.json();
        if (response.status === 200) {
          alert(result.message);
          window.location.href = 'welcome.html';
        } else {
          alert(result);
        }
      } catch (error) {
        alert('An error occurred: ' + error.message);
      }
    }
  });
  