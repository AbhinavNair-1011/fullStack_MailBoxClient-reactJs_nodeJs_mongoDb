const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Helpers = require('../utils/Helpers');

const register = async (req, res) => {
  try {
        console.log(req.body)

    const { username, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) return Helpers.sendConflict(res, 'User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    Helpers.sendCreated(res, { user }, 'User registered');
  } catch (err) {
    Helpers.sendServerError(res, 'Registration failed', err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return Helpers.sendUnauthorized(res, 'Invalid credentials');
    }

  const accessToken = jwt.sign(
  { id: user._id, email: user.email, name: user.username }, 
  process.env.ACCESS_TOKEN_SECRET, 
  { expiresIn: '1h' }
);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000, 
      // sameSite: 'none'
    });

    Helpers.sendSuccess(res, { user: { id: user._id, email: user.email } }, 'Login successful');
  } catch (err) {
    Helpers.sendServerError(res, 'Login failed', err);
  }
};

const logout = async (req, res) => {
  try {
        res.clearCookie('accessToken', {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      // sameSite: 'none'
    });
    Helpers.sendSuccess(res, null, 'Logged out');
  } catch (err) {
    Helpers.sendServerError(res, 'Logout failed', err);
  }
};

const me = (req, res) => {
  Helpers.sendSuccess(
    res,
    {
      user: req.user,
    },
    "Authenticated"
  );
};
module.exports = { register, login, logout , me};