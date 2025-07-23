-- Script para executar todos os outros scripts em sequência
-- Execute este script no SQL Editor do Supabase

-- 1. Criar tabelas
\i scripts/01-create-tables.sql

-- 2. Habilitar RLS
\i scripts/02-enable-rls.sql

-- 3. Inserir dados de exemplo
\i scripts/03-seed-data.sql

-- Verificar se tudo foi criado corretamente
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Verificar dados inseridos
SELECT 'users' as table_name, count(*) as records FROM users
UNION ALL
SELECT 'clients' as table_name, count(*) as records FROM clients
UNION ALL
SELECT 'okrs' as table_name, count(*) as records FROM okrs
UNION ALL
SELECT 'key_results' as table_name, count(*) as records FROM key_results
UNION ALL
SELECT 'reports' as table_name, count(*) as records FROM reports
UNION ALL
SELECT 'tasks' as table_name, count(*) as records FROM tasks
UNION ALL
SELECT 'meetings' as table_name, count(*) as records FROM meetings;
