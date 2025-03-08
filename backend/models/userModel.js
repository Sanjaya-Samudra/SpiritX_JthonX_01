const connection = require('../config/database');

// Function to create a new user
const createUser = (username, password) => {
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  return connection.promise().query(query, [username, password]);
};

// Function to find a user by username
const findUserByUsername = (username) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  return connection.promise().query(query, [username]);
};

module.exports = { createUser, findUserByUsername };
