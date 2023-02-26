const { response } = require("express");
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
      const user = await Event.findById(userId);
  
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

module.exports = {
  createUser,
  getUsers,
  deleteUser,
};
