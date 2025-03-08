const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

// Register controller
const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [results] = await userModel.findUserByUsername(username);

    if (results.length > 0) {
      return res.status(400).send('Username already exists');
    }

    const hash = await bcrypt.hash(password, 10);
    await userModel.createUser(username, hash);

    res.status(201).send('User registered');
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [results] = await userModel.findUserByUsername(username);

    if (results.length === 0) {
      return res.status(400).send('Invalid username or password');
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send('Invalid username or password');
    }

    res.status(200).send({ message: `Hello, ${user.username}!` });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

module.exports = { register, login };
