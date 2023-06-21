const { response, request } = require('express');

const User = require('../models/User');

const { writefile, hashPassword } = require('../helpers');

const createUser = async (req, res = response) => {
  const { name, email, password, phone } = req.body;

  try {
    const user = new User({
      name,
      email,
      password,
      role: 'readOnly',
      status: 'new',
      phone,
    });

    user.password = hashPassword(password);

    await user.save();

    writefile({
      ip: req.socket.remoteAddress,
      user: name,
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
    await User.findByIdAndDelete(id);

    writefile({
      ip: req.socket.remoteAddress,
      user: req.user.name,
      date: new Date(),
      operation: 'Delete a user',
    });

    res.status(200).json({
      ok: true,
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
  console.log(req.body);
  const { id } = req.params;
  try {
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
      operation: id === req.user.id ? 'Update your user' : 'Update a user',
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
