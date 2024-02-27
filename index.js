
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/db');

router.use(express.json());

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({
        message: 'Email already exists'
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    res.status(201).json({
      message: 'User created'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
