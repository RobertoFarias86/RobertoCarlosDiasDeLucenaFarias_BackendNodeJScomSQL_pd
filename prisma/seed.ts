import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const cursos = [
    {
      nome: 'Desenvolvimento Web com React e Next.js',
      descricao: 'Aprenda a criar websites modernos com React e Next.js.',
      capa: 'https://img-c.udemycdn.com/course/240x135/4160208_71be_5.jpg',
      inicio: new Date(2025, 7, 20), 
    },
    {
      nome: 'Introdução à Inteligência Artificial',
      descricao: 'Descubra como funciona a IA moderna e seus principais algoritmos.',
      capa: 'https://img-c.udemycdn.com/course/240x135/5218128_7d6e_3.jpg',
      inicio: new Date(2025, 8, 15), 
    },
    {
      nome: 'Banco de Dados com PostgreSQL e Prisma',
      descricao: 'Domine a modelagem de dados e queries avançadas com PostgreSQL e Prisma.',
      capa: 'https://img-c.udemycdn.com/course/240x135/4053980_98b8_2.jpg',
      inicio: new Date(2025, 9, 5), 
    },
  ]

  await prisma.curso.createMany({
    data: cursos,
    skipDuplicates: true, 
  })

  console.log('✅ Cursos inseridos com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })