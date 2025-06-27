#!/bin/bash

echo "🚀 Configurando A Loja da Bibi - E-commerce"

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js 18+"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Instalar dependências do backend
echo "📦 Instalando dependências do backend..."
cd backend
npm install

# Executar migrações
echo "🗄️ Executando migrações do banco de dados..."
npm run migrate

# Executar seed
echo "🌱 Populando banco de dados..."
npm run seed

cd ..

# Instalar dependências do frontend
echo "📦 Instalando dependências do frontend..."
cd frontend
npm install

cd ..

echo "✅ Setup concluído!"
echo ""
echo "🎯 Para executar o projeto:"
echo "   Backend:  cd backend && npm start"
echo "   Frontend: cd frontend && npm run dev"
echo ""
echo "🌐 URLs:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3001" 