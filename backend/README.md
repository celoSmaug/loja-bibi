# Mini E-commerce API

Uma API REST completa para um sistema de e-commerce desenvolvida com Node.js, Express e Prisma.

## 🚀 Funcionalidades

- **Autenticação JWT** com hash de senhas
- **Gestão de Usuários** (registro, login, perfil)
- **Gestão de Produtos** (CRUD completo)
- **Gestão de Categorias** (CRUD completo)
- **Gestão de Pedidos** (criação, listagem, atualização de status)
- **Controle de Estoque** automático
- **Validação de Dados** com Zod
- **Paginação** em listagens
- **Filtros e Busca** em produtos

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd mini-ecommerce/backend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
# Configurações do Banco de Dados
DATABASE_URL="postgresql://username:password@localhost:5432/mini_ecommerce"

# Configurações do JWT
JWT_SECRET="sua_chave_secreta_muito_segura_aqui"

# Configurações do Servidor
PORT=3001
NODE_ENV=development
```

4. **Configure o banco de dados**
```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# (Opcional) Popular banco com dados de exemplo
npx prisma db seed
```

5. **Inicie o servidor**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📚 Endpoints da API

### Autenticação e Usuários

#### `POST /api/users/register`
Registrar novo usuário
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456",
  "address": "Rua das Flores, 123",
  "phone": "(11) 99999-9999"
}
```

#### `POST /api/users/login`
Fazer login
```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

#### `GET /api/users/profile`
Obter perfil do usuário (requer autenticação)

#### `PUT /api/users/profile`
Atualizar perfil do usuário (requer autenticação)

### Produtos

#### `GET /api/products`
Listar produtos com filtros
```
GET /api/products?category=1&search=smartphone&page=1&limit=10
```

#### `GET /api/products/:id`
Buscar produto por ID

#### `POST /api/products`
Criar produto (apenas admin)
```json
{
  "name": "Smartphone XYZ",
  "description": "Smartphone de última geração",
  "price": 1299.99,
  "stock": 50,
  "imageUrl": "https://example.com/image.jpg",
  "categoryId": 1
}
```

#### `PUT /api/products/:id`
Atualizar produto (apenas admin)

#### `DELETE /api/products/:id`
Deletar produto (apenas admin)

### Categorias

#### `GET /api/categories`
Listar todas as categorias

#### `GET /api/categories/:id`
Buscar categoria por ID

#### `POST /api/categories`
Criar categoria (apenas admin)
```json
{
  "name": "Eletrônicos",
  "description": "Produtos eletrônicos"
}
```

#### `PUT /api/categories/:id`
Atualizar categoria (apenas admin)

#### `DELETE /api/categories/:id`
Deletar categoria (apenas admin)

### Pedidos

#### `GET /api/orders/my-orders`
Listar pedidos do usuário (requer autenticação)

#### `GET /api/orders`
Listar todos os pedidos (apenas admin)
```
GET /api/orders?status=PENDING&page=1&limit=10
```

#### `GET /api/orders/:id`
Buscar pedido por ID (requer autenticação)

#### `POST /api/orders`
Criar novo pedido (requer autenticação)
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 3,
      "quantity": 1
    }
  ]
}
```

#### `PATCH /api/orders/:id/status`
Atualizar status do pedido (apenas admin)
```json
{
  "status": "CONFIRMED"
}
```

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Para acessar rotas protegidas, inclua o token no header:

```
Authorization: Bearer <seu_token_jwt>
```

## 📊 Status dos Pedidos

- `PENDING` - Pedido pendente
- `CONFIRMED` - Pedido confirmado
- `SHIPPED` - Pedido enviado
- `DELIVERED` - Pedido entregue
- `CANCELLED` - Pedido cancelado

## 🛡️ Segurança

- Senhas são hasheadas com bcrypt
- Validação de dados com Zod
- Controle de acesso baseado em roles
- Transações para operações críticas
- Sanitização de inputs

## 🧪 Testando a API

### Com cURL

```bash
# Health check
curl http://localhost:3001/health

# Registrar usuário
curl -X POST http://localhost:3001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@email.com","password":"123456"}'

# Login
curl -X POST http://localhost:3001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","password":"123456"}'
```

### Com Postman/Insomnia

Importe a coleção de endpoints ou teste individualmente usando os exemplos acima.

## 📁 Estrutura do Projeto

```
backend/
├── generated/          # Cliente Prisma gerado
├── prisma/            # Schema e migrações
├── routes/            # Rotas da API
│   ├── users.js
│   ├── products.js
│   ├── categories.js
│   └── orders.js
├── middleware/        # Middlewares
│   └── auth.js
├── validations.js     # Schemas de validação
├── utils.js          # Funções utilitárias
├── index.js          # Arquivo principal
└── package.json
```

## 🚀 Deploy

### Variáveis de Ambiente para Produção

```env
DATABASE_URL="postgresql://user:pass@host:port/database"
JWT_SECRET="chave_super_secreta_producao"
NODE_ENV=production
PORT=3001
```

### Com Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
EXPOSE 3001
CMD ["npm", "start"]
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório. 