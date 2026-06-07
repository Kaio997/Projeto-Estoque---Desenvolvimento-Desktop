const { CreateProductDTO, UpdateProductDTO } = require('../../application/dtos/ProductDTO');

class ProductController {
  constructor(createProduct, getAllProducts, updateProduct, deleteProduct) {
    this.createProduct = createProduct;
    this.getAllProducts = getAllProducts;
    this.updateProduct = updateProduct;
    this.deleteProduct = deleteProduct;
  }

  async create(req, res, next) {
    try {
      const productData = CreateProductDTO.parse(req.body);
      const product = await this.createProduct.execute(productData);
      return res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const products = await this.getAllProducts.execute();
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const productData = UpdateProductDTO.parse(req.body);
      const product = await this.updateProduct.execute(id, productData);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.deleteProduct.execute(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
