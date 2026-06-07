const { z } = require('zod');

const CreateProductDTO = z.object({
  name: z.string().min(2, "Nome do produto deve ter pelo menos 2 caracteres"),
  category: z.string().min(2, "Categoria deve ter pelo menos 2 caracteres"),
  quantity: z.number().int().min(0, "Quantidade não pode ser negativa"),
  price: z.number().min(0, "Preço não pode ser negativo")
});

const UpdateProductDTO = CreateProductDTO.partial();

module.exports = { CreateProductDTO, UpdateProductDTO };
