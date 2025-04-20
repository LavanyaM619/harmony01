const jwt = require('jsonwebtoken');

// Admin authentication middleware
const adminAuth = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  // Check if Authorization header is provided
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Access Denied: No Token Provided' });
  }

  // Extract token from Bearer format
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

  try {
    // Verify token with secret key
    const verified = await jwt.verify(token, 'secretKey');

    // Check if the user has the 'admin' role
    if (verified.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized: Admin Access Required' });
    }

    // Attach admin information to request object
    req.admin = verified;
    next();  // Continue to the next middleware or route handler
  } catch (err) {
    // If there's an error during token verification
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token Expired' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid Token' });
    }
    res.status(401).json({ success: false, message: 'Authentication Failed' });
  }
};

module.exports = adminAuth;
