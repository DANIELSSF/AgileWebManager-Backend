const User = require('../models/User');
const { isPasswordSame, hashPassword } = require('../helpers');

const validatePasswordIsNotTheSame = async (req, res, next) => {
  if (!req.body.password) {
    next();
    return;
  }

  const { id } = req.params;

  const user = await User.findById(id);
  if (isPasswordSame(req.body.password, user.password)) {
    return res.status(400).json({
      ok: false,
      msg: 'Use a different password than one already used on this account.',
    });
  }

  req.body.password = hashPassword(req.body.password);
  if (user.status == 'new') {
    req.body.status = 'member';
  }

  next();
};

module.exports = { validatePasswordIsNotTheSame };
