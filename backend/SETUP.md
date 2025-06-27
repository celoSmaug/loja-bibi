# 🚀 Guia de Configuração - Mini E-commerce API

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- ✅ Node.js (versão 16 ou superior)
- ✅ PostgreSQL
- ✅ npm ou yarn

## 🛠️ Configuração Passo a Passo

### 1. Configurar Banco de Dados PostgreSQL

1. **Instale o PostgreSQL** (se ainda não tiver)
2. **Crie um banco de dados**:
   ```sql
   CREATE DATABASE mini_ecommerce;
   ```

### 2. Configurar Variáveis de Ambiente

1. **Copie o arquivo de exemplo**:
   ```bash
   cp env.example .env
   ```

2. **Edite o arquivo `.env`** com suas configurações:
   ```env
   # Configurações do Banco de Dados
   DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/mini_ecommerce"
   
   # Configurações do JWT
   JWT_SECRET="sua_chave_secreta_muito_segura_aqui_123456789"
   
   # Configurações do Servidor
   PORT=3001
   NODE_ENV=development
   ```

### 3. Configurar Banco de Dados

1. **Gerar cliente Prisma**:
   ```bash
   npx prisma generate
   ```

2. **Executar migrações**:
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Popular banco com dados de exemplo**:
   ```bash
   npm run seed
   ```

### 4. Iniciar o Servidor

```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

## 🧪 Testando a API

### Opção 1: Script de Teste Automático

```bash
node test-api.js
```

### Opção 2: Teste Manual com cURL

1. **Health Check**:
   ```bash
   curl http://localhost:3001/health
   ```

2. **Registrar usuário**:
   ```bash
   curl -X POST http://localhost:3001/api/users/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "João Silva",
       "email": "joao@email.com",
       "password": "123456",
       "address": "Rua das Flores, 123",
       "phone": "(11) 99999-9999"
     }'
   ```

3. **Fazer login**:
   ```bash
   curl -X POST http://localhost:3001/api/users/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "joao@email.com",
       "password": "123456"
     }'
   ```

4. **Listar produtos**:
   ```bash
   curl http://localhost:3001/api/products
   ```

5. **Listar categorias**:
   ```bash
   curl http://localhost:3001/api/categories
   ```

### Opção 3: Teste com Postman/Insomnia

1. **Importe a coleção** ou teste os endpoints manualmente
2. **Use as URLs**:
   - `GET http://localhost:3001/health`
   - `GET http://localhost:3001/api/products`
   - `POST http://localhost:3001/api/users/register`
   - `POST http://localhost:3001/api/users/login`

## 🔑 Credenciais de Teste

Após executar o seed, você terá acesso a:

### Usuário Admin
- **Email**: `admin@ecommerce.com`
- **Senha**: `admin123`
- **Permissões**: Acesso total (criar/editar/deletar produtos, categorias, etc.)

### Usuário Comum
- **Email**: `user@ecommerce.com`
- **Senha**: `user123`
- **Permissões**: Apenas visualizar e fazer pedidos

## 📚 Endpoints Principais

### 🔐 Autenticação
- `POST /api/users/register` - Registrar usuário
- `POST /api/users/login` - Fazer login
- `GET /api/users/profile` - Ver perfil (requer token)

### 🛍️ Produtos
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Ver produto específico
- `POST /api/products` - Criar produto (admin)
- `PUT /api/products/:id` - Editar produto (admin)
- `DELETE /api/products/:id` - Deletar produto (admin)

### 📦 Categorias
- `GET /api/categories` - Listar categorias
- `GET /api/categories/:id` - Ver categoria específica
- `POST /api/categories` - Criar categoria (admin)
- `PUT /api/categories/:id` - Editar categoria (admin)
- `DELETE /api/categories/:id` - Deletar categoria (admin)

### 📋 Pedidos
- `GET /api/orders/my-orders` - Meus pedidos (requer token)
- `GET /api/orders` - Todos os pedidos (admin)
- `POST /api/orders` - Criar pedido (requer token)
- `PATCH /api/orders/:id/status` - Atualizar status (admin)

## 🔧 Solução de Problemas

### Erro de Conexão com Banco
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solução**: Verifique se o PostgreSQL está rodando e se as credenciais no `.env` estão corretas.

### Erro de Migração
```
Error: P1001: Can't reach database server
```
**Solução**: Verifique a URL do banco no `DATABASE_URL`.

### Erro de JWT
```
Error: JWT_SECRET is not defined
```
**Solução**: Verifique se o `JWT_SECRET` está definido no arquivo `.env`.

### Erro de Porta em Uso
```
Error: listen EADDRINUSE :::3001
```
**Solução**: Mude a porta no `.env` ou pare o processo que está usando a porta 3001.

## 📱 Próximos Passos

1. **Teste todos os endpoints** para garantir que estão funcionando
2. **Crie um frontend** para consumir a API
3. **Implemente funcionalidades adicionais** como:
   - Upload de imagens
   - Sistema de avaliações
   - Cupons de desconto
   - Relatórios de vendas
   - Sistema de notificações

## 🆘 Suporte

Se encontrar problemas:

1. **Verifique os logs** do servidor
2. **Confirme as configurações** no arquivo `.env`
3. **Teste a conexão** com o banco de dados
4. **Verifique se todas as dependências** estão instaladas

---

🎉 **Parabéns!** Sua API do Mini E-commerce está pronta para uso! 