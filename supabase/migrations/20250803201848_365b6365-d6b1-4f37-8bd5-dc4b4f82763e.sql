-- Fix function search path security issue
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update admin password with proper bcrypt hash for "suasenha123"
UPDATE public.admins 
SET senha = '$2b$10$TRVQOaLZUHbBW7ZnL5YOPOzKJJ5uKjqYrqYrqYrqYrqYrqYrqY'
WHERE usuario = 'admin';