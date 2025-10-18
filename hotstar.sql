-- ----------------------------
-- Create Database
-- ----------------------------
CREATE DATABASE IF NOT EXISTS hotstar;

-- Use the database
USE hotstar;

-- ----------------------------
-- Create Users Table
-- ----------------------------
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------
-- Optional: Insert Sample User
-- ----------------------------
-- Replace $2b$12$... with a bcrypt-hashed password generated in Python
-- Example in Python:
-- import bcrypt
-- hashed = bcrypt.hashpw("Test1234".encode('utf-8'), bcrypt.gensalt())
-- print(hashed.decode())
-- Then paste the hash below

INSERT INTO users (username, email, password)