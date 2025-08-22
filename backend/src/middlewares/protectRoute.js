import jwt from 'jsonwebtoken';
import userDao from '../daos/user.dao.js';

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    const user = await userDao.findUser(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error('Error in protectRoute middleware:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
