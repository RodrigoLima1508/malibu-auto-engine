import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Wrench, Palette, Sparkles, Settings } from "lucide-react";
import OrcamentoForm from "@/components/OrcamentoForm";

const Index = () => {
  const servicos = [
    {
      icon: <Palette className="w-12 h-12 text-primary" />,
      title: "Pintura Automotiva",
      description: "Pintura completa com qualidade profissional"
    },
    {
      icon: <Wrench className="w-12 h-12 text-primary" />,
      title: "Funilaria",
      description: "Reparos e restauração de lataria"
    },
    {
      icon: <Sparkles className="w-12 h-12 text-primary" />,
      title: "Polimento",
      description: "Deixe seu carro com brilho renovado"
    },
    {
      icon: <Settings className="w-12 h-12 text-primary" />,
      title: "Personalização",
      description: "Customização e acabamentos especiais"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">Malibu Automotiva</h1>
            <Link to="/admin">
              <Button variant="outline">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Serviços Automotivos de Excelência
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Especialistas em pintura, funilaria, polimento e personalização. 
            Transformamos seu veículo com qualidade e dedicação.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {servicos.map((servico, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {servico.icon}
                  </div>
                  <CardTitle className="text-xl">{servico.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{servico.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Solicite seu Orçamento</h3>
            <p className="text-xl text-muted-foreground">
              Preencha o formulário e entraremos em contato
            </p>
          </div>
          <OrcamentoForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Malibu Automotiva. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
