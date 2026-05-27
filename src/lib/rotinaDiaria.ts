// Rotina diária — Gabriel
// Constraints reais: academia · escritório 8h · faculdade 18h-22h · sono 6h15
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
  descanso: "Pausa",
  sono: "Sono",
};

// Dias úteis (seg-sex)
export const ROTINA_SEMANA: BlocoDia[] = [
  {
    inicio: "04:45",
    fim: "05:00",
    titulo: "Acordar + ritual rápido",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Sem snooze. O dia é seu antes de ser de qualquer um.",
    detalhes: "Água 500ml. Banheiro. Veste roupa de treino. Sem celular.",
  },
  {
    inicio: "05:00",
    fim: "06:30",
    titulo: "Academia (treino + retorno)",
    categoria: "academia",
    conselheiro: "Marco Aurélio",
    principio: "Disciplina física antes de qualquer trabalho mental. Corpo forte, mente clara.",
    detalhes: "1h de treino + deslocamento. Cardio leve + força. Audiobook no caminho se quiser.",
  },
  {
    inicio: "06:30",
    fim: "07:00",
    titulo: "Banho + café da manhã",
    categoria: "ritual",
    conselheiro: "Sêneca",
    principio: "Comer com presença. Café sem tela é descanso, com tela é estresse.",
    detalhes: "Banho rápido. Café da manhã sólido (proteína + fruta + gordura boa).",
  },
  {
    inicio: "07:00",
    fim: "07:30",
    titulo: "Leitura focada (30min)",
    categoria: "leitura",
    conselheiro: "Warren Buffett",
    principio: "30min concentrado vale mais que 2h disperso. Constância > intensidade.",
    detalhes: "Livro físico, sem celular. Negócios, IA ou filosofia.",
  },
  {
    inicio: "07:30",
    fim: "08:00",
    titulo: "Deslocamento pro escritório (audiobook)",
    categoria: "deslocamento",
    conselheiro: "Diógenes",
    principio: "Mente trabalha em movimento. Aproveita ou desperdiça — não tem meio termo.",
    detalhes: "Audiobook, podcast ou silêncio mental. NUNCA scroll de feed.",
  },
  {
    inicio: "08:00",
    fim: "10:30",
    titulo: "Trabalho Deep Work — CNDA/Vexum",
    categoria: "trabalho",
    conselheiro: "Jeff Bezos",
    principio: "Decisões importantes antes das 10h. Cérebro limpo decide melhor.",
    detalhes: "Outreach pesado (WhatsApp + LinkedIn), calls de venda, propostas. Modo avião.",
  },
  {
    inicio: "10:30",
    fim: "12:00",
    titulo: "Gravação de conteúdo",
    categoria: "conteudo",
    conselheiro: "Alex Hormozi",
    principio: "Volume + leverage. Bateladar Reels é a única forma de ter ROI em conteúdo.",
    detalhes: "Reels da semana + Stories do dia. Energia matinal residual é ouro pra criar.",
  },
  {
    inicio: "12:00",
    fim: "13:00",
    titulo: "Almoço + descomprimir",
    categoria: "descanso",
    conselheiro: "Sêneca",
    principio: "Pausa REAL. Sem tela. 15min de caminhada depois.",
    detalhes: "Refeição com presença. Caminhada curta pra resetar.",
  },
  {
    inicio: "13:00",
    fim: "15:30",
    titulo: "Edição de vídeos",
    categoria: "edicao",
    conselheiro: "Cal Newport",
    principio: "Deep Work em bloco contínuo. Edita TUDO de uma vez.",
    detalhes: "2h30 sem interrupção. Fone, modo avião. Sai com Reels prontos pra 2-3 dias.",
  },
  {
    inicio: "15:30",
    fim: "17:30",
    titulo: "Estudos / Trabalho extra",
    categoria: "estudos",
    conselheiro: "Naval Ravikant",
    principio: "Especifique conhecimento. Aprenda algo que escala — não só executa.",
    detalhes: "Curso de IA, frameworks novos, OU follow-ups e calls que sobraram.",
  },
  {
    inicio: "17:30",
    fim: "18:00",
    titulo: "Lanche + deslocamento pra faculdade",
    categoria: "deslocamento",
    conselheiro: "Aristóteles",
    principio: "Transição calma. Já come algo pra não perder energia na aula.",
    detalhes: "Lanche rápido (proteína). Audiobook no caminho.",
  },
  {
    inicio: "18:00",
    fim: "22:00",
    titulo: "Faculdade",
    categoria: "faculdade",
    conselheiro: "Aristóteles",
    principio: "Excelência é hábito. Presença plena, mesmo cansado.",
    detalhes: "Foca no que realmente importa da grade. Não toda matéria, mas a aplicável.",
  },
  {
    inicio: "22:10",
    fim: "22:30",
    titulo: "Volta + wind down",
    categoria: "ritual",
    conselheiro: "Matthew Walker",
    principio: "Sem tela após 22:20. Luzes baixas. Quarto frio.",
    detalhes: "Banho rápido se precisar. 3min de journaling: 'O que aprendi hoje?'",
  },
  {
    inicio: "22:30",
    fim: "04:45",
    titulo: "Sono (6h15)",
    categoria: "sono",
    conselheiro: "Jeff Bezos",
    principio: "6h15 é o piso aceitável. Compensa no fim de semana (8h+).",
    detalhes: "Sem celular no quarto. Cochilo de 20min no almoço se cansar muito.",
  },
];

// Fim de semana
export const ROTINA_FIM_SEMANA: BlocoDia[] = [
  {
    inicio: "06:30",
    fim: "07:00",
    titulo: "Acordar (já dormiu 8h+)",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Disciplina sem rigidez. Sábado/domingo o corpo recupera.",
    detalhes: "Dormiu 22:30 → 06:30 = 8h. Café tranquilo sem celular.",
  },
  {
    inicio: "07:00",
    fim: "08:30",
    titulo: "Academia (mais leve)",
    categoria: "academia",
    conselheiro: "Marco Aurélio",
    principio: "Treino de recuperação. Cardio ou mobilidade.",
  },
  {
    inicio: "08:30",
    fim: "10:30",
    titulo: "Leitura longa + Think Week",
    categoria: "leitura",
    conselheiro: "Bill Gates",
    principio: "Fim de semana é pra pensar grande, não executar.",
    detalhes: "2h de leitura profunda. Livro inteiro num final de semana.",
  },
  {
    inicio: "10:30",
    fim: "13:00",
    titulo: "Gravação em batelada (sábado) / Descanso (domingo)",
    categoria: "conteudo",
    conselheiro: "Alex Hormozi",
    principio: "Sábado de manhã = 4-7 Reels gravados pra próxima semana.",
  },
  {
    inicio: "13:00",
    fim: "15:00",
    titulo: "Almoço + tempo livre",
    categoria: "descanso",
    conselheiro: "Epicuro",
    principio: "Prazeres simples bem aproveitados. Família, amigos.",
  },
  {
    inicio: "15:00",
    fim: "17:30",
    titulo: "Faculdade / projetos pessoais",
    categoria: "faculdade",
    conselheiro: "Naval Ravikant",
    principio: "Projetos que importam pra você. Trabalhos pendentes.",
  },
  {
    inicio: "17:30",
    fim: "19:00",
    titulo: "Planejamento semanal (domingo)",
    categoria: "estudos",
    conselheiro: "Ray Dalio",
    principio: "Domingo à tarde: revisar semana + planejar próxima.",
    detalhes: "3 vitórias / 3 lições / 3 ajustes. Define MITs da semana.",
  },
  {
    inicio: "19:00",
    fim: "21:00",
    titulo: "Jantar + conexão",
    categoria: "descanso",
    conselheiro: "Epicuro",
    principio: "Pessoas importantes presentes.",
  },
  {
    inicio: "21:00",
    fim: "22:00",
    titulo: "Leitura + journaling semanal",
    categoria: "leitura",
    conselheiro: "Sócrates",
    principio: "Examine sua vida. Onde errei? Onde acertei?",
  },
  {
    inicio: "22:00",
    fim: "06:30",
    titulo: "Sono (8h30)",
    categoria: "sono",
    conselheiro: "Matthew Walker",
    principio: "Compensa os 6h15 dos dias com faculdade.",
  },
];

export function rotinaDoDiaSemana(diaSemana: number): BlocoDia[] {
  if (diaSemana === 0 || diaSemana === 6) return ROTINA_FIM_SEMANA;
  return ROTINA_SEMANA;
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
