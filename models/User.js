const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
});

UserSchema.method('toJSON', function () {
  const { __v, _id, password, ...user } = this.toObject();
  user.uid = _id;
  return user;
});

module.exports = model('User', UserSchema);
