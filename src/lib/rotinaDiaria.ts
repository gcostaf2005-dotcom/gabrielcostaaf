// Rotina diária — Gabriel v7
// Dias úteis (Seg/Ter/Qua/Sex): manhã = acordar + gratidão + treino + leitura,
//   8h-18h = bloco comercial fixo (follow-ups → cold calls CNDA → conteúdo →
//   métricas → almoço → pendências ads → cold calls Vexum), noite = faculdade.
// Quinta: BNI 6h-10h (sem treino) + follow-up BNI, depois bloco comercial à tarde.
// Sábado: estudo profundo de Claude Code (5h+4h) + análise de métricas.
// Domingo: estudo Claude Code de manhã + tarde de YouTube (gravar/editar 3 vídeos)
//   e planejamento dos reels da semana seguinte.
// Treino 4x/sem (Seg/Ter/Qua/Sex) — Quinta BNI, fim de semana estudo.
// "A vida é feita de constantes desequilíbrios"

export type Categoria =
  | "ritual"
  | "academia"
  | "leitura"
  | "estudos"
  | "trabalho"
  | "outreach"
  | "followup"
  | "conteudo"
  | "youtube"
  | "edicao"
  | "metricas"
  | "ads"
  | "faculdade"
  | "deslocamento"
  | "refeicao"
  | "bni"
  | "revisao"
  | "descanso"
  | "sono";

export type BlocoDia = {
  inicio: string;
  fim: string;
  titulo: string;
  categoria: Categoria;
  conselheiro: string;
  principio: string;
  detalhes?: string;
};

export type TemaDia = {
  nome: string;
  emoji: string;
  cor: string;
};

export const TEMA_DIA: Record<number, TemaDia> = {
  1: { nome: "Comercial — Follow-up & Cold", emoji: "💼", cor: "#5b8def" },
  2: { nome: "Comercial — Follow-up & Cold", emoji: "💼", cor: "#5b8def" },
  3: { nome: "Comercial — Follow-up & Cold", emoji: "💼", cor: "#5b8def" },
  4: { nome: "BNI + Comercial", emoji: "🤝", cor: "#22c55e" },
  5: { nome: "Comercial — Follow-up & Cold", emoji: "💼", cor: "#5b8def" },
  6: { nome: "Estudos Claude Code", emoji: "🤖", cor: "#ef4444" },
  0: { nome: "YouTube + Planejamento", emoji: "🎥", cor: "#8b5cf6" },
};

export const CATEGORIA_COR: Record<Categoria, string> = {
  ritual: "#8b5cf6",
  academia: "#ef4444",
  leitura: "#22c55e",
  estudos: "#22c55e",
  trabalho: "#5b8def",
  outreach: "#3b82f6",
  followup: "#06b6d4",
  conteudo: "#a855f7",
  youtube: "#ff0000",
  edicao: "#f59e0b",
  metricas: "#0ea5e9",
  ads: "#f97316",
  faculdade: "#06b6d4",
  deslocamento: "#737373",
  refeicao: "#84cc16",
  bni: "#22c55e",
  revisao: "#06b6d4",
  descanso: "#737373",
  sono: "#1f2937",
};

export const CATEGORIA_LABEL: Record<Categoria, string> = {
  ritual: "Ritual",
  academia: "Academia",
  leitura: "Leitura",
  estudos: "Estudos",
  trabalho: "Trabalho",
  outreach: "Cold Calls",
  followup: "Follow-up",
  conteudo: "Conteúdo",
  youtube: "YouTube",
  edicao: "Edição",
  metricas: "Métricas",
  ads: "Ads",
  faculdade: "Faculdade",
  deslocamento: "Deslocamento",
  refeicao: "Refeição",
  bni: "BNI",
  revisao: "Revisão",
  descanso: "Pausa",
  sono: "Sono",
};

// ===== MANHÃ PADRÃO (Seg/Ter/Qua/Sex — acordar + gratidão + treino + leitura) =====
const MANHA_PADRAO: BlocoDia[] = [
  {
    inicio: "04:45",
    fim: "05:00",
    titulo: "Acordar + gratidão + ritual rápido",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Sem snooze. Começa o dia agradecendo, antes de qualquer cobrança.",
    detalhes:
      "Água 500ml. 3 gratidões (mental ou no journal). Roupa de treino. SEM celular nos primeiros 30min.",
  },
  {
    inicio: "05:00",
    fim: "06:30",
    titulo: "Academia (podcast/audiobook OK)",
    categoria: "academia",
    conselheiro: "Marco Aurélio",
    principio: "Disciplina física antes de qualquer trabalho mental.",
    detalhes: "1h treino + deslocamento.",
  },
  {
    inicio: "06:30",
    fim: "07:00",
    titulo: "Banho + café + Newsletter IA (15min)",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Café COM newsletter IA = aprendizado consciente, leve.",
    detalhes: "TLDR AI ou Ben's Bites no celular enquanto come. Anota 1 insight aplicável.",
  },
  {
    inicio: "07:00",
    fim: "07:30",
    titulo: "Leitura focada — LIVRO FÍSICO",
    categoria: "leitura",
    conselheiro: "Warren Buffett",
    principio: "30min focado vale mais que 2h disperso.",
  },
  {
    inicio: "07:30",
    fim: "08:00",
    titulo: "Deslocamento pro escritório",
    categoria: "deslocamento",
    conselheiro: "Diógenes",
    principio: "Mente em movimento. Podcast IA ou silêncio.",
  },
];

// ===== BLOCO COMERCIAL (Seg/Ter/Qua/Sex — 8h às 18h) =====
const COMERCIAL_DIA: BlocoDia[] = [
  {
    inicio: "08:00",
    fim: "08:30",
    titulo: "🔁 Follow-ups CNDA (30min)",
    categoria: "followup",
    conselheiro: "Alex Hormozi",
    principio: "Abre o dia no 'lembrei de você'. Follow-up vale mais que cold novo.",
    detalhes: "Leads quentes CNDA: responder, agendar calls, mandar materiais. Zero msg nova aqui.",
  },
  {
    inicio: "08:30",
    fim: "09:00",
    titulo: "🔁 Follow-ups Vexum (30min)",
    categoria: "followup",
    conselheiro: "Alex Hormozi",
    principio: "Mesmo ritual, agora no pipeline jurídico.",
    detalhes: "Leads quentes Vexum (escritórios): retomar conversas, agendar demos, enviar propostas.",
  },
  {
    inicio: "09:00",
    fim: "10:30",
    titulo: "📞 Cold Calls CNDA (1h30)",
    categoria: "outreach",
    conselheiro: "Alex Hormozi",
    principio: "Manhã = energia máxima pra ligação fria. Volume gera reunião.",
    detalhes: "Incorporadoras (foco Nordeste/Recife) + ICP serviço. Meta de ligações conectadas no bloco.",
  },
  {
    inicio: "10:30",
    fim: "11:30",
    titulo: "🎬 Criação de conteúdo (Sinapse · Vexum · CNDA)",
    categoria: "conteudo",
    conselheiro: "Hormozi",
    principio: "Conteúdo todo dia alimenta as 3 marcas. Bateladar quando possível.",
    detalhes: "Roteiros/reels/posts. Rotaciona foco entre Sinapse, Vexum e CNDA conforme a semana.",
  },
  {
    inicio: "11:30",
    fim: "12:30",
    titulo: "📊 Métricas de tráfego — CNDA + Vexum",
    categoria: "metricas",
    conselheiro: "Ray Dalio",
    principio: "O que não se mede, não se gerencia. Olhar números antes de almoçar.",
    detalhes: "CPL, CTR, gasto, leads por campanha. Anota o que vai virar ação no bloco de ads à tarde.",
  },
  {
    inicio: "12:30",
    fim: "13:00",
    titulo: "Almoço",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Pausa real. Sem tela.",
  },
  {
    inicio: "13:00",
    fim: "15:00",
    titulo: "🛠️ Pendências de Ads — CNDA + Vexum (2h)",
    categoria: "ads",
    conselheiro: "Bezos",
    principio: "Agir nos dados da manhã: ajustar campanhas, criativos, públicos.",
    detalhes: "Pausar o que não performa, escalar o que converte, subir criativos novos, corrigir setups.",
  },
  {
    inicio: "15:00",
    fim: "18:00",
    titulo: "📞 Cold Calls Vexum (3h)",
    categoria: "outreach",
    conselheiro: "Alex Hormozi",
    principio: "Bloco mais longo do dia = mais conversas com escritórios. Volume e consistência.",
    detalhes: "Escritórios de advocacia. Ticket R$3-4k/mês recorrente. Anota cada lead e próximo passo.",
  },
];

// ===== NOITE PADRÃO (Seg-Sex — jantar + faculdade) =====
const NOITE_PADRAO: BlocoDia[] = [
  {
    inicio: "18:00",
    fim: "18:30",
    titulo: "Jantar rápido + deslocamento pra faculdade",
    categoria: "refeicao",
    conselheiro: "Epicuro",
    principio: "Come antes da aula pra não perder energia. Faculdade começa 18h — jantar é no caminho.",
  },
  {
    inicio: "18:30",
    fim: "22:00",
    titulo: "Faculdade",
    categoria: "faculdade",
    conselheiro: "Aristóteles",
    principio: "Excelência é hábito. Presença plena, mesmo cansado.",
  },
  {
    inicio: "22:10",
    fim: "22:30",
    titulo: "Volta + wind down (SEM TELA)",
    categoria: "ritual",
    conselheiro: "Matthew Walker",
    principio: "Wind down de 20min é não-negociável.",
    detalhes: "Journaling 3min. Luzes baixas.",
  },
  {
    inicio: "22:30",
    fim: "04:45",
    titulo: "Sono (6h15)",
    categoria: "sono",
    conselheiro: "Jeff Bezos",
    principio: "Piso aceitável. Compensa no fim de semana.",
  },
];

// ===== SEGUNDA =====
export const ROTINA_SEGUNDA: BlocoDia[] = [
  ...MANHA_PADRAO,
  ...COMERCIAL_DIA,
  ...NOITE_PADRAO,
];

// ===== TERÇA =====
export const ROTINA_TERCA: BlocoDia[] = [
  ...MANHA_PADRAO,
  ...COMERCIAL_DIA,
  ...NOITE_PADRAO,
];

// ===== QUARTA =====
export const ROTINA_QUARTA: BlocoDia[] = [
  ...MANHA_PADRAO,
  ...COMERCIAL_DIA,
  ...NOITE_PADRAO,
];

// ===== QUINTA — BNI 6h-10h · sem treino · comercial à tarde =====
export const ROTINA_QUINTA: BlocoDia[] = [
  {
    inicio: "04:45",
    fim: "05:00",
    titulo: "Acordar + gratidão — dia de BNI (sem academia hoje)",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Descanso de treino. 3 gratidões e mente afiada pro BNI.",
    detalhes: "Roupa social. Revisa pitch 30s.",
  },
  {
    inicio: "05:00",
    fim: "05:30",
    titulo: "Leitura focada — LIVRO FÍSICO (30min)",
    categoria: "leitura",
    conselheiro: "Buffett",
    principio: "Sem academia, sobra leitura tranquila.",
  },
  {
    inicio: "05:30",
    fim: "05:50",
    titulo: "Banho + café leve + Newsletter IA",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Café leve. Vai comer no BNI.",
  },
  {
    inicio: "05:50",
    fim: "06:00",
    titulo: "Deslocamento pro BNI",
    categoria: "deslocamento",
    conselheiro: "Diógenes",
    principio: "Revisa pitch mental + 1 indicação que vai pedir.",
  },
  {
    inicio: "06:00",
    fim: "10:00",
    titulo: "🤝 BNI (4h completas)",
    categoria: "bni",
    conselheiro: "Hormozi",
    principio: "Bloco LONGO. Networking + pitch + ouvir todos + pedir indicações cirúrgicas.",
    detalhes:
      "Pitch 30s afiado. Anota TODO negócio. Conversas paralelas valem mais que evento estruturado.",
  },
  {
    inicio: "10:00",
    fim: "10:30",
    titulo: "Deslocamento pro escritório",
    categoria: "deslocamento",
    conselheiro: "Diógenes",
    principio: "Follow-up mental dos contatos BNI.",
  },
  {
    inicio: "10:30",
    fim: "11:30",
    titulo: "🤝 Follow-up BNI + CNDA/Vexum (intensivo)",
    categoria: "followup",
    conselheiro: "Hormozi",
    principio: "Follow-up BNI no MESMO DIA = ouro. Dia seguinte perde 70%.",
    detalhes:
      "WhatsApp pros membros relevantes + leads quentes CNDA/Vexum. Agenda calls, manda materiais, convida pra cafézinho.",
  },
  {
    inicio: "11:30",
    fim: "12:30",
    titulo: "📊 Métricas de tráfego — CNDA + Vexum",
    categoria: "metricas",
    conselheiro: "Ray Dalio",
    principio: "Mesmo na quinta os números não esperam.",
    detalhes: "CPL, CTR, gasto, leads. Anota o que vira ação no bloco de ads.",
  },
  {
    inicio: "12:30",
    fim: "13:00",
    titulo: "Almoço",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Pausa real.",
  },
  {
    inicio: "13:00",
    fim: "15:00",
    titulo: "🛠️ Pendências de Ads — CNDA + Vexum (2h)",
    categoria: "ads",
    conselheiro: "Bezos",
    principio: "Agir nos dados: ajustar campanhas, criativos, públicos.",
    detalhes: "Pausar o que não performa, escalar o que converte, subir criativos novos.",
  },
  {
    inicio: "15:00",
    fim: "18:00",
    titulo: "📞 Cold Calls Vexum (3h)",
    categoria: "outreach",
    conselheiro: "Alex Hormozi",
    principio: "Mesmo após BNI, a tarde de Vexum é sagrada. Volume gera reunião.",
    detalhes: "Escritórios de advocacia. Anota cada lead e próximo passo.",
  },
  ...NOITE_PADRAO,
];

// ===== SEXTA =====
export const ROTINA_SEXTA: BlocoDia[] = [
  ...MANHA_PADRAO,
  ...COMERCIAL_DIA,
  ...NOITE_PADRAO,
];

// ===== SÁBADO — Estudo profundo de Claude Code + métricas =====
export const ROTINA_SABADO: BlocoDia[] = [
  {
    inicio: "05:30",
    fim: "05:45",
    titulo: "Acordar + gratidão",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Fim de semana também tem hora de acordar. 3 gratidões.",
    detalhes: "Água. Sem snooze. Lembrete: vou mandar mensagens de outreach ao longo do dia (8h-18h).",
  },
  {
    inicio: "05:45",
    fim: "06:15",
    titulo: "Café da manhã",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Café tranquilo, sem pressa de fim de semana.",
  },
  {
    inicio: "06:15",
    fim: "07:00",
    titulo: "Leitura — LIVRO FÍSICO (45min)",
    categoria: "leitura",
    conselheiro: "Bill Gates",
    principio: "Aquece a mente antes do estudo profundo.",
  },
  {
    inicio: "07:00",
    fim: "12:00",
    titulo: "🤖 ESTUDO Claude Code PROFUNDO (5h)",
    categoria: "estudos",
    conselheiro: "Naval Ravikant",
    principio: "Bloco SAGRADO. Estudo ATIVO: docs, exercícios, construir algo real com Claude Code.",
    detalhes:
      "Mãos na massa: agentes, skills, workflows, MCP. Constrói algo aplicável às empresas. Mantém mensagens de outreach rodando em paralelo (8h-18h).",
  },
  {
    inicio: "12:00",
    fim: "12:30",
    titulo: "Almoço",
    categoria: "refeicao",
    conselheiro: "Epicuro",
    principio: "Pausa real.",
  },
  {
    inicio: "12:30",
    fim: "14:00",
    titulo: "📊 Análise de métricas de tráfego — CNDA + Vexum (1h30)",
    categoria: "metricas",
    conselheiro: "Ray Dalio",
    principio: "Revisar a semana de tráfego com calma. Visão de dono, não de operador.",
    detalhes:
      "CPL, CTR, gasto, leads e conversões da semana nas 2 contas. Define ajustes pra segunda. Segue mandando mensagens (8h-18h).",
  },
  {
    inicio: "14:00",
    fim: "18:00",
    titulo: "🤖 ESTUDO Claude Code (4h)",
    categoria: "estudos",
    conselheiro: "Naval Ravikant",
    principio: "Segunda dose do dia. 9h de Claude Code no sábado = vantagem composta.",
    detalhes: "Continua o projeto da manhã. Documenta o que aprendeu.",
  },
  {
    inicio: "18:00",
    fim: "18:30",
    titulo: "Jantar",
    categoria: "refeicao",
    conselheiro: "Epicuro",
    principio: "Refeição com presença.",
  },
  {
    inicio: "18:30",
    fim: "20:30",
    titulo: "Leitura (2h)",
    categoria: "leitura",
    conselheiro: "Sócrates",
    principio: "Noite de leitura longa. Examine a semana.",
  },
  {
    inicio: "20:30",
    fim: "21:00",
    titulo: "Wind down + journaling",
    categoria: "ritual",
    conselheiro: "Matthew Walker",
    principio: "Desliga as telas. Prepara o sono.",
  },
  {
    inicio: "21:00",
    fim: "05:30",
    titulo: "Sono (8h30)",
    categoria: "sono",
    conselheiro: "Matthew Walker",
    principio: "Recuperação total.",
  },
];

// ===== DOMINGO — Estudo Claude Code de manhã + YouTube à tarde =====
export const ROTINA_DOMINGO: BlocoDia[] = [
  {
    inicio: "05:30",
    fim: "05:45",
    titulo: "Acordar + gratidão",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Último dia antes da semana. Começa agradecendo.",
    detalhes: "Água. Sem snooze.",
  },
  {
    inicio: "05:45",
    fim: "06:15",
    titulo: "Café da manhã",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Café tranquilo.",
  },
  {
    inicio: "06:15",
    fim: "07:00",
    titulo: "Leitura — LIVRO FÍSICO (45min)",
    categoria: "leitura",
    conselheiro: "Bill Gates",
    principio: "Continua o livro de sábado.",
  },
  {
    inicio: "07:00",
    fim: "12:00",
    titulo: "🤖 ESTUDO Claude Code PROFUNDO (5h)",
    categoria: "estudos",
    conselheiro: "Naval Ravikant",
    principio: "Mesma rotina de sábado de manhã. Estudo ATIVO, mãos na massa.",
    detalhes: "Agentes, skills, workflows, MCP. Constrói algo aplicável às empresas.",
  },
  {
    inicio: "12:00",
    fim: "12:30",
    titulo: "Almoço",
    categoria: "refeicao",
    conselheiro: "Epicuro",
    principio: "Pausa real.",
  },
  {
    inicio: "12:30",
    fim: "17:30",
    titulo: "🎥 GRAVAR + EDITAR YouTube — 3 vídeos da semana (5h)",
    categoria: "youtube",
    conselheiro: "Hormozi",
    principio: "Tarde de domingo é YouTube. Grava E edita os 3 vídeos da semana de uma vez.",
    detalhes:
      "Setup completo (luz, fundo, micro). Roteiros prontos. Grava 3 vídeos + edita (cortes, legendas, thumbnail, descrição). Sai pronto pra postar na semana.",
  },
  {
    inicio: "17:30",
    fim: "18:30",
    titulo: "🔎 Planejar reels da semana seguinte (1h)",
    categoria: "conteudo",
    conselheiro: "Cal Newport",
    principio: "Define hoje quais reels vou gravar na semana — entra na segunda sabendo o que postar.",
    detalhes: "Lista os reels da próxima semana (Sinapse/Vexum/CNDA), ganchos e referências.",
  },
  {
    inicio: "18:30",
    fim: "19:00",
    titulo: "Jantar",
    categoria: "refeicao",
    conselheiro: "Epicuro",
    principio: "Refeição com presença.",
  },
  {
    inicio: "19:00",
    fim: "20:30",
    titulo: "Leitura + journaling semanal",
    categoria: "leitura",
    conselheiro: "Sócrates",
    principio: "Entra na segunda afiado. Examine a semana.",
  },
  {
    inicio: "20:30",
    fim: "21:00",
    titulo: "Wind down (SEM TELA)",
    categoria: "ritual",
    conselheiro: "Matthew Walker",
    principio: "Prepara o sono pra acordar 4:45 na segunda.",
  },
  {
    inicio: "21:00",
    fim: "04:45",
    titulo: "Sono (7h45)",
    categoria: "sono",
    conselheiro: "Matthew Walker",
    principio: "Última noite antes da semana.",
  },
];

export function rotinaDoDiaSemana(diaSemana: number): BlocoDia[] {
  switch (diaSemana) {
    case 1:
      return ROTINA_SEGUNDA;
    case 2:
      return ROTINA_TERCA;
    case 3:
      return ROTINA_QUARTA;
    case 4:
      return ROTINA_QUINTA;
    case 5:
      return ROTINA_SEXTA;
    case 6:
      return ROTINA_SABADO;
    case 0:
      return ROTINA_DOMINGO;
    default:
      return ROTINA_SEGUNDA;
  }
}

export function blocoAtual(agora: Date, blocos: BlocoDia[]): BlocoDia | undefined {
  const hh = String(agora.getHours()).padStart(2, "0");
  const mm = String(agora.getMinutes()).padStart(2, "0");
  const atual = `${hh}:${mm}`;
  return blocos.find((b) => {
    if (b.fim < b.inicio) {
      return atual >= b.inicio || atual < b.fim;
    }
    return atual >= b.inicio && atual < b.fim;
  });
}
