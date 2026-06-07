const UserModel = require('../models/UserModel');
const User = require('../../../domain/entities/User');

class SequelizeUserRepository {
  async create(userData) {
    const userCreated = await UserModel.create(userData);
    return this._mapToEntity(userCreated);
  }

  async findByEmail(email) {
    const userFound = await UserModel.findOne({ where: { email } });
    if (!userFound) return null;
    return this._mapToEntity(userFound);
  }

  async findById(id) {
    const userFound = await UserModel.findByPk(id);
    if (!userFound) return null;
    return this._mapToEntity(userFound);
  }

  _mapToEntity(userModel) {
    return new User({
      id: userModel.id,
      name: userModel.name,
      email: userModel.email,
      password: userModel.password
    });
  }
}

module.exports = SequelizeUserRepository;
