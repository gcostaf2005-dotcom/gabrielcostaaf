# Sistema Pessoal — Gabriel

App pessoal de produtividade com 3 módulos: Treinos, Finanças e Agenda.

## Stack

- Next.js 14 (App Router)
- TypeScript + Tailwind CSS
- Supabase (Postgres + Auth)
- Recharts (gráficos)
- Lucide (ícones)

## Setup (primeira vez)

### 1. Instalar dependências

```bash
cd /Users/gabriel/Documents/sistema-pessoal
npm install
```

### 2. Configurar Supabase

1. Cria projeto em https://supabase.com (gratuito até 500MB)
2. No painel, vai em **SQL Editor** → cola o conteúdo de `supabase/schema.sql` → roda
3. Em **Settings > API**, copia:
   - **Project URL** (formato `https://xxxxx.supabase.co`)
   - **anon/public key** (ou `sb_publishable_...` no formato novo)
4. Copia `.env.local.example` pra `.env.local` e preenche

### 3. Rodar localmente

```bash
npm run dev
```

Abre http://localhost:3000

### 4. Deploy no Vercel

```bash
# Instala Vercel CLI uma vez
npm i -g vercel

# Na pasta do projeto
vercel
```

Configura as env vars no painel da Vercel (mesmas do `.env.local`).

## Estrutura

```
sistema-pessoal/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home (dashboard)
│   │   ├── treinos/           # Módulo Treinos
│   │   ├── financas/          # Módulo Finanças
│   │   └── agenda/            # Módulo Agenda
│   ├── components/
│   │   └── Navigation.tsx     # Sidebar + bottom nav mobile
│   └── lib/
│       └── supabase/
│           ├── client.ts      # Cliente browser
│           └── server.ts      # Cliente server
├── supabase/
│   └── schema.sql             # Schema completo (cola no SQL Editor)
└── public/
    └── manifest.json          # PWA
```

## Roadmap

- [x] **Fase 1** — Estrutura + setup Supabase
- [ ] **Fase 2** — Módulo Treinos (CRUD exercícios + sessões + gráfico evolução)
- [ ] **Fase 3** — Módulo Finanças (lançamentos + categorias + dashboard mensal)
- [ ] **Fase 4** — Módulo Agenda (eventos + Google Calendar sync)
- [ ] **Fase 5** — PWA completo + deploy Vercel
