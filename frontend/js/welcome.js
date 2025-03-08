document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.getElementById('welcome-message');
    const username = localStorage.getItem('username');
  
    if (username) {
      welcomeMessage.textContent = `Hello, ${username}!`;
    } else {
      window.location.href = 'welcome.html';
    }
  
    document.getElementById('logout').addEventListener('click', () => {
      localStorage.removeItem('username');
      window.location.href = 'login.html';
    });
  });
  