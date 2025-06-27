@echo off
echo 🚀 Configurando A Loja da Bibi - E-commerce

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado. Por favor, instale o Node.js 18+
    pause
    exit /b 1
)

echo ✅ Node.js encontrado
node --version

REM Instalar dependências do backend
echo 📦 Instalando dependências do backend...
cd backend
call npm install

REM Executar migrações
echo 🗄️ Executando migrações do banco de dados...
call npm run migrate

REM Executar seed
echo 🌱 Populando banco de dados...
call npm run seed

cd ..

REM Instalar dependências do frontend
echo 📦 Instalando dependências do frontend...
cd frontend
call npm install

cd ..

echo ✅ Setup concluído!
echo.
echo 🎯 Para executar o projeto:
echo    Backend:  cd backend ^&^& npm start
echo    Frontend: cd frontend ^&^& npm run dev
echo.
echo 🌐 URLs:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:3001
pause 