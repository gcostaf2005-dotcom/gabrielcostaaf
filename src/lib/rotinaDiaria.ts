// Rotina diária — Gabriel
// 5 dias úteis com TEMAS específicos + fim de semana com YouTube e estudos
// Constraints: academia 5h-6h30 · escritório 8h · faculdade 18h-22h · sono 6h15
// Refeições: lanche 9h · almoço 12h-13h · lanche 15h · jantar 17:30-18h
// Cold outreach OBRIGATÓRIO todo dia útil. Follow-up tem bloco próprio.
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
  1: { nome: "Gravação Curtos", emoji: "🎬", cor: "#a855f7" },
  2: { nome: "Trabalho Pesado", emoji: "💼", cor: "#5b8def" },
  3: { nome: "Edição Curtos", emoji: "✂️", cor: "#f59e0b" },
  4: { nome: "BNI + Trabalho", emoji: "🤝", cor: "#22c55e" },
  5: { nome: "Trabalho + Revisão", emoji: "📊", cor: "#06b6d4" },
  6: { nome: "YouTube + Estudos", emoji: "🎥", cor: "#ef4444" },
  0: { nome: "Edição YouTube + Planejamento", emoji: "🌙", cor: "#8b5cf6" },
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
  outreach: "Cold Outreach",
  followup: "Follow-up",
  conteudo: "Gravação",
  youtube: "YouTube",
  edicao: "Edição",
  faculdade: "Faculdade",
  deslocamento: "Deslocamento",
  refeicao: "Refeição",
  bni: "BNI",
  revisao: "Revisão",
  descanso: "Pausa",
  sono: "Sono",
};

// ===== BLOCOS COMUNS DA MANHÃ (todos os dias úteis menos quinta) =====
const MANHA_COMUM: BlocoDia[] = [
  {
    inicio: "04:45",
    fim: "05:00",
    titulo: "Acordar + ritual rápido",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Sem snooze. O dia é seu antes de ser de qualquer um.",
    detalhes: "Água 500ml. Roupa de treino. SEM celular.",
  },
  {
    inicio: "05:00",
    fim: "06:30",
    titulo: "Academia (podcast/audiobook OK)",
    categoria: "academia",
    conselheiro: "Marco Aurélio",
    principio: "Disciplina física antes de qualquer trabalho mental.",
    detalhes: "1h treino + deslocamento. Podcast nos fones ou silêncio.",
  },
  {
    inicio: "06:30",
    fim: "07:00",
    titulo: "Banho + café da manhã",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Café sem tela = descanso. Com tela = estresse disfarçado.",
  },
  {
    inicio: "07:00",
    fim: "07:30",
    titulo: "Leitura focada — LIVRO FÍSICO",
    categoria: "leitura",
    conselheiro: "Warren Buffett",
    principio: "30min focado vale mais que 2h disperso.",
    detalhes: "Livro de papel. Caderno do lado.",
  },
  {
    inicio: "07:30",
    fim: "08:00",
    titulo: "Deslocamento pro escritório",
    categoria: "deslocamento",
    conselheiro: "Diógenes",
    principio: "Mente trabalha em movimento. Podcast ou silêncio.",
  },
];

// ===== BLOCO DE FOLLOW-UP DEDICADO (1h, depois do lanche da tarde) =====
const FOLLOWUP_BLOCO: BlocoDia = {
  inicio: "15:00",
  fim: "16:00",
  titulo: "🔁 Follow-up dedicado (1h)",
  categoria: "followup",
  conselheiro: "Hormozi",
  principio: "Follow-up vale MAIS que outreach novo. Dinheiro tá no 'lembrei de você'.",
  detalhes:
    "Lanche 15h. Responder leads quentes, reagir a mensagens, agendar calls. ZERO mensagem cold aqui — é seguir os já contatados.",
};

// ===== BLOCOS COMUNS DA NOITE =====
const NOITE_COMUM: BlocoDia[] = [
  {
    inicio: "17:30",
    fim: "18:00",
    titulo: "Jantar + deslocamento pra faculdade",
    categoria: "refeicao",
    conselheiro: "Epicuro",
    principio: "Come antes da aula pra não perder energia.",
  },
  {
    inicio: "18:00",
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
    principio: "Wind down de 20min é não-negociável pro sono REM.",
    detalhes: "Journaling 3min. Luzes baixas.",
  },
  {
    inicio: "22:30",
    fim: "04:45",
    titulo: "Sono (6h15)",
    categoria: "sono",
    conselheiro: "Jeff Bezos",
    principio: "Piso aceitável. Compensa no fim de semana (8h+).",
    detalhes: "Cochilo de 20min no almoço se precisar.",
  },
];

// ===== SEGUNDA — GRAVAÇÃO REELS/TIKTOK =====
export const ROTINA_SEGUNDA: BlocoDia[] = [
  ...MANHA_COMUM,
  {
    inicio: "08:00",
    fim: "10:00",
    titulo: "💼 Cold Outreach (50 mensagens)",
    categoria: "outreach",
    conselheiro: "Hormozi",
    principio: "Cold outreach é OBRIGATÓRIO todo dia útil. Volume = pipeline.",
    detalhes: "50 cold messages (WhatsApp + LinkedIn). Lanche 9h sem parar fluxo.",
  },
  {
    inicio: "10:00",
    fim: "12:00",
    titulo: "🎬 GRAVAÇÃO Reels/TikTok da semana",
    categoria: "conteudo",
    conselheiro: "Hormozi",
    principio: "Bateladar é a ÚNICA forma. Grava 5-7 vídeos curtos hoje.",
    detalhes:
      "Setup uma vez. Roteiros prontos. Cross-post: mesmo vídeo serve Instagram + TikTok.",
  },
  {
    inicio: "12:00",
    fim: "13:00",
    titulo: "Almoço + descomprimir",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Pausa REAL.",
  },
  {
    inicio: "13:00",
    fim: "15:00",
    titulo: "🎬 GRAVAÇÃO continuação / Stories da semana",
    categoria: "conteudo",
    conselheiro: "Hormozi",
    principio: "Aproveita setup montado. Grava Stories de seg-dom.",
  },
  FOLLOWUP_BLOCO,
  {
    inicio: "16:00",
    fim: "17:30",
    titulo: "Estudos técnicos",
    categoria: "estudos",
    conselheiro: "Naval Ravikant",
    principio: "Aprenda algo que escala. Curso IA, framework novo.",
  },
  ...NOITE_COMUM,
];

// ===== TERÇA — TRABALHO PESADO =====
export const ROTINA_TERCA: BlocoDia[] = [
  ...MANHA_COMUM,
  {
    inicio: "08:00",
    fim: "12:00",
    titulo: "💼 Cold Outreach Intensivo (4h) — pico da semana",
    categoria: "outreach",
    conselheiro: "Hormozi",
    principio: "Hoje é DIA DE FECHAR. 80-100 mensagens + calls agendadas.",
    detalhes: "WhatsApp + LinkedIn intensivo. Calls de venda. Propostas. Lanche 9h.",
  },
  {
    inicio: "12:00",
    fim: "13:00",
    titulo: "Almoço",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Pausa REAL.",
  },
  {
    inicio: "13:00",
    fim: "15:00",
    titulo: "💼 Calls + Propostas",
    categoria: "trabalho",
    conselheiro: "Bezos",
    principio: "Execução comercial pura. Calls agendadas + envio de propostas.",
  },
  FOLLOWUP_BLOCO,
  {
    inicio: "16:00",
    fim: "17:30",
    titulo: "Estudos técnicos",
    categoria: "estudos",
    conselheiro: "Naval",
    principio: "Aprende framework, IA, leverage.",
  },
  ...NOITE_COMUM,
];

// ===== QUARTA — EDIÇÃO CURTOS =====
export const ROTINA_QUARTA: BlocoDia[] = [
  ...MANHA_COMUM,
  {
    inicio: "08:00",
    fim: "10:00",
    titulo: "💼 Cold Outreach (50 mensagens)",
    categoria: "outreach",
    conselheiro: "Hormozi",
    principio: "Cold outreach OBRIGATÓRIO. Sem exceção.",
    detalhes: "50 mensagens + calls. Lanche 9h.",
  },
  {
    inicio: "10:00",
    fim: "12:00",
    titulo: "✂️ EDIÇÃO Reels/TikTok (parte 1)",
    categoria: "edicao",
    conselheiro: "Cal Newport",
    principio: "Deep Work em bloco. Edita 3 vídeos.",
    detalhes: "Modo avião, fone. Cortes, legendas, capa.",
  },
  {
    inicio: "12:00",
    fim: "13:00",
    titulo: "Almoço",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Pausa.",
  },
  {
    inicio: "13:00",
    fim: "15:00",
    titulo: "✂️ EDIÇÃO continuação — finaliza semana",
    categoria: "edicao",
    conselheiro: "Cal Newport",
    principio: "Sai do dia com TODOS os Reels/TikToks da semana prontos.",
    detalhes: "Edita os restantes. Programa postagens. Cross-post Instagram/TikTok.",
  },
  FOLLOWUP_BLOCO,
  {
    inicio: "16:00",
    fim: "17:30",
    titulo: "Estudos técnicos",
    categoria: "estudos",
    conselheiro: "Naval",
    principio: "Continua o ciclo de aprender que escala.",
  },
  ...NOITE_COMUM,
];

// ===== QUINTA — BNI =====
export const ROTINA_QUINTA: BlocoDia[] = [
  {
    inicio: "04:45",
    fim: "05:00",
    titulo: "Acordar — dia de BNI",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Hoje começa networking. Já entra na pegada.",
    detalhes: "Roupa social. Revisa pitch.",
  },
  {
    inicio: "05:00",
    fim: "05:45",
    titulo: "Academia rápida (45min) — opcional",
    categoria: "academia",
    conselheiro: "Marco Aurélio",
    principio: "Versão curta. Pode pular e compensar sábado.",
  },
  {
    inicio: "05:45",
    fim: "06:15",
    titulo: "Banho + café leve",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Café leve. Vai comer no BNI.",
  },
  {
    inicio: "06:15",
    fim: "06:30",
    titulo: "Deslocamento BNI",
    categoria: "deslocamento",
    conselheiro: "Diógenes",
    principio: "Revisa pitch mental + indicação que vai pedir.",
  },
  {
    inicio: "06:30",
    fim: "08:30",
    titulo: "🤝 BNI",
    categoria: "bni",
    conselheiro: "Hormozi",
    principio: "Volume + relacionamento. Pede 1 indicação específica.",
    detalhes: "Pitch 30s afiado. Anota todo negócio. Pede indicação cirúrgica.",
  },
  {
    inicio: "08:30",
    fim: "09:00",
    titulo: "Deslocamento pro escritório",
    categoria: "deslocamento",
    conselheiro: "Diógenes",
    principio: "Já começa follow-up mental dos contatos BNI.",
  },
  {
    inicio: "09:00",
    fim: "11:00",
    titulo: "💼 Cold Outreach (50 mensagens)",
    categoria: "outreach",
    conselheiro: "Hormozi",
    principio: "BNI + cold outreach. Sem exceção.",
    detalhes: "50 mensagens normais + calls. Lanche 9h.",
  },
  {
    inicio: "11:00",
    fim: "12:00",
    titulo: "🤝 Follow-up BNI (1h)",
    categoria: "followup",
    conselheiro: "Hormozi",
    principio: "Follow-up BNI no MESMO DIA = ouro. Quem fizer dia seguinte perde 70% do efeito.",
    detalhes: "WhatsApp pros membros relevantes. Agenda calls. Manda materiais.",
  },
  {
    inicio: "12:00",
    fim: "13:00",
    titulo: "Almoço",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Pausa.",
  },
  {
    inicio: "13:00",
    fim: "15:00",
    titulo: "💼 Calls + Propostas",
    categoria: "trabalho",
    conselheiro: "Bezos",
    principio: "Execução comercial.",
  },
  FOLLOWUP_BLOCO,
  {
    inicio: "16:00",
    fim: "17:30",
    titulo: "Estudos / Leitura extra",
    categoria: "estudos",
    conselheiro: "Naval",
    principio: "Quinta tem dia puxado, fecha com aprendizado.",
  },
  ...NOITE_COMUM,
];

// ===== SEXTA — TRABALHO + REVISÃO SEMANAL =====
export const ROTINA_SEXTA: BlocoDia[] = [
  ...MANHA_COMUM,
  {
    inicio: "08:00",
    fim: "12:00",
    titulo: "💼 Cold Outreach (4h) + fechamento",
    categoria: "outreach",
    conselheiro: "Hormozi",
    principio: "Última manhã. 50 cold messages + fecha pendências da semana.",
    detalhes: "50 cold messages + calls finais + propostas pendentes. Lanche 9h.",
  },
  {
    inicio: "12:00",
    fim: "13:00",
    titulo: "Almoço",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Pausa.",
  },
  {
    inicio: "13:00",
    fim: "15:00",
    titulo: "💼 Calls + Estudos",
    categoria: "trabalho",
    conselheiro: "Bezos",
    principio: "Fechamento + aprende algo novo.",
  },
  FOLLOWUP_BLOCO,
  {
    inicio: "16:00",
    fim: "17:30",
    titulo: "📊 REVISÃO SEMANAL",
    categoria: "revisao",
    conselheiro: "Ray Dalio",
    principio: "Principles. O que funcionou? Ajustes? MITs da próxima semana.",
    detalhes:
      "3 vitórias / 3 lições / 3 ajustes. Define MITs de cada dia da próxima semana.",
  },
  ...NOITE_COMUM,
];

// ===== SÁBADO — YOUTUBE + ESTUDOS (4h+) =====
export const ROTINA_SABADO: BlocoDia[] = [
  {
    inicio: "06:30",
    fim: "07:00",
    titulo: "Acordar (dormiu 8h30)",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Disciplina sem rigidez. Mesmo descanso é treinado.",
  },
  {
    inicio: "07:00",
    fim: "08:30",
    titulo: "Academia (treino mais pesado)",
    categoria: "academia",
    conselheiro: "Marco Aurélio",
    principio: "Sábado pode puxar mais — sem pressa pra trabalhar.",
  },
  {
    inicio: "08:30",
    fim: "10:30",
    titulo: "Leitura longa — LIVRO FÍSICO (2h)",
    categoria: "leitura",
    conselheiro: "Bill Gates",
    principio: "Think Week. Leitura PROFUNDA.",
  },
  {
    inicio: "10:30",
    fim: "13:00",
    titulo: "🎥 GRAVAÇÃO YouTube (vídeo longo)",
    categoria: "youtube",
    conselheiro: "Hormozi",
    principio: "1 vídeo de qualidade > 10 amadores. Setup completo (luz, micro, fundo).",
    detalhes: "Grava 1-2 vídeos longos pro YouTube. Roteiro pronto antes.",
  },
  {
    inicio: "13:00",
    fim: "14:00",
    titulo: "Almoço + tempo livre",
    categoria: "refeicao",
    conselheiro: "Epicuro",
  },
  {
    inicio: "14:00",
    fim: "18:00",
    titulo: "📚 ESTUDOS (4h firmes)",
    categoria: "estudos",
    conselheiro: "Naval Ravikant",
    principio: "Sábado é dia de aprender algo que escala. 4h NÃO-NEGOCIÁVEL.",
    detalhes:
      "Curso de IA, frameworks, livro técnico aprofundado. Estudo ATIVO (notas, exercícios, projetos).",
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
    fim: "21:00",
    titulo: "Tempo de conexão (família/amigos)",
    categoria: "descanso",
    conselheiro: "Epicuro",
    principio: "Pessoas importantes presentes.",
  },
  {
    inicio: "21:00",
    fim: "22:00",
    titulo: "Leitura + journaling",
    categoria: "leitura",
    conselheiro: "Sócrates",
    principio: "Examine a semana. Ajustes pro domingo.",
  },
  {
    inicio: "22:00",
    fim: "06:30",
    titulo: "Sono (8h30)",
    categoria: "sono",
    conselheiro: "Matthew Walker",
    principio: "Recuperação total.",
  },
];

// ===== DOMINGO — EDIÇÃO YOUTUBE + ESTUDOS (4h) + PLANEJAMENTO =====
export const ROTINA_DOMINGO: BlocoDia[] = [
  {
    inicio: "06:30",
    fim: "07:00",
    titulo: "Acordar",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Domingo segue o ritual, com mais leveza.",
  },
  {
    inicio: "07:00",
    fim: "08:30",
    titulo: "Academia leve (cardio/mobilidade)",
    categoria: "academia",
    conselheiro: "Marco Aurélio",
    principio: "Recuperação ativa.",
  },
  {
    inicio: "08:30",
    fim: "10:30",
    titulo: "Leitura longa — LIVRO FÍSICO (2h)",
    categoria: "leitura",
    conselheiro: "Bill Gates",
    principio: "Continua o livro de sábado. Termina hoje?",
  },
  {
    inicio: "10:30",
    fim: "13:00",
    titulo: "✂️ EDIÇÃO YouTube (vídeo longo)",
    categoria: "edicao",
    conselheiro: "Cal Newport",
    principio: "Edição de vídeo longo exige Deep Work. 2h30 sem interrupção.",
    detalhes: "Edita o vídeo do sábado. Cortes, thumbnail, descrição. Sai pronto pra postar.",
  },
  {
    inicio: "13:00",
    fim: "14:00",
    titulo: "Almoço",
    categoria: "refeicao",
    conselheiro: "Epicuro",
  },
  {
    inicio: "14:00",
    fim: "16:00",
    titulo: "📚 ESTUDOS (2h)",
    categoria: "estudos",
    conselheiro: "Naval Ravikant",
    principio: "Mais 2h domingo = 6h estudos no fim de semana totais (com sábado).",
    detalhes: "Continua curso ou outro tema técnico.",
  },
  {
    inicio: "16:00",
    fim: "18:00",
    titulo: "📊 PLANEJAMENTO SEMANAL (sagrado)",
    categoria: "revisao",
    conselheiro: "Ray Dalio",
    principio:
      "Domingo é o bloco SAGRADO de planejamento. Sem ele, a semana vira improviso.",
    detalhes:
      "Revisar revisão de sexta. Confirmar MITs de cada dia. Agenda da semana batida. Roteiros de Reels.",
  },
  {
    inicio: "18:00",
    fim: "18:30",
    titulo: "Jantar",
    categoria: "refeicao",
    conselheiro: "Epicuro",
  },
  {
    inicio: "18:30",
    fim: "21:00",
    titulo: "Tempo de conexão / descanso real",
    categoria: "descanso",
    conselheiro: "Epicuro",
    principio: "Última noite antes da semana. Carregue baterias.",
  },
  {
    inicio: "21:00",
    fim: "22:00",
    titulo: "Leitura + journaling semanal",
    categoria: "leitura",
    conselheiro: "Sócrates",
    principio: "Última reflexão. Entra na segunda afiado.",
  },
  {
    inicio: "22:00",
    fim: "06:30",
    titulo: "Sono (8h30)",
    categoria: "sono",
    conselheiro: "Matthew Walker",
    principio: "Última noite de 8h30 da semana.",
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
