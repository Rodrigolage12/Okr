-- Insert sample clients
INSERT INTO clients (id, name, email, company, phone, status) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'João Silva', 'joao@empresa.com', 'Empresa ABC', '(11) 99999-9999', 'active'),
('550e8400-e29b-41d4-a716-446655440002', 'Maria Santos', 'maria@empresa.com', 'Empresa XYZ', '(11) 88888-8888', 'active'),
('550e8400-e29b-41d4-a716-446655440003', 'Pedro Costa', 'pedro@empresa.com', 'Empresa 123', '(11) 77777-7777', 'active')
ON CONFLICT (email) DO NOTHING;

-- Insert sample users
INSERT INTO users (id, email, name, user_type, client_id) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'rodrigocastrolage@gmail.com', 'Rodrigo Castro', 'admin', NULL),
('550e8400-e29b-41d4-a716-446655440011', 'joao@empresa.com', 'João Silva', 'client', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440012', 'maria@empresa.com', 'Maria Santos', 'client', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440013', 'pedro@empresa.com', 'Pedro Costa', 'client', '550e8400-e29b-41d4-a716-446655440003')
ON CONFLICT (email) DO NOTHING;

-- Insert sample OKRs
INSERT INTO okrs (id, title, description, objective, key_results, progress, status, client_id) VALUES
('550e8400-e29b-41d4-a716-446655440020', 'Crescimento Q1 2024', 'Objetivos de crescimento para o primeiro trimestre', 'Aumentar receita em 25%', '["Fechar 50 novos contratos", "Aumentar ticket médio em 15%", "Reduzir churn em 10%"]', 65, 'active', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440021', 'Melhoria de Processos', 'Otimizar processos internos', 'Reduzir tempo de resposta em 40%', '["Automatizar 3 processos manuais", "Treinar equipe em novas ferramentas", "Implementar dashboard de métricas"]', 30, 'active', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440022', 'Expansão de Mercado', 'Entrar em novos mercados', 'Conquistar 3 novos segmentos', '["Pesquisa de mercado completa", "Desenvolver estratégia de entrada", "Contratar equipe especializada"]', 80, 'active', '550e8400-e29b-41d4-a716-446655440003');

-- Insert sample tasks
INSERT INTO tasks (id, title, description, status, priority, due_date, assigned_to, client_id) VALUES
('550e8400-e29b-41d4-a716-446655440030', 'Revisar relatório mensal', 'Analisar métricas do mês anterior e preparar insights', 'pending', 'high', '2024-02-15', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440031', 'Preparar apresentação para cliente', 'Criar slides para reunião de review', 'in_progress', 'medium', '2024-02-20', '550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440032', 'Implementar nova funcionalidade', 'Desenvolver módulo de relatórios automáticos', 'pending', 'high', '2024-02-25', '550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440003'),
('550e8400-e29b-41d4-a716-446655440033', 'Treinamento da equipe', 'Capacitar equipe nas novas ferramentas', 'completed', 'medium', '2024-02-10', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001');

-- Insert sample events
INSERT INTO events (id, title, description, date, time, type, client_id) VALUES
('550e8400-e29b-41d4-a716-446655440040', 'Reunião de planejamento mensal', 'Definir metas e estratégias para o próximo mês', '2024-02-15', '14:00', 'meeting', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440041', 'Review de OKRs Q1', 'Avaliar progresso dos objetivos do trimestre', '2024-02-20', '10:00', 'review', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440042', 'Deadline - Entrega do projeto', 'Prazo final para entrega do projeto de expansão', '2024-02-25', '18:00', 'deadline', '550e8400-e29b-41d4-a716-446655440003'),
('550e8400-e29b-41d4-a716-446655440043', 'Reunião de alinhamento', 'Alinhar expectativas e próximos passos', '2024-02-18', '16:00', 'meeting', '550e8400-e29b-41d4-a716-446655440001');

-- Insert sample reports
INSERT INTO reports (id, title, description, type, data, client_id) VALUES
('550e8400-e29b-41d4-a716-446655440050', 'Relatório de Progresso Q1', 'Análise detalhada do progresso dos OKRs no primeiro trimestre', 'okr', '{"progress": 65, "completed_okrs": 2, "pending_okrs": 3, "metrics": {"revenue_growth": "18%", "new_clients": 35}}', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440051', 'Relatório de Tarefas', 'Status das tarefas e produtividade da equipe', 'task', '{"completed_tasks": 12, "pending_tasks": 8, "overdue_tasks": 2, "productivity_score": 85}', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440052', 'Relatório do Cliente', 'Análise completa do desempenho e satisfação', 'client', '{"satisfaction_score": 9.2, "retention_rate": "95%", "growth_rate": "22%", "issues_resolved": 15}', '550e8400-e29b-41d4-a716-446655440003');

-- Insert sample processes
INSERT INTO processes (id, name, description, steps, status, client_id) VALUES
('550e8400-e29b-41d4-a716-446655440060', 'Processo de Onboarding', 'Processo completo para integração de novos clientes', '[{"step": 1, "title": "Reunião inicial", "description": "Entender necessidades do cliente"}, {"step": 2, "title": "Proposta comercial", "description": "Elaborar proposta personalizada"}, {"step": 3, "title": "Contratação", "description": "Formalizar contrato"}, {"step": 4, "title": "Kick-off", "description": "Iniciar projeto"}]', 'active', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440061', 'Processo de Review Mensal', 'Processo para avaliação mensal de resultados', '[{"step": 1, "title": "Coleta de dados", "description": "Reunir métricas do mês"}, {"step": 2, "title": "Análise", "description": "Analisar performance"}, {"step": 3, "title": "Reunião de review", "description": "Apresentar resultados"}, {"step": 4, "title": "Plano de ação", "description": "Definir próximos passos"}]', 'active', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440062', 'Processo de Expansão', 'Processo para entrada em novos mercados', '[{"step": 1, "title": "Pesquisa de mercado", "description": "Analisar oportunidades"}, {"step": 2, "title": "Estratégia", "description": "Definir abordagem"}, {"step": 3, "title": "Execução", "description": "Implementar plano"}, {"step": 4, "title": "Monitoramento", "description": "Acompanhar resultados"}]', 'active', '550e8400-e29b-41d4-a716-446655440003');
