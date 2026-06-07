const RegisterUser = require('../../../application/use-cases/RegisterUser');
const LoginUser = require('../../../application/use-cases/LoginUser');
const SequelizeUserRepository = require('../../database/repositories/SequelizeUserRepository');

class UserController {
  constructor() {
    this.userRepository = new SequelizeUserRepository();
    this.registerUser = new RegisterUser(this.userRepository);
    this.loginUser = new LoginUser(this.userRepository);
  }

  async register(req, res, next) {
    try {
      const userData = req.body;
      const user = await this.registerUser.execute(userData);
      
      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUser.execute(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
