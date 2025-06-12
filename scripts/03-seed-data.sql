-- Insert sample admin user
INSERT INTO users (id, email, name, type) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'rodrigocastrolage@gmail.com', 'Rodrigo Castro', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample clients
INSERT INTO clients (id, name, email, username, password, company, phone) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'João Silva', 'joao@empresa.com', 'joao_silva', '$2b$10$encrypted_password_here', 'Empresa ABC', '+55 11 99999-9999'),
('550e8400-e29b-41d4-a716-446655440002', 'Maria Santos', 'maria@empresa.com', 'maria_santos', '$2b$10$encrypted_password_here', 'Empresa XYZ', '+55 11 88888-8888'),
('550e8400-e29b-41d4-a716-446655440003', 'Pedro Costa', 'pedro@empresa.com', 'pedro_costa', '$2b$10$encrypted_password_here', 'Empresa 123', '+55 11 77777-7777')
ON CONFLICT (email) DO NOTHING;

-- Insert corresponding user records for clients
INSERT INTO users (id, email, name, username, type) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'joao@empresa.com', 'João Silva', 'joao_silva', 'client'),
('550e8400-e29b-41d4-a716-446655440002', 'maria@empresa.com', 'Maria Santos', 'maria_santos', 'client'),
('550e8400-e29b-41d4-a716-446655440003', 'pedro@empresa.com', 'Pedro Costa', 'pedro_costa', 'client')
ON CONFLICT (email) DO NOTHING;

-- Insert sample OKRs
INSERT INTO okrs (id, client_id, title, description, quarter, year, status, progress, due_date, created_by) VALUES 
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Aumentar a satisfação do cliente', 'Melhorar a experiência do cliente através de diversos indicadores', 'Q1', 2024, 'active', 75, '2024-03-31', 'Ana Silva - Consultora'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Expandir base de clientes', 'Crescer a base de clientes e aumentar receita', 'Q1', 2024, 'active', 45, '2024-03-31', 'Carlos Santos - Diretor'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Melhorar eficiência operacional', 'Otimizar processos e reduzir custos operacionais', 'Q1', 2024, 'active', 25, '2024-03-31', 'Ana Silva - Consultora')
ON CONFLICT (id) DO NOTHING;

-- Insert sample key results
INSERT INTO key_results (okr_id, title, target_value, current_value, unit, status, progress) VALUES 
('660e8400-e29b-41d4-a716-446655440001', 'Alcançar NPS de 80 pontos', 80, 64, 'pontos', 'in_progress', 80),
('660e8400-e29b-41d4-a716-446655440001', 'Reduzir tempo de resposta para 2 horas', 2, 2.8, 'horas', 'at_risk', 70),
('660e8400-e29b-41d4-a716-446655440002', 'Adquirir 500 novos clientes', 500, 200, 'clientes', 'at_risk', 40),
('660e8400-e29b-41d4-a716-446655440002', 'Aumentar receita em 30%', 30, 15, '%', 'in_progress', 50),
('660e8400-e29b-41d4-a716-446655440003', 'Reduzir custos operacionais em 15%', 15, 4.5, '%', 'off_track', 30),
('660e8400-e29b-41d4-a716-446655440003', 'Automatizar 80% dos processos manuais', 80, 16, '%', 'off_track', 20);

-- Insert sample reports
INSERT INTO reports (client_id, title, description, content, type, status, sent_at, viewed_at, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Relatório Mensal - Janeiro 2024', 'Análise de performance e progresso dos OKRs do mês de janeiro', '# Relatório Mensal - Janeiro 2024

## Resumo Executivo
Este relatório apresenta o progresso dos seus OKRs durante o mês de janeiro de 2024...', 'monthly', 'viewed', '2024-01-26', '2024-01-27', 'Ana Silva - Consultora'),

('550e8400-e29b-41d4-a716-446655440001', 'Relatório de Projeto - Consultoria Estratégica', 'Relatório de progresso do projeto de consultoria estratégica', '# Relatório de Projeto - Consultoria Estratégica

## Status do Projeto
**Período**: Janeiro 2024...', 'project', 'viewed', '2024-01-21', '2024-01-22', 'Carlos Santos - Diretor');

-- Insert sample tasks
INSERT INTO tasks (client_id, title, description, status, priority, due_date) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Revisar OKRs do Q1', 'Analisar progresso e ajustar metas se necessário', 'pending', 'high', '2024-01-20'),
('550e8400-e29b-41d4-a716-446655440002', 'Preparar relatório mensal', 'Compilar dados e métricas do mês', 'completed', 'medium', '2024-01-15'),
('550e8400-e29b-41d4-a716-446655440001', 'Agendar reunião com equipe', 'Organizar reunião de alinhamento', 'pending', 'low', NULL);

-- Insert sample meetings
INSERT INTO meetings (client_id, title, description, date, time, duration, type, meeting_type, location, meeting_link, status, organizer) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Reunião de Briefing', 'Primeira reunião para entender necessidades e objetivos', '2024-01-15', '10:00', 60, 'consultation', 'online', NULL, 'https://meet.google.com/abc-defg-hij', 'confirmed', 'Ana Silva - Consultora'),
('550e8400-e29b-41d4-a716-446655440001', 'Apresentação da Estratégia', 'Apresentação da estratégia desenvolvida', '2024-01-22', '14:00', 90, 'review', 'presencial', 'Escritório da empresa - Sala de Reuniões 1', NULL, 'scheduled', 'Carlos Santos - Diretor'),
('550e8400-e29b-41d4-a716-446655440001', 'Acompanhamento Semanal', 'Reunião de acompanhamento do progresso', '2024-01-29', '15:30', 30, 'follow_up', 'telefone', NULL, NULL, 'scheduled', 'Ana Silva - Consultora');
