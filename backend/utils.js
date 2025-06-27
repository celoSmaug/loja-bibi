const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hash de senha
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Verificar senha
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Gerar token JWT
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      name: user.name,
      role: user.role || 'user'
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Calcular total do pedido
const calculateOrderTotal = (items) => {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

// Formatar resposta de erro
const formatError = (error) => {
  return {
    error: error.message || 'Erro interno do servidor',
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  calculateOrderTotal,
  formatError
}; 