// Rotina diária — Gabriel
// 5 dias úteis com TEMAS específicos (gravação/trabalho/edição/BNI/revisão)
// Constraints: academia 5h-6h30 · escritório 8h · faculdade 18h-22h
// Refeições: lanche manhã 9h · almoço 12h-13h · lanche tarde 15h · jantar 17:30-18h
// "A vida é feita de constantes desequilíbrios"

export type Categoria =
  | "ritual"
  | "academia"
  | "leitura"
  | "estudos"
  | "trabalho"
  | "conteudo"
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
  1: { nome: "Dia de Gravação", emoji: "🎬", cor: "#a855f7" },
  2: { nome: "Trabalho Pesado", emoji: "💼", cor: "#5b8def" },
  3: { nome: "Dia de Edição", emoji: "✂️", cor: "#f59e0b" },
  4: { nome: "BNI + Trabalho", emoji: "🤝", cor: "#22c55e" },
  5: { nome: "Trabalho + Revisão Semanal", emoji: "📊", cor: "#06b6d4" },
  6: { nome: "Sábado", emoji: "🌅", cor: "#ef4444" },
  0: { nome: "Domingo", emoji: "🌙", cor: "#8b5cf6" },
};

export const CATEGORIA_COR: Record<Categoria, string> = {
  ritual: "#8b5cf6",
  academia: "#ef4444",
  leitura: "#22c55e",
  estudos: "#22c55e",
  trabalho: "#5b8def",
  conteudo: "#a855f7",
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
  conteudo: "Gravação",
  edicao: "Edição",
  faculdade: "Faculdade",
  deslocamento: "Deslocamento",
  refeicao: "Refeição",
  bni: "BNI",
  revisao: "Revisão",
  descanso: "Pausa",
  sono: "Sono",
};

// ===== BLOCOS COMUNS DE MANHÃ (todos os dias menos quinta) =====
const MANHA_COMUM: BlocoDia[] = [
  {
    inicio: "04:45",
    fim: "05:00",
    titulo: "Acordar + ritual rápido",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Sem snooze. O dia é seu antes de ser de qualquer um.",
    detalhes: "Água 500ml. Banheiro. Roupa de treino. SEM celular.",
  },
  {
    inicio: "05:00",
    fim: "06:30",
    titulo: "Academia (podcast/audiobook OK)",
    categoria: "academia",
    conselheiro: "Marco Aurélio",
    principio: "Disciplina física antes de qualquer trabalho mental.",
    detalhes: "1h treino + deslocamento. Podcast nos fones ou silêncio mental.",
  },
  {
    inicio: "06:30",
    fim: "07:00",
    titulo: "Banho + café da manhã",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Café sem tela = descanso. Com tela = estresse disfarçado.",
    detalhes: "Banho rápido. Café sólido (proteína + fruta + gordura boa).",
  },
  {
    inicio: "07:00",
    fim: "07:30",
    titulo: "Leitura focada — LIVRO FÍSICO",
    categoria: "leitura",
    conselheiro: "Warren Buffett",
    principio: "30min focado vale mais que 2h disperso. Constância > intensidade.",
    detalhes: "Livro de papel. Não Kindle, não audio. Caderno do lado pra anotar.",
  },
  {
    inicio: "07:30",
    fim: "08:00",
    titulo: "Deslocamento pro escritório",
    categoria: "deslocamento",
    conselheiro: "Diógenes",
    principio: "Mente trabalha em movimento.",
    detalhes: "Podcast ou silêncio. NUNCA scroll de feed.",
  },
];

// ===== BLOCOS COMUNS DE FINAL DE TARDE / NOITE =====
const NOITE_COMUM: BlocoDia[] = [
  {
    inicio: "17:30",
    fim: "18:00",
    titulo: "Jantar + deslocamento pra faculdade",
    categoria: "refeicao",
    conselheiro: "Epicuro",
    principio: "Refeição com presença. Come antes da aula pra não perder energia.",
    detalhes: "Jantar prático. Audiobook ou silêncio no caminho.",
  },
  {
    inicio: "18:00",
    fim: "22:00",
    titulo: "Faculdade",
    categoria: "faculdade",
    conselheiro: "Aristóteles",
    principio: "Excelência é hábito. Presença plena, mesmo cansado.",
    detalhes: "Foca no que aplica. Tira dúvidas. Conexões com colegas.",
  },
  {
    inicio: "22:10",
    fim: "22:30",
    titulo: "Volta + wind down (SEM TELA)",
    categoria: "ritual",
    conselheiro: "Matthew Walker",
    principio: "Wind down de 20min é não-negociável pro sono REM funcionar.",
    detalhes: "Luzes baixas. Journaling 3min: 'O que aprendi hoje?'",
  },
  {
    inicio: "22:30",
    fim: "04:45",
    titulo: "Sono (6h15)",
    categoria: "sono",
    conselheiro: "Jeff Bezos",
    principio: "Piso aceitável. Cochilo de 20min no almoço se precisar.",
    detalhes: "Quarto frio, escuro, sem celular. Compensar no fim de semana (8h).",
  },
];

// ===== SEGUNDA — DIA DE GRAVAÇÃO =====
export const ROTINA_SEGUNDA: BlocoDia[] = [
  ...MANHA_COMUM,
  {
    inicio: "08:00",
    fim: "10:00",
    titulo: "💼 Cold Outreach (50 mensagens) + Calls",
    categoria: "trabalho",
    conselheiro: "Hormozi",
    principio: "Cold outreach é OBRIGATÓRIO todo dia útil. Volume = pipeline.",
    detalhes: "50 cold messages (WhatsApp + LinkedIn). Calls agendadas. Lanche manhã às 9h sem parar.",
  },
  {
    inicio: "10:00",
    fim: "12:00",
    titulo: "🎬 GRAVAÇÃO — Reels da semana",
    categoria: "conteudo",
    conselheiro: "Alex Hormozi",
    principio: "Batelada é a ÚNICA forma. Grava 5 Reels = semana toda resolvida.",
    detalhes: "Setup uma vez (luz, fundo, micro). Grava 5 Reels seguidos. Roteiro pronto antes.",
  },
  {
    inicio: "12:00",
    fim: "13:00",
    titulo: "Almoço + descomprimir",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Pausa REAL. Sem tela.",
  },
  {
    inicio: "13:00",
    fim: "15:30",
    titulo: "🎬 GRAVAÇÃO continuação / Stories da semana",
    categoria: "conteudo",
    conselheiro: "Hormozi",
    principio: "Aproveita o setup. Grava Stories de cada dia da semana.",
    detalhes: "Stories de seg-dom batidos hoje. Lanche às 15h.",
  },
  {
    inicio: "15:30",
    fim: "17:30",
    titulo: "Follow-ups + Estudos técnicos",
    categoria: "estudos",
    conselheiro: "Naval Ravikant",
    principio: "Follow-up das mensagens da manhã + curso IA.",
    detalhes: "Responder leads, agendar calls, estudar 30-60min algum framework.",
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
    categoria: "trabalho",
    conselheiro: "Hormozi",
    principio: "Hoje é DIA DE FECHAR. 80-100 cold messages + calls agendadas.",
    detalhes: "WhatsApp + LinkedIn (80-100 msgs). Calls de venda. Propostas. Lanche 9h sem parar fluxo.",
  },
  {
    inicio: "12:00",
    fim: "13:00",
    titulo: "Almoço + caminhada",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Pausa REAL.",
  },
  {
    inicio: "13:00",
    fim: "15:30",
    titulo: "💼 Calls + Propostas + Follow-ups",
    categoria: "trabalho",
    conselheiro: "Bezos",
    principio: "Bloco de execução comercial puro.",
    detalhes: "Calls agendadas pela manhã. Enviar propostas. Lanche 15h.",
  },
  {
    inicio: "15:30",
    fim: "17:30",
    titulo: "Estudos técnicos / Pendências",
    categoria: "estudos",
    conselheiro: "Naval",
    principio: "Aprenda algo que vira leverage.",
    detalhes: "Curso de IA, framework novo, ou pendências.",
  },
  ...NOITE_COMUM,
];

// ===== QUARTA — DIA DE EDIÇÃO =====
export const ROTINA_QUARTA: BlocoDia[] = [
  ...MANHA_COMUM,
  {
    inicio: "08:00",
    fim: "10:00",
    titulo: "💼 Cold Outreach (50 mensagens) + Calls",
    categoria: "trabalho",
    conselheiro: "Hormozi",
    principio: "Cold outreach é OBRIGATÓRIO todo dia útil. Sem exceção.",
    detalhes: "50 cold messages + calls agendadas. Lanche 9h sem parar.",
  },
  {
    inicio: "10:00",
    fim: "12:00",
    titulo: "✂️ EDIÇÃO — começa os Reels gravados segunda",
    categoria: "edicao",
    conselheiro: "Cal Newport",
    principio: "Deep Work em bloco. Edita TUDO de uma vez.",
    detalhes: "Modo avião, fone. Edita 2-3 Reels.",
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
    fim: "16:00",
    titulo: "✂️ EDIÇÃO continuação (3h) — finaliza semana",
    categoria: "edicao",
    conselheiro: "Cal Newport",
    principio: "Sai do dia com TODOS os Reels da semana prontos pra postar.",
    detalhes: "Edita os Reels restantes + revisa Stories. Lanche 15h. Programa as postagens.",
  },
  {
    inicio: "16:00",
    fim: "17:30",
    titulo: "Trabalho extra / Estudos",
    categoria: "estudos",
    conselheiro: "Naval",
    principio: "Aproveita restinho de energia mental.",
  },
  ...NOITE_COMUM,
];

// ===== QUINTA — BNI =====
// BNI tipicamente 06:30-08:30. Sem academia normal nesse dia.
export const ROTINA_QUINTA: BlocoDia[] = [
  {
    inicio: "04:45",
    fim: "05:00",
    titulo: "Acordar + ritual rápido",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Hoje é BNI. Já acorda na pegada de networking.",
    detalhes: "Água, banheiro, escolhe roupa social.",
  },
  {
    inicio: "05:00",
    fim: "05:45",
    titulo: "Academia rápida (45min)",
    categoria: "academia",
    conselheiro: "Marco Aurélio",
    principio: "Versão curta. Ou pula e compensa sábado.",
    detalhes: "Treino enxuto. Cardio + abs OU só caminhada se for dia leve.",
  },
  {
    inicio: "05:45",
    fim: "06:15",
    titulo: "Banho + café rápido",
    categoria: "refeicao",
    conselheiro: "Sêneca",
    principio: "Café leve. Vai comer no BNI.",
  },
  {
    inicio: "06:15",
    fim: "06:30",
    titulo: "Deslocamento pro BNI",
    categoria: "deslocamento",
    conselheiro: "Diógenes",
    principio: "Mente afiada pro pitch.",
    detalhes: "Revisa mentalmente o pitch de 30s + indicação que vai pedir.",
  },
  {
    inicio: "06:30",
    fim: "08:30",
    titulo: "🤝 BNI",
    categoria: "bni",
    conselheiro: "Hormozi",
    principio: "Volume + relacionamento. Pede 1 indicação específica.",
    detalhes:
      "Pitch de 30s afiado. Ouve atentamente os outros. Anota cada negócio. Pede indicação cirúrgica.",
  },
  {
    inicio: "08:30",
    fim: "09:00",
    titulo: "Deslocamento pro escritório",
    categoria: "deslocamento",
    conselheiro: "Diógenes",
    principio: "Já começa follow-up mental dos contatos do BNI.",
  },
  {
    inicio: "09:00",
    fim: "12:00",
    titulo: "💼 Follow-up BNI + Cold Outreach (50 msgs)",
    categoria: "trabalho",
    conselheiro: "Hormozi",
    principio: "Follow-up BNI no mesmo dia + cold outreach normal. Sem exceção.",
    detalhes: "1h follow-up BNI (WhatsApp pros membros) + 50 cold messages + calls. Lanche 9h.",
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
    fim: "15:30",
    titulo: "Trabalho — Calls + propostas",
    categoria: "trabalho",
    conselheiro: "Bezos",
    principio: "Bloco de execução. Lanche 15h.",
  },
  {
    inicio: "15:30",
    fim: "17:30",
    titulo: "Leitura focada extra / Estudos (BNI puxou cedo, recupera leitura)",
    categoria: "leitura",
    conselheiro: "Buffett",
    principio: "Quinta tem leitura dobrada — manhã foi BNI, tarde recupera.",
  },
  ...NOITE_COMUM,
];

// ===== SEXTA — TRABALHO + REVISÃO SEMANAL =====
export const ROTINA_SEXTA: BlocoDia[] = [
  ...MANHA_COMUM,
  {
    inicio: "08:00",
    fim: "12:00",
    titulo: "💼 Cold Outreach + Fechamento da semana (4h)",
    categoria: "trabalho",
    conselheiro: "Hormozi",
    principio: "Cold outreach + fecha pendências. Última manhã antes do fim de semana.",
    detalhes: "50 cold messages + calls finais + propostas pendentes + follow-ups. Lanche 9h.",
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
    fim: "15:30",
    titulo: "Trabalho extra / Estudos",
    categoria: "estudos",
    conselheiro: "Naval",
    principio: "Lanche da tarde 15h.",
  },
  {
    inicio: "15:30",
    fim: "17:30",
    titulo: "📊 REVISÃO SEMANAL",
    categoria: "revisao",
    conselheiro: "Ray Dalio",
    principio: "Principles. O que funcionou? O que ajustar? MITs da próxima semana.",
    detalhes:
      "Bloco sagrado. 3 vitórias / 3 lições / 3 ajustes. Define os 3 MITs de cada dia da próxima semana.",
  },
  ...NOITE_COMUM,
];

// ===== FIM DE SEMANA — 4h+ ESTUDOS firmes =====
export const ROTINA_FIM_SEMANA: BlocoDia[] = [
  {
    inicio: "06:30",
    fim: "07:00",
    titulo: "Acordar (dormiu 8h)",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Disciplina sem rigidez. Mesmo descanso é treinado.",
    detalhes: "Sem snooze. Ritual da semana, só 1h45 mais tarde.",
  },
  {
    inicio: "07:00",
    fim: "08:30",
    titulo: "Academia (treino + recuperação)",
    categoria: "academia",
    conselheiro: "Marco Aurélio",
    principio: "Sábado: pode puxar pesado. Domingo: cardio/mobilidade.",
  },
  {
    inicio: "08:30",
    fim: "10:30",
    titulo: "Leitura longa — LIVRO FÍSICO (2h)",
    categoria: "leitura",
    conselheiro: "Bill Gates",
    principio: "Think Week. Leitura PROFUNDA, livro inteiro num final de semana.",
    detalhes: "Sem celular. Notas em caderno físico.",
  },
  {
    inicio: "10:30",
    fim: "12:30",
    titulo: "📚 ESTUDOS bloco 1 (2h)",
    categoria: "estudos",
    conselheiro: "Naval Ravikant",
    principio: "Aprenda algo que escala. Curso, framework, IA aplicada.",
    detalhes:
      "Curso de IA, frameworks de negócio, deep work em conhecimento técnico. Não é leitura — é estudo ativo (anotações, exercícios).",
  },
  {
    inicio: "12:30",
    fim: "14:00",
    titulo: "Almoço + tempo livre",
    categoria: "refeicao",
    conselheiro: "Epicuro",
    principio: "Prazer simples. Família/amigos.",
  },
  {
    inicio: "14:00",
    fim: "16:00",
    titulo: "📚 ESTUDOS bloco 2 (2h)",
    categoria: "estudos",
    conselheiro: "Naval Ravikant",
    principio: "Total: 4h de estudos no dia. Conhecimento composto.",
    detalhes:
      "Continuação do bloco 1 OU outro tema. Hábito do fim de semana: 4h estudos firmes.",
  },
  {
    inicio: "16:00",
    fim: "18:00",
    titulo: "Faculdade / projetos pessoais",
    categoria: "faculdade",
    conselheiro: "Aristóteles",
    principio: "Trabalhos acadêmicos pendentes + projetos pessoais.",
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
    titulo: "Sábado: lazer/conexão · Domingo: PLANEJAMENTO SEMANAL",
    categoria: "revisao",
    conselheiro: "Ray Dalio",
    principio:
      "Domingo: bloco SAGRADO. Revisão semana passada + MITs próxima semana.",
    detalhes:
      "Domingo: 3 vitórias / 3 lições / 3 ajustes + define os 3 MITs de cada dia da próxima semana.",
  },
  {
    inicio: "20:30",
    fim: "22:00",
    titulo: "Leitura + journaling semanal",
    categoria: "leitura",
    conselheiro: "Sócrates",
    principio: "Examine sua vida. A vida não examinada não vale a pena ser vivida.",
  },
  {
    inicio: "22:00",
    fim: "06:30",
    titulo: "Sono (8h30)",
    categoria: "sono",
    conselheiro: "Matthew Walker",
    principio: "Compensa os 6h15 da semana. Negociar com sono = perder.",
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
    default:
      return ROTINA_FIM_SEMANA;
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
