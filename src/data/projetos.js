// ─────────────────────────────────────────────────────────────
//  PROJETOS DA SHINKA
//  Este é o ÚNICO arquivo que você precisa editar para mudar o portfólio.
//
//  • Os projetos abaixo são EXEMPLOS. Troque pelos trabalhos reais da equipe.
//  • Enquanto um projeto tiver `exemplo: true`, ele aparece no site com a
//    etiqueta "EXEMPLO". Ao colocar os dados reais, apague essa linha.
//  • `destaque: true` → aparece na seção "Projetos" da página inicial (use 3).
//  • `imagem` → opcional. Coloque o print/foto em /public/cases/ e escreva
//    "/cases/nome-do-arquivo.jpg". Sem imagem, o site gera uma capa automática
//    no estilo da SHINKA de acordo com o `tipo`.
//  • `tipo` precisa ser um destes: "landing" | "sistemas" | "integracao".
//  • `slug` vira o link do case: seusite.com/projetos/#slug
//  • `url` → site no ar (opcional). Aparece no case como "Abrir o site".
// ─────────────────────────────────────────────────────────────

export const TIPOS = {
  landing: "Landing Pages",
  sistemas: "Sistemas sob medida",
  integracao: "Integração",
};

export const PROJETOS = [
  {
    slug: "geekdom",
    titulo: "GeekDom",
    segmento: "Catálogo digital",
    ano: "2026",
    tipo: "landing",
    resumo: "Catálogo digital para uma loja geek: vitrine de produtos, identidade da marca e caminho claro para o pedido.",
    problema:
      "A loja precisava de um lugar na web para mostrar o catálogo sem depender só de post no Instagram. O cliente tinha que achar o produto e pedir sem se perder.",
    solucao:
      "Uma landing/catálogo com vitrine, navegação simples e visual da GeekDom. O visitante vê o que tem e segue para o pedido.",
    resultados: [
      { valor: "1", label: "catálogo digital no ar" },
      { valor: "24/7", label: "vitrine aberta para o cliente" },
    ],
    stack: ["Landing page", "Catálogo", "Vercel"],
    url: "https://geekdom-beta.vercel.app/",
    imagem: "/cases/geekdom.jpg",
    destaque: true,
  },
  {
    slug: "clara-mendes",
    titulo: "Clara Mendes",
    segmento: "Nutrição",
    ano: "2026",
    tipo: "landing",
    resumo: "Landing page para leitura metabólica: explica o serviço, constrói confiança e chama a paciente para o próximo passo.",
    problema:
      "O serviço existia, mas não tinha uma página que explicasse a leitura metabólica com clareza e levasse a pessoa até o contato.",
    solucao:
      "Uma landing objetiva com proposta, autoridade e um caminho único para agendar ou falar com a nutricionista.",
    resultados: [
      { valor: "1", label: "página de captura no ar" },
      { valor: "1", label: "caminho até o contato" },
    ],
    stack: ["Landing page", "Nutrição", "Vercel"],
    url: "https://projeto-lpnutricao.vercel.app/",
    imagem: "/cases/clara-mendes.png",
    destaque: true,
  },
  {
    slug: "painel-de-estoque",
    titulo: "Painel de estoque em tempo real",
    segmento: "Loja de materiais de construção",
    ano: "2026",
    tipo: "sistemas",
    resumo: "Três planilhas de estoque que nunca batiam viraram um sistema único, com alerta de reposição.",
    problema:
      "Loja e depósito controlavam o estoque em planilhas diferentes. Vendiam produto que não existia e compravam o que já tinha sobrando.",
    solucao:
      "Um sistema simples de entrada, saída e transferência, com leitura por código de barras e alerta automático quando um item chega no mínimo.",
    resultados: [
      { valor: "1", label: "fonte da verdade no lugar de 3 planilhas" },
      { valor: "−65%", label: "de ruptura de estoque" },
      { valor: "12h", label: "economizadas por semana em conferência" },
    ],
    stack: ["Sistema web", "Código de barras", "Alertas"],
    imagem: null,
    destaque: true,
    exemplo: true,
  },
  {
    slug: "erp-e-financeiro",
    titulo: "ERP conversando com o financeiro",
    segmento: "Indústria de embalagens",
    ano: "2025",
    tipo: "integracao",
    resumo: "Notas, boletos e contas a receber sincronizados sozinhos entre o ERP e a planilha do financeiro.",
    problema:
      "Toda manhã alguém exportava relatório do ERP, colava na planilha do financeiro e conferia linha por linha. Um erro de digitação virava cobrança errada.",
    solucao:
      "Uma integração que busca as notas e títulos no ERP, atualiza a planilha e avisa o financeiro por e-mail quando algo foge do padrão.",
    resultados: [
      { valor: "2h", label: "por dia devolvidas ao time" },
      { valor: "0", label: "copia e cola manual" },
      { valor: "D+0", label: "contas a receber sempre atualizadas" },
    ],
    stack: ["API do ERP", "Google Sheets", "E-mail"],
    imagem: null,
    destaque: true,
    exemplo: true,
  },
  {
    slug: "confirmacao-de-consultas",
    titulo: "Confirmação automática de consultas",
    segmento: "Clínica odontológica",
    ano: "2025",
    tipo: "integracao",
    resumo: "A agenda da clínica passou a confirmar, remarcar e lembrar pacientes sem a recepção ligar para ninguém.",
    problema:
      "A recepção passava a tarde ligando para confirmar a agenda do dia seguinte. Mesmo assim, as faltas deixavam buracos na agenda.",
    solucao:
      "Integração entre a agenda e o WhatsApp: o paciente confirma ou remarca respondendo a mensagem, e a vaga liberada vai para a lista de espera.",
    resultados: [
      { valor: "−40%", label: "de faltas" },
      { valor: "3h", label: "por dia livres na recepção" },
    ],
    stack: ["Agenda", "WhatsApp API", "Lista de espera"],
    imagem: null,
    destaque: false,
    exemplo: true,
  },
  {
    slug: "ordens-de-servico",
    titulo: "Sistema de ordens de serviço",
    segmento: "Assistência técnica",
    ano: "2025",
    tipo: "sistemas",
    resumo: "Do papel na bancada para um sistema em que o cliente acompanha o conserto pelo celular.",
    problema:
      "As ordens de serviço eram fichas de papel. O cliente ligava várias vezes para saber do aparelho e o técnico parava o conserto para atender.",
    solucao:
      "Um sistema de OS com etapas, fotos do aparelho e aviso automático ao cliente a cada mudança de status.",
    resultados: [
      { valor: "−70%", label: "de ligações perguntando status" },
      { valor: "100%", label: "das OS com histórico e fotos" },
    ],
    stack: ["Sistema web", "Notificações", "Fotos"],
    imagem: null,
    destaque: false,
    exemplo: true,
  },
];

export const DESTAQUES = PROJETOS.filter((p) => p.destaque).slice(0, 3);

export function numeroDo(projeto) {
  return String(PROJETOS.indexOf(projeto) + 1).padStart(2, "0");
}
