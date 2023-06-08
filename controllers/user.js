const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { writefile } = require('../helpers');

const createUser = async (req, res = response) => {
  const {
    name,
    email,
    password,
    role = 'readOnly',
    status = 'new',
    phone = '',
  } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'user exists with that email address',
      });
    }

    user = new User({ name, email, password, role, status, phone });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    writefile({
      ip: req.socket.remoteAddress,
      user: req.user.name || name,
      date: new Date(),
      operation: 'Create a user',
    });

    res.status(201).json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please speak to the administrator',
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
      msg: 'Please speak to the administrator',
    });
  }
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'no user with this id was found',
      });
    }

    await User.findByIdAndDelete(id);

    writefile({
      ip: req.socket.remoteAddress,
      user: req.user.name,
      date: new Date(),
      operation: 'Delete a user',
    });

    res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Talk to the administrator',
    });
  }
};

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'No user with this id was found',
      });
    }

    if (req.body.password) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).json({
          ok: false,
          msg: 'Use a different password than one already used on this account.',
        });
      } else {
        const salt = bcrypt.genSaltSync();
        const newPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = newPassword;
        if (user.status == 'new') {
          req.body.status = 'member';
        }
      }
    }

    const existingUser = {
      ...req.body,
    };

    const updatedUser = await User.findByIdAndUpdate(id, existingUser, {
      new: true,
    });

    writefile({
      ip: req.socket.remoteAddress,
      user: req.user.name,
      date: new Date(),
      operation: id === req.user.uid ? 'Update your user' : 'Update a user',
    });

    res.status(200).json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Talk to an administrator.',
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
};
