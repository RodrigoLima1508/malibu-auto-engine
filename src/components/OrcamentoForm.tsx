import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function OrcamentoForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    servico: "",
    mensagem: ""
  });
  const { toast } = useToast();

  const servicos = [
    "Pintura Completa",
    "Funilaria",
    "Polimento",
    "Personalização",
    "Restauração",
    "Outro"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('orcamentos')
        .insert([{
          nome: formData.nome,
          telefone: formData.telefone,
          servico: formData.servico,
          mensagem: formData.mensagem
        }]);

      if (error) throw error;

      toast({
        title: "Orçamento enviado!",
        description: "Entraremos em contato em breve.",
      });

      setFormData({
        nome: "",
        telefone: "",
        servico: "",
        mensagem: ""
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar orçamento",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Solicitar Orçamento</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              type="tel"
              value={formData.telefone}
              onChange={(e) => handleInputChange("telefone", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="servico">Serviço</Label>
            <Select
              value={formData.servico}
              onValueChange={(value) => handleInputChange("servico", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um serviço" />
              </SelectTrigger>
              <SelectContent>
                {servicos.map((servico) => (
                  <SelectItem key={servico} value={servico}>
                    {servico}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="mensagem">Mensagem</Label>
            <Textarea
              id="mensagem"
              value={formData.mensagem}
              onChange={(e) => handleInputChange("mensagem", e.target.value)}
              placeholder="Descreva detalhes do serviço desejado..."
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar Orçamento"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}