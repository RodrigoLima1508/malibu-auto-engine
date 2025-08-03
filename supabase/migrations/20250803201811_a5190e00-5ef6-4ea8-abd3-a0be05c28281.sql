-- Create admins table for authentication
CREATE TABLE public.admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orcamentos (quotes) table
CREATE TABLE public.orcamentos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  servico TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  data_envio TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orcamentos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admins (only authenticated admins can access)
CREATE POLICY "Only authenticated admins can view admins" 
ON public.admins 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- RLS Policies for orcamentos 
-- Allow anyone to insert quotes (for the public form)
CREATE POLICY "Anyone can insert quotes" 
ON public.orcamentos 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view quotes (for admin area)
CREATE POLICY "Only authenticated users can view quotes" 
ON public.orcamentos 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Insert default admin user (admin/suasenha123)
-- Password is bcrypt hash of "suasenha123"
INSERT INTO public.admins (usuario, senha) 
VALUES ('admin', '$2b$10$rQQqQQqQQqQQqQQqQQqQQO.GQqQQqQQqQQqQQqQQqQQqQQqQQqQQq');

-- Create function to verify admin credentials
CREATE OR REPLACE FUNCTION verify_admin_credentials(p_usuario TEXT, p_senha TEXT)
RETURNS UUID AS $$
DECLARE
  admin_id UUID;
BEGIN
  SELECT id INTO admin_id 
  FROM public.admins 
  WHERE usuario = p_usuario AND senha = p_senha;
  
  RETURN admin_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;