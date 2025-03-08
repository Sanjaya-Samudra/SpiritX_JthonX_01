document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let isValid = true;

    if (username.length < 8) {
        document.getElementById('usernameError').innerText = 'Username must be at least 8 characters long.';
        isValid = false;
    } else {
        document.getElementById('usernameError').innerText = '';
    }

    const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    if (!passwordStrength.test(password)) {
        document.getElementById('passwordError').innerText = 'Password must contain at least one lowercase letter, one uppercase letter, and one special character.';
        isValid = false;
    } else {
        document.getElementById('passwordError').innerText = '';
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').innerText = 'Passwords do not match.';
        isValid = false;
    } else {
        document.getElementById('confirmPasswordError').innerText = '';
    }

    if (isValid) {
        // Simulate API call
        setTimeout(() => {
            document.getElementById('confirmationDialog').classList.remove('hidden');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }, 500);
    }
});

