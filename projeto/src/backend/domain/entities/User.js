class User {
  constructor({ id, name, email, password }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;

    this.validate();
  }

  validate() {
    if (!this.name || this.name.trim().length < 3) {
      throw new Error("O nome deve ter pelo menos 3 caracteres.");
    }
    if (!this.email || !this.isValidEmail(this.email)) {
      throw new Error("E-mail inválido.");
    }
    if (!this.password) {
      throw new Error("A senha é obrigatória.");
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

module.exports = User;
