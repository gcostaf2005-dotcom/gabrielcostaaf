// Rotina diária — Gabriel v6
// Treinos 5x/sem (Seg/Ter/Qua/Sex/Sáb) — Quinta descanso
// Cold outreach SEMPRE à tarde (13-15h) · Follow-up 15-16h
// Estudos profundos APENAS fim de semana (4h sáb + 2h dom = 6h)
// Conteúdo: Seg grava curtos · Qua edita curtos · Sáb grava YouTube · Dom edita YouTube
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
  2: { nome: "Trabalho Profundo", emoji: "💼", cor: "#5b8def" },
  3: { nome: "Edição Curtos", emoji: "✂️", cor: "#f59e0b" },
  4: { nome: "BNI + Descanso treino", emoji: "🤝", cor: "#22c55e" },
  5: { nome: "Revisão Semanal", emoji: "📊", cor: "#06b6d4" },
  6: { nome: "YouTube + Estudos IA", emoji: "🎥", cor: "#ef4444" },
  0: { nome: "Edição YT + Planejamento", emoji: "🌙", cor: "#8b5cf6" },
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

// ===== MANHÃ PADRÃO (Seg/Ter/Qua/Sex — Quinta tem BNI no lugar) =====
const MANHA_PADRAO: BlocoDia[] = [
  {
    inicio: "04:45",
    fim: "05:00",
    titulo: "Acordar + ritual rápido",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Sem snooze. O dia é seu antes de ser de qualquer um.",
    detalhes: "Água 500ml. Roupa de treino. SEM celular nos primeiros 30min.",
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

// ===== TARDE COMERCIAL (PADRÃO TODO DIA ÚTIL) — Cold + Follow-up =====
const TARDE_COMERCIAL: BlocoDia[] = [
  {
    inicio: "13:00",
    fim: "15:00",
    titulo: "💼 Cold Outreach (2h)",
    categoria: "outreach",
    conselheiro: "Alex Hormozi",
    principio: "Cold outreach é OBRIGATÓRIO todo dia útil. À tarde, sem exceção.",
    detalhes:
      "50-80 mensagens (WhatsApp + LinkedIn). Lanche às 15h (no fim do bloco, sem parar fluxo).",
  },
  {
    inicio: "15:00",
    fim: "16:00",
    titulo: "🔁 Follow-up dedicado (1h)",
    categoria: "followup",
    conselheiro: "Hormozi",
    principio: "Follow-up vale MAIS que cold novo. Dinheiro tá no 'lembrei de você'.",
    detalhes:
      "Responder leads quentes, agendar calls, mandar materiais. ZERO mensagem nova aqui.",
  },
];

// ===== NOITE PADRÃO (Seg-Qui — Sex tem revisão diferente) =====
const NOITE_PADRAO: BlocoDia[] = [
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
    principio: "Wind down de 20min é não-negociável.",
    detalhes: "Journaling 3min. Luzes baixas.",
  },
  {
    inicio: "22:30",
    fim: "04:45",
    titulo: "Sono (6h15)",
    categoria: "sono",
    conselheiro: "Jeff Bezos",
    principio: "Piso aceitável. Compensa no fim de semana (8h30).",
  },
];

// ===== SEGUNDA — Gravação Reels/TikTok =====
export const ROTINA_SEGUNDA: BlocoDia[] = [
  ...MANHA_PADRAO,
  {
    inicio: "08:00",
    fim: "12:00",
    titulo: "🎬 GRAVAÇÃO Reels/TikTok + Stories da semana (4h)",
    categoria: "conteudo",
    conselheiro: "Hormozi",
    principio: "Bateladar é a ÚNICA forma. Grava 5-7 Reels + Stories de seg-dom.",
    detalhes:
      "Setup uma vez (luz, fundo, micro). Roteiros prontos. Cross-post Instagram + TikTok. Lanche 9h sem parar.",
  },
  {
    inicio: "12:00",
    fim: "13:00",
    titulo: "Almoço + descomprimir",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Pausa REAL. Sem tela. 15min de caminhada depois.",
  },
  ...TARDE_COMERCIAL,
  {
    inicio: "16:00",
    fim: "17:30",
    titulo: "Trabalho extra / Pendências",
    categoria: "trabalho",
    conselheiro: "Bezos",
    principio: "Flex: calls que vieram, propostas, organização.",
    detalhes: "Tarefa que não cabe nos outros blocos. Newsletter IA da tarde se sobrar tempo.",
  },
  ...NOITE_PADRAO,
];

// ===== TERÇA — Trabalho Profundo =====
export const ROTINA_TERCA: BlocoDia[] = [
  ...MANHA_PADRAO,
  {
    inicio: "08:00",
    fim: "12:00",
    titulo: "💼 Trabalho Profundo (4h)",
    categoria: "trabalho",
    conselheiro: "Jeff Bezos",
    principio: "Manhã = Deep Work. Calls importantes, propostas, decisões.",
    detalhes:
      "Calls de venda agendadas, propostas, estratégia, fechamentos pendentes. Lanche 9h.",
  },
  {
    inicio: "12:00",
    fim: "13:00",
    titulo: "Almoço",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Pausa REAL.",
  },
  ...TARDE_COMERCIAL,
  {
    inicio: "16:00",
    fim: "17:30",
    titulo: "Trabalho extra / Pendências",
    categoria: "trabalho",
    conselheiro: "Bezos",
    principio: "Flex: organização, calls extras, materiais.",
  },
  ...NOITE_PADRAO,
];

// ===== QUARTA — Edição Reels/TikTok =====
export const ROTINA_QUARTA: BlocoDia[] = [
  ...MANHA_PADRAO,
  {
    inicio: "08:00",
    fim: "12:00",
    titulo: "✂️ EDIÇÃO Reels/TikTok (4h Deep Work)",
    categoria: "edicao",
    conselheiro: "Cal Newport",
    principio: "Deep Work em bloco contínuo. Edita TUDO de uma vez.",
    detalhes:
      "Modo avião, fone. Edita 5-7 vídeos curtos. Cortes, legendas, capa. Cross-post. Lanche 9h.",
  },
  {
    inicio: "12:00",
    fim: "13:00",
    titulo: "Almoço",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Pausa.",
  },
  ...TARDE_COMERCIAL,
  {
    inicio: "16:00",
    fim: "17:30",
    titulo: "Programar postagens + Pendências",
    categoria: "edicao",
    conselheiro: "Cal Newport",
    principio: "Agenda Reels/TikTok da semana toda hoje. Sai de quarta = semana resolvida.",
    detalhes: "Programar via Meta Business Suite ou outro. Confirmar legendas finais.",
  },
  ...NOITE_PADRAO,
];

// ===== QUINTA — BNI 6h-10h · Descanso de treino =====
export const ROTINA_QUINTA: BlocoDia[] = [
  {
    inicio: "04:45",
    fim: "05:00",
    titulo: "Acordar — dia de BNI (sem academia hoje)",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Descanso de treino. Mente afiada pro BNI.",
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
    principio:
      "Bloco LONGO. Networking + pitch + ouvir todos + pedir indicações cirúrgicas.",
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
    fim: "12:00",
    titulo: "🤝 Follow-up BNI INTENSIVO (1h30)",
    categoria: "followup",
    conselheiro: "Hormozi",
    principio: "Follow-up BNI no MESMO DIA = ouro. Dia seguinte perde 70%.",
    detalhes:
      "WhatsApp pros membros relevantes. Agenda calls. Manda materiais. Convite pra cafézinhos.",
  },
  {
    inicio: "12:00",
    fim: "13:00",
    titulo: "Almoço",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Pausa.",
  },
  ...TARDE_COMERCIAL,
  {
    inicio: "16:00",
    fim: "17:30",
    titulo: "Pendências / Trabalho extra",
    categoria: "trabalho",
    conselheiro: "Bezos",
    principio: "Flex pós-BNI. Organização e propostas geradas.",
  },
  ...NOITE_PADRAO,
];

// ===== SEXTA — Trabalho + REVISÃO SEMANAL sagrada =====
export const ROTINA_SEXTA: BlocoDia[] = [
  ...MANHA_PADRAO,
  {
    inicio: "08:00",
    fim: "12:00",
    titulo: "💼 Trabalho Profundo + Fechamento da semana (4h)",
    categoria: "trabalho",
    conselheiro: "Bezos",
    principio: "Última manhã. Fecha tudo que ficou em aberto.",
    detalhes: "Calls finais, propostas pendentes, follow-ups da semana. Lanche 9h.",
  },
  {
    inicio: "12:00",
    fim: "13:00",
    titulo: "Almoço",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Pausa.",
  },
  ...TARDE_COMERCIAL,
  {
    inicio: "16:00",
    fim: "17:30",
    titulo: "📊 REVISÃO SEMANAL (sagrado)",
    categoria: "revisao",
    conselheiro: "Ray Dalio",
    principio:
      "O que NÃO se mede, não se gerencia. Revisão = você no comando, não no improviso.",
    detalhes:
      "Checklist: (1) Métricas comerciais — outreach total, respostas, calls, fechamentos R$. (2) Conteúdo — Reels gravados/editados/postados, YouTube. (3) Pipeline — cada lead, próximo passo. (4) Estudos — 1 framework IA testado, 1 ferramenta nova. (5) Pessoal — treinos (meta 5x), sono, leitura. (6) 3 VITÓRIAS / 3 LIÇÕES / 3 AJUSTES. (7) MITs da próxima semana (3 por dia).",
  },
  ...NOITE_PADRAO,
];

// ===== SÁBADO — YouTube + Estudos IA (4h firmes) =====
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
    titulo: "Academia (treino mais pesado — 5º da semana)",
    categoria: "academia",
    conselheiro: "Marco Aurélio",
    principio: "Sábado pode puxar — sem pressa pra trabalhar.",
  },
  {
    inicio: "08:30",
    fim: "10:30",
    titulo: "Leitura longa — LIVRO FÍSICO (2h)",
    categoria: "leitura",
    conselheiro: "Bill Gates",
    principio: "Think Week. Leitura PROFUNDA. Livro inteiro no fim de semana.",
  },
  {
    inicio: "10:30",
    fim: "13:00",
    titulo: "🎥 GRAVAÇÃO YouTube (vídeo longo)",
    categoria: "youtube",
    conselheiro: "Hormozi",
    principio: "1 vídeo de qualidade > 10 amadores. Setup completo.",
    detalhes: "Grava 1-2 vídeos longos. Roteiro pronto antes (planejou domingo).",
  },
  {
    inicio: "13:00",
    fim: "14:00",
    titulo: "Almoço + tempo livre",
    categoria: "refeicao",
    conselheiro: "Epicuro",
    principio: "Pausa real. Família/amigos.",
  },
  {
    inicio: "14:00",
    fim: "18:00",
    titulo: "🤖 ESTUDO IA PROFUNDO (4h firmes)",
    categoria: "estudos",
    conselheiro: "Naval Ravikant",
    principio: "Bloco SAGRADO. Estudo ATIVO (notas, exercícios, projeto pessoal).",
    detalhes:
      "Curso de IA + framework + livro técnico. Não é só ler — é praticar. Constrói algo aplicável ao trabalho.",
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
    principio: "Examine a semana.",
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

// ===== DOMINGO — Edição YouTube + Estudos IA + PLANEJAMENTO sagrado =====
export const ROTINA_DOMINGO: BlocoDia[] = [
  {
    inicio: "06:30",
    fim: "07:00",
    titulo: "Acordar (dormiu 8h30)",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Último dia antes da semana. Carregue baterias.",
  },
  {
    inicio: "07:00",
    fim: "08:30",
    titulo: "Descanso ativo (cardio leve / caminhada)",
    categoria: "descanso",
    conselheiro: "Sêneca",
    principio: "Domingo é dia de DESCANSO de treino. Cardio leve OK.",
    detalhes: "Caminhada, alongamento, mobilidade. Sem academia pesada.",
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
    detalhes: "Edita o vídeo do sábado. Thumbnail, descrição, tags. Sai pronto pra postar.",
  },
  {
    inicio: "13:00",
    fim: "14:00",
    titulo: "Almoço",
    categoria: "refeicao",
    conselheiro: "Epicuro",
    principio: "Pausa.",
  },
  {
    inicio: "14:00",
    fim: "16:00",
    titulo: "🤖 ESTUDO IA (2h)",
    categoria: "estudos",
    conselheiro: "Naval Ravikant",
    principio: "Mais 2h domingo = 6h de IA no fim de semana totais.",
    detalhes: "Newsletter semanal (Mollick, Latent Space, Import AI) + framework leve.",
  },
  {
    inicio: "16:00",
    fim: "18:00",
    titulo: "📊 PLANEJAMENTO SEMANAL (sagrado)",
    categoria: "revisao",
    conselheiro: "Ray Dalio",
    principio: "Sem ele, a semana vira improviso.",
    detalhes:
      "Pega revisão de sexta. Define MITs de cada dia. Bate agenda. Escreve roteiros de Reels da semana. Lista 100 prospects pro cold outreach.",
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
    titulo: "Conexão / descanso real",
    categoria: "descanso",
    conselheiro: "Epicuro",
    principio: "Última noite antes da semana.",
  },
  {
    inicio: "21:00",
    fim: "22:00",
    titulo: "Leitura + journaling semanal",
    categoria: "leitura",
    conselheiro: "Sócrates",
    principio: "Entra na segunda afiado.",
  },
  {
    inicio: "22:00",
    fim: "06:30",
    titulo: "Sono (8h30)",
    categoria: "sono",
    conselheiro: "Matthew Walker",
    principio: "Última noite de 8h30.",
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
