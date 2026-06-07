class DeleteProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error("Produto não encontrado");
    }
    return await this.productRepository.delete(id);
  }
}

module.exports = DeleteProduct;
