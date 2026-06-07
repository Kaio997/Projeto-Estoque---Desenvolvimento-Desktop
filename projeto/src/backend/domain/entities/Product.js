class Product {
  constructor({ id, name, category, quantity, price }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.quantity = quantity;
    this.price = price;

    this.validate();
  }

  validate() {
    if (!this.name || this.name.trim().length < 2) {
      throw new Error("O nome do produto é obrigatório e deve ter pelo menos 2 caracteres.");
    }
    if (!this.category || this.category.trim().length < 2) {
      throw new Error("A categoria é obrigatória.");
    }
    if (this.quantity < 0) {
      throw new Error("A quantidade não pode ser negativa.");
    }
    if (this.price < 0) {
      throw new Error("O preço não pode ser negativo.");
    }
  }

  // Business logic example
  updateStock(amount) {
    const newQuantity = this.quantity + amount;
    if (newQuantity < 0) {
      throw new Error("Estoque insuficiente para esta operação.");
    }
    this.quantity = newQuantity;
  }
}

module.exports = Product;
