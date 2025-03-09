const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shav@3490',
  database: 'secureconnect'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

module.exports = connection;
