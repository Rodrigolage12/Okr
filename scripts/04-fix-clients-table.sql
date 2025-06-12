-- Verificar se a tabela clients existe e suas colunas
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'clients' 
ORDER BY ordinal_position;

-- Se a tabela não tiver a estrutura correta, vamos recriá-la
DROP TABLE IF EXISTS clients CASCADE;

-- Recriar a tabela clients com a estrutura correta
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recriar o trigger para updated_at
CREATE TRIGGER update_clients_updated_at 
  BEFORE UPDATE ON clients 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Inserir dados de exemplo
INSERT INTO clients (name, email, username, password, company, phone) VALUES
('João Silva', 'joao@empresa.com', 'joao_silva', '123456', 'Empresa ABC', '(11) 99999-1111'),
('Maria Santos', 'maria@empresa.com', 'maria_santos', '123456', 'Empresa XYZ', '(11) 99999-2222'),
('Pedro Costa', 'pedro@empresa.com', 'pedro_costa', '123456', 'Empresa 123', '(11) 99999-3333');

-- Verificar se os dados foram inseridos
SELECT * FROM clients;
