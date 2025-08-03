import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { usuario, senha } = await req.json();

    if (!usuario || !senha) {
      return new Response(
        JSON.stringify({ success: false, message: 'Usuário e senha são obrigatórios' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check admin credentials with bcrypt comparison
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, usuario')
      .eq('usuario', usuario)
      .single();

    if (error || !admin) {
      console.log('Admin not found:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Credenciais inválidas' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // For simplicity, we'll use the verify_admin_credentials function
    // In a real app, you'd use bcrypt to compare hashed passwords
    const { data: verifyResult, error: verifyError } = await supabase
      .rpc('verify_admin_credentials', {
        p_usuario: usuario,
        p_senha: senha // In production, hash this with bcrypt first
      });

    if (verifyError || !verifyResult) {
      console.log('Verification failed:', verifyError);
      return new Response(
        JSON.stringify({ success: false, message: 'Credenciais inválidas' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate a simple token (in production, use JWT)
    const token = btoa(`${admin.id}:${Date.now()}`);

    return new Response(
      JSON.stringify({
        success: true,
        token,
        admin: { id: admin.id, usuario: admin.usuario }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Erro interno do servidor' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});