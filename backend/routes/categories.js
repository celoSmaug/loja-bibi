const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const { validate, categorySchema } = require('../validations');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Listar todas as categorias
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });

    res.json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar categoria por ID
router.get('/:id(\\d+)', async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
            imageUrl: true
          }
        },
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    res.json(category);
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Criar nova categoria (apenas admin)
router.post('/', authenticateToken, isAdmin, validate(categorySchema), async (req, res) => {
  try {
    const { name, description } = req.validatedData;

    // Verificar se categoria já existe
    const existingCategory = await prisma.category.findUnique({
      where: { name }
    });

    if (existingCategory) {
      return res.status(400).json({ error: 'Categoria já existe' });
    }

    const category = await prisma.category.create({
      data: { name, description }
    });

    res.status(201).json({
      message: 'Categoria criada com sucesso',
      category
    });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar categoria (apenas admin)
router.put('/:id(\\d+)', authenticateToken, isAdmin, validate(categorySchema), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.validatedData;

    // Verificar se categoria existe
    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingCategory) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    // Verificar se nome já existe (se foi alterado)
    if (name !== existingCategory.name) {
      const categoryWithSameName = await prisma.category.findUnique({
        where: { name }
      });

      if (categoryWithSameName) {
        return res.status(400).json({ error: 'Nome de categoria já existe' });
      }
    }

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name, description }
    });

    res.json({
      message: 'Categoria atualizada com sucesso',
      category
    });
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Deletar categoria (apenas admin)
router.delete('/:id(\\d+)', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se categoria existe
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    // Verificar se categoria tem produtos
    if (category._count.products > 0) {
      return res.status(400).json({ 
        error: 'Não é possível deletar categoria que possui produtos' 
      });
    }

    await prisma.category.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router; 