const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Testando API do Mini E-commerce...\n');

  try {
    // Teste 1: Health check
    console.log('1️⃣ Testando health check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);

    // Teste 2: Rota raiz
    console.log('\n2️⃣ Testando rota raiz...');
    const rootResponse = await axios.get(`${API_BASE_URL}/`);
    console.log('✅ Rota raiz:', rootResponse.data.message);

    // Teste 3: Listar categorias
    console.log('\n3️⃣ Testando listagem de categorias...');
    const categoriesResponse = await axios.get(`${API_BASE_URL}/api/categories`);
    console.log('✅ Categorias encontradas:', categoriesResponse.data.length);

    // Teste 4: Listar produtos
    console.log('\n4️⃣ Testando listagem de produtos...');
    const productsResponse = await axios.get(`${API_BASE_URL}/api/products`);
    console.log('✅ Produtos encontrados:', productsResponse.data.products.length);

    // Teste 5: Registrar usuário
    console.log('\n5️⃣ Testando registro de usuário...');
    const registerResponse = await axios.post(`${API_BASE_URL}/api/users/register`, {
      name: 'Teste API',
      email: 'teste-api@email.com',
      password: '123456',
      address: 'Rua Teste, 123',
      phone: '(11) 77777-7777'
    });
    console.log('✅ Usuário registrado:', registerResponse.data.user.name);

    // Teste 6: Login
    console.log('\n6️⃣ Testando login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/api/users/login`, {
      email: 'teste-api@email.com',
      password: '123456'
    });
    console.log('✅ Login realizado:', loginResponse.data.message);

    const token = loginResponse.data.token;

    // Teste 7: Acessar perfil (com autenticação)
    console.log('\n7️⃣ Testando acesso ao perfil...');
    const profileResponse = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Perfil acessado:', profileResponse.data.name);

    console.log('\n🎉 Todos os testes passaram com sucesso!');
    console.log('\n📋 Resumo:');
    console.log('- API está funcionando');
    console.log('- Autenticação JWT está funcionando');
    console.log('- Banco de dados está conectado');
    console.log('- Rotas estão respondendo corretamente');

  } catch (error) {
    console.error('\n❌ Erro durante os testes:', error.message);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Dados:', error.response.data);
    }
    
    console.log('\n💡 Dicas para resolver:');
    console.log('1. Verifique se o servidor está rodando (npm run dev)');
    console.log('2. Verifique se o banco de dados está configurado');
    console.log('3. Verifique se o arquivo .env está configurado corretamente');
  }
}

// Executar testes
testAPI(); 