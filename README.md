# OKR Mobile App

Uma aplicação completa para gerenciamento de OKRs (Objectives and Key Results) e tarefas, com dashboards separados para administradores e clientes.

## 🚀 Funcionalidades

### Para Administradores:
- **Gerenciamento de Clientes**: Criar, visualizar e editar clientes
- **Gerenciamento de OKRs**: Criar e acompanhar objetivos e resultados-chave
- **Gerenciamento de Tarefas**: Criar, editar e acompanhar tarefas
- **Relatórios**: Gerar e visualizar relatórios de progresso
- **Agenda**: Gerenciar eventos e reuniões
- **Configurações do Sistema**: Ajustar configurações gerais

### Para Clientes:
- **Dashboard Personalizado**: Visualizar OKRs e tarefas específicas
- **Acompanhamento de Progresso**: Ver progresso dos OKRs
- **Tarefas**: Visualizar e atualizar tarefas atribuídas
- **Agenda**: Ver eventos e agendar reuniões
- **Relatórios**: Acessar relatórios personalizados

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth + fallback mock
- **Deploy**: Vercel

## 📦 Instalação

1. Clone o repositório:
\`\`\`bash
git clone <repository-url>
cd okr-mobile-app
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Configure as variáveis de ambiente:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Execute o projeto:
\`\`\`bash
npm run dev
\`\`\`

## 🔧 Configuração do Supabase

### 1. Criar Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Anote a URL e a chave anônima

### 2. Executar Scripts SQL
Execute os scripts na seguinte ordem no SQL Editor do Supabase:

1. `scripts/01-create-tables.sql` - Criar tabelas
2. `scripts/02-enable-rls.sql` - Habilitar RLS
3. `scripts/03-seed-data.sql` - Inserir dados de exemplo

### 3. Configurar Variáveis de Ambiente
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
\`\`\`

## 👥 Credenciais de Teste

### Administrador:
- **Email**: rodrigocastrolage@gmail.com
- **Senha**: 123456

### Clientes:
- **Email**: joao@empresa.com / **Senha**: 123456
- **Email**: maria@empresa.com / **Senha**: 123456

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Outras Plataformas
O projeto é compatível com qualquer plataforma que suporte Next.js.

## 📱 Responsividade

A aplicação é totalmente responsiva e otimizada para:
- Desktop
- Tablet
- Mobile

## 🔒 Segurança

- Row Level Security (RLS) habilitado no Supabase
- Autenticação segura com JWT
- Validação de dados no frontend e backend
- Fallback para dados mock em caso de falha

## 📊 Estrutura do Banco de Dados

### Tabelas Principais:
- `users` - Usuários do sistema
- `clients` - Clientes cadastrados
- `okrs` - Objetivos e resultados-chave
- `tasks` - Tarefas e atividades
- `events` - Eventos e reuniões
- `reports` - Relatórios gerados
- `processes` - Processos de negócio

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
