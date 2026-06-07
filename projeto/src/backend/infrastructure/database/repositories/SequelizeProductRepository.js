const ProductModel = require('../models/ProductModel');
const Product = require('../../../domain/entities/Product');

class SequelizeProductRepository {
  async create(productData) {
    const productCreated = await ProductModel.create(productData);
    return this._mapToEntity(productCreated);
  }

  async findAll() {
    const products = await ProductModel.findAll();
    return products.map(p => this._mapToEntity(p));
  }

  async findById(id) {
    const productFound = await ProductModel.findByPk(id);
    if (!productFound) return null;
    return this._mapToEntity(productFound);
  }

  async update(id, productData) {
    const product = await ProductModel.findByPk(id);
    if (product) {
      const updated = await product.update(productData);
      return this._mapToEntity(updated);
    }
    return null;
  }

  async delete(id) {
    const product = await ProductModel.findByPk(id);
    if (product) {
      await product.destroy();
      return true;
    }
    return false;
  }

  _mapToEntity(model) {
    return new Product({
      id: model.id,
      name: model.name,
      category: model.category,
      quantity: model.quantity,
      price: model.price
    });
  }
}

module.exports = SequelizeProductRepository;
