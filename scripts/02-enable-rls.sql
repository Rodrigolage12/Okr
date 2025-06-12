-- Enable Row Level Security (RLS) on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE okrs ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Create RLS policies for clients table (admin can see all, clients can see their own)
CREATE POLICY "Admins can view all clients" ON clients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.type = 'admin'
    )
  );

CREATE POLICY "Clients can view their own data" ON clients
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can manage clients" ON clients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.type = 'admin'
    )
  );

-- Create RLS policies for OKRs
CREATE POLICY "Admins can view all OKRs" ON okrs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.type = 'admin'
    )
  );

CREATE POLICY "Clients can view their own OKRs" ON okrs
  FOR SELECT USING (client_id::text = auth.uid()::text);

CREATE POLICY "Admins can manage OKRs" ON okrs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.type = 'admin'
    )
  );

-- Create RLS policies for key_results
CREATE POLICY "Users can view key results through OKRs" ON key_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM okrs 
      WHERE okrs.id = key_results.okr_id 
      AND (
        okrs.client_id::text = auth.uid()::text 
        OR EXISTS (
          SELECT 1 FROM users 
          WHERE users.id::text = auth.uid()::text 
          AND users.type = 'admin'
        )
      )
    )
  );

CREATE POLICY "Admins can manage key results" ON key_results
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.type = 'admin'
    )
  );

-- Create RLS policies for reports
CREATE POLICY "Admins can view all reports" ON reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.type = 'admin'
    )
  );

CREATE POLICY "Clients can view their own reports" ON reports
  FOR SELECT USING (client_id::text = auth.uid()::text);

CREATE POLICY "Admins can manage reports" ON reports
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.type = 'admin'
    )
  );

-- Create RLS policies for tasks
CREATE POLICY "Admins can view all tasks" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.type = 'admin'
    )
  );

CREATE POLICY "Clients can view their own tasks" ON tasks
  FOR SELECT USING (client_id::text = auth.uid()::text OR client_id IS NULL);

CREATE POLICY "Admins can manage tasks" ON tasks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.type = 'admin'
    )
  );

CREATE POLICY "Clients can manage their own tasks" ON tasks
  FOR ALL USING (client_id::text = auth.uid()::text OR client_id IS NULL);

-- Create RLS policies for meetings
CREATE POLICY "Admins can view all meetings" ON meetings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.type = 'admin'
    )
  );

CREATE POLICY "Clients can view their own meetings" ON meetings
  FOR SELECT USING (client_id::text = auth.uid()::text);

CREATE POLICY "Admins can manage meetings" ON meetings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.type = 'admin'
    )
  );
