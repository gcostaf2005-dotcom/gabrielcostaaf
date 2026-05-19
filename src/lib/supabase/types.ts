export type Exercicio = {
  id: string;
  nome: string;
  grupo_muscular: string | null;
  notas: string | null;
  created_at: string;
};

export type TreinoTemplate = {
  id: string;
  nome: string;
  descricao: string | null;
  created_at: string;
};

export type SessaoTreino = {
  id: string;
  template_id: string | null;
  data: string;
  duracao_min: number | null;
  rpe: number | null;
  notas: string | null;
  created_at: string;
};

export type SessaoSet = {
  id: string;
  sessao_id: string;
  exercicio_id: string;
  numero_set: number;
  reps: number | null;
  carga: number | null;
  rpe: number | null;
  notas: string | null;
};

export type ContaFinanca = {
  id: string;
  nome: string;
  tipo: string | null;
  saldo_inicial: number;
  cor: string;
  created_at: string;
};

export type CategoriaFinanca = {
  id: string;
  nome: string;
  tipo: "entrada" | "saida";
  cor: string;
  icone: string | null;
  created_at: string;
};

export type Lancamento = {
  id: string;
  data: string;
  descricao: string;
  valor: number;
  tipo: "entrada" | "saida";
  categoria_id: string | null;
  conta_id: string | null;
  recorrente: boolean;
  recorrencia_id: string | null;
  notas: string | null;
  created_at: string;
};

export type Evento = {
  id: string;
  titulo: string;
  descricao: string | null;
  data_inicio: string;
  data_fim: string | null;
  dia_inteiro: boolean;
  local: string | null;
  google_calendar_id: string | null;
  created_at: string;
};

export type Tarefa = {
  id: string;
  titulo: string;
  descricao: string | null;
  data_vencimento: string | null;
  concluida: boolean;
  prioridade: number | null;
  created_at: string;
};
