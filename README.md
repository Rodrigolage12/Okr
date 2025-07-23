# OKR Mobile App

Sistema completo para gerenciamento de OKRs (Objectives and Key Results), clientes, relatórios e tarefas.

## 🚀 Funcionalidades

### 👨‍💼 Dashboard Admin
- **Gerenciamento de Clientes**: Criar, editar, visualizar e excluir clientes
- **Gestão de OKRs**: Acompanhar objetivos e resultados-chave de todos os clientes
- **Relatórios**: Gerar e gerenciar relatórios personalizados
- **Tarefas**: Organizar e acompanhar tarefas internas
- **Agenda**: Gerenciar reuniões e compromissos
- **Configurações**: Ajustes do sistema

### 👤 Dashboard Cliente
- **Meus OKRs**: Visualizar e acompanhar objetivos pessoais
- **Relatórios**: Acessar relatórios personalizados
- **Tarefas**: Gerenciar tarefas atribuídas
- **Agenda**: Visualizar reuniões agendadas
- **Processos**: Acompanhar processos em andamento

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth)
- **Deploy**: Vercel

## 📦 Instalação

1. **Clone o repositório**:
\`\`\`bash
git clone <repository-url>
cd okr-mobile-app
\`\`\`

2. **Instale as dependências**:
\`\`\`bash
npm install
# ou
yarn install
# ou
pnpm install
\`\`\`

3. **Configure as variáveis de ambiente**:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edite `.env.local` com suas credenciais do Supabase:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=sua-url-do-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
\`\`\`

4. **Execute o projeto**:
\`\`\`bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
\`\`\`

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🗄️ Configuração do Banco de Dados

### Scripts SQL (Execute na ordem):

1. **Criar tabelas**: `scripts/01-create-tables.sql`
2. **Configurar RLS**: `scripts/02-enable-rls.sql`
3. **Inserir dados**: `scripts/03-seed-data.sql`
4. **Corrigir estrutura**: `scripts/04-fix-clients-table.sql`

### Como executar:
1. Acesse o painel do Supabase
2. Vá para **SQL Editor**
3. Execute cada script na ordem

## 🔐 Credenciais de Teste

### Admin:
- **Email**: rodrigocastrolage@gmail.com
- **Senha**: 123456

### Clientes:
- **Email**: joao@empresa.com | **Senha**: 123456
- **Email**: maria@empresa.com | **Senha**: 123456

## 🏗️ Estrutura do Projeto

\`\`\`
okr-mobile-app/
├── app/                    # App Router (Next.js 14)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── admin/            # Componentes do admin
│   ├── client/           # Componentes do cliente
│   └── ui/               # Componentes UI (shadcn)
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e configurações
├── scripts/              # Scripts SQL
└── public/               # Arquivos estáticos
\`\`\`

## 🔄 Modo Híbrido

O sistema funciona em **modo híbrido**:
- **Supabase configurado**: Usa dados reais do banco
- **Supabase não configurado**: Fallback automático para dados mock
- **Zero downtime**: Transição transparente entre modos

## 📊 Funcionalidades Principais

### Gerenciamento de Clientes
- ✅ CRUD completo
- ✅ Auto-geração de username
- ✅ Validações de email e campos únicos
- ✅ Busca em tempo real

### Sistema de OKRs
- ✅ Objetivos e resultados-chave
- ✅ Acompanhamento de progresso
- ✅ Status e métricas
- ✅ Filtros por cliente

### Relatórios
- ✅ Diferentes tipos (mensal, trimestral, anual)
- ✅ Status de envio e visualização
- ✅ Conteúdo personalizado

### Tarefas
- ✅ Prioridades (baixa, média, alta)
- ✅ Status de progresso
- ✅ Datas de vencimento
- ✅ Atribuição de responsáveis

## 🚀 Deploy

### Vercel (Recomendado):
1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Outras plataformas:
- Netlify
- Railway
- Render

## 🔧 Desenvolvimento

### Scripts disponíveis:
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código

### Estrutura de componentes:
- **Atomic Design**: Componentes organizados por complexidade
- **shadcn/ui**: Sistema de design consistente
- **TypeScript**: Tipagem completa
- **Responsive**: Mobile-first design

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, entre em contato através do email: rodrigocastrolage@gmail.com

---

**Desenvolvido com ❤️ usando Next.js e Supabase**
