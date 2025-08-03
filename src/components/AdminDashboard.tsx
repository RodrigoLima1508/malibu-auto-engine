import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogOut, RefreshCw } from "lucide-react";

interface Orcamento {
  id: string;
  nome: string;
  telefone: string;
  servico: string;
  mensagem: string;
  data_envio: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchOrcamentos = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-orcamentos', {
        headers: {
          'x-auth-token': localStorage.getItem('adminToken') || ''
        }
      });

      if (error) throw error;

      if (data.success) {
        setOrcamentos(data.orcamentos);
      } else {
        toast({
          title: "Erro ao carregar orçamentos",
          description: data.message || "Erro desconhecido",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao carregar orçamentos",
        description: "Erro interno do servidor.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrcamentos();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    onLogout();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Painel Administrativo - Orçamentos</CardTitle>
            <div className="flex gap-2">
              <Button 
                onClick={fetchOrcamentos}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {isLoading ? "Carregando..." : "Atualizar"}
              </Button>
              <Button 
                onClick={handleLogout}
                variant="destructive"
                size="sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {orcamentos.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhum orçamento encontrado.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Mensagem</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orcamentos.map((orcamento) => (
                    <TableRow key={orcamento.id}>
                      <TableCell>{orcamento.nome}</TableCell>
                      <TableCell>{orcamento.telefone}</TableCell>
                      <TableCell>{orcamento.servico}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {orcamento.mensagem}
                      </TableCell>
                      <TableCell>{formatDate(orcamento.data_envio)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}