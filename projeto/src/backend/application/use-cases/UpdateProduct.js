class UpdateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id, productData) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error("Produto não encontrado");
    }
    return await this.productRepository.update(id, productData);
  }
}

module.exports = UpdateProduct;
