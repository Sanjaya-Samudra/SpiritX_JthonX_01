const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const db = require('./database'); // Import database connection
const bcrypt = require('bcrypt'); // For password hashing
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Allow your frontend origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD'); // Allow common methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow JSON content type
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // If you use credentials (cookies, auth)

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
});
// ... your other routes (e.g., POST /api/signup)

app.use(bodyParser.json());
app.use(express.static('frontend'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// API endpoint for signup
app.post('/api/signup', [
    check('username').isLength({ min: 8 }).withMessage('Username must be at least 8 characters long.'),
    check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/).withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one special character.'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Check if username already exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).send('Database error.');

        if (results.length > 0) {
            return res.status(400).send('Username already taken.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
            if (err) return res.status(500).send('Error creating user.');
            res.status(201).send('User created successfully!');
        });
    });
});

// API endpoint for login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).send('Database error.');

        if (results.length === 0) {
            return res.status(400).send('Invalid username or password.');
        }

        const user = results[0];

        // Compare password with hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send('Invalid username or password.');
        }

        res.status(200).send(`Hello, ${user.username}!`);
    });
});
