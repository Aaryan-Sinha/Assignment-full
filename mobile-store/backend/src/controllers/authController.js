// backend/src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = async (req, res, next) => {
  try {
    const { userId, password, role } = req.body;
    if (!userId || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existing = await userModel.getUserByUserId(userId);
    if (existing) return res.status(409).json({ error: 'User ID already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(userId, hashedPassword, role);
    res.status(201).json({ message: 'User registered', user: { id: user.id, userId: user.user_id, role: user.role } });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { userId, password } = req.body;
    const user = await userModel.getUserByUserId(userId);

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, userId: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
   res.json({ message: 'Login successful', token, role: user.role });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};
