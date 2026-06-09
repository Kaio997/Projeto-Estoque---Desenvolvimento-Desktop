const argon2 = require('argon2');

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const { name, email, password } = userData;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Usuário já cadastrado com este e-mail.");
    }

    const hashedPassword = await argon2.hash(password);

    return await this.userRepository.create({
      name,
      email,
      password: hashedPassword
    });
  }
}

module.exports = RegisterUser;
