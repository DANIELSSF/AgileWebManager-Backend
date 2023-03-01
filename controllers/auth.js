const { response, request } = require("express");
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "user exists with that email address",
      });
    }

    user = new User(req.body);
    user.status = "new";

    console.log(user);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please speak to the administrator",
    });
  }
};

const getUsers = async (req, res = response) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      ok: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please speak to the administrator",
    });
  }
};

const deleteUser = async (req, res = response) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "no user with this id was found",
      });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};

const updateUser = async (req = request, res = response) => {
  const userId = req.params.id;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "No user with this id was found",
      });
    }

    if (req.body.password) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).json({
          ok: false,
          msg: "Use a different password than one already used on this account.",
        });
      } else {
        const salt = bcrypt.genSaltSync();
        const newPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = newPassword;
        if (user.status == "new") {
          req.body.status = "member";
        }
      }
    }
    const newUser = {
      ...req.body,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, newUser, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to an administrator.",
    });
  }
};

const sendCode = (req = request, res = response) => {
  const { phone } = req.body;
  client.verify.v2
    .services(process.env.SERVICE_SID)
    .verifications.create({ to: phone, channel: "sms" })
    .then((verification) => {
      return res.status(200).json({
        ok: true,
        phone: phone,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        ok: false,
      });
    });
};

const verificationNumber = (req = request, res = response) => {
  const { phone, code } = req.body;

  client.verify.v2
    .services(process.env.SERVICE_SID)
    .verificationChecks.create({ to: phone, code: code })
    .then((verification_check) => {
      if (verification_check.valid) {
        return res.status(200).json({
          ok: true,
        });
      }
      return res.status(500).json({
        ok: false,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        ok: false,
      });
    });
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        ok: false,
        msg: "Incorrect email or password",
      });
    }

    return res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      status: user.status,
      role: user.role,
      phone: user.phone,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error searching for the user in the database, talk to an administrator.",
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  loginUser,
  sendCode,
  verificationNumber,
};
