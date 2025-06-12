/**
 * INSTRUÇÕES PARA CONFIGURAR SUPABASE
 *
 * 1. Crie um projeto no Supabase (https://supabase.com)
 *
 * 2. Configure as variáveis de ambiente no Vercel ou .env.local:
 *    NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
 *    NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
 *
 * 3. Execute os scripts SQL na ordem:
 *    - scripts/01-create-tables.sql
 *    - scripts/02-enable-rls.sql
 *    - scripts/03-seed-data.sql
 *
 * 4. Configure a autenticação no Supabase:
 *    - Vá em Authentication > Settings
 *    - Desabilite "Enable email confirmations" para desenvolvimento
 *    - Configure o Site URL para seu domínio
 *
 * 5. Credenciais de teste:
 *    Admin: rodrigocastrolage@gmail.com / 123456
 *    Cliente: joao@empresa.com / 123456
 *    Cliente: maria@empresa.com / 123456
 *
 * MODO FALLBACK:
 * Se o Supabase não estiver configurado, o sistema automaticamente
 * usará dados mock para desenvolvimento.
 */

export const SETUP_INSTRUCTIONS = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  isConfigured: !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "your-supabase-url"
  ),
  testCredentials: {
    admin: { email: "rodrigocastrolage@gmail.com", password: "123456" },
    clients: [
      { email: "joao@empresa.com", password: "123456" },
      { email: "maria@empresa.com", password: "123456" },
    ],
  },
}
