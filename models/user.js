const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./index');

class User extends Model {}

User.init({
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING },
  profile: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize,
  modelName: 'User',
  timestamps: false
});

module.exports = User;
