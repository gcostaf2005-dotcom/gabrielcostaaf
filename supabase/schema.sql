-- =====================================================
-- Sistema Pessoal — Schema Supabase
-- Cole esse arquivo no SQL Editor do Supabase
-- =====================================================

-- ===== MÓDULO TREINOS =====

create table if not exists exercicios (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  grupo_muscular text,
  notas text,
  created_at timestamp with time zone default now()
);

create table if not exists treinos_templates (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  descricao text,
  created_at timestamp with time zone default now()
);

create table if not exists template_exercicios (
  template_id uuid references treinos_templates(id) on delete cascade,
  exercicio_id uuid references exercicios(id) on delete cascade,
  ordem integer not null,
  series_alvo integer,
  reps_alvo text,
  primary key (template_id, exercicio_id)
);

create table if not exists sessoes_treino (
  id uuid primary key default gen_random_uuid(),
  template_id uuid references treinos_templates(id),
  data date not null default current_date,
  duracao_min integer,
  rpe integer check (rpe >= 1 and rpe <= 10),
  notas text,
  created_at timestamp with time zone default now()
);

create table if not exists sessao_sets (
  id uuid primary key default gen_random_uuid(),
  sessao_id uuid references sessoes_treino(id) on delete cascade,
  exercicio_id uuid references exercicios(id),
  numero_set integer not null,
  reps integer,
  carga numeric,
  rpe integer check (rpe >= 1 and rpe <= 10),
  notas text
);

-- ===== MÓDULO FINANÇAS =====

create table if not exists contas_financas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  tipo text,
  saldo_inicial numeric default 0,
  cor text default '#3B82F6',
  created_at timestamp with time zone default now()
);

create table if not exists categorias_financas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  tipo text check (tipo in ('entrada', 'saida')) not null,
  cor text default '#3B82F6',
  icone text,
  created_at timestamp with time zone default now()
);

create table if not exists lancamentos (
  id uuid primary key default gen_random_uuid(),
  data date not null default current_date,
  descricao text not null,
  valor numeric not null,
  tipo text check (tipo in ('entrada', 'saida')) not null,
  categoria_id uuid references categorias_financas(id),
  conta_id uuid references contas_financas(id),
  recorrente boolean default false,
  recorrencia_id uuid,
  notas text,
  created_at timestamp with time zone default now()
);

create table if not exists recorrencias (
  id uuid primary key default gen_random_uuid(),
  descricao text not null,
  valor numeric not null,
  tipo text check (tipo in ('entrada', 'saida')) not null,
  categoria_id uuid references categorias_financas(id),
  conta_id uuid references contas_financas(id),
  dia_do_mes integer check (dia_do_mes >= 1 and dia_do_mes <= 31),
  ativa boolean default true,
  created_at timestamp with time zone default now()
);

-- ===== MÓDULO AGENDA =====

create table if not exists eventos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  data_inicio timestamp with time zone not null,
  data_fim timestamp with time zone,
  dia_inteiro boolean default false,
  local text,
  google_calendar_id text,
  created_at timestamp with time zone default now()
);

create table if not exists tarefas (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  data_vencimento date,
  concluida boolean default false,
  prioridade integer check (prioridade >= 1 and prioridade <= 3),
  created_at timestamp with time zone default now()
);

-- ===== SEED DATA (dados iniciais) =====

insert into categorias_financas (nome, tipo, cor, icone) values
  ('Receita CNDA', 'entrada', '#10B981', '💼'),
  ('Receita Vexum', 'entrada', '#10B981', '⚖️'),
  ('Outras Entradas', 'entrada', '#10B981', '💵'),
  ('Aluguel', 'saida', '#EF4444', '🏠'),
  ('Mercado', 'saida', '#EF4444', '🛒'),
  ('Restaurante', 'saida', '#EF4444', '🍽️'),
  ('Transporte', 'saida', '#EF4444', '🚗'),
  ('Lazer', 'saida', '#F59E0B', '🎮'),
  ('Investimentos', 'saida', '#8B5CF6', '📈'),
  ('Outros', 'saida', '#6B7280', '📦')
on conflict do nothing;

insert into contas_financas (nome, tipo, cor) values
  ('Nubank', 'corrente', '#8A05BE'),
  ('Inter', 'corrente', '#FF7A00'),
  ('Dinheiro', 'dinheiro', '#10B981')
on conflict do nothing;

insert into exercicios (nome, grupo_muscular) values
  ('Supino Reto', 'peito'),
  ('Supino Inclinado', 'peito'),
  ('Cross Over', 'peito'),
  ('Puxada Frente', 'costas'),
  ('Remada Curvada', 'costas'),
  ('Levantamento Terra', 'costas'),
  ('Agachamento', 'perna'),
  ('Leg Press', 'perna'),
  ('Cadeira Extensora', 'perna'),
  ('Stiff', 'perna'),
  ('Desenvolvimento', 'ombro'),
  ('Elevação Lateral', 'ombro'),
  ('Rosca Direta', 'biceps'),
  ('Rosca Alternada', 'biceps'),
  ('Tríceps Pulley', 'triceps'),
  ('Tríceps Francês', 'triceps')
on conflict do nothing;
