1. Create Database

CREATE DATABASE secureconnect;

USE secureconnect;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

Run following commands

1. cd backend

2. npm init

3. npm install mysql

4. npm install mysql2

5. npm install express body-parser cors mysql bcrypt

run this to connect server with database
6. node server.js
