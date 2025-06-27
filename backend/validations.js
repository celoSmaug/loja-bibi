const { z } = require('zod');

// Schema para validação de usuário
const userSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  address: z.string().optional(),
  phone: z.string().optional()
});

// Schema para login
const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória')
});

// Schema para produto
const productSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
  price: z.number().positive('Preço deve ser positivo'),
  stock: z.number().int().min(0, 'Estoque deve ser um número inteiro não negativo'),
  imageUrl: z.string().url().optional().or(z.literal('')),
  categoryId: z.number().int().positive('Categoria é obrigatória')
});

// Schema para categoria
const categorySchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  description: z.string().optional()
});

// Schema para item do pedido
const orderItemSchema = z.object({
  productId: z.number().int().positive('ID do produto é obrigatório'),
  quantity: z.number().int().positive('Quantidade deve ser positiva')
});

// Schema para pedido
const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'Pedido deve ter pelo menos um item')
});

// Middleware para validação
const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.body);
      req.validatedData = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      next(error);
    }
  };
};

module.exports = {
  userSchema,
  loginSchema,
  productSchema,
  categorySchema,
  orderSchema,
  validate
}; 