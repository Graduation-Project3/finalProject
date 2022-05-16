/* const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  console.log(req.headers);
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers('x-auth-token').split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(err);
  }
};
 */