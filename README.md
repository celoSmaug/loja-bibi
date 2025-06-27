# 🛍️ A Loja da Bibi - E-commerce Completo

Um projeto completo de e-commerce desenvolvido com **React** (frontend) e **Node.js** (backend), incluindo autenticação, carrinho de compras, e painel administrativo.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** com Vite
- **Material UI** para interface
- **React Router** para navegação
- **Axios** para requisições HTTP
- **Context API** para gerenciamento de estado

### Backend
- **Node.js** com Express
- **Prisma ORM** para banco de dados
- **SQLite** como banco de dados
- **JWT** para autenticação
- **Zod** para validação de dados
- **bcrypt** para hash de senhas

## 📁 Estrutura do Projeto

```
├── frontend/          # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── contexts/      # Contextos React
│   │   └── services/      # Serviços de API
│   └── package.json
├── backend/           # API Node.js
│   ├── routes/        # Rotas da API
│   ├── middleware/    # Middlewares
│   ├── prisma/        # Schema e migrações
│   └── package.json
└── README.md
```

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Backend
```bash
cd backend
npm install
npm run migrate
npm run seed
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🌐 URLs de Acesso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## 📋 Funcionalidades

### Para Clientes
- ✅ Navegação por produtos
- ✅ Busca e filtros
- ✅ Carrinho de compras
- ✅ Cadastro e login
- ✅ Histórico de pedidos
- ✅ Perfil do usuário

### Para Administradores
- ✅ Painel administrativo
- ✅ Gerenciamento de produtos
- ✅ Gerenciamento de categorias
- ✅ Gerenciamento de pedidos
- ✅ Relatórios de vendas

## 🔐 Autenticação

O sistema utiliza JWT para autenticação. Usuários podem:
- Registrar nova conta
- Fazer login
- Acessar rotas protegidas
- Gerenciar perfil

## 🛒 Carrinho de Compras

- Adicionar/remover produtos
- Alterar quantidades
- Calcular total
- Persistência local
- Finalização de compra

## 📊 Banco de Dados

O projeto utiliza SQLite com Prisma ORM, incluindo:
- Usuários
- Produtos
- Categorias
- Pedidos
- Itens de pedido

## 🚀 Deploy

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend (Railway/Render)
```bash
cd backend
npm start
```

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ para o bootcamp** 