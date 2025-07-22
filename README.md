# OKR Mobile App

Sistema completo para gerenciamento de OKRs (Objectives and Key Results), clientes, relatórios e tarefas.

## 🚀 Funcionalidades

### Para Administradores
- **Gerenciamento de Clientes**: Criar, editar, visualizar e excluir clientes
- **Gestão de OKRs**: Definir objetivos e resultados-chave para clientes
- **Relatórios**: Gerar e enviar relatórios personalizados
- **Tarefas**: Gerenciar tarefas e acompanhar progresso
- **Agenda**: Agendar reuniões e consultorias
- **Configurações**: Gerenciar configurações do sistema

### Para Clientes
- **Dashboard Pessoal**: Visualizar seus OKRs e progresso
- **Relatórios**: Acessar relatórios enviados pelo admin
- **Tarefas**: Ver tarefas atribuídas e status
- **Agenda**: Agendar reuniões com consultores
- **Processos**: Acompanhar processos em andamento

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel

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

4. Configure o Supabase:
   - Crie um projeto em [supabase.com](https://supabase.com)
   - Execute os scripts SQL na pasta `scripts/`
   - Atualize as variáveis de ambiente

5. Execute o projeto:
\`\`\`bash
npm run dev
\`\`\`

## 🗄️ Configuração do Banco de Dados

Execute os scripts SQL na seguinte ordem:

1. `scripts/01-create-tables.sql` - Cria todas as tabelas
2. `scripts/02-enable-rls.sql` - Configura Row Level Security
3. `scripts/03-seed-data.sql` - Insere dados de exemplo
4. `scripts/04-fix-clients-table.sql` - Corrige estrutura da tabela clients

## 🔐 Credenciais de Teste

### Administrador
- Email: `rodrigocastrolage@gmail.com`
- Senha: `123456`

### Clientes
- Email: `joao@empresa.com` / Senha: `123456`
- Email: `maria@empresa.com` / Senha: `123456`

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy automático

### Outras Plataformas

O app é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📱 Funcionalidades Principais

### Sistema Híbrido
- **Modo Supabase**: Dados reais persistidos no banco
- **Modo Fallback**: Dados locais se Supabase não disponível
- **Transição Automática**: Sem downtime durante configuração

### Segurança
- **Row Level Security (RLS)**: Dados isolados por usuário
- **Autenticação JWT**: Tokens seguros do Supabase
- **Validação de Dados**: Sanitização e validação completa

### Interface
- **Responsiva**: Funciona em desktop e mobile
- **Acessível**: Seguindo padrões WCAG
- **Intuitiva**: Design limpo e moderno

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

## 📞 Suporte

Para suporte, entre em contato através do email: rodrigocastrolage@gmail.com
