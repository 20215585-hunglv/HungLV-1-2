import authService from '../services/auth.service.js';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginService({ email, password });
    const token = await authService.createToken(user._id);
    res.status(200).json({
      message: 'login successful',
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error login',
    });
  }
};

const tetsLogin = async (req, res) => {
  const { user } = req;
  res.status(200).json(user);
};

export default {
  login,
  tetsLogin,
};
