const User = require('../models/User');

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({ user });
  } catch (err) {
    return next(err);
  }
};
