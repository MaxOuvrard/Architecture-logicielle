const User = require('../models/user');

module.exports = {
  findAll: async () => await User.findAll(),
  findById: async (id) => await User.findByPk(id),
  create: async (user) => await User.create(user),
  update: async (id, patch) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(patch);
    return user;
  },
  remove: async (id) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return user;
  }
};
