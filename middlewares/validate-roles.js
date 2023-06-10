const { response } = require('express');

const isAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'error when verifying the role with jwt',
    });
  }

  const { role, name } = req.user;

  if (role !== 'admin') {
    return res.status(403).json({
      msg: `the user ${name} does not have the necessary permissions`,
    });
  }

  next();
};

const validateUserPermissions = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'error when verifying the role with jwt',
    });
  }

  const { role, name } = req.user;

  if (role === 'readOnly') {
    return res.status(403).json({
      msg: `the user ${name} does not have the necessary permissions`,
    });
  }

  next();
};

module.exports = { isAdminRole, validateUserPermissions };
