
const User = require('../models/user');

class UserRepository {
  async findAll() {
    return await User.findAll();
  }
  async findById(id) {
    return await User.findByPk(id);
  }
  async create(user) {
    return await User.create(user);
  }
  async update(id, patch) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(patch);
    return user;
  }
  async remove(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return user;
  }
}

module.exports = new UserRepository();
