const validatefields = require('./validate-fields.js');
const validateJWT = require('./validate-jwt.js');
const validatePassword = require('./validate-password.js');
const validatePermissions = require('./validate-permissions.js');
const validateRoles = require('./validate-roles.js');

module.exports = {
  ...validatefields,
  ...validateJWT,
  ...validatePassword,
  ...validatePermissions,
  ...validateRoles,
};
