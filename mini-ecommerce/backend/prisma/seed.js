const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Criar usuário admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@ecommerce.com',
      password: adminPassword,
      name: 'Administrador',
      address: 'Rua Admin, 123',
      phone: '(11) 99999-9999'
    }
  });

  // Criar usuário comum
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'user@ecommerce.com',
      password: userPassword,
      name: 'Usuário Teste',
      address: 'Rua do Usuário, 456',
      phone: '(11) 88888-8888'
    }
  });

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Eletrônicos',
        description: 'Produtos eletrônicos e gadgets'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Roupas',
        description: 'Vestuário e acessórios'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Livros',
        description: 'Livros e publicações'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Casa e Jardim',
        description: 'Produtos para casa e jardim'
      }
    })
  ]);

  // Criar produtos
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Smartphone Galaxy S23',
        description: 'Smartphone Samsung Galaxy S23 com 128GB',
        price: 3999.99,
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        categoryId: categories[0].id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Notebook Dell Inspiron',
        description: 'Notebook Dell Inspiron 15" com Intel i5',
        price: 3499.99,
        stock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        categoryId: categories[0].id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Camiseta Básica',
        description: 'Camiseta básica de algodão 100%',
        price: 29.99,
        stock: 100,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        categoryId: categories[1].id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Calça Jeans',
        description: 'Calça jeans masculina slim fit',
        price: 89.99,
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
        categoryId: categories[1].id
      }
    }),
    prisma.product.create({
      data: {
        name: 'O Senhor dos Anéis',
        description: 'Trilogia completa de J.R.R. Tolkien',
        price: 79.99,
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        categoryId: categories[2].id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Vaso Decorativo',
        description: 'Vaso decorativo para plantas',
        price: 45.99,
        stock: 20,
        imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
        categoryId: categories[3].id
      }
    })
  ]);

  console.log('✅ Seed concluído com sucesso!');
  console.log(`👤 Usuários criados: ${admin.name}, ${user.name}`);
  console.log(`📦 Categorias criadas: ${categories.length}`);
  console.log(`🛍️ Produtos criados: ${products.length}`);
  
  console.log('\n🔑 Credenciais de teste:');
  console.log('Admin: admin@ecommerce.com / admin123');
  console.log('User: user@ecommerce.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 