const { response, request } = require('express');

const User = require('../models/User');

const {
  generateJWT,
  writefile,
  sendCode,
  verifyVerificationNumber,
  isPasswordSame,
} = require('../helpers');

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!isPasswordSame(password, user.password)) {
      return res.status(400).json({
        ok: false,
        msg: 'Incorrect email / password',
      });
    }
    await sendCode(user.phone);

    writefile({
      ip: req.connection.remoteAddress,
      user: user.name,
      date: new Date(),
      operation: 'Start Session',
    });

    return res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error searching for the user in the database, talk to an administrator.',
    });
  }
};

const verifyUser = async (req = request, res = response) => {
  try {
    const { phone, code } = req.body;

    await verifyVerificationNumber({ phone, code });

    const user = await User.findOne({ phone });
    const token = await generateJWT(user.id);

    return res.status(200).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'the verification code is invalid',
    });
  }
};

const revalidateToken = async (req, res = response) => {
  const token = await generateJWT(req.user.id);
  res.json({
    ok: true,
    user: { ...req.user },
    token,
  });
};

module.exports = {
  loginUser,
  verifyUser,
  revalidateToken,
};
