const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // This should match the actual path to authRoutes.js
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes); // This should match the actual path to authRoutes.js

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
