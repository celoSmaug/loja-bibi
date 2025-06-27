const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso necessário' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  // Por enquanto, vamos considerar o usuário admin@ecommerce.com como admin
  // Em uma implementação real, você teria um campo 'role' no banco de dados
  if (!req.user || req.user.email !== 'admin@ecommerce.com') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
  }
  next();
};

module.exports = {
  authenticateToken,
  isAdmin
}; 