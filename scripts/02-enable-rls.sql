-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE okrs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE processes ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text OR EXISTS (
        SELECT 1 FROM users WHERE id::text = auth.uid()::text AND user_type = 'admin'
    ));

CREATE POLICY "Admins can manage all users" ON users
    FOR ALL USING (EXISTS (
        SELECT 1 FROM users WHERE id::text = auth.uid()::text AND user_type = 'admin'
    ));

-- Clients policies
CREATE POLICY "Admins can manage all clients" ON clients
    FOR ALL USING (EXISTS (
        SELECT 1 FROM users WHERE id::text = auth.uid()::text AND user_type = 'admin'
    ));

CREATE POLICY "Clients can view their own data" ON clients
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM users WHERE id::text = auth.uid()::text AND client_id = clients.id
    ));

-- OKRs policies
CREATE POLICY "Admins can manage all OKRs" ON okrs
    FOR ALL USING (EXISTS (
        SELECT 1 FROM users WHERE id::text = auth.uid()::text AND user_type = 'admin'
    ));

CREATE POLICY "Clients can view their own OKRs" ON okrs
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM users WHERE id::text = auth.uid()::text AND client_id = okrs.client_id
    ));

-- Tasks policies
CREATE POLICY "Admins can manage all tasks" ON tasks
    FOR ALL USING (EXISTS (
        SELECT 1 FROM users WHERE id::text = auth.uid()::text AND user_type = 'admin'
    ));

CREATE POLICY "Users can view their assigned tasks" ON tasks
    FOR SELECT USING (assigned_to::text = auth.uid()::text);

CREATE POLICY "Clients can view their tasks" ON tasks
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM users WHERE id::text = auth.uid()::text AND client_id = tasks.client_id
    ));

-- Events policies
CREATE POLICY "Admins can manage all events" ON events
    FOR ALL USING (EXISTS (
        SELECT 1 FROM users WHERE id::text = auth.uid()::text AND user_type = 'admin'
    ));

CREATE POLICY "Clients can view their events" ON events
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM users WHERE id::text = auth.uid()::text AND client_id = events.client_id
    ));

-- Reports policies
CREATE POLICY "Admins can manage all reports" ON reports
    FOR ALL USING (EXISTS (
        SELECT 1 FROM users WHERE id::text = auth.uid()::text AND user_type = 'admin'
    ));

CREATE POLICY "Clients can view their reports" ON reports
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM users WHERE id::text = auth.uid()::text AND client_id = reports.client_id
    ));

-- Processes policies
CREATE POLICY "Admins can manage all processes" ON processes
    FOR ALL USING (EXISTS (
        SELECT 1 FROM users WHERE id::text = auth.uid()::text AND user_type = 'admin'
    ));

CREATE POLICY "Clients can view their processes" ON processes
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM users WHERE id::text = auth.uid()::text AND client_id = processes.client_id
    ));
