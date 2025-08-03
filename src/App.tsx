import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
// Menu Estático
let ultimaPosicaoScroll = window.scrollY;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const posicaoAtualScroll = window.scrollY;

    if (posicaoAtualScroll > ultimaPosicaoScroll) {
        // Rolando para baixo
        header.classList.add('hide');
        header.classList.remove('show');
    } else {
        // Rolando para cima
        header.classList.remove('hide');
        header.classList.add('show');
    }

    ultimaPosicaoScroll = posicaoAtualScroll;
});

// Botão "Voltar ao Topo"
const btnVoltarTopo = document.getElementById('voltarTopo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnVoltarTopo.style.display = 'block';
    } else {
        btnVoltarTopo.style.display = 'none';
    }
});

btnVoltarTopo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Carrossel de Referências
document.addEventListener('DOMContentLoaded', function() {
    const carrossel = document.querySelector('.carrossel');
    const btnAnterior = document.querySelector('.carrossel-btn.anterior');
    const btnProximo = document.querySelector('.carrossel-btn.proximo');
    const itens = document.querySelectorAll('.carrossel-item');
    let index = 0;

    function mostrarItem(indice) {
        const offset = -indice * 100;
        carrossel.style.transform = `translateX(${offset}%)`;
    }

    btnAnterior.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : itens.length - 1;
        mostrarItem(index);
    });

    btnProximo.addEventListener('click', () => {
        index = (index < itens.length - 1) ? index + 1 : 0;
        mostrarItem(index);
    });

    // Intervalo automático para o carrossel
    setInterval(() => {
        index = (index < itens.length - 1) ? index + 1 : 0;
        mostrarItem(index);
    }, 5000); // Muda a cada 5 segundos

    // Inicializa o carrossel
    mostrarItem(index);
});
