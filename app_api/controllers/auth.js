const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;

exports.createAdmin = async (req, res) => {
  try {
    const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      return res.status(400).json({ message: 'Missing admin env' });
    }
    const found = await User.findOne({ email: ADMIN_EMAIL });
    if (found) return res.json({ message: 'Admin already exists' });

    const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const user = await User.create({ email: ADMIN_EMAIL, passwordHash: hash, role: 'admin' });
    return res.json({ message: 'Admin created', id: user._id });
  } catch (err) {
    console.error('createAdmin error:', err);
    return res.status(500).json({ message: 'Error creating admin user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { sub: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({ token });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ message: 'Login error' });
  }
};
