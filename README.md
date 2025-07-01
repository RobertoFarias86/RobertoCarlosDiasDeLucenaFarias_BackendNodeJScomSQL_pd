#  Plataforma Bastet - Sistema de Cursos Online

##  Descrição

A Plataforma Bastet é um sistema completo para gerenciamento de cursos online, desenvolvido com foco educacional para a disciplina de Backend Node.js com SQL. Ela permite que usuários se cadastrem, façam login, visualizem cursos, inscrevam-se e gerenciem suas inscrições. O sistema implementa autenticação via JWT com cookies, renderização com Next.js 13+ (App Router) e persistência com banco de dados relacional MySQL.

---

##  Tecnologias Utilizadas

- **Frontend:** Next.js 13+, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Banco de Dados:** MySQL com ORM Prisma
- **Autenticação:** JWT via HttpOnly Cookies
- **Ferramentas:** Prisma Studio, Insomnia

---

##  Funcionalidades

-  Autenticação de usuários (login, logout, proteção de rotas)
-  Cadastro e login de alunos
-  Listagem de cursos com imagens, descrição e data de início
-  Inscrição e cancelamento de cursos por aluno autenticado
-  Histórico de inscrições, incluindo cursos cancelados
-  Validação de entrada com Zod e middleware
-  Organização modular com pastas por domínio (auth, alunos, cursos, etc.)
-  Proteção de rotas por ID (usuário não pode ver cursos de outro aluno)

---

##  Instalação e Execução
https://github.com/RobertoFarias86/front-bastet este é o repositorio do frontend

Siga os passos abaixo no terminal para rodar o projeto:

- `npm install` — instala as dependências
- `npx prisma generate` — gera os clientes do Prisma
- `npx prisma migrate dev` — cria as tabelas no banco (em dev)
- `npx prisma db seed` — popula com dados iniciais (3 cursos)
- `npm run dev` — inicia servidor local (frontend e backend separados)

---

##  Variáveis de Ambiente

Crie um arquivo `.env` na raiz do backend com:

```
DATABASE_URL="mysql://root:root@localhost:3306/curso_db"
JWT_SECRET="sua-chave-secreta-ultra-segura"
PORT=3333
```

---

##  Como Usar o Sistema

-  Cadastre um novo aluno via tela inicial (Cadastrar)
-  Faça login com o e-mail e senha cadastrados
-  Visualize os cursos disponíveis na página inicial
-  Clique em um curso para ver mais detalhes ou se inscrever
-  Acesse “Meus Cursos” para visualizar inscrições e cancelar
-  Cursos cancelados continuam visíveis, mas não podem ser reinscritos

---

##  Organização de Pastas

- `modules/` — Divisão por domínio (auth, alunos, cursos, etc.)
- `middlewares/` — Validação de dados e autenticação
- `contexts/` — Contexto global de autenticação (frontend)
- `services/api.ts` — Comunicação entre frontend e backend
- `app/` — App Router (páginas e componentes React)

---

##  Notas Finais

-  O projeto segue boas práticas de organização, separando rotas, controladores, schemas e middlewares.
-  A segurança é feita com autenticação via cookies HttpOnly e verificação em rotas protegidas.

---
