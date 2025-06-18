const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); 


module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next(); 
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
