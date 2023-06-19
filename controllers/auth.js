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

    if (!user.phone) {
      res.status(400).json({
        ok: false,
        msg: 'The user does not have a number',
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
    if (user.status === 'new') {
      user.status = 'verified';
      await user.save();
    }
    const token = await generateJWT(user.id);

    return res.status(200).json({
      ok: true,
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

const sendCodeForChangeNumber = async (req = request, res = response) => {
  try {
    const { phone, uid } = req.body;

    await sendCode(phone);

    const updatedUser = await User.findByIdAndUpdate(
      uid,
      { phone },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      phone: updatedUser.phone,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'Error sending code',
    });
  }
};

const reSendCode = async (req = request, res = response) => {
  try {
    const { phone } = req.body;

    await sendCode(phone);

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'Error sending code',
    });
  }
};

const revalidateToken = async (req, res = response) => {
  const uid = req.user.id;
  const token = await generateJWT(uid);

  const user = await User.findById(uid);

  res.json({
    ok: true,
    user,
    token,
  });
};

module.exports = {
  loginUser,
  verifyUser,
  revalidateToken,
  sendCodeForChangeNumber,
  reSendCode,
};
