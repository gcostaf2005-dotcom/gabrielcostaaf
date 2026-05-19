-- =====================================================
-- Atualização v2: Patrimônio + Investimentos + Cartão de Crédito
-- Cole no SQL Editor do Supabase e roda
-- =====================================================

-- Tabela: Patrimônio (bens duráveis + experiências)
create table if not exists patrimonio (
  id uuid primary key default gen_random_uuid(),
  tipo text check (tipo in ('bem', 'experiencia')) not null,
  nome text not null,
  categoria text,
  valor numeric not null,
  data date not null default current_date,
  valor_atual numeric,
  notas text,
  ativo boolean default true,
  created_at timestamp with time zone default now()
);

-- Tabela: Investimentos
create table if not exists investimentos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  tipo text check (tipo in ('renda_fixa', 'tesouro', 'acoes', 'fii', 'cripto', 'fundos', 'outros')) not null,
  valor_aporte numeric not null,
  data_aporte date not null default current_date,
  valor_atual numeric,
  instituicao text,
  notas text,
  ativo boolean default true,
  created_at timestamp with time zone default now()
);

-- Cartão de Crédito como conta padrão
insert into contas_financas (nome, tipo, cor)
select 'Cartão de Crédito', 'credito', '#a855f7'
where not exists (select 1 from contas_financas where nome = 'Cartão de Crédito');

-- Categoria de saída pra pagamento de fatura do cartão
insert into categorias_financas (nome, tipo, cor, icone)
select 'Fatura Cartão', 'saida', '#a855f7', '💳'
where not exists (select 1 from categorias_financas where nome = 'Fatura Cartão');
