// Function to validate username
function validateUsername(username) {
    return username.length >= 8;
}

// Function to validate password
function validatePassword(password) {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    return hasLower && hasUpper && hasSpecial;
}

// Function to validate confirm password
function validateConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}

// Real-time validation for signup
document.getElementById('signupForm').addEventListener('input', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Username validation
    if (!validateUsername(username)) {
        document.getElementById('usernameError').innerText = 'Username must be at least 8 characters long.';
    } else {
        document.getElementById('usernameError').innerText = '';
    }

    // Password validation
    if (!validatePassword(password)) {
        document.getElementById('passwordError').innerText = 'Password must contain at least one lowercase letter, one uppercase letter, and one special character.';
    } else {
        document.getElementById('passwordError').innerText = '';
    }

    // Confirm password validation
    if (!validateConfirmPassword(password, confirmPassword)) {
        document.getElementById('confirmPasswordError').innerText = 'Passwords do not match.';
    } else {
        document.getElementById('confirmPasswordError').innerText = '';
    }
});

// Signup form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Prevent signup if any field is empty
    if (!username || !password || !confirmPassword) {
        alert('All fields are required.');
        return;
    }

    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.errors[0].msg); });
        }
        return response.text();
    })
    .then(successMessage => {
        alert(successMessage);
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    })
    .catch(err => {
        alert(err.message);
    });
});

// Real-time validation for login
document.getElementById('loginForm').addEventListener('input', function() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Prevent login if fields are empty
    if (!loginUsername) {
        document.getElementById('loginUsernameError').innerText = 'Username is required.';
    } else {
        document.getElementById('loginUsernameError').innerText = '';
    }

    if (!loginPassword) {
        document.getElementById('loginPasswordError').innerText = 'Password is required.';
    } else {
        document.getElementById('loginPasswordError').innerText = '';
    }
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Prevent login if any field is empty
    if (!loginUsername || !loginPassword) {
        alert('All fields are required.');
        return;
    }

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(err => { throw new Error(err); });
        }
        return response.text();
    })
    .then(successMessage => {
        // Store session data (simple example)
        sessionStorage.setItem('username', loginUsername);
        document.getElementById('welcomeMessage').innerText = `Hello, ${loginUsername}!`;
        document.getElementById('welcomeMessage').classList.remove('hidden');
        setTimeout(() => {
            window.location.href = 'landing.html'; // Redirect to landing page
        }, 2000);
    })
    .catch(err => {
        alert(err.message);
    });
});

// Logout function
function logout() {
    sessionStorage.removeItem('username');
    window.location.href = 'login.html'; // Redirect to login page
}

// Check if user is logged in on landing page
if (window.location.pathname === '/landing.html') {
    const username = sessionStorage.getItem('username');
    if (!username) {
        alert('You are not logged in. Redirecting to login page.');
        window.location.href = 'login.html';
    } else {
        document.getElementById('welcomeMessage').innerText = `Hello, ${username}!`;
    }
}
