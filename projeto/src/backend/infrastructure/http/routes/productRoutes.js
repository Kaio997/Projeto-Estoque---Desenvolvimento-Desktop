const express = require('express');
const SequelizeProductRepository = require('../../database/repositories/SequelizeProductRepository');
const CreateProduct = require('../../application/use-cases/CreateProduct');
const GetAllProducts = require('../../application/use-cases/GetAllProducts');
const UpdateProduct = require('../../application/use-cases/UpdateProduct');
const DeleteProduct = require('../../application/use-cases/DeleteProduct');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply auth middleware to all routes below
router.use(authMiddleware);

// Dependency Injection
const productRepository = new SequelizeProductRepository();
const createProduct = new CreateProduct(productRepository);
const getAllProducts = new GetAllProducts(productRepository);
const updateProduct = new UpdateProduct(productRepository);
const deleteProduct = new DeleteProduct(productRepository);

const productController = new ProductController(
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
);

// Routes
router.post('/', (req, res) => productController.create(req, res));
router.get('/', (req, res) => productController.getAll(req, res));
router.put('/:id', (req, res) => productController.update(req, res));
router.delete('/:id', (req, res) => productController.delete(req, res));

module.exports = router;
