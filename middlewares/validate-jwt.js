const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validateJWT = async(req, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token in the request',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'Token not valid - user does not exist',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'invalid token',
    });
  }
};

module.exports = {
  validateJWT,
};
