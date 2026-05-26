// Rotina diária — versão dura (Gabriel)
// Acorda 4:30 · Chega da faculdade 22:10 · Dorme 22:30 (6h sono nos dias úteis)
// Fim de semana: dorme 8h pra compensar

export type Categoria =
  | "ritual"
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
  inicio: string; // "HH:MM"
  fim: string;
  titulo: string;
  categoria: Categoria;
  conselheiro: string;
  principio: string;
  detalhes?: string;
};

export const CATEGORIA_COR: Record<Categoria, string> = {
  ritual: "#8b5cf6",
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

// Dias úteis (seg-sex) — pegada dura com faculdade à noite
export const ROTINA_SEMANA: BlocoDia[] = [
  {
    inicio: "04:30",
    fim: "05:00",
    titulo: "Acordar + ritual matinal",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Comece o dia decidindo quem você vai ser. O dia é seu, não dos outros.",
    detalhes:
      "Água 500ml na hora. Sem celular nos primeiros 30min. Banho frio 2min. Journaling 5min: '3 coisas que vou conquistar hoje'.",
  },
  {
    inicio: "05:00",
    fim: "06:30",
    titulo: "Leitura profunda",
    categoria: "leitura",
    conselheiro: "Warren Buffett",
    principio: "Conhecimento se acumula como juros compostos. Hábito diário, não esporádico.",
    detalhes:
      "90min de leitura concentrada. Livro de negócio, filosofia ou técnico. Notas em caderno físico.",
  },
  {
    inicio: "06:30",
    fim: "07:00",
    titulo: "Café + planejamento",
    categoria: "ritual",
    conselheiro: "Ray Dalio",
    principio: "Principles. Defina as 3 MITs (Most Important Tasks) do dia antes de começar.",
    detalhes: "Café sem tela. Revisa agenda. Define os 3 alvos do dia — só esses importam.",
  },
  {
    inicio: "07:00",
    fim: "09:00",
    titulo: "Gravação de conteúdo",
    categoria: "conteudo",
    conselheiro: "Alex Hormozi",
    principio: "Volume + leverage. Bateladar é a única forma de ter ROI em conteúdo.",
    detalhes:
      "Pico criativo. Grava o Reel do dia + Stories. Segunda/Terça pode bateladar 3-4 Reels da semana.",
  },
  {
    inicio: "09:00",
    fim: "12:00",
    titulo: "Trabalho — CNDA / Vexum",
    categoria: "trabalho",
    conselheiro: "Jeff Bezos",
    principio: "Decisões importantes antes das 10h. Cérebro limpo decide melhor.",
    detalhes:
      "3h de execução pesada. Outreach (cold WhatsApp/LinkedIn), calls de venda, propostas, follow-ups.",
  },
  {
    inicio: "12:00",
    fim: "13:00",
    titulo: "Almoço + descomprimir",
    categoria: "descanso",
    conselheiro: "Sêneca",
    principio: "Descanso bem usado é parte do trabalho. Não desperdice.",
    detalhes: "Refeição sem tela. 15min de caminhada/respiração depois. Pausa REAL.",
  },
  {
    inicio: "13:00",
    fim: "15:30",
    titulo: "Edição de vídeos",
    categoria: "edicao",
    conselheiro: "Cal Newport",
    principio: "Deep Work em bloco contínuo. Edita TUDO de uma vez.",
    detalhes:
      "2h30 de edição. Modo avião, fone, sem notificação. Sai com os Reels prontos pra próximos 2-3 dias.",
  },
  {
    inicio: "15:30",
    fim: "18:00",
    titulo: "Trabalho extra / Estudos técnicos",
    categoria: "estudos",
    conselheiro: "Naval Ravikant",
    principio: "Especifique conhecimento. Aprenda algo que vira leverage.",
    detalhes:
      "2h30 flexíveis. Calls que sobraram, estudo de IA, cursos, frameworks. Bloco de 'aprender + executar'.",
  },
  {
    inicio: "18:00",
    fim: "19:00",
    titulo: "Lanche + deslocamento pra faculdade",
    categoria: "deslocamento",
    conselheiro: "Diógenes",
    principio: "Aproveite o caminho — áudio livro ou silêncio. Não jogue tempo fora.",
    detalhes: "Comer leve antes. No deslocamento: podcast, audiobook ou silêncio mental.",
  },
  {
    inicio: "19:00",
    fim: "22:00",
    titulo: "Faculdade",
    categoria: "faculdade",
    conselheiro: "Aristóteles",
    principio: "Excelência é hábito. Mesmo cansado, presença plena.",
    detalhes: "Aulas presenciais. Foco no que importa — não toda matéria, mas a que aplica.",
  },
  {
    inicio: "22:00",
    fim: "22:30",
    titulo: "Volta pra casa + wind down rápido",
    categoria: "ritual",
    conselheiro: "Matthew Walker",
    principio: "Wind down de 20min mínimo. Sem tela após 22:20.",
    detalhes:
      "Banho rápido, água, escovar. Journaling de 3min: 'O que aprendi hoje?'. LUZES BAIXAS.",
  },
  {
    inicio: "22:30",
    fim: "04:30",
    titulo: "Sono (6h)",
    categoria: "sono",
    conselheiro: "Jeff Bezos",
    principio:
      "6h é o piso, não o teto. Compensa no fim de semana (8h). Cochilo de 20min no almoço se cansar muito.",
    detalhes:
      "Quarto frio (~19°C), escuro, sem celular. Se acordar à noite, NÃO pega o celular.",
  },
];

// Fim de semana — recuperar sono, gravar batelada, planejar
export const ROTINA_FIM_SEMANA: BlocoDia[] = [
  {
    inicio: "06:30",
    fim: "07:00",
    titulo: "Acordar com sono recuperado",
    categoria: "ritual",
    conselheiro: "Marco Aurélio",
    principio: "Disciplina sem rigidez. Sábado/domingo o corpo precisa.",
    detalhes: "Dorme 8h (22:30 → 06:30). Café tranquilo, sem celular nos primeiros 30min.",
  },
  {
    inicio: "07:00",
    fim: "09:00",
    titulo: "Leitura longa + Think Week",
    categoria: "leitura",
    conselheiro: "Bill Gates",
    principio: "Sábado/domingo é hora de pensar grande, não executar.",
    detalhes: "2h de leitura profunda. Livro inteiro num dia? Ensaios longos. Reflexão.",
  },
  {
    inicio: "09:00",
    fim: "12:00",
    titulo: "Gravação em batelada (sábado)",
    categoria: "conteudo",
    conselheiro: "Alex Hormozi",
    principio: "Sábado de manhã = ouro pra gravar 5-7 Reels da próxima semana.",
    detalhes: "Sábado: grava conteúdo. Domingo: descanso real ou planejamento.",
  },
  {
    inicio: "12:00",
    fim: "14:00",
    titulo: "Almoço + tempo livre",
    categoria: "descanso",
    conselheiro: "Epicuro",
    principio: "Prazeres simples bem aproveitados.",
    detalhes: "Família, amigos, comida boa, descanso de verdade.",
  },
  {
    inicio: "14:00",
    fim: "17:00",
    titulo: "Faculdade / projetos pessoais",
    categoria: "faculdade",
    conselheiro: "Naval Ravikant",
    principio: "Domingo = projetos que importam pra você.",
    detalhes: "Trabalhos acadêmicos pendentes ou projetos pessoais que escalam.",
  },
  {
    inicio: "17:00",
    fim: "19:00",
    titulo: "Planejamento semanal (domingo)",
    categoria: "estudos",
    conselheiro: "Ray Dalio",
    principio: "Domingo à tarde = revisar semana passada + planejar próxima.",
    detalhes: "3 vitórias da semana / 3 lições / 3 ajustes. Define MITs da próxima semana.",
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
    principio: "Examine sua vida. A vida não examinada não vale a pena ser vivida.",
  },
  {
    inicio: "22:00",
    fim: "06:30",
    titulo: "Sono (8h30)",
    categoria: "sono",
    conselheiro: "Matthew Walker",
    principio: "Sono restaurador. Compensa os 6h dos dias com faculdade.",
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
