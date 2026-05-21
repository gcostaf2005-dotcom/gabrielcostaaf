// Rotina semanal de conteúdo — dia: 0=Dom, 1=Seg ... 6=Sáb

export type DiaRotina = {
  dia: number;
  label: string;
  reel: string | null;
  stories: string[];
};

export const ROTINA_CONTEUDO: DiaRotina[] = [
  {
    dia: 1,
    label: "Segunda",
    reel: "Giro da Semana",
    stories: ["Caixinha", "Chamada pro reel", "Interação"],
  },
  {
    dia: 2,
    label: "Terça",
    reel: "Resposta Caixinha",
    stories: ["Chamada pro reel", "Enquete", "Bastidor"],
  },
  {
    dia: 3,
    label: "Quarta",
    reel: "Modelado 1",
    stories: ["Caixinha", "Chamada pro reel", "Interação"],
  },
  {
    dia: 4,
    label: "Quinta",
    reel: "Resposta Caixinha",
    stories: ["Chamada pro reel", "Bastidor", "Interação"],
  },
  {
    dia: 5,
    label: "Sexta",
    reel: "Modelado 2",
    stories: ["Chamada pro reel", "Recap da semana", "CTA Kit Grátis"],
  },
  {
    dia: 6,
    label: "Sábado",
    reel: null,
    stories: ["Bastidor da gravação", "Repost do melhor reel", "Leve"],
  },
  {
    dia: 0,
    label: "Domingo",
    reel: null,
    stories: ["Caixinha de pergunta", "Chamada do que vem", "Dica solta"],
  },
];

export const META_STORIES = "3–5 por dia útil · 2–4 no fim de semana";

export function rotinaDoDia(diaSemana: number): DiaRotina | undefined {
  return ROTINA_CONTEUDO.find((r) => r.dia === diaSemana);
}
